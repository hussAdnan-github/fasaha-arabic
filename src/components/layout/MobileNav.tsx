"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "المستويات", href: "/levels", icon: "layers" },
  { title: "المفردات", href: "/", icon: "menu_book" },
  { title: "الأسرة", href: "/family-and-gender", icon: "group" },
  { title: "القواعد", href: "/grammar-ladder", icon: "stairs" },
  { title: "المحادثة", href: "/daily-dialogue", icon: "forum" },
  { title: "التمارين", href: "/interactive-practice", icon: "sports_esports" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-surface-container-lowest/95 backdrop-blur-lg border-t border-surface-container z-50 flex items-center justify-around px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
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
