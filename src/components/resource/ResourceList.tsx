
import React, { useState } from 'react';
import { Resource, ResourceType, ResourceDifficulty } from '@/types/roadmap';
import { ResourceCard } from '@/components/resource/ResourceCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface ResourceListProps {
  milestoneId: string;
  resources: Resource[];
}

export function ResourceList({ milestoneId, resources }: ResourceListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<{
    types: ResourceType[];
    difficulties: ResourceDifficulty[];
    tags: string[];
  }>({
    types: [],
    difficulties: [],
    tags: []
  });

  // Get all unique tags from resources
  const allTags = [...new Set(resources.flatMap(resource => resource.tags))];
  
  // Get all unique types and difficulties
  const resourceTypes: ResourceType[] = ['article', 'video', 'tutorial', 'dataset', 'quiz'];
  const difficultyLevels: ResourceDifficulty[] = ['beginner', 'intermediate', 'advanced'];

  // Filter resources based on search term and active filters
  const filteredResources = resources.filter(resource => {
    // Text search
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type filter
    const matchesType = activeFilters.types.length === 0 || 
      activeFilters.types.includes(resource.type);
    
    // Difficulty filter
    const matchesDifficulty = activeFilters.difficulties.length === 0 || 
      activeFilters.difficulties.includes(resource.difficulty);
    
    // Tags filter
    const matchesTags = activeFilters.tags.length === 0 || 
      resource.tags.some(tag => activeFilters.tags.includes(tag));
    
    return matchesSearch && matchesType && matchesDifficulty && matchesTags;
  });

  const toggleTypeFilter = (type: ResourceType) => {
    setActiveFilters(prev => {
      if (prev.types.includes(type)) {
        return {
          ...prev,
          types: prev.types.filter(t => t !== type)
        };
      } else {
        return {
          ...prev,
          types: [...prev.types, type]
        };
      }
    });
  };

  const toggleDifficultyFilter = (difficulty: ResourceDifficulty) => {
    setActiveFilters(prev => {
      if (prev.difficulties.includes(difficulty)) {
        return {
          ...prev,
          difficulties: prev.difficulties.filter(d => d !== difficulty)
        };
      } else {
        return {
          ...prev,
          difficulties: [...prev.difficulties, difficulty]
        };
      }
    });
  };

  const toggleTagFilter = (tag: string) => {
    setActiveFilters(prev => {
      if (prev.tags.includes(tag)) {
        return {
          ...prev,
          tags: prev.tags.filter(t => t !== tag)
        };
      } else {
        return {
          ...prev,
          tags: [...prev.tags, tag]
        };
      }
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      types: [],
      difficulties: [],
      tags: []
    });
    setSearchTerm('');
  };

  const hasActiveFilters = activeFilters.types.length > 0 || 
    activeFilters.difficulties.length > 0 || 
    activeFilters.tags.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search resources..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1 shrink-0">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1">{
                  activeFilters.types.length + 
                  activeFilters.difficulties.length + 
                  activeFilters.tags.length
                }</Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <div className="p-2">
              <h4 className="font-medium mb-1">Resource Type</h4>
              {resourceTypes.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={activeFilters.types.includes(type)}
                  onCheckedChange={() => toggleTypeFilter(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </DropdownMenuCheckboxItem>
              ))}
              
              <Separator className="my-2" />
              
              <h4 className="font-medium mb-1">Difficulty</h4>
              {difficultyLevels.map((difficulty) => (
                <DropdownMenuCheckboxItem
                  key={difficulty}
                  checked={activeFilters.difficulties.includes(difficulty)}
                  onCheckedChange={() => toggleDifficultyFilter(difficulty)}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </DropdownMenuCheckboxItem>
              ))}
              
              {allTags.length > 0 && (
                <>
                  <Separator className="my-2" />
                  <h4 className="font-medium mb-1">Tags</h4>
                  {allTags.map((tag) => (
                    <DropdownMenuCheckboxItem
                      key={tag}
                      checked={activeFilters.tags.includes(tag)}
                      onCheckedChange={() => toggleTagFilter(tag)}
                    >
                      {tag}
                    </DropdownMenuCheckboxItem>
                  ))}
                </>
              )}
              
              <Separator className="my-2" />
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Active filter badges - more compact on mobile */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1 md:gap-2">
          {activeFilters.types.map(type => (
            <Badge 
              key={`type-${type}`} 
              variant="secondary"
              className="px-2 py-0.5 text-xs md:text-sm cursor-pointer hover:opacity-80 flex items-center"
              onClick={() => toggleTypeFilter(type)}
            >
              {type} <X size={12} className="ml-1" />
            </Badge>
          ))}
          
          {activeFilters.difficulties.map(difficulty => (
            <Badge 
              key={`diff-${difficulty}`} 
              variant="secondary"
              className="px-2 py-0.5 text-xs md:text-sm cursor-pointer hover:opacity-80 flex items-center"
              onClick={() => toggleDifficultyFilter(difficulty)}
            >
              {difficulty} <X size={12} className="ml-1" />
            </Badge>
          ))}
          
          {activeFilters.tags.map(tag => (
            <Badge 
              key={`tag-${tag}`} 
              variant="secondary"
              className="px-2 py-0.5 text-xs md:text-sm cursor-pointer hover:opacity-80 flex items-center"
              onClick={() => toggleTagFilter(tag)}
            >
              {tag} <X size={12} className="ml-1" />
            </Badge>
          ))}
        </div>
      )}
      
      {/* Resource list */}
      <div className="space-y-3">
        {filteredResources.length === 0 ? (
          <div className="text-center p-4 md:p-8 text-muted-foreground">
            No resources match your filters.
          </div>
        ) : (
          filteredResources.map((resource) => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              milestoneId={milestoneId} 
            />
          ))
        )}
      </div>
    </div>
  );
}
