export type LeaderboardEntry = {
  rank: number;
  projectId: string;
  title: string;
  description: string;
  image: string;
  category: string;
  authorName: string;
  authorUsername: string;
  authorInitials: string;
  authorColor: string;
  views: number;
  streak: number;     // weeks building in a row
  launchedThisWeek: boolean;
  linkLabel: string;
  linkUrl: string;
};

// Week of Jun 16 2026
export const THIS_WEEK: LeaderboardEntry[] = [
  {
    rank: 1,
    projectId: "1",
    title: "Focusblock",
    description: "A minimal focus timer built around the Pomodoro method. Block distracting sites, track sessions, and build a daily streak.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    category: "Productivity",
    authorName: "Maya Chen",
    authorUsername: "mayachen",
    authorInitials: "MC",
    authorColor: "#4F9080",
    views: 3821,
    streak: 6,
    launchedThisWeek: false,
    linkLabel: "Start focusing",
    linkUrl: "#",
  },
  {
    rank: 2,
    projectId: "2",
    title: "Palette Studio",
    description: "Generate accessible color palettes from a single seed color. Export to CSS, Tailwind, or Figma tokens instantly.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
    category: "Design",
    authorName: "Sofia Reyes",
    authorUsername: "sofiareyes",
    authorInitials: "SR",
    authorColor: "#F5C432",
    views: 2940,
    streak: 4,
    launchedThisWeek: false,
    linkLabel: "Try it live",
    linkUrl: "#",
  },
  {
    rank: 3,
    projectId: "3",
    title: "Triply",
    description: "Collaborative travel itinerary builder. Add flights, hotels, and activities on a shared timeline.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    category: "Travel",
    authorName: "James Okafor",
    authorUsername: "jamesokafor",
    authorInitials: "JO",
    authorColor: "#E8703A",
    views: 2105,
    streak: 2,
    launchedThisWeek: true,
    linkLabel: "Plan a trip",
    linkUrl: "#",
  },
  {
    rank: 4,
    projectId: "4",
    title: "Liftlog",
    description: "Simple strength training tracker. Log sets, track progressive overload week over week.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    category: "Fitness & Health",
    authorName: "Tobias Werner",
    authorUsername: "tobiaswerner",
    authorInitials: "TW",
    authorColor: "#C45525",
    views: 1873,
    streak: 8,
    launchedThisWeek: false,
    linkLabel: "Try Liftlog",
    linkUrl: "#",
  },
  {
    rank: 5,
    projectId: "5",
    title: "Chordboard",
    description: "Learn guitar chords interactively. Search any chord, hear it, and follow beginner-friendly progressions.",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80",
    category: "Music",
    authorName: "Priya Nair",
    authorUsername: "priyanair",
    authorInitials: "PN",
    authorColor: "#6BAF9E",
    views: 1542,
    streak: 3,
    launchedThisWeek: true,
    linkLabel: "Open Chordboard",
    linkUrl: "#",
  },
  {
    rank: 6,
    projectId: "6",
    title: "QuizForge",
    description: "Paste any article or PDF and get a quiz in seconds. Built for teachers, students, and the curious.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    category: "Education",
    authorName: "Priya Nair",
    authorUsername: "priyanair",
    authorInitials: "PN",
    authorColor: "#6BAF9E",
    views: 1201,
    streak: 3,
    launchedThisWeek: false,
    linkLabel: "Try QuizForge",
    linkUrl: "#",
  },
  {
    rank: 7,
    projectId: "7",
    title: "Invoiced.fyi",
    description: "Create a professional PDF invoice in 30 seconds. No account, no subscription, forever free.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    category: "Finance",
    authorName: "Liam Nguyen",
    authorUsername: "liamnguyen",
    authorInitials: "LN",
    authorColor: "#3D7264",
    views: 987,
    streak: 12,
    launchedThisWeek: false,
    linkLabel: "Open the app",
    linkUrl: "#",
  },
];
