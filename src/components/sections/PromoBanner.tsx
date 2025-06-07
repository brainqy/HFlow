
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Megaphone } from "lucide-react";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="py-8 md:py-12 bg-accent/10">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="bg-accent text-accent-foreground shadow-xl overflow-hidden">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Megaphone className="h-10 w-10 md:h-12 md:w-12 text-accent-foreground/80 shrink-0" />
              <div>
                <h3 className="font-headline text-xl md:text-2xl font-semibold">
                  New Telehealth Services Available!
                </h3>
                <p className="text-sm md:text-base text-accent-foreground/90 mt-1">
                  Consult with our expert doctors from the comfort of your home. Book your virtual appointment today.
                </p>
              </div>
            </div>
            <Button
              variant="default"
              size="lg"
              asChild
              className="bg-background text-foreground hover:bg-background/90 mt-4 md:mt-0 shrink-0 w-full sm:w-auto"
            >
              <Link href="/appointments?service=telehealth">Book Telehealth</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
