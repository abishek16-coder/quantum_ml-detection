"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Cpu, Zap, Activity, CheckCircle2, AlertCircle, HelpCircle, ArrowRight, Play, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger 
} from "@/components/ui/tooltip";

export default function KernelScreeningPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const startScreening = () => {
    setIsRunning(true);
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 10;
      if (p >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsRunning(false);
          setIsComplete(true);
        }, 500);
      } else {
        setProgress(p);
      }
    }, 300);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-ink tracking-tight">Quantum Kernel Screening</h1>
          <p className="text-ink-soft mt-1">Geometric difference analysis (s_K) to determine if quantum kernels offer a theoretical advantage.</p>
        </div>
        {!isComplete && !isRunning && (
          <Button onClick={startScreening} className="bg-quantum text-parchment hover:opacity-90">
            <Play size={16} className="mr-2" /> Run Geometric Screening
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-ink-soft flex items-center gap-2">
              Dataset <Layers size={14}/>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-ink">Wisconsin Breast Cancer</div>
            <p className="text-xs text-ink-soft mt-1">8 Principal Components</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-ink-soft flex items-center gap-2">
              Classical Kernel <Activity size={14}/>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-ink">RBF (Radial Basis Function)</div>
            <p className="text-xs text-ink-soft mt-1">γ = 0.125</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-ink-soft flex items-center gap-2">
              Quantum Kernel <Cpu size={14}/>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-ink">Havlíček-ZZ (8 Qubit)</div>
            <p className="text-xs text-ink-soft mt-1">Depth 2, Linear Entanglement</p>
          </CardContent>
        </Card>
      </div>

      {isRunning && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center space-y-6">
          <div className="w-16 h-16 border-4 border-quantum/20 border-t-quantum rounded-full animate-spin mx-auto"></div>
          <div>
            <h2 className="text-xl font-serif text-ink">Computing Gram Matrices...</h2>
            <p className="text-ink-soft text-sm mt-1">Evaluating geometric difference between Hilbert spaces.</p>
          </div>
          <div className="max-w-md mx-auto">
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>
      )}

      {isComplete && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          <Card className="border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 size={24} /> 
                Verdict: Quantum Advantage Likely
              </CardTitle>
              <CardDescription className="text-emerald-800/80 dark:text-emerald-300/80">
                The geometric difference score (s_K) exceeds the threshold of 1.0, indicating the quantum feature space captures complex interactions that the classical RBF kernel cannot easily represent.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4">
                <div className="text-5xl font-mono font-bold text-emerald-700 dark:text-emerald-400">2.079</div>
                <div className="pb-1">
                  <div className="text-sm font-medium text-emerald-800 dark:text-emerald-300">Geometric Difference (s_K)</div>
                  <div className="text-xs text-emerald-700/70 dark:text-emerald-400/70">Threshold for advantage: &gt; 1.0</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-emerald-100/50 dark:bg-emerald-900/20 border-t border-emerald-200 dark:border-emerald-800/50">
              <div className="flex items-center gap-2 text-sm text-emerald-800 dark:text-emerald-300">
                <HelpCircle size={16} />
                <span>What does this mean? The quantum model has a theoretical edge on this specific dataset.</span>
              </div>
            </CardFooter>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Kernel Matrix Heatmap (Classical)</CardTitle>
                <CardDescription>RBF Kernel similarity matrix</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center bg-muted/20 rounded border border-dashed border-border">
                <span className="text-sm text-muted-foreground">[Recharts Heatmap Placeholder]</span>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Kernel Matrix Heatmap (Quantum)</CardTitle>
                <CardDescription>Havlíček-ZZ similarity matrix</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center bg-muted/20 rounded border border-dashed border-border">
                <span className="text-sm text-muted-foreground">[Recharts Heatmap Placeholder]</span>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end pt-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90">
              Proceed to Experiment Studio <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>

        </motion.div>
      )}
    </div>
  );
}
