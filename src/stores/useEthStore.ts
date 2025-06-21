import { defineStore } from 'pinia';
import axios from 'axios';
import type { GasTiers, GasData } from '../types';

export const useEthStore = defineStore('eth', {
  state: () => ({
    price: null as number | null,
    gas: null as GasData | null,
    isLoading: true,
    isManualRefresh: false,
    error: null as string | null,
    theme: 'dark',
    lastUpdated: null as string | null,
  }),

  getters: {
    formattedPrice: (state): string => {
      if (state.price === null) return 'N/A';
      return state.price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    gasTiers: (state): GasTiers[] => {
      if (!state.gas) return [];
      return [
        { name: 'Slow', gwei: state.gas.slow, icon: 'turtle', description: 'Low priority. Good for non-urgent transfers. May take several minutes.' },
        { name: 'Average', gwei: state.gas.average, icon: 'walk', description: 'Standard priority. Usually confirms within a few minutes.' },
        { name: 'Fast', gwei: state.gas.fast, icon: 'rocket', description: 'High priority. Aims for next-block inclusion (~12 seconds).' },
      ];
    },
  },

  actions: {
    async fetchData(isManual = false) {
      if (isManual) this.isManualRefresh = true;
      if (this.price === null && this.gas === null) this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.get('/api/data');
        const data = response.data;

        if (data.error) throw new Error(data.error);

        this.price = data.price;
        this.gas = data.gas;
        this.lastUpdated = data.lastUpdated;

        if (!this.price || !this.gas) {
          this.error = 'Could not fetch all data; some values may be unavailable.';
        }

      } catch (err: any) {
        this.error = err.response?.data?.error || err.message || "A network error occurred.";
      } finally {
        this.isLoading = false;
        if (isManual) setTimeout(() => { this.isManualRefresh = false }, 500);
      }
    },
    
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.className = this.theme;
      localStorage.setItem('theme', this.theme);
    },
  },
});