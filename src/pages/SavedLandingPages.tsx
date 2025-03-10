
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { useLandingPages } from '@/contexts/LandingPagesContext';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui-custom/Button';
import { Badge } from '@/components/ui-custom/Badge';
import { useToast } from '@/hooks/use-toast';

const SavedLandingPages = () => {
  const { landingPages, removeLandingPage } = useLandingPages();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    removeLandingPage(id);
    toast({
      title: "Page Deleted",
      description: "The landing page has been removed from your saved pages.",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 pb-20 container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Saved Landing Pages</h1>
            <Link to="/">
              <Button variant="outline">Create New Page</Button>
            </Link>
          </div>

          {landingPages.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-card/50">
              <h2 className="text-xl font-medium mb-2">No Saved Pages</h2>
              <p className="text-muted-foreground mb-4">Start by creating your first landing page.</p>
              <Link to="/">
                <Button>Create Landing Page</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {landingPages.map((page) => (
                <div key={page.id} className="p-4 border rounded-lg bg-card/50 hover:bg-card/80 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-medium mb-1">
                        {page.keywords[0]} in {page.city}, {page.state}
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {page.keywords.map((keyword, i) => (
                          <Badge key={i} variant="secondary">{keyword}</Badge>
                        ))}
                        <Badge>{page.tone}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Created {formatDistanceToNow(new Date(page.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/view-page/${page.id}`}>
                        <Button size="sm" variant="outline">View</Button>
                      </Link>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDelete(page.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SavedLandingPages;
