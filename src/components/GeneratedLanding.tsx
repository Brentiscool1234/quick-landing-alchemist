
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
}

const GeneratedLanding: React.FC<GeneratedLandingProps> = ({ content, city, state, keywords }) => {
  return (
    <div className="w-full space-y-16 pb-16">
      {/* Hero Section */}
      <section className="space-y-6 reveal-animation">
        <Badge>
          {city}, {state}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {keywords[0]} Services in {city}
        </h1>
        <div className="flex flex-wrap gap-2 mt-4">
          {keywords.map((keyword, index) => (
            <Badge key={index} variant="secondary">
              {keyword}
            </Badge>
          ))}
        </div>
        <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl">
          {content.introduction}
        </p>
      </section>

      {/* Why Us Section */}
      <section className="space-y-6 reveal-animation">
        <div className="flex items-center space-x-2">
          <div className="h-px w-8 bg-primary/50"></div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-primary">Why Choose Us</h2>
        </div>
        <h3 className="text-3xl font-bold">Experience the Difference</h3>
        <p className="text-lg text-foreground/80 leading-relaxed">
          {content.whyUs}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card transition-all">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M15 9L9.5 14.5L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Local Expertise</h4>
            <p className="text-foreground/70">Deep understanding of {city}'s unique characteristics and requirements.</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card transition-all">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8L2 22M17.5 15H9M22 12L12 2L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Personalized Service</h4>
            <p className="text-foreground/70">Tailored solutions designed specifically for your needs in {state}.</p>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card transition-all">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7.5 12H16.5M13 7.5V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold mb-2">Innovation</h4>
            <p className="text-foreground/70">Cutting-edge approaches to {keywords[0]} challenges in {city}.</p>
          </div>
        </div>
      </section>

      {/* Things To Do Section */}
      <section className="space-y-6 reveal-animation">
        <div className="flex items-center space-x-2">
          <div className="h-px w-8 bg-primary/50"></div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-primary">Explore {city}</h2>
        </div>
        <h3 className="text-3xl font-bold">Things to Do in {city}, {state}</h3>
        <p className="text-lg text-foreground/80 leading-relaxed">
          {content.thingsToDo}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="rounded-xl overflow-hidden aspect-[4/3] bg-gradient-to-tr from-primary/5 to-primary/20 flex items-center justify-center">
            <p className="text-center text-primary/70 font-medium">Local image of {city} #1</p>
          </div>
          <div className="rounded-xl overflow-hidden aspect-[4/3] bg-gradient-to-bl from-primary/5 to-primary/20 flex items-center justify-center">
            <p className="text-center text-primary/70 font-medium">Local image of {city} #2</p>
          </div>
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
              <p className="text-foreground/70">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 text-center space-y-6 reveal-animation">
        <h3 className="text-3xl font-bold">Ready to Get Started?</h3>
        <p className="text-lg text-foreground/80 max-w-lg mx-auto">
          Contact us today to discuss your {keywords.join(", ")} needs in {city}, {state}.
        </p>
        <button className="mt-4 bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default GeneratedLanding;
