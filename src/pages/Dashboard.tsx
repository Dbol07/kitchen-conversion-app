import React, { useEffect, useMemo, useState } from "react";
import DecorativeFrame from "../components/DecorativeFrame";
import FloralDivider from "../components/FloralDivider";

import BgMain from "../assets/backgrounds/bg-main.jpg";
import DashboardIcon from "../assets/icons/sections/sec-dashboard.png";

import IconCalc from "../assets/icons/nav/nav-calculator.png";
import IconGuide from "../assets/icons/nav/nav-guide.png";
import IconPrint from "../assets/icons/nav/nav-printables.png";
import IconFAQ from "../assets/icons/nav/nav-faq.png";

import { Link } from "react-router-dom";

type ToolId = "calculator" | "guide" | "printables" | "faq";

const favoriteToolsConfig: { id: ToolId; label: string; icon: string; path: string }[] = [
  { id: "calculator", label: "Calculator", icon: IconCalc, path: "/calculator" },
  { id: "guide", label: "Guide", icon: IconGuide, path: "/guide" },
  { id: "printables", label: "Printables", icon: IconPrint, path: "/printables" },
  { id: "faq", label: "FAQ", icon: IconFAQ, path: "/faq" },
];

const LOCAL_THEME_KEY = "tk_theme";
const LOCAL_FAVORITES_KEY = "tk_favorites";

