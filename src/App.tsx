import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Banknote, Coins, BarChart3, Package, Bitcoin,
  Star, Bell, Moon, Sun, Calculator, TrendingUp, TrendingDown,
  Search, User, Clock, ChevronRight, X, RefreshCw, CheckCircle2, SlidersHorizontal,
  Newspaper, ExternalLink, Bookmark
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'Piyasa' | 'Borsa' | 'Döviz' | 'Merkez Bankası' | 'Kripto' | 'Altın' | 'Gündem';
  time: string;
  source: string;
  readTime: string;
  important?: boolean;
  content?: string;
}

const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'EKONOMİM ÖZEL: Gram Gümüş 101 TL Sınırını Aştı - Küresel Fiziki Talep ve Emtia Rallisi',
    summary: 'Ekonomim.com ekonomi masası bildiriyor: Serbest piyasada gram gümüş 101,50 TL seviyesini geçerek rekor kırdı. Yapay zeka ve sanayi sektörünün artan talebi gümüşü öne çıkarıyor.',
    category: 'Altın',
    time: '5 dk önce',
    source: 'EKONOMİM',
    readTime: '3 dk okuma',
    important: true,
    content: 'Değerli madenler piyasasında gümüş rüzgarı esiyor. Ons gümüşteki küresel yükseliş ve fiziki gümüşe olan yoğun taleple gram gümüş 100 TL psikolojik barajını aşarak 101,50 TL seviyesinden işlem görmeye başladı. Analistler fiziki gümüş kıtlığının ve endüstriyel talebin fiyatları desteklemeye devam edeceğini öngörüyor.'
  },
  {
    id: 'n2',
    title: 'EKONOMİM ÖZEL: BIST 100 Endeksinde 13.700 Puan Test Edildi - Hisse Analizleri ve Hedef Fiyatlar',
    summary: 'Borsa İstanbul\'da bilançoların açıklanmasıyla birlikte bankacılık, havacılık ve teknoloji hisselerinde güçlü alımlar öne çıkıyor.',
    category: 'Borsa',
    time: '18 dk önce',
    source: 'EKONOMİM',
    readTime: '4 dk okuma',
    important: true,
    content: 'BIST 100 endeksi günü pozitif bir seyirle sürdürürken, BIST Banka ve BIST Teknoloji endeksleri yükselişe öncülük ediyor. Kurumsal yatırımcıların hisse bazlı seçimleri piyasada hacmi artırdı.'
  },
  {
    id: 'n3',
    title: 'BIST 100 Endeksinde Yabancı Alımları İvme Kazandı: 10.250 Puan Sınırı Aşıldı',
    summary: 'Borsa İstanbul\'da sanayi, havacılık ve bankacılık hisseleri öncülüğünde rekor tazeleyen endekste yabancı kurumsal yatırımcı girişi belirginleşti.',
    category: 'Borsa',
    time: '25 dk önce',
    source: 'EKONOMİM',
    readTime: '4 dk okuma',
    important: false,
    content: 'BIST 100 endeksi güne güçlü alımlarla başlayarak 10.245 puan seviyelerinde işlem görüyor. Analistler bilançoların açıklandığı bu dönemde şirket bazlı ayrışmaların öne çıkacağını ifade ediyor.'
  },
  {
    id: 'n4',
    title: 'İhracat İklim Endeksi ve Sanayi Üretim Verileri Açıklandı',
    summary: 'Türkiye imalat sektörünün ana ihracat pazarlarındaki faaliyet koşullarını ölçen ihracat iklimi endeksi büyüme bölgesinde seyretmeye devam ediyor.',
    category: 'Gündem',
    time: '42 dk önce',
    source: 'EKONOMİM',
    readTime: '3 dk okuma',
    important: false,
    content: 'Ticaret Bakanlığı ve TİM iş birliğiyle takip edilen ihracat verileri, özellikle Avrupa ve Orta Doğu pazarlarındaki toparlanmayla birlikte ihracatçılarımızın ivme kazandığını gösteriyor.'
  },
  {
    id: 'n5',
    title: 'Mevduat Faizlerinde Rekabet Kızıştı: TL Mevduat Oranları %50 Seviyesinde',
    summary: 'Bankaların TL birikimleri özendirme adımları ve kur korumalı mevduattan çıkış stratejileriyle 32 ve 92 günlük mevduat faizleri yatırımcıların odağı olmaya devam ediyor.',
    category: 'Gündem',
    time: '1 saat önce',
    source: 'EKONOMİM',
    readTime: '3 dk okuma',
    important: false,
    content: 'Bankacılık sektöründe mevduat faiz oranları %48 - %52 aralığında dalgalanıyor. TCMB adımlarıyla desteklenen TL mevduat payı her geçen hafta artış göstermekte.'
  },
  {
    id: 'n6',
    title: 'Döviz Kurları ve Rezervlerde Son Durum: Dolar/TL ve Euro/TL Dengeli Seyrediyor',
    summary: 'Serbest piyasada Dolar/TL 34,35 seviyesinde işlem görürken Euro/TL 37,30 seviyelerinde dengeli seyrini koruyor. Merkez Bankası brüt rezervlerinde artış sürüyor.',
    category: 'Döviz',
    time: '2 saat önce',
    source: 'EKONOMİM',
    readTime: '2 dk okuma',
    important: false,
    content: 'Küresel piyasalarda dolar endeksinin (DXY) seyri ve yurt içi döviz talebinin dengelenmesiyle kurlarda kontrollü ve yatay bir hareketlilik izleniyor.'
  },
  {
    id: 'n7',
    title: 'Kripto Piyasalarında Kurumsal ETF Girişleri: Bitcoin 96.000 Doların Üzerinde',
    summary: 'Lider kripto para Bitcoin, spot ETF alımlarının hız kazanmasıyla 96.000 dolar barajının üzerinde alıcı bulmaya devam ediyor.',
    category: 'Kripto',
    time: '3 saat önce',
    source: 'EKONOMİM',
    readTime: '3 dk okuma',
    important: false,
    content: 'Kripto piyasa hacmi 2,6 trilyon dolar sınırına yaklaşırken Ethereum, Solana ve katman-1 projelerinde de güçlü pozitif ayrışmalar yaşanıyor.'
  }
];

interface AssetData {
  code: string;
  name: string;
  category: 'forex' | 'gold' | 'crypto' | 'bist' | 'commodity';
  buy: number;
  sell: number;
  change: number;
  high: number;
  low: number;
  lastUpdated: string;
  unit?: string;
  volume?: number;
}

