export interface BlogPost {
  slug: string;
  title: string;
  location: string;
  country: string;
  excerpt: string;
  date: string;
  readTime: string;
  gradient: string; // CSS gradient for the image placeholder
}

export const blogPosts: BlogPost[] = [
  {
    slug: "amalfi-coast",
    title: "The Amalfi Coast: Where the Road Ends and the Dream Begins",
    location: "Amalfi Coast",
    country: "Italy",
    excerpt: "Cliffside villages, lemon groves cascading into the sea, and tables set for two at the edge of the world.",
    date: "April 2026",
    readTime: "4 min read",
    gradient: "linear-gradient(135deg, #1a0a00 0%, #2d1500 30%, #1a0e05 60%, rgba(201,169,110,0.2) 100%)"
  },
  {
    slug: "dubrovnik",
    title: "Dubrovnik After Dark: The City the Tourists Never See",
    location: "Dubrovnik",
    country: "Croatia",
    excerpt: "When the cruise ships leave and the old city falls silent, the real Dubrovnik reveals itself.",
    date: "June 2025",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #000d1a 0%, #001a2e 30%, #000a14 60%, rgba(100,140,180,0.2) 100%)"
  },
  {
    slug: "santorini",
    title: "Santorini Beyond the Postcards",
    location: "Santorini",
    country: "Greece",
    excerpt: "The island everyone photographs and almost nobody truly experiences. We show you where to go instead.",
    date: "September 2025",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #0a0510 0%, #150a1f 30%, #0d0815 60%, rgba(180,130,220,0.15) 100%)"
  }
];
