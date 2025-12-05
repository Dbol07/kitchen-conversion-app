import React, { useEffect, useState } from "react";
import DecorativeFrame from "../components/DecorativeFrame";
import FloralDivider from "../components/FloralDivider";
import BgMain from "../assets/backgrounds/bg-main.jpg";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;

export default function Recipes() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [maxTime, setMaxTime] = useState<number | "">("");

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchRecipes() {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      params.set("number", "20");
      params.set("addRecipeInformation", "true");
      params.set("apiKey", API_KEY || "");

      if (search.trim()) params.set("query", search.trim());
      if (cuisine) params.set("cuisine", cuisine);
      if (diet) params.set("diet", diet);
      if (maxTime) params.set("maxReadyTime", String(maxTime));

      const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;

      const res = await fetch(url);

      if (!res.ok) {
        const errText = await res.text();
        console.error("Spoonacular error:", errText);
        throw new Error("Failed to fetch recipes");
      }

      const data = await res.json();
      setRecipes(data.results || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load recipes at the moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen pb-28 page-transition page-bg"
      style={{ backgroundImage: `url(${BgMain})` }}
    >
      <div className="bg-[#1b302c]/40 min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* HEADER */}
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              Recipes
            </h1>
            <p className="text-white/80 text-sm mt-1">
              Cozy inspiration for your next kitchen adventure
            </p>
          </header>

          <FloralDivider variant="mushroom" />

          {/* SEARCH + FILTERS */}
          <div className="mt-6 mb-4 space-y-3">
            {/* Search */}
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Search recipes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full max-w-md px-4 py-2 rounded-xl shadow-md
                  bg-[#faf6f0] text-[#1b302c] border border-[#b8d3d5]
                  focus:outline-none focus:ring-2 focus:ring-[#b8d3d5]
                "
              />
            </div>

            {/* Filter row */}
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              {/* Cuisine */}
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#faf6f0] border border-[#b8d3d5]"
              >
                <option value="">Any cuisine</option>
                <option value="american">American</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
                <option value="indian">Indian</option>
                <option value="french">French</option>
                <option value="mediterranean">Mediterranean</option>
              </select>

              {/* Diet */}
              <select
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#faf6f0] border border-[#b8d3d5]"
              >
                <option value="">Any diet</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten free">Gluten Free</option>
                <option value="ketogenic">Keto</option>
                <option value="paleo">Paleo</option>
              </select>

              {/* Max time */}
              <div className="flex items-center gap-2 bg-[#faf6f0] px-3 py-2 rounded-xl border border-[#b8d3d5]">
                <span>Max time:</span>
                <input
                  type="number"
                  min={1}
                  value={maxTime}
                  onChange={(e) =>
                    setMaxTime(e.target.value ? Number(e.target.value) : "")
                  }
                  className="w-16 bg-transparent border-b border-[#b8d3d5] focus:outline-none text-center"
                />
                <span>min</span>
              </div>

              {/* Apply button */}
              <button
                onClick={fetchRecipes}
                className="px-4 py-2 bg-emerald-200 hover:bg-emerald-300 text-[#1b302c] rounded-xl shadow-md"
              >
                Apply filters
              </button>
            </div>
          </div>

          {/* CONTENT */}
          {loading && (
            <p className="text-white text-center text-lg mt-10">
              Loading recipes…
            </p>
          )}

          {error && (
            <p className="text-red-200 text-center text-lg mt-10">{error}</p>
          )}

          {!loading && !error && (
            <DecorativeFrame className="mt-4">
              <div className="parchment-card p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {recipes.map((recipe) => (
                    <Link
                      key={recipe.id}
                      to={`/recipes/${recipe.id}`}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="text-md font-bold text-[#1b302c]">
                          {recipe.title}
                        </h3>
                        <p className="text-xs text-[#5f3c43] mt-1">
                          {recipe.readyInMinutes} min • {recipe.servings}{" "}
                          servings
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {recipes.length === 0 && (
                  <p className="text-center text-[#5f3c43] mt-6 text-sm">
                    No recipes found. Try adjusting your filters.
                  </p>
                )}
              </div>
            </DecorativeFrame>
          )}
        </div>
      </div>
    </div>
  );
}
