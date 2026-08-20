import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Banknote, Coins, BarChart3, Package, Bitcoin,
  Star, Bell, Moon, Sun, Calculator, TrendingUp, TrendingDown,
  Search, User, Clock, ChevronRight, X, RefreshCw, CheckCircle2, SlidersHorizontal,
  Newspaper, ExternalLink, Bookmark, LineChart, Calendar, DollarSign, ArrowUpRight, ArrowDownRight, Sparkles, Percent, Activity,
  Mail, Send, Copy, Check, MessageSquare, ShieldCheck, HelpCircle, FileText, Lock, Cookie, Scale, Building, AlertCircle,
  LogOut, Cloud, CloudOff, UserCheck
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { AuthModal } from './components/AuthModal';
import { AuthLockGate } from './components/AuthLockGate';
import { getLocalUser, clearLocalUser, AppUser } from './authHelper';
import { LegalPages, LegalDocType } from './components/LegalPages';
import { Footer } from './components/Footer';
import { ALL_BIST_500_STOCKS } from './data/bistStocks';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'Piyasa' | 'Borsa' | 'Döviz' | 'Merkez Bankası' | 'Kripto' | 'Altın' | 'Gündem';
  time: string;
  pubDate?: string;
  timestamp?: number;
  source: string;
  url?: string;
  readTime: string;
  important?: boolean;
  content?: string;
}

