
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Milestone, Resource, RoadmapData } from '@/types/roadmap';
import { initialRoadmapData } from '@/data/sampleRoadmap';
import { useToast } from '@/components/ui/use-toast';

interface RoadmapContextType {
  roadmap: RoadmapData;
  setRoadmap: React.Dispatch<React.SetStateAction<RoadmapData>>;
  addMilestone: (milestone: Omit<Milestone, 'id' | 'resources'>) => void;
  updateMilestone: (id: string, milestone: Partial<Milestone>) => void;
  deleteMilestone: (id: string) => void;
  moveMilestone: (fromIndex: number, toIndex: number) => void;
  addResource: (milestoneId: string, resource: Omit<Resource, 'id'>) => void;
  updateResource: (milestoneId: string, resourceId: string, resource: Partial<Resource>) => void;
  deleteResource: (milestoneId: string, resourceId: string) => void;
  toggleMilestoneExpansion: (id: string) => void;
  toggleResourceCompletion: (milestoneId: string, resourceId: string) => void;
  toggleResourceFavorite: (milestoneId: string, resourceId: string) => void;
  exportData: () => string;
  importData: (jsonData: string) => void;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export const RoadmapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roadmap, setRoadmap] = useState<RoadmapData>(initialRoadmapData);
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('bioinformatics-roadmap');
    if (savedData) {
      try {
        setRoadmap(JSON.parse(savedData));
      } catch (err) {
        console.error("Error loading roadmap data from localStorage:", err);
        toast({
          title: "Error Loading Data",
          description: "Could not load saved data. Using default roadmap.",
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bioinformatics-roadmap', JSON.stringify(roadmap));
  }, [roadmap]);

  // Generate a unique ID (simple implementation)
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  // Add a new milestone
  const addMilestone = (milestone: Omit<Milestone, 'id' | 'resources'>) => {
    const newMilestone: Milestone = {
      ...milestone,
      id: generateId(),
      resources: [],
      isExpanded: true
    };
    
    setRoadmap(prev => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone]
    }));
    
    toast({
      title: "Milestone Added",
      description: `"${milestone.title}" has been added to your roadmap.`
    });
  };

  // Update an existing milestone
  const updateMilestone = (id: string, milestone: Partial<Milestone>) => {
    setRoadmap(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => 
        m.id === id 
          ? { ...m, ...milestone } 
          : m
      )
    }));
  };

  // Delete a milestone
  const deleteMilestone = (id: string) => {
    setRoadmap(prev => ({
      ...prev,
      milestones: prev.milestones.filter(m => m.id !== id)
    }));
    
    toast({
      title: "Milestone Deleted",
      description: "The milestone has been removed from your roadmap."
    });
  };

  // Move a milestone (reorder)
  const moveMilestone = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    
    setRoadmap(prev => {
      const newMilestones = [...prev.milestones];
      const [movedItem] = newMilestones.splice(fromIndex, 1);
      newMilestones.splice(toIndex, 0, movedItem);
      
      return {
        ...prev,
        milestones: newMilestones
      };
    });
  };

  // Add a resource to a milestone
  const addResource = (milestoneId: string, resource: Omit<Resource, 'id'>) => {
    const newResource: Resource = {
      ...resource,
      id: generateId(),
      completed: false,
      favorite: false
    };
    
    setRoadmap(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => 
        m.id === milestoneId 
          ? { ...m, resources: [...m.resources, newResource] } 
          : m
      )
    }));
    
    toast({
      title: "Resource Added",
      description: `"${resource.title}" has been added.`
    });
  };

  // Update a resource
  const updateResource = (milestoneId: string, resourceId: string, resource: Partial<Resource>) => {
    setRoadmap(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => 
        m.id === milestoneId 
          ? { 
              ...m, 
              resources: m.resources.map(r => 
                r.id === resourceId 
                  ? { ...r, ...resource } 
                  : r
              ) 
            } 
          : m
      )
    }));
  };

  // Delete a resource
  const deleteResource = (milestoneId: string, resourceId: string) => {
    setRoadmap(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => 
        m.id === milestoneId 
          ? { ...m, resources: m.resources.filter(r => r.id !== resourceId) } 
          : m
      )
    }));
    
    toast({
      title: "Resource Deleted",
      description: "The resource has been removed."
    });
  };

  // Toggle milestone expansion
  const toggleMilestoneExpansion = (id: string) => {
    setRoadmap(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => 
        m.id === id 
          ? { ...m, isExpanded: !m.isExpanded } 
          : m
      )
    }));
  };

  // Toggle resource completion status
  const toggleResourceCompletion = (milestoneId: string, resourceId: string) => {
    setRoadmap(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => 
        m.id === milestoneId 
          ? { 
              ...m, 
              resources: m.resources.map(r => 
                r.id === resourceId 
                  ? { ...r, completed: !r.completed } 
                  : r
              ) 
            } 
          : m
      )
    }));
  };

  // Toggle resource favorite status
  const toggleResourceFavorite = (milestoneId: string, resourceId: string) => {
    setRoadmap(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => 
        m.id === milestoneId 
          ? { 
              ...m, 
              resources: m.resources.map(r => 
                r.id === resourceId 
                  ? { ...r, favorite: !r.favorite } 
                  : r
              ) 
            } 
          : m
      )
    }));
  };

  // Export data as JSON
  const exportData = (): string => {
    return JSON.stringify(roadmap, null, 2);
  };

  // Import data from JSON
  const importData = (jsonData: string) => {
    try {
      const parsedData = JSON.parse(jsonData) as RoadmapData;
      
      // Basic validation
      if (!parsedData.title || !Array.isArray(parsedData.milestones)) {
        throw new Error("Invalid roadmap data format");
      }
      
      setRoadmap(parsedData);
      
      toast({
        title: "Data Imported",
        description: "Roadmap data has been successfully imported."
      });
    } catch (err) {
      console.error("Error importing roadmap data:", err);
      toast({
        title: "Import Failed",
        description: "Could not import data. Please check the JSON format.",
        variant: "destructive"
      });
    }
  };

  return (
    <RoadmapContext.Provider
      value={{
        roadmap,
        setRoadmap,
        addMilestone,
        updateMilestone,
        deleteMilestone,
        moveMilestone,
        addResource,
        updateResource,
        deleteResource,
        toggleMilestoneExpansion,
        toggleResourceCompletion,
        toggleResourceFavorite,
        exportData,
        importData
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
};

export const useRoadmap = (): RoadmapContextType => {
  const context = useContext(RoadmapContext);
  if (context === undefined) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
};
