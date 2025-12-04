import React from "react";
import { NavLink } from "react-router-dom";

import HomeIcon from "../assets/icons/nav/nav-home.png";
import CalculatorIcon from "../assets/icons/nav/nav-calculator.png";
import GuideIcon from "../assets/icons/nav/nav-guide.png";
import PrintablesIcon from "../assets/icons/nav/nav-printables.png";
import FAQIcon from "../assets/icons/nav/nav-faq.png";
import AboutIcon from "../assets/icons/nav/nav-about.png";

export default function BottomNav() {
  const navItems = [
    { id: "home", label: "Home", path: "/", icon: HomeIcon },
    { id: "guide", label: "Guide", path: "/guide", icon: GuideIcon },
    { id: "calculator", label: "Calc", path: "/calculator", icon: CalculatorIcon },
    { id: "printables", label: "Print", path: "/printables", icon: PrintablesIcon },
    { id: "faq", label: "FAQ", path: "/faq", icon: FAQIcon },
    { id: "about", label: "About", path: "/about", icon: AboutIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-[#faf6f0] border-t-2 border-[#a77a72] shadow-[0_-4px_20px_rgba(95,60,67,0.15)] rounded-t-3xl mx-2 mb-0">
        <div className="flex justify-around items-center py-2 max-w-lg mx-auto">
          {navItems.map(({ id, label, path, icon }) => (
            <NavLink
              key={id}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "scale-110 bg-[#b8d3d5]/30"
                    : "hover:bg-[#b8d3d5]/20"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={icon}
                    alt={label}
                    className={`w-6 h-6 transition-all ${
                      isActive ? "opacity-100" : "opacity-70"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      isActive ? "text-[#3c6150]" : "text-[#5f3c43]"
                    }`}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
