import { DottedMap } from "@/components/ui/dotted-map";
import React from "react";

const mapMarkers = [
  { lat: 40.7128, lng: -74.006, color: "#3b82f6" }, // NY (blue)
  { lat: 34.0522, lng: -118.2437, color: "#eab308" }, // LA (yellow)
  { lat: 39.0438, lng: -77.4874, color: "#ef4444" }, // Ashburn (red)
  { lat: 41.8781, lng: -87.6298, color: "#22c55e" }, // Chicago (green)
  { lat: 51.5074, lng: -0.1278, color: "#3b82f6" }, // London (blue)
  { lat: 50.1109, lng: 8.6821, color: "#ef4444" }, // Frankfurt (red)
  { lat: 48.8566, lng: 2.3522, color: "#22c55e" }, // Paris (green)
  { lat: 1.3521, lng: 103.8198, color: "#f97316" }, // Singapore (orange)
  { lat: 35.6762, lng: 139.6503, color: "#ef4444" }, // Tokyo (red)
  { lat: 19.076, lng: 72.8777, color: "#eab308" }, // Mumbai (yellow)
  { lat: -23.5505, lng: -46.6333, color: "#f97316" }, // Sao Paulo (orange)
  { lat: -34.6037, lng: -58.3816, color: "#ef4444" }, // Buenos Aires (red)
  { lat: -33.8688, lng: 151.2093, color: "#3b82f6" }, // Sydney (blue)
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black w-full justify-center text-[#a1a1aa] flex relative overflow-hidden text-sm selection:bg-[#3f3f46] selection:text-white">
      {/* Background Kinetic Orbs */}
      {/* <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse pointer-events-none" /> */}
      {/* <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-fuchsia-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" /> */}
      {/* <div className="absolute top-[40%] right-[20%] w-[20vw] h-[20vw] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" /> */}

      {/* Grid Pattern */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" /> */}

      <div className="flex-1 flex gap-10  justify-center items-center relative z-10 w-full lg:w-1/2 p-8">
        <div className="w-full flex justify-center gap-10">
          <div className="max-w-md p-10 bg-neutral-950 rounded-2xl md:block  hidden">
            <h2 className="text-4xl font-normal text-white mb-6 tracking-tight font-sans">
              We don’t just track events.
              <br />
              {/* <span className="text-[#a1a1aa]">We reveal how users interact with your product.</span> */}
            </h2>
            <p className="text-[#71717a] text-lg leading-relaxed mb-12 font-sans font-light">
              We reveal how users interact with your product. This is your space to move with
              meaning, analyzing every signal in real-time.
            </p>

            <div className="relative w-full gap-4 font-mono text-xs">
              <DottedMap className="h-full" markers={mapMarkers} />
            </div>
          </div>
          <div className="max-w-md"> {children} </div>
        </div>
      </div>
    </div>
  );
}
