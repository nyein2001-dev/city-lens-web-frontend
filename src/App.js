import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider, useTranslation } from "react-i18next";
import RouteListComponent from "./components/RouteListComponent";
import ItemForm from "./components/ItemForm";
import { ThemeProvider } from "./provider/ThemeProvider";
import { LanguageProvider } from "./provider/LanguageProvider";

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale) {
      i18n.changeLanguage(storedLocale);
    }
  }, [i18n]);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <I18nextProvider i18n={i18n}>
          <Router>
            <div className="bg-gray-100 dark:bg-night-900 container mx-auto max-w-6xl py-4">
              <div className="gap-5 sm:grid lg:grid-cols-4 ">
                <div className="space-y-5">
                  <RouteListComponent />
                </div>
                <div className="mt-4 space-y-5 sm:mt-0 lg:col-span-2">
                  <ItemForm />
                </div>
                <div className="mt-4 space-y-5 sm:mt-0">
                  <RouteListComponent />
                </div>
              </div>
            </div>
          </Router>
        </I18nextProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