export default function Dashboard() {
  // THEME TOGGLE (light/dark)
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(LOCAL_THEME_KEY);
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem(LOCAL_THEME_KEY, "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem(LOCAL_THEME_KEY, "light");
    }
  }, [isDark]);

  // FAVORITES (local-only for now)
  const [favorites, setFavorites] = useState<ToolId[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(LOCAL_FAVORITES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ToolId[];
        setFavorites(parsed);
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const toggleFavorite = (id: ToolId) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((t) => t !== id) : [...prev, id];
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(next));
      }
      return next;
    });
  };

  // RECIPE INSPIRATION
  const recipes = useMemo(
    () => [
      {
        title: "Cinnamon Swirl Coffee Cake",
        description: "Perfect with a cozy mug of tea — use the Converter to halve or double it.",
      },
      {
        title: "Herbed Buttermilk Biscuits",
        description: "Great for testing your oven temp conversions and butter measurements.",
      },
      {
        title: "One-Bowl Brownies",
        description: "Experiment with metric vs US cups using the weight conversions.",
      },
      {
        title: "Creamy Mushroom Pasta",
        description: "Use the liquid conversions to adjust cream and stock measurements.",
      },
    ],
    []
  );

  const featuredRecipe = useMemo(() => {
    const idx = Math.floor(Math.random() * recipes.length);
    return recipes[idx];
  }, [recipes]);

  return (
    <div
      className="min-h-screen pb-28 page-transition page-bg"
      style={{ backgroundImage: `url(${BgMain})` }}
    >
      <div className="bg-[#1b302c]/30 min-h-screen px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* HEADER */}
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img
                src={DashboardIcon}
                alt="Dashboard"
                className="w-10 h-10 rounded-xl shadow-md"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                  The Conversion Kitchen
                </h1>
                <p className="text-white/80 text-sm md:text-base">
                  Your cozy hub for all things kitchen math
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsDark((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#faf6f0]/80 text-[#1b302c] shadow-md hover:bg-[#b8d3d5]/80 transition-all"
            >
              <span className="text-xs font-semibold">
                {isDark ? "Dark mode" : "Light mode"}
              </span>
              <span>{isDark ? "🌙" : "☀️"}</span>
            </button>
          </header>

          {/* QUICK TOOLS */}
          <FloralDivider variant="vine" />

          <DecorativeFrame className="mt-4">
            <div className="parchment-card p-5">
              <h2 className="text-xl font-bold text-[#1b302c] mb-3 text-center">
                Quick Tools
              </h2>
              <p className="text-[#5f3c43] text-sm text-center mb-4">
                Jump straight into the tool you need right now.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link
                  to="/calculator"
                  className="flex flex-col items-center bg-[#b8d3d5]/20 hover:bg-[#b8d3d5]/40 p-3 rounded-xl transition-all shadow-md"
                >
                  <img src={IconCalc} className="w-8 h-8 mb-1" alt="Calculator" />
                  <span className="text-sm font-semibold text-[#1b302c]">
                    Calculator
                  </span>
                </Link>

                <Link
                  to="/guide"
                  className="flex flex-col items-center bg-[#b8d3d5]/20 hover:bg-[#b8d3d5]/40 p-3 rounded-xl transition-all shadow-md"
                >
                  <img src={IconGuide} className="w-8 h-8 mb-1" alt="Guide" />
                  <span className="text-sm font-semibold text-[#1b302c]">Guide</span>
                </Link>

                <Link
                  to="/printables"
                  className="flex flex-col items-center bg-[#b8d3d5]/20 hover:bg-[#b8d3d5]/40 p-3 rounded-xl transition-all shadow-md"
                >
                  <img src={IconPrint} className="w-8 h-8 mb-1" alt="Printables" />
                  <span className="text-sm font-semibold text-[#1b302c]">
                    Printables
                  </span>
                </Link>

                <Link
                  to="/faq"
                  className="flex flex-col items-center bg-[#b8d3d5]/20 hover:bg-[#b8d3d5]/40 p-3 rounded-xl transition-all shadow-md"
                >
                  <img src={IconFAQ} className="w-8 h-8 mb-1" alt="FAQ" />
                  <span className="text-sm font-semibold text-[#1b302c]">FAQ</span>
                </Link>
              </div>
            </div>
          </DecorativeFrame>

          {/* FAVORITES SECTION */}
          <FloralDivider variant="mushroom" />

          <DecorativeFrame className="mt-4">
            <div className="parchment-card p-5">
              <h2 className="text-xl font-bold text-[#1b302c] mb-2">
                Favorite Tools
              </h2>
              <p className="text-[#5f3c43] text-sm mb-4">
                Tap the hearts to pin your go-to tools. These are saved on this
                device for now.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {favoriteToolsConfig.map((tool) => {
                  const isFav = favorites.includes(tool.id);
                  return (
                    <button
                      key={tool.id}
                      onClick={() => toggleFavorite(tool.id)}
                      className={`relative flex flex-col items-center p-3 rounded-xl border-2 ${
                        isFav
                          ? "border-[#a77a72] bg-[#b8d3d5]/30"
                          : "border-[#b8d3d5] bg-[#faf6f0]"
                      } shadow-sm hover:shadow-md transition-all`}
                    >
                      <span
                        className={`absolute top-2 right-2 text-lg ${
                          isFav ? "text-[#a77a72]" : "text-[#b8d3d5]"
                        }`}
                      >
                        {isFav ? "♥" : "♡"}
                      </span>
                      <img
                        src={tool.icon}
                        alt={tool.label}
                        className="w-8 h-8 mb-1"
                      />
                      <span className="text-sm font-semibold text-[#1b302c]">
                        {tool.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </DecorativeFrame>

          {/* RECENT CONVERSIONS (placeholder) */}
          <FloralDivider variant="vine" />

          <DecorativeFrame className="mt-4">
            <div className="parchment-card p-5">
              <h2 className="text-xl font-bold text-[#1b302c] mb-2">
                Recent Conversions
              </h2>
              <p className="text-[#5f3c43] text-sm mb-3">
                Soon this will show your latest conversions from the Calculator.
              </p>

              <ul className="space-y-2 text-sm text-[#1b302c]">
                <li className="italic text-[#5f3c43]">
                  No saved history yet — try a few conversions and we’ll hook this
                  up next.
                </li>
              </ul>
            </div>
          </DecorativeFrame>

          {/* RECIPE INSPIRATION */}
          <FloralDivider variant="mushroom" />

          <DecorativeFrame className="mt-4 mb-10">
            <div className="parchment-card p-5">
              <h2 className="text-xl font-bold text-[#1b302c] mb-2">
                Cozy Recipe Inspiration
              </h2>
              <p className="text-[#5f3c43] text-sm mb-3">
                A little nudge for your next kitchen adventure.
              </p>

              <div className="bg-[#b8d3d5]/40 p-4 rounded-xl shadow-inner">
                <h3 className="text-lg font-semibold text-[#1b302c] mb-1">
                  {featuredRecipe.title}
                </h3>
                <p className="text-[#5f3c43] text-sm">
                  {featuredRecipe.description}
                </p>
              </div>
            </div>
          </DecorativeFrame>
        </div>
      </div>
    </div>
  );
}
