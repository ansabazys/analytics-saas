"use client";

import * as React from "react";
import { motion } from "motion/react";
import { OverviewMapOverlay } from "@/components/dashboard/overviewMapOverlay";
import { OverviewStatPanel } from "@/components/dashboard/overviewStatPanel";
import { DottedMap } from "@/components/ui/dotted-map";

type MyMarker = {
  lat: number;
  lng: number;
  size?: number;
  overlay: {
    countryCode: string;
    label: string;
  };
};

type OverlayProps = {
  marker: MyMarker;
  x: number;
  y: number;
  r: number;
  index: number;
};

const mapMarkers: MyMarker[] = [
  { lat: 40.7128, lng: -74.006, size: 2.8, overlay: { countryCode: "us", label: "New York" } },
  { lat: 34.0522, lng: -118.2437, size: 2.8, overlay: { countryCode: "us", label: "Los Angeles" } },
  { lat: 51.5074, lng: -0.1278, size: 2.8, overlay: { countryCode: "gb", label: "London" } },
  { lat: 50.1109, lng: 8.6821, size: 2.8, overlay: { countryCode: "de", label: "Frankfurt" } },
  { lat: 48.8566, lng: 2.3522, size: 2.8, overlay: { countryCode: "fr", label: "Paris" } },
  { lat: 1.3521, lng: 103.8198, size: 2.8, overlay: { countryCode: "sg", label: "Singapore" } },
  { lat: 35.6762, lng: 139.6503, size: 2.8, overlay: { countryCode: "jp", label: "Tokyo" } },
  { lat: 19.076, lng: 72.8777, size: 2.8, overlay: { countryCode: "in", label: "Mumbai" } },
  { lat: -23.5505, lng: -46.6333, size: 2.8, overlay: { countryCode: "br", label: "Sao Paulo" } },
  { lat: -33.8688, lng: 151.2093, size: 2.8, overlay: { countryCode: "au", label: "Sydney" } },
];

const topCountriesData = [
  { code: "US", color: "#3b82f6", requests: "40,778,234", rate: "18.2%" },
  { code: "DE", color: "#eab308", requests: "6,211,644", rate: "4.1%" },
  { code: "GB", color: "#3b82f6", requests: "4,952,185", rate: "3.6%" },
  { code: "IN", color: "#eab308", requests: "4,357,562", rate: "3.2%" },
  { code: "BR", color: "#ef4444", requests: "3,933,116", rate: "2.9%" },
  { code: "SG", color: "#f97316", requests: "3,807,130", rate: "2.7%" },
  { code: "JP", color: "#ef4444", requests: "3,690,520", rate: "2.6%" },
];

export default function Home() {
  const id = React.useId();
  const revealUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-col w-full h-screen pb-10"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      <motion.div variants={revealUp} transition={{ duration: 0.45 }} className="mb-4">
        <h2 className="text-[10px] font-mono uppercase tracking-widest text-[#888888]">
          <span className="text-white">Global Traffic - System Overview</span>
          <br />
          [Last 24 hours]
        </h2>
      </motion.div>

      <motion.div
        className="relative w-full flex-1 items-center min-h-[500px] mb-8"
        variants={revealUp}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <OverviewMapOverlay
          totalRequests="115,843,647"
          totalRate="415,534"
          topCountries={topCountriesData}
          regionCount={19}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center -ml-32"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <DottedMap
            width={300}
            height={150}
            mapSamples={12000}
            markers={mapMarkers}
            dotRadius={0.4}
            className="opacity-80"
            renderMarkerOverlay={(props: OverlayProps) => {
              const { marker, x, y, r, index } = props;
              const { countryCode, label } = marker.overlay;

              const href = `https://flagsapi.com/${countryCode.toUpperCase()}/flat/32.png`;
              const clipId = `${id}-clip-${index}`.replace(/:/g, "-");

              const imgR = r * 0.75;
              const fontSize = r * 0.9;
              const pillH = r * 1.5;
              const pillW = label.length * (fontSize * 0.6) + r * 1.5;
              const pillX = x + r + 2;
              const pillY = y - pillH / 2;

              return (
                <g>
                  <clipPath id={clipId}>
                    <circle cx={x} cy={y} r={imgR} />
                  </clipPath>

                  <image
                    xlinkHref={href}
                    x={x - imgR}
                    y={y - imgR}
                    width={imgR * 2}
                    height={imgR * 2}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#${clipId})`}
                  />

                  <rect
                    x={pillX}
                    y={pillY}
                    width={pillW}
                    height={pillH}
                    rx={pillH / 2}
                    fill="rgba(0,0,0,0.6)"
                  />

                  <text x={pillX} y={y + fontSize * 0.35} fontSize={fontSize} fill="white">
                    {label}
                  </text>
                </g>
              );
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="grid gap-5 border-zinc-900 md:grid-cols-3"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.12,
            },
          },
        }}
      >
        <OverviewStatPanel
          title="Total Sessions"
          mainValue="28,430,221"
          rows={[
            { label: "Active Sessions", value: "2,408,605" },
            { label: "Avg Duration", value: "2m 34s" },
          ]}
        />

        <OverviewStatPanel
          title="Events Tracked"
          mainValue="55,760,219"
          rows={[
            { label: "Page Views", value: "31,398,339", rate: "5,349/s", color: "#3b82f6" },
            { label: "Clicks", value: "17,171,575", rate: "3,343/s", color: "#eab308" },
            { label: "Custom Events", value: "7,328,813", rate: "1,106/s", color: "#ef4444" },
          ]}
        />

        <motion.div variants={revealUp} transition={{ duration: 0.45 }} className="flex flex-col gap-5">
          <motion.div
            className="flex-1 bg-[#0a0a0a] p-5 pb-4 border border-zinc-900"
            whileHover={{ y: -4, borderColor: "rgb(39 39 42)" }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="mb-4 font-mono text-[10px] tracking-widest text-[#888888] uppercase">
              User Engagement
            </h3>
            <div className="flex flex-col gap-1.5 font-mono text-[10px] uppercase">
              <div className="flex items-center justify-between">
                <span className="text-[#888888]">Bounce Rate</span>
                <span className="text-white">32.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#888888]">Engaged Users</span>
                <span className="text-white">2,408,339</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 bg-[#0a0a0a] p-5 pb-4 border-t border-zinc-900 border border-zinc-900"
            whileHover={{ y: -4, borderColor: "rgb(39 39 42)" }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="mb-2 font-mono text-[10px] tracking-widest text-[#888888] uppercase">
              Page Views
            </h3>
            <p className="text-[28px] tracking-wider text-white mt-1">78,952,598,273</p>
            <p className="font-mono text-[10px] text-[#888888] mt-2">Total pages viewed</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
