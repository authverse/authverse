"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy, ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const command = "npx authverse@latest init";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full min-h-[90vh] bg-background text-foreground dark:text-white flex items-center justify-center overflow-hidden transition-colors duration-300">
      {/* Background Gradient / Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            v1.0.0 — First Stable Release
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
            {/* Modern Authentication for{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">
              Modern Apps
            </span> */}
            Build Authentication the Modern Way.
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl">
            Stop wasting time wiring auth from scratch. With Authverse, you get
            a fully generated authentication system Better Auth config, OAuth
            providers, database setup Prisma/Drizzle, and beautiful ShadCN
            screens. All done automatically with a single command.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 px-8"
            >
              <Link href="/docs">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800 dark:hover:border-gray-600 px-8"
            >
              <Link href="/docs">View Docs</Link>
            </Button>
          </div>
        </motion.div>

        {/* Code Snippet Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-lg mx-auto lg:mr-0"
        >
          <div className="relative rounded-xl bg-gray-900 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
            {/* Window Controls */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 dark:bg-gray-900/50 border-b border-gray-700 dark:border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="ml-auto text-xs text-gray-400 dark:text-gray-500 font-mono">
                bash
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm group relative">
              <div className="flex items-center gap-3 text-gray-300">
                <span className="text-blue-400 select-none">$</span>
                <span className="flex-1">npx authverse@latest init</span>
              </div>

              <div className="mt-4 space-y-2 opacity-50 select-none text-xs">
                <p className="text-gray-400">Installing dependencies...</p>
                <p className="text-green-400">✔ Choose Your ORM: Prisma</p>
                <p className="text-green-400">✔ Select Database: Postgresql</p>
                <p className="text-blue-400">
                  ✔ Do you want to include auth UI design? (Y/n)
                </p>
              </div>

              {/* Copy Button */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy command</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Elements (Decoration) */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
