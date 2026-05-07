import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { AppShell } from "@/components/layout/app-shell"

export function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const dir = i18n.language === "fa" ? "rtl" : "ltr"
    document.documentElement.dir = dir
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return <AppShell />
}

export default App
