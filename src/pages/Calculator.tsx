import React, { useState } from "react";
import { convert } from "../utils/conversions";
import FloralDivider from "../components/FloralDivider";
import DecorativeFrame from "../components/DecorativeFrame";
import BgCalculator from "../assets/backgrounds/bg-calculator.jpg";

type UnitSystem = "us" | "metric";

type Ingredient = {
  name: string;
  usAmount: number;
  usUnit: string;
  metricAmount: number;
  metricUnit: string;
};

type RecipeTemplate = {
  id: string;
  name: string;
  baseServings: number;
  photo: string; // we’ll use a simple placeholder for now (could be real assets later)
  ingredients: Ingredient[];
};

const TEMPLATES: RecipeTemplate[] = [
  {
    id: "cookies",
    name: "Cozy Cookies",
    baseServings: 24,
    photo: "https://placehold.co/300x180?text=Cookies",
    ingredients: [
      {
        name: "Butter",
        usAmount: 1,
        usUnit: "cup",
        metricAmount: 227,
        metricUnit: "g",
      },
      {
        name: "Sugar",
        usAmount: 1,
        usUnit: "cup",
        metricAmount: 200,
        metricUnit: "g",
      },
      {
        name: "Eggs",
        usAmount: 2,
        usUnit: "large",
        metricAmount: 2,
        metricUnit: "eggs",
      },
      {
        name: "Flour",
        usAmount: 2.25,
        usUnit: "cups",
        metricAmount: 270,
        metricUnit: "g",
      },
      {
        name: "Baking Soda",
        usAmount: 1,
        usUnit: "tsp",
        metricAmount: 5,
        metricUnit: "g",
      },
      {
        name: "Vanilla",
        usAmount: 1,
        usUnit: "tsp",
        metricAmount: 5,
        metricUnit: "ml",
      },
    ],
  },
  {
    id: "cake",
    name: "Soft Vanilla Cake",
    baseServings: 12,
    photo: "https://placehold.co/300x180?text=Cake",
    ingredients: [
      {
        name: "Flour",
        usAmount: 2,
        usUnit: "cups",
        metricAmount: 240,
        metricUnit: "g",
      },
      {
        name: "Sugar",
        usAmount: 1.5,
        usUnit: "cups",
        metricAmount: 300,
        metricUnit: "g",
      },
      {
        name: "Butter",
        usAmount: 0.5,
        usUnit: "cup",
        metricAmount: 113,
        metricUnit: "g",
      },
      {
        name: "Eggs",
        usAmount: 2,
        usUnit: "large",
        metricAmount: 2,
        metricUnit: "eggs",
      },
      {
        name: "Milk",
        usAmount: 1,
        usUnit: "cup",
        metricAmount: 240,
        metricUnit: "ml",
      },
    ],
  },
  {
    id: "bread",
    name: "Everyday Bread",
    baseServings: 12,
    photo: "https://placehold.co/300x180?text=Bread",
    ingredients: [
      {
        name: "Flour",
        usAmount: 3,
        usUnit: "cups",
        metricAmount: 360,
        metricUnit: "g",
      },
      {
        name: "Warm Water",
        usAmount: 1,
        usUnit: "cup",
        metricAmount: 240,
        metricUnit: "ml",
      },
      {
        name: "Sugar",
        usAmount: 2,
        usUnit: "tbsp",
        metricAmount: 25,
        metricUnit: "g",
      },
      {
        name: "Oil",
        usAmount: 2,
        usUnit: "tbsp",
        metricAmount: 30,
        metricUnit: "ml",
      },
      {
        name: "Yeast",
        usAmount: 1,
        usUnit: "tbsp",
        metricAmount: 9,
        metricUnit: "g",
      },
    ],
  },
];

const INGREDIENT_WEIGHTS: { [key: string]: number } = {
  flour: 120, // g per cup
  sugar: 200, // g per cup
  butter: 227, // g per cup
};

