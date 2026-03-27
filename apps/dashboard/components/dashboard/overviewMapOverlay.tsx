import { motion } from "motion/react";

interface TopCountry {
  code: string;
  color: string;
  requests: string;
  rate: string;
}

interface OverviewMapOverlayProps {
  totalRequests: string;
  totalRate: string;
  topCountries: TopCountry[];
  regionCount: number;
}

export function OverviewMapOverlay({
  totalRequests,
  totalRate,
  topCountries,
  regionCount,
}: OverviewMapOverlayProps) {
  return (
    <motion.div
      className="absolute top-[30%] left-0 z-10 font-mono flex flex-col gap-8 pointer-events-none"
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <h3 className="text-[10px] tracking-widest text-[#888888] uppercase mb-1">
          Total visitors
        </h3>
        <motion.p
          className="text-[32px] sm:text-[50px] font-sans tracking-wider font-semibold text-white leading-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45 }}
        >
          {totalRequests}
        </motion.p>
        <p className="text-[10px] tracking-widest text-[#888888] uppercase mt-2">
          {totalRate} active users / day
        </p>
      </div>

      <div>
        <h3 className="text-[10px] tracking-widest text-[#888888] uppercase mb-3">
          Top Countries By Users
        </h3>
        <motion.div
          className="flex flex-col gap-1.5 text-[11px]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.18,
              },
            },
          }}
        >
          {topCountries.map((country, idx) => (
            <motion.div
              key={country.code}
              className="flex items-center"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.28 }}
            >
              <motion.div
                className="w-1.5 h-1.5 mr-2"
                style={{ backgroundColor: country.color }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 2.6,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: idx * 0.18,
                }}
              />
              <span className="text-[#3b82f6] font-bold w-6">{country.code}</span>
              <span className="text-white ml-2 tabular-nums">{country.requests}</span>
              <span className="text-[#888888] ml-2 tabular-nums">{country.rate}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-4 flex items-center text-[10px] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.3 }}
        >
          <motion.span
            className="mr-1"
            animate={{ y: [0, -1.5, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
          >
            ▲
          </motion.span>
          {regionCount} Active Regions
        </motion.div>
      </div>
    </motion.div>
  );
}
