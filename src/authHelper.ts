import { User as FirebaseUser } from 'firebase/auth';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  isLocal?: boolean;
}

const LOCAL_USER_STORAGE_KEY = 'finans_local_user_session';

export function getLocalUser(): AppUser | null {
  try {
    const raw = localStorage.getItem(LOCAL_USER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.uid === 'string') {
      return parsed;
    }
  } catch (e) {
    console.error('Error reading local user:', e);
  }
  return null;
}

export function saveLocalUser(user: AppUser): void {
  try {
    localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('app-auth-state-change', { detail: user }));
  } catch (e) {
    console.error('Error saving local user:', e);
  }
}

export function clearLocalUser(): void {
  try {
    localStorage.removeItem(LOCAL_USER_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('app-auth-state-change', { detail: null }));
  } catch (e) {
    console.error('Error clearing local user:', e);
  }
}

export function createLocalAccount(email: string, displayName?: string): AppUser {
  const cleanEmail = email.trim();
  const cleanName = displayName?.trim() || cleanEmail.split('@')[0] || 'Kullanıcı';
  const localUser: AppUser = {
    uid: 'usr_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36),
    email: cleanEmail || 'kullanici@finansterminal.com',
    displayName: cleanName,
    photoURL: null,
    isLocal: true,
  };
  saveLocalUser(localUser);
  return localUser;
}

export function getAuthErrorMessage(err: any): { 
  title?: string; 
  message: string; 
  isProviderDisabled?: boolean;
  canFallbackToLocal?: boolean;
} {
  if (!err) {
    return { message: 'Bilinmeyen bir hata oluştu.' };
  }

  const code = typeof err === 'string' ? err : err.code || '';
  const rawMessage = (err.message || String(err)).replace(/Firebase:\s*/gi, '').replace(/\(auth\/[a-z0-9-]+\)\.?/gi, '').trim();

  if (code === 'auth/operation-not-allowed' || code === 'auth/admin-restricted-operation') {
    return {
      title: 'E-Posta Sağlayıcısı Aktif Değil',
      message: 'Firebase projesinde E-posta/Şifre sağlayıcısı henüz aktif edilmemiş. Google ile giriş yapabilir veya tek tıkla Hızlı Hesap ile hemen başlayabilirsiniz.',
      isProviderDisabled: true,
      canFallbackToLocal: true
    };
  }

  if (code === 'auth/unauthorized-domain') {
    return {
      title: 'Yetkili Alan Adı Uyarısı',
      message: 'Bu web adresi Firebase yetkili etki alanları listesine eklenmemiş. Hızlı Hesap ile tüm özellikleri hemen kullanabilirsiniz.',
      isProviderDisabled: true,
      canFallbackToLocal: true
    };
  }

  if (code === 'auth/popup-blocked') {
    return {
      title: 'Açılır Pencere Engellendi',
      message: 'Tarayıcınız Google açılır penceresini engelledi. Lütfen adres çubuğundan pencerelere izin veriniz.',
      canFallbackToLocal: true
    };
  }

  if (code === 'auth/popup-closed-by-user') {
    return {
      message: 'Google ile giriş penceresi tamamlanmadan kapatıldı.'
    };
  }

  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
    return {
      title: 'Giriş Bilgileri Hatalı',
      message: 'Girdiğiniz e-posta adresi veya şifre eşleşmiyor. Lütfen kontrol ediniz.',
      canFallbackToLocal: true
    };
  }

  if (code === 'auth/email-already-in-use') {
    return {
      title: 'E-Posta Zaten Kayıtlı',
      message: 'Bu e-posta adresiyle açılmış bir hesap bulunmaktadır. "Giriş Yap" sekmesine geçerek şifrenizle giriş yapabilirsiniz.'
    };
  }

  if (code === 'auth/invalid-email') {
    return {
      message: 'Lütfen geçerli bir e-posta adresi formatı yazınız (örn: ornek@gmail.com).'
    };
  }

  if (code === 'auth/weak-password') {
    return {
      title: 'Zayıf Şifre',
      message: 'Şifreniz en az 6 karakter olmalıdır. Güvenliğiniz için daha uzun bir şifre seçiniz.'
    };
  }

  if (code === 'auth/too-many-requests') {
    return {
      title: 'Çok Fazla Deneme',
      message: 'Kısa sürede çok fazla başarısız deneme yapıldı. Lütfen 2-3 dakika sonra tekrar deneyiniz.'
    };
  }

  if (code === 'auth/network-request-failed') {
    return {
      title: 'Bağlantı Hatası',
      message: 'Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol ediniz veya Hızlı Giriş ile devam ediniz.',
      canFallbackToLocal: true
    };
  }

  if (code === 'auth/user-disabled') {
    return {
      message: 'Bu kullanıcı hesabı askıya alınmıştır.'
    };
  }

  return {
    message: rawMessage || 'İşlem sırasında bir hata oluştu. Lütfen tekrar deneyiniz.',
    canFallbackToLocal: true
  };
}
