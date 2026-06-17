"use client";

import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { DemoSection } from "@/components/landing/DemoSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TechSection } from "@/components/landing/TechSection";
import { CTAFooter } from "@/components/landing/CTAFooter";
import { ScrollArea } from "@/components/ui/scroll-area";

const LandingPage = () => {
  return (
    <ScrollArea className="h-screen w-full">
      <main className="relative w-full overflow-x-hidden bg-background text-foreground">
        <Navbar />
        <HeroSection />
        <DemoSection />
        <FeaturesSection />
        <TechSection />
        <CTAFooter />
      </main>
    </ScrollArea>
  );
};

export default LandingPage;