const INITIAL_ASSETS: AssetData[] = [
  // Forex (Ordered by World Popularity)
  { code: 'USD', name: 'Amerikan Doları', category: 'forex', buy: 47.7215, sell: 47.8020, change: +0.12, high: 48.1050, low: 47.5010, lastUpdated: '16:45:12', unit: '₺' },
  { code: 'EUR', name: 'Euro', category: 'forex', buy: 55.0240, sell: 55.1350, change: -0.05, high: 55.4010, low: 54.9020, lastUpdated: '16:45:10', unit: '₺' },
  { code: 'GBP', name: 'İngiliz Sterlini', category: 'forex', buy: 63.7020, sell: 63.8540, change: +0.18, high: 64.2050, low: 63.5010, lastUpdated: '16:44:55', unit: '₺' },
  { code: 'CHF', name: 'İsviçre Frangı', category: 'forex', buy: 53.5010, sell: 53.6530, change: +0.02, high: 54.0020, low: 53.2010, lastUpdated: '16:43:20', unit: '₺' },
  { code: 'CAD', name: 'Kanada Doları', category: 'forex', buy: 34.7015, sell: 34.8520, change: -0.10, high: 35.1030, low: 34.5010, lastUpdated: '16:42:01', unit: '₺' },
  { code: 'AUD', name: 'Avustralya Doları', category: 'forex', buy: 31.1025, sell: 31.2530, change: +0.25, high: 31.5040, low: 30.9010, lastUpdated: '16:41:00', unit: '₺' },
  { code: 'JPY', name: 'Japon Yeni (100 JPY)', category: 'forex', buy: 31.7010, sell: 31.8520, change: -0.32, high: 32.1030, low: 31.5010, lastUpdated: '16:40:00', unit: '₺' },
  { code: 'SAR', name: 'Suudi Arabistan Riyali', category: 'forex', buy: 8.9412, sell: 8.9825, change: +0.01, high: 9.0210, low: 8.9010, lastUpdated: '16:36:00', unit: '₺' },
  { code: 'AED', name: 'BAE Dirhemi', category: 'forex', buy: 9.1415, sell: 9.1820, change: +0.01, high: 9.2210, low: 9.1010, lastUpdated: '16:35:00', unit: '₺' },
  { code: 'QAR', name: 'Katar Riyali', category: 'forex', buy: 9.2110, sell: 9.2515, change: 0.00, high: 9.2810, low: 9.1810, lastUpdated: '16:34:00', unit: '₺' },
  { code: 'KWD', name: 'Kuveyt Dinarı', category: 'forex', buy: 109.8020, sell: 110.2050, change: +0.05, high: 110.8010, low: 109.2010, lastUpdated: '16:33:00', unit: '₺' },
  { code: 'NOK', name: 'Norveç Kronu', category: 'forex', buy: 3.0812, sell: 3.1115, change: -0.08, high: 3.1510, low: 3.0510, lastUpdated: '16:37:00', unit: '₺' },
  { code: 'SEK', name: 'İsveç Kronu', category: 'forex', buy: 3.1810, sell: 3.2112, change: -0.12, high: 3.2510, low: 3.1510, lastUpdated: '16:38:00', unit: '₺' },
  { code: 'DKK', name: 'Danimarka Kronu', category: 'forex', buy: 4.9210, sell: 4.9515, change: +0.04, high: 4.9810, low: 4.9010, lastUpdated: '16:39:00', unit: '₺' },

  // Gold
  { code: 'GA', name: 'Has Altın (Gram)', category: 'gold', buy: 3220.00, sell: 3245.00, change: +0.35, high: 3280.00, low: 3200.00, lastUpdated: '16:45:12', unit: '₺' },
  { code: 'ONS', name: 'Ons Altın', category: 'gold', buy: 2915.00, sell: 2920.00, change: +0.35, high: 2950.00, low: 2890.00, lastUpdated: '16:45:00', unit: '$' },
  { code: 'CEYREK', name: 'Çeyrek Altın', category: 'gold', buy: 5320.00, sell: 5410.00, change: +0.35, high: 5480.00, low: 5280.00, lastUpdated: '16:44:30', unit: '₺' },
  { code: 'YARIM', name: 'Yarım Altın', category: 'gold', buy: 10640.00, sell: 10820.00, change: +0.35, high: 10960.00, low: 10560.00, lastUpdated: '16:44:30', unit: '₺' },
  { code: 'TAM', name: 'Tam Altın (Ziynet)', category: 'gold', buy: 21280.00, sell: 21640.00, change: +0.35, high: 21920.00, low: 21120.00, lastUpdated: '16:44:00', unit: '₺' },
  { code: 'CUMHURIYET', name: 'Cumhuriyet Altını', category: 'gold', buy: 22100.00, sell: 22450.00, change: +0.35, high: 22800.00, low: 21900.00, lastUpdated: '16:43:30', unit: '₺' },
  { code: 'ATA', name: 'Ata Altın', category: 'gold', buy: 21900.00, sell: 22250.00, change: +0.35, high: 22600.00, low: 21700.00, lastUpdated: '16:43:12', unit: '₺' },
  { code: 'RESAT', name: 'Reşat Altın', category: 'gold', buy: 22100.00, sell: 22450.00, change: +0.35, high: 22800.00, low: 21900.00, lastUpdated: '16:42:00', unit: '₺' },
  { code: 'HAMIT', name: 'Hamit Altın', category: 'gold', buy: 22100.00, sell: 22450.00, change: +0.35, high: 22800.00, low: 21900.00, lastUpdated: '16:42:00', unit: '₺' },
  { code: 'BILEZIK22', name: '22 Ayar Bilezik (Gram)', category: 'gold', buy: 2950.00, sell: 2980.00, change: +0.35, high: 3010.00, low: 2920.00, lastUpdated: '16:41:00', unit: '₺' },
  { code: 'ALTIN18', name: '18 Ayar Altın (Gram)', category: 'gold', buy: 2410.00, sell: 2440.00, change: +0.35, high: 2480.00, low: 2380.00, lastUpdated: '16:40:00', unit: '₺' },
  { code: 'ALTIN14', name: '14 Ayar Altın (Gram)', category: 'gold', buy: 1880.00, sell: 1910.00, change: +0.35, high: 1940.00, low: 1850.00, lastUpdated: '16:39:00', unit: '₺' },

  // Crypto
  { code: 'BTC', name: 'Bitcoin', category: 'crypto', buy: 96200, sell: 96250, change: +2.45, high: 97800, low: 94500, lastUpdated: '16:45:12', unit: '$' },
  { code: 'ETH', name: 'Ethereum', category: 'crypto', buy: 2680, sell: 2685, change: +1.85, high: 2750, low: 2610, lastUpdated: '16:45:10', unit: '$' },
  { code: 'SOL', name: 'Solana', category: 'crypto', buy: 195.40, sell: 195.80, change: +5.12, high: 202.00, low: 188.00, lastUpdated: '16:45:00', unit: '$' },
  { code: 'XRP', name: 'Ripple', category: 'crypto', buy: 2.45, sell: 2.46, change: -0.80, high: 2.58, low: 2.38, lastUpdated: '16:44:30', unit: '$' },
  { code: 'BNB', name: 'Binance Coin', category: 'crypto', buy: 652.10, sell: 653.00, change: +0.95, high: 670.00, low: 640.00, lastUpdated: '16:44:00', unit: '$' },
  { code: 'DOGE', name: 'Dogecoin', category: 'crypto', buy: 0.254, sell: 0.255, change: +3.20, high: 0.270, low: 0.240, lastUpdated: '16:43:00', unit: '$' },
  { code: 'ADA', name: 'Cardano', category: 'crypto', buy: 0.820, sell: 0.822, change: -0.40, high: 0.860, low: 0.790, lastUpdated: '16:42:00', unit: '$' },
  { code: 'AVAX', name: 'Avalanche', category: 'crypto', buy: 32.80, sell: 32.90, change: +4.10, high: 34.50, low: 31.00, lastUpdated: '16:41:00', unit: '$' },
  { code: 'DOT', name: 'Polkadot', category: 'crypto', buy: 7.65, sell: 7.68, change: -1.10, high: 8.10, low: 7.40, lastUpdated: '16:40:00', unit: '$' },
  { code: 'LINK', name: 'Chainlink', category: 'crypto', buy: 18.40, sell: 18.45, change: +2.30, high: 19.20, low: 17.80, lastUpdated: '16:39:00', unit: '$' },
  { code: 'SHIB', name: 'Shiba Inu', category: 'crypto', buy: 0.0000242, sell: 0.0000243, change: +1.50, high: 0.0000260, low: 0.0000230, lastUpdated: '16:38:00', unit: '$' },
  { code: 'PEPE', name: 'Pepe', category: 'crypto', buy: 0.0000182, sell: 0.0000183, change: +8.40, high: 0.0000200, low: 0.0000170, lastUpdated: '16:37:00', unit: '$' },
  { code: 'SUI', name: 'Sui', category: 'crypto', buy: 3.25, sell: 3.26, change: +6.70, high: 3.45, low: 3.05, lastUpdated: '16:36:00', unit: '$' },
  { code: 'NEAR', name: 'Near Protocol', category: 'crypto', buy: 5.85, sell: 5.87, change: +3.10, high: 6.20, low: 5.50, lastUpdated: '16:35:00', unit: '$' },
  { code: 'LTC', name: 'Litecoin', category: 'crypto', buy: 112.50, sell: 112.80, change: -0.20, high: 116.00, low: 108.00, lastUpdated: '16:34:00', unit: '$' },

  // BIST 500 & Borsa İstanbul
  { code: 'BIST100', name: 'BIST 100 Endeksi', category: 'bist', buy: 10245.50, sell: 10245.50, change: +1.25, high: 10320.00, low: 10180.00, lastUpdated: '16:45:12', unit: 'P' },
  { code: 'BIST30', name: 'BIST 30 Endeksi', category: 'bist', buy: 11116.00, sell: 11116.00, change: +1.32, high: 11180.00, low: 11020.00, lastUpdated: '16:45:12', unit: 'P' },
  { code: 'XBANK', name: 'BIST Banka Endeksi', category: 'bist', buy: 14850.20, sell: 14850.20, change: +1.85, high: 14920.00, low: 14780.00, lastUpdated: '16:45:12', unit: 'P' },
  { code: 'XUSIN', name: 'BIST Sanayi Endeksi', category: 'bist', buy: 13920.40, sell: 13920.40, change: +0.95, high: 14010.00, low: 13850.00, lastUpdated: '16:45:12', unit: 'P' },
  { code: 'XTEK', name: 'BIST Teknoloji Endeksi', category: 'bist', buy: 15410.80, sell: 15410.80, change: +2.40, high: 15550.00, low: 15300.00, lastUpdated: '16:45:12', unit: 'P' },
  { code: 'THYAO', name: 'Türk Hava Yolları', category: 'bist', buy: 312.50, sell: 312.75, change: +2.15, high: 315.00, low: 308.00, lastUpdated: '16:45:08', unit: '₺' },
  { code: 'GARAN', name: 'Garanti BBVA', category: 'bist', buy: 114.20, sell: 114.30, change: -0.45, high: 116.00, low: 113.80, lastUpdated: '16:45:01', unit: '₺' },
  { code: 'ASELS', name: 'Aselsan Elektronik', category: 'bist', buy: 64.80, sell: 64.90, change: +3.40, high: 65.50, low: 62.90, lastUpdated: '16:44:50', unit: '₺' },
  { code: 'EREGL', name: 'Ereğli Demir Çelik', category: 'bist', buy: 52.10, sell: 52.15, change: +0.80, high: 52.80, low: 51.50, lastUpdated: '16:44:10', unit: '₺' },
  { code: 'AKBNK', name: 'Akbank', category: 'bist', buy: 58.40, sell: 58.45, change: +1.80, high: 59.20, low: 57.60, lastUpdated: '16:44:00', unit: '₺' },
  { code: 'YKBNK', name: 'Yapı Kredi Bankası', category: 'bist', buy: 31.80, sell: 31.84, change: +0.95, high: 32.30, low: 31.20, lastUpdated: '16:43:40', unit: '₺' },
  { code: 'ISCTR', name: 'İş Bankası (C)', category: 'bist', buy: 14.25, sell: 14.28, change: +2.10, high: 14.50, low: 13.95, lastUpdated: '16:43:20', unit: '₺' },
  { code: 'KCHOL', name: 'Koç Holding', category: 'bist', buy: 218.50, sell: 218.80, change: +1.40, high: 221.00, low: 215.00, lastUpdated: '16:43:00', unit: '₺' },
  { code: 'SAHOL', name: 'Sabancı Holding', category: 'bist', buy: 98.40, sell: 98.60, change: -0.60, high: 100.20, low: 97.80, lastUpdated: '16:42:40', unit: '₺' },
  { code: 'TUPRS', name: 'TÜPRAŞ', category: 'bist', buy: 168.20, sell: 168.50, change: +3.20, high: 171.00, low: 164.50, lastUpdated: '16:42:20', unit: '₺' },
  { code: 'BIMAS', name: 'BİM Mağazalar', category: 'bist', buy: 512.00, sell: 512.50, change: +0.70, high: 518.00, low: 506.00, lastUpdated: '16:42:00', unit: '₺' },
  { code: 'SISE', name: 'Şişecam', category: 'bist', buy: 48.60, sell: 48.68, change: +1.15, high: 49.30, low: 48.10, lastUpdated: '16:41:40', unit: '₺' },
  { code: 'FROTO', name: 'Ford Otosan', category: 'bist', buy: 1085.00, sell: 1088.00, change: +2.80, high: 1105.00, low: 1060.00, lastUpdated: '16:41:20', unit: '₺' },
  { code: 'TOASO', name: 'Tofaş Oto', category: 'bist', buy: 242.00, sell: 242.50, change: -1.20, high: 247.00, low: 240.00, lastUpdated: '16:41:00', unit: '₺' },
  { code: 'KOZAL', name: 'Koza Altın', category: 'bist', buy: 22.40, sell: 22.44, change: +4.20, high: 23.10, low: 21.80, lastUpdated: '16:40:40', unit: '₺' },
  { code: 'ENKAI', name: 'Enka İnşaat', category: 'bist', buy: 42.10, sell: 42.18, change: +0.50, high: 42.80, low: 41.70, lastUpdated: '16:40:20', unit: '₺' },
  { code: 'PETKM', name: 'Petkim', category: 'bist', buy: 21.80, sell: 21.84, change: -0.80, high: 22.30, low: 21.50, lastUpdated: '16:40:00', unit: '₺' },
  { code: 'KRDMD', name: 'Kardemir (D)', category: 'bist', buy: 28.30, sell: 28.36, change: +1.60, high: 28.90, low: 27.80, lastUpdated: '16:39:40', unit: '₺' },
  { code: 'TCELL', name: 'Turkcell', category: 'bist', buy: 96.50, sell: 96.65, change: +2.40, high: 98.20, low: 94.80, lastUpdated: '16:39:20', unit: '₺' },
  { code: 'TTKOM', name: 'Türk Telekom', category: 'bist', buy: 49.80, sell: 49.88, change: +1.90, high: 50.60, low: 48.90, lastUpdated: '16:39:00', unit: '₺' },
  { code: 'PGSUS', name: 'Pegasus Hava Yolları', category: 'bist', buy: 234.50, sell: 234.90, change: +3.10, high: 239.00, low: 228.00, lastUpdated: '16:38:40', unit: '₺' },
  { code: 'SASA', name: 'Sasa Polyester', category: 'bist', buy: 44.20, sell: 44.28, change: -2.10, high: 45.80, low: 43.80, lastUpdated: '16:38:20', unit: '₺' },
  { code: 'ASTOR', name: 'Astor Enerji', category: 'bist', buy: 92.80, sell: 92.95, change: +4.80, high: 95.00, low: 88.50, lastUpdated: '16:38:00', unit: '₺' },
  { code: 'KONTR', name: 'Kontrolmatik', category: 'bist', buy: 54.20, sell: 54.30, change: +3.90, high: 56.00, low: 52.00, lastUpdated: '16:37:40', unit: '₺' },

  // Commodity
  { code: 'SIL', name: 'Gümüş (Gram)', category: 'commodity', buy: 100.80, sell: 101.50, change: +2.40, high: 102.80, low: 99.50, lastUpdated: '16:45:12', unit: '₺' },
  { code: 'BRENT', name: 'Brent Petrol', category: 'commodity', buy: 84.60, sell: 84.75, change: -0.85, high: 85.90, low: 84.10, lastUpdated: '16:44:40', unit: '$' },
  { code: 'PLATIN', name: 'Platin (Gram)', category: 'commodity', buy: 985.00, sell: 1010.00, change: +0.65, high: 1025.00, low: 978.00, lastUpdated: '16:42:15', unit: '₺' },
  { code: 'BAKIR', name: 'Bakır (kg)', category: 'commodity', buy: 295.40, sell: 302.10, change: +1.12, high: 305.00, low: 292.00, lastUpdated: '16:41:00', unit: '₺' }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'summary' | 'forex' | 'gold' | 'crypto' | 'bist' | 'commodity' | 'news'>('summary');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['USD', 'GA', 'BTC', 'BIST100', 'SIL']);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [newsCategory, setNewsCategory] = useState<string>('Hepsi');
  
  // Convertor state
  const [amount, setAmount] = useState<number | string>(100);
  const [fromAsset, setFromAsset] = useState('USD');
  const [toAsset, setToAsset] = useState('TRY');

  // Alarm modal states
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [isAlarmsListOpen, setIsAlarmsListOpen] = useState(false);
  const [selectedAssetForAlarm, setSelectedAssetForAlarm] = useState<AssetData | null>(null);
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [activeAlarms, setActiveAlarms] = useState<Array<{ id: string; code: string; name: string; target: number; createdAt: string }>>([
    { id: '1', code: 'USD', name: 'Amerikan Doları', target: 35.00, createdAt: '14:20' },
    { id: '2', code: 'BTC', name: 'Bitcoin', target: 98000, createdAt: '15:10' }
  ]);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('default');

  // Live Assets Data
  const [assets, setAssets] = useState<AssetData[]>(INITIAL_ASSETS);
  const [flashingCodes, setFlashingCodes] = useState<Record<string, 'up' | 'down'>>({});
  const [isAutoUpdate, setIsAutoUpdate] = useState(true);
  const [lastApiUpdate, setLastApiUpdate] = useState<string | null>(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  // Istanbul Session calculation (Weekdays 10:00 - 18:00 TSİ / UTC+3)
  const isIstanbulSessionOpen = useMemo(() => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const turkeyTime = new Date(utc + (3600000 * 3));
    const day = turkeyTime.getDay(); // 0: Sun, 1: Mon, ..., 5: Fri, 6: Sat
    const isWeekday = day >= 1 && day <= 5;
    const hour = turkeyTime.getHours();
    return isWeekday && hour >= 10 && hour < 18;
  }, []);

  // Fetch real market data from server API
  const fetchMarketData = async () => {
    try {
      setIsLoadingApi(true);
      const res = await fetch('/api/market-data');
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.assets)) {
          // Compare old prices vs new prices for flashing indicators
          setAssets(prevAssets => {
            const prevMap: Record<string, number> = {};
            prevAssets.forEach(a => { prevMap[a.code] = a.sell; });

            const newFlashes: Record<string, 'up' | 'down'> = {};
            data.assets.forEach((newAsset: AssetData) => {
              const oldPrice = prevMap[newAsset.code];
              if (oldPrice && oldPrice !== newAsset.sell) {
                newFlashes[newAsset.code] = newAsset.sell > oldPrice ? 'up' : 'down';
              }
            });

            if (Object.keys(newFlashes).length > 0) {
              setFlashingCodes(prev => ({ ...prev, ...newFlashes }));
              setTimeout(() => {
                setFlashingCodes({});
              }, 1200);
            }

            return data.assets;
          });

          const timeNowStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          setLastApiUpdate(timeNowStr);
        }
      }
    } catch (err) {
      console.warn('Live API error, using local fallback:', err);
    } finally {
      setIsLoadingApi(false);
    }
  };

  // Initial load and periodic polling from real backend API every 20 seconds
  useEffect(() => {
    fetchMarketData();
    const apiInterval = setInterval(() => {
      if (isAutoUpdate) {
        fetchMarketData();
      }
    }, 20000); // 20 saniyede bir güncellenir

    return () => clearInterval(apiInterval);
  }, [isAutoUpdate]);

  // Minor tick animation for visual interactivity
  useEffect(() => {
    if (!isAutoUpdate) return;
    const interval = setInterval(() => {
      // Pick 1 random asset for micro tick
      const randomIndex = Math.floor(Math.random() * assets.length);
      const target = assets[randomIndex];
      if (!target) return;
      
      const factor = (Math.random() - 0.49) * 0.002;
      const newSell = Math.max(0.000001, Number((target.sell * (1 + factor)).toFixed(target.sell < 0.01 ? 6 : 2)));
      const newBuy = Math.max(0.000001, Number((target.buy * (1 + factor)).toFixed(target.buy < 0.01 ? 6 : 2)));
      const direction = factor >= 0 ? 'up' : 'down';

      setFlashingCodes(prev => ({ ...prev, [target.code]: direction }));
      setTimeout(() => {
        setFlashingCodes(prev => {
          const next = { ...prev };
          delete next[target.code];
          return next;
        });
      }, 1000);

      setAssets(prev => prev.map(item => {
        if (item.code === target.code) {
          return {
            ...item,
            buy: newBuy,
            sell: newSell
          };
        }
        return item;
      }));

      // Check alarms
      activeAlarms.forEach(alarm => {
        if (alarm.code === target.code && newSell >= alarm.target) {
          setNotificationMsg(`🚨 ALARM BİLDİRİMİ: ${alarm.code} hedef fiyata ulaştı! (${newSell}₺)`);
        }
      });

    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoUpdate, assets, activeAlarms]);

  // Asset price dictionary lookup
  const priceMap = useMemo(() => {
    const map: Record<string, AssetData> = {};
    assets.filter(a => a.category === 'crypto' || a.category === 'bist').forEach(a => {
      map[a.code] = a;
    });
    assets.filter(a => a.category === 'forex' || a.category === 'gold' || a.category === 'commodity').forEach(a => {
      map[a.code] = a;
    });
    return map;
  }, [assets]);

  // Filtered news memo
  const filteredNews = useMemo(() => {
    return MOCK_NEWS.filter(news => {
      if (newsCategory !== 'Hepsi' && news.category !== newsCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return news.title.toLowerCase().includes(q) || news.summary.toLowerCase().includes(q);
      }
      return true;
    });
  }, [newsCategory, searchQuery]);

  // Main widgets prices
  const usdPrice = priceMap['USD'] || { buy: 34.20, sell: 34.35, change: 0.12 };
  const eurPrice = priceMap['EUR'] || { buy: 37.10, sell: 37.30, change: -0.05 };
  const gaPrice = priceMap['GA'] || { buy: 3220.00, sell: 3245.00, change: 0.35 };
  const silverPrice = priceMap['SIL'] || { buy: 100.80, sell: 101.50, change: 2.40 };
  const btcPrice = priceMap['BTC'] || { buy: 96200, sell: 96250, change: 2.45 };
  const bistPrice = priceMap['BIST100'] || { buy: 10245.50, sell: 10245.50, change: 1.25 };

  // Filtered & sorted table rows
  const filteredAssets = useMemo(() => {
    const list = assets.filter(asset => {
      // 1. Search query filter (applies across everything if user searches)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return asset.code.toLowerCase().includes(q) || asset.name.toLowerCase().includes(q);
      }

      // 2. Favorites filter
      if (favoritesOnly) {
        return favorites.includes(asset.code);
      }

      // 3. Summary View logic: concise curated list (top 5 per market, only indices for Borsa)
      if (activeTab === 'summary') {
        if (asset.category === 'forex') {
          return ['USD', 'EUR', 'GBP', 'CHF', 'CAD'].includes(asset.code);
        }
        if (asset.category === 'gold') {
          return ['GA', 'ONS', 'CEYREK', 'YARIM', 'TAM'].includes(asset.code);
        }
        if (asset.category === 'bist') {
          // In summary view, show only main stock market indices!
          return ['BIST100', 'BIST30', 'XBANK', 'XUSIN', 'XTEK'].includes(asset.code);
        }
        if (asset.category === 'crypto') {
          return ['BTC', 'ETH', 'SOL', 'XRP', 'BNB'].includes(asset.code);
        }
        if (asset.category === 'commodity') {
          return ['SIL', 'BRENT'].includes(asset.code);
        }
        return false;
      }

      // 4. Category Tab filter (when user picks a specific tab like 'bist', 'forex', 'gold', 'crypto', 'commodity')
      return asset.category === activeTab;
    });

    const categoryOrderMap: Record<string, number> = {
      forex: 1,
      gold: 2,
      bist: 3,
      crypto: 4,
      commodity: 5
    };

    const forexOrder = ['USD', 'EUR', 'GBP', 'CHF', 'CAD', 'AUD', 'JPY', 'SAR', 'AED', 'QAR', 'KWD', 'NOK', 'SEK', 'DKK', 'RUB', 'CNY', 'BRL', 'INR', 'KRW', 'MXN'];
    const goldOrder = ['GA', 'ONS', 'CEYREK', 'YARIM', 'TAM', 'CUMHURIYET', 'ATA', 'RESAT', 'HAMIT', 'BILEZIK22', 'ALTIN18', 'ALTIN14'];
    const bistOrder = ['BIST100', 'BIST30', 'XBANK', 'XUSIN', 'XTEK', 'THYAO', 'GARAN', 'ASELS', 'EREGL', 'AKBNK', 'YKBNK', 'ISCTR', 'KCHOL', 'SAHOL', 'TUPRS', 'BIMAS', 'SISE', 'FROTO', 'TOASO', 'KOZAL', 'ENKAI', 'PETKM', 'KRDMD', 'TCELL', 'TTKOM', 'PGSUS', 'SASA', 'ASTOR', 'KONTR'];
    const cryptoOrder = ['BTC', 'ETH', 'SOL', 'XRP', 'BNB', 'DOGE', 'ADA', 'AVAX', 'DOT', 'LINK', 'SHIB', 'PEPE', 'SUI', 'NEAR', 'LTC'];
    const commodityOrder = ['SIL', 'BRENT', 'PLATIN', 'BAKIR'];

    return list.sort((a, b) => {
      if (sortOption === 'default') {
        // First sort by Category: Dövizler -> Altınlar -> Borsa -> Kripto -> Emtiyalar
        const catA = categoryOrderMap[a.category] || 99;
        const catB = categoryOrderMap[b.category] || 99;
        if (catA !== catB) {
          return catA - catB;
        }

        // Secondary sort within the same category
        if (a.category === 'forex') {
          const idxA = forexOrder.indexOf(a.code);
          const idxB = forexOrder.indexOf(b.code);
          if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        } else if (a.category === 'gold') {
          const idxA = goldOrder.indexOf(a.code);
          const idxB = goldOrder.indexOf(b.code);
          if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        } else if (a.category === 'bist') {
          const idxA = bistOrder.indexOf(a.code);
          const idxB = bistOrder.indexOf(b.code);
          if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        } else if (a.category === 'crypto') {
          const idxA = cryptoOrder.indexOf(a.code);
          const idxB = cryptoOrder.indexOf(b.code);
          if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        } else if (a.category === 'commodity') {
          const idxA = commodityOrder.indexOf(a.code);
          const idxB = commodityOrder.indexOf(b.code);
          if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        }

        return (b.volume || 0) - (a.volume || 0);
      }
      if (sortOption === 'volume-desc') {
        return (b.volume || 0) - (a.volume || 0);
      }
      if (sortOption === 'alphabetical-asc') {
        return a.name.localeCompare(b.name, 'tr');
      }
      if (sortOption === 'alphabetical-desc') {
        return b.name.localeCompare(a.name, 'tr');
      }
      if (sortOption === 'change-desc') {
        return b.change - a.change;
      }
      if (sortOption === 'change-asc') {
        return a.change - b.change;
      }
      if (sortOption === 'price-desc') {
        return b.sell - a.sell;
      }
      return 0;
    });
  }, [assets, activeTab, favoritesOnly, favorites, searchQuery, sortOption]);

  // Converter Calculation (Accurate multi-currency & crypto conversions)
  const convertedTotal = useMemo(() => {
    const numericAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    if (numericAmount <= 0) return 0;

    const usdSell = priceMap['USD']?.sell || 34.35;
    const usdBuy = priceMap['USD']?.buy || 34.20;

    let valueInTry = numericAmount;
    if (fromAsset === 'USD') valueInTry = numericAmount * usdSell;
    else if (fromAsset === 'EUR') valueInTry = numericAmount * (priceMap['EUR']?.sell || 37.30);
    else if (fromAsset === 'GBP') valueInTry = numericAmount * (priceMap['GBP']?.sell || 43.80);
    else if (fromAsset === 'GA') valueInTry = numericAmount * (priceMap['GA']?.sell || 3245.00);
    else if (fromAsset === 'SIL') valueInTry = numericAmount * (priceMap['SIL']?.sell || 101.50);
    else if (fromAsset === 'BTC') {
      const btcPriceUSD = priceMap['BTC']?.sell || 96250;
      valueInTry = numericAmount * btcPriceUSD * usdSell;
    } else if (fromAsset === 'ETH') {
      const ethPriceUSD = priceMap['ETH']?.sell || 2685;
      valueInTry = numericAmount * ethPriceUSD * usdSell;
    }

    if (toAsset === 'TRY') return valueInTry;
    if (toAsset === 'USD') return valueInTry / usdBuy;
    if (toAsset === 'EUR') return valueInTry / (priceMap['EUR']?.buy || 37.10);
    if (toAsset === 'GBP') return valueInTry / (priceMap['GBP']?.buy || 43.60);
    if (toAsset === 'GA') return valueInTry / (priceMap['GA']?.buy || 3220.00);
    if (toAsset === 'SIL') return valueInTry / (priceMap['SIL']?.buy || 100.80);
    if (toAsset === 'BTC') {
      const btcPriceUSD = priceMap['BTC']?.buy || 96200;
      return valueInTry / (btcPriceUSD * usdBuy);
    }
    if (toAsset === 'ETH') {
      const ethPriceUSD = priceMap['ETH']?.buy || 2680;
      return valueInTry / (ethPriceUSD * usdBuy);
    }

    return valueInTry;
  }, [amount, fromAsset, toAsset, priceMap]);

  const toggleFavorite = (code: string) => {
    setFavorites(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const openAlarmModal = (asset?: AssetData) => {
    const selected = asset || assets[0];
    setSelectedAssetForAlarm(selected);
    setTargetPrice((selected.sell * 1.02).toFixed(2));
    setIsAlarmOpen(true);
  };

  const handleAddAlarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssetForAlarm || !targetPrice) return;
    const targetVal = parseFloat(targetPrice);
    if (isNaN(targetVal) || targetVal <= 0) return;

    const newAlarm = {
      id: Date.now().toString(),
      code: selectedAssetForAlarm.code,
      name: selectedAssetForAlarm.name,
      target: targetVal,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setActiveAlarms(prev => [newAlarm, ...prev]);
    setIsAlarmOpen(false);
    setNotificationMsg(`✅ ${selectedAssetForAlarm.code} için ${targetVal} seviyesinde alarm oluşturuldu.`);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  const removeAlarm = (id: string) => {
    setActiveAlarms(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className={`${darkMode ? 'dark bg-slate-950' : 'bg-slate-100'} font-sans min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200`}>
      <div className="flex min-h-screen">
        
        {/* TOP NOTIFICATION POPUP */}
        {notificationMsg && (
          <div className="fixed top-4 right-4 z-[120] bg-blue-600 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center space-x-3 border border-blue-400/30 animate-in slide-in-from-top duration-300">
            <CheckCircle2 size={18} className="text-emerald-300 shrink-0" />
            <span className="text-xs font-bold tracking-tight">{notificationMsg}</span>
            <button onClick={() => setNotificationMsg(null)} className="ml-2 hover:opacity-80">
              <X size={14} />
            </button>
          </div>
        )}

        {/* --- SIDEBAR (SOL MENÜ) --- */}
        <aside className="hidden lg:flex w-64 fixed h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col shadow-2xl z-50">
          <div className="p-6">
            <h1 className="text-xl font-black text-blue-600 dark:text-blue-400 tracking-tighter flex items-center italic">
              FINANCE<span className="text-slate-900 dark:text-white">PRO</span>
            </h1>
            <div className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Terminal v4.5</div>
          </div>

          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
            <NavItem 
              icon={<LayoutDashboard size={18}/>} 
              label="Piyasa Özeti" 
              active={activeTab === 'summary'} 
              onClick={() => { setActiveTab('summary'); setFavoritesOnly(false); }} 
            />
            <NavItem 
              icon={<Banknote size={18}/>} 
              label="Döviz Kurları" 
              active={activeTab === 'forex'} 
              onClick={() => { setActiveTab('forex'); setFavoritesOnly(false); }} 
            />
            <NavItem 
              icon={<Coins size={18}/>} 
              label="Altın Piyasası" 
              active={activeTab === 'gold'} 
              onClick={() => { setActiveTab('gold'); setFavoritesOnly(false); }} 
            />
            <NavItem 
              icon={<Bitcoin size={18}/>} 
              label="Kripto Paralar" 
              active={activeTab === 'crypto'} 
              onClick={() => { setActiveTab('crypto'); setFavoritesOnly(false); }} 
            />
            <NavItem 
              icon={<BarChart3 size={18}/>} 
              label="Borsa İstanbul" 
              active={activeTab === 'bist'} 
              onClick={() => { setActiveTab('bist'); setFavoritesOnly(false); }} 
            />
            <NavItem 
              icon={<Package size={18}/>} 
              label="Değerli Madenler" 
              active={activeTab === 'commodity'} 
              onClick={() => { setActiveTab('commodity'); setFavoritesOnly(false); }} 
            />
            <NavItem 
              icon={<Newspaper size={18}/>} 
              label="Ekonomi Haberleri" 
              active={activeTab === 'news'} 
              onClick={() => { setActiveTab('news'); setFavoritesOnly(false); }} 
            />
          </nav>

          {/* ACTIVE ALARMS WIDGET IN SIDEBAR */}
          <div className="p-3 mx-3 mb-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-1">
                <Bell size={12} className="text-blue-500" /> Aktif Alarmlar ({activeAlarms.length})
              </span>
              <button onClick={() => openAlarmModal()} className="text-[10px] font-bold text-blue-500 hover:underline">
                + Ekle
              </button>
            </div>
            {activeAlarms.length === 0 ? (
              <p className="text-[11px] text-slate-500 italic">Henüz alarm kurulmadı.</p>
            ) : (
              <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                {activeAlarms.map(a => (
                  <div key={a.id} className="flex justify-between items-center text-[11px] p-1.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="font-black text-blue-500 mr-1">{a.code}</span>
                      <span className="font-mono text-slate-400">≥ {a.target}₺</span>
                    </div>
                    <button onClick={() => removeAlarm(a.id)} className="text-slate-500 hover:text-rose-500">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <div className="bg-slate-100 dark:bg-slate-950 rounded-xl p-3 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <div className="text-[9px] text-slate-500 uppercase font-bold">HESAP TÜRÜ</div>
                <div className="text-xs font-black text-blue-500 dark:text-blue-400">PROFESSIONAL PLUS</div>
              </div>
              <div className="h-7 w-7 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-xs">EY</div>
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="flex items-center w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition text-xs font-bold text-slate-600 dark:text-slate-300"
            >
              {darkMode ? <Sun size={16} className="mr-2 text-yellow-400" /> : <Moon size={16} className="mr-2 text-slate-600" />}
              {darkMode ? 'Aydınlık Mod' : 'Karanlık Mod'}
            </button>
          </div>
        </aside>

        {/* --- ANA İÇERİK ALANI --- */}
        <main className="flex-1 lg:ml-64 p-3 sm:p-4 md:p-6 pb-24 lg:pb-8 max-w-7xl w-full max-w-full overflow-x-hidden">
          
          {/* ÜST BAR */}
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
                <span className="text-blue-700 dark:text-blue-400">Finans Terminal</span>
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-md bg-blue-600 text-white dark:bg-blue-500/20 dark:text-blue-400 border border-blue-500/30 uppercase tracking-widest shadow-sm">
                  Canlı
                </span>
              </h2>
              <div className="flex items-center text-[11px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-tighter mt-1 flex-wrap gap-2">
                <span className="flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${isIstanbulSessionOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                  <span>{new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}</span>
                  <span className={`ml-1 font-black ${isIstanbulSessionOpen ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                    ({isIstanbulSessionOpen ? 'İSTANBUL SEANSI AÇIK' : 'İSTANBUL SEANSI KAPALI - 10:00/18:00'})
                  </span>
                </span>
                {lastApiUpdate && (
                  <span className="text-blue-600 dark:text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    Son Güncelleme: {lastApiUpdate}
                  </span>
                )}
              </div>
            </div>

            {/* QUICK ACTIONS, SEARCH & USER BADGE */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* FAVORİLER VE ALARMLAR QUICK BUTTONS */}
              <button 
                onClick={() => setFavoritesOnly(!favoritesOnly)}
                className={`px-3 py-2 rounded-xl border text-xs font-black flex items-center space-x-1.5 transition ${
                  favoritesOnly 
                    ? 'bg-amber-500 text-white border-amber-400 shadow-lg shadow-amber-500/20' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500/50'
                }`}
              >
                <Star size={14} className={favoritesOnly ? 'fill-current text-white' : 'text-amber-500'} />
                <span>FAVORİLER ({favorites.length})</span>
              </button>

              <button 
                onClick={() => setIsAlarmsListOpen(true)}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-black text-slate-700 dark:text-slate-300 hover:border-blue-500/50 flex items-center space-x-1.5 transition relative"
              >
                <Bell size={14} className="text-blue-500" />
                <span>ALARMLAR ({activeAlarms.length})</span>
              </button>

              <div className="relative flex-1 sm:w-56 min-w-[160px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Varlık veya sembol ara..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 dark:text-slate-100"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X size={12} />
                  </button>
                )}
              </div>

              <button 
                onClick={() => setIsAutoUpdate(!isAutoUpdate)}
                title={isAutoUpdate ? "Canlı güncellemeleri durdur" : "Canlı güncellemeleri başlat"}
                className={`p-2 rounded-xl border font-bold text-xs flex items-center space-x-1.5 transition ${isAutoUpdate ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
              >
                <RefreshCw size={14} className={isAutoUpdate ? 'animate-spin' : ''} />
                <span className="hidden md:inline text-[11px] font-bold">{isAutoUpdate ? 'CANLI' : 'DURDURULDU'}</span>
              </button>

              <button 
                onClick={() => setDarkMode(!darkMode)} 
                title={darkMode ? "Aydınlık Mod" : "Karanlık Mod"}
                className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                {darkMode ? <Sun size={15} className="text-yellow-400" /> : <Moon size={15} />}
              </button>

              <div className="hidden sm:flex items-center space-x-3 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                <div className="text-right">
                  <div className="text-[9px] font-bold text-slate-500 uppercase">Hoş Geldiniz</div>
                  <div className="text-xs font-black text-slate-800 dark:text-slate-100">Ersin Yüksel</div>
                </div>
                <div className="h-7 w-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-900/20">EY</div>
              </div>
            </div>
          </header>

          {/* 6 BÜYÜK KART (ANA EKRAN WIDGETLARI: USD, EUR, GRAM ALTIN, GRAM GÜMÜŞ, BITCOIN, BIST100) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5 sm:gap-4 mb-5 sm:mb-6">
            <PriceCard 
              title="USD / TRY" 
              buy={usdPrice.buy}
              sell={usdPrice.sell} 
              change={usdPrice.change} 
              color="blue" 
              unit="₺"
              flash={flashingCodes['USD']}
              isForex={true}
            />
            <PriceCard 
              title="EUR / TRY" 
              buy={eurPrice.buy}
              sell={eurPrice.sell} 
              change={eurPrice.change} 
              color="indigo" 
              unit="₺"
              flash={flashingCodes['EUR']}
              isForex={true}
            />
            <PriceCard 
              title="GRAM ALTIN" 
              buy={gaPrice.buy}
              sell={gaPrice.sell} 
              change={gaPrice.change} 
              color="yellow" 
              unit="₺"
              flash={flashingCodes['GA']}
            />
            <PriceCard 
              title="GRAM GÜMÜŞ" 
              buy={silverPrice.buy}
              sell={silverPrice.sell} 
              change={silverPrice.change} 
              color="indigo" 
              unit="₺"
              flash={flashingCodes['SIL']}
            />
            <PriceCard 
              title="BTC / USDT" 
              buy={btcPrice.buy}
              sell={btcPrice.sell} 
              change={btcPrice.change} 
              color="yellow" 
              unit="$"
              flash={flashingCodes['BTC']}
            />
            <PriceCard 
              title="BIST 100" 
              buy={bistPrice.buy}
              sell={bistPrice.sell} 
              change={bistPrice.change} 
              color="emerald" 
              unit="P"
              flash={flashingCodes['BIST100']}
            />
          </div>

          {activeTab === 'news' ? (
            <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-x-hidden">
              {/* NEWS HEADER BANNER */}
              <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-2xl relative overflow-hidden w-full max-w-full">
                <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                <div className="relative z-10 max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-[10px] font-black uppercase tracking-widest mb-3 border border-white/10">
                    <Newspaper size={12} />
                    <span>Canlı Ekonomi Haber Akışı</span>
                  </span>
                  <h2 className="text-lg sm:text-3xl font-black tracking-tight leading-tight mb-2 break-words">
                    Piyasaları Şekillendiren Son Dakika Haberleri ve Analizler
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100 font-medium break-words">
                    Borsa İstanbul, Döviz, Altın, Kripto ve Merkez Bankası kararlarına dair en güncel haber akışı ve uzman yorumları.
                  </p>
                </div>
              </div>

              {/* CATEGORY FILTERS */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-full overflow-hidden">
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1.5 sm:pb-0 w-full max-w-full no-scrollbar">
                  {['Hepsi', 'Merkez Bankası', 'Borsa', 'Döviz', 'Altın', 'Kripto', 'Gündem', 'Piyasa'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setNewsCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition ${
                        newsCategory === cat
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="text-xs font-bold text-slate-400 shrink-0 text-right sm:text-left">
                  Gösterilen: <span className="text-slate-800 dark:text-slate-200 font-black">{filteredNews.length} Haber</span>
                </div>
              </div>

              {/* NEWS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 w-full max-w-full">
                {filteredNews.map(news => (
                  <div 
                    key={news.id}
                    onClick={() => setSelectedNews(news)}
                    className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xl hover:border-blue-500/50 transition duration-300 flex flex-col justify-between group cursor-pointer w-full max-w-full overflow-hidden"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          {news.category}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          <Clock size={11} /> {news.time}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug mb-2 break-words">
                        {news.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4 break-words">
                        {news.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-400">
                      <span className="text-slate-600 dark:text-slate-300">{news.source}</span>
                      <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition">
                        <span>Devamını Oku</span>
                        <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-4 sm:gap-6 w-full max-w-full">
              {/* SOL TARAF: TABLO VE LİSTE */}
              <div className={`col-span-12 ${activeTab === 'summary' ? 'xl:col-span-8' : 'col-span-12'} bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-3 sm:p-6 flex flex-col`}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <h3 className="font-black text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 truncate">
                      {activeTab === 'summary' && 'Piyasa Özeti'}
                      {activeTab === 'forex' && 'Döviz Kurları (Tüm Para Birimleri)'}
                      {activeTab === 'gold' && 'Altın Piyasası (Tüm Altın Çeşitleri)'}
                      {activeTab === 'crypto' && 'Kripto Paralar (Canlı Coinler)'}
                      {activeTab === 'bist' && 'BIST 500 & Borsa İstanbul Hisseleri'}
                      {activeTab === 'commodity' && 'Değerli Madenler & Emtialar'}
                    </h3>
                    <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 shrink-0">
                      {filteredAssets.length} Varlık
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2">
                    {/* SIRALAMA SEÇENEĞİ */}
                    <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-700 max-w-[170px] sm:max-w-none">
                      <SlidersHorizontal size={11} className="text-slate-400 shrink-0" />
                      <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="bg-transparent text-[10px] sm:text-[11px] font-bold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer truncate w-full"
                      >
                        <option value="default" className="dark:bg-slate-900">Varsayılan (USD, EUR, GBP... / Popülerlik)</option>
                        <option value="volume-desc" className="dark:bg-slate-900">İşlem Hacmi (Yüksek → Düşük)</option>
                        <option value="alphabetical-asc" className="dark:bg-slate-900">A'dan Z'ye (İsim / Sembol)</option>
                        <option value="alphabetical-desc" className="dark:bg-slate-900">Z'den A'ya</option>
                        <option value="change-desc" className="dark:bg-slate-900">Günlük Değişim (% Yüksek)</option>
                        <option value="change-asc" className="dark:bg-slate-900">Günlük Değişim (% Düşük)</option>
                        <option value="price-desc" className="dark:bg-slate-900">Fiyat (Yüksek → Düşük)</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => setFavoritesOnly(false)}
                        className={`px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold rounded-lg transition ${!favoritesOnly ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
                      >
                        HEPSİ
                      </button>
                      <button 
                        onClick={() => setFavoritesOnly(true)}
                        className={`px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold rounded-lg transition flex items-center space-1 ${favoritesOnly ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
                      >
                        <Star size={10} className="fill-current" />
                        <span>FAVORİLER ({favorites.length})</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-[9px] sm:text-[10px] text-slate-500 font-black uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                        <th className="pb-2.5 sm:pb-3 pl-1 pr-1 sm:pl-2 sm:pr-3">Varlık</th>
                        <th className="pb-2.5 sm:pb-3 px-1 sm:px-3 text-right sm:text-left">Alış</th>
                        <th className="pb-2.5 sm:pb-3 px-1 sm:px-3 text-right sm:text-left">Satış</th>
                        <th className="pb-2.5 sm:pb-3 px-1 sm:px-3 text-right sm:text-left">Değişim</th>
                        <th className="pb-2.5 sm:pb-3 px-3 hidden sm:table-cell">İşlem Hacmi</th>
                        <th className="pb-2.5 sm:pb-3 px-3 hidden md:table-cell">Yüksek / Düşük</th>
                        <th className="pb-2.5 sm:pb-3 text-right pr-1 pl-1 sm:pr-2 sm:pl-2">İşlem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {filteredAssets.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-slate-400 text-xs font-bold">
                            Aranan kritere uygun varlık bulunamadı.
                          </td>
                        </tr>
                      ) : (
                        filteredAssets.map((asset, index) => {
                          const isFirstGoldInList = (asset.category === 'gold' || asset.code === 'GA') && 
                            (index === 0 || (filteredAssets[index - 1]?.category !== 'gold' && !filteredAssets[index - 1]?.code?.startsWith('GA')));

                          return (
                            <React.Fragment key={asset.code}>
                              {isFirstGoldInList && (
                                <tr key={`ad-gold-row-${asset.code}`} className="bg-transparent">
                                  <td colSpan={7} className="p-2 sm:p-3">
                                    <GoogleAdBanner 
                                      label="GOOGLE REKLAM ALANI - ALTIN PİYASASI ÜSTÜ" 
                                      slot="7788990011"
                                    />
                                    {activeTab === 'summary' && (
                                      <div className="flex items-center space-x-2 py-2 px-3 text-amber-600 dark:text-amber-400 font-black text-xs uppercase tracking-wider bg-amber-500/10 dark:bg-amber-500/20 rounded-xl mb-1 mt-2 border border-amber-500/20">
                                        <Coins size={14} />
                                        <span>Piyasa Özeti - Altın Piyasası</span>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              )}
                              <AssetRow 
                                key={asset.code}
                                name={asset.name}
                                code={asset.code}
                                category={asset.category}
                                buy={asset.buy}
                                sell={asset.sell}
                                change={asset.change}
                                high={asset.high}
                                low={asset.low}
                                unit={asset.unit}
                                volume={asset.volume}
                                flash={flashingCodes[asset.code]}
                                isFavorite={favorites.includes(asset.code)}
                                onFavoriteToggle={() => toggleFavorite(asset.code)}
                                onAlarm={() => openAlarmModal(asset)} 
                              />
                            </React.Fragment>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SAĞ TARAF: SADECE ÖZET (SUMMARY) EKRANINDA VARLIK & KRİPTO ÇEVİRİCİ */}
              {activeTab === 'summary' && (
                <div className="col-span-12 xl:col-span-4 space-y-4 sm:space-y-6">
                  <div className="bg-blue-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl text-white sticky top-6 border border-blue-500">
                    <div className="flex items-center space-x-2 mb-4 sm:mb-5">
                      <span className="text-lg sm:text-xl">🧮</span>
                      <h3 className="text-base sm:text-lg font-black tracking-tight">Varlık & Kripto Çevirici</h3>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="text-[10px] font-black text-blue-200 uppercase mb-1 block">Miktar</label>
                        <input 
                          type="number" 
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          min="0"
                          step="any"
                          className="w-full bg-blue-500 border border-blue-400 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-2xl sm:text-3xl font-black focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                        <SelectField 
                          value={fromAsset} 
                          onChange={setFromAsset} 
                          label="KAYNAK" 
                          options={[
                            { label: 'USD (Dolar)', value: 'USD' },
                            { label: 'EUR (Euro)', value: 'EUR' },
                            { label: 'GBP (Sterlin)', value: 'GBP' },
                            { label: 'Gram Altın', value: 'GA' },
                            { label: 'Bitcoin (BTC)', value: 'BTC' },
                            { label: 'Ethereum (ETH)', value: 'ETH' },
                            { label: 'Gümüş', value: 'SIL' },
                            { label: 'TRY (Lira)', value: 'TRY' }
                          ]} 
                        />
                        <SelectField 
                          value={toAsset} 
                          onChange={setToAsset} 
                          label="HEDEF" 
                          options={[
                            { label: 'TRY (Lira)', value: 'TRY' },
                            { label: 'USD (Dolar)', value: 'USD' },
                            { label: 'EUR (Euro)', value: 'EUR' },
                            { label: 'GBP (Sterlin)', value: 'GBP' },
                            { label: 'Bitcoin (BTC)', value: 'BTC' }
                          ]} 
                        />
                      </div>

                      <div className="py-2 sm:py-4">
                        <p className="text-blue-100 text-[10px] font-black uppercase mb-1">Toplam Alacağınız</p>
                        <div className="text-2xl sm:text-3xl font-black tracking-tight truncate">
                          {convertedTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 6 })} <span className="text-xs sm:text-sm font-bold text-blue-200">{toAsset}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setNotificationMsg(`İşlem özeti: ${amount} ${fromAsset} = ${convertedTotal.toFixed(2)} ${toAsset}`);
                          setTimeout(() => setNotificationMsg(null), 4000);
                        }}
                        className="w-full bg-white text-blue-600 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-blue-50 transition shadow-lg active:scale-[0.99]"
                      >
                        Hızlı Alış / Satış
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SAYFA ALTI GOOGLE REKLAM ALANI */}
          <div className="mt-6 sm:mt-8 w-full max-w-7xl">
            <GoogleAdBanner 
              label="GOOGLE REKLAM ALANI (SAYFA ALTI BANNER)" 
              slot="9988776655" 
            />
          </div>
        </main>

        {/* --- MOBİL BOTTOM NAV --- */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 py-2 flex justify-around items-center z-50 shadow-2xl backdrop-blur-md bg-white/90 dark:bg-slate-900/90">
          <button onClick={() => { setActiveTab('summary'); setFavoritesOnly(false); }} className={`flex flex-col items-center py-1 px-1.5 rounded-lg transition ${activeTab === 'summary' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            <LayoutDashboard size={18} />
            <span className="text-[9px] font-bold mt-0.5">Özet</span>
          </button>
          
          <button onClick={() => { setActiveTab('forex'); setFavoritesOnly(false); }} className={`flex flex-col items-center py-1 px-1.5 rounded-lg transition ${activeTab === 'forex' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            <Banknote size={18} />
            <span className="text-[9px] font-bold mt-0.5">Döviz</span>
          </button>

          <button onClick={() => { setActiveTab('gold'); setFavoritesOnly(false); }} className={`flex flex-col items-center py-1 px-1.5 rounded-lg transition ${activeTab === 'gold' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            <Coins size={18} />
            <span className="text-[9px] font-bold mt-0.5">Altın</span>
          </button>

          <button onClick={() => { setActiveTab('bist'); setFavoritesOnly(false); }} className={`flex flex-col items-center py-1 px-1.5 rounded-lg transition ${activeTab === 'bist' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            <BarChart3 size={18} />
            <span className="text-[9px] font-bold mt-0.5">Borsa</span>
          </button>

          <button onClick={() => { setActiveTab('crypto'); setFavoritesOnly(false); }} className={`flex flex-col items-center py-1 px-1.5 rounded-lg transition ${activeTab === 'crypto' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            <Bitcoin size={18} />
            <span className="text-[9px] font-bold mt-0.5">Kripto</span>
          </button>

          <button onClick={() => { setActiveTab('commodity'); setFavoritesOnly(false); }} className={`flex flex-col items-center py-1 px-1.5 rounded-lg transition ${activeTab === 'commodity' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            <Package size={18} />
            <span className="text-[9px] font-bold mt-0.5">Emtia</span>
          </button>

          <button onClick={() => { setActiveTab('news'); setFavoritesOnly(false); }} className={`flex flex-col items-center py-1 px-1.5 rounded-lg transition ${activeTab === 'news' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            <Newspaper size={18} />
            <span className="text-[9px] font-bold mt-0.5">Haberler</span>
          </button>
        </div>

        {/* --- HABER DETAY MODAL --- */}
        {selectedNews && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-5 right-5 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition text-slate-500"
              >
                <X size={18} />
              </button>

              <div className="flex items-center space-x-2 text-[11px] font-bold text-slate-400 mb-3">
                <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-black border border-blue-500/20">
                  {selectedNews.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={12}/> {selectedNews.time}</span>
                <span>•</span>
                <span className="text-slate-600 dark:text-slate-300 font-black">{selectedNews.source}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                {selectedNews.title}
              </h2>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 mb-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {selectedNews.summary}
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  Piyasa uzmanları ve analistler, bu gelişmenin önümüzdeki günlerde yatırım kararları ve varlık fiyatlamaları üzerinde kritik bir rol oynayacağını belirtiyor. Küresel ve yerel faktörlerin birleşimi piyasada hareketliliği artırabilir.
                </p>
                <p>
                  Finans Terminal canlı veri akışı üzerinden ilgili para birimleri, altın ve hisse senedi fiyatlarındaki anlık değişimleri takip etmeye devam edebilirsiniz.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-lg transition"
                >
                  Kapat
                </button>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Kaynak: {selectedNews.source}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ALARM MODAL --- */}
        {isAlarmOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black">Fiyat Alarmı Kur</h3>
                <button 
                  onClick={() => setIsAlarmOpen(false)} 
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-400 hover:text-slate-600"
                >
                  <X size={20}/>
                </button>
              </div>

              <form onSubmit={handleAddAlarm} className="space-y-5 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Bell size={32} />
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedAssetForAlarm?.name}</div>
                  <div className="text-2xl font-black font-mono mt-1 text-blue-500">
                    GÜNCEL: {selectedAssetForAlarm?.sell} ₺
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 text-left">
                    Hedef Fiyat (₺)
                  </label>
                  <input 
                    type="number" 
                    step="any"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder="Örn: 35.50"
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-center"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg transition active:scale-95"
                >
                  Alarmı Kaydet
                </button>
              </form>
            </div>
          </div>
        )}

        {/* --- AKTİF ALARMLAR MODAL --- */}
        {isAlarmsListOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
                    <Bell size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Fiyat Alarmlarım</h3>
                    <p className="text-[11px] text-slate-500 font-bold">Takip ettiğiniz aktif alarmlar ({activeAlarms.length})</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAlarmsListOpen(false)} 
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-400 hover:text-slate-600"
                >
                  <X size={20}/>
                </button>
              </div>

              {activeAlarms.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm font-bold text-slate-500 mb-4">Henüz kurulmuş bir fiyat alarmınız yok.</p>
                  <button 
                    onClick={() => {
                      setIsAlarmsListOpen(false);
                      openAlarmModal(assets[0]);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition"
                  >
                    + Yeni Alarm Kur
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {activeAlarms.map((alarm) => (
                    <div 
                      key={alarm.id}
                      className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-black text-sm text-slate-900 dark:text-white">{alarm.code}</span>
                          <span className="text-[11px] font-bold text-slate-500">({alarm.name})</span>
                        </div>
                        <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                          Hedef: {alarm.target.toLocaleString('tr-TR')} ₺
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono text-slate-400">{alarm.createdAt}</span>
                        <button 
                          onClick={() => {
                            setActiveAlarms(prev => prev.filter(a => a.id !== alarm.id));
                            setNotificationMsg(`${alarm.code} alarmı silindi`);
                            setTimeout(() => setNotificationMsg(null), 3000);
                          }}
                          className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition"
                          title="Alarmı Sil"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between gap-3">
                <button 
                  onClick={() => {
                    setIsAlarmsListOpen(false);
                    openAlarmModal(assets[0]);
                  }}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-2"
                >
                  <span>+ YENİ ALARM EKLE</span>
                </button>

                <button 
                  onClick={() => setIsAlarmsListOpen(false)}
                  className="px-5 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black text-xs rounded-xl transition"
                >
                  KAPAT
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

const NavItem = ({ 
  icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl font-bold text-xs transition duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const GoogleAdBanner = ({ 
  label = "GOOGLE REKLAM ALANI", 
  slot = "1234567890", 
  className = "" 
}: { 
  label?: string; 
  slot?: string; 
  className?: string;
}) => {
  return (
    <div className={`w-full my-3 sm:my-4 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden ${className}`}>
      <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        <span>{label}</span>
      </div>
      
      {/* Real Google AdSense Tag Container */}
      <div className="w-full max-w-[728px] min-h-[90px] flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 shadow-inner">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', textAlign: 'center' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        
        {/* Placeholder label displayed until AdSense script fills the slot */}
        <div className="py-2 px-4 flex flex-col items-center justify-center gap-1 text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase border border-amber-500/20">Google AdSense</span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">728 x 90 / Esnek Banner Reklam Alanı</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Google AdSense `adsbygoogle.js` kodu bu alanda yayınlanır.</span>
        </div>
      </div>
    </div>
  );
};

const PriceCard = ({ 
  title, 
  buy,
  sell, 
  change, 
  unit = '₺',
  flash,
  isForex = false 
}: { 
  title: string; 
  buy: number;
  sell: number; 
  change: number; 
  color: 'blue' | 'indigo' | 'yellow' | 'emerald'; 
  unit?: string;
  flash?: 'up' | 'down';
  isForex?: boolean;
}) => {
  const decCount = isForex ? 4 : 2;
  return (
    <div className={`bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group hover:border-blue-500/50 transition duration-300 ${
      flash === 'up' ? 'ring-1 ring-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30' : ''
    } ${
      flash === 'down' ? 'ring-1 ring-rose-500 bg-rose-50/50 dark:bg-rose-950/30' : ''
    }`}>
      {/* Top row: Title & Change badge */}
      <div className="flex justify-between items-center mb-2 sm:mb-2.5">
        <span className="text-[10px] sm:text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider sm:tracking-widest truncate mr-1">{title}</span>
        <span className={`text-[9px] sm:text-[11px] font-black px-1.5 sm:px-2 py-0.5 rounded-md whitespace-nowrap shrink-0 ${change >= 0 ? 'text-emerald-500 bg-emerald-500/10 dark:text-emerald-400' : 'text-rose-500 bg-rose-500/10 dark:text-rose-400'}`}>
          {change >= 0 ? '▲ +' : '▼ '}{change.toFixed(2)}%
        </span>
      </div>

      {/* Alış & Satış prices */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <div className="min-w-0">
          <div className="text-[8px] sm:text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">ALIŞ</div>
          <div className="text-xs xs:text-sm sm:text-base xl:text-lg font-black tracking-tight font-mono text-slate-700 dark:text-slate-200 whitespace-nowrap flex items-baseline gap-0.5 overflow-hidden">
            <span>{unit === '$' ? '$' : ''}{buy.toLocaleString('en-US', { minimumFractionDigits: decCount, maximumFractionDigits: decCount })}</span>
            {unit !== '$' && <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 shrink-0">{unit}</span>}
          </div>
        </div>

        <div className="min-w-0">
          <div className="text-[8px] sm:text-[9px] font-black text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-0.5">SATIŞ</div>
          <div className="text-xs xs:text-sm sm:text-base xl:text-lg font-black tracking-tight font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap flex items-baseline gap-0.5 overflow-hidden">
            <span>{unit === '$' ? '$' : ''}{sell.toLocaleString('en-US', { minimumFractionDigits: decCount, maximumFractionDigits: decCount })}</span>
            {unit !== '$' && <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 shrink-0">{unit}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

const AssetRow = ({ 
  name, 
  code, 
  category,
  buy, 
  sell, 
  change, 
  high,
  low,
  unit = '₺',
  volume,
  flash,
  isFavorite,
  onFavoriteToggle,
  onAlarm 
}: { 
  key?: string;
  name: string; 
  code: string; 
  category?: string;
  buy: number; 
  sell: number; 
  change: number; 
  high?: number;
  low?: number;
  unit?: string;
  volume?: number;
  flash?: 'up' | 'down';
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onAlarm: () => void;
}) => {
  const isGold = category === 'gold' || code === 'GA' || code === 'ONS' || code === 'CEYREK' || code === 'YARIM' || code === 'TAM' || code === 'CUMHURIYET' || code === 'ATA' || code === 'RESAT' || code === 'HAMIT' || code.includes('BILEZIK') || code.includes('ALTIN');
  const isCrypto = category === 'crypto' || code === 'BTC' || code === 'ETH' || code === 'SOL' || code === 'XRP' || code === 'BNB' || code === 'DOGE' || code === 'ADA' || code === 'AVAX' || code === 'DOT' || code === 'LINK' || code === 'SHIB' || code === 'PEPE' || code === 'SUI' || code === 'NEAR' || code === 'LTC';
  const isForex = category === 'forex' || (!isGold && !isCrypto && unit === '₺' && !code.startsWith('BIST') && code !== 'SIL' && code !== 'BRENT' && code !== 'PLATIN' && code !== 'BAKIR');

  const formatVol = (v?: number, u?: string) => {
    if (!v || v <= 0) return '-';
    const sym = u === '$' ? '$' : '₺';
    if (v >= 1_000_000_000) return `${sym}${(v / 1_000_000_000).toFixed(2)} Mr`;
    if (v >= 1_000_000) return `${sym}${(v / 1_000_000).toFixed(1)} Mn`;
    if (v >= 1_000) return `${sym}${(v / 1_000).toFixed(0)} B`;
    return `${sym}${v}`;
  };

  const decCount = isForex ? 4 : (buy < 0.01 ? 6 : (buy < 1 ? 4 : 2));
  const formattedBuy = buy.toLocaleString('en-US', { minimumFractionDigits: decCount, maximumFractionDigits: decCount });
  const formattedSell = sell.toLocaleString('en-US', { minimumFractionDigits: decCount, maximumFractionDigits: decCount });

  return (
    <tr className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition duration-150 ${
      flash === 'up' ? 'bg-emerald-500/10' : ''
    } ${
      flash === 'down' ? 'bg-rose-500/10' : ''
    }`}>
      <td className="py-2.5 sm:py-3.5 pl-1 pr-1 sm:pl-2 sm:pr-3">
        <div className="flex items-center min-w-0">
          <span className={`w-6 h-6 sm:w-8 sm:h-8 rounded flex items-center justify-center mr-1.5 sm:mr-2.5 text-[8px] sm:text-[10px] font-bold shrink-0 ${
            isGold 
              ? 'bg-yellow-900/30 text-yellow-500' 
              : isCrypto 
                ? 'bg-orange-500/20 text-orange-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}>
            {code.substring(0, 4)}
          </span>
          <span className="font-bold text-[11px] sm:text-sm text-slate-800 dark:text-slate-200 truncate max-w-[80px] xs:max-w-[120px] sm:max-w-none">{name}</span>
        </div>
      </td>

      <td className="py-2.5 sm:py-3.5 px-1 sm:px-3 font-mono font-bold text-slate-700 dark:text-slate-300 text-[11px] sm:text-sm whitespace-nowrap text-right sm:text-left">
        <span className="inline-flex items-baseline gap-0.5 sm:gap-1">
          {unit === '$' && <span>$</span>}
          <span>{formattedBuy}</span>
          {unit !== '$' && <span className="text-[9px] sm:text-[11px] font-bold text-slate-400">{unit}</span>}
        </span>
      </td>

      <td className="py-2.5 sm:py-3.5 px-1 sm:px-3 font-mono font-black text-blue-600 dark:text-blue-400 text-[11px] sm:text-sm whitespace-nowrap text-right sm:text-left">
        <span className="inline-flex items-baseline gap-0.5 sm:gap-1">
          {unit === '$' && <span>$</span>}
          <span>{formattedSell}</span>
          {unit !== '$' && <span className="text-[9px] sm:text-[11px] font-bold text-slate-400">{unit}</span>}
        </span>
      </td>

      <td className={`py-2.5 sm:py-3.5 px-1 sm:px-3 font-bold text-[10px] sm:text-xs whitespace-nowrap text-right sm:text-left ${change >= 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
        {change >= 0 ? '+' : ''}{change.toFixed(2)}%
      </td>

      <td className="py-2.5 sm:py-3.5 px-3 hidden sm:table-cell text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
        {formatVol(volume, unit)}
      </td>

      <td className="py-2.5 sm:py-3.5 px-3 hidden md:table-cell text-xs font-mono text-slate-400 whitespace-nowrap">
        {high && low ? `${low.toFixed(isForex ? 4 : 2)} - ${high.toFixed(isForex ? 4 : 2)}` : '-'}
      </td>

      <td className="py-2.5 sm:py-3.5 text-right pr-1 pl-1 sm:pr-2 sm:pl-2 whitespace-nowrap">
        <div className="flex justify-end space-x-0.5 sm:space-x-1">
          <button 
            onClick={onAlarm} 
            title="Fiyat alarmı kur"
            className="p-1 sm:p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <Bell size={12} className="sm:w-3.5 sm:h-3.5" />
          </button>

          <button 
            onClick={onFavoriteToggle} 
            title={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
            className={`p-1 sm:p-1.5 rounded-lg transition ${
              isFavorite 
                ? 'bg-amber-500/10 text-amber-500' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-amber-500 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Star size={12} className={`sm:w-3.5 sm:h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </td>
    </tr>
  );
};

const SelectField = ({ 
  label, 
  value, 
  onChange, 
  options 
}: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void; 
  options: Array<{ label: string; value: string }>;
}) => (
  <div>
    <label className="text-[10px] font-black text-blue-200 uppercase mb-2 block tracking-widest">{label}</label>
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-blue-500/30 border border-blue-400/50 rounded-xl p-3 font-bold text-xs sm:text-sm focus:outline-none text-white focus:ring-2 focus:ring-white/50"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value} className="text-slate-900 bg-white">
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
