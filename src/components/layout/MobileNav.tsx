"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "الرئيسية", href: "/", icon: "dashboard" },
  { title: "المفردات", href: "/vocabulary", icon: "menu_book" },
  { title: "أسرتي", href: "/family-and-gender", icon: "home" },
  { title: "مدرستي", href: "/stage-2", icon: "school" },
  { title: "التمارين", href: "/interactive-practice", icon: "sports_esports" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-surface-container-lowest/95 backdrop-blur-lg border-t border-surface-container z-50 flex items-center justify-around px-2 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || (item.href === "/stage-2" && pathname.startsWith("/stage-2"));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 rounded-xl transition-all ${
              isActive
                ? "text-primary font-bold"
                : "text-on-surface-variant/80 hover:text-on-surface"
            }`}
          >
            <div
              className={`w-9 h-7 flex items-center justify-center rounded-full transition-all ${
                isActive ? "bg-primary/10 text-primary scale-105" : ""
              }`}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
            </div>
            <span className="text-[10px] font-bold mt-0.5 leading-none">
              {item.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
