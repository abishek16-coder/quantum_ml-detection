"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, HeartPulse, Sparkles, ShieldCheck, FileText, Activity, Dna, Stethoscope } from "lucide-react";

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Page() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-[#17121d] selection:bg-[#3c096c]/15">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(60,9,108,0.07),transparent_52%)]" />
        <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(60,9,108,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(60,9,108,0.08)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
        <motion.div
          className="absolute left-[calc(50%-20rem)] top-[calc(50%-20rem)] h-[40rem] w-[40rem] rounded-full border border-[#3c096c]/[0.08]"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-[calc(50%-15rem)] top-[calc(50%-15rem)] h-[30rem] w-[30rem] rounded-full border border-dashed border-[#3c096c]/[0.10]"
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" aria-label="MedQube home" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3c096c] text-white shadow-lg shadow-[#3c096c]/20">
            <HeartPulse size={21} strokeWidth={2.2} />
          </span>
          <span className="text-xl font-semibold tracking-tight text-[#241533]">Med<span className="text-[#3c096c]">Qube</span></span>
        </Link>
        <div className="hidden items-center gap-2 text-xs font-medium text-[#77717d] sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Research screening platform
        </div>
        <Link href="/get-started" className="rounded-full border border-[#3c096c]/15 px-4 py-2 text-sm font-medium text-[#3c096c] transition hover:border-[#3c096c] hover:bg-[#3c096c]/5">
          Get started <ArrowRight className="ml-1 inline" size={15} />
        </Link>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100svh-80px)] max-w-7xl items-center gap-12 px-6 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-24">
        <div className="relative z-10 mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <motion.div
            variants={rise}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#3c096c]/10 bg-white/80 px-4 py-2 text-xs font-medium tracking-wide text-[#3c096c] shadow-[0_8px_30px_-20px_rgba(60,9,108,0.5)] backdrop-blur"
          >
            <Sparkles size={14} /> A clearer way to understand your report
          </motion.div>

          <motion.h1
            variants={rise}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3.4rem,7.2vw,6.4rem)] font-semibold leading-[0.99] tracking-[-0.065em] text-[#241533]"
          >
            Your health data,
            <span className="relative mt-2 block text-[#3c096c]">
              made clearer.
              <motion.span
                aria-hidden
                className="absolute -bottom-2 left-1/2 h-[5px] w-40 -translate-x-1/2 rounded-full bg-[#3c096c]/20 lg:left-0 lg:translate-x-0"
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.75, duration: 0.7, ease: "easeOut" }}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-lg text-base leading-7 text-[#706a75] sm:text-lg sm:leading-8 lg:mx-0"
          >
            Upload a medical report and get a simple, research-based AI screening summary in one place.
          </motion.p>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.28, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <Link
              href="/get-started"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#3c096c] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_16px_38px_-15px_rgba(60,9,108,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-15px_rgba(60,9,108,0.48)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3c096c]/25"
            >
              <motion.span aria-hidden className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-25deg] bg-white/15" animate={reduceMotion ? undefined : { x: [0, 420] }} transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }} />
              <span className="relative">Get Started</span>
              <ArrowRight className="relative transition-transform duration-300 group-hover:translate-x-1" size={18} />
            </Link>
            <span className="text-xs text-[#8a8490]">No account needed to begin</span>
          </motion.div>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#77717d] lg:justify-start"
          >
            <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-[#3c096c]" /> Private by design</span>
            <span className="inline-flex items-center gap-2"><Activity size={15} className="text-[#3c096c]" /> Explainable screening</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.22, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[540px]"
        >
          <motion.div
            aria-hidden
            className="absolute -inset-8 rounded-[3rem] bg-[#3c096c]/[0.07] blur-3xl"
            animate={reduceMotion ? undefined : { opacity: [0.45, 0.8, 0.45], scale: [0.96, 1.05, 0.96] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -9, 0], rotate: [0, 0.35, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-[2rem] border border-white bg-white/90 p-3 shadow-[0_34px_90px_-40px_rgba(38,16,56,0.32)] ring-1 ring-[#3c096c]/[0.08] backdrop-blur-xl"
          >
            <div className="overflow-hidden rounded-[1.5rem] bg-[#fbf9fd]">
              <div className="flex items-center justify-between border-b border-[#ece8ef] bg-white px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3c096c]/[0.08] text-[#3c096c]"><FileText size={18} /></div>
                  <div><p className="text-sm font-semibold text-[#30263b]">Report overview</p><p className="mt-0.5 text-[11px] text-[#938c99]">Example screening summary</p></div>
                </div>
                <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700">Ready</div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="rounded-2xl border border-[#ece8ef] bg-white p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div><p className="text-xs font-medium uppercase tracking-[0.12em] text-[#99919e]">Screening summary</p><p className="mt-2 text-xl font-semibold tracking-tight text-[#30263b]">Review recommended</p></div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3c096c]/[0.08] text-[#3c096c]"><Stethoscope size={19} /></div>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#eeeaf1]"><motion.div initial={{ width: 0 }} animate={{ width: "68%" }} transition={{ delay: 0.9, duration: 1.1, ease: "easeOut" }} className="h-full rounded-full bg-gradient-to-r from-[#3c096c] to-[#8b5ab4]" /></div>
                  <div className="mt-2 flex justify-between text-[11px] text-[#8b8490]"><span>Lower indicator</span><span>Elevated indicator</span></div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-[#ece8ef] bg-white p-4">
                    <div className="flex items-center gap-2 text-[#8b8490]"><Activity size={14} /><span className="text-[11px]">Analysis</span></div>
                    <p className="mt-2 text-sm font-semibold text-[#30263b]">Report patterns</p>
                    <div className="mt-3 flex h-8 items-end gap-1">
                      {[35, 56, 42, 74, 53, 88, 64, 96, 68, 80, 48, 72].map((height, i) => <motion.span key={i} initial={{ height: 4 }} animate={{ height: `${height}%` }} transition={{ delay: 0.7 + i * 0.035, duration: 0.45 }} className={`flex-1 rounded-sm ${i > 7 ? "bg-[#3c096c]" : "bg-[#b8a4ca]"}`} />)}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#ece8ef] bg-white p-4">
                    <div className="flex items-center gap-2 text-[#8b8490]"><Dna size={14} /><span className="text-[11px]">Model insight</span></div>
                    <p className="mt-2 text-sm font-semibold text-[#30263b]">Clear explanation</p>
                    <p className="mt-2 text-[11px] leading-5 text-[#8b8490]">Understand which report features influenced the screening.</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-[#ece8ef] bg-white px-5 py-3 text-[10px] text-[#918997]">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} className="text-[#3c096c]" /> Research use only</span>
                <span>Illustrative preview</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1, duration: 0.55 }}
            className="absolute -left-5 top-[18%] hidden items-center gap-3 rounded-2xl border border-white bg-white/95 p-3.5 shadow-[0_18px_50px_-25px_rgba(38,16,56,0.3)] sm:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3c096c]/[0.08] text-[#3c096c]"><FileText size={17} /></span>
            <span><span className="block text-xs font-semibold text-[#30263b]">Report received</span><span className="mt-0.5 block text-[10px] text-[#938c99]">Ready for screening</span></span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.15, duration: 0.55 }}
            className="absolute -bottom-5 right-2 hidden items-center gap-3 rounded-2xl border border-white bg-white/95 p-3.5 shadow-[0_18px_50px_-25px_rgba(38,16,56,0.3)] sm:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><ShieldCheck size={18} /></span>
            <span><span className="block text-xs font-semibold text-[#30263b]">Designed for clarity</span><span className="mt-0.5 block text-[10px] text-[#938c99]">Human-readable results</span></span>
          </motion.div>
        </motion.div>
      </section>

      <footer className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-[#eeeaf1] px-6 py-5 text-[11px] text-[#8b8490] sm:flex-row lg:px-10">
        <span>MedQube · Medical report research screening</span>
        <span>Not a substitute for professional medical advice.</span>
      </footer>
    </main>
  );
}

