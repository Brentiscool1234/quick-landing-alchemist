
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LandingPage } from '@/models/LandingPage';

interface LandingPagesContextType {
  landingPages: LandingPage[];
  addLandingPage: (landingPage: LandingPage) => void;
  removeLandingPage: (id: string) => void;
  getLandingPage: (id: string) => LandingPage | undefined;
}

const LandingPagesContext = createContext<LandingPagesContextType | undefined>(undefined);

export const useLandingPages = () => {
  const context = useContext(LandingPagesContext);
  if (!context) {
    throw new Error('useLandingPages must be used within a LandingPagesProvider');
  }
  return context;
};

export const LandingPagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [landingPages, setLandingPages] = useState<LandingPage[]>(() => {
    const saved = localStorage.getItem('landingPages');
    if (saved) {
      try {
        // Convert string dates back to Date objects
        const parsed = JSON.parse(saved);
        return parsed.map((page: any) => ({
          ...page,
          createdAt: new Date(page.createdAt)
        }));
      } catch (e) {
        console.error('Failed to parse saved landing pages', e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('landingPages', JSON.stringify(landingPages));
  }, [landingPages]);

  const addLandingPage = (landingPage: LandingPage) => {
    setLandingPages(prev => [landingPage, ...prev]);
  };

  const removeLandingPage = (id: string) => {
    setLandingPages(prev => prev.filter(page => page.id !== id));
  };

  const getLandingPage = (id: string) => {
    return landingPages.find(page => page.id === id);
  };

  return (
    <LandingPagesContext.Provider value={{ landingPages, addLandingPage, removeLandingPage, getLandingPage }}>
      {children}
    </LandingPagesContext.Provider>
  );
};
