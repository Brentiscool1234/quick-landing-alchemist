
import React from 'react';
import { Badge } from './ui-custom/Badge';

interface GeneratedLandingProps {
  content: {
    introduction: string;
    whyUs: string;
    thingsToDo: string;
    faq: {
      question: string;
      answer: string;
    }[];
  };
  city: string;
  state: string;
  keywords: string[];
  companyName?: string;
}

const GeneratedLanding: React.FC<GeneratedLandingProps> = ({ content, city, state, keywords, companyName }) => {
  const businessName = companyName || 'Our Business';
  
  return (
    <div className="w-full space-y-16 pb-16">
      {/* Hero Section */}
      <section className="space-y-6 reveal-animation">
        <Badge>
          {city}, {state}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {businessName}: {keywords[0]} Services in {city}
        </h1>
        <div className="flex flex-wrap gap-2 mt-4">
          {keywords.map((keyword, index) => (
            <Badge key={index} variant="secondary">
              {keyword}
            </Badge>
          ))}
        </div>
        <div className="text-lg text-foreground/80 leading-relaxed max-w-3xl">
          {content.introduction}
        </div>
      </section>

      {/* Why Us Section */}
      <section className="space-y-6 reveal-animation">
        <div className="flex items-center space-x-2">
          <div className="h-px w-8 bg-primary/50"></div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-primary">Why Choose {businessName}</h2>
        </div>
        <h3 className="text-3xl font-bold">Experience the Difference</h3>
        <div className="text-lg text-foreground/80 leading-relaxed">
          {content.whyUs}
        </div>
      </section>

      {/* Things To Do Section */}
      <section className="space-y-6 reveal-animation">
        <div className="flex items-center space-x-2">
          <div className="h-px w-8 bg-primary/50"></div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-primary">Explore {city}</h2>
        </div>
        <h3 className="text-3xl font-bold">Things to Do in {city}, {state}</h3>
        <div className="text-lg text-foreground/80 leading-relaxed">
          {content.thingsToDo}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6 reveal-animation">
        <div className="flex items-center space-x-2">
          <div className="h-px w-8 bg-primary/50"></div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-primary">FAQ</h2>
        </div>
        <h3 className="text-3xl font-bold">Frequently Asked Questions</h3>
        <div className="space-y-6 mt-8">
          {content.faq.map((item, index) => (
            <div key={index} className="p-6 rounded-xl border border-border bg-card/50">
              <h4 className="text-xl font-semibold mb-2">{item.question}</h4>
              <div className="text-foreground/70">{item.answer}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 text-center space-y-6 reveal-animation">
        <h3 className="text-3xl font-bold">Ready to Get Started?</h3>
        <div className="text-lg text-foreground/80 max-w-lg mx-auto">
          Contact {businessName} today to discuss your {keywords.join(", ")} needs in {city}, {state}.
        </div>
      </section>
    </div>
  );
};

export default GeneratedLanding;
