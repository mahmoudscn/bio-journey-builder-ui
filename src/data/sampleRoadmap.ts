
import { RoadmapData } from '@/types/roadmap';

export const initialRoadmapData: RoadmapData = {
  title: "Comprehensive Bioinformatics Learning Path",
  description: "A strategic roadmap to master bioinformatics from foundational concepts to advanced computational techniques",
  milestones: [
    {
      id: "m1",
      title: "Programming Fundamentals for Bioinformatics",
      description: "Build essential programming skills for computational biology",
      isExpanded: true,
      resources: [
        {
          id: "r1",
          title: "Python for Biologists",
          description: "Learn Python programming with a focus on biological data manipulation",
          url: "https://www.coursera.org/learn/python-for-biologists",
          type: "course",
          difficulty: "beginner",
          tags: ["python", "programming", "basics"],
          completed: false,
          favorite: false
        },
        {
          id: "r2",
          title: "Intro to R Programming in Bioinformatics",
          description: "Statistical programming and data analysis using R",
          url: "https://www.edx.org/course/introduction-to-r-for-data-science",
          type: "tutorial",
          difficulty: "beginner",
          tags: ["R", "statistics", "data analysis"],
          completed: false,
          favorite: false
        }
      ]
    },
    {
      id: "m2",
      title: "Genomics and Sequence Analysis",
      description: "Advanced techniques for analyzing genetic data",
      isExpanded: false,
      resources: [
        {
          id: "r3",
          title: "Next-Generation Sequencing (NGS) Techniques",
          description: "Comprehensive guide to modern DNA sequencing technologies",
          url: "https://www.nature.com/articles/nrg.2016.49",
          type: "article",
          difficulty: "intermediate",
          tags: ["genomics", "sequencing", "DNA"],
          completed: false,
          favorite: false
        },
        {
          id: "r4",
          title: "Genome Assembly and Annotation",
          description: "Techniques for reconstructing and interpreting genomic sequences",
          url: "https://www.coursera.org/learn/genome-assembly",
          type: "video",
          difficulty: "advanced",
          tags: ["genome", "assembly", "bioinformatics"],
          completed: false,
          favorite: false
        }
      ]
    },
    {
      id: "m3",
      title: "Machine Learning in Computational Biology",
      description: "Apply machine learning techniques to biological data analysis",
      isExpanded: false,
      resources: [
        {
          id: "r5",
          title: "Deep Learning for Genomic Prediction",
          description: "Machine learning approaches for genomic research",
          url: "https://www.nature.com/articles/s41588-018-0183-z",
          type: "article",
          difficulty: "advanced",
          tags: ["machine learning", "genomics", "deep learning"],
          completed: false,
          favorite: false
        },
        {
          id: "r6",
          title: "Practical Machine Learning for Biological Data",
          description: "Hands-on course applying ML to biological datasets",
          url: "https://www.edx.org/course/machine-learning-for-biological-data",
          type: "tutorial",
          difficulty: "advanced",
          tags: ["ML", "data science", "biology"],
          completed: false,
          favorite: false
        }
      ]
    },
    {
      id: "m4",
      title: "Proteomics and Structural Bioinformatics",
      description: "Advanced techniques for protein structure and function analysis",
      isExpanded: false,
      resources: [
        {
          id: "r7",
          title: "Protein Structure Prediction with AlphaFold",
          description: "Understanding and using AI-powered protein structure prediction",
          url: "https://alphafold.ebi.ac.uk/",
          type: "dataset",
          difficulty: "advanced",
          tags: ["proteins", "AI", "structure"],
          completed: false,
          favorite: false
        },
        {
          id: "r8",
          title: "Protein-Protein Interaction Networks",
          description: "Computational methods for analyzing protein interactions",
          url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5933291/",
          type: "article",
          difficulty: "intermediate",
          tags: ["proteomics", "networks", "interactions"],
          completed: false,
          favorite: false
        }
      ]
    },
    {
      id: "m5",
      title: "Bioinformatics Tools and Databases",
      description: "Essential computational resources for biological research",
      isExpanded: false,
      resources: [
        {
          id: "r9",
          title: "NCBI GenBank and Sequence Databases",
          description: "Comprehensive guide to using genetic sequence repositories",
          url: "https://www.ncbi.nlm.nih.gov/genbank/",
          type: "tutorial",
          difficulty: "intermediate",
          tags: ["databases", "genetics", "research"],
          completed: false,
          favorite: false
        },
        {
          id: "r10",
          title: "Bioinformatics Software Toolkit",
          description: "Essential open-source tools for computational biology",
          url: "https://bioinformatics.org/wiki/Bioinformatics_tools",
          type: "article",
          difficulty: "intermediate",
          tags: ["tools", "software", "open source"],
          completed: false,
          favorite: false
        }
      ]
    }
  ]
};
