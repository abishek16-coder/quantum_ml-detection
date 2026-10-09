"use client";

import * as React from "react";
import { Search, LayoutDashboard, Stethoscope, Activity, Settings, Cpu, Database, FlaskConical, PlayCircle, BrainCircuit, FileBarChart } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"; // Ensure we have this shadcn UI installed

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-ink-soft bg-cream-deep/30 hover:bg-cream-deep/60 border border-hairline rounded-lg transition-colors w-48 xl:w-64"
      >
        <Search size={14} />
        <span className="flex-1 text-left">Search MedQube...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-hairline bg-parchment px-1.5 font-mono text-[10px] font-medium text-ink-soft opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Basic fallback if click on mobile search icon */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-cream-deep/60 hover:bg-cream border border-hairline text-ink-soft transition-colors"
      >
        <Search size={14} />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => runCommand(() => router.push("/home"))}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard Home</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/data"))}>
              <Database className="mr-2 h-4 w-4" />
              <span>Data Management</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/screening"))}>
              <FlaskConical className="mr-2 h-4 w-4" />
              <span>Kernel Screening</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/training"))}>
              <PlayCircle className="mr-2 h-4 w-4" />
              <span>Experiment Studio</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Analysis">
            <CommandItem onSelect={() => runCommand(() => router.push("/results"))}>
              <FileBarChart className="mr-2 h-4 w-4" />
              <span>Results & Benchmarks</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/explainability"))}>
              <BrainCircuit className="mr-2 h-4 w-4" />
              <span>Explainability</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/predict"))}>
              <Stethoscope className="mr-2 h-4 w-4" />
              <span>Patient Diagnosis</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="System & Hardware">
            <CommandItem onSelect={() => runCommand(() => router.push("/hardware"))}>
              <Cpu className="mr-2 h-4 w-4" />
              <span>Quantum Hardware Status</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
