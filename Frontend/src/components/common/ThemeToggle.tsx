"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check local storage or system preference
    const storedTheme = localStorage.getItem("MedQube-theme") as "light" | "dark" | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("MedQube-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="w-8 h-8 rounded-full bg-cream-deep/60 hover:bg-cream border border-hairline flex items-center justify-center text-ink-soft hover:text-ink cursor-pointer transition-colors relative shrink-0"
      aria-label="Toggle theme"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
    </motion.button>
  );
}

