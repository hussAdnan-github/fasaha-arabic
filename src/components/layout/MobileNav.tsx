"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "الرئيسية", href: "/", icon: "dashboard" },
  { title: "المفردات", href: "/vocabulary", icon: "menu_book" },
  { title: "أسرتي", href: "/family-and-gender", icon: "family_restroom" },
  { title: "مدرستي", href: "/stage-2", icon: "school" },
  { title: "التمارين", href: "/interactive-practice", icon: "sports_esports" },
  { title: "الخارطة", href: "/levels", icon: "layers" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-surface-container-lowest/95 backdrop-blur-lg border-t border-surface-container z-50 flex items-center justify-around px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-lg transition-colors ${
              isActive
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span
              className={`material-symbols-outlined text-2xl transition-transform ${
                isActive ? "scale-110" : ""
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[11px] mt-0.5">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
