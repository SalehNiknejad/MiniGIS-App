import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === "fa" ? "en" : "fa"
    i18n.changeLanguage(newLang)
    document.documentElement.dir = newLang === "fa" ? "rtl" : "ltr"
    document.documentElement.lang = newLang
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage}>
      {i18n.language === "fa" ? "EN" : "FA"}
    </Button>
  )
}
