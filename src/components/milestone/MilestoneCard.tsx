
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ChevronDown, 
  ChevronUp, 
  Pencil, 
  Trash2, 
  Grip, 
  Plus,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Milestone } from '@/types/roadmap';
import { ResourceList } from '@/components/resource/ResourceList';
import { ResourceForm } from '@/components/resource/ResourceForm';
import { useRoadmap } from '@/context/RoadmapContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useIsMobile } from '@/hooks/use-mobile';

interface MilestoneCardProps {
  milestone: Milestone;
  index: number;
}

export function MilestoneCard({ milestone, index }: MilestoneCardProps) {
  const { 
    updateMilestone, 
    deleteMilestone, 
    toggleMilestoneExpansion 
  } = useRoadmap();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(milestone.title);
  const [editedDescription, setEditedDescription] = useState(milestone.description);
  const isMobile = useIsMobile();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: milestone.id,
    data: {
      type: 'milestone',
      milestone
    }
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 1
  };
  
  const handleToggleExpansion = () => {
    toggleMilestoneExpansion(milestone.id);
  };
  
  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleSaveEdit = () => {
    updateMilestone(milestone.id, {
      title: editedTitle,
      description: editedDescription
    });
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setEditedTitle(milestone.title);
    setEditedDescription(milestone.description);
    setIsEditing(false);
  };
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${milestone.title}"?`)) {
      deleteMilestone(milestone.id);
    }
  };
  
  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={`mb-4 transition-all duration-300 ${isDragging ? 'shadow-lg' : ''}`}
    >
      <CardHeader className={`pb-2 ${isMobile ? 'px-3 py-3' : 'p-4'}`}>
        <div className="flex items-center justify-between">
          <div className={`flex items-center flex-1 ${isMobile ? 'gap-1' : 'gap-2'}`}>
            <div 
              {...attributes} 
              {...listeners} 
              className="cursor-grab mr-1 md:mr-2 text-muted-foreground hover:text-foreground touch-target"
              aria-label="Drag to reorder milestone"
            >
              <Grip size={isMobile ? 18 : 20} />
            </div>
            
            {isEditing ? (
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="font-semibold text-lg"
                placeholder="Milestone title"
                autoFocus
              />
            ) : (
              <CardTitle className={`${isMobile ? 'text-base' : 'text-xl'} truncate`}>
                {index + 1}. {milestone.title}
              </CardTitle>
            )}
          </div>
          
          <div className="flex gap-1">
            {isEditing ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSaveEdit}
                  className="text-success"
                >
                  <Check size={isMobile ? 16 : 18} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCancelEdit}
                  className="text-destructive"
                >
                  <X size={isMobile ? 16 : 18} />
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size={isMobile ? "icon" : "sm"}
                  onClick={handleEditClick}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Pencil size={isMobile ? 16 : 18} />
                  {!isMobile && <span className="ml-1 hidden sm:inline">Edit</span>}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size={isMobile ? "icon" : "sm"}
                  onClick={handleDelete}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={isMobile ? 16 : 18} />
                  {!isMobile && <span className="ml-1 hidden lg:inline">Delete</span>}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size={isMobile ? "icon" : "sm"}
                  onClick={handleToggleExpansion}
                  className="text-muted-foreground hover:text-primary"
                  aria-label={milestone.isExpanded ? "Collapse milestone" : "Expand milestone"}
                >
                  {milestone.isExpanded ? (
                    <ChevronUp size={isMobile ? 18 : 20} />
                  ) : (
                    <ChevronDown size={isMobile ? 18 : 20} />
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
        
        {isEditing ? (
          <Textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="mt-2"
            placeholder="Milestone description"
          />
        ) : (
          <CardDescription className={`mt-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            {milestone.description}
          </CardDescription>
        )}
      </CardHeader>
      
      {milestone.isExpanded && (
        <CardContent className={`pt-0 animate-fade-in ${isMobile ? 'px-3' : 'px-6'}`}>
          <ResourceList 
            milestoneId={milestone.id} 
            resources={milestone.resources} 
          />
        </CardContent>
      )}
      
      {milestone.isExpanded && (
        <CardFooter className={`flex justify-end pt-0 ${isMobile ? 'pb-3 px-3' : 'pb-4 px-6'}`}>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                className={`${isMobile ? 'text-xs px-2 py-1' : 'text-sm'}`}
              >
                <Plus size={isMobile ? 14 : 16} className="mr-1" /> Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className={isMobile ? 'w-[calc(100vw-2rem)] max-w-lg' : ''}>
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogDescription>
                  Add a learning resource to "{milestone.title}".
                </DialogDescription>
              </DialogHeader>
              <ResourceForm 
                milestoneId={milestone.id} 
                onComplete={() => {}} 
              />
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );
}
