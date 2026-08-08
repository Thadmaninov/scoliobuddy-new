import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';

const LANGUAGE_KEY = '@scoliobuddy_language';

export interface AppLanguage {
  code: string;
  /** Endonym — always shown in its own script, never translated. */
  label: string;
  abbr: string;
  /** BCP 47 tag used for date / number formatting. */
  locale: string;
  rtl?: boolean;
}

export const AVAILABLE_LANGUAGES: AppLanguage[] = [
  { code: 'en', label: 'English',   abbr: 'EN', locale: 'en-US' },
  { code: 'zh', label: '中文',       abbr: 'ZH', locale: 'zh-CN' },
  { code: 'th', label: 'ไทย',        abbr: 'TH', locale: 'th-TH' },
  { code: 'ja', label: '日本語',      abbr: 'JA', locale: 'ja-JP' },
  { code: 'ar', label: 'العربية',    abbr: 'AR', locale: 'ar-EG', rtl: true },
  { code: 'es', label: 'Español',    abbr: 'ES', locale: 'es-ES' },
  { code: 'fr', label: 'Français',   abbr: 'FR', locale: 'fr-FR' },
];

type TranslateOptions = Record<string, string | number>;

interface LanguageContextType {
  language: string;
  currentLanguage: string;
  /** BCP 47 tag for the active language — pass to toLocaleDateString etc. */
  locale: string;
  isLoading: boolean;
  changeLanguage: (languageCode: string) => Promise<void>;
  availableLanguages: AppLanguage[];
  t: (key: string, options?: TranslateOptions) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (saved && AVAILABLE_LANGUAGES.some((l) => l.code === saved)) {
          await i18n.changeLanguage(saved);
          setCurrentLanguage(saved);
        }
      } catch (error) {
        console.error('Error loading language:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = useCallback(async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode);
      await AsyncStorage.setItem(LANGUAGE_KEY, languageCode);
      const meta = AVAILABLE_LANGUAGES.find((l) => l.code === languageCode);
      I18nManager.allowRTL(!!meta?.rtl);
      setCurrentLanguage(languageCode);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }, []);

  // Rebuilt on every language change so that *every* consumer re-renders and
  // re-runs t() — no stale strings left behind on the screen.
  const value = useMemo<LanguageContextType>(() => {
    const meta = AVAILABLE_LANGUAGES.find((l) => l.code === currentLanguage);
    return {
      language: currentLanguage,
      currentLanguage,
      locale: meta?.locale ?? 'en-US',
      isLoading,
      changeLanguage,
      availableLanguages: AVAILABLE_LANGUAGES,
      t: (key: string, options?: TranslateOptions) => i18n.t(key, options) as string,
    };
  }, [currentLanguage, isLoading, changeLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