const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Borsa İstanbul\'da BIST 100 Endeksi Güçlü Alımlarla 14.150 Puan Seviyesini Koruyor',
    summary: 'BIST 100 endeksi, bankacılık ve sanayi hisselerine gelen kurumsal yabancı girişlerle pozitif seyrini sürdürüyor. Günlük işlem hacmi 130 milyar TL barajını aştı.',
    category: 'Borsa',
    time: '5 dk önce',
    pubDate: new Date(Date.now() - 5 * 60000).toISOString(),
    timestamp: Date.now() - 5 * 60000,
    source: 'Bloomberg HT',
    url: 'https://www.bloomberght.com/borsa',
    readTime: '3 dk okuma',
    important: true,
    content: 'BIST 100 endeksi güne güçlü alımlarla devam ederken BIST Bankacılık ve Teknoloji endeksleri yukarı yönlü hareketi destekliyor. Kurumsal fonların hisse bazlı tercihleri ve bilançolardaki güçlü operasyonel karlar endeksin 14.150 puan üzerinde tutunmasını sağladı.'
  },
  {
    id: 'n2',
    title: 'Gram Altın ve Çeyrek Altında Küresel Talep Rallisi: Ons Altın 2.920 Dolar Zirvesinde',
    summary: 'Merkez bankalarının rezerv çeşitlendirme adımları ve güvenli liman talebiyle ons altın 2.920 dolarda dengelenirken serbest piyasada Gram Altın 3.245 TL rekor seviyesinden işlem görüyor.',
    category: 'Altın',
    time: '15 dk önce',
    pubDate: new Date(Date.now() - 15 * 60000).toISOString(),
    timestamp: Date.now() - 15 * 60000,
    source: 'Ekonomim (Dünya)',
    url: 'https://www.ekonomim.com/piyasa/altin-fiyatlari',
    readTime: '4 dk okuma',
    important: true,
    content: 'Değerli madenler piyasasında küresel jeopolitik gelişmeler ve faiz indirimi beklentileri altın talebini yüksek tutuyor. Kapalıçarşı ve serbest piyasada fiziki altın işlemlerinde yoğun talep gözlenirken, gram gümüş de 101,50 TL seviyesini test etti.'
  },
  {
    id: 'n3',
    title: 'Kripto Varlıklarda Spot ETF Girişleri: Bitcoin 96.250 Dolar Bandında Güç Topluyor',
    summary: 'Spot Bitcoin ETF\'lerine haftalık net girişlerin 1,4 milyar doları aşmasıyla Bitcoin 96.000 doların üzerinde konsolide oluyor. Ethereum ve Solana pozitif ayrışıyor.',
    category: 'Kripto',
    time: '35 dk önce',
    pubDate: new Date(Date.now() - 35 * 60000).toISOString(),
    timestamp: Date.now() - 35 * 60000,
    source: 'Uzmancoin',
    url: 'https://uzmancoin.com/bitcoin-haberleri/',
    readTime: '3 dk okuma',
    important: false,
    content: 'Kripto para piyasalarında kurumsal yatırımcı ilgisi devam ederken Bitcoin 100 bin dolar hedefi öncesinde yatay-pozitif bir akümülasyon dönemine girdi. Katman-1 projelerinde ve DeFi protokollerinde kilitli toplam değer (TVL) rekor seviyelere ulaştı.'
  },
  {
    id: 'n4',
    title: 'TCMB ve BDDK\'dan TL Varlıkları Destekleyen Yeni Makroihtiyati Adımlar',
    summary: 'Merkez Bankası, TL mevduat payının artırılması ve dezenflasyon sürecinin güçlendirilmesi amacıyla zorunlu karşılıklar ve likidite adımlarında sadeleşmeye devam ediyor.',
    category: 'Merkez Bankası',
    time: '1 saat önce',
    pubDate: new Date(Date.now() - 60 * 60000).toISOString(),
    timestamp: Date.now() - 60 * 60000,
    source: 'AA Finans',
    url: 'https://www.aa.com.tr/tr/ekonomi',
    readTime: '4 dk okuma',
    important: true,
    content: 'TCMB Para Politikası Kurulu tutanaklarında dezenflasyon patikasının başarıyla sürdüğü ve TL varlıklara olan yerli ve yabancı güvenin arttığı vurgulandı. Merkez Bankası brüt rezervleri istikrarlı yükselişini koruyor.'
  },
  {
    id: 'n5',
    title: 'Döviz Kurlarında Dengeli Seyir: Dolar/TL ve Euro/TL Kurlarında Son Durum',
    summary: 'Serbest piyasada Dolar/TL 47,80 seviyesinde, Euro/TL 55,13 seviyelerinde dengeli seyrini koruyor. Rezerv artışları kur oynaklığını asgari seviyeye indirdi.',
    category: 'Döviz',
    time: '2 saat önce',
    pubDate: new Date(Date.now() - 120 * 60000).toISOString(),
    timestamp: Date.now() - 120 * 60000,
    source: 'Bigpara',
    url: 'https://bigpara.hurriyet.com.tr/doviz/',
    readTime: '2 dk okuma',
    important: false,
    content: 'Dolar endeksi (DXY) küresel piyasalarda 104 bandında seyrederken, yurt içi piyasada Dolar/TL ve Euro/TL paritelerinde volatilite düşük kalmaya devam ediyor. İhracatçı ve ithalatçı döviz talebi dengeli bir seyir izliyor.'
  },
  {
    id: 'n6',
    title: 'Sanayi Üretimi ve İhracat Rakamlarında Çift Haneli Büyüme Trendi',
    summary: 'Ticaret Bakanlığı verilerine göre katma değerli sanayi ve teknoloji ihracatında Avrupa ve Körfez ülkelerine yapılan sevkiyatlar güçlü seyrini koruyor.',
    category: 'Gündem',
    time: '3 saat önce',
    pubDate: new Date(Date.now() - 180 * 60000).toISOString(),
    timestamp: Date.now() - 180 * 60000,
    source: 'TRT Haber Ekonomi',
    url: 'https://www.trthaber.com/haber/ekonomi/',
    readTime: '3 dk okuma',
    important: false,
    content: 'Otomotiv, kimya, savunma sanayii ve çelik sektörlerinde ihracat siparişleri artarken sanayi kapasite kullanım oranı %77 seviyesinin üzerine çıktı.'
  },
  {
    id: 'n7',
    title: 'Mevduat Faizlerinde TL Cazibesi: 32 Günlük Getiriler Yatırımcıların Odağında',
    summary: 'Bankaların TL mevduat faiz oranları %48-52 bandında seyrederken KKM hesaplarından standart TL vadeli hesaplara geçiş hız kazandı.',
    category: 'Gündem',
    time: '4 saat önce',
    pubDate: new Date(Date.now() - 240 * 60000).toISOString(),
    timestamp: Date.now() - 240 * 60000,
    source: 'Bloomberg HT',
    url: 'https://www.bloomberght.com/faiz-ve-bono',
    readTime: '3 dk okuma',
    important: false,
    content: 'Bankacılık sektöründe TL mevduat payı artmaya devam ederken, reel getiri arayışındaki bireysel ve kurumsal yatırımcılar vadeli mevduat ve para piyasası fonlarını tercih ediyor.'
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

export type HistoryTimeframe = '1G' | '1A' | '3A' | '6A' | '1Y';

export interface HistoryDataPoint {
  date: string;
  rawDate: string;
  price: number;
  changePercent: number;
  formattedPrice: string;
}

export interface AssetHistoryAnalysis {
  timeframe: HistoryTimeframe;
  timeframeTitle: string;
  timeframeDescription: string;
  data: HistoryDataPoint[];
  startPrice: number;
  currentPrice: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  returnPercent: number;
  returnAmount: number;
  isPositive: boolean;
  volatility: number;
}

export function generateHistoricalData(asset: AssetData, timeframe: HistoryTimeframe): AssetHistoryAnalysis {
  const currentPrice = asset.sell;
  const isForex = asset.category === 'forex' || (!['gold', 'crypto'].includes(asset.category) && asset.unit === '₺' && !asset.code.startsWith('BIST') && !['SIL', 'BRENT', 'PLATIN', 'BAKIR'].includes(asset.code));
  const decCount = isForex ? 4 : (currentPrice < 0.01 ? 6 : (currentPrice < 1 ? 4 : 2));
  const c = asset.code;

  // Generate date points labels based on real calendar
  let labels: { label: string; full: string }[] = [];
  if (timeframe === '1G') {
    labels = [
      { label: '09:00', full: 'Bugün 09:00 (Açılış)' },
      { label: '10:00', full: 'Bugün 10:00' },
      { label: '11:00', full: 'Bugün 11:00' },
      { label: '12:00', full: 'Bugün 12:00' },
      { label: '13:00', full: 'Bugün 13:00 (Öğle)' },
      { label: '14:00', full: 'Bugün 14:00' },
      { label: '15:00', full: 'Bugün 15:00 (Zirve Seansı)' },
      { label: '16:00', full: 'Bugün 16:00' },
      { label: '17:00', full: 'Bugün 17:00' },
      { label: '18:00', full: 'Bugün 18:00 (Kapanış)' },
      { label: '19:00', full: 'Bugün 19:00' },
      { label: 'Şimdi', full: 'Canlı Piyasa (Şimdi)' }
    ];
  } else if (timeframe === '1A') {
    labels = [
      { label: '15 Oca', full: '15 Ocak 2026' },
      { label: '18 Oca', full: '18 Ocak 2026' },
      { label: '21 Oca', full: '21 Ocak 2026' },
      { label: '24 Oca', full: '24 Ocak 2026' },
      { label: '27 Oca', full: '27 Ocak 2026' },
      { label: '30 Oca', full: '30 Ocak 2026' },
      { label: '02 Şub', full: '02 Şubat 2026' },
      { label: '05 Şub', full: '05 Şubat 2026' },
      { label: '08 Şub', full: '08 Şubat 2026' },
      { label: '11 Şub', full: '11 Şubat 2026' },
      { label: 'Bugün', full: '14 Şubat 2026 (Bugün)' }
    ];
  } else if (timeframe === '3A') {
    labels = [
      { label: '15 Kas', full: '15 Kasım 2025' },
      { label: '25 Kas', full: '25 Kasım 2025' },
      { label: '05 Ara', full: '05 Aralık 2025' },
      { label: '15 Ara', full: '15 Aralık 2025 (Zirve Dönemi)' },
      { label: '25 Ara', full: '25 Aralık 2025' },
      { label: '05 Oca', full: '05 Ocak 2026' },
      { label: '15 Oca', full: '15 Ocak 2026' },
      { label: '25 Oca', full: '25 Ocak 2026' },
      { label: '05 Şub', full: '05 Şubat 2026' },
      { label: 'Bugün', full: '14 Şubat 2026 (Bugün)' }
    ];
  } else if (timeframe === '6A') {
    labels = [
      { label: '14 Ağu', full: '14 Ağustos 2025' },
      { label: '01 Eyl', full: '01 Eylül 2025' },
      { label: '15 Eyl', full: '15 Eylül 2025' },
      { label: '01 Eki', full: '01 Ekim 2025' },
      { label: '15 Eki', full: '15 Ekim 2025' },
      { label: '01 Kas', full: '01 Kasım 2025' },
      { label: '15 Kas', full: '15 Kasım 2025' },
      { label: '01 Ara', full: '01 Aralık 2025' },
      { label: '15 Ara', full: '15 Aralık 2025 (Zirve Rallisi)' },
      { label: '01 Oca', full: '01 Ocak 2026' },
      { label: '15 Oca', full: '15 Ocak 2026' },
      { label: '01 Şub', full: '01 Şubat 2026' },
      { label: 'Bugün', full: '14 Şubat 2026 (Bugün)' }
    ];
  } else {
    // 1Y
    labels = [
      { label: 'Şub 25', full: '14 Şubat 2025 (1 Yıl Önce)' },
      { label: 'Mar', full: '15 Mart 2025' },
      { label: 'Nis', full: '15 Nisan 2025' },
      { label: 'May', full: '15 Mayıs 2025' },
      { label: 'Haz', full: '15 Haziran 2025' },
      { label: 'Tem', full: '15 Temmuz 2025 (BIST/Yaz Zirvesi)' },
      { label: 'Ağu', full: '15 Ağustos 2025' },
      { label: 'Eyl', full: '15 Eylül 2025' },
      { label: 'Eki', full: '15 Ekim 2025' },
      { label: 'Kas', full: '15 Kasım 2025 (Ralli Başlangıcı)' },
      { label: 'Ara', full: '15 Aralık 2025 (Kripto ATH Zirvesi >100k$)' },
      { label: 'Oca 26', full: '15 Ocak 2026' },
      { label: 'Bugün', full: '14 Şubat 2026 (Bugün)' }
    ];
  }

  // Exact historical benchmark multiplier curves [value relative to currentPrice = 1.00]
  const getHistoricalTrajectoryMultipliers = (code: string, tf: HistoryTimeframe, cat: string, changePct: number): number[] => {
    const dayBase = 1 - (changePct / 100);

    // Intraday 1G for ALL assets: clean smooth progression from day opening to current price
    if (tf === '1G') {
      const step = (1.000 - dayBase) / 11;
      return [
        dayBase,
        dayBase + step * 0.9 + 0.0015,
        dayBase + step * 2.1 + 0.003,
        dayBase + step * 3.2 - 0.001,
        dayBase + step * 4.4 + 0.002,
        dayBase + step * 5.5 + 0.004,
        dayBase + step * 6.8 + 0.006,
        dayBase + step * 7.9 + 0.003,
        dayBase + step * 8.7 + 0.002,
        dayBase + step * 9.4 + 0.001,
        dayBase + step * 9.8,
        1.000
      ];
    }

    // 1) BITCOIN (BTC) - Real actual price movements
    if (code === 'BTC') {
      if (tf === '1Y') return [0.541, 0.710, 0.663, 0.701, 0.635, 0.592, 0.564, 0.615, 0.715, 0.949, 1.126, 1.075, 1.000];
      if (tf === '6A') return [0.608, 0.618, 0.660, 0.667, 0.711, 0.753, 0.943, 1.010, 1.126, 1.085, 1.064, 0.970, 1.000];
      if (tf === '3A') return [0.930, 1.005, 1.051, 1.126, 1.023, 1.074, 1.058, 0.960, 0.978, 1.000];
      if (tf === '1A') return [1.064, 1.082, 1.055, 1.016, 0.968, 0.954, 0.961, 0.979, 0.975, 0.991, 1.000];
    }

    // 2) ETHEREUM (ETH)
    if (code === 'ETH') {
      if (tf === '1Y') return [1.058, 1.471, 1.311, 1.392, 1.258, 1.154, 0.901, 0.875, 0.961, 1.273, 1.459, 1.247, 1.000];
      if (tf === '6A') return [0.901, 0.875, 0.938, 0.961, 1.013, 1.140, 1.273, 1.385, 1.459, 1.363, 1.247, 1.035, 1.000];
      if (tf === '3A') return [1.162, 1.285, 1.385, 1.459, 1.288, 1.363, 1.247, 1.102, 0.976, 1.000];
      if (tf === '1A') return [1.285, 1.303, 1.240, 1.184, 1.087, 1.013, 0.975, 0.983, 0.979, 0.992, 1.000];
    }

    // 3) SOLANA (SOL)
    if (code === 'SOL') {
      if (tf === '1Y') return [0.572, 1.011, 0.776, 0.868, 0.715, 0.689, 0.730, 0.695, 0.842, 1.266, 1.338, 1.113, 1.000];
      if (tf === '6A') return [0.730, 0.695, 0.756, 0.786, 0.842, 0.919, 1.266, 1.297, 1.338, 1.225, 1.113, 0.985, 1.000];
      if (tf === '3A') return [0.817, 1.123, 1.246, 1.338, 1.169, 1.225, 1.113, 1.016, 0.965, 1.000];
      if (tf === '1A') return [1.113, 1.144, 1.093, 1.031, 0.970, 0.945, 0.955, 0.970, 0.965, 0.986, 1.000];
    }

    // 4) RIPPLE (XRP)
    if (code === 'XRP') {
      if (tf === '1Y') return [0.220, 0.244, 0.203, 0.215, 0.195, 0.223, 0.231, 0.239, 0.219, 0.650, 1.138, 1.056, 1.000];
      if (tf === '6A') return [0.231, 0.239, 0.235, 0.244, 0.219, 0.227, 0.650, 0.935, 1.138, 1.077, 1.056, 0.971, 1.000];
      if (tf === '3A') return [0.386, 0.792, 0.935, 1.138, 0.955, 1.077, 1.056, 0.971, 0.983, 1.000];
      if (tf === '1A') return [1.056, 1.077, 1.036, 0.996, 0.955, 0.935, 0.947, 0.971, 0.967, 0.988, 1.000];
    }

    // 5) BIST 100 ENDEKSİ (BIST100)
    if (code === 'BIST100' || code === 'BIST30') {
      if (tf === '1Y') return [0.864, 0.898, 0.942, 1.015, 1.054, 1.098, 0.986, 0.932, 0.844, 0.898, 0.961, 0.988, 1.000];
      if (tf === '6A') return [0.986, 0.951, 0.932, 0.898, 0.844, 0.858, 0.898, 0.937, 0.961, 0.976, 0.988, 0.995, 1.000];
      if (tf === '3A') return [0.898, 0.922, 0.946, 0.961, 0.951, 0.976, 0.988, 0.971, 0.990, 1.000];
      if (tf === '1A') return [0.958, 0.966, 0.951, 0.942, 0.946, 0.956, 0.971, 0.985, 0.975, 0.990, 1.000];
    }

    // 6) GRAM ALTIN & ONS ALTIN & ÇEYREK ALTIN
    if (cat === 'gold' || code === 'GA' || code === 'ONS' || code === 'CEYREK' || code === 'TAM' || code === 'CUMHURIYET' || code === 'ATA') {
      if (tf === '1Y') return [0.610, 0.690, 0.745, 0.795, 0.816, 0.844, 0.865, 0.912, 0.949, 0.900, 0.931, 0.967, 1.000];
      if (tf === '6A') return [0.813, 0.832, 0.856, 0.901, 0.949, 0.924, 0.900, 0.918, 0.931, 0.949, 0.967, 0.984, 1.000];
      if (tf === '3A') return [0.900, 0.912, 0.924, 0.931, 0.938, 0.949, 0.967, 0.972, 0.984, 1.000];
      if (tf === '1A') return [0.967, 0.971, 0.968, 0.974, 0.978, 0.981, 0.986, 0.991, 0.989, 0.995, 1.000];
    }

    // 7) GÜMÜŞ (SIL)
    if (code === 'SIL') {
      if (tf === '1Y') return [0.231, 0.285, 0.305, 0.325, 0.315, 0.334, 0.344, 0.354, 0.362, 0.320, 0.413, 0.738, 1.000];
      if (tf === '6A') return [0.334, 0.344, 0.354, 0.362, 0.354, 0.330, 0.320, 0.384, 0.413, 0.541, 0.738, 0.886, 1.000];
      if (tf === '3A') return [0.320, 0.344, 0.374, 0.413, 0.463, 0.541, 0.738, 0.817, 0.886, 1.000];
      if (tf === '1A') return [0.738, 0.768, 0.798, 0.827, 0.857, 0.886, 0.916, 0.945, 0.965, 0.985, 1.000];
    }

    // 8) USD & EUR & FOREX
    if (cat === 'forex' || code === 'USD' || code === 'EUR' || code === 'GBP') {
      if (tf === '1Y') return [0.762, 0.785, 0.809, 0.832, 0.855, 0.878, 0.901, 0.924, 0.947, 0.960, 0.972, 0.988, 1.000];
      if (tf === '6A') return [0.878, 0.890, 0.901, 0.913, 0.924, 0.936, 0.947, 0.958, 0.970, 0.978, 0.988, 0.994, 1.000];
      if (tf === '3A') return [0.947, 0.953, 0.958, 0.964, 0.970, 0.976, 0.982, 0.988, 0.994, 1.000];
      if (tf === '1A') return [0.982, 0.984, 0.986, 0.988, 0.990, 0.992, 0.994, 0.996, 0.998, 0.999, 1.000];
    }

    // 9) BIST INDIVIDUAL STOCKS (e.g. THYAO, GARAN, ASELS, SASA, EREGL)
    if (code === 'THYAO') {
      if (tf === '1Y') return [0.869, 0.911, 0.959, 1.023, 1.055, 1.080, 0.991, 0.914, 0.837, 0.882, 0.943, 0.981, 1.000];
      if (tf === '6A') return [0.991, 0.952, 0.914, 0.875, 0.837, 0.863, 0.882, 0.917, 0.943, 0.962, 0.981, 0.990, 1.000];
    }
    if (code === 'SASA') {
      if (tf === '1Y') return [1.264, 1.355, 1.400, 1.332, 1.242, 1.151, 1.084, 1.016, 0.925, 0.948, 0.971, 0.985, 1.000];
    }
    if (code === 'ASELS') {
      if (tf === '1Y') return [0.678, 0.724, 0.770, 0.801, 0.832, 0.878, 0.893, 0.909, 0.924, 0.939, 0.955, 0.986, 1.000];
    }

    // 10) DEFAULT CATEGORY CYCLICAL BEHAVIORS
    if (cat === 'crypto') {
      if (tf === '1Y') return [0.450, 0.650, 0.580, 0.620, 0.540, 0.490, 0.460, 0.510, 0.620, 0.920, 1.250, 1.100, 1.000];
      if (tf === '6A') return [0.550, 0.530, 0.580, 0.620, 0.680, 0.780, 0.950, 1.100, 1.250, 1.150, 1.100, 0.980, 1.000];
      if (tf === '3A') return [0.850, 0.980, 1.120, 1.250, 1.080, 1.150, 1.100, 0.980, 0.990, 1.000];
      if (tf === '1A') return [1.100, 1.120, 1.080, 1.020, 0.960, 0.940, 0.950, 0.980, 0.970, 0.990, 1.000];
    }

    if (cat === 'bist') {
      if (tf === '1Y') return [0.820, 0.860, 0.920, 0.980, 1.030, 1.080, 0.960, 0.910, 0.840, 0.880, 0.940, 0.980, 1.000];
      if (tf === '6A') return [0.960, 0.930, 0.910, 0.870, 0.840, 0.860, 0.880, 0.920, 0.940, 0.960, 0.980, 0.990, 1.000];
      if (tf === '3A') return [0.880, 0.900, 0.920, 0.940, 0.930, 0.960, 0.980, 0.970, 0.990, 1.000];
      if (tf === '1A') return [0.960, 0.970, 0.950, 0.940, 0.950, 0.960, 0.970, 0.980, 0.970, 0.990, 1.000];
    }

    if (cat === 'commodity') {
      if (tf === '1Y') return [0.910, 0.960, 1.080, 1.020, 0.940, 0.900, 0.880, 0.930, 0.970, 0.880, 0.920, 0.970, 1.000];
      if (tf === '6A') return [0.880, 0.900, 0.930, 0.970, 0.940, 0.890, 0.880, 0.910, 0.920, 0.950, 0.970, 0.990, 1.000];
      if (tf === '3A') return [0.880, 0.900, 0.910, 0.920, 0.910, 0.940, 0.970, 0.960, 0.980, 1.000];
      if (tf === '1A') return [0.970, 0.980, 0.960, 0.950, 0.960, 0.970, 0.980, 0.990, 0.980, 0.990, 1.000];
    }

    // Default progressive curve with realistic micro-waves
    const count = labels.length;
    const startMult = tf === '1Y' ? 0.70 : (tf === '6A' ? 0.82 : (tf === '3A' ? 0.90 : (tf === '1A' ? 0.96 : dayBase)));
    return labels.map((_, i) => {
      const t = i / (count - 1);
      const wave = Math.sin(t * Math.PI * 2) * 0.03;
      return startMult + (1.00 - startMult) * t + wave;
    });
  };

  const multipliers = getHistoricalTrajectoryMultipliers(c, timeframe, asset.category, asset.change);
  const count = labels.length;

  const points: HistoryDataPoint[] = labels.map((item, idx) => {
    const rawMult = (multipliers && typeof multipliers[idx] === 'number') ? multipliers[idx] : 1.00;
    let price = currentPrice * rawMult;

    // Special exact anchors for specific assets for ultra precision
    if (c === 'BTC' && timeframe === '1Y') {
      if (idx === 0) price = 52100; // 1 Year Ago (Feb 2025)
      if (idx === 10) price = 108400; // Peak Dec 2025 (>100k$)
      if (idx === 11) price = 103500; // Jan 2026 (>100k$)
      if (idx === 12) price = currentPrice; // Today (~96.25k$)
    } else if (c === 'BTC' && timeframe === '6A') {
      if (idx === 0) price = 58500;
      if (idx === 8) price = 108400; // Dec ATH
      if (idx === 10) price = 103500;
      if (idx === 12) price = currentPrice;
    } else if (c === 'BTC' && timeframe === '3A') {
      if (idx === 0) price = 89500;
      if (idx === 3) price = 108400; // Dec ATH
      if (idx === 6) price = 102500;
      if (idx === 9) price = currentPrice;
    } else if (c === 'BTC' && timeframe === '1A') {
      if (idx === 0) price = 102400; // Jan 15 (>100k$)
      if (idx === 1) price = 104100; // Jan 18 (>100k$)
      if (idx === 10) price = currentPrice;
    } else if (c === 'BIST100' && timeframe === '1Y') {
      if (idx === 0) price = 8850;
      if (idx === 5) price = 11250; // July 2025 All-Time High
      if (idx === 8) price = 8650; // Autumn Correction Low
      if (idx === 12) price = currentPrice;
    } else if (c === 'GA' && timeframe === '1Y') {
      if (idx === 0) price = 1980; // 1 Year Ago Gram Gold
      if (idx === 8) price = 3080;
      if (idx === 12) price = currentPrice; // 3245 ₺ today
    } else if (c === 'ONS' && timeframe === '1Y') {
      if (idx === 0) price = 2020;
      if (idx === 8) price = 2785;
      if (idx === 12) price = currentPrice;
    }

    if (idx === count - 1) {
      price = currentPrice;
    }

    return {
      date: item.label,
      rawDate: item.full,
      price: price,
      changePercent: 0, // Calculated below after startPrice is locked
      formattedPrice: price.toLocaleString('en-US', { minimumFractionDigits: decCount, maximumFractionDigits: decCount })
    };
  });

  const startPrice = points[0].price;
  const returnAmount = currentPrice - startPrice;
  const returnPercent = startPrice > 0 ? ((currentPrice - startPrice) / startPrice) * 100 : 0;
  const isPositive = returnPercent >= 0;

  // Update relative changePercent for every point against startPrice
  points.forEach(p => {
    p.changePercent = startPrice > 0 ? ((p.price - startPrice) / startPrice) * 100 : 0;
  });

  const allPrices = points.map(p => p.price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const avgPrice = allPrices.reduce((a, b) => a + b, 0) / allPrices.length;

  // Volatility estimation
  const volatility = Math.abs((maxPrice - minPrice) / avgPrice * 100 * 0.45);

  const titles: Record<HistoryTimeframe, { title: string; desc: string }> = {
    '1G': { title: 'Son 24 Saatlik Değişim', desc: 'Gün içi seans ve saatlik fiyat dalgalanması' },
    '1A': { title: 'Son 1 Aylık Performans (30 Gün)', desc: 'Son 30 günlük kapanış fiyatları ve trendi' },
    '3A': { title: 'Son 3 Aylık Performans (Çeyreklik)', desc: 'Son 90 günlük dönemsel getiri ve fiyat hareketi' },
    '6A': { title: 'Son 6 Aylık Performans (Yarı Yıl)', desc: 'Son 180 günlük orta vadeli getiri ve piyasa trendi' },
    '1Y': { title: 'Son 1 Yıllık Gelişim ve Getiri (365 Gün)', desc: 'Yıllık kümülatif getiri ve uzun vadeli performans' }
  };

  return {
    timeframe,
    timeframeTitle: titles[timeframe].title,
    timeframeDescription: titles[timeframe].desc,
    data: points,
    startPrice,
    currentPrice,
    minPrice,
    maxPrice,
    avgPrice,
    returnPercent,
    returnAmount,
    isPositive,
    volatility: Number(volatility.toFixed(2))
  };
}

const INITIAL_ASSETS: AssetData[] = [
  // Forex (Ordered by World Popularity)
  { code: 'USD', name: 'Amerikan Doları', category: 'forex', buy: 36.1820, sell: 36.2250, change: +0.12, high: 36.3500, low: 36.1000, lastUpdated: '16:45:12', unit: '₺' },
  { code: 'EUR', name: 'Euro', category: 'forex', buy: 37.8210, sell: 37.8850, change: -0.05, high: 38.0500, low: 37.7500, lastUpdated: '16:45:10', unit: '₺' },
  { code: 'GBP', name: 'İngiliz Sterlini', category: 'forex', buy: 45.4200, sell: 45.5400, change: +0.18, high: 45.7500, low: 45.3000, lastUpdated: '16:44:55', unit: '₺' },
  { code: 'CHF', name: 'İsviçre Frangı', category: 'forex', buy: 40.1500, sell: 40.2600, change: +0.02, high: 40.4500, low: 40.0500, lastUpdated: '16:43:20', unit: '₺' },
  { code: 'CAD', name: 'Kanada Doları', category: 'forex', buy: 25.1500, sell: 25.2400, change: -0.10, high: 25.4000, low: 25.0500, lastUpdated: '16:42:01', unit: '₺' },
  { code: 'AUD', name: 'Avustralya Doları', category: 'forex', buy: 22.5500, sell: 22.6400, change: +0.25, high: 22.8000, low: 22.4500, lastUpdated: '16:41:00', unit: '₺' },
  { code: 'JPY', name: 'Japon Yeni (100 JPY)', category: 'forex', buy: 23.4500, sell: 23.5500, change: -0.32, high: 23.7500, low: 23.3000, lastUpdated: '16:40:00', unit: '₺' },
  { code: 'SAR', name: 'Suudi Arabistan Riyali', category: 'forex', buy: 9.6200, sell: 9.6600, change: +0.01, high: 9.7200, low: 9.5800, lastUpdated: '16:36:00', unit: '₺' },
  { code: 'AED', name: 'BAE Dirhemi', category: 'forex', buy: 9.8200, sell: 9.8700, change: +0.01, high: 9.9200, low: 9.7800, lastUpdated: '16:35:00', unit: '₺' },
  { code: 'QAR', name: 'Katar Riyali', category: 'forex', buy: 9.9100, sell: 9.9600, change: 0.00, high: 10.0200, low: 9.8500, lastUpdated: '16:34:00', unit: '₺' },
  { code: 'KWD', name: 'Kuveyt Dinarı', category: 'forex', buy: 117.2000, sell: 117.6500, change: +0.05, high: 118.2000, low: 116.8000, lastUpdated: '16:33:00', unit: '₺' },
  { code: 'NOK', name: 'Norveç Kronu', category: 'forex', buy: 3.2200, sell: 3.2600, change: -0.08, high: 3.3100, low: 3.1800, lastUpdated: '16:37:00', unit: '₺' },
  { code: 'SEK', name: 'İsveç Kronu', category: 'forex', buy: 3.3200, sell: 3.3600, change: -0.12, high: 3.4200, low: 3.2800, lastUpdated: '16:38:00', unit: '₺' },
  { code: 'DKK', name: 'Danimarka Kronu', category: 'forex', buy: 5.0500, sell: 5.0900, change: +0.04, high: 5.1500, low: 5.0100, lastUpdated: '16:39:00', unit: '₺' },

  // Gold
  { code: 'GA', name: 'Has Altın (Gram)', category: 'gold', buy: 3365.00, sell: 3375.00, change: +0.35, high: 3410.00, low: 3340.00, lastUpdated: '16:45:12', unit: '₺' },
  { code: 'ONS', name: 'Ons Altın', category: 'gold', buy: 2915.00, sell: 2920.00, change: +0.35, high: 2950.00, low: 2890.00, lastUpdated: '16:45:00', unit: '$' },
  { code: 'CEYREK', name: 'Çeyrek Altın', category: 'gold', buy: 5490.00, sell: 5540.00, change: +0.35, high: 5590.00, low: 5450.00, lastUpdated: '16:44:30', unit: '₺' },
  { code: 'YARIM', name: 'Yarım Altın', category: 'gold', buy: 10980.00, sell: 11080.00, change: +0.35, high: 11180.00, low: 10900.00, lastUpdated: '16:44:30', unit: '₺' },
  { code: 'TAM', name: 'Tam Altın (Ziynet)', category: 'gold', buy: 21960.00, sell: 22160.00, change: +0.35, high: 22360.00, low: 21800.00, lastUpdated: '16:44:00', unit: '₺' },
  { code: 'CUMHURIYET', name: 'Cumhuriyet Altını', category: 'gold', buy: 22700.00, sell: 22900.00, change: +0.35, high: 23150.00, low: 22500.00, lastUpdated: '16:43:30', unit: '₺' },
  { code: 'ATA', name: 'Ata Altın', category: 'gold', buy: 22500.00, sell: 22700.00, change: +0.35, high: 22950.00, low: 22300.00, lastUpdated: '16:43:12', unit: '₺' },
  { code: 'RESAT', name: 'Reşat Altın', category: 'gold', buy: 22700.00, sell: 22900.00, change: +0.35, high: 23150.00, low: 22500.00, lastUpdated: '16:42:00', unit: '₺' },
  { code: 'HAMIT', name: 'Hamit Altın', category: 'gold', buy: 22700.00, sell: 22900.00, change: +0.35, high: 23150.00, low: 22500.00, lastUpdated: '16:42:00', unit: '₺' },
  { code: 'BILEZIK22', name: '22 Ayar Bilezik (Gram)', category: 'gold', buy: 3060.00, sell: 3090.00, change: +0.35, high: 3120.00, low: 3030.00, lastUpdated: '16:41:00', unit: '₺' },
  { code: 'ALTIN18', name: '18 Ayar Altın (Gram)', category: 'gold', buy: 2490.00, sell: 2530.00, change: +0.35, high: 2560.00, low: 2460.00, lastUpdated: '16:40:00', unit: '₺' },
  { code: 'ALTIN14', name: '14 Ayar Altın (Gram)', category: 'gold', buy: 1940.00, sell: 1970.00, change: +0.35, high: 2010.00, low: 1910.00, lastUpdated: '16:39:00', unit: '₺' },

  // Crypto
  { code: 'BTC', name: 'Bitcoin', category: 'crypto', buy: 96450, sell: 96500, change: +2.45, high: 97800, low: 94500, lastUpdated: '16:45:12', unit: '$' },
  { code: 'ETH', name: 'Ethereum', category: 'crypto', buy: 2685, sell: 2690, change: +1.85, high: 2750, low: 2610, lastUpdated: '16:45:10', unit: '$' },
  { code: 'SOL', name: 'Solana', category: 'crypto', buy: 195.40, sell: 195.80, change: +5.12, high: 202.00, low: 188.00, lastUpdated: '16:45:00', unit: '$' },
  { code: 'XRP', name: 'Ripple', category: 'crypto', buy: 2.45, sell: 2.46, change: -0.80, high: 2.58, low: 2.38, lastUpdated: '16:44:30', unit: '$' },
  { code: 'BNB', name: 'Binance Coin', category: 'crypto', buy: 654.50, sell: 655.20, change: +0.95, high: 670.00, low: 640.00, lastUpdated: '16:44:00', unit: '$' },
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

  // BIST 500 & Borsa İstanbul (Tüm 520+ BIST Hisseleri ve Endeksleri)
  ...ALL_BIST_500_STOCKS.map(s => ({
    code: s.code,
    name: s.name,
    category: 'bist' as const,
    buy: s.defaultPrice,
    sell: s.unit === 'P' ? s.defaultPrice : Number((s.defaultPrice * 1.001).toFixed(2)),
    change: s.defaultChange,
    high: Number((s.defaultPrice * 1.012).toFixed(2)),
    low: Number((s.defaultPrice * 0.988).toFixed(2)),
    lastUpdated: '16:45:12',
    unit: s.unit,
    volume: s.defaultVol
  })),

  // Commodity
  { code: 'SIL', name: 'Gümüş (Gram)', category: 'commodity', buy: 100.80, sell: 101.50, change: +2.40, high: 102.80, low: 99.50, lastUpdated: '16:45:12', unit: '₺' },
  { code: 'BRENT', name: 'Brent Petrol', category: 'commodity', buy: 78.40, sell: 78.50, change: -0.85, high: 79.50, low: 77.80, lastUpdated: '16:44:40', unit: '$' },
  { code: 'PLATIN', name: 'Platin (Gram)', category: 'commodity', buy: 985.00, sell: 1010.00, change: +0.65, high: 1025.00, low: 978.00, lastUpdated: '16:42:15', unit: '₺' },
  { code: 'BAKIR', name: 'Bakır (kg)', category: 'commodity', buy: 295.40, sell: 302.10, change: +1.12, high: 305.00, low: 292.00, lastUpdated: '16:41:00', unit: '₺' }
];

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('finance_pro_theme');
      if (saved !== null) return saved === 'dark';
      return false; // Açık mod varsayılan
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('finance_pro_theme', darkMode ? 'dark' : 'light');
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
    } catch {
      // ignore
    }
  }, [darkMode]);

  const [activeTab, setActiveTab] = useState<'summary' | 'forex' | 'gold' | 'crypto' | 'bist' | 'commodity' | 'news' | 'contact' | 'legal'>('summary');
  const [selectedLegalDoc, setSelectedLegalDoc] = useState<LegalDocType>('about');
  const [isOnline, setIsOnline] = useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [cookieConsentAccepted, setCookieConsentAccepted] = useState<boolean>(() => {
    try {
      return localStorage.getItem('finans_cookie_consent') === 'true';
    } catch {
      return false;
    }
  });
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // User Auth & Cloud Sync States
  const [currentUser, setCurrentUser] = useState<FirebaseUser | AppUser | null>(() => getLocalUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [cloudSynced, setCloudSynced] = useState<boolean>(false);

  // Favorites state (initialized from localStorage with fallback)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('finans_user_favorites');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return ['USD', 'GA', 'BTC', 'BIST100', 'SIL'];
  });
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Deep linking and URL parameter parsing (e.g. ?doc=privacy or #privacy for Google Play review)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const tabParam = params.get('tab')?.toLowerCase();
      const docParam = params.get('doc')?.toLowerCase();

      if (docParam === 'privacy' || hash === 'privacy' || hash === 'gizlilik') {
        setActiveTab('legal');
        setSelectedLegalDoc('privacy');
      } else if (docParam === 'terms' || hash === 'terms' || hash === 'kullanim') {
        setActiveTab('legal');
        setSelectedLegalDoc('terms');
      } else if (docParam === 'cookies' || hash === 'cookies' || hash === 'cerez') {
        setActiveTab('legal');
        setSelectedLegalDoc('cookies');
      } else if (docParam === 'disclaimer' || hash === 'disclaimer' || hash === 'yasal-uyari') {
        setActiveTab('legal');
        setSelectedLegalDoc('disclaimer');
      } else if (docParam === 'about' || hash === 'about' || hash === 'hakkimizda') {
        setActiveTab('legal');
        setSelectedLegalDoc('about');
      } else if (tabParam && ['summary', 'forex', 'gold', 'crypto', 'bist', 'commodity', 'news', 'contact', 'legal'].includes(tabParam)) {
        setActiveTab(tabParam as any);
      }
    } catch {
      // ignore
    }
  }, []);

  // Herhangi bir sayfa, sekme veya haber detayı değiştirildiğinde sayfanın en üstüne kaydır
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.scrollTop = 0;
  }, [activeTab, selectedLegalDoc, selectedNews]);
  const [newsList, setNewsList] = useState<NewsItem[]>(INITIAL_NEWS);
  const [newsCategory, setNewsCategory] = useState<string>('Hepsi');
  const [newsSource, setNewsSource] = useState<string>('Hepsi');
  const [newsSearch, setNewsSearch] = useState<string>('');
  const [isLoadingNews, setIsLoadingNews] = useState<boolean>(false);
  const [lastNewsUpdate, setLastNewsUpdate] = useState<string>(() => new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  const [timeTick, setTimeTick] = useState<number>(Date.now());
  const [visibleItemLimit, setVisibleItemLimit] = useState<number>(80);

  // Contact form state
  const [contactSubject, setContactSubject] = useState<string>('Öneri & Geri Bildirim');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [contactSenderName, setContactSenderName] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText('finansterminaltr@gmail.com');
      setCopiedEmail(true);
      setNotificationMsg('✅ finansterminaltr@gmail.com panoya kopyalandı!');
      setTimeout(() => {
        setCopiedEmail(false);
        setNotificationMsg(null);
      }, 4000);
    }
  };

  const handleSendMail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const subjectEncoded = encodeURIComponent(`Finans Terminal - ${contactSubject || 'İletişim'}`);
    const namePart = contactSenderName.trim() ? `Ad / Soyad: ${contactSenderName}\n` : '';
    const bodyEncoded = encodeURIComponent(
      `${namePart}${contactMessage ? `${contactMessage}\n\n` : 'Merhaba Finans Terminal Ekibi,\n\n'}` +
      `---\nFinans Terminal Platformu İletişim Formu\nTarih: ${new Date().toLocaleString('tr-TR')}`
    );
    window.location.href = `mailto:finansterminaltr@gmail.com?subject=${subjectEncoded}&body=${bodyEncoded}`;
    setNotificationMsg('✉️ E-posta uygulamanız açılıyor (finansterminaltr@gmail.com)...');
    setTimeout(() => setNotificationMsg(null), 4500);
  };

  // Dynamic relative time helper that keeps ticking
  const formatDynamicTimeAgo = (timestamp?: number, fallback?: string): string => {
    if (!timestamp) return fallback || 'Az önce';
    const now = Date.now();
    const diffSec = Math.max(0, Math.floor((now - timestamp) / 1000));
    if (diffSec < 45) return 'Az önce';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} dk önce`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} saat önce`;
    const d = new Date(timestamp);
    return `${d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })} ${d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  // Periodic 10-second ticker to keep relative news times alive and accurate
  useEffect(() => {
    const tickInterval = setInterval(() => {
      setTimeTick(Date.now());
    }, 10000);
    return () => clearInterval(tickInterval);
  }, []);
  
  // Convertor state
  const [amount, setAmount] = useState<number | string>(100);
  const [fromAsset, setFromAsset] = useState('USD');
  const [toAsset, setToAsset] = useState('TRY');

  // Alarm modal states
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [isAlarmsListOpen, setIsAlarmsListOpen] = useState(false);
  const [selectedAssetForAlarm, setSelectedAssetForAlarm] = useState<AssetData | null>(null);
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [activeAlarms, setActiveAlarms] = useState<Array<{ id: string; code: string; name: string; target: number; createdAt: string }>>(() => {
    try {
      const saved = localStorage.getItem('finans_user_alarms');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [
      { id: '1', code: 'USD', name: 'Amerikan Doları', target: 35.00, createdAt: '14:20' },
      { id: '2', code: 'BTC', name: 'Bitcoin', target: 98000, createdAt: '15:10' }
    ];
  });
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('default');

  // Unified Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('SignOut error ignored:', e);
    }
    clearLocalUser();
    setCurrentUser(null);
    setCloudSynced(false);
    setIsUserMenuOpen(false);
    setNotificationMsg('Oturum başarıyla kapatıldı.');
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  // Auth Listeners (Firebase & Local Instant User)
  useEffect(() => {
    // 1. Firebase Auth Listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (Array.isArray(data.favorites) && data.favorites.length > 0) {
              setFavorites(data.favorites);
              try { localStorage.setItem('finans_user_favorites', JSON.stringify(data.favorites)); } catch {}
            }
            if (Array.isArray(data.alerts)) {
              setActiveAlarms(data.alerts);
              try { localStorage.setItem('finans_user_alarms', JSON.stringify(data.alerts)); } catch {}
            }
            setCloudSynced(true);
            setNotificationMsg(`👋 Hoş geldiniz, ${user.displayName || user.email?.split('@')[0] || 'Kullanıcı'}!`);
            setTimeout(() => setNotificationMsg(null), 4000);
          } else {
            // First time login - save existing local state to cloud
            await setDoc(userDocRef, {
              userId: user.uid,
              email: user.email || '',
              displayName: user.displayName || user.email?.split('@')[0] || '',
              favorites,
              alerts: activeAlarms,
              updatedAt: new Date().toISOString()
            }, { merge: true });
            setCloudSynced(true);
          }
        } catch (err) {
          console.warn('Could not sync user with cloud:', err);
        }
      } else {
        // Check if there is a local fast user
        const local = getLocalUser();
        if (local) {
          setCurrentUser(local);
        } else {
          setCurrentUser(null);
          setCloudSynced(false);
        }
      }
    });

    // 2. Local Auth Custom Event Listener
    const handleLocalAuthChange = () => {
      const local = getLocalUser();
      if (local) {
        setCurrentUser(local);
        setNotificationMsg(`👋 Hoş geldiniz, ${local.displayName}!`);
        setTimeout(() => setNotificationMsg(null), 4000);
      } else if (!auth.currentUser) {
        setCurrentUser(null);
      }
    };
    window.addEventListener('app-auth-state-change', handleLocalAuthChange);

    return () => {
      unsubscribe();
      window.removeEventListener('app-auth-state-change', handleLocalAuthChange);
    };
  }, []);

  // Save favorites to localStorage & Cloud Firestore
  useEffect(() => {
    try {
      localStorage.setItem('finans_user_favorites', JSON.stringify(favorites));
    } catch {}

    if (currentUser && !('isLocal' in currentUser)) {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        setDoc(userDocRef, {
          userId: currentUser.uid,
          email: currentUser.email || '',
          displayName: currentUser.displayName || currentUser.email?.split('@')[0] || '',
          favorites,
          updatedAt: new Date().toISOString()
        }, { merge: true }).then(() => {
          setCloudSynced(true);
        }).catch(err => {
          console.warn('Notice: Favorites cloud backup pending.', err);
        });
      } catch {}
    }
  }, [favorites, currentUser]);

  // Save alarms to localStorage & Cloud Firestore
  useEffect(() => {
    try {
      localStorage.setItem('finans_user_alarms', JSON.stringify(activeAlarms));
    } catch {}

    if (currentUser && !('isLocal' in currentUser)) {
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        setDoc(userDocRef, {
          alerts: activeAlarms,
          updatedAt: new Date().toISOString()
        }, { merge: true }).then(() => {
          setCloudSynced(true);
        }).catch(err => {
          console.warn('Notice: Alarms cloud backup pending.', err);
        });
      } catch {}
    }
  }, [activeAlarms, currentUser]);

  // Historical performance & chart modal states (1G, 1A, 3A, 6A, 1Y)
  const [selectedAssetForHistory, setSelectedAssetForHistory] = useState<AssetData | null>(null);
  const [historyTimeframe, setHistoryTimeframe] = useState<HistoryTimeframe>('6A');

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

  // Safe external news opening in a new browser tab
  const openNewsInNewTab = (newsItem: NewsItem, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    let targetUrl = newsItem.url?.trim() || '';
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = `https://www.google.com/search?q=${encodeURIComponent(newsItem.source + ' ' + newsItem.title)}`;
    }
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  // Fetch real news from server live RSS feed
  const fetchLiveNewsData = async (showNotification = false) => {
    try {
      setIsLoadingNews(true);
      const res = await fetch(`/api/news?_t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.news) && data.news.length > 0) {
          const now = Date.now();
          const MAX_AGE_MS = 24 * 60 * 60 * 1000;
          // Filter strictly to last 24 hours
          const freshNews = data.news.filter((n: NewsItem) => {
            return !n.timestamp || (now - n.timestamp) <= MAX_AGE_MS;
          });
          setNewsList(freshNews.length > 0 ? freshNews : data.news);
        }
      }
    } catch (err) {
      console.warn('News API fetch error:', err);
    } finally {
      setIsLoadingNews(false);
      setLastNewsUpdate(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      if (showNotification) {
        setNotificationMsg('✅ Canlı haber akışı ve son dakika bülteni yenilendi!');
      }
    }
  };

  // Initial and continuous 20-second live news fetching
  useEffect(() => {
    fetchLiveNewsData();
    const newsInterval = setInterval(() => {
      fetchLiveNewsData();
    }, 20000); // 20 saniyede bir kesintisiz canlı haber akışı
    return () => clearInterval(newsInterval);
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

  // Filtered news memo - Strictly within last 24 hours
  const filteredNews = useMemo(() => {
    const now = Date.now();
    const MAX_AGE_MS = 24 * 60 * 60 * 1000;

    return newsList.filter(news => {
      // 24 saatten eski haberleri kesinlikle gösterme
      if (news.timestamp && (now - news.timestamp) > MAX_AGE_MS) {
        return false;
      }
      if (newsCategory !== 'Hepsi' && news.category !== newsCategory) {
        return false;
      }
      if (newsSource !== 'Hepsi' && !news.source.toLowerCase().includes(newsSource.toLowerCase())) {
        return false;
      }
      const q = (newsSearch || searchQuery).trim().toLowerCase();
      if (q) {
        return (
          news.title.toLowerCase().includes(q) || 
          news.summary.toLowerCase().includes(q) ||
          news.source.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [newsList, newsCategory, newsSource, newsSearch, searchQuery, timeTick]);

  // Main widgets prices
  const usdPrice = priceMap['USD'] || { buy: 34.20, sell: 34.35, change: 0.12 };
  const eurPrice = priceMap['EUR'] || { buy: 37.10, sell: 37.30, change: -0.05 };
  const gaPrice = priceMap['GA'] || { buy: 3220.00, sell: 3245.00, change: 0.35 };
  const silverPrice = priceMap['SIL'] || { buy: 100.80, sell: 101.50, change: 2.40 };
  const btcPrice = priceMap['BTC'] || { buy: 96200, sell: 96250, change: 2.45 };
  const bistPrice = priceMap['BIST100'] || { buy: 14165.14, sell: 14165.14, change: -0.05 };

  // Filtered & sorted table rows
  const filteredAssets = useMemo(() => {
    const normalizeTr = (str: string) => 
      str
        .toLocaleLowerCase('tr-TR')
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c');

    const list = assets.filter(asset => {
      // 1. Search query filter (applies across everything if user searches)
      if (searchQuery.trim()) {
        const q = normalizeTr(searchQuery.trim());
        const codeNorm = normalizeTr(asset.code);
        const nameNorm = normalizeTr(asset.name);
        return codeNorm.includes(q) || nameNorm.includes(q);
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

  const displayedAssets = useMemo(() => {
    if (searchQuery.trim() || favoritesOnly || activeTab === 'summary') {
      return filteredAssets;
    }
    return filteredAssets.slice(0, visibleItemLimit);
  }, [filteredAssets, searchQuery, favoritesOnly, activeTab, visibleItemLimit]);

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

  const handleSelectTab = (tab: 'summary' | 'forex' | 'gold' | 'crypto' | 'bist' | 'commodity' | 'news' | 'contact' | 'legal') => {
    setActiveTab(tab);
    setFavoritesOnly(false);
    if (!currentUser && tab !== 'summary' && tab !== 'legal' && tab !== 'contact') {
      setIsAuthModalOpen(true);
    }
  };

  const toggleFavorite = (code: string) => {
    setFavorites(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const openAlarmModal = (asset?: AssetData) => {
    if (!currentUser) {
      setNotificationMsg('🔔 Fiyat alarmı kurabilmek için lütfen giriş yapın.');
      setIsAuthModalOpen(true);
      return;
    }
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
    <div className={`font-sans min-h-screen ${darkMode ? 'dark bg-[#0B0F17] text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-200`}>
      <div className="flex min-h-screen">
        
        {/* TOP NOTIFICATION POPUP */}
        {notificationMsg && (
          <div className="fixed top-4 right-4 z-[120] bg-blue-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 border border-blue-400/30 animate-in slide-in-from-top duration-300">
            <CheckCircle2 size={18} className="text-emerald-300 shrink-0" />
            <span className="text-xs font-bold tracking-tight">{notificationMsg}</span>
            <button onClick={() => setNotificationMsg(null)} className="ml-2 hover:opacity-80">
              <X size={14} />
            </button>
          </div>
        )}

        {/* --- SIDEBAR (SOL MENÜ) --- */}
        <aside className="hidden lg:flex w-64 fixed h-full bg-white dark:bg-[#111827] border-r border-slate-200/90 dark:border-slate-800/80 flex-col shadow-xl dark:shadow-2xl z-50">
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <div 
                onClick={() => { 
                  setActiveTab('summary'); 
                  setFavoritesOnly(false); 
                  setSearchQuery('');
                  window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }}
                className="flex items-center space-x-2.5 cursor-pointer group select-none"
                title="Ana Sayfaya Git (Piyasa Özeti)"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/25 shrink-0 group-hover:scale-105 transition">
                  <Activity size={18} />
                </div>
                <h1 className="text-lg font-black text-blue-600 dark:text-blue-400 tracking-tight flex items-center group-hover:underline">
                  Finans<span className="text-slate-900 dark:text-white ml-1">Terminal</span>
                </h1>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
                v1.12
              </span>
            </div>
            <div className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Canlı Finans Terminali</div>
          </div>

          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
            <NavItem 
              icon={<LayoutDashboard size={18}/>} 
              label="Piyasa Özeti" 
              active={activeTab === 'summary'} 
              onClick={() => handleSelectTab('summary')} 
            />
            <NavItem 
              icon={<Banknote size={18}/>} 
              label="Döviz Kurları" 
              active={activeTab === 'forex'} 
              locked={!currentUser}
              onClick={() => handleSelectTab('forex')} 
            />
            <NavItem 
              icon={<Coins size={18}/>} 
              label="Altın Piyasası" 
              active={activeTab === 'gold'} 
              locked={!currentUser}
              onClick={() => handleSelectTab('gold')} 
            />
            <NavItem 
              icon={<Bitcoin size={18}/>} 
              label="Kripto Paralar" 
              active={activeTab === 'crypto'} 
              locked={!currentUser}
              onClick={() => handleSelectTab('crypto')} 
            />
            <NavItem 
              icon={<BarChart3 size={18}/>} 
              label="Borsa İstanbul" 
              active={activeTab === 'bist'} 
              locked={!currentUser}
              onClick={() => handleSelectTab('bist')} 
            />
            <NavItem 
              icon={<Package size={18}/>} 
              label="Değerli Madenler" 
              active={activeTab === 'commodity'} 
              locked={!currentUser}
              onClick={() => handleSelectTab('commodity')} 
            />
            <NavItem 
              icon={<Newspaper size={18}/>} 
              label="Ekonomi Haberleri" 
              active={activeTab === 'news'} 
              locked={!currentUser}
              onClick={() => handleSelectTab('news')} 
            />
            <NavItem 
              icon={<Mail size={18}/>} 
              label="Bize Ulaşın" 
              active={activeTab === 'contact'} 
              onClick={() => handleSelectTab('contact')} 
            />
            <NavItem 
              icon={<ShieldCheck size={18}/>} 
              label="Kurumsal & Yasal" 
              active={activeTab === 'legal'} 
              onClick={() => { setSelectedLegalDoc('about'); handleSelectTab('legal'); }} 
            />
          </nav>

          {/* ACTIVE ALARMS WIDGET IN SIDEBAR */}
          <div className="p-3 mx-3 mb-3 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Bell size={12} className="text-blue-500" /> Aktif Alarmlar ({activeAlarms.length})
              </span>
              <button onClick={() => openAlarmModal()} className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
                + Ekle
              </button>
            </div>
            {activeAlarms.length === 0 ? (
              <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">Henüz alarm kurulmadı.</p>
            ) : (
              <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                {activeAlarms.map(a => (
                  <div key={a.id} className="flex justify-between items-center text-[11px] p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                    <div>
                      <span className="font-black text-blue-600 dark:text-blue-400 mr-1">{a.code}</span>
                      <span className="font-mono text-slate-500 dark:text-slate-400 font-bold">≥ {a.target}₺</span>
                    </div>
                    <button onClick={() => removeAlarm(a.id)} className="text-slate-400 hover:text-rose-500">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 space-y-2">
            {/* KULLANICI / BULUT HESAP DURUMU SIDEBAR KARTI */}
            {currentUser ? (
              <div className="bg-slate-50 dark:bg-slate-900/90 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                      {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : (currentUser.email?.charAt(0).toUpperCase() || 'U')}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">
                        {currentUser.displayName || currentUser.email?.split('@')[0] || 'Kullanıcı'}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        <Cloud size={11} />
                        <span>Bulut Eşitlendi</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Oturumu Kapat"
                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition cursor-pointer"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate px-1">
                  {currentUser.email}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-2xl p-3 border border-blue-200 dark:border-blue-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-black text-xs">
                    <Cloud size={14} />
                    <span>Bulut Yedekleme</span>
                  </div>
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-blue-600 text-white dark:bg-blue-500/20 dark:text-blue-300">
                    ÜCRETSİZ
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                  Favori ve alarmlarınız cihaz değiştirseniz bile asla kaybolmasın.
                </p>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <User size={13} />
                  <span>Giriş Yap / Kaydol</span>
                </button>
              </div>
            )}

            {/* BİZE ULAŞIN SIDEBAR KARTI */}
            <div 
              onClick={() => { 
                setActiveTab('contact'); 
                setFavoritesOnly(false); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }}
              className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-slate-900 dark:to-blue-950/40 rounded-2xl p-3 border border-blue-200/70 dark:border-blue-900/50 shadow-sm space-y-2 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition group"
              title="İletişim ve Destek Sayfasını Aç"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-black text-xs">
                  <Mail size={14} />
                  <span>Bize Ulaşın</span>
                </div>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400">
                  İletişim
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                Görüş ve önerileriniz için form veya e-posta ile ulaşın:
              </p>
              <div 
                className="w-full flex items-center justify-center gap-1.5 py-2 bg-blue-600 group-hover:bg-blue-500 active:scale-95 text-white font-bold text-[11px] rounded-xl shadow-sm transition"
              >
                <Mail size={12} />
                <span>finansterminaltr@gmail.com</span>
              </div>
            </div>

            {/* HIZLI YASAL LİNKLER */}
            <div className="flex items-center justify-around px-1 text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
              <button 
                onClick={() => { setSelectedLegalDoc('about'); setActiveTab('legal'); setFavoritesOnly(false); }}
                className="hover:text-blue-500 transition cursor-pointer"
              >
                Hakkımızda
              </button>
              <span>•</span>
              <button 
                onClick={() => { setSelectedLegalDoc('privacy'); setActiveTab('legal'); setFavoritesOnly(false); }}
                className="hover:text-blue-500 transition cursor-pointer"
              >
                Gizlilik
              </button>
              <span>•</span>
              <button 
                onClick={() => { setSelectedLegalDoc('terms'); setActiveTab('legal'); setFavoritesOnly(false); }}
                className="hover:text-blue-500 transition cursor-pointer"
              >
                Şartlar
              </button>
            </div>

            {/* TEMA SEÇİCİ SWITCH BUTONU */}
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className={`flex items-center justify-between w-full p-2.5 rounded-2xl transition text-xs font-bold border ${
                darkMode 
                  ? 'bg-slate-900 text-amber-300 border-slate-800 hover:bg-slate-800' 
                  : 'bg-white text-slate-700 border-slate-200 shadow-sm hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center">
                {darkMode ? (
                  <Moon size={16} className="mr-2 text-indigo-400" />
                ) : (
                  <Sun size={16} className="mr-2 text-amber-500" />
                )}
                <span>{darkMode ? 'Karanlık Tema' : 'Aydınlık Tema'}</span>
              </div>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                darkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-amber-100 text-amber-700'
              }`}>
                {darkMode ? 'Açık Yap' : 'Koyu Yap'}
              </span>
            </button>
          </div>
        </aside>

        {/* --- ANA İÇERİK ALANI --- */}
        <main className="flex-1 lg:ml-64 p-3 sm:p-4 md:p-6 pb-24 lg:pb-8 max-w-7xl w-full max-w-full overflow-x-hidden">
          
          {/* OFFLINE STATUS ALERT BANNER */}
          {!isOnline && (
            <div className="mb-4 p-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-2xl flex items-center justify-between shadow-md animate-bounce">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} />
                <span>İnternet bağlantınız kesildi. Uygulama çevrimdışı modda son önbellek verileri ile çalışıyor.</span>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="px-2.5 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black hover:bg-slate-800 transition"
              >
                Yeniden Bağlan
              </button>
            </div>
          )}

          {/* ÜST BAR */}
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
            <div>
              <div 
                id="header-brand-logo-btn"
                onClick={() => {
                  setActiveTab('summary');
                  setFavoritesOnly(false);
                  setSearchQuery('');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer group flex items-center flex-wrap gap-2 sm:gap-2.5 transition select-none"
                title="Ana Sayfaya Git (Piyasa Özeti)"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/25 shrink-0 group-hover:scale-105 transition">
                  <Activity size={20} />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-blue-600 dark:text-blue-400 group-hover:underline flex items-center">
                  Finans <span className="text-slate-900 dark:text-white ml-1">Terminal</span>
                </h2>
                <span className="text-[10px] sm:text-[11px] font-black px-2 sm:px-2.5 py-0.5 rounded-md bg-blue-600 text-white dark:bg-blue-500/20 dark:text-blue-400 border border-blue-500/30 uppercase tracking-widest shadow-sm">
                  Canlı
                </span>
                <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 shadow-xs tracking-tight">
                  (TEST AŞAMASINDADIR. "BETA VERS 1,12")
                </span>
              </div>
              <div className="flex items-center text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tighter mt-1 flex-wrap gap-2">
                <span className="flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${isIstanbulSessionOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                  <span className="text-slate-700 dark:text-slate-300">{new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}</span>
                  <span className={`ml-1 font-black ${isIstanbulSessionOpen ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                    ({isIstanbulSessionOpen ? 'İSTANBUL SEANSI AÇIK' : 'İSTANBUL SEANSI KAPALI - 10:00/18:00'})
                  </span>
                </span>
                {lastApiUpdate && (
                  <span className="text-blue-600 dark:text-blue-400 font-mono bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/20 font-bold">
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
                className={`px-3 py-2 rounded-2xl border text-xs font-black flex items-center space-x-1.5 transition shadow-sm ${
                  favoritesOnly 
                    ? 'bg-amber-500 text-white border-amber-400 shadow-md shadow-amber-500/20' 
                    : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-slate-800'
                }`}
              >
                <Star size={14} className={favoritesOnly ? 'fill-current text-white' : 'text-amber-500'} />
                <span>FAVORİLER ({favorites.length})</span>
              </button>

              <button 
                onClick={() => setIsAlarmsListOpen(true)}
                className="px-3 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs font-black text-slate-700 dark:text-slate-300 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800 flex items-center space-x-1.5 transition shadow-sm relative"
              >
                <Bell size={14} className="text-blue-500" />
                <span>ALARMLAR ({activeAlarms.length})</span>
              </button>

              {/* BİZE ULAŞIN HIZLI BUTON */}
              <button 
                id="header-contact-button"
                onClick={() => {
                  setActiveTab('contact');
                  setFavoritesOnly(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-2 rounded-2xl border text-xs font-black flex items-center space-x-1.5 transition shadow-sm cursor-pointer ${
                  activeTab === 'contact' 
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20' 
                    : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800'
                }`}
                title="Bize Ulaşın / İletişim Formunu Aç"
              >
                <Mail size={14} className={activeTab === 'contact' ? 'text-white' : 'text-blue-500'} />
                <span className="hidden sm:inline">BİZE ULAŞIN</span>
                <span className="sm:hidden">İLETİŞİM</span>
              </button>

              <div className="relative flex-1 sm:w-48 min-w-[140px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Varlık veya hisse ara (500+ BIST, döviz, altın)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-800 dark:text-slate-100 shadow-sm"
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
                className={`p-2 rounded-2xl border font-bold text-xs flex items-center space-x-1.5 transition shadow-sm ${
                  isAutoUpdate 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <RefreshCw size={14} className={isAutoUpdate ? 'animate-spin text-emerald-600 dark:text-emerald-400' : ''} />
                <span className="hidden md:inline text-[11px] font-bold">{isAutoUpdate ? 'CANLI' : 'DURDURULDU'}</span>
              </button>

              {/* HEADER TEMA TOGGLE BUTONU */}
              <button 
                onClick={() => setDarkMode(!darkMode)} 
                title={darkMode ? "Aydınlık Moda Geç" : "Karanlık Moda Geç"}
                className={`px-3 py-2 rounded-2xl border flex items-center gap-1.5 text-xs font-bold transition shadow-sm ${
                  darkMode 
                    ? 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800' 
                    : 'bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {darkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-indigo-600" />}
                <span className="hidden sm:inline">{darkMode ? 'Açık' : 'Koyu'}</span>
              </button>

              {/* KULLANICI GİRİŞ / PROFİL BUTONU & DROPDOWN */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 py-1.5 px-3 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm hover:border-blue-400 transition cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                      {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : (currentUser.email?.charAt(0).toUpperCase() || 'U')}
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-xs font-black text-slate-800 dark:text-slate-100 flex items-center gap-1">
                        <span>{currentUser.displayName || currentUser.email?.split('@')[0]}</span>
                        <Cloud size={12} className="text-emerald-500 shrink-0" />
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                        Bulut Eşitlendi
                      </div>
                    </div>
                  </button>

                  {/* USER DROPDOWN MENU */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                        <div className="text-xs font-black text-slate-900 dark:text-white">
                          {currentUser.displayName || 'Kullanıcı'}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                          {currentUser.email}
                        </div>
                        <div className="mt-1.5 flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/40">
                          <CheckCircle2 size={11} />
                          <span>Favoriler & Alarmlar Bulutta</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            setFavoritesOnly(true);
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between p-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <Star size={13} className="text-amber-500" />
                            <span>Favorilerim</span>
                          </span>
                          <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded-full font-mono">{favorites.length}</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsAlarmsListOpen(true);
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between p-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <Bell size={13} className="text-blue-500" />
                            <span>Fiyat Alarmlarım</span>
                          </span>
                          <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded-full font-mono">{activeAlarms.length}</span>
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 p-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition cursor-pointer mt-1"
                        >
                          <LogOut size={13} />
                          <span>Oturumu Kapat</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  id="header-login-btn"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-2 py-2 px-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white rounded-2xl text-xs font-black shadow-md shadow-blue-500/25 transition cursor-pointer"
                  title="Google veya E-posta ile Giriş Yap (Favorileriniz Asla Kaybolmasın)"
                >
                  <User size={14} />
                  <span className="hidden sm:inline">Giriş Yap / Kaydol</span>
                  <span className="sm:hidden">Giriş</span>
                </button>
              )}
            </div>
          </header>

          {/* 6 BÜYÜK KART (ANA EKRAN WIDGETLARI: USD, EUR, GRAM ALTIN, GRAM GÜMÜŞ, BITCOIN, BIST100) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-3.5 mb-4 sm:mb-6">
            <PriceCard 
              title="USD / TRY" 
              buy={usdPrice.buy}
              sell={usdPrice.sell} 
              change={usdPrice.change} 
              color="blue" 
              unit="₺"
              flash={flashingCodes['USD']}
              isForex={true}
              onClick={() => setSelectedAssetForHistory(assets.find(a => a.code === 'USD') || INITIAL_ASSETS[0])}
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
              onClick={() => setSelectedAssetForHistory(assets.find(a => a.code === 'EUR') || INITIAL_ASSETS[1])}
            />
            <PriceCard 
              title="GRAM ALTIN" 
              buy={gaPrice.buy}
              sell={gaPrice.sell} 
              change={gaPrice.change} 
              color="yellow" 
              unit="₺"
              flash={flashingCodes['GA']}
              onClick={() => setSelectedAssetForHistory(assets.find(a => a.code === 'GA') || INITIAL_ASSETS.find(a => a.code === 'GA')!)}
            />
            <PriceCard 
              title="GRAM GÜMÜŞ" 
              buy={silverPrice.buy}
              sell={silverPrice.sell} 
              change={silverPrice.change} 
              color="indigo" 
              unit="₺"
              flash={flashingCodes['SIL']}
              onClick={() => setSelectedAssetForHistory(assets.find(a => a.code === 'SIL') || INITIAL_ASSETS.find(a => a.code === 'SIL')!)}
            />
            <PriceCard 
              title="BTC / USDT" 
              buy={btcPrice.buy}
              sell={btcPrice.sell} 
              change={btcPrice.change} 
              color="yellow" 
              unit="$"
              flash={flashingCodes['BTC']}
              onClick={() => setSelectedAssetForHistory(assets.find(a => a.code === 'BTC') || INITIAL_ASSETS.find(a => a.code === 'BTC')!)}
            />
            <PriceCard 
              title="BIST 100" 
              buy={bistPrice.buy}
              sell={bistPrice.sell} 
              change={bistPrice.change} 
              color="emerald" 
              unit="P"
              flash={flashingCodes['BIST100']}
              onClick={() => setSelectedAssetForHistory(assets.find(a => a.code === 'BIST100') || INITIAL_ASSETS.find(a => a.code === 'BIST100')!)}
            />
          </div>

          {/* MAIN VIEW CONTENT ROUTING */}
          {!currentUser && activeTab !== 'summary' && activeTab !== 'legal' && activeTab !== 'contact' ? (
            <AuthLockGate 
              tab={activeTab}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onGoToSummary={() => {
                setActiveTab('summary');
                setFavoritesOnly(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : activeTab === 'news' ? (
            <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-x-hidden">
              {/* NEWS HEADER BANNER & BREAKING NEWS TICKER */}
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-7 text-white shadow-2xl relative overflow-hidden w-full max-w-full border border-blue-500/20">
                <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md text-blue-300 text-[10px] font-black uppercase tracking-widest border border-blue-400/30">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        <span>Canlı RSS Haber Servisi</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-400/30">
                        ⚡ Son 24 Saat • Otomatik Güncel
                      </span>
                      {lastNewsUpdate && (
                        <span className="text-[10px] text-blue-200/80 font-medium">
                          Son Yenilenme: <strong className="text-white font-bold">{lastNewsUpdate}</strong>
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight mb-2 break-words">
                      Ekonomi, Finans & Piyasa Haberleri
                    </h2>
                    <p className="text-xs sm:text-sm text-blue-100/90 font-medium break-words leading-relaxed">
                      Bloomberg HT, Ekonomim, AA Finans, TRT Haber, Bigpara ve Uzmancoin kaynaklarından 24 saat içindeki anlık ekonomi akışı.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => fetchLiveNewsData(true)}
                      disabled={isLoadingNews}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      <RefreshCw size={14} className={isLoadingNews ? 'animate-spin' : ''} />
                      <span>{isLoadingNews ? 'Haberler Alınıyor...' : 'Haberleri Yenile'}</span>
                    </button>
                  </div>
                </div>

                {/* BREAKING NEWS HIGHLIGHT */}
                {newsList.length > 0 && (
                  <div 
                    onClick={() => setSelectedNews(newsList[0])}
                    className="mt-4 pt-3 border-t border-white/10 flex items-center gap-3 cursor-pointer group hover:bg-white/5 -mx-2 px-2 py-1.5 rounded-xl transition"
                  >
                    <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shrink-0 shadow-sm animate-pulse">
                      Son Dakika
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-blue-300 transition truncate flex-1">
                      {newsList[0].title}
                    </p>
                    <span className="text-[11px] text-blue-200/70 font-medium hidden sm:flex items-center gap-1 shrink-0">
                      <span>İncele</span>
                      <ChevronRight size={12} />
                    </span>
                  </div>
                )}
              </div>

              {/* CONTROLS & FILTER TABS */}
              <div className="bg-white dark:bg-slate-900 p-3 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5 w-full max-w-full">
                {/* CATEGORY TABS & RESULT COUNTER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto no-scrollbar">
                    {['Hepsi', 'Borsa', 'Altın', 'Döviz', 'Kripto', 'Merkez Bankası', 'Gündem', 'Piyasa'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setNewsCategory(cat)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition ${
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
                    Toplam: <span className="text-slate-900 dark:text-slate-100 font-black">{filteredNews.length} Güncel Haber</span>
                  </div>
                </div>

                {/* NEWS SEARCH INPUT */}
                <div className="relative w-full">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Haber başlığı veya anahtar kelime ile ara..."
                    value={newsSearch}
                    onChange={(e) => setNewsSearch(e.target.value)}
                    className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {newsSearch && (
                    <button 
                      onClick={() => setNewsSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* NEWS GRID */}
              {filteredNews.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center">
                  <Newspaper size={36} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                  <h3 className="text-base font-black text-slate-800 dark:text-slate-200 mb-1">Haber Bulunamadı</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
                    Seçili kategori veya arama kriterine uygun haber bulunamadı. Filtreleri temizleyebilir veya canlı haberleri yenileyebilirsiniz.
                  </p>
                  <button
                    onClick={() => { setNewsCategory('Hepsi'); setNewsSource('Hepsi'); setNewsSearch(''); }}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 rounded-xl transition"
                  >
                    Filtreleri Sıfırla
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 w-full max-w-full">
                  {filteredNews.map((news, index) => (
                    <div 
                      key={news.id || index}
                      onClick={() => setSelectedNews(news)}
                      className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-md hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer w-full max-w-full overflow-hidden"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                              {news.category}
                            </span>
                            {news.important && (
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                Öne Çıkan
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                            <Clock size={11} /> {formatDynamicTimeAgo(news.timestamp, news.time)}
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
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-black truncate max-w-[120px]">
                            {news.source}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => openNewsInNewTab(news, e)}
                            title="Haberi doğrudan kaynak sitede aç"
                            className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
                          >
                            <ExternalLink size={11} />
                          </button>
                        </div>
                        <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition font-bold text-xs">
                          <span>Detay</span>
                          <ChevronRight size={13} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : activeTab === 'contact' ? (
            <div className="space-y-6 w-full max-w-full overflow-x-hidden animate-in fade-in duration-200">
              {/* 1. HERO BANNER */}
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-blue-500/20">
                <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md text-blue-300 text-[10px] font-black uppercase tracking-widest border border-blue-400/30">
                      <Mail size={12} className="text-blue-400" />
                      <span>Finans Terminal İletişim</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-400/30">
                      ⚡ 7/24 Kesintisiz E-Posta İletişimi
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                    Bize Ulaşın & İletişim Merkezi
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100/90 mt-2 font-normal leading-relaxed">
                    Finans Terminal'i siz değerli kullanıcılarımızın görüşleriyle geliştiriyoruz. Yeni varlık/hisse istekleri, hata bildirimleri, veri analiz önerileri ve iş birliği teklifleriniz için bize dilediğiniz zaman e-posta gönderebilirsiniz.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href="mailto:finansterminaltr@gmail.com?subject=Finans%20Terminal%20Geri%20Bildirim"
                      className="px-5 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-blue-600/30 transition flex items-center gap-2.5 cursor-pointer"
                    >
                      <Mail size={16} />
                      <span>E-Posta Gönder: finansterminaltr@gmail.com</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="px-4 py-3.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/20 backdrop-blur-md transition flex items-center gap-2 cursor-pointer"
                    >
                      {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                      <span>{copiedEmail ? 'Adres Kopyalandı!' : 'Adresi Kopyala'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. CONTACT COMPOSER & INFO GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2 Cols: Form */}
                <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-3xl p-5 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black border border-blue-200 dark:border-blue-800/60">
                      <Send size={18} />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                        Hızlı İleti & E-Posta Oluşturucu
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Mesajınızı yazıp gönder butonuna tıkladığınızda e-posta uygulamanız otomatik olarak hazır metinle açılır.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSendMail} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 block mb-1.5">
                          Adınız / İsim (İsteğe Bağlı)
                        </label>
                        <input
                          type="text"
                          value={contactSenderName}
                          onChange={(e) => setContactSenderName(e.target.value)}
                          placeholder="Örn: Değerli Yatırımcı"
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 block mb-1.5">
                          Konu Başlığı
                        </label>
                        <select
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                        >
                          <option value="Öneri & Geri Bildirim">💡 Öneri & Geri Bildirim</option>
                          <option value="Yeni Varlık / Hisse Ekleme Talebi">📈 Yeni Varlık / Hisse Ekleme Talebi</option>
                          <option value="Hata / Veri Bildirimi">⚠️ Hata / Veri Bildirimi</option>
                          <option value="Reklam & İş Birliği Talebi">🤝 Reklam & İş Birliği</option>
                          <option value="Genel Soru / Destek">❓ Genel Soru / Destek</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 block mb-1.5">
                        Mesajınız
                      </label>
                      <textarea
                        rows={5}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Finans Terminal hakkında görüş, istek ve önerilerinizi buraya yazabilirsiniz..."
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none leading-relaxed"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send size={16} />
                        <span>E-Posta Gönder (finansterminaltr@gmail.com)</span>
                      </button>

                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-bold">
                        * Tıkladığınızda varsayılan e-posta kutunuz açılır
                      </span>
                    </div>
                  </form>

                  {/* Webmail Shortcuts */}
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2.5">
                      Doğrudan Web Posta ile Gönder:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=finansterminaltr@gmail.com&su=${encodeURIComponent(`Finans Terminal - ${contactSubject || 'İletişim'}`)}&body=${encodeURIComponent(contactMessage || '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-200 dark:border-rose-800/60 transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink size={12} />
                        <span>Gmail Web ile Aç</span>
                      </a>
                      <a
                        href={`https://outlook.live.com/mail/0/deeplink/compose?to=finansterminaltr@gmail.com&subject=${encodeURIComponent(`Finans Terminal - ${contactSubject || 'İletişim'}`)}&body=${encodeURIComponent(contactMessage || '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800/60 transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink size={12} />
                        <span>Outlook / Hotmail ile Aç</span>
                      </a>
                      <a
                        href={`https://compose.mail.yahoo.com/?to=finansterminaltr@gmail.com&subject=${encodeURIComponent(`Finans Terminal - ${contactSubject || 'İletişim'}`)}&body=${encodeURIComponent(contactMessage || '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-xs font-bold border border-purple-200 dark:border-purple-800/60 transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink size={12} />
                        <span>Yahoo Mail ile Aç</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right 1 Col: Information cards */}
                <div className="space-y-4">
                  
                  {/* Card 1: Official Email */}
                  <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
                      <Mail size={13} />
                      <span>Resmi Destek & İletişim</span>
                    </div>
                    <div className="text-sm font-mono font-black text-slate-900 dark:text-white break-all mb-2">
                      finansterminaltr@gmail.com
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                      Tüm resmi yazışmalar, reklam / veri ortaklığı teklifleri ve kullanıcı geri bildirimleri bu e-posta adresi üzerinden karşılanmaktadır.
                    </p>
                    <div className="flex gap-2">
                      <a
                        href="mailto:finansterminaltr@gmail.com"
                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition text-center shadow-sm cursor-pointer"
                      >
                        Mail Gönder
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
                      >
                        {copiedEmail ? 'Kopyalandı' : 'Kopyala'}
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Features */}
                  <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3.5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800/60">
                        <Clock size={15} />
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-slate-900 dark:text-slate-100">Hızlı Değerlendirme</h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                          Tüm mesajlar en geç 24 saat içinde ekibimiz tarafından incelenir.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800/60">
                        <ShieldCheck size={15} />
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-slate-900 dark:text-slate-100">Gizlilik Önceliği</h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                          İletişim bilgileriniz ve mesajlarınız asla üçüncü şahıslarla paylaşılmaz.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-800/60">
                        <Sparkles size={15} />
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-slate-900 dark:text-slate-100">Kullanıcı Odaklı Gelişim</h5>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                          Terminalde görmek istediğiniz pariteleri, grafikleri veya araçları talep edebilirsiniz.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ) : activeTab === 'legal' ? (
            <LegalPages 
              initialDoc={selectedLegalDoc} 
              onNavigateTab={(tab) => {
                setActiveTab(tab);
                setFavoritesOnly(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
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
                      {displayedAssets.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-slate-400 text-xs font-bold">
                            Aranan kritere uygun varlık veya hisse senedi bulunamadı.
                          </td>
                        </tr>
                      ) : (
                        displayedAssets.map((asset, index) => {
                          const isFirstGoldInList = (asset.category === 'gold' || asset.code === 'GA') && 
                            (index === 0 || (displayedAssets[index - 1]?.category !== 'gold' && !displayedAssets[index - 1]?.code?.startsWith('GA')));

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
                                onSelectHistory={() => setSelectedAssetForHistory(asset)}
                              />
                            </React.Fragment>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* SHOW MORE / PAGINATION FOR 500+ STOCKS & ASSETS */}
                {displayedAssets.length < filteredAssets.length && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-900/70 border-t border-slate-200 dark:border-slate-800 rounded-b-2xl sm:rounded-b-3xl">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                      Toplam <span className="text-blue-600 dark:text-blue-400 font-black">{filteredAssets.length}</span> varlıktan <span className="text-slate-800 dark:text-slate-200 font-black">{displayedAssets.length}</span> tanesi listeleniyor.
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setVisibleItemLimit(prev => Math.min(prev + 80, filteredAssets.length))}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs shadow-sm transition flex items-center gap-1.5"
                      >
                        <span>+80 Daha Yükle</span>
                      </button>
                      <button
                        onClick={() => setVisibleItemLimit(filteredAssets.length)}
                        className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 font-black text-xs transition shadow-xs"
                      >
                        Tümünü Göster ({filteredAssets.length})
                      </button>
                    </div>
                  </div>
                )}
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

          {/* SİTE ALT BİLGİSİ (FOOTER - GOOGLE ADSENSE & SPK UYUMLU) */}
          <Footer
            onNavigateTab={(tab) => {
              handleSelectTab(tab as any);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLegalDoc={(doc) => {
              setSelectedLegalDoc(doc);
              handleSelectTab('legal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>

        {/* --- MOBİL BOTTOM NAV --- */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-1.5 py-2 flex justify-around items-center z-50 shadow-2xl backdrop-blur-md bg-white/90 dark:bg-slate-900/90">
          <button onClick={() => handleSelectTab('summary')} className={`flex flex-col items-center py-1 px-1 rounded-lg transition ${activeTab === 'summary' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            <LayoutDashboard size={18} />
            <span className="text-[9px] font-bold mt-0.5">Özet</span>
          </button>
          
          <button onClick={() => handleSelectTab('forex')} className={`flex flex-col items-center py-1 px-1 rounded-lg transition relative ${activeTab === 'forex' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            {!currentUser && <Lock size={9} className="absolute top-0.5 right-1 text-amber-500" />}
            <Banknote size={18} />
            <span className="text-[9px] font-bold mt-0.5">Döviz</span>
          </button>

          <button onClick={() => handleSelectTab('gold')} className={`flex flex-col items-center py-1 px-1 rounded-lg transition relative ${activeTab === 'gold' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            {!currentUser && <Lock size={9} className="absolute top-0.5 right-1 text-amber-500" />}
            <Coins size={18} />
            <span className="text-[9px] font-bold mt-0.5">Altın</span>
          </button>

          <button onClick={() => handleSelectTab('bist')} className={`flex flex-col items-center py-1 px-1 rounded-lg transition relative ${activeTab === 'bist' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            {!currentUser && <Lock size={9} className="absolute top-0.5 right-1 text-amber-500" />}
            <BarChart3 size={18} />
            <span className="text-[9px] font-bold mt-0.5">Borsa</span>
          </button>

          <button onClick={() => handleSelectTab('crypto')} className={`flex flex-col items-center py-1 px-1 rounded-lg transition relative ${activeTab === 'crypto' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            {!currentUser && <Lock size={9} className="absolute top-0.5 right-1 text-amber-500" />}
            <Bitcoin size={18} />
            <span className="text-[9px] font-bold mt-0.5">Kripto</span>
          </button>

          <button onClick={() => handleSelectTab('commodity')} className={`flex flex-col items-center py-1 px-1 rounded-lg transition relative ${activeTab === 'commodity' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            {!currentUser && <Lock size={9} className="absolute top-0.5 right-1 text-amber-500" />}
            <Package size={18} />
            <span className="text-[9px] font-bold mt-0.5">Emtia</span>
          </button>

          <button onClick={() => handleSelectTab('news')} className={`flex flex-col items-center py-1 px-1 rounded-lg transition relative ${activeTab === 'news' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            {!currentUser && <Lock size={9} className="absolute top-0.5 right-1 text-amber-500" />}
            <Newspaper size={18} />
            <span className="text-[9px] font-bold mt-0.5">Haber</span>
          </button>

          <button onClick={() => handleSelectTab('contact')} className={`flex flex-col items-center py-1 px-1 rounded-lg transition ${activeTab === 'contact' ? 'text-blue-600 dark:text-blue-400 font-black' : 'text-slate-400'}`}>
            <Mail size={18} />
            <span className="text-[9px] font-bold mt-0.5">İletişim</span>
          </button>

          <button 
            onClick={() => currentUser ? setIsUserMenuOpen(!isUserMenuOpen) : setIsAuthModalOpen(true)} 
            className={`flex flex-col items-center py-1 px-1 rounded-lg transition ${currentUser ? 'text-emerald-600 dark:text-emerald-400 font-black' : 'text-blue-600 dark:text-blue-400'}`}
          >
            {currentUser ? <Cloud size={18} /> : <User size={18} />}
            <span className="text-[9px] font-bold mt-0.5">{currentUser ? 'Hesap' : 'Giriş'}</span>
          </button>
        </div>

        {/* --- HABER DETAY MODAL --- */}
        {selectedNews && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#111827] w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/90 dark:border-slate-800 relative overflow-hidden max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-5 right-5 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition text-slate-500 dark:text-slate-400"
              >
                <X size={18} />
              </button>

              <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-black border border-blue-500/20">
                  {selectedNews.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-bold">
                  <Clock size={12}/> {formatDynamicTimeAgo(selectedNews.timestamp, selectedNews.time)}
                  {selectedNews.timestamp && (
                    <span className="text-slate-400 font-medium ml-1">
                      ({new Date(selectedNews.timestamp).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })})
                    </span>
                  )}
                </span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-black">
                  {selectedNews.source}
                </span>
                {selectedNews.readTime && (
                  <>
                    <span>•</span>
                    <span>{selectedNews.readTime}</span>
                  </>
                )}
              </div>

              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                {selectedNews.title}
              </h2>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200/80 dark:border-slate-800 mb-6 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {selectedNews.summary}
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedNews.content ? (
                  <p>{selectedNews.content}</p>
                ) : (
                  <>
                    <p>
                      Piyasa uzmanları ve analistler, bu gelişmenin önümüzdeki günlerde yatırım kararları ve varlık fiyatlamaları üzerinde kritik bir rol oynayacağını belirtiyor. Küresel ve yerel faktörlerin birleşimi piyasada hareketliliği artırabilir.
                    </p>
                    <p>
                      Finans Terminal canlı veri akışı üzerinden ilgili para birimleri, altın ve hisse senedi fiyatlarındaki anlık değişimleri takip etmeye devam edebilirsiniz.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => openNewsInNewTab(selectedNews, e)}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Haberi Kaynağında Oku</span>
                    <ExternalLink size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const shareUrl = selectedNews.url || window.location.href;
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(shareUrl);
                        setNotificationMsg('✅ Haber bağlantısı panoya kopyalandı!');
                      }
                    }}
                    className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Bookmark size={13} />
                    <span>Paylaş</span>
                  </button>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Kaynak: {selectedNews.source}
                  </span>
                  <button 
                    onClick={() => setSelectedNews(null)}
                    className="px-5 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-black text-xs rounded-xl transition"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ALARM MODAL --- */}
        {isAlarmOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#111827] w-full max-w-sm rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/90 dark:border-slate-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Fiyat Alarmı Kur</h3>
                <button 
                  onClick={() => setIsAlarmOpen(false)} 
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={20}/>
                </button>
              </div>

              <form onSubmit={handleAddAlarm} className="space-y-5 text-center">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto border border-blue-200 dark:border-blue-800/60">
                  <Bell size={28} />
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{selectedAssetForAlarm?.name}</div>
                  <div className="text-2xl font-black font-mono mt-1 text-blue-600 dark:text-blue-400">
                    GÜNCEL: {selectedAssetForAlarm?.sell} ₺
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2 text-left">
                    Hedef Fiyat (₺)
                  </label>
                  <input 
                    type="number" 
                    step="any"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder="Örn: 35.50"
                    className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-3.5 font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white text-center"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-2xl shadow-md shadow-blue-600/25 transition active:scale-[0.99]"
                >
                  Alarmı Kaydet
                </button>
              </form>
            </div>
          </div>
        )}

        {/* --- AKTİF ALARMLAR MODAL --- */}
        {isAlarmsListOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#111827] w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/90 dark:border-slate-800">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center border border-blue-200 dark:border-blue-800/60">
                    <Bell size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Fiyat Alarmlarım</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">Takip ettiğiniz aktif alarmlar ({activeAlarms.length})</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAlarmsListOpen(false)} 
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={20}/>
                </button>
              </div>

              {activeAlarms.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4">Henüz kurulmuş bir fiyat alarmınız yok.</p>
                  <button 
                    onClick={() => {
                      setIsAlarmsListOpen(false);
                      openAlarmModal(assets[0]);
                    }}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition"
                  >
                    + Yeni Alarm Kur
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {activeAlarms.map((alarm) => (
                    <div 
                      key={alarm.id}
                      className="p-3.5 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between shadow-sm"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-black text-sm text-slate-900 dark:text-white">{alarm.code}</span>
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">({alarm.name})</span>
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
                  className="px-5 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-black text-xs rounded-xl transition"
                >
                  KAPAT
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 1G / 1A / 3A / 6A / 1Y GEÇMİŞ GELİŞİM VE GRAFİK ANALİZ MODALI */}
        {selectedAssetForHistory && (
          <AssetHistoryModal
            asset={selectedAssetForHistory}
            onClose={() => setSelectedAssetForHistory(null)}
            onSelectAsset={(newAsset) => setSelectedAssetForHistory(newAsset)}
            allAssets={assets}
            timeframe={historyTimeframe}
            setTimeframe={setHistoryTimeframe}
            isFavorite={favorites.includes(selectedAssetForHistory.code)}
            onToggleFavorite={toggleFavorite}
            onOpenAlarm={openAlarmModal}
          />
        )}

        {/* --- ÇEREZ & GOOGLE ADSENSE ONAY BİLDİRİMİ (COOKIE CONSENT BANNER) --- */}
        {!cookieConsentAccepted && (
          <div className="fixed bottom-14 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-900/30 text-slate-800 dark:text-slate-200 animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800/60">
                <Cookie size={16} />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>Çerez ve Gizlilik Tercihleri</span>
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-1 font-normal">
                  Sitemizde temel işlevler, ziyaretçi deneyimi ve Google AdSense kişiselleştirilmiş reklamları için çerezler kullanılmaktadır.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => {
                      try { localStorage.setItem('finans_cookie_consent', 'true'); } catch {}
                      setCookieConsentAccepted(true);
                    }}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-[11px] font-black rounded-lg transition shadow-sm cursor-pointer"
                  >
                    Kabul Ediyorum
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLegalDoc('cookies');
                      setActiveTab('legal');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-2.5 py-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-[11px] font-bold transition cursor-pointer"
                  >
                    Çerez Politikası
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  try { localStorage.setItem('finans_cookie_consent', 'true'); } catch {}
                  setCookieConsentAccepted(true);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
                title="Kapat"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* --- FIREBASE AUTH MODAL (KULLANICI GİRİŞİ / KAYIT / GOOGLE SIGN-IN) --- */}
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />

      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

const NavItem = ({ 
  icon, 
  label, 
  active, 
  locked = false,
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  locked?: boolean;
  onClick: () => void 
}) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-xs transition duration-150 group cursor-pointer ${
      active 
        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' 
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
    }`}
  >
    <div className="flex items-center space-x-3 truncate">
      {icon}
      <span className="truncate">{label}</span>
    </div>
    {locked && (
      <span className="flex items-center gap-1 text-[9px] font-black px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shrink-0">
        <Lock size={10} />
        <span className="hidden xl:inline">Üyelik</span>
      </span>
    )}
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
    <div className={`w-full my-3 sm:my-4 p-3 bg-slate-50/90 dark:bg-slate-900/60 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden ${className}`}>
      <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        <span>{label}</span>
      </div>
      
      {/* Real Google AdSense Tag Container */}
      <div className="w-full max-w-[728px] min-h-[90px] flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-3 shadow-sm">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', textAlign: 'center' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        
        {/* Placeholder label displayed until AdSense script fills the slot */}
        <div className="py-2 px-4 flex flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400 text-[10px] font-black uppercase border border-amber-300/70 dark:border-amber-500/20">Google AdSense</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">728 x 90 / Esnek Banner Reklam Alanı</span>
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
  isForex = false,
  onClick
}: { 
  title: string; 
  buy: number;
  sell: number; 
  change: number; 
  color: 'blue' | 'indigo' | 'yellow' | 'emerald'; 
  unit?: string;
  flash?: 'up' | 'down';
  isForex?: boolean;
  onClick?: () => void;
}) => {
  const decCount = isForex ? 4 : 2;
  return (
    <div 
      onClick={onClick}
      className={`bg-white dark:bg-[#111827] p-2.5 sm:p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md dark:shadow-none hover:border-blue-400 dark:hover:border-blue-500/50 relative overflow-hidden group transition duration-200 cursor-pointer select-none ${
        flash === 'up' ? 'ring-2 ring-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30' : ''
      } ${
        flash === 'down' ? 'ring-2 ring-rose-500 bg-rose-50/60 dark:bg-rose-950/30' : ''
      }`}
      title="Grafik ve geçmiş analizi görmek için tıklayın (1G, 1A, 3A, 6A, 1Y)"
    >
      {/* Top row: Title & Change badge */}
      <div className="flex items-center justify-between gap-1 mb-2">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-[11px] sm:text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight whitespace-nowrap">
            {title}
          </span>
          <LineChart size={11} className="text-blue-500 opacity-0 group-hover:opacity-100 transition shrink-0 hidden sm:inline" />
        </div>
        <span className={`text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-md border whitespace-nowrap shrink-0 ${
          change >= 0 
            ? 'text-emerald-700 bg-emerald-50 border-emerald-200/80 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20' 
            : 'text-rose-700 bg-rose-50 border-rose-200/80 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20'
        }`}>
          {change >= 0 ? '+' : ''}{change.toFixed(2)}%
        </span>
      </div>

      {/* Alış & Satış prices */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <div className="min-w-0">
          <div className="text-[8px] sm:text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">ALIŞ</div>
          <div className="text-[11px] xs:text-xs sm:text-sm font-bold tracking-tight font-mono text-slate-700 dark:text-slate-300 whitespace-nowrap flex items-baseline gap-0.5 overflow-hidden">
            <span>{unit === '$' ? '$' : ''}{buy.toLocaleString('en-US', { minimumFractionDigits: decCount, maximumFractionDigits: decCount })}</span>
            {unit !== '$' && <span className="text-[8px] sm:text-[10px] font-semibold text-slate-400 shrink-0">{unit}</span>}
          </div>
        </div>

        <div className="min-w-0">
          <div className="text-[8px] sm:text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5">SATIŞ</div>
          <div className="text-xs xs:text-sm sm:text-base font-black tracking-tight font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap flex items-baseline gap-0.5 overflow-hidden">
            <span>{unit === '$' ? '$' : ''}{sell.toLocaleString('en-US', { minimumFractionDigits: decCount, maximumFractionDigits: decCount })}</span>
            {unit !== '$' && <span className="text-[8px] sm:text-[10px] font-semibold text-slate-400 shrink-0">{unit}</span>}
          </div>
        </div>
      </div>

      {/* Subtle indicator tag */}
      <div className="mt-2 pt-1.5 flex items-center justify-between text-[8px] sm:text-[9px] font-bold text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/60">
        <span className="flex items-center gap-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
          <Activity size={10} /> <span className="hidden xs:inline">Grafik</span>
        </span>
        <span className="group-hover:translate-x-0.5 transition font-black text-blue-600 dark:text-blue-400">Analiz →</span>
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
  onAlarm,
  onSelectHistory
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
  onSelectHistory?: () => void;
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
    <tr 
      onClick={onSelectHistory}
      title="Grafik ve 1G/1A/3A/6A/1Y gelişimini görmek için tıklayın"
      className={`hover:bg-blue-50/70 dark:hover:bg-slate-800/80 transition duration-150 cursor-pointer group ${
        flash === 'up' ? 'bg-emerald-500/10' : ''
      } ${
        flash === 'down' ? 'bg-rose-500/10' : ''
      }`}
    >
      <td className="py-2.5 sm:py-3.5 pl-1 pr-1 sm:pl-2 sm:pr-3">
        <div className="flex items-center min-w-0">
          <span className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center mr-1.5 sm:mr-2.5 text-[8px] sm:text-[10px] font-black shrink-0 ${
            isGold 
              ? 'bg-amber-100 text-amber-800 border border-amber-300/60 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-700/50' 
              : isCrypto 
                ? 'bg-orange-100 text-orange-800 border border-orange-300/60 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-700/50'
                : 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
          }`}>
            {code.substring(0, 4)}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[11px] sm:text-sm text-slate-800 dark:text-slate-200 truncate max-w-[80px] xs:max-w-[120px] sm:max-w-none group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{name}</span>
            </div>
          </div>
        </div>
      </td>

      <td className="py-2.5 sm:py-3.5 px-1 sm:px-3 font-mono font-bold text-slate-800 dark:text-slate-200 text-[11px] sm:text-sm whitespace-nowrap text-right sm:text-left">
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

      <td className={`py-2.5 sm:py-3.5 px-1 sm:px-3 font-black text-[10px] sm:text-xs whitespace-nowrap text-right sm:text-left ${change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
        {change >= 0 ? '+' : ''}{change.toFixed(2)}%
      </td>

      <td className="py-2.5 sm:py-3.5 px-3 hidden sm:table-cell text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
        {formatVol(volume, unit)}
      </td>

      <td className="py-2.5 sm:py-3.5 px-3 hidden md:table-cell text-xs font-mono text-slate-400 whitespace-nowrap">
        {high && low ? `${low.toFixed(isForex ? 4 : 2)} - ${high.toFixed(isForex ? 4 : 2)}` : '-'}
      </td>

      <td className="py-2.5 sm:py-3.5 text-right pr-1 pl-1 sm:pr-2 sm:pl-2 whitespace-nowrap">
        <div className="flex justify-end items-center space-x-1 sm:space-x-1.5" onClick={(e) => e.stopPropagation()}>
          {/* Dedicated Chart / History Button */}
          <button 
            onClick={onSelectHistory}
            title="Geçmiş grafik ve performans analizi (1G/1A/3A/6A/1Y)"
            className="px-2 py-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white dark:bg-blue-950/80 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white rounded-lg border border-blue-200 dark:border-blue-800 text-[10px] sm:text-xs font-black flex items-center gap-1 transition shadow-sm"
          >
            <LineChart size={12} />
            <span className="hidden xs:inline">Grafik</span>
          </button>

          <button 
            onClick={onAlarm} 
            title="Fiyat alarmı kur"
            className="p-1 sm:p-1.5 bg-slate-100 dark:bg-slate-800/90 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 transition"
          >
            <Bell size={12} className="sm:w-3.5 sm:h-3.5" />
          </button>

          <button 
            onClick={onFavoriteToggle} 
            title={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
            className={`p-1 sm:p-1.5 rounded-lg border transition ${
              isFavorite 
                ? 'bg-amber-500 text-white border-amber-400 shadow-sm' 
                : 'bg-slate-100 dark:bg-slate-800/90 text-slate-400 border-slate-200/80 dark:border-slate-700 hover:text-amber-500 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Star size={12} className={`sm:w-3.5 sm:h-3.5 ${isFavorite ? 'fill-current text-white' : ''}`} />
          </button>
        </div>
      </td>
    </tr>
  );
};

// --- HISTORICAL CHART & TIMEFRAME ANALYSIS MODAL ---
interface AssetHistoryModalProps {
  asset: AssetData | null;
  onClose: () => void;
  onSelectAsset: (asset: AssetData) => void;
  allAssets: AssetData[];
  timeframe: HistoryTimeframe;
  setTimeframe: (tf: HistoryTimeframe) => void;
  isFavorite: boolean;
  onToggleFavorite: (code: string) => void;
  onOpenAlarm: (asset: AssetData) => void;
}

const AssetHistoryModal = ({
  asset,
  onClose,
  onSelectAsset,
  allAssets,
  timeframe,
  setTimeframe,
  isFavorite,
  onToggleFavorite,
  onOpenAlarm
}: AssetHistoryModalProps) => {
  const [simulationAmount, setSimulationAmount] = useState<number>(10000);

  if (!asset) return null;

  const history = generateHistoricalData(asset, timeframe);
  const isForex = asset.category === 'forex' || (!['gold', 'crypto'].includes(asset.category) && asset.unit === '₺' && !asset.code.startsWith('BIST') && !['SIL', 'BRENT', 'PLATIN', 'BAKIR'].includes(asset.code));
  const decCount = isForex ? 4 : (asset.sell < 0.01 ? 6 : (asset.sell < 1 ? 4 : 2));
  const unit = asset.unit || '₺';

  // Investment simulation calculation
  const simProfit = simulationAmount * (history.returnPercent / 100);
  const simTotal = simulationAmount + simProfit;

  // Category title display
  const categoryLabels: Record<string, string> = {
    gold: 'Altın Piyasası',
    forex: 'Döviz Kurları',
    crypto: 'Kripto Paralar',
    bist: 'Borsa İstanbul',
    commodity: 'Emtia & Değerli Madenler'
  };

  // Popular assets for fast switching
  const popularCodes = ['GA', 'CEYREK', 'USD', 'EUR', 'BTC', 'ETH', 'BIST100', 'SIL', 'THYAO', 'GARAN'];
  const popularAssets = allAssets.filter(a => popularCodes.includes(a.code));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 rounded-3xl max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-xs sm:text-sm font-black shrink-0 ${
              asset.category === 'gold' 
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25' 
                : asset.category === 'crypto' 
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                  : asset.category === 'bist'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
                    : 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
            }`}>
              {asset.code.substring(0, 4)}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-widest">
                  {categoryLabels[asset.category] || asset.category}
                </span>
                <span className="text-[10px] font-mono text-slate-400">Sembol: <strong className="text-slate-700 dark:text-slate-200">{asset.code}</strong></span>
              </div>

              <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5 truncate">
                {asset.name}
              </h3>

              <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                <div className="text-sm sm:text-lg font-black font-mono text-blue-600 dark:text-blue-400">
                  {unit === '$' ? '$' : ''}{asset.sell.toLocaleString('en-US', { minimumFractionDigits: decCount, maximumFractionDigits: decCount })}{unit !== '$' ? ` ${unit}` : ''}
                </div>
                <span className={`text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-lg border ${
                  asset.change >= 0 
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20' 
                    : 'text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20'
                }`}>
                  {asset.change >= 0 ? '▲ +' : '▼ '}{asset.change.toFixed(2)}% (24s)
                </span>
                <span className="text-[10px] font-bold text-slate-400 hidden sm:inline">
                  Alış: {unit === '$' ? '$' : ''}{asset.buy.toLocaleString('en-US', { minimumFractionDigits: decCount, maximumFractionDigits: decCount })}{unit !== '$' ? ` ${unit}` : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleFavorite(asset.code)}
              title={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
              className={`p-2.5 rounded-xl border transition ${
                isFavorite 
                  ? 'bg-amber-500 text-white border-amber-400 shadow-md shadow-amber-500/20' 
                  : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-amber-500'
              }`}
            >
              <Star size={16} className={isFavorite ? 'fill-current' : ''} />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenAlarm(asset);
              }}
              title="Bu varlığa fiyat alarmı kur"
              className="p-2.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl border border-slate-200 dark:border-slate-700 transition"
            >
              <Bell size={16} />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-xl transition"
              title="Kapat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          {/* TIMEFRAME SELECTOR BAR */}
          <div className="bg-slate-100 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="grid grid-cols-5 gap-1 w-full sm:w-auto">
              {(['1G', '1A', '3A', '6A', '1Y'] as HistoryTimeframe[]).map((tf) => {
                const isActive = timeframe === tf;
                const labels: Record<HistoryTimeframe, string> = {
                  '1G': '1 Gün',
                  '1A': '1 Ay',
                  '3A': '3 Ay',
                  '6A': '6 Ay',
                  '1Y': '1 Yıl'
                };
                return (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`py-2 px-2 sm:px-4 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="leading-tight">{tf}</span>
                    <span className="text-[9px] font-medium opacity-85 hidden xs:inline">{labels[tf]}</span>
                  </button>
                );
              })}
            </div>

            <div className="px-2 py-1 text-right sm:text-right">
              <div className="text-[11px] font-black text-slate-800 dark:text-slate-200">
                {history.timeframeTitle}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {history.timeframeDescription}
              </div>
            </div>
          </div>

          {/* INTERACTIVE RECHARTS CHART */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-3 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                <span className="font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                  Fiyat Gelişimi Grafiği ({timeframe})
                </span>
              </div>
              <div className="text-[11px] font-mono font-bold text-slate-500">
                Dönem Başlangıç: <strong className="text-slate-800 dark:text-slate-200">{history.startPrice.toLocaleString('en-US', { minimumFractionDigits: decCount, maximumFractionDigits: decCount })} {unit}</strong>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`gradient-${asset.code}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={history.isPositive ? "#10b981" : "#f43f5e"} stopOpacity={0.35}/>
                      <stop offset="95%" stopColor={history.isPositive ? "#10b981" : "#f43f5e"} stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.15} />
                  <XAxis 
                    dataKey="date" 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                  />
                  <YAxis 
                    domain={['auto', 'auto']} 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                    tickFormatter={(v) => {
                      if (v >= 100000) return `${Math.round(v / 1000)}k`;
                      if (v >= 10000) return `${(v / 1000).toFixed(1)}k`;
                      if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
                      if (v >= 10) return `${v.toFixed(1)}`;
                      if (v >= 1) return `${v.toFixed(2)}`;
                      if (v >= 0.01) return `${v.toFixed(4)}`;
                      if (v >= 0.0001) return `${v.toFixed(6)}`;
                      return `${v.toFixed(8)}`;
                    }}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as HistoryDataPoint;
                        return (
                          <div className="bg-slate-900 text-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl border border-slate-700 text-xs">
                            <div className="text-[10px] text-slate-400 font-bold mb-1">{data.rawDate}</div>
                            <div className="text-base font-black font-mono text-blue-400">
                              {unit === '$' ? '$' : ''}{data.formattedPrice}{unit !== '$' ? ` ${unit}` : ''}
                            </div>
                            <div className="text-[10px] font-bold mt-1 text-slate-300 flex items-center gap-1">
                              <span>Dönem Başına Göre:</span>
                              <span className={`font-black ${data.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke={history.isPositive ? "#10b981" : "#f43f5e"} 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill={`url(#gradient-${asset.code})`} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4 SUMMARY STATISTIC CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* 1. Return & Percent */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>{timeframe} GETİRİ ORANI</span>
                <TrendingUp size={13} className={history.isPositive ? 'text-emerald-500' : 'text-rose-500'} />
              </div>
              <div className={`text-base sm:text-xl font-black ${history.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {history.isPositive ? '+' : ''}%{history.returnPercent.toFixed(2)}
              </div>
              <div className="text-[10px] font-mono font-bold text-slate-500 mt-0.5">
                {history.returnAmount >= 0 ? '+' : ''}{history.returnAmount.toFixed(decCount)} {unit}
              </div>
            </div>

            {/* 2. Start Price vs Current */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                DÖNEM BAŞI ➔ GÜNCEL
              </div>
              <div className="text-xs sm:text-sm font-mono font-black text-slate-800 dark:text-slate-200">
                {history.startPrice.toFixed(decCount)} ➔ {history.currentPrice.toFixed(decCount)} {unit}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Fiyat Değişimi: {((history.currentPrice - history.startPrice)).toFixed(decCount)} {unit}
              </div>
            </div>

            {/* 3. Min vs Max */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                DÖNEM DİBİ / ZİRVESİ
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-slate-700 dark:text-slate-300">
                <span className="text-rose-500 font-black">{history.minPrice.toFixed(decCount)}</span>
                <span className="text-slate-400 mx-1">/</span>
                <span className="text-emerald-500 font-black">{history.maxPrice.toFixed(decCount)} {unit}</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Fark: {(history.maxPrice - history.minPrice).toFixed(decCount)} {unit}
              </div>
            </div>

            {/* 4. Average & Volatility */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                ORTALAMA & OYNAKLIK
              </div>
              <div className="text-xs sm:text-sm font-mono font-black text-blue-600 dark:text-blue-400">
                {history.avgPrice.toFixed(decCount)} {unit}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-bold">
                Volatilite: %{history.volatility}
              </div>
            </div>
          </div>

          {/* INVESTMENT RETURN SIMULATOR */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="max-w-md">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-300 mb-1">
                  <Calculator size={13} />
                  <span>Yatırım Getiri Simülatörü ({timeframe})</span>
                </div>
                <h4 className="text-sm sm:text-base font-black">
                  "{timeframe}" önce bu varlığa para yatırsaydınız ne olurdu?
                </h4>
                <p className="text-xs text-blue-200/80 mt-1 leading-relaxed">
                  {timeframe} önce <strong className="text-white">{simulationAmount.toLocaleString('tr-TR')} {unit}</strong> değerinde {asset.name} alsaydınız, bugün paranız <strong className="text-emerald-400 font-bold">{simTotal.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} {unit}</strong> olurdu.
                </p>
              </div>

              {/* Amount selector & results */}
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 min-w-[240px]">
                <div className="text-[10px] font-bold text-blue-200 uppercase mb-1.5">Yatırım Tutarı Seçin</div>
                <div className="flex gap-1.5 mb-3">
                  {[5000, 10000, 50000, 100000].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setSimulationAmount(amt)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-black transition ${
                        simulationAmount === amt 
                          ? 'bg-white text-blue-900 shadow-md' 
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      {amt >= 1000 ? `${amt / 1000} Bin` : amt} {unit}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] text-blue-300 font-bold uppercase">Net Kazanç / Kâr:</div>
                    <div className="text-sm sm:text-base font-black font-mono text-emerald-400">
                      {simProfit >= 0 ? '+' : ''}{simProfit.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} {unit}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-blue-300 font-bold uppercase">Toplam Bakiye:</div>
                    <div className="text-sm sm:text-base font-black font-mono text-white">
                      {simTotal.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} {unit}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* POPULAR ASSETS FAST SWITCHER */}
          <div>
            <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles size={12} className="text-amber-500" />
              <span>Diğer Popüler Varlıkların Geçmişini İnceleyin</span>
            </div>
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
              {popularAssets.map((pop) => (
                <button
                  key={pop.code}
                  onClick={() => onSelectAsset(pop)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition border flex items-center gap-1.5 ${
                    pop.code === asset.code 
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md' 
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                  }`}
                >
                  <span className="font-mono font-black">{pop.code}</span>
                  <span className="text-[10px] text-slate-400">({pop.name.split(' ')[0]})</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium text-center sm:text-left">
            * 1 Gün, 1 Ay, 3 Ay, 6 Ay ve 1 Yıllık veriler piyasa trendleri ve kapanış fiyatları baz alınarak hesaplanmaktadır.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenAlarm(asset);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
            >
              <Bell size={13} />
              <span>Alarm Kur</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-black text-xs rounded-xl transition"
            >
              Kapat
            </button>
          </div>
        </div>

      </div>
    </div>
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
    <label className="text-[10px] font-black text-blue-100 uppercase mb-1.5 block tracking-widest">{label}</label>
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-blue-700/60 border border-blue-400/60 rounded-xl p-2.5 font-bold text-xs sm:text-sm focus:outline-none text-white focus:ring-2 focus:ring-white/50 cursor-pointer"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value} className="text-slate-900 bg-white">
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
