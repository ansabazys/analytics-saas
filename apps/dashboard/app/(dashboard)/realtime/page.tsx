import { Pause, Filter, Zap, FileText, Globe } from "lucide-react";

export default function RealtimePage() {
  return (
    <div className="flex flex-col gap-4 w-full h-full text-white bg-[#0a0a0a] min-h-screen">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Users */}
        <div className="flex flex-col justify-between p-5  border border-[#1a1a1a] bg-[#0a0a0a] h-28 relative">
          <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase">
            Users
          </span>
          <span className="text-3xl font-semibold tracking-tight pb-1">1,245</span>
          <div className="absolute bottom-5 right-5 flex items-center text-xs font-mono text-emerald-500">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1.5"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
            +12%
          </div>
        </div>

        {/* Events/Sec */}
        <div className="flex flex-col justify-between p-5  border border-[#1a1a1a] bg-[#0a0a0a] h-28 relative">
          <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase">
            Events/Sec
          </span>
          <span className="text-3xl font-semibold tracking-tight pb-1">415</span>
          <div className="absolute bottom-5 right-5 flex items-center text-xs font-mono text-emerald-500">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1.5"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
            +5%
          </div>
        </div>

        {/* Sessions */}
        <div className="flex flex-col justify-between p-5  border border-[#1a1a1a] bg-[#0a0a0a] h-28 relative">
          <span className="text-[10px] font-mono tracking-widest text-[#888888] uppercase">
            Sessions
          </span>
          <span className="text-3xl font-semibold tracking-tight pb-1">892</span>
          <div className="absolute bottom-5 right-5 flex items-center text-xs font-mono text-red-500">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1.5"
            >
              <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
              <polyline points="16 17 22 17 22 11"></polyline>
            </svg>
            -2%
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1 h-full min-h-[600px] pb-10">
        {/* Main Content: Live Events */}
        <div className="flex-1  border border-[#1a1a1a] bg-[#0a0a0a] flex flex-col h-full max-h-[800px]">
          <div className="flex items-center justify-between p-5 border-b border-[#1a1a1a]">
            <h2 className="text-[13px] font-semibold tracking-wide">Live Events</h2>
            <div className="flex items-center gap-5 text-xs font-mono text-[#888888]">
              <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Pause className="w-3.5 h-3.5" />
                Pause
              </button>
              <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Filter className="w-3.5 h-3.5" />
                Filter
              </button>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#666666] grid grid-cols-12 px-5 py-4 border-b border-[#1a1a1a] uppercase tracking-widest font-semibold">
            <div className="col-span-2">Time</div>
            <div className="col-span-1">Geo</div>
            <div className="col-span-7 pl-6">Path</div>
            <div className="col-span-2 text-right">Event</div>
          </div>

          <div className="flex flex-col overflow-y-auto">
            {/* Rows */}
            {[
              {
                time: "14:32:45",
                geo: "US",
                path: "/pricing",
                event: "page_view",
                eventColor: "text-[#ededed]",
              },
              {
                time: "14:32:44",
                geo: "DE",
                path: "/docs/api-reference",
                event: "click",
                eventColor: "text-[#888888]",
              },
              {
                time: "14:32:42",
                geo: "IN",
                path: "/dashboard/settings",
                event: "page_view",
                eventColor: "text-[#ededed]",
              },
              {
                time: "14:32:40",
                geo: "UK",
                path: "/signup",
                event: "signup",
                eventColor: "text-emerald-500",
              },
              {
                time: "14:32:38",
                geo: "US",
                path: "/blog/new-features",
                event: "page_view",
                eventColor: "text-[#ededed]",
              },
              {
                time: "14:32:35",
                geo: "CA",
                path: "/pricing",
                event: "click",
                eventColor: "text-[#888888]",
              },
              {
                time: "14:32:31",
                geo: "FR",
                path: "/",
                event: "page_view",
                eventColor: "text-[#ededed]",
                highlight: true,
              },
              {
                time: "14:32:28",
                geo: "JP",
                path: "/docs",
                event: "page_view",
                eventColor: "text-[#ededed]",
              },
              {
                time: "14:32:25",
                geo: "AU",
                path: "/about",
                event: "click",
                eventColor: "text-[#888888]",
              },
              {
                time: "14:32:20",
                geo: "US",
                path: "/pricing",
                event: "page_view",
                eventColor: "text-[#ededed]",
              },
              {
                time: "14:32:15",
                geo: "BR",
                path: "/login",
                event: "click",
                eventColor: "text-[#888888]",
              },
            ].map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-12 px-5 py-3 text-xs font-mono transition-colors hover:bg-[#111] cursor-pointer ${row.highlight ? "bg-[#111111]" : ""}`}
              >
                <div className="col-span-2 text-[#888888]">{row.time}</div>
                <div className="col-span-1 font-semibold text-[#ededed]">{row.geo}</div>
                <div className="col-span-7 text-[#ededed] truncate pl-6 pr-4">{row.path}</div>
                <div className={`col-span-2 text-right font-medium ${row.eventColor}`}>
                  {row.event}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[320px] flex flex-col gap-4">
          {/* Event Types */}
          <div className=" border border-[#1a1a1a] bg-[#0a0a0a] p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between text-[#888888] uppercase tracking-widest text-[10px] font-mono font-semibold">
              <span>Event Types</span>
              <Zap className="w-3.5 h-3.5" />
            </div>

            <div className="flex flex-col gap-3.5 text-xs font-mono">
              <div className="flex justify-between items-center text-[#ededed]">
                <span>page_view</span>
                <span className="font-semibold">320/s</span>
              </div>
              <div className="flex justify-between items-center text-[#ededed]">
                <span>click</span>
                <span className="font-semibold">120/s</span>
              </div>
              <div className="flex justify-between items-center text-emerald-500">
                <span>signup</span>
                <span className="font-semibold">32/s</span>
              </div>
              <div className="flex justify-between items-center text-[#ededed]">
                <span>form_submit</span>
                <span className="font-semibold">18/s</span>
              </div>
              <div className="flex justify-between items-center text-red-500">
                <span>error</span>
                <span className="font-semibold">2/s</span>
              </div>
            </div>
          </div>

          {/* Active Pages */}
          <div className=" border border-[#1a1a1a] bg-[#0a0a0a] p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between text-[#888888] uppercase tracking-widest text-[10px] font-mono font-semibold">
              <span>Active Pages</span>
              <FileText className="w-3.5 h-3.5" />
            </div>

            <div className="flex flex-col gap-3.5 text-xs font-mono">
              <div className="flex justify-between items-center text-[#ededed]">
                <span className="truncate pr-4">/dashboard</span>
                <span className="font-semibold">213</span>
              </div>
              <div className="flex justify-between items-center text-[#ededed]">
                <span className="truncate pr-4">/pricing</span>
                <span className="font-semibold">182</span>
              </div>
              <div className="flex justify-between items-center text-[#ededed]">
                <span className="truncate pr-4">/docs</span>
                <span className="font-semibold">97</span>
              </div>
              <div className="flex justify-between items-center text-[#ededed]">
                <span className="truncate pr-4">/blog</span>
                <span className="font-semibold">64</span>
              </div>
              <div className="flex justify-between items-center text-[#ededed]">
                <span className="truncate pr-4">/</span>
                <span className="font-semibold">45</span>
              </div>
            </div>
          </div>

          {/* Top Regions */}
          <div className=" border border-[#1a1a1a] bg-[#0a0a0a] p-5 flex flex-col gap-5">
            <div className="flex items-center justify-between text-[#888888] uppercase tracking-widest text-[10px] font-mono font-semibold">
              <span>Top Regions</span>
              <Globe className="w-3.5 h-3.5" />
            </div>

            <div className="flex flex-col gap-4 text-xs font-mono mt-1">
              {[
                { geo: "US", count: "320", width: "w-[40%]" },
                { geo: "IN", count: "210", width: "w-[30%]" },
                { geo: "DE", count: "145", width: "w-[20%]" },
                { geo: "UK", count: "89", width: "w-[12%]" },
              ].map((region, i) => (
                <div key={i} className="flex items-center text-[#ededed]">
                  <span className="w-8 font-semibold">{region.geo}</span>
                  <div className="flex-1 ml-4 mr-6 h-[2px] bg-[#222]">
                    <div className={`h-full bg-[#ededed] ${region.width}`}></div>
                  </div>
                  <span className="w-8 text-right font-semibold">{region.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
