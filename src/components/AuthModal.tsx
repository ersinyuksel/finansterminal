import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { getAuthErrorMessage, createLocalAccount } from '../authHelper';
import { X, Mail, Lock, User as UserIcon, LogIn, UserPlus, AlertCircle, CheckCircle2, Zap } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [errorInfo, setErrorInfo] = useState<{ title?: string; message: string; canFallbackToLocal?: boolean } | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setErrorInfo(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error('Google sign in error:', err);
      const parsed = getAuthErrorMessage(err);
      setErrorInfo(parsed);
    } finally {
      setLoading(false);
    }
  };

  const handleInstantLocalAuth = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const targetEmail = email.trim() || 'kullanici@finansterminal.com';
    const targetName = displayName.trim() || targetEmail.split('@')[0] || 'Kullanıcı';
    createLocalAccount(targetEmail, targetName);
    onSuccess?.();
    onClose();
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorInfo(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || (!isForgotPassword && !password.trim())) {
      setErrorInfo({ message: 'Lütfen tüm zorunlu alanları doldurunuz.' });
      return;
    }

    setLoading(true);

    try {
      if (isForgotPassword) {
        await sendPasswordResetEmail(auth, cleanEmail);
        setSuccessMsg('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
        setLoading(false);
        return;
      }

      if (isLogin) {
        // Sign In
        try {
          await signInWithEmailAndPassword(auth, cleanEmail, password);
          onSuccess?.();
          onClose();
        } catch (firebaseErr: any) {
          console.warn('Firebase signIn error:', firebaseErr);
          const parsed = getAuthErrorMessage(firebaseErr);
          setErrorInfo(parsed);
        }
      } else {
        // Sign Up
        if (password.length < 6) {
          setErrorInfo({ message: 'Şifreniz en az 6 karakter uzunluğunda olmalıdır.' });
          setLoading(false);
          return;
        }

        try {
          const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
          if (displayName.trim() && userCredential.user) {
            await updateProfile(userCredential.user, {
              displayName: displayName.trim()
            });
          }
          onSuccess?.();
          onClose();
        } catch (firebaseErr: any) {
          console.warn('Firebase signUp error:', firebaseErr);
          const parsed = getAuthErrorMessage(firebaseErr);
          setErrorInfo(parsed);
        }
      }
    } catch (err: any) {
      console.error('Unexpected Auth error:', err);
      const parsed = getAuthErrorMessage(err);
      setErrorInfo(parsed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          aria-label="Kapat"
        >
          <X size={18} />
        </button>

        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 mb-3">
            {isLogin ? <LogIn size={24} /> : <UserPlus size={24} />}
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {isForgotPassword 
              ? 'Şifremi Unuttum' 
              : isLogin 
                ? 'Hesabınıza Giriş Yapın' 
                : 'Yeni Hesap Oluşturun'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Favorileriniz, fiyat alarmlarınız ve tüm piyasa verileri anında erişiminize açılır.
          </p>
        </div>

        {/* ERROR / SUCCESS NOTIFICATIONS */}
        {errorInfo && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs font-medium space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
              <div>
                {errorInfo.title && <div className="font-bold text-rose-800 dark:text-rose-200 mb-0.5">{errorInfo.title}</div>}
                <p className="leading-snug">{errorInfo.message}</p>
              </div>
            </div>
            {errorInfo.canFallbackToLocal && (
              <button
                type="button"
                onClick={handleInstantLocalAuth}
                className="w-full mt-2 py-2 px-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
              >
                <Zap size={13} />
                <span>Tek Tıkla Hızlı Giriş Yap (Kayıtsız Başla)</span>
              </button>
            )}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* GOOGLE SIGN IN BUTTON */}
        {!isForgotPassword && (
          <div className="space-y-3 mb-5">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition shadow-xs disabled:opacity-60 cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Google ile Devam Et</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
              <span className="bg-white dark:bg-slate-900 px-3 text-[10px] uppercase font-bold text-slate-400">
                veya e-posta ile
              </span>
              <div className="border-t border-slate-200 dark:border-slate-800 w-full"></div>
            </div>
          </div>
        )}

        {/* EMAIL & PASSWORD FORM */}
        <form onSubmit={handleEmailAuth} className="space-y-3.5">
          {!isLogin && !isForgotPassword && (
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Ad Soyad / Takma Ad
              </label>
              <div className="relative">
                <UserIcon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ersin Yüksel"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
              E-posta Adresi
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="ornek@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {!isForgotPassword && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                  Şifre
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setErrorInfo(null);
                      setSuccessMsg(null);
                    }}
                    className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Şifremi Unuttum?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition shadow-md shadow-blue-500/25 disabled:opacity-60 cursor-pointer mt-2"
          >
            {loading 
              ? 'Lütfen Bekleyin...' 
              : isForgotPassword 
                ? 'Sıfırlama Bağlantısı Gönder' 
                : isLogin 
                  ? 'Giriş Yap' 
                  : 'Kayıt Ol ve Başla'}
          </button>
        </form>

        {/* TOGGLE LOGIN / REGISTER & QUICK GUEST ACCESS */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="text-center text-xs text-slate-500 dark:text-slate-400">
            {isForgotPassword ? (
              <button
                onClick={() => {
                  setIsForgotPassword(false);
                  setIsLogin(true);
                  setErrorInfo(null);
                  setSuccessMsg(null);
                }}
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
              >
                Giriş ekranına dön
              </button>
            ) : isLogin ? (
              <span>
                Hesabınız yok mu?{' '}
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setErrorInfo(null);
                    setSuccessMsg(null);
                  }}
                  className="text-blue-600 dark:text-blue-400 font-bold hover:underline ml-1 cursor-pointer"
                >
                  Hemen Kaydolun
                </button>
              </span>
            ) : (
              <span>
                Zaten hesabınız var mı?{' '}
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setErrorInfo(null);
                    setSuccessMsg(null);
                  }}
                  className="text-blue-600 dark:text-blue-400 font-bold hover:underline ml-1 cursor-pointer"
                >
                  Giriş Yapın
                </button>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleInstantLocalAuth}
            className="w-full py-2 px-3 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Zap size={13} className="text-amber-500" />
            <span>Hızlı Oturum Aç (Tek Tıkla Hemen Başla)</span>
          </button>
        </div>

      </div>
    </div>
  );
};

