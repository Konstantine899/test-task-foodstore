// src/shared/ui/LanguageToggle/LanguageToggle.tsx
import React, { memo, useCallback, useState, useEffect, useRef } from 'react';
import { classNames } from '@/shared/lib';
import { useTranslation } from '@/shared/lib/hooks/useTranslation';
import * as styles from './LanguageToggle.module.scss';

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle = memo<LanguageToggleProps>(({ className }) => {
  const { changeLanguage, currentLanguage, ready } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!ready) {
    return <div>Loading...</div>;
  }

  // Закрытие выпадающего списка при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = useCallback((lng: string) => {
    changeLanguage(lng);
    setIsOpen(false);
  }, [changeLanguage]);

  const languages = [
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'kz', label: 'KZ', flag: '🇰🇿' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div ref={dropdownRef} className={classNames(styles.languageToggle, {}, [className])}>
      <button
        className={styles.currentButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.label}>{currentLang.label}</span>
        <span className={classNames(styles.arrow, { [styles.open]: isOpen })}>▼</span>
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={classNames(styles.option, { 
                [styles.active]: currentLanguage === lang.code 
              })}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className={styles.flag}>{lang.flag}</span>
              <span className={styles.label}>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

LanguageToggle.displayName = 'LanguageToggle';