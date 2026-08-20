import type { Config } from '@netlify/functions';
import { fetchLiveNews } from './lib/market-data.js';

export default async (req: Request) => {
  try {
    const news = await fetchLiveNews();
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const source = url.searchParams.get('source');

    let filtered = news;
    if (category && category !== 'Hepsi') {
      filtered = filtered.filter((n) => n.category === category);
    }
    if (source && source !== 'Hepsi') {
      filtered = filtered.filter((n) => n.source.toLowerCase().includes(source.toLowerCase()));
    }

    return Response.json({
      updatedAt: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      total: filtered.length,
      news: filtered,
    });
  } catch (error) {
    console.error('Error serving news data:', error);
    return Response.json({ error: 'News data unavailable' }, { status: 500 });
  }
};

export const config: Config = {
  path: '/api/news',
};
