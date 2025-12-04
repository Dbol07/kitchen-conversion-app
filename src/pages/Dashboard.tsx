import React, { useMemo } from "react";
import DecorativeFrame from "../components/DecorativeFrame";
import FloralDivider from "../components/FloralDivider";

import BgMain from "../assets/backgrounds/bg-main.jpg";
import DashboardIcon from "../assets/icons/sections/sec-dashboard.png";

import IconCalc from "../assets/icons/nav/nav-calculator.png";
import IconGuide from "../assets/icons/nav/nav-guide.png";
import IconPrint from "../assets/icons/nav/nav-printables.png";
import IconRecipes from "../assets/icons/nav/nav-recipes.png"; 
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // ---------------------------------------------------------
  // STATIC RECIPE TEMPLATE PREVIEW (no API usage)
  // ---------------------------------------------------------

  const recipeTemplates = useMemo(
    () => [
      {
        title: "Soft Chocolate Chip Cookies",
        img: "/template-images/cookies.jpg",
        description: "A cozy classic — perfect for testing your ingredient scaler.",
      },
      {
        title: "Simple Vanilla Cake",
        img: "/template-images/cake.jpg",
        description: "Great for learning pan-size conversions.",
      },
      {
        title: "Homemade Country Bread",
        img: "/template-images/bread.jpg",
        description: "Use weight conversions for perfect bakery-style dough.",
      },
    ],
    []
  );

  const featured = recipeTemplates[0]; // show cookies as default

  return (
    <div
      className="min-h-screen pb-28 page-transition page-bg"
      style={{ backgroundImage: `url(${BgMain})` }}
    >
      <div className="bg-[#1b302c]/35 min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* ---------------------------------------------------- */}
          {/* HEADER */}
          {/* ---------------------------------------------------- */}

          <header className="flex flex-col items-center text-center mb-10 mt-4">
            <img
              src={DashboardIcon}
              alt="The Conversion Kitchen"
              className="drop-shadow-lg w-20 h-20 sm:w-24 sm:h-24 mb-3"
            />

            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              The Conversion Kitchen
            </h1>

            <p className="text-white/85 text-sm mt-1">
              Your cozy hub for all things kitchen math.
            </p>
          </header>

          <FloralDivider variant="vine" />

          {/* ---------------------------------------------------- */}
          {/* QUICK TOOLS */}
          {/* ---------------------------------------------------- */}

          <DecorativeFrame className="mt-6">
            <div className="parchment-card p-6">
              <h2 className="text-xl font-bold text-[#1b302c] mb-3 text-center">
                Quick Tools
              </h2>

              <p className="text-[#5f3c43] text-sm text-center mb-5">
                Jump straight into the tool you need.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <Link
                  to="/calculator"
                  className="flex flex-col items-center bg-[#b8d3d5]/20 hover:bg-[#b8d3d5]/40 p-4 rounded-xl transition-all shadow-md"
                >
                  <img src={IconCalc} className="w-10 h-10 mb-2" />
                  <span className="text-sm font-semibold text-[#1b302c]">
                    Calculator
                  </span>
                </Link>

                <Link
                  to="/guide"
                  className="flex flex-col items-center bg-[#b8d3d5]/20 hover:bg-[#b8d3d5]/40 p-4 rounded-xl transition-all shadow-md"
                >
                  <img src={IconGuide} className="w-10 h-10 mb-2" />
                  <span className="text-sm font-semibold text-[#1b302c]">
                    Guide
                  </span>
                </Link>

                <Link
                  to="/printables"
                  className="flex flex-col items-center bg-[#b8d3d5]/20 hover:bg-[#b8d3d5]/40 p-4 rounded-xl transition-all shadow-md"
                >
                  <img src={IconPrint} className="w-10 h-10 mb-2" />
                  <span className="text-sm font-semibold text-[#1b302c]">
                    Printables
                  </span>
                </Link>

                <Link
                  to="/recipes"
                  className="flex flex-col items-center bg-[#b8d3d5]/20 hover:bg-[#b8d3d5]/40 p-4 rounded-xl transition-all shadow-md"
                >
                  <img src={IconRecipes} className="w-10 h-10 mb-2" />
                  <span className="text-sm font-semibold text-[#1b302c]">
                    Recipes
                  </span>
                </Link>

              </div>
            </div>
          </DecorativeFrame>

          <FloralDivider variant="mushroom" />

          {/* ---------------------------------------------------- */}
          {/* STATIC RECIPE TEMPLATE PREVIEW */}
          {/* ---------------------------------------------------- */}

          <DecorativeFrame className="mt-6 mb-10">
            <div
              className="parchment-card p-6 cursor-pointer hover:bg-[#b8d3d5]/30 transition-all rounded-xl"
              onClick={() => navigate("/recipes")}
            >
              <h2 className="text-xl font-bold text-[#1b302c] mb-3">
                Cozy Recipe Inspiration
              </h2>

              <p className="text-[#5f3c43] text-sm mb-4">
                These beginner-friendly recipes work perfectly with your Calculator & Scaler.
              </p>

              <div className="bg-[#b8d3d5]/40 p-4 rounded-xl shadow-inner">
                <img
                  src={featured.img}
                  alt={featured.title}
                  className="rounded-xl shadow-md mb-2"
                />

                <h3 className="text-lg font-semibold text-[#1b302c]">
                  {featured.title}
                </h3>

                <p className="text-[#5f3c43] text-sm mt-1">
                  {featured.description}
                </p>
              </div>
            </div>
          </DecorativeFrame>
        </div>
      </div>
    </div>
  );
}
