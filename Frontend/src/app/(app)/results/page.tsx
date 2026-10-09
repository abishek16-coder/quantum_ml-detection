"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Activity, BarChart3, PieChart, Download, FileText, CheckCircle2, 
  AlertTriangle, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const LEADERBOARD = [
  { name: "XGBoost", type: "Classical", acc: 95.61, sens: 94.2, spec: 96.8, f1: 95.1, auc: 0.982 },
  { name: "SVM (RBF)", type: "Classical", acc: 98.24, sens: 97.1, spec: 99.0, f1: 97.8, auc: 0.991 },
  { name: "Quantum Kernel SVM", type: "Quantum", acc: 92.10, sens: 89.5, spec: 94.2, f1: 91.2, auc: 0.965 },
  { name: "VQC (Transfinite-1)", type: "Quantum", acc: 87.87, sens: 85.0, spec: 90.1, f1: 86.4, auc: 0.942 },
];

export default function ResultsPage() {
  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-ink tracking-tight">Results & Benchmarks</h1>
          <p className="text-ink-soft mt-1">Experiment ID: EXP-WDBC-8Q-001 • Dataset: Wisconsin Breast Cancer</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download size={16} className="mr-2"/> Export CSV</Button>
          <Button variant="outline"><FileText size={16} className="mr-2"/> Export PDF</Button>
        </div>
      </div>

      {/* Honest Summary Banner */}
      <Card className="border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20">
        <CardContent className="p-4 flex gap-4 items-start">
          <Info className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Where Quantum Helped / Where it Didn't</h3>
            <p className="text-sm text-blue-800/80 dark:text-blue-200/80 mt-1">
              On the full dataset (569 samples), classical models (SVM, XGBoost) significantly outperformed quantum models. 
              However, in the <strong>scarce data regime</strong> (training on only 10-15% of the data), the Quantum VQC demonstrated a statistically significant advantage (p &lt; 0.05), outperforming classical baselines by up to 10.7% in accuracy.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Model Leaderboard</CardTitle>
            <CardDescription>Metrics evaluated on the held-out test set (20% split).</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Accuracy</TableHead>
                  <TableHead className="text-right">F1 Score</TableHead>
                  <TableHead className="text-right">AUC</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LEADERBOARD.map((m, i) => (
                  <TableRow key={i} className={i === 1 ? "bg-emerald-50/50 dark:bg-emerald-950/20" : ""}>
                    <TableCell className="font-medium">
                      {m.name}
                      {i === 1 && <Badge variant="outline" className="ml-2 bg-emerald-100 text-emerald-800 border-emerald-200">Best</Badge>}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={m.type === 'Quantum' ? 'bg-quantum/10 text-quantum' : ''}>
                        {m.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">{m.acc.toFixed(2)}%</TableCell>
                    <TableCell className="text-right font-mono">{m.f1.toFixed(1)}</TableCell>
                    <TableCell className="text-right font-mono">{m.auc.toFixed(3)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistical Significance</CardTitle>
            <CardDescription>McNemar's Test (Classical vs Quantum)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 border border-border rounded-lg">
              <div className="text-xs text-ink-soft">SVM vs VQC</div>
              <div className="text-lg font-mono font-semibold text-ink">p &lt; 0.001</div>
              <div className="text-xs text-emerald-600 font-medium mt-1">Classical is significantly better</div>
            </div>
            <div className="p-3 border border-border rounded-lg">
              <div className="text-xs text-ink-soft">XGBoost vs QSVM</div>
              <div className="text-lg font-mono font-semibold text-ink">p = 0.042</div>
              <div className="text-xs text-amber-600 font-medium mt-1">Marginally significant</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity size={18}/> ROC Curves</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-muted/10 rounded border border-dashed border-border">
            <span className="text-sm text-muted-foreground">[Recharts ROC Curve Placeholder]</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><PieChart size={18}/> Confusion Matrix (Best Model)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-muted/10 rounded border border-dashed border-border">
            <span className="text-sm text-muted-foreground">[Recharts Confusion Matrix Placeholder]</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
