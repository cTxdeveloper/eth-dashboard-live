import axios from 'axios';
import https from 'https';
import 'dotenv/config';

// DEVELOPMENT ONLY: Agent to bypass local SSL certificate issues.
const agent = new https.Agent({
  rejectUnauthorized: false
});

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
  // --- PRIMARY PRICE PROVIDER: Etherscan ---
  try {
    const url = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${apiKey}`;
    const response = await axios.get(url, { httpsAgent: agent });
    if (response.data?.status === '1' && response.data.result?.ethusd) {
      return parseFloat(response.data.result.ethusd);
    }
  } catch (error) {
    console.warn('[API Proxy] Etherscan price fetch failed, trying backup...');
  }

  // --- BACKUP PRICE PROVIDER: CoinGecko ---
  try {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
    const response = await axios.get(url, { httpsAgent: agent });
    if (response.data?.ethereum?.usd) {
      return response.data.ethereum.usd;
    }
  } catch (error) {
    console.warn('[API Proxy] CoinGecko price fetch failed.');
  }

  return null; // Return null if all providers fail
}

// This is the main function our middleware will call
async function getConsolidatedData() {
  const ETHERSCAN_API_KEY = process.env.VITE_ETHERSCAN_API_KEY;
  if (!ETHERSCAN_API_KEY) {
    throw new Error('VITE_ETHERSCAN_API_KEY is not defined in your .env file.');
  }

  const [price, gas] = await Promise.all([
    fetchPrice(ETHERSCAN_API_KEY),
    fetchGas(ETHERSCAN_API_KEY)
  ]);

  if (!price && !gas) {
    throw new Error('All API providers failed to return data.');
  }

  return {
    price,
    gas,
    lastUpdated: new Date().toLocaleTimeString(),
  };
}


// The Vite Middleware (unchanged)
export default function (req, res, next) {
  if (req.url === '/api/data') {
    getConsolidatedData()
      .then(data => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      })
      .catch(error => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: error.message }));
      });
  } else {
    next();
  }
}