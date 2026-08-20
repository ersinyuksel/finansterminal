import React, { useState } from 'react';
import { 
  Activity, Mail, ShieldCheck, ExternalLink, ChevronRight, Lock, 
  FileText, Scale, Cookie, Building, Heart, Copy, Check, AlertCircle, Sparkles
} from 'lucide-react';
import { LegalDocType } from './LegalPages';

interface FooterProps {
  onNavigateTab: (tab: any) => void;
  onOpenLegalDoc: (doc: LegalDocType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenLegalDoc }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText('finansterminaltr@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  return (
    <footer className="mt-12 bg-white dark:bg-[#111827] border-t border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm text-slate-700 dark:text-slate-300">
      
      {/* 1. ÜST KISIM: LOGO, HIZLI LİNKLER VE İLETİŞİM */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-100 dark:border-slate-800">
        
        {/* Kolon 1 (5 Col): Marka ve Misyon */}
        <div className="lg:col-span-5 space-y-4">
          <div 
            onClick={() => {
              onNavigateTab('summary');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
            title="Ana Sayfaya Dön"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/25 shrink-0 group-hover:scale-105 transition">
              <Activity size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-blue-600 dark:text-blue-400 tracking-tight flex items-center group-hover:underline">
                Finans<span className="text-slate-900 dark:text-white ml-1">Terminal</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Canlı Piyasa Takip & Analiz Platformu
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md font-normal">
            Finans Terminal; serbest piyasa döviz kurlarını, Kapalıçarşı altın fiyatlarını, Borsa İstanbul (BIST) hisselerini, kripto paraları ve küresel emtia verilerini tarafsız ve anlık olarak sunan kapsamlı finans takip merkezidir.
          </p>

          {/* İletişim Butonları */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <a
              href="mailto:finansterminaltr@gmail.com?subject=Finans%20Terminal%20İletişim"
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800/60 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Mail size={13} />
              <span>finansterminaltr@gmail.com</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              title="E-posta adresini kopyala"
            >
              {copiedEmail ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
              <span className="text-[11px]">{copiedEmail ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>
        </div>

        {/* Kolon 2 (3 Col): Piyasalar */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <Sparkles size={13} className="text-blue-500" />
            <span>Piyasa Ekranları</span>
          </h4>
          <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <li>
              <button 
                onClick={() => onNavigateTab('summary')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer text-left"
              >
                Piyasa Özeti & Canlı Ticker
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigateTab('forex')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer text-left"
              >
                Döviz Kurları (USD, EUR, GBP)
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigateTab('gold')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer text-left"
              >
                Kapalıçarşı & Serbest Piyasa Altın
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigateTab('bist')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer text-left"
              >
                Borsa İstanbul (BIST 100 / BIST 500)
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigateTab('crypto')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer text-left"
              >
                Canlı Kripto Para Fiyatları
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigateTab('news')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer text-left"
              >
                Canlı Ekonomi & Finans Haberleri
              </button>
            </li>
          </ul>
        </div>

        {/* Kolon 3 (4 Col): Kurumsal & Yasal Bildirimler (Google AdSense Uyumlu) */}
        <div className="lg:col-span-4 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Kurumsal & Yasal Şartlar</span>
          </h4>
          <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <li>
              <button 
                onClick={() => onOpenLegalDoc('about')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer text-left flex items-center gap-1.5"
              >
                <Building size={12} className="text-slate-400" />
                <span>Hakkımızda (About Us)</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenLegalDoc('privacy')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer text-left flex items-center gap-1.5"
              >
                <Lock size={12} className="text-slate-400" />
                <span>Gizlilik Politikası (Privacy Policy)</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenLegalDoc('terms')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer text-left flex items-center gap-1.5"
              >
                <FileText size={12} className="text-slate-400" />
                <span>Kullanım Şartları (Terms of Service)</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenLegalDoc('cookies')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer text-left flex items-center gap-1.5"
              >
                <Cookie size={12} className="text-slate-400" />
                <span>Çerez Politikası (Cookie Policy)</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onOpenLegalDoc('disclaimer')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer text-left flex items-center gap-1.5"
              >
                <Scale size={12} className="text-slate-400" />
                <span>SPK Sorumluluk Reddi (YTD Bildirimi)</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigateTab('contact')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer text-left flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-black"
              >
                <Mail size={12} />
                <span>Bize Ulaşın & İletişim Formu</span>
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* 2. ORTA KISIM: ADSENSE & YASAL UYARI BİLDİRİM KUTUSU */}
      <div className="py-6 border-b border-slate-100 dark:border-slate-800 space-y-4">
        
        {/* SPK Uyarısı */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          <strong className="text-slate-800 dark:text-slate-200 font-bold block mb-1">
            ⚠️ Yasal Uyarı & Sorumluluk Reddi (SPK Mevzuatı):
          </strong>
          Burada yer alan yatırım bilgi, yorum ve tavsiyeleri <strong>yatırım danışmanlığı kapsamında değildir (YTD)</strong>. Sitede yer alan veriler, döviz kurları, altın ve hisse senedi fiyatları genel bilgilendirme amacıyla sunulmuş olup herhangi bir alım-satım tavsiyesi niteliği taşımaz.
        </div>

        {/* AdSense Çerez Bildirimi */}
        <div className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          <strong className="text-slate-600 dark:text-slate-300 font-semibold">Google AdSense ve Çerez Bildirimi: </strong>
          Sitemizde Google AdSense ve üçüncü taraf reklam ağları aracılığıyla ilgi alanlarınıza dayalı kişiselleştirilmiş reklamlar yayınlanabilir. Kullanıcılar, diledikleri takdirde <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-blue-500">Google Ads Settings</a> veya <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-blue-500">AboutAds.info</a> sayfalarından kişiselleştirilmiş çerez kullanımını devre dışı bırakabilirler.
        </div>

      </div>

      {/* 3. ALT KISIM: TELİF HAKKI VE SÜRÜM */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Finans Terminal. Tüm hakları saklıdır.</span>
          <span>•</span>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            Sürüm v1.12
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <button onClick={() => onOpenLegalDoc('privacy')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            Gizlilik
          </button>
          <button onClick={() => onOpenLegalDoc('terms')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            Kullanım Şartları
          </button>
          <button onClick={() => onOpenLegalDoc('cookies')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            Çerezler
          </button>
          <button onClick={() => onNavigateTab('contact')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            İletişim
          </button>
        </div>
      </div>

    </footer>
  );
};
