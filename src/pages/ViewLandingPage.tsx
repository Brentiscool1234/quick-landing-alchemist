
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { useLandingPages } from '@/contexts/LandingPagesContext';
import GeneratedLanding from '@/components/GeneratedLanding';
import { Button } from '@/components/ui-custom/Button';
import { useToast } from '@/hooks/use-toast';
import { downloadFile, generateTextFile, generateHtmlFile } from '@/utils/exportUtils';

const ViewLandingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLandingPage, removeLandingPage } = useLandingPages();
  const { toast } = useToast();
  
  const landingPage = id ? getLandingPage(id) : undefined;
  
  if (!landingPage) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-20 container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
            <p className="mb-6">The landing page you're looking for doesn't exist or has been removed.</p>
            <Link to="/saved-pages">
              <Button>View All Saved Pages</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  const handleDelete = () => {
    if (id) {
      removeLandingPage(id);
      toast({
        title: "Page Deleted",
        description: "The landing page has been removed from your saved pages.",
      });
      navigate("/saved-pages");
    }
  };
  
  const handleDownloadText = () => {
    const textContent = generateTextFile(landingPage.content, landingPage.city, landingPage.state, landingPage.keywords);
    const filename = `${landingPage.city}-${landingPage.state}-${landingPage.keywords[0]}.txt`.toLowerCase().replace(/\s+/g, '-');
    downloadFile(textContent, filename);
    
    toast({
      title: "Downloaded",
      description: "Text file has been downloaded successfully.",
    });
  };

  const handleDownloadHTML = () => {
    const htmlContent = generateHtmlFile(landingPage.content, landingPage.city, landingPage.state, landingPage.keywords);
    const filename = `${landingPage.city}-${landingPage.state}-${landingPage.keywords[0]}.html`.toLowerCase().replace(/\s+/g, '-');
    downloadFile(htmlContent, filename);
    
    toast({
      title: "Downloaded",
      description: "HTML file has been downloaded successfully.",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20 container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link to="/saved-pages">
              <Button variant="outline">← Back to Saved Pages</Button>
            </Link>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleDelete}>
                Delete Page
              </Button>
            </div>
          </div>
          
          <GeneratedLanding 
            content={landingPage.content} 
            city={landingPage.city} 
            state={landingPage.state} 
            keywords={landingPage.keywords}
          />
          
          <div className="mt-8 flex justify-center space-x-4 flex-wrap gap-4">
            <Button variant="outline" onClick={handleDownloadText}>
              Download as Text
            </Button>
            <Button variant="outline" onClick={handleDownloadHTML}>
              Download as HTML
            </Button>
            <Button onClick={() => window.print()}>
              Save as PDF
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewLandingPage;
