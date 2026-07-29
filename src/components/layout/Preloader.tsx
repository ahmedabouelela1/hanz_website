"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { brandAssets, siteMeta } from "@/lib/site";

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const markH = 56;
  const markW = Math.round(markH * (brandAssets.markSize.width / brandAssets.markSize.height));
  const wordH = 44;
  const wordW = Math.round(wordH * (brandAssets.wordmarkSize.width / brandAssets.wordmarkSize.height));

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] grid place-items-center bg-paper"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <Image
                src={brandAssets.mark}
                alt=""
                aria-hidden
                width={markW}
                height={markH}
                priority
                className="h-14 w-auto object-contain"
              />
              <Image
                src={brandAssets.wordmark}
                alt={siteMeta.name}
                width={wordW}
                height={wordH}
                priority
                className="h-11 w-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 72 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="h-[2px] bg-accent"
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-steel-500">
              Loading
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
