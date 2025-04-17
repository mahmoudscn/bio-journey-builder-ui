
import React, { useState } from 'react';
import { MilestoneCard } from '@/components/milestone/MilestoneCard';
import { useRoadmap } from '@/context/RoadmapContext';
import { 
  DndContext, 
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  closestCenter,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Milestone } from '@/types/roadmap';
import { NewMilestoneForm } from '@/components/milestone/NewMilestoneForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MilestoneList() {
  const { roadmap, moveMilestone } = useRoadmap();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isAddMilestoneDialogOpen, setIsAddMilestoneDialogOpen] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );
  
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = roadmap.milestones.findIndex(m => m.id === active.id);
      const newIndex = roadmap.milestones.findIndex(m => m.id === over.id);
      
      moveMilestone(oldIndex, newIndex);
    }
    
    setActiveId(null);
  };
  
  const activeMilestone = activeId 
    ? roadmap.milestones.find((milestone) => milestone.id === activeId) 
    : null;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Milestones</h2>
        
        <Dialog open={isAddMilestoneDialogOpen} onOpenChange={setIsAddMilestoneDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={16} className="mr-1" /> Add Milestone
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Milestone</DialogTitle>
              <DialogDescription>
                Create a new milestone for your bioinformatics learning journey.
              </DialogDescription>
            </DialogHeader>
            <NewMilestoneForm onComplete={() => setIsAddMilestoneDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={roadmap.milestones.map((milestone) => milestone.id)}
          strategy={verticalListSortingStrategy}
        >
          {roadmap.milestones.map((milestone, index) => (
            <MilestoneCard 
              key={milestone.id} 
              milestone={milestone} 
              index={index} 
            />
          ))}
        </SortableContext>
        
        <DragOverlay>
          {activeId && activeMilestone ? (
            <div className="opacity-80">
              <MilestoneCard 
                milestone={activeMilestone} 
                index={roadmap.milestones.findIndex(m => m.id === activeId)} 
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      
      {roadmap.milestones.length === 0 && (
        <div className="text-center py-10 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-medium text-muted-foreground mb-2">No milestones yet</h3>
          <p className="text-muted-foreground mb-4">
            Add your first milestone to start building your roadmap.
          </p>
          <Button onClick={() => setIsAddMilestoneDialogOpen(true)}>
            <Plus size={16} className="mr-1" /> Add First Milestone
          </Button>
        </div>
      )}
    </div>
  );
}
