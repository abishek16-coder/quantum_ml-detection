"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Database, Cpu, Settings, Play, ChevronRight, CheckCircle2, 
  Activity, Zap, Terminal, XCircle, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const MODELS = [
  { id: "svm", name: "Classical SVM (RBF)", type: "classical", desc: "Radial Basis Function Support Vector Machine" },
  { id: "xgb", name: "XGBoost", type: "classical", desc: "Gradient Boosted Decision Trees" },
  { id: "qsvm", name: "Quantum Kernel SVM", type: "quantum", desc: "Havlíček-ZZ kernel mapped to classical SVM" },
  { id: "vqc", name: "Variational Quantum Classifier", type: "quantum", desc: "8-Qubit StronglyEntanglingLayers" }
];

export default function TrainingStudioPage() {
  const [step, setStep] = useState(1);
  const [selectedModels, setSelectedModels] = useState<string[]>(["svm", "vqc"]);
  const [backend, setBackend] = useState("simulator");
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const toggleModel = (id: string) => {
    if (selectedModels.includes(id)) {
      setSelectedModels(selectedModels.filter(m => m !== id));
    } else {
      setSelectedModels([...selectedModels, id]);
    }
  };

  const startTraining = () => {
    setIsTraining(true);
    setStep(4);
    setProgress(0);
    setLogs(["[System] Initializing training environment...", "[System] Loading dataset: WDBC (569 samples)"]);
    
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 5;
      if (p >= 100) {
        setProgress(100);
        setLogs(prev => [...prev, "[System] Training complete. Models serialized to artifacts_v1/."]);
        clearInterval(interval);
        setTimeout(() => setIsTraining(false), 1000);
      } else {
        setProgress(p);
        if (Math.random() > 0.7) {
          const newLog = `[Epoch ${Math.floor(p/5)}] VQC Loss: ${(1 - p/100).toFixed(4)} | Accuracy: ${(p * 0.8).toFixed(1)}%`;
          setLogs(prev => [...prev.slice(-4), newLog]);
        }
      }
    }, 400);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto min-h-screen">
      <div>
        <h1 className="text-3xl font-serif text-ink tracking-tight">Experiment Studio</h1>
        <p className="text-ink-soft mt-1">Configure and train classical baselines and hybrid quantum models side-by-side.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8 text-sm overflow-x-auto pb-2">
        <div className={`px-3 py-1 rounded-full font-medium whitespace-nowrap ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>1. Dataset</div>
        <ChevronRight size={16} className="text-muted-foreground shrink-0" />
        <div className={`px-3 py-1 rounded-full font-medium whitespace-nowrap ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>2. Models</div>
        <ChevronRight size={16} className="text-muted-foreground shrink-0" />
        <div className={`px-3 py-1 rounded-full font-medium whitespace-nowrap ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>3. Backend</div>
        <ChevronRight size={16} className="text-muted-foreground shrink-0" />
        <div className={`px-3 py-1 rounded-full font-medium whitespace-nowrap ${step >= 4 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>4. Execution</div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Database size={20}/> Select Dataset</CardTitle>
                <CardDescription>Choose a preprocessed dataset from the Data Management module.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-primary bg-primary/5 rounded-lg flex items-center justify-between cursor-pointer">
                  <div>
                    <h4 className="font-semibold text-ink">Wisconsin Breast Cancer (WDBC)</h4>
                    <p className="text-sm text-ink-soft">569 samples • 8 PCA components • Target: Diagnosis</p>
                  </div>
                  <CheckCircle2 className="text-primary" />
                </div>
                <div className="p-4 border border-border rounded-lg flex items-center justify-between opacity-50">
                  <div>
                    <h4 className="font-semibold text-ink">Heart Disease (Cleveland)</h4>
                    <p className="text-sm text-ink-soft">303 samples • Not yet preprocessed</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={() => setStep(2)}>Next: Choose Models <ChevronRight size={16} className="ml-1"/></Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Cpu size={20}/> Select Models</CardTitle>
                <CardDescription>Select at least one classical and one quantum model for fair comparison.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                {MODELS.map(m => (
                  <div 
                    key={m.id} 
                    onClick={() => toggleModel(m.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedModels.includes(m.id) ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-ink">{m.name}</h4>
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${m.type === 'quantum' ? 'bg-quantum/20 text-quantum' : 'bg-muted text-muted-foreground'}`}>
                        {m.type}
                      </span>
                    </div>
                    <p className="text-sm text-ink-soft">{m.desc}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)} disabled={selectedModels.length === 0}>Next: Backend <ChevronRight size={16} className="ml-1"/></Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Settings size={20}/> Execution Backend</CardTitle>
                <CardDescription>Choose where the quantum circuits will be executed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div onClick={() => setBackend("simulator")} className={`p-4 border rounded-lg cursor-pointer ${backend === 'simulator' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <h4 className="font-semibold mb-1">Statevector Simulator</h4>
                    <p className="text-xs text-ink-soft">PennyLane default.qubit. Fast, noiseless, ideal for development.</p>
                  </div>
                  <div onClick={() => setBackend("noise")} className={`p-4 border rounded-lg cursor-pointer ${backend === 'noise' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <h4 className="font-semibold mb-1">Noise Model</h4>
                    <p className="text-xs text-ink-soft">Qiskit Aer with fake backend noise profile (e.g., IBM Cairo).</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg opacity-50 cursor-not-allowed relative">
                    <div className="absolute top-2 right-2 text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Locked</div>
                    <h4 className="font-semibold mb-1">Real IBM QPU</h4>
                    <p className="text-xs text-ink-soft">Execute on physical hardware. Requires queue time.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-4">
                  <h4 className="font-medium text-sm">Advanced Hyperparameters (VQC)</h4>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Label>Learning Rate</Label>
                        <span className="text-xs font-mono text-ink-soft">0.01</span>
                      </div>
                      <Slider defaultValue={[0.01]} max={0.1} step={0.001} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Label>Epochs</Label>
                        <span className="text-xs font-mono text-ink-soft">100</span>
                      </div>
                      <Slider defaultValue={[100]} max={500} step={10} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={startTraining} className="bg-quantum text-parchment hover:opacity-90">
                  <Play size={16} className="mr-2"/> Start Training
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {isTraining ? <Activity className="animate-pulse text-quantum" /> : <CheckCircle2 className="text-emerald-500" />}
                    {isTraining ? "Training in Progress..." : "Training Complete"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">Overall Progress</span>
                      <span className="font-mono">{Math.floor(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/30 rounded border border-border">
                      <div className="text-xs text-ink-soft mb-1">Current Model</div>
                      <div className="font-medium text-sm">Variational Quantum Classifier</div>
                    </div>
                    <div className="p-3 bg-muted/30 rounded border border-border">
                      <div className="text-xs text-ink-soft mb-1">Estimated Time</div>
                      <div className="font-medium text-sm flex items-center gap-1"><Clock size={14}/> {isTraining ? "1m 12s remaining" : "Done"}</div>
                    </div>
                  </div>
                </CardContent>
                {!isTraining && (
                  <CardFooter>
                    <Button className="w-full">View Results & Benchmarks</Button>
                  </CardFooter>
                )}
              </Card>
            </div>

            <div className="md:col-span-1">
              <Card className="h-full bg-slate-950 text-slate-300 border-slate-800">
                <CardHeader className="pb-2 border-b border-slate-800">
                  <CardTitle className="text-sm flex items-center gap-2 font-mono"><Terminal size={14}/> Live Logs</CardTitle>
                </CardHeader>
                <CardContent className="p-4 font-mono text-xs space-y-2 h-[300px] overflow-y-auto">
                  {logs.map((log, i) => (
                    <div key={i} className="opacity-90">{log}</div>
                  ))}
                  {isTraining && <div className="animate-pulse">_</div>}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
