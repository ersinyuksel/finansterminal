import React, { useState } from 'react';
import { Lock, LogIn, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { getAuthErrorMessage, createLocalAccount } from '../authHelper';

interface AuthLockGateProps {
  tab: 'forex' | 'gold' | 'crypto' | 'bist' | 'commodity' | 'news' | string;
  onOpenAuthModal: () => void;
  onGoToSummary: () => void;
}

const TAB_DETAILS: Record<string, { title: string; subtitle: string; iconBg: string; features: string[] }> = {
  forex: {
    title: 'Döviz Kurları & Çapraz Kurlar',
    subtitle: 'Dolar, Euro, Sterlin, İsviçre Frangı, Japon Yeni ve tüm dünya para birimlerinin canlı banka/serbest piyasa alış-satış makasları ve değişim oranları.',
    iconBg: 'from-blue-600 to-indigo-600',
    features: [
      'Tüm majör ve minör para birimlerinde canlı alış/satış',
      'Geçmiş 1G, 1A, 3A, 6A, 1Y fiyat değişim grafikleri',
      'Kişiselleştirilmiş hedef kur alarmları ve uyarılar',
      'Hızlı döviz çevirici ve canlı arbitraj takibi'
    ]
  },
  gold: {
    title: 'Kapalıçarşı & Canlı Altın Piyasası',
    subtitle: 'Gram Altın, Çeyrek Altın, Yarım, Tam, Cumhuriyet, 22 Ayar Bilezik, Has Altın ve ONS Altın anlık fiyatları ve alış-satış marjları.',
    iconBg: 'from-amber-500 to-yellow-600',
    features: [
      'Kapalıçarşı serbest piyasa ve banka altın fiyatları',
      'Kuyumcu ve yatırımcı odaklı tüm altın çeşitleri',
      'ONS Altın ve Dolar/TL korelasyon analizleri',
      'Anlık fiyat alarmları ile seviye kaçırmama'
    ]
  },
  crypto: {
    title: 'Canlı Kripto Para Piyasası',
    subtitle: 'Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Ripple (XRP), USDT ve 50+ popüler kripto paranın canlı TL ve Dolar değerleri.',
    iconBg: 'from-orange-500 to-amber-600',
    features: [
      '7/24 kesintisiz canlı kripto fiyat akışı',
      '24 saatlik hacim, en yüksek ve en düşük değerler',
      'Kripto portföy takibi ve özel favori listesi',
      'Bulut eşitleme ile tüm cihazlarda ortak takip'
    ]
  },
  bist: {
    title: 'Borsa İstanbul (500+ BIST Hissesi)',
    subtitle: 'BIST 100, BIST 30, BIST 500 ve Borsa İstanbul’da işlem gören tüm şirketlerin anlık hisse fiyatları, hacimleri ve günlük performansları.',
    iconBg: 'from-emerald-600 to-teal-600',
    features: [
      '500’den fazla BIST hisse senedinin anlık takibi',
      'Sektörel filtreleme, hacim ve değer artış sıralamaları',
      'Hisse bazlı geçmiş performans ve derinlik grafikleri',
      'Özel hisse alarm bildirimleri'
    ]
  },
  commodity: {
    title: 'Emtia & Değerli Madenler',
    subtitle: 'Gram Gümüş, ONS Gümüş, Platin, Paladyum, Brent Petrol ve Ham Petrol canlı küresel piyasa verileri.',
    iconBg: 'from-slate-700 to-slate-900',
    features: [
      'Değerli metallerde anlık gram ve ONS fiyatları',
      'Brent petrol ve enerji piyasaları takibi',
      'Fiyat hareketlerine göre anında kurulan alarmlar',
      'Yatırımcılar için detaylı grafik incelemeleri'
    ]
  },
  news: {
    title: 'Ekonomi, Finans & Borsa Haberleri',
    subtitle: 'Bloomberg HT, Ekonomim, AA Finans, TRT Haber, Bigpara ve Uzmancoin kaynaklarından 7/24 son dakika ekonomi haber akışı.',
    iconBg: 'from-blue-700 to-cyan-700',
    features: [
      '6 farklı bağımsız kaynaktan anlık RSS haber akışı',
      'Merkez bankası kararları ve faiz açıklamaları',
      'Kategori bazlı (Borsa, Altın, Kripto, Döviz) haber filtreleme',
      'Son dakika flaş bildirimleri'
    ]
  }
};

export const AuthLockGate: React.FC<AuthLockGateProps> = ({
  tab,
  onOpenAuthModal,
  onGoToSummary
}) => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState<{ title?: string; message: string; canFallbackToLocal?: boolean } | null>(null);

  const info = TAB_DETAILS[tab] || {
    title: 'Detaylı Piyasa Verileri',
    subtitle: 'Bu bölümdeki tüm canlı fiyatlara, detaylı tablolara ve analiz araçlarına erişmek için lütfen giriş yapın.',
    iconBg: 'from-blue-600 to-indigo-600',
    features: [
      '500+ BIST hissesi ve tüm dünya kurları',
      'Kişiselleştirilmiş favori listesi',
      'Fiyat alarmları ve anlık uyarılar',
      'Geçmiş fiyat grafikleri ve analizler'
    ]
  };

  const handleGoogleSignIn = async () => {
    setErrorInfo(null);
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Google Sign-in error:', err);
      const parsed = getAuthErrorMessage(err);
      setErrorInfo(parsed);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleInstantQuickStart = () => {
    createLocalAccount('kullanici@finansterminal.com', 'Misafir Yatırımcı');
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-3 sm:px-6">
      <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden">
        
        {/* HEADER HERO AREA */}
        <div className={`bg-gradient-to-r ${info.iconBg} p-6 sm:p-10 text-white relative overflow-hidden`}>
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider mb-4 border border-white/20">
              <Lock size={13} className="text-amber-300" />
              <span>Üye Girişi Gereklidir</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-3">
              {info.title}
            </h2>

            <p className="text-xs sm:text-sm text-white/90 font-medium max-w-2xl leading-relaxed">
              {info.subtitle}
            </p>
          </div>
        </div>

        {/* BODY CONTENT */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {errorInfo && (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-2xl flex flex-col gap-2 text-rose-700 dark:text-rose-300 text-xs font-semibold animate-in fade-in duration-200">
              <div className="flex items-start gap-2.5">
                <AlertCircle size={18} className="shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                <div>
                  {errorInfo.title && <div className="font-bold text-rose-800 dark:text-rose-200">{errorInfo.title}</div>}
                  <span>{errorInfo.message}</span>
                </div>
              </div>
              {errorInfo.canFallbackToLocal && (
                <button
                  type="button"
                  onClick={handleInstantQuickStart}
                  className="mt-2 py-2 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer self-start"
                >
                  <Zap size={13} />
                  <span>Tek Tıkla Hızlı Giriş Yap</span>
                </button>
              )}
            </div>
          )}

          {/* VALUE PROPOSITION GRID */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-amber-500" />
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Giriş Yaparak Neler Kazanacaksınız? (Tamamen Ücretsiz)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {info.features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-3.5 bg-slate-50 dark:bg-slate-900/70 rounded-2xl border border-slate-200/80 dark:border-slate-800"
                >
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-snug">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CALL TO ACTION BUTTONS */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3">
            {/* GOOGLE SIGN IN BUTTON */}
            <button
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full sm:flex-1 py-3.5 px-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-black text-xs sm:text-sm rounded-2xl border border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-center gap-3 transition active:scale-[0.99] cursor-pointer disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{googleLoading ? 'Bağlanılıyor...' : 'Google ile Hızlı Giriş'}</span>
            </button>

            {/* EMAIL / PASSWORD SIGN IN BUTTON */}
            <button
              onClick={onOpenAuthModal}
              className="w-full sm:flex-1 py-3.5 px-4 bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <LogIn size={16} />
              <span>E-Posta ile Giriş / Kayıt</span>
            </button>

            {/* GO TO SUMMARY BUTTON */}
            <button
              onClick={onGoToSummary}
              className="w-full sm:w-auto py-3.5 px-5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Piyasa Özeti</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[11px] text-slate-400 dark:text-slate-500">
            <div className="inline-flex items-center gap-2 font-semibold">
              <ShieldCheck size={14} className="text-blue-500" />
              <span>Finans Terminal üyeliği tamamen ücretsizdir ve kredi kartı gerektirmez.</span>
            </div>

            <button
              type="button"
              onClick={handleInstantQuickStart}
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Zap size={12} className="text-amber-500" />
              <span>Kayıt olmadan tek tıkla hemen başla</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
