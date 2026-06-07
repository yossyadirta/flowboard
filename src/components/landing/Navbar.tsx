import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-4 transition-all md:px-12 lg:px-24 ${scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
        }`}
    >
      <div className="flex items-center gap-2.5">
        <Image src="/logo.svg" alt="Flowboard" width={24} height={24} />
        <span className="text-lg font-semibold tracking-tight">Flowboard</span>
      </div>
      <div className="hidden items-center gap-6 md:flex">
        <a
          href="#demo"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Demo
        </a>
        <a
          href="#features"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Features
        </a>
        <a
          href="#tech"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Architecture
        </a>
      </div>
      <Button asChild size="sm" className="gap-1.5">
        <Link href="/app" target="_blank" rel="noopener noreferrer">
          Launch App
          <ArrowRight className="size-3.5" />
        </Link>
      </Button>
    </motion.nav>
  );
};