export default function Calculator() {
  // -----------------------------
  // UNIT CONVERTER STATE
  // -----------------------------
  const [category, setCategory] = useState("volume");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("cup");
  const [toUnit, setToUnit] = useState("ml");
  const [result, setResult] = useState("");
  const [showToast, setShowToast] = useState(false);

  const units = {
    volume: ["tsp", "tbsp", "fl oz", "cup", "pint", "quart", "gallon", "ml", "liter"],
    weight: ["oz", "lb", "g", "kg"],
    temperature: ["F", "C", "K"],
  };

  const handleConvert = (val: string) => {
    setValue(val);
    if (val && !isNaN(Number(val))) {
      const converted = convert(Number(val), fromUnit, toUnit, category);
      setResult(converted.toFixed(2));
    } else {
      setResult("");
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (value) {
      const converted = convert(Number(value), toUnit, temp, category);
      setResult(converted.toFixed(2));
    }
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  // -----------------------------
  // RECIPE SCALER & TEMPLATES
  // -----------------------------
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("us");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("cookies");
  const [origServings, setOrigServings] = useState("");
  const [newServings, setNewServings] = useState("");

  const selectedTemplate = TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

  const baseServings = selectedTemplate.baseServings;
  const actualOrigServings = origServings || String(baseServings);

  const scaleFactor =
    actualOrigServings && newServings
      ? Number(newServings) / Number(actualOrigServings)
      : null;

  const buildScaledRecipeMarkdown = () => {
    if (!scaleFactor) return "";

    const header = `### ${selectedTemplate.name} (scaled)\n\nServings: ${newServings} (base ${actualOrigServings})\n\nIngredients:\n`;

    const lines = selectedTemplate.ingredients.map((ing) => {
      const baseAmount = unitSystem === "us" ? ing.usAmount : ing.metricAmount;
      const unit = unitSystem === "us" ? ing.usUnit : ing.metricUnit;
      const scaled = baseAmount * scaleFactor;
      const rounded = Math.round(scaled * 100) / 100;
      return `- **${rounded} ${unit}** ${ing.name}`;
    });

    return `${header}${lines.join("\n")}\n`;
  };

  const handleCopyScaledRecipe = () => {
    if (!scaleFactor) return;
    const md = buildScaledRecipeMarkdown();
    if (md) {
      navigator.clipboard.writeText(md);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  // -----------------------------
  // INGREDIENT WEIGHT HELPER
  // -----------------------------
  const [weightIngredient, setWeightIngredient] = useState("flour");
  const [weightCups, setWeightCups] = useState("");

  const computedGrams =
    weightCups && !isNaN(Number(weightCups))
      ? Number(weightCups) * INGREDIENT_WEIGHTS[weightIngredient]
      : null;

  return (
    <div
      className="min-h-screen pb-28 page-transition page-bg"
      style={{ backgroundImage: `url(${BgCalculator})` }}
    >
      <div className="bg-[#1b302c]/40 min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* HEADER */}
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              Kitchen Calculator
            </h1>
            <p className="text-white/80 mt-1 text-sm">
              Convert measurements, scale recipes, and balance cups & grams.
            </p>
          </header>

          <FloralDivider variant="vine" />

          {/* ---------------- UNIT CONVERTER ---------------- */}
          <DecorativeFrame className="mt-6">
            <div className="parchment-card p-6">
              <h2 className="text-2xl font-bold text-[#1b302c] mb-4 text-center">
                Measurement Converter
              </h2>

              <div className="grid grid-cols-1 gap-4 mb-4">
                <label className="block">
                  <span className="text-[#1b302c] font-semibold">Category</span>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setResult("");
                    }}
                    className="w-full mt-2 p-3 border-2 border-[#b8d3d5] rounded-xl bg-[#faf6f0] focus:border-[#3c6150] transition-all"
                  >
                    <option value="volume">Volume</option>
                    <option value="weight">Weight</option>
                    <option value="temperature">Temperature</option>
                  </select>
                </label>

                <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
                  <label>
                    <span className="text-[#1b302c] font-semibold">From</span>
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="w-full mt-2 p-3 border-2 border-[#b8d3d5] rounded-xl bg-[#faf6f0] focus:border-[#3c6150] transition-all"
                    >
                      {units[category as keyof typeof units].map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button
                    onClick={swapUnits}
                    className="bg-[#a77a72] text-white p-3 rounded-xl hover:bg-[#5f3c43] transition-all hover:scale-110 shadow-md mt-6"
                    title="Swap units"
                  >
                    ⇆
                  </button>

                  <label>
                    <span className="text-[#1b302c] font-semibold">To</span>
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="w-full mt-2 p-3 border-2 border-[#b8d3d5] rounded-xl bg-[#faf6f0] focus:border-[#3c6150] transition-all"
                    >
                      {units[category as keyof typeof units].map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleConvert(e.target.value)}
                  placeholder="Enter value..."
                  className="w-full p-4 border-2 border-[#b8d3d5] rounded-xl text-lg bg-[#faf6f0] focus:border-[#3c6150] transition-all"
                />
              </div>

              {result && (
                <div className="bg-gradient-to-r from-[#b8d3d5] to-[#a77a72]/50 p-4 rounded-xl flex justify-between items-center animate-fade-in shadow-inner">
                  <span className="text-2xl font-bold text-[#1b302c]">
                    {result} {toUnit}
                  </span>
                  <button
                    onClick={copyResult}
                    className="px-4 py-2 rounded-xl bg-[#3c6150] text-white text-sm font-semibold hover:bg-[#5f3c43] transition-all"
                  >
                    Copy
                  </button>
                </div>
              )}
            </div>
          </DecorativeFrame>

          <FloralDivider variant="mushroom" />

          {/* ---------------- RECIPE SCALER + TEMPLATES ---------------- */}
          <DecorativeFrame className="mt-6">
            <div className="parchment-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <h2 className="text-2xl font-bold text-[#1b302c]">
                  Recipe Scaler & Templates
                </h2>

                {/* Metric / US toggle */}
                <div className="inline-flex items-center bg-[#faf6f0] border border-[#b8d3d5] rounded-full p-1">
                  <button
                    onClick={() => setUnitSystem("us")}
                    className={`px-3 py-1 text-xs rounded-full ${
                      unitSystem === "us"
                        ? "bg-[#3c6150] text-white"
                        : "text-[#1b302c]"
                    }`}
                  >
                    US
                  </button>
                  <button
                    onClick={() => setUnitSystem("metric")}
                    className={`px-3 py-1 text-xs rounded-full ${
                      unitSystem === "metric"
                        ? "bg-[#3c6150] text-white"
                        : "text-[#1b302c]"
                    }`}
                  >
                    Metric
                  </button>
                </div>
              </div>

              {/* Template selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                {TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => {
                      setSelectedTemplateId(tpl.id);
                      setOrigServings(String(tpl.baseServings));
                    }}
                    className={`border-2 rounded-xl overflow-hidden text-left shadow-sm hover:shadow-md transition-all ${
                      tpl.id === selectedTemplateId
                        ? "border-[#a77a72] bg-[#b8d3d5]/20"
                        : "border-[#b8d3d5] bg-white"
                    }`}
                  >
                    <img
                      src={tpl.photo}
                      alt={tpl.name}
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-2">
                      <p className="text-sm font-semibold text-[#1b302c]">
                        {tpl.name}
                      </p>
                      <p className="text-[11px] text-[#5f3c43]">
                        Base: {tpl.baseServings} servings
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Servings inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[#1b302c] font-semibold">
                    Original Servings
                  </label>
                  <input
                    type="number"
                    value={origServings || String(baseServings)}
                    onChange={(e) => setOrigServings(e.target.value)}
                    className="w-full p-3 mt-2 rounded-xl border-2 border-[#b8d3d5] bg-white focus:border-[#3c6150] transition-all"
                  />
                </div>
                <div>
                  <label className="text-[#1b302c] font-semibold">
                    Desired Servings
                  </label>
                  <input
                    type="number"
                    value={newServings}
                    onChange={(e) => setNewServings(e.target.value)}
                    placeholder="e.g. 6"
                    className="w-full p-3 mt-2 rounded-xl border-2 border-[#b8d3d5] bg-white focus:border-[#3c6150] transition-all"
                  />
                </div>
              </div>

              {/* Scaled ingredient list */}
              {scaleFactor ? (
                <>
                  <div className="bg-[#b8d3d5]/40 p-3 rounded-xl text-center shadow-inner mb-3">
                    <p className="text-lg font-bold text-[#1b302c]">
                      Scale by: {scaleFactor.toFixed(2)}×
                    </p>
                    <p className="text-xs text-[#5f3c43] mt-1">
                      All ingredients below are auto-scaled for you.
                    </p>
                  </div>

                  <div className="bg-white/90 rounded-xl border border-[#b8d3d5] p-4 max-h-64 overflow-y-auto">
                    <ul className="space-y-2 text-sm text-[#1b302c]">
                      {selectedTemplate.ingredients.map((ing) => {
                        const baseAmount =
                          unitSystem === "us" ? ing.usAmount : ing.metricAmount;
                        const unit =
                          unitSystem === "us" ? ing.usUnit : ing.metricUnit;
                        const scaled = baseAmount * scaleFactor;
                        const rounded = Math.round(scaled * 100) / 100;
                        return (
                          <li key={ing.name} className="flex justify-between">
                            <span>{ing.name}</span>
                            <span className="font-semibold">
                              {rounded} {unit}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <button
                    onClick={handleCopyScaledRecipe}
                    className="mt-4 w-full py-3 rounded-xl bg-[#3c6150] text-white text-sm font-semibold hover:bg-[#5f3c43] transition-all shadow-md"
                  >
                    Copy Scaled Recipe (Markdown)
                  </button>
                </>
              ) : (
                <p className="text-center text-[#5f3c43] text-sm mt-2">
                  Enter your desired servings to see the scaled recipe.
                </p>
              )}
            </div>
          </DecorativeFrame>

          <FloralDivider variant="vine" />

          {/* ---------------- INGREDIENT WEIGHT HELPER ---------------- */}
          <DecorativeFrame className="mt-6 mb-10">
            <div className="parchment-card p-6">
              <h2 className="text-xl font-bold text-[#1b302c] mb-3 text-center">
                Ingredient Weight Helper
              </h2>
              <p className="text-[#5f3c43] text-center text-sm mb-4">
                Quickly convert cups of flour, sugar, or butter into grams.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end mb-4">
                <div>
                  <label className="text-[#1b302c] font-semibold">
                    Ingredient
                  </label>
                  <select
                    value={weightIngredient}
                    onChange={(e) => setWeightIngredient(e.target.value)}
                    className="w-full mt-2 p-3 border-2 border-[#b8d3d5] rounded-xl bg-[#faf6f0] focus:border-[#3c6150] transition-all"
                  >
                    <option value="flour">Flour</option>
                    <option value="sugar">Sugar</option>
                    <option value="butter">Butter</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#1b302c] font-semibold">
                    Cups (US)
                  </label>
                  <input
                    type="number"
                    value={weightCups}
                    onChange={(e) => setWeightCups(e.target.value)}
                    placeholder="e.g. 1.5"
                    className="w-full p-3 mt-2 rounded-xl border-2 border-[#b8d3d5] bg-white focus:border-[#3c6150] transition-all"
                  />
                </div>

                <div>
                  <span className="text-[#1b302c] font-semibold">Grams</span>
                  <div className="w-full p-3 mt-2 rounded-xl border-2 border-dashed border-[#b8d3d5] bg-white text-[#1b302c]">
                    {computedGrams !== null ? `${computedGrams.toFixed(0)} g` : "—"}
                  </div>
                </div>
              </div>
            </div>
          </DecorativeFrame>

          {/* Toast */}
          {showToast && (
            <div className="fixed top-4 right-4 bg-[#3c6150] text-white px-6 py-3 rounded-xl shadow-lg animate-slide-up flex items-center gap-2 z-50">
              <span>Copied!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
