"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  BrainCircuit, Activity, User, AlertTriangle, Info, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function ExplainabilityPage() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const runPrediction = () => {
    setIsPredicting(true);
    setTimeout(() => {
      setIsPredicting(false);
      setHasResult(true);
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto min-h-screen">
      <div>
        <h1 className="text-3xl font-serif text-ink tracking-tight">Explainability & Prediction</h1>
        <p className="text-ink-soft mt-1">Understand why models make specific predictions using SHAP and Quantum Gate Attribution.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User size={18}/> Single Patient Explorer</CardTitle>
            <CardDescription>Enter biomarker values for a new prediction.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Radius Mean</Label>
              <Input type="number" defaultValue="17.99" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label>Texture Mean</Label>
              <Input type="number" defaultValue="10.38" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label>Perimeter Mean</Label>
              <Input type="number" defaultValue="122.8" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label>Area Mean</Label>
              <Input type="number" defaultValue="1001" step="1" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={runPrediction} disabled={isPredicting} className="w-full bg-quantum text-parchment">
              {isPredicting ? "Running Inference..." : "Predict & Explain"}
            </Button>
          </CardFooter>
        </Card>

        {/* Results Area */}
        <div className="lg:col-span-2 space-y-6">
          {!hasResult && !isPredicting && (
            <div className="h-full min-h-[400px] border border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-muted/5">
              <BrainCircuit size={48} className="mb-4 opacity-20" />
              <p>Enter patient data and run prediction to see explanations.</p>
            </div>
          )}

          {isPredicting && (
            <div className="h-full min-h-[400px] border border-border rounded-xl flex flex-col items-center justify-center bg-parchment">
              <div className="w-12 h-12 border-4 border-quantum/20 border-t-quantum rounded-full animate-spin mb-4"></div>
              <p className="text-ink font-medium">Executing Quantum Circuit & SHAP...</p>
            </div>
          )}

          {hasResult && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              
              {/* Disclaimer */}
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-3 rounded-lg flex gap-3 text-sm text-amber-800 dark:text-amber-200">
                <AlertTriangle size={18} className="shrink-0" />
                <p><strong>Research Use Only:</strong> This is not a medical device. Predictions are for research and educational purposes only.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-red-200 dark:border-red-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quantum VQC Prediction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-serif font-bold text-red-600 dark:text-red-400 mb-2">Malignant</div>
                    <div className="flex items-center gap-2 text-sm text-ink-soft mb-1">
                      <span>Confidence: 87.4%</span>
                    </div>
                    <Progress value={87.4} className="h-2 bg-red-100 dark:bg-red-950" />
                  </CardContent>
                </Card>

                <Card className="border-red-200 dark:border-red-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Classical SVM Prediction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-serif font-bold text-red-600 dark:text-red-400 mb-2">Malignant</div>
                    <div className="flex items-center gap-2 text-sm text-ink-soft mb-1">
                      <span>Confidence: 94.1%</span>
                    </div>
                    <Progress value={94.1} className="h-2 bg-red-100 dark:bg-red-950" />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Feature Attribution Comparison</CardTitle>
                  <CardDescription>Comparing SHAP values (Classical) vs Gate Ablation (Quantum)</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center bg-muted/10 rounded border border-dashed border-border">
                  <span className="text-sm text-muted-foreground">[Recharts Waterfall / Bar Chart Placeholder]</span>
                </CardContent>
              </Card>

            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
