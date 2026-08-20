import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, FileText, Scale, Cookie, Mail, Copy, Check, 
  ExternalLink, ChevronRight, AlertCircle, Info, Sparkles, Building, Lock
} from 'lucide-react';

export type LegalDocType = 'about' | 'privacy' | 'terms' | 'cookies' | 'disclaimer';

interface LegalPagesProps {
  initialDoc?: LegalDocType;
  onNavigateTab?: (tab: any) => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ initialDoc = 'about', onNavigateTab }) => {
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(initialDoc);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  useEffect(() => {
    if (initialDoc) {
      setActiveDoc(initialDoc);
    }
  }, [initialDoc]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeDoc]);

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
    <div className="space-y-6 w-full max-w-full overflow-x-hidden animate-in fade-in duration-200">
      {/* ÜST BAŞLIK & BELGE SEÇİM KARTI */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-blue-500/20">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md text-blue-300 text-[10px] font-black uppercase tracking-widest border border-blue-400/30">
              <ShieldCheck size={12} className="text-blue-400" />
              <span>Kurumsal & Yasal Belgeler</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-400/30">
              ✓ Google AdSense & KVKK Uyumlu
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
            Şeffaflık, Güvenilirlik & Yasal Bildirimler
          </h3>
          <p className="text-xs sm:text-sm text-blue-100/90 mt-2 font-normal leading-relaxed">
            Finans Terminal olarak kullanıcılarımızın gizliliğine, doğru veri akışına ve yasal mevzuatlara en üst düzeyde önem veriyoruz. Sitemizin yayın politikası, çerez yönetimi ve kullanım standartlarını aşağıdan inceleyebilirsiniz.
          </p>

          {/* BELGE SEÇİM BUTONLARI */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveDoc('about')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 cursor-pointer ${
                activeDoc === 'about'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              <Building size={14} />
              <span>Hakkımızda</span>
            </button>

            <button
              onClick={() => setActiveDoc('privacy')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 cursor-pointer ${
                activeDoc === 'privacy'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              <Lock size={14} />
              <span>Gizlilik Politikası</span>
            </button>

            <button
              onClick={() => setActiveDoc('terms')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 cursor-pointer ${
                activeDoc === 'terms'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              <FileText size={14} />
              <span>Kullanım Şartları</span>
            </button>

            <button
              onClick={() => setActiveDoc('cookies')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 cursor-pointer ${
                activeDoc === 'cookies'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              <Cookie size={14} />
              <span>Çerez Politikası</span>
            </button>

            <button
              onClick={() => setActiveDoc('disclaimer')}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 cursor-pointer ${
                activeDoc === 'disclaimer'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              <Scale size={14} />
              <span>SPK Yasal Uyarısı (YTD)</span>
            </button>
          </div>
        </div>
      </div>

      {/* METİN VE İÇERİK ALANI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SOL PANEL: METİN İÇERİĞİ */}
        <div className="lg:col-span-8 bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-9 border border-slate-200/90 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200 space-y-6 leading-relaxed">
          
          {/* 1. HAKKIMIZDA */}
          {activeDoc === 'about' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Kurumsal Kimlik & Vizyon
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Finans Terminal Hakkında
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-medium">Son Güncelleme: 14 Ağustos 2026 | Sürüm: v1.12</p>
              </div>

              <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4 font-normal">
                <p>
                  <strong>Finans Terminal</strong>, yatırımcılara, bireysel kullanıcılara ve finans dünyasını yakından takip eden herkese kesintisiz, anlık, tarafsız ve anlaşılır piyasa verileri sağlamak amacıyla geliştirilmiş yeni nesil bir finansal takip platformudur.
                </p>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  1. Misyonumuz & Değerlerimiz
                </h3>
                <p>
                  Finansal piyasaların dinamik yapısında, hızlı ve doğru bilgiye erişim en değerli unsurdur. Finans Terminal olarak misyonumuz; döviz kurları, altın ve ziynet fiyatları, Borsa İstanbul (BIST 100 & BIST 500) hisseleri, kripto paralar ve küresel emtia fiyatlarını modern, şık, hızlı ve her cihazda kusursuz çalışan tek bir arayüzde bir araya getirmektir.
                </p>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  2. Veri Sağlayıcıları ve Şeffaflık
                </h3>
                <p>
                  Platformumuzda yer alan veriler; Türkiye Cumhuriyet Merkez Bankası (TCMB) resmi gösterge kurları, Serbest Piyasa Kapalıçarşı altın ve döviz piyasaları, Borsa İstanbul A.Ş. veri akışları ve uluslararası bağımsız veri sağlayıcılarından toplanarak anlık ve periyodik olarak işlenir. Kullanıcı deneyimini en üstte tutmak adına fiyat alarmları, döviz çevirici ve canlı ekonomi haberleri akışı sunulmaktadır.
                </p>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  3. Finansal Okuryazarlık ve Tarafsızlık
                </h3>
                <p>
                  Finans Terminal, hiçbir finansal enstrümanın, bankanın, hisse senedinin veya kripto varlığın doğrudan veya dolaylı pazarlamasını yapmaz. İçeriklerimiz ve haberlerimiz yalnızca genel kamuoyunu bilgilendirme ve finansal okuryazarlığı destekleme amacı taşır.
                </p>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  4. İletişim & Künye
                </h3>
                <p>
                  Finans Terminal projesi ve platform yönetimi ile ilgili her türlü soru, öneri, veri talebi, telif hakkı bildirimi ve kurumsal iş birlikleri için resmi iletişim adresimiz: <strong className="text-blue-600 dark:text-blue-400">finansterminaltr@gmail.com</strong>
                </p>
              </div>
            </div>
          )}

          {/* 2. GİZLİLİK POLİTİKASI (GOOGLE ADSENSE & KVKK UYUMLU) */}
          {activeDoc === 'privacy' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Google AdSense, GDPR & KVKK Mevzuatına Uyumlu
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Gizlilik Politikası
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-medium">Yürürlük Tarihi: 14 Ağustos 2026</p>
              </div>

              <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4 font-normal">
                <p>
                  <strong>Finans Terminal</strong> ("finansterminaltr", "biz", "sitemiz") olarak ziyaretçilerimizin kişisel gizliliğini en yüksek standartlarda korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, sitemizi ziyaret ettiğinizde toplanan bilgilerin niteliğini, nasıl kullanıldığını ve üçüncü taraf reklam ortaklarımızın (özellikle Google AdSense) çerez kullanım şartlarını açıklar.
                </p>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  1. Toplanan Standart Bilgiler & Günlük Dosyaları (Log Files)
                </h3>
                <p>
                  Birçok standart web sitesinde olduğu gibi, Finans Terminal de sunucu günlük dosyalarını (log files) istatistiksel ve güvenlik amaçlarıyla kullanır. Bu dosyalar; IP adresiniz, internet servis sağlayıcınız (ISP), tarayıcı türünüz (Chrome, Safari, Firefox vb.), işletim sisteminiz, sitemize giriş-çıkış sayfaları ve tıklama sayıları gibi kişisel kimliğinizi doğrudan ifşa etmeyen anonim teknik verileri içerir. Bu veriler yalnızca site performansını iyileştirmek ve kötü niyetli saldırıları engellemek için değerlendirilir.
                </p>

                <div className="p-4 bg-blue-50/80 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-900/60 my-4 space-y-2">
                  <h4 className="text-xs sm:text-sm font-black text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                    <Info size={16} />
                    <span>2. Google AdSense ve DoubleClick DART Çerez Bildirimi</span>
                  </h4>
                  <p className="text-[11px] sm:text-xs text-blue-900/90 dark:text-blue-200 leading-relaxed font-normal">
                    • Google dahil olmak üzere üçüncü taraf satıcılar, kullanıcıların web sitemize veya internetteki diğer web sitelerine daha önceki ziyaretlerine dayalı olarak reklam sunmak için çerezleri (DART çerezi) kullanır.<br/>
                    • Google'ın reklam çerezlerini kullanması, Google ve iş ortaklarının kullanıcılarımıza sitemizi ve/veya internetteki diğer siteleri ziyaretlerine dayalı olarak ilgi alanlarına uygun kişiselleştirilmiş reklamlar sunmasını sağlar.<br/>
                    • Kullanıcılar, dilerlerse <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="underline font-bold text-blue-700 dark:text-blue-300">Google Reklam Ayarları</a> sayfasını ziyaret ederek kişiselleştirilmiş reklamcılığı devre dışı bırakabilirler.<br/>
                    • Alternatif olarak kullanıcılar, <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="underline font-bold text-blue-700 dark:text-blue-300">www.aboutads.info</a> adresini ziyaret ederek üçüncü taraf bir satıcının kişiselleştirilmiş reklamcılık amaçlı çerez kullanımını devre dışı bırakabilirler.
                  </p>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  3. Üçüncü Taraf Reklam Ortakları ve Web İşaretçileri
                </h3>
                <p>
                  Sitemizde yer alan reklamlar (Google AdSense gibi üçüncü taraf reklam sunucuları veya reklam ağları) tarafından tarayıcınıza gönderilen teknolojileri kullanabilir. Bu işlem sırasında IP adresiniz otomatik olarak alınır. Üçüncü taraf reklam ağları, reklam kampanyalarının etkinliğini ölçmek ve/veya gördüğünüz reklam içeriğini kişiselleştirmek için çerezleri, JavaScript'i veya Web İşaretçilerini (Web Beacons) kullanabilir. Finans Terminal'in, üçüncü taraf reklamverenler tarafından kullanılan bu çerezler üzerinde doğrudan bir erişimi veya kontrol yetkisi bulunmamaktadır.
                </p>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  4. Kişisel Verilerin Korunması (KVKK & GDPR) Haklarınız
                </h3>
                <p>
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve AB Genel Veri Koruma Tüzüğü (GDPR) kapsamında, kullanıcılarımız haklarına sahiptir:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm pl-2">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                  <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
                  <li>Verilerin amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                  <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
                  <li>Kanun kapsamında verilerin silinmesini veya yok edilmesini talep etme.</li>
                </ul>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  5. İletişim ve Veri Sorumlusu
                </h3>
                <p>
                  Gizlilik politikamız veya kişisel verilerinizle ilgili her türlü soru ve bildiriminiz için lütfen <strong className="text-blue-600 dark:text-blue-400">finansterminaltr@gmail.com</strong> adresinden bizimle iletişime geçiniz.
                </p>
              </div>
            </div>
          )}

          {/* 3. KULLANIM ŞARTLARI */}
          {activeDoc === 'terms' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Kullanıcı Sözleşmesi & Hizmet Koşulları
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Kullanım Şartları
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-medium">Son Güncelleme: 14 Ağustos 2026</p>
              </div>

              <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4 font-normal">
                <p>
                  Finans Terminal web sitesine ("Site") erişim sağlayarak ve siteyi kullanarak, aşağıda belirtilen kullanım şartlarını kabul etmiş sayılırsınız. Bu şartları kabul etmiyorsanız lütfen siteyi kullanmayınız.
                </p>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  1. Hizmetin Niteliği ve Genel Bilgilendirme
                </h3>
                <p>
                  Finans Terminal, serbest piyasa döviz kurları, TCMB resmi verileri, altın fiyatları, Borsa İstanbul endeks ve hisseleri, kripto varlıklar ve küresel piyasa verilerini kullanıcılarına anlık veya periyodik olarak sunan bir bilgi ve takip platformudur. Sitede sunulan hesaplama araçları, alarmlar ve grafikler yalnızca kullanıcıya kolaylık sağlamak amacıyla tasarlanmıştır.
                </p>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  2. Verilerin Doğruluğu ve Sorumluluk Reddi
                </h3>
                <p>
                  Finans Terminal, platformda sunulan verilerin doğruluğu, güncelliği veya eksiksizliği konusunda azami özeni göstermekle birlikte; piyasa koşulları, internet kesintileri, üçüncü taraf kaynak kaynaklı veri gecikmeleri veya teknik arızalar nedeniyle oluşabilecek hatalardan, eksikliklerden veya gecikmelerden sorumlu tutulamaz. Sitedeki verilere dayanılarak yapılan alım, satım veya yatırım kararlarının tüm sorumluluğu kullanıcıya aittir.
                </p>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  3. Fikri Mülkiyet ve Adil Kullanım
                </h3>
                <p>
                  Sitede yer alan tasarım, arayüz, kod yapısı, marka logoları, metinler ve derlenmiş veriler Finans Terminal'e aittir veya lisanslıdır. Sitenin içeriği; kaynak gösterilmeksizin, ticari amaçlarla toplu olarak kopyalanamaz, otomatik botlarla çekilemez (scraping) veya yeniden dağıtılamaz.
                </p>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  4. Dış Bağlantılar (External Links)
                </h3>
                <p>
                  Sitemizde ekonomi haberleri, resmi kurumlar veya üçüncü taraf web sitelerine yönlendiren bağlantılar bulunabilir. Finans Terminal, bu harici web sitelerinin içeriği, gizlilik uygulamaları veya güvenliğinden sorumlu değildir.
                </p>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  5. Şartlarda Değişiklik Hakkı
                </h3>
                <p>
                  Finans Terminal, kullanım şartlarını ve sitede sunulan hizmetleri dilediği zaman önceden haber vermeksizin güncelleme hakkını saklı tutar.
                </p>
              </div>
            </div>
          )}

          {/* 4. ÇEREZ POLİTİKASI */}
          {activeDoc === 'cookies' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Çerez Yönetimi & Tercihler Kılavuzu
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Çerez Politikası (Cookie Policy)
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-medium">Son Güncelleme: 14 Ağustos 2026</p>
              </div>

              <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4 font-normal">
                <p>
                  Finans Terminal olarak, web sitemizi ziyaret ettiğinizde deneyiminizi geliştirmek, tercihlerinizi (koyu/açık tema modu, favori varlıklar, kurulan alarmlar) hatırlamak ve Google AdSense gibi reklam ortaklarımız aracılığıyla ilgi alanlarınıza uygun içerik ve reklamlar sunmak amacıyla çerezler (cookies) kullanmaktayız.
                </p>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  1. Çerez Nedir?
                </h3>
                <p>
                  Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza (bilgisayar, akıllı telefon, tablet) kaydedilen küçük metin dosyalarıdır. Çerezler web sitesinin düzgün çalışmasını, kullanıcı tercihlerinin korunmasını ve analitik verilerin elde edilmesini sağlar.
                </p>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  2. Sitemizde Kullanılan Çerez Türleri
                </h3>
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                    <strong className="text-slate-900 dark:text-white block text-xs sm:text-sm">a) Zorunlu & İşlevsel Çerezler:</strong>
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      Sitenin temel işlevlerini yerine getirmesi, seçtiğiniz tema modunun (koyu/açık) ve favori varlık listenizin tarayıcınızda yerel olarak saklanması için zorunludur.
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                    <strong className="text-slate-900 dark:text-white block text-xs sm:text-sm">b) Analitik & Performans Çerezleri:</strong>
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      Ziyaretçi sayıları, en çok okunan haber kategorileri ve sayfa yüklenme süreleri gibi anonim istatistikleri toplayarak sitemizi geliştirmemize yardımcı olur.
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                    <strong className="text-slate-900 dark:text-white block text-xs sm:text-sm">c) Hedefleme ve Reklam Çerezleri (Google AdSense):</strong>
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      Google ve yetkili reklam ortakları tarafından, web sitemizi ve internetteki diğer siteleri ziyaretlerinize göre ilgi alanlarınıza uygun kişiselleştirilmiş reklamlar göstermek için kullanılır.
                    </span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-5">
                  3. Çerezleri Nasıl Devre Dışı Bırakabilirsiniz?
                </h3>
                <p>
                  Tarayıcınızın ayarlarından çerezlerin kullanımını dilediğiniz an sınırlandırabilir, engelleyebilir veya mevcut çerezleri silebilirsiniz. Google reklam çerezlerini yönetmek için <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="underline font-bold text-blue-600 dark:text-blue-400">Google Ads Settings</a> sayfasını kullanabilirsiniz. Çerezleri tamamen devre dışı bırakmanız durumunda sitemizin bazı işlevleri (tema hatırlama, favoriler vb.) beklenen şekilde çalışmayabilir.
                </p>
              </div>
            </div>
          )}

          {/* 5. SPK YASAL UYARISI (YTD) */}
          {activeDoc === 'disclaimer' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  SPK Mevzuatı Uyarınca Zorunlu Yasal Bildirim
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Yasal Uyarı & Sorumluluk Reddi (YTD)
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-medium">Sermaye Piyasası Kurulu (SPK) Bildirimi</p>
              </div>

              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200 space-y-2">
                <div className="flex items-center gap-2 font-black text-sm">
                  <AlertCircle size={18} className="text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>YATIRIM TAVSİYESİ DEĞİLDİR (YTD)</span>
                </div>
                <p className="text-xs leading-relaxed font-medium">
                  Burada yer alan yatırım bilgi, yorum ve tavsiyeleri <strong>yatırım danışmanlığı kapsamında değildir</strong>.
                </p>
              </div>

              <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm space-y-4 font-normal">
                <p>
                  Yatırım danışmanlığı hizmeti; aracı kurumlar, portföy yönetim şirketleri, mevduat kabul etmeyen bankalar ile müşteri arasında imzalanacak yatırım danışmanlığı sözleşmesi çerçevesinde sunulmaktadır.
                </p>
                <p>
                  Finans Terminal platformunda yer alan fiyatlar, yüzdelik değişimler, grafik analizleri, hesaplama araçları, yapay zeka özetleri ve ekonomi haberleri yalnızca genel nitelikte olup, herhangi bir yatırım aracının alım veya satım önerisi ya da getiri vaadi olarak yorumlanamaz.
                </p>
                <p>
                  Bu görüşler mali durumunuz ile risk ve getiri tercihlerinize uygun olmayabilir. Bu nedenle, sadece burada yer alan bilgilere dayanılarak yatırım kararı verilmesi beklentilerinize uygun sonuçlar doğurmayabilir. Doğabilecek doğrudan veya dolaylı maddi/manevi zararlardan Finans Terminal ve yöneticileri hiçbir şekilde sorumlu tutulamaz.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* SAĞ PANEL: HIZLI İLETİŞİM & BELGE ÖZETİ */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* İletişim Kartı */}
          <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
              <Mail size={13} />
              <span>Resmi İletişim & Yazışma</span>
            </div>
            <div className="text-xs sm:text-sm font-mono font-black text-slate-900 dark:text-white break-all mb-2">
              finansterminaltr@gmail.com
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Yasal bildirimler, veri düzeltme talepleri, AdSense uyumluluk soruları ve iş ortaklıkları için doğrudan bize ulaşabilirsiniz.
            </p>
            <div className="flex gap-2">
              <a
                href="mailto:finansterminaltr@gmail.com?subject=Finans%20Terminal%20Kurumsal%20Bildirim"
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition text-center shadow-sm cursor-pointer"
              >
                E-Posta Gönder
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

          {/* AdSense Uyumluluk Rozeti */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-emerald-950/30 rounded-3xl p-6 border border-emerald-200 dark:border-emerald-900/50 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-black text-xs">
              <ShieldCheck size={16} />
              <span>AdSense ve Yayın Standartları</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Platformumuz Google Yayıncı Politikaları, çerez yönergeleri ve kullanıcı gizliliği kurallarına tam uyumlu olarak tasarlanmıştır.
            </p>
            <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-900/40 text-[10px] font-mono text-emerald-800 dark:text-emerald-300 flex justify-between items-center">
              <span>Sürüm: v1.12</span>
              <span>Durum: Doğrulandı</span>
            </div>
          </div>

          {/* Hızlı Menü */}
          <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              Tüm Yasal Sayfalar
            </div>
            {[
              { id: 'about', label: 'Hakkımızda', icon: Building },
              { id: 'privacy', label: 'Gizlilik Politikası (Privacy)', icon: Lock },
              { id: 'terms', label: 'Kullanım Şartları (Terms)', icon: FileText },
              { id: 'cookies', label: 'Çerez Politikası (Cookies)', icon: Cookie },
              { id: 'disclaimer', label: 'SPK Yasal Uyarısı (YTD)', icon: Scale },
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveDoc(item.id as LegalDocType)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                    activeDoc === item.id
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-black border border-blue-200 dark:border-blue-800/60'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComp size={14} className={activeDoc === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={13} className="text-slate-400" />
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};
