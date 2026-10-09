"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, HeartPulse, UploadCloud, AlertTriangle, Sparkles } from "lucide-react";

const result = {
  risk: "Moderate risk",
  confidence: "87%",
  note: "MedQube found patterns that may need clinical review. This is not a medical diagnosis.",
  points: ["Report received", "AI screening completed", "Doctor review recommended"],
};

export default function GetStartedPage() {
  const [reportText, setReportText] = useState("");
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const hasInput = useMemo(() => reportText.trim().length > 8 || fileName.length > 0, [reportText, fileName]);

  const runAnalysis = () => {
    if (!hasInput) return;
    setStatus("loading");
    window.setTimeout(() => setStatus("done"), 900);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-5 py-6 text-[#111111]">
      <motion.div
        aria-hidden
        className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#3c096c]/10 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#3c096c]/5 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <header className="relative z-10 mx-auto mb-10 flex max-w-5xl items-center justify-between">
        <Link href="/" className="group inline-flex items-center gap-2 text-sm font-medium text-[#3c096c] transition hover:-translate-x-1">
          <ArrowLeft size={16} className="transition group-hover:-translate-x-1" /> Back
        </Link>
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 font-semibold text-[#3c096c]">
          <HeartPulse size={20} /> MedQube
        </motion.div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] bg-white/90 p-6 shadow-xl shadow-[#3c096c]/5 ring-1 ring-[#eeeeee] backdrop-blur"
          whileHover={{ y: -4 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#3c096c]/5 px-3 py-1.5 text-sm font-medium text-[#3c096c]">
            <Sparkles size={15} /> Start screening
          </div>
          <h1 className="text-3xl font-semibold text-[#3c096c]">Upload medical report</h1>
          <p className="mt-2 text-[#666666]">Upload a report file or paste the report details.</p>

          <motion.label
            whileHover={{ scale: 1.015, borderColor: "rgba(60,9,108,0.55)" }}
            whileTap={{ scale: 0.99 }}
            className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#3c096c]/30 bg-[#3c096c]/5 px-5 py-10 text-center text-[#3c096c] transition hover:bg-[#3c096c]/10"
          >
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
              <UploadCloud size={36} />
            </motion.div>
            <span className="mt-3 font-medium">Choose report file</span>
            <span className="mt-1 text-sm text-[#666666]">PDF, image, or text file</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.txt,.png,.jpg,.jpeg"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
            />
          </motion.label>

          <AnimatePresence>
            {fileName && (
              <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-3 text-sm font-medium text-[#3c096c]">
                Selected: {fileName}
              </motion.p>
            )}
          </AnimatePresence>

          <textarea
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            placeholder="Or paste medical report details here..."
            className="mt-5 min-h-36 w-full rounded-2xl border border-[#dddddd] bg-white p-4 text-sm outline-none transition focus:border-[#3c096c] focus:ring-4 focus:ring-[#3c096c]/10"
          />

          <motion.button
            whileHover={hasInput ? { y: -2, scale: 1.01 } : undefined}
            whileTap={hasInput ? { scale: 0.98 } : undefined}
            onClick={runAnalysis}
            disabled={!hasInput || status === "loading"}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3c096c] px-6 py-4 font-semibold text-white shadow-lg shadow-[#3c096c]/20 transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === "loading" ? "Analyzing..." : "Show Result"}
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-[2rem] bg-white/90 p-6 shadow-xl shadow-[#3c096c]/5 ring-1 ring-[#eeeeee] backdrop-blur"
          whileHover={{ y: -4 }}
        >
          <h2 className="text-3xl font-semibold text-[#3c096c]">Result</h2>
          <p className="mt-2 text-[#666666]">Your screening result will appear here.</p>

          <AnimatePresence mode="wait">
            {status === "loading" ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8 rounded-2xl border border-[#eeeeee] bg-[#fafafa] p-8 text-center text-[#777777]">
                <motion.div className="mx-auto mb-4 h-11 w-11 rounded-full border-4 border-[#3c096c]/20 border-t-[#3c096c]" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                Analyzing report...
              </motion.div>
            ) : status !== "done" ? (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8 rounded-2xl border border-[#eeeeee] bg-[#fafafa] p-8 text-center text-[#777777]">
                <FileText className="mx-auto mb-3 text-[#3c096c]" size={34} />
                Upload or enter a report to generate a result.
              </motion.div>
            ) : (
              <motion.div key="done" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 space-y-4">
                <motion.div initial={{ scale: 0.97 }} animate={{ scale: 1 }} className="rounded-2xl border border-[#3c096c]/20 bg-[#3c096c]/5 p-5">
                  <p className="text-sm font-medium text-[#3c096c]">Screening result</p>
                  <h3 className="mt-2 text-3xl font-semibold text-[#3c096c]">{result.risk}</h3>
                  <p className="mt-1 text-sm text-[#555555]">Confidence: {result.confidence}</p>
                </motion.div>
                <p className="rounded-2xl border border-[#eeeeee] p-4 text-sm leading-6 text-[#555555]">{result.note}</p>
                <div className="space-y-2">
                  {result.points.map((point, index) => (
                    <motion.div
                      key={point}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="flex items-center gap-2 text-sm text-[#333333]"
                    >
                      <CheckCircle2 className="text-[#3c096c]" size={17} /> {point}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div whileHover={{ scale: 1.01 }} className="mt-6 flex gap-2 rounded-2xl bg-[#fff7e8] p-4 text-sm text-[#7a4a00]">
            <AlertTriangle size={18} className="shrink-0" />
            Research use only. This does not replace a doctor’s diagnosis.
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

