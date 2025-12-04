import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import InstallPrompt from "./InstallPrompt";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f5f1ed]">
      {/* This is where routed pages will appear */}
      <Outlet />

      {/* Install PWA prompt */}
      <InstallPrompt />

      {/* Bottom navigation uses URLs instead of internal state */}
      <BottomNav />
    </div>
  );
}
