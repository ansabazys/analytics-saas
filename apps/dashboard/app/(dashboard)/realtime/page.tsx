"use client";

import { Pause, Filter, Zap, FileText, Globe } from "lucide-react";
import { motion } from "motion/react";

const topStats = [
  { label: "Users", value: "1,245", delta: "+12%", tone: "text-emerald-500", trend: "up" as const },
  {
    label: "Events/Sec",
    value: "415",
    delta: "+5%",
    tone: "text-emerald-500",
    trend: "up" as const,
  },
  {
    label: "Sessions",
    value: "892",
    delta: "-2%",
    tone: "text-red-500",
    trend: "down" as const,
  },
];

const liveRows = [
  { time: "14:32:45", geo: "US", path: "/pricing", event: "page_view", eventColor: "text-[#ededed]" },
  { time: "14:32:44", geo: "DE", path: "/docs/api-reference", event: "click", eventColor: "text-[#888888]" },
  { time: "14:32:42", geo: "IN", path: "/dashboard/settings", event: "page_view", eventColor: "text-[#ededed]" },
  { time: "14:32:40", geo: "UK", path: "/signup", event: "signup", eventColor: "text-emerald-500" },
  { time: "14:32:38", geo: "US", path: "/blog/new-features", event: "page_view", eventColor: "text-[#ededed]" },
  { time: "14:32:35", geo: "CA", path: "/pricing", event: "click", eventColor: "text-[#888888]" },
  {
    time: "14:32:31",
    geo: "FR",
    path: "/",
    event: "page_view",
    eventColor: "text-[#ededed]",
    highlight: true,
  },
  { time: "14:32:28", geo: "JP", path: "/docs", event: "page_view", eventColor: "text-[#ededed]" },
  { time: "14:32:25", geo: "AU", path: "/about", event: "click", eventColor: "text-[#888888]" },
  { time: "14:32:20", geo: "US", path: "/pricing", event: "page_view", eventColor: "text-[#ededed]" },
  { time: "14:32:15", geo: "BR", path: "/login", event: "click", eventColor: "text-[#888888]" },
];

const topRegions = [
  { geo: "US", count: "320", width: "40%" },
  { geo: "IN", count: "210", width: "30%" },
  { geo: "DE", count: "145", width: "20%" },
  { geo: "UK", count: "89", width: "12%" },
];

