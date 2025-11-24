"use client";

import Link from "next/link";
import { MenuIcon, GlobeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations, useLocale } from "next-intl";
import { setLocale } from "@/app/locale-actions";
import { useRouter } from "next/navigation";

export function Topbar() {
  const t = useTranslations("Topbar");
  const locale = useLocale();
  const router = useRouter();

  const handleLocaleChange = async (newLocale: string) => {
    await setLocale(newLocale);
    router.refresh();
  };

  return (
    <div className="relative flex justify-center items-center p-4 h-16 border-b bg-white">
      <div className="absolute left-4 lg:left-20 flex items-center">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
            CREDIT 2.0
          </h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex absolute right-4 lg:right-20 items-center gap-2 text-sm text-gray-600">
        <Button
          variant="ghost"
          asChild
          className="text-gray-600 hover:text-blue-900 transition-colors"
        >
          <a href="#">{t("faq")}</a>
        </Button>
        <Button
          variant="ghost"
          asChild
          className="text-gray-600 hover:text-blue-900 transition-colors"
        >
          <a href="#">{t("support")}</a>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-1 hover:text-blue-900 transition-colors text-gray-600"
            >
              <span className="pr-1">{locale.toUpperCase()}</span>
              <GlobeIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleLocaleChange("en")}>
              {t("en")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLocaleChange("ja")}>
              {t("ja")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute right-4 text-gray-600 hover:text-blue-900"
            aria-label="Toggle menu"
          >
            <MenuIcon className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-3/4 sm:max-w-sm">
          <div className="flex flex-col gap-4 mt-8">
            <Button
              variant="ghost"
              asChild
              className="justify-start text-sm text-gray-600 hover:text-blue-900 transition-colors"
            >
              <a href="#">{t("faq")}</a>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="justify-start text-sm text-gray-600 hover:text-blue-900 transition-colors"
            >
              <a href="#">{t("support")}</a>
            </Button>
            <div className="pt-4 border-t">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-900 transition-colors"
                  >
                    <span>{locale.toUpperCase()}</span>
                    <GlobeIcon className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleLocaleChange("en")}>
                    {t("en")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLocaleChange("ja")}>
                    {t("ja")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
