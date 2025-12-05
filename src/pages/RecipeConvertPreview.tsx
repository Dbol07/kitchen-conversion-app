import { useLocation, useNavigate } from "react-router-dom";
import DecorativeFrame from "../components/DecorativeFrame";
import FloralDivider from "../components/FloralDivider";
import BgMain from "../assets/backgrounds/bg-main.jpg";

export default function RecipeConvertPreview() {
  const navigate = useNavigate();
  const location = useLocation() as any;

  const { title, image, ingredients } = location.state || {
    title: "",
    image: "",
    ingredients: [],
  };

  if (!title || !ingredients?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        No ingredient data found. Try opening a recipe and tapping "Convert Ingredients" again.
      </div>
    );
  }

  function handleSendToCalculator() {
    navigate("/calculator", {
      state: {
        recipeTitle: title,
        recipeIngredients: ingredients,
      },
    });
  }

  return (
    <div
      className="min-h-screen pb-28 page-transition page-bg"
      style={{ backgroundImage: `url(${BgMain})` }}
    >
      <div className="bg-[#1b302c]/40 min-h-screen px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-[#b8d3d5] text-[#1b302c] rounded-xl shadow hover:bg-[#a77a72] hover:text-white transition-all"
          >
            ← Back
          </button>

          <DecorativeFrame>
            <div className="parchment-card p-6">
              <h1 className="text-2xl font-bold text-[#1b302c] mb-3">
                Convert Ingredients
              </h1>

              <p className="text-[#5f3c43] mb-3">
                You&apos;re about to send this recipe&apos;s ingredients to the
                Kitchen Conversion Calculator.
              </p>

              <h2 className="text-xl font-semibold text-[#1b302c] mb-2">
                {title}
              </h2>

              {image && (
                <img
                  src={image}
                  alt={title}
                  className="rounded-xl shadow mb-4 w-full"
                />
              )}

              <FloralDivider variant="vine" />

              <h3 className="text-lg font-semibold text-[#1b302c] mt-3 mb-1">
                Ingredients to convert:
              </h3>

              <ul className="list-disc list-inside text-[#3c6150] space-y-1 mb-4">
                {ingredients.map((ing: string, idx: number) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>

              <FloralDivider variant="mushroom" />

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 bg-rose-200 hover:bg-rose-300 text-[#1b302c] rounded-xl shadow"
                >
                  ← Back
                </button>

                <button
                  onClick={handleSendToCalculator}
                  className="px-6 py-2 bg-emerald-200 hover:bg-emerald-300 text-[#1b302c] rounded-xl shadow font-semibold"
                >
                  Send to Calculator →
                </button>
              </div>
            </div>
          </DecorativeFrame>
        </div>
      </div>
    </div>
  );
}
