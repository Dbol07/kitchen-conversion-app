import { Link } from "react-router-dom";

// BANNERS
import dashboardBanner from "@/assets/banners/dashboard-banner.png";

// TEMPLATE THUMBS
import cookieThumb from "@/assets/templates/cookie-template-thumb.png";
import cakeThumb from "@/assets/templates/cake-template-thumb.png";
import breadThumb from "@/assets/templates/bread-template-thumb.png";

// OPTIONAL: If you have a divider image, import here
// import divider from "@/assets/dividers/vine-divider.png";

export default function Dashboard() {
  return (
    <div className="dashboard-page max-w-5xl mx-auto pb-12">

      {/* 🧵 BANNER */}
      <div className="w-full mb-6">
        <img
          src={dashboardBanner}
          alt="Dashboard Banner"
          className="w-full rounded-lg shadow-md"
        />
      </div>

      {/* 🪄 TITLE */}
      <h1 className="text-4xl font-bold mb-4 text-center text-[#4b3b2f] drop-shadow">
        The Conversion Kitchen
      </h1>

      {/* 🌿 DIVIDER (optional)
      <img src={divider} className="w-full my-4 opacity-80" /> 
      */}

      {/* QUICK TOOLS */}
      <div className="grid grid-cols-3 gap-4 mb-10 px-4">
        <Link to="/calculator" className="tool-btn">Calculator</Link>
        <Link to="/guide" className="tool-btn">Guide</Link>
        <Link to="/recipes" className="tool-btn">Recipes</Link>
        <Link to="/printables" className="tool-btn">Printables</Link>
        <Link to="/about" className="tool-btn">About</Link>
        <Link to="/faq" className="tool-btn">FAQ</Link>
      </div>

      {/* 🌿 DIVIDER (optional)
      <img src={divider} className="w-full my-4 opacity-80" /> 
      */}

      {/* ✨ COZY INSPIRATION BOX */}
      <div className="bg-white/85 backdrop-blur p-6 rounded-2xl shadow-lg border mx-4">
        <h2 className="text-2xl font-semibold mb-2 text-center text-[#4b3b2f]">
          Cozy Recipe Inspiration
        </h2>

        <p className="text-center mb-6 text-gray-700">
          Start cooking with one of our beginner-friendly templates.
        </p>

        {/* TEMPLATE THUMBNAILS → now open full preview page */}
        <div className="grid grid-cols-3 gap-6">

          {/* COOKIE TEMPLATE */}
          <Link
            to="/template/cookie"
            className="template-card flex flex-col items-center hover:scale-[1.02] transition-transform"
          >
            <img
              src={cookieThumb}
              alt="Cookie Template"
              className="w-full rounded-lg shadow"
            />
            <p className="mt-2 text-lg font-medium">Cookie</p>
          </Link>

          {/* CAKE TEMPLATE */}
          <Link
            to="/template/cake"
            className="template-card flex flex-col items-center hover:scale-[1.02] transition-transform"
          >
            <img
              src={cakeThumb}
              alt="Cake Template"
              className="w-full rounded-lg shadow"
            />
            <p className="mt-2 text-lg font-medium">Cake</p>
          </Link>

          {/* BREAD TEMPLATE */}
          <Link
            to="/template/bread"
            className="template-card flex flex-col items-center hover:scale-[1.02] transition-transform"
          >
            <img
              src={breadThumb}
              alt="Bread Template"
              className="w-full rounded-lg shadow"
            />
            <p className="mt-2 text-lg font-medium">Bread</p>
          </Link>

        </div>
      </div>

      {/* BOTTOM NAV SPACER */}
      <div className="h-10"></div>
    </div>
  );
}
