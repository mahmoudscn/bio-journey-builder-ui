
import { RoadmapData } from '@/types/roadmap';

export const initialRoadmapData: RoadmapData = {
  title: "Bioinformatics Learning Journey",
  description: "A comprehensive roadmap to mastering bioinformatics concepts and tools",
  milestones: [
    {
      id: "m1",
      title: "Introduction to Bioinformatics",
      description: "Fundamental concepts and tools in bioinformatics",
      isExpanded: true,
      resources: [
        {
          id: "r1",
          title: "What is Bioinformatics?",
          description: "An overview of bioinformatics and its applications in modern biology",
          url: "https://www.nature.com/subjects/bioinformatics",
          type: "article",
          difficulty: "beginner",
          tags: ["introduction", "overview"],
          completed: false,
          favorite: false
        },
        {
          id: "r2",
          title: "Introduction to Biological Data Analysis",
          description: "Learn about various types of biological data and analysis techniques",
          url: "https://www.youtube.com/watch?v=jvkvA5ohK_c",
          type: "video",
          difficulty: "beginner",
          tags: ["data analysis", "basics"],
          completed: false,
          favorite: false
        }
      ]
    },
    {
      id: "m2",
      title: "DNA Sequence Analysis",
      description: "Learn to analyze DNA sequences using computational tools",
      isExpanded: false,
      resources: [
        {
          id: "r3",
          title: "DNA Sequence Alignment Basics",
          description: "Understanding how DNA sequences are aligned and compared",
          url: "https://www.coursera.org/learn/bioinformatics",
          type: "tutorial",
          difficulty: "intermediate",
          tags: ["DNA", "sequence alignment"],
          completed: false,
          favorite: false
        },
        {
          id: "r4",
          title: "BLAST Tool Tutorial",
          description: "How to use BLAST for sequence similarity searches",
          url: "https://www.ncbi.nlm.nih.gov/Class/BLAST/blast_course.short.html",
          type: "tutorial",
          difficulty: "intermediate",
          tags: ["BLAST", "tools"],
          completed: false,
          favorite: false
        }
      ]
    },
    {
      id: "m3",
      title: "Genomics & Next-Generation Sequencing",
      description: "Explore genomics concepts and next-generation sequencing technologies",
      isExpanded: false,
      resources: [
        {
          id: "r5",
          title: "Genomics Explained",
          description: "Comprehensive introduction to genomics and its importance",
          url: "https://www.genome.gov/about-genomics/fact-sheets/A-Brief-Guide-to-Genomics",
          type: "article",
          difficulty: "intermediate",
          tags: ["genomics", "basics"],
          completed: false,
          favorite: false
        },
        {
          id: "r6",
          title: "NGS Data Analysis Pipeline",
          description: "Build an NGS data analysis pipeline from scratch",
          url: "https://www.illumina.com/techniques/sequencing/ngs-library-prep/beginners.html",
          type: "tutorial",
          difficulty: "advanced",
          tags: ["NGS", "data analysis", "pipeline"],
          completed: false,
          favorite: false
        }
      ]
    },
    {
      id: "m4",
      title: "Proteomics & Structural Bioinformatics",
      description: "Study protein structures and functions using computational approaches",
      isExpanded: false,
      resources: [
        {
          id: "r7",
          title: "Introduction to Proteomics",
          description: "Learn the basics of proteomics and its applications",
          url: "https://www.nature.com/articles/nmeth1153",
          type: "article",
          difficulty: "intermediate",
          tags: ["proteomics", "proteins"],
          completed: false,
          favorite: false
        },
        {
          id: "r8",
          title: "Protein Structure Prediction Tools",
          description: "Overview of computational tools for protein structure prediction",
          url: "https://alphafold.ebi.ac.uk/",
          type: "dataset",
          difficulty: "advanced",
          tags: ["protein structure", "prediction", "tools"],
          completed: false,
          favorite: false
        }
      ]
    },
    {
      id: "m5",
      title: "Machine Learning in Bioinformatics",
      description: "Apply machine learning techniques to biological problems",
      isExpanded: false,
      resources: [
        {
          id: "r9",
          title: "ML Applications in Bioinformatics",
          description: "Explore how machine learning is revolutionizing bioinformatics",
          url: "https://www.nature.com/articles/s41576-019-0122-6",
          type: "article",
          difficulty: "advanced",
          tags: ["machine learning", "applications"],
          completed: false,
          favorite: false
        },
        {
          id: "r10",
          title: "Building ML Models for Gene Expression Data",
          description: "Hands-on tutorial for analyzing gene expression with ML",
          url: "https://www.kaggle.com/sulianova/cardiovascular-disease-dataset",
          type: "dataset",
          difficulty: "advanced",
          tags: ["machine learning", "gene expression", "practical"],
          completed: false,
          favorite: false
        }
      ]
    }
  ]
};
