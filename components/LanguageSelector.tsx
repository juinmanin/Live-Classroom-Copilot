import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';
import { AppLanguage } from '../types';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  disabled?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  disabled
}) => {
  return (
    <div className="flex items-center space-x-2 bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-700">
      <Globe className="w-4 h-4 text-slate-400" />
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as AppLanguage)}
        disabled={disabled}
        className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer disabled:opacity-50"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.value} className="bg-slate-800 text-white">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
