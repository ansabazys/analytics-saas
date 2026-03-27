import { ReactNode } from "react";
import { motion } from "motion/react";

interface OverviewStatRowProps {
  label: string;
  value: ReactNode;
  rate?: ReactNode;
  color?: string;
}

interface OverviewStatPanelProps {
  title: string;
  mainValue: ReactNode;
  subtitle?: ReactNode;
  rows?: OverviewStatRowProps[];
}

export function OverviewStatPanel({ title, mainValue, subtitle, rows }: OverviewStatPanelProps) {
  return (
    <motion.div
      className="border border-zinc-900 bg-[#0a0a0a] p-5 shadow-none pb-4 flex flex-col justify-between h-full"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, borderColor: "rgb(39 39 42)" }}
    >
      <div>
        <motion.h3
          className="mb-2 font-mono text-[10px] tracking-widest text-[#888888] uppercase"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-[28px] font-normal tracking-wider text-white mt-1"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, duration: 0.35 }}
        >
          {mainValue}
        </motion.p>
        {subtitle && (
          <motion.div
            className="mt-8 font-mono text-[10px] text-[#888888]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.3 }}
          >
            {subtitle}
          </motion.div>
        )}
      </div>

      {rows && rows.length > 0 && (
        <motion.div
          className="mt-6 flex flex-col gap-1.5 font-mono text-[10px] uppercase"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
                delayChildren: 0.18,
              },
            },
          }}
        >
          {rows.map((row, idx) => (
            <motion.div
              key={idx}
              className="flex items-center justify-between"
              variants={{
                hidden: { opacity: 0, x: -8 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 text-[#888888]">
                {row.color && (
                  <motion.div
                    className="h-1.5 w-1.5 rounded-sm"
                    style={{ backgroundColor: row.color }}
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.04, duration: 0.2 }}
                  />
                )}
                <span>{row.label}</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <span>{row.value}</span>
                {row.rate && <span className="text-[#888888] w-12 text-right">{row.rate}</span>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
