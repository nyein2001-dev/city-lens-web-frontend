import React, { createContext, useContext, useState, useEffect } from "react";
import myMM from "../assets/json/language.mm.json";
import enUS from "../assets/json/language.en.json";

const LanguageContext = createContext();

const languages = [
  { code: "en-US", data: enUS },
  { code: "pt-BR", data: myMM },
];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(languages[0].data);

  const loadLanguage = () => {
    if ("locale" in localStorage) {
      const selected = languages.find(
        (lang) => lang.code === localStorage.locale
      )?.data;
      if (selected) setLanguage(selected);
    }
  };

  useEffect(() => {
    loadLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, loadLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageStore() {
  return useContext(LanguageContext);
}