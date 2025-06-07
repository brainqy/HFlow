
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { TrustSignal } from '@/types';

interface TrustSignalsProps {
  signals: TrustSignal[];
}

export default function TrustSignals({ signals }: TrustSignalsProps) {
  if (!signals || signals.length === 0) {
    return null;
  }

  const partners = signals.filter(s => s.type === 'partner');
  const certifications = signals.filter(s => s.type === 'certification');
  const featuredIn = signals.filter(s => s.type === 'featured');

  const SignalCard = ({ signal }: { signal: TrustSignal }) => (
    <Card className="flex items-center justify-center p-4 h-32 transition-shadow hover:shadow-lg bg-card/50">
      <Link href={signal.url || '#'} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
        <Image
          src={signal.imageUrl}
          alt={signal.name}
          data-ai-hint={signal.dataAiHint}
          fill
          style={{ objectFit: 'contain' }}
          className="opacity-75 hover:opacity-100 transition-opacity"
        />
      </Link>
    </Card>
  );

  const renderSection = (title: string, items: TrustSignal[]) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-10">
        <h3 className="font-headline text-2xl font-semibold text-center text-primary mb-6">{title}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {items.map(item => <SignalCard key={item.id} signal={item} />)}
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-headline text-3xl font-bold text-center mb-12 text-foreground">
          Trusted & Recognized
        </h2>
        
        {renderSection("Our Elite Partners", partners)}
        {renderSection("Certifications & Awards", certifications)}
        {renderSection("As Featured In", featuredIn)}
        
      </div>
    </section>
  );
}
