# LeetCode Journey - Algorithm Visualizations

<div align="center">

![LeetCode Visualizer](https://img.shields.io/badge/LeetCode%20Visualizer-FFA116?style=for-the-badge&logo=leetcode&logoColor=white)

![Built with Passion](https://img.shields.io/badge/Built%20with-Passion-EC4899?style=for-the-badge)

![Interactive Visualizations](https://img.shields.io/badge/Interactive%20Visualizations-22C55E?style=for-the-badge)

*A personal documentation of my LeetCode and Data Structures & Algorithms journey with interactive visualizations and structured learning progress.*

</div>

---

## **About the Project**

**LeetCode Journey** is my personal documentation platform for tracking my progress through the NeetCode 150 roadmap. This project features interactive algorithm visualizations, detailed solution explanations that I've written, and a visual roadmap showing my learning journey through different problem categories.

Built with modern web technologies, this project combines clean UI/UX design with powerful data visualization to document my Data Structures & Algorithms learning process. As I work through coding interview preparation and problem-solving challenges, this platform helps me track solutions, visualize algorithms, and monitor my progress across different topics.

## **Key Features**

- **Interactive Roadmap** - Visual tree structure showing my NeetCode 150 learning path with prerequisite relationships
- **Algorithm Visualizations** - Step-by-step animated visualizations for algorithms I've implemented
- **Progress Tracking** - Monitor my personal progress across topics and problems
- **Detailed Solutions** - My comprehensive explanations with code implementations
- **Topic Organization** - Problems organized by categories (Arrays & Hashing, Two Pointers, Dynamic Programming, etc.)
- **Modern Dark Theme** - Professional dark-themed UI with smooth animations
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Auto-playing Animations** - Continuous loop animations for better algorithm understanding

## **Technologies Used**

<div align="center">

### **Frontend Technologies**

![NEXT.JS](https://img.shields.io/badge/NEXT.JS-16.0.1-000000?style=for-the-badge&logo=next.js&logoColor=white&labelColor=000000)

![REACT](https://img.shields.io/badge/REACT-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=000000)

![TYPESCRIPT](https://img.shields.io/badge/TYPESCRIPT-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=000000)

![TAILWIND CSS](https://img.shields.io/badge/TAILWIND%20CSS-4.0.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=000000)

![FRAMER MOTION](https://img.shields.io/badge/FRAMER%20MOTION-12.23.24-0055FF?style=for-the-badge&logo=framer&logoColor=white&labelColor=000000)

![REACTFLOW](https://img.shields.io/badge/REACTFLOW-11.11.4-FF6B6B?style=for-the-badge&logo=reactflow&logoColor=white&labelColor=000000)

![DAGRE](https://img.shields.io/badge/DAGRE-0.8.5-4ECDC4?style=for-the-badge&logo=graphql&logoColor=white&labelColor=000000)

### **Design & Animation**

![FRAMER MOTION](https://img.shields.io/badge/FRAMER%20MOTION-12.23.24-0055FF?style=for-the-badge&logo=framer&logoColor=white&labelColor=000000)

![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white&labelColor=000000)

![LUCIDE ICONS](https://img.shields.io/badge/LUCIDE%20ICONS-0.548.0-F56565?style=for-the-badge&logo=icons8&logoColor=white&labelColor=000000)

### **Development Tools**

![ESLINT](https://img.shields.io/badge/ESLINT-9.0-4B32C3?style=for-the-badge&logo=eslint&logoColor=white&labelColor=000000)

![POSTCSS](https://img.shields.io/badge/POSTCSS-8.4.29-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white&labelColor=000000)

![GIT](https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=git&logoColor=white&labelColor=000000)

</div>

## **Architecture**

### **Frontend (Next.js 16 + React 19)**

- **Next.js 16** with App Router for server-side rendering and routing
- **React 19** with modern hooks and functional components
- **TypeScript** for type-safe development
- **Tailwind CSS v4** for utility-first styling with custom theme
- **Framer Motion** for smooth animations and transitions
- **ReactFlow** for interactive graph visualizations
- **Dagre** for automatic graph layout algorithms

### **Component Structure**

- **Modular Design** - Reusable components for maintainability
- **Type-Safe** - Full TypeScript implementation
- **Responsive Layout** - Mobile-first design approach
- **Animation System** - Coordinated motion design with Framer Motion
- **State Management** - Efficient React hooks and context

## **Pages & Navigation**

1. **Home (Roadmap)** - Interactive tree view of the learning path
2. **Topics View** - Grid of topic cards with progress indicators
3. **Problems View** - List of all problems with filters
4. **Problem Detail** - Individual problem with solution and visualization
5. **Topic Detail** - Problems grouped by topic

## **UI/UX Features**

- **Dark Theme** - Professional dark color scheme with green accents
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Design** - Works seamlessly on all devices
- **Interactive Elements** - Hover effects and micro-interactions
- **Glass Morphism** - Modern glassmorphic design elements
- **Gradient Text** - Subtle gradient text effects
- **Scroll Effects** - Smooth scroll behavior
- **Accessibility** - Semantic HTML and ARIA labels

## **Project Structure**

```
leetcode-visualizer/
├── app/
│   ├── layout.tsx           # Root layout with fonts and metadata
│   ├── page.tsx             # Home page with roadmap/topics/problems views
│   ├── globals.css          # Global styles and Tailwind configuration
│   ├── problems/
│   │   └── [id]/
│   │       └── page.tsx     # Individual problem detail page
│   └── topics/
│       └── [id]/
│           └── page.tsx     # Topic detail page
├── components/
│   ├── AlgorithmVisualizer.tsx      # Generic algorithm visualizer
│   ├── AnagramSortVisualizer.tsx    # Anagram sorting visualization
│   ├── ContainsDuplicateVisualizer.tsx  # Duplicate detection visualization
│   ├── ProblemCard.tsx              # Problem card component
│   ├── ProgressBar.tsx              # Progress bar component
│   ├── RoadmapTree.tsx              # Interactive roadmap tree
│   └── TopicCard.tsx                # Topic card component
├── data/
│   └── problems.ts          # Central data file with all problems and topics
├── lib/
│   ├── layout.ts            # Dagre graph layout utilities
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript type definitions
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

## **My Solutions Showcased**

### **1. Contains Duplicate Visualizer**

- **My Approach** - Array-to-set conversion solution I implemented
- **Visual Concept** - Shows how duplicates are detected and discarded
- **Real-time Animation** - Characters move from array to set
- **Auto-looping** - Continuous demonstration of my algorithm
- **Custom Input** - Test with different arrays

### **2. Valid Anagram Visualizer**

- **My Solution** - Lexicographical sorting approach I used
- **Side-by-side Comparison** - Both strings sorted simultaneously
- **Step-by-step Animation** - Character-by-character sorting process
- **Comparison Result** - Visual indication of anagram status

### **3. Interactive Roadmap**

- **Hierarchical Structure** - Topics organized by prerequisites
- **Progress Visualization** - Green progress bars for each topic
- **Full-screen Map** - Maximized view for better navigation
- **Smooth Navigation** - Click to navigate to topic pages

## **NeetCode 150 Topics Covered**

1. **Arrays & Hashing** - Foundation of data structures
2. **Two Pointers** - Efficient array manipulation
3. **Sliding Window** - Window-based algorithms
4. **Stack** - LIFO data structure problems
5. **Binary Search** - Divide and conquer
6. **Linked List** - Node-based structures
7. **Trees** - Binary tree algorithms
8. **Tries** - Prefix tree structures
9. **Heap / Priority Queue** - Priority-based processing
10. **Backtracking** - Recursive problem solving
11. **Graphs** - Graph traversal and algorithms
12. **Advanced Graphs** - Complex graph problems
13. **1-D Dynamic Programming** - Linear DP
14. **2-D Dynamic Programming** - Matrix DP
15. **Greedy** - Greedy algorithms
16. **Intervals** - Interval problems
17. **Math & Geometry** - Mathematical problems
18. **Bit Manipulation** - Bitwise operations

## **Code Quality**

- **TypeScript** - Full type safety throughout
- **ESLint** - Code linting with Next.js config
- **Component-based Architecture** - Reusable, maintainable components
- **Responsive Design** - Mobile-first approach
- **Clean Code** - Well-documented and organized
- **Performance Optimized** - Efficient rendering and animations

## **Development**

### **Available Scripts**

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### **Adding New Solutions**

As I solve more problems, I add them to `data/problems.ts`. To document a new solution:

1. Add the problem object to the `problems` array
2. Include my solution code, explanation, and complexity analysis
3. Assign appropriate topics and difficulty
4. Create a custom visualizer component if needed for the algorithm
5. Link the visualizer in the problem detail page

## **Custom Visualizers**

The project supports custom algorithm visualizers. Current visualizers:

- **ContainsDuplicateVisualizer** - Set conversion visualization
- **AnagramSortVisualizer** - Sorting-based anagram check

To create a new visualizer:

1. Create a component in `components/`
2. Implement animation logic with Framer Motion
3. Add to problem detail page conditionally
4. Follow existing visualizer patterns

## **Contributing**

I welcome contributions and feedback! Please feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## **Future Enhancements**

- [ ] Add more algorithm visualizers
- [ ] User authentication and personal progress tracking
- [ ] Code execution and testing
- [ ] Discussion forums
- [ ] Mobile app version
- [ ] Export progress reports
- [ ] Social sharing features

## **Acknowledgments**

- **NeetCode** for the excellent 150 problem roadmap structure
- **Next.js Team** for the amazing framework
- **ReactFlow** for powerful graph visualization
- **Framer Motion** for beautiful animations
- **LeetCode** for providing the problem set

---

<div align="center">

**Built with ❤️ and a passion for clean, efficient code**

*Documenting my LeetCode & DSA journey • One algorithm at a time*

[![LeetCode](https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>