export default function RealtimePage() {
  return (
    <motion.div
      className="flex flex-col gap-4 w-full h-full text-white bg-[#0a0a0a] min-h-screen"
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
      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {topStats.map((stat) => (
          <motion.div
            key={stat.label}
            className="flex h-28 flex-col justify-between border border-[#1a1a1a] bg-[#0a0a0a] p-5 relative"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, borderColor: "#2a2a2a" }}
          >
            <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase">
              {stat.label}
            </span>
            <motion.span
              className="pb-1 text-3xl font-semibold tracking-tight"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.35 }}
            >
              {stat.value}
            </motion.span>
            <div className={`absolute bottom-5 right-5 flex items-center text-xs font-mono ${stat.tone}`}>
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1.5"
                animate={{ y: stat.trend === "up" ? [1, -1, 1] : [-1, 1, -1] }}
                transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
              >
                {stat.trend === "up" ? (
                  <>
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </>
                ) : (
                  <>
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                    <polyline points="16 17 22 17 22 11"></polyline>
                  </>
                )}
              </motion.svg>
              {stat.delta}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-1 min-h-[600px] flex-col gap-4 pb-10 lg:flex-row"
        variants={{
          hidden: { opacity: 0, y: 18 },
          show: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.45 }}
      >
        <motion.div
          className="flex max-h-[800px] h-full flex-1 flex-col border border-[#1a1a1a] bg-[#0a0a0a]"
          whileHover={{ borderColor: "#2a2a2a" }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between border-b border-[#1a1a1a] p-5">
            <div className="flex items-center gap-3">
              <motion.span
                className="h-2.5 w-2.5 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.5, 1], opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
              />
              <h2 className="text-[13px] font-semibold tracking-wide">Live Events</h2>
            </div>
            <div className="flex items-center gap-5 text-xs font-mono text-[#888888]">
              <button className="flex items-center gap-1.5 transition-colors hover:text-white">
                <Pause className="h-3.5 w-3.5" />
                Pause
              </button>
              <button className="flex items-center gap-1.5 transition-colors hover:text-white">
                <Filter className="h-3.5 w-3.5" />
                Filter
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 border-b border-[#1a1a1a] px-5 py-4 text-[10px] font-mono font-semibold uppercase tracking-widest text-[#666666]">
            <div className="col-span-2">Time</div>
            <div className="col-span-1">Geo</div>
            <div className="col-span-7 pl-6">Path</div>
            <div className="col-span-2 text-right">Event</div>
          </div>

          <div className="flex flex-col overflow-y-auto">
            {liveRows.map((row, i) => (
              <motion.div
                key={`${row.time}-${row.path}`}
                className={`grid grid-cols-12 px-5 py-3 text-xs font-mono cursor-pointer transition-colors hover:bg-[#111] ${row.highlight ? "bg-[#111111]" : ""}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + i * 0.035, duration: 0.28 }}
                whileHover={{ backgroundColor: "#111111" }}
              >
                <div className="col-span-2 text-[#888888]">{row.time}</div>
                <div className="col-span-1 font-semibold text-[#ededed]">{row.geo}</div>
                <div className="col-span-7 truncate pl-6 pr-4 text-[#ededed]">{row.path}</div>
                <div className={`col-span-2 text-right font-medium ${row.eventColor}`}>
                  {row.event}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex w-full flex-col gap-4 lg:w-[320px]"
          variants={{
            hidden: { opacity: 0, x: 16 },
            show: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          <motion.div
            className="flex flex-col gap-5 border border-[#1a1a1a] bg-[#0a0a0a] p-5"
            whileHover={{ y: -3, borderColor: "#2a2a2a" }}
          >
            <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-widest text-[#888888]">
              <span>Event Types</span>
              <Zap className="h-3.5 w-3.5" />
            </div>

            <div className="flex flex-col gap-3.5 text-xs font-mono">
              <div className="flex items-center justify-between text-[#ededed]">
                <span>page_view</span>
                <span className="font-semibold">320/s</span>
              </div>
              <div className="flex items-center justify-between text-[#ededed]">
                <span>click</span>
                <span className="font-semibold">120/s</span>
              </div>
              <div className="flex items-center justify-between text-emerald-500">
                <span>signup</span>
                <span className="font-semibold">32/s</span>
              </div>
              <div className="flex items-center justify-between text-[#ededed]">
                <span>form_submit</span>
                <span className="font-semibold">18/s</span>
              </div>
              <div className="flex items-center justify-between text-red-500">
                <span>error</span>
                <span className="font-semibold">2/s</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-5 border border-[#1a1a1a] bg-[#0a0a0a] p-5"
            whileHover={{ y: -3, borderColor: "#2a2a2a" }}
          >
            <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-widest text-[#888888]">
              <span>Active Pages</span>
              <FileText className="h-3.5 w-3.5" />
            </div>

            <div className="flex flex-col gap-3.5 text-xs font-mono">
              <div className="flex items-center justify-between text-[#ededed]">
                <span className="truncate pr-4">/dashboard</span>
                <span className="font-semibold">213</span>
              </div>
              <div className="flex items-center justify-between text-[#ededed]">
                <span className="truncate pr-4">/pricing</span>
                <span className="font-semibold">182</span>
              </div>
              <div className="flex items-center justify-between text-[#ededed]">
                <span className="truncate pr-4">/docs</span>
                <span className="font-semibold">97</span>
              </div>
              <div className="flex items-center justify-between text-[#ededed]">
                <span className="truncate pr-4">/blog</span>
                <span className="font-semibold">64</span>
              </div>
              <div className="flex items-center justify-between text-[#ededed]">
                <span className="truncate pr-4">/</span>
                <span className="font-semibold">45</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-5 border border-[#1a1a1a] bg-[#0a0a0a] p-5"
            whileHover={{ y: -3, borderColor: "#2a2a2a" }}
          >
            <div className="flex items-center justify-between text-[10px] font-mono font-semibold uppercase tracking-widest text-[#888888]">
              <span>Top Regions</span>
              <Globe className="h-3.5 w-3.5" />
            </div>

            <div className="mt-1 flex flex-col gap-4 text-xs font-mono">
              {topRegions.map((region, i) => (
                <div key={region.geo} className="flex items-center text-[#ededed]">
                  <span className="w-8 font-semibold">{region.geo}</span>
                  <div className="ml-4 mr-6 h-[2px] flex-1 bg-[#222]">
                    <motion.div
                      className="h-full bg-[#ededed]"
                      initial={{ width: 0 }}
                      animate={{ width: region.width }}
                      transition={{
                        delay: 0.35 + i * 0.08,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                  <span className="w-8 text-right font-semibold">{region.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
