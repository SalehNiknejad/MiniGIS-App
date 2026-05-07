import { Menu01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { AppSidebar } from "./app-sidebar"
import { useTranslation } from "react-i18next"

export function MobileNav() {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === "fa"

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="size-9">
            <HugeiconsIcon icon={Menu01Icon} size={18} />
          </Button>
        </SheetTrigger>

        <SheetContent
          side={isRTL ? "right" : "left"}
          dir={isRTL ? "rtl" : "ltr"}
          className="w-[300px] p-0"
        >
          <SheetHeader className="border-b border-border px-4 py-4">
            <SheetTitle className="pe-8 text-start">MiniGIS</SheetTitle>
          </SheetHeader>

          <div className="h-[calc(100svh-73px)] overflow-hidden">
            <AppSidebar mobile />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
