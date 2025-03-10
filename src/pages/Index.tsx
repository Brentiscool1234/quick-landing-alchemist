
import React from 'react';
import Header from '@/components/Header';
import LandingGenerator from '@/components/LandingGenerator';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20 container px-4 md:px-6">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center space-y-8 mb-16 reveal-animation">
          <div className="inline-flex items-center justify-center p-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium">
            AI-Powered Landing Pages
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Create Beautiful Landing Pages in <span className="text-primary">Seconds</span>
          </h1>
          
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Generate targeted, location-specific landing pages with AI. Just provide your keywords, city, and state.
          </p>
        </section>
        
        {/* Generator Component */}
        <LandingGenerator />
      </main>
      
      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-blue-400"></div>
              <span className="text-lg font-medium">LandingAI</span>
            </div>
            <p className="text-sm text-center text-foreground/60 max-w-md">
              Created with precision and care. Generate beautiful, targeted landing pages in seconds with the power of AI.
            </p>
            <div className="flex items-center space-x-4 text-foreground/60">
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
