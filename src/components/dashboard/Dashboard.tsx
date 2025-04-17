
import React, { useState, useRef } from 'react';
import { useRoadmap } from '@/context/RoadmapContext';
import { MilestoneList } from '@/components/milestone/MilestoneList';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Upload, 
  Info,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';

export function Dashboard() {
  const { roadmap, exportData, importData } = useRoadmap();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importedData, setImportedData] = useState<string>('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  // Auto-close sidebar on mobile
  React.useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);
  
  const completedResourcesCount = roadmap.milestones.reduce(
    (count, milestone) => count + milestone.resources.filter(r => r.completed).length, 
    0
  );
  
  const totalResourcesCount = roadmap.milestones.reduce(
    (count, milestone) => count + milestone.resources.length, 
    0
  );
  
  const favoriteResourcesCount = roadmap.milestones.reduce(
    (count, milestone) => count + milestone.resources.filter(r => r.favorite).length, 
    0
  );
  
  const handleExport = () => {
    const jsonString = exportData();
    
    // Create a blob and download it
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bioinformatics-roadmap.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: "Your roadmap data has been exported as JSON.",
    });
  };
  
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        setImportedData(content);
        setJsonError(null);
      } catch (err) {
        console.error("Error reading file:", err);
        setJsonError("Could not read the file properly");
      }
    };
    
    reader.readAsText(file);
  };
  
  const handleImportData = () => {
    try {
      importData(importedData);
      setImportedData('');
      setJsonError(null);
    } catch (err) {
      console.error("Error importing data:", err);
      setJsonError("Invalid JSON format. Please check your data.");
    }
  };
  
  const validateJson = (jsonString: string): boolean => {
    try {
      JSON.parse(jsonString);
      setJsonError(null);
      return true;
    } catch (err) {
      setJsonError("Invalid JSON format. Please check your data.");
      return false;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-2 md:p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1 md:gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
            </Button>
            <h1 className="text-lg md:text-2xl font-bold truncate">Bioinformatics Roadmap</h1>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".json"
              onChange={handleFileChange}
            />
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 hidden sm:flex">
                  <Upload size={16} /> Import
                </Button>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="sm:hidden">
                  <Upload size={16} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Import Roadmap Data</SheetTitle>
                  <SheetDescription>
                    Paste your JSON data below or upload a file.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="py-4 space-y-4">
                  <Textarea
                    value={importedData}
                    onChange={(e) => {
                      setImportedData(e.target.value);
                      if (e.target.value) {
                        validateJson(e.target.value);
                      } else {
                        setJsonError(null);
                      }
                    }}
                    placeholder="Paste your JSON data here..."
                    className="min-h-[200px]"
                  />
                  
                  {jsonError && (
                    <p className="text-sm text-destructive">{jsonError}</p>
                  )}
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Or</p>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={handleImportClick}
                    >
                      Upload JSON File
                    </Button>
                  </div>
                </div>
                
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </SheetClose>
                  <Button 
                    onClick={handleImportData}
                    disabled={!importedData || !!jsonError}
                  >
                    Import Data
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 hidden sm:flex" 
              onClick={handleExport}
            >
              <Download size={16} /> Export
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="sm:hidden" 
              onClick={handleExport}
            >
              <Download size={16} />
            </Button>
            
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex">
        {/* Sidebar - now using conditional rendering and positioning for mobile */}
        {isSidebarOpen && (
          <aside className={`w-72 border-r bg-muted/40 p-4 space-y-4 overflow-y-auto ${isMobile ? 'fixed left-0 top-16 bottom-0 z-40 animate-slide-right' : 'relative'}`}>
            <div>
              <h2 className="text-lg font-semibold mb-2">Roadmap Overview</h2>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Milestones</p>
                    <p className="text-2xl font-bold">{roadmap.milestones.length}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Resources</p>
                    <p className="text-2xl font-bold">{totalResourcesCount}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl font-bold">
                        {totalResourcesCount > 0 
                          ? Math.round((completedResourcesCount / totalResourcesCount) * 100) 
                          : 0}%
                      </p>
                      <Badge variant="outline">
                        {completedResourcesCount}/{totalResourcesCount}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Favorites</p>
                    <p className="text-xl font-bold">{favoriteResourcesCount}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-sm text-muted-foreground mb-2">
                This interactive roadmap helps you organize your bioinformatics learning journey.
              </p>
              <p className="text-sm text-muted-foreground">
                Add milestones, resources, and track your progress as you learn.
              </p>
              
              <div className="mt-4 pt-2 border-t">
                <p className="text-xs text-muted-foreground flex items-center">
                  <Info size={12} className="mr-1" /> Data is stored locally in your browser.
                </p>
              </div>
            </div>
            
            {/* Add close button for mobile */}
            {isMobile && (
              <Button 
                className="absolute top-2 right-2" 
                variant="ghost" 
                size="sm"
                onClick={() => setIsSidebarOpen(false)}
              >
                ✕
              </Button>
            )}
          </aside>
        )}
        
        {/* Main Content */}
        <main className={`flex-1 p-3 md:p-6 overflow-y-auto ${isSidebarOpen && !isMobile ? 'md:ml-0' : 'w-full'}`}>
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card rounded-lg shadow p-3 md:p-6">
              <div className="mb-4 md:mb-6">
                <h1 className="text-xl md:text-3xl font-bold">{roadmap.title}</h1>
                <p className="text-muted-foreground mt-2">{roadmap.description}</p>
              </div>
              
              <MilestoneList />
            </div>
          </div>
        </main>
      </div>
      
      {/* Mobile overlay when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
