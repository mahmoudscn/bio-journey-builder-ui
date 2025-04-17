
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Upload, 
  Menu,
  X
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileHeaderProps {
  title: string;
  onOpenSidebar: () => void;
  onExport: () => void;
  onImportClick: () => void;
}

export function MobileHeader({ 
  title, 
  onOpenSidebar, 
  onExport, 
  onImportClick 
}: MobileHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full py-2 px-3 border-b md:hidden">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </Button>
        <h1 className="text-lg font-bold truncate">{title}</h1>
      </div>
      
      <div className="flex items-center gap-1">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Upload size={16} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Import Roadmap Data</SheetTitle>
              <SheetDescription>
                Upload a JSON file or use the desktop version for more options.
              </SheetDescription>
            </SheetHeader>
            <div className="flex justify-center mt-4">
              <Button onClick={onImportClick}>
                Select File
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onExport}
        >
          <Download size={16} />
        </Button>
        
        <ThemeToggle />
      </div>
    </div>
  );
}
