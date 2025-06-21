import axios from 'axios';
import https from 'https'

// Agent to bypass SSL certificate issues during local testing if needed.
// In production on Vercel, this enforces standard SSL validation.
const agent = new https.Agent({
  rejectUnauthorized: process.env.NODE_ENV !== 'development',
});

// Reusable fetch functions
async function fetchGas(apiKey) {
    const url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`;
    const response = await axios.get(url, { httpsAgent: agent });
    if (response.data?.status === '1' && response.data.result) {
        return {
            slow: parseInt(response.data.result.SafeGasPrice),
            average: parseInt(response.data.result.ProposeGasPrice),
            fast: parseInt(response.data.result.FastGasPrice),
        };
    }
    return null;
}

async function fetchPrice(apiKey) {
    // Primary: Etherscan
    try {
        const url = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKey}`;
        const response = await axios.get(url, { httpsAgent: agent });
        if (response.data?.status === '1' && response.data.result?.ethusd) {
            return parseFloat(response.data.result.ethusd);
        }
    } catch (e) { /* Fall through to backup */ }

    // Backup: CoinGecko
    try {
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
        const response = await axios.get(url, { httpsAgent: agent });
        if (response.data?.ethereum?.usd) {
            return response.data.ethereum.usd;
        }
    } catch (e) { /* All providers failed */ }
    
    return null;
}

// This is the main Vercel Serverless Function handler
export default async function handler(request, response) {
    // Vercel automatically provides environment variables from your project settings
    const ETHERSCAN_API_KEY = process.env.VITE_ETHERSCAN_API_KEY;

    if (!ETHERSCAN_API_KEY) {
        return response.status(500).json({ error: "API key is not configured on the server." });
    }

    try {
        const [price, gas] = await Promise.all([
            fetchPrice(ETHERSCAN_API_KEY),
            fetchGas(ETHERSCAN_API_KEY)
        ]);

        if (!price && !gas) {
            throw new Error('All API providers failed to return data.');
        }

        const data = { price, gas, lastUpdated: new Date().toLocaleTimeString() };

        // Tell Vercel's Edge Network to cache this response for 30 seconds
        response.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
        return response.status(200).json(data);

    } catch (error) {
        return response.status(502).json({ error: error.message });
    }
}