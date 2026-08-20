import type { Config } from '@netlify/functions';
import { fetchLiveMarketData } from './lib/market-data.js';

export default async () => {
  try {
    const data = await fetchLiveMarketData();
    return Response.json(data);
  } catch (error) {
    console.error('Error serving market data:', error);
    return Response.json({ error: 'Market data unavailable' }, { status: 500 });
  }
};

export const config: Config = {
  path: '/api/market-data',
};
