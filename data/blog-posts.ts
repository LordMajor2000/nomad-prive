export interface BlogPost {
  slug: string;
  title: string;
  location: string;
  country: string;
  excerpt: string;
  body: string;
  date: string;
  readTime: string;
  gradient: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "sri-lanka",
    title: "Sri Lanka: The Exotic Adventure That Bali Used to Be",
    location: "Sri Lanka",
    country: "Sri Lanka",
    excerpt: "For adventurous couples seeking Bali's magic without the crowds or the price tag — Sri Lanka delivers raw, unfiltered wonder.",
    body: `Sri Lanka is the answer to a question most travelers haven't thought to ask yet. If you fell in love with the idea of Bali — the lush jungle, the temples, the warm water and warmer people — but arrived to find it overrun, Sri Lanka is where you should have gone instead.\n\nThis island delivers everything: ancient rock fortresses rising from the jungle at Sigiriya, train rides through tea plantations that feel like moving through a painting, surf breaks on the southern coast that haven't been discovered by the masses, and a food culture that will quietly become one of your great travel memories.\n\nWe recommend it specifically for couples who want adventure without sacrificing comfort. The infrastructure is excellent enough that we can place you in genuinely beautiful boutique properties — think open-air jungle villas and cliffside ocean suites — while keeping the price significantly below what equivalent experiences would cost in Bali today.\n\nThe key is knowing where to go. The tourist trail (Colombo → Kandy → Ella) is fine. Our itinerary is better.`,
    date: "March 2026",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #0a0800 0%, #1a1200 30%, rgba(201,169,110,0.15) 100%)",
    featured: true
  },
  {
    slug: "bali-vs-lombok",
    title: "Bali Is Beautiful. Lombok Is Better.",
    location: "Bali & Lombok",
    country: "Indonesia",
    excerpt: "We love Bali. We also think you should go to Lombok instead — and here's exactly why.",
    body: `Let's be honest about Bali. It is genuinely beautiful — the rice terraces, the temple ceremonies at sunrise, the warung food, the energy of Seminyak at night. We've been, we loved it, and we'd go back.\n\nBut we'd tell you to go to Lombok first.\n\nBali's greatest challenge is itself. The southern part of the island — where most visitors spend their time — is now genuinely overcrowded. Traffic between Seminyak and Ubud can consume hours of a day you wanted to spend elsewhere. The beaches that looked empty in the photos were photographed at 6am on a Tuesday in 2019.\n\nLombok, the island directly to the east, remains something close to what Bali used to be. The Gili Islands sit just offshore — Gili Trawangan for nightlife, Gili Air for quiet — and the southern coast has some of the most dramatic coastline in Southeast Asia: limestone cliffs, turquoise bays, almost no one.\n\nMount Rinjani, an active volcano with a crater lake at the summit, rewards the hikers among you with one of the great views on earth.\n\nOur recommendation: if this is your first time in Indonesia, start with Lombok. If you've already been to Bali and want to return to the region, combine three days in northern Bali (Munduk, Amed) with a week in Lombok. You'll have the best of both.`,
    date: "January 2026",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #000d0a 0%, #001a10 30%, rgba(100,180,140,0.15) 100%)",
    featured: true
  },
  {
    slug: "morocco",
    title: "Morocco: Taghazout for the Soul, Marrakesh for the Senses",
    location: "Morocco",
    country: "Morocco",
    excerpt: "Two Moroccos exist side by side. One is a sun-bleached surf town with world-class resorts. The other is a medina that will overwhelm every sense you have.",
    body: `Morocco contains multitudes, and we've learned to stop recommending it as a single destination.\n\nFor clients who want the resort experience — long days by the pool, surf lessons at sunrise, excellent food and spa facilities without leaving the property — we send them to Taghazout. This small fishing village on the Atlantic coast has transformed into one of North Africa's most compelling beach destinations, with a handful of truly excellent boutique resorts that understand what luxury means in this context: simplicity, space, quality, views.\n\nFor clients who want to be genuinely moved — who want something that challenges and excites them — we send them to Marrakesh.\n\nThe medina is unlike anything in Europe. The souks are organized by craft: dyers here, tanners there, spice merchants at the center. The smell hits you before the colors do. The Djemaa el-Fna square transforms from a market in the afternoon to an open-air theatre at night — snake charmers, storytellers, food stalls with smoke rising into the floodlit sky.\n\nWe have a curated list of riads — traditional courtyard houses converted into small hotels — that represent some of our favorite places to stay anywhere in the world. Some have four rooms. Some have rooftop pools. All of them are exceptional.\n\nFor restaurants: we know where to eat. For bars: the rooftop scene is real and worth your evening. For shopping: we know which merchants are worth your time and which are performative tourist traps.\n\nCome for four days minimum. Come for seven if you can.`,
    date: "February 2026",
    readTime: "7 min read",
    gradient: "linear-gradient(135deg, #0d0500 0%, #1a0a00 30%, rgba(201,100,50,0.15) 100%)",
    featured: true
  },
  {
    slug: "miami",
    title: "Miami: The City You Think You Know",
    location: "Miami & Key West",
    country: "United States",
    excerpt: "Miami is our personal favourite. Not the tourist version — the real one, with hidden neighbourhoods, the drive to Key West, and the kind of evenings that don't end until morning.",
    body: `Miami is the destination closest to my heart, which means I'm probably biased — and also means I know it better than anywhere else we recommend.\n\nThe version of Miami most visitors get is real but incomplete. South Beach is iconic for a reason. The Art Deco architecture, the ocean, the energy on Ocean Drive at night — it delivers what it promises. But if that's all you see, you've missed the city.\n\nWe always recommend renting a car. Miami without a car is Miami with the handbrake on.\n\nWynwood: the arts district that started with street murals and evolved into one of the best gallery and restaurant neighbourhoods in America. The walls are still there. So are some excellent bars.\n\nDesign District: for the shopping, yes — the luxury boutiques are genuinely impressive — but also for the architecture and the smaller concept stores between them.\n\nBrickell: the financial district has transformed into a dining destination. Zuma sits here. So does a growing list of exceptional restaurants that don't show up in the tourist guides yet.\n\nLittle Havana: the coffee, the dominoes games in Maximo Gomez Park, the food — this is the hidden gem that sits in plain sight.\n\nAnd then there's the drive to Key West. Route 1 over the Overseas Highway is one of the great American road trips compressed into three hours. The road runs over open ocean for miles. Key West at the end of it — the southernmost point in the continental US, a town that has always operated on its own logic — is worth two nights minimum.\n\nWe arrange the rental, the route, the restaurants, and the hotels. You drive.`,
    date: "April 2026",
    readTime: "8 min read",
    gradient: "linear-gradient(135deg, #000510 0%, #000a1a 30%, rgba(100,150,220,0.2) 100%)",
    featured: true
  },
  {
    slug: "mykonos",
    title: "Mykonos: Unapologetic Luxury",
    location: "Mykonos",
    country: "Greece",
    excerpt: "Some destinations make no apologies for what they are. Mykonos is beautiful, expensive, social, and completely committed to the good life.",
    body: `Mykonos doesn't pretend to be something it's not, and we respect it for that.\n\nThis is the island for people who want to look good, eat exceptionally well, dance until the sun comes up, and shop in boutiques that stock things you can't find anywhere else in Europe. It's not a secret and it's not trying to be. It is what it is: one of the world's great luxury playground destinations, executed with genuine Greek flair.\n\nThe beaches here are organized by personality. Psarou for the see-and-be-seen crowd and some of the best beach club service in the Mediterranean. Nammos, if you know, you know. Elia for something slightly quieter but still beautiful. Paradise and Super Paradise for the days when you want the full energy.\n\nMykonos Town — the Chora — is genuinely beautiful beyond the Instagram version. The whitewashed lanes, the Little Venice waterfront where the windmills catch the light at sunset, the pelicans that wander the port — this is a real place with real history underneath the glamour.\n\nFor shopping: the town has evolved into a serious fashion destination. Greek designers alongside international luxury brands, plus jewelry and homeware that makes excellent souvenirs for people who don't usually buy souvenirs.\n\nFor dining: we have our shortlist. The island's restaurant scene has matured significantly and there are now genuinely world-class tables available — if you know where to book and when.\n\nWe recommend five nights minimum to do it justice. Arrive by ferry from Athens for the experience. Leave by seaplane if you want to end on a high.`,
    date: "May 2026",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #00050d 0%, #000a18 30%, rgba(180,200,240,0.15) 100%)",
    featured: false
  },
  {
    slug: "amalfi-coast",
    title: "The Amalfi Coast: Where the Road Ends and the Dream Begins",
    location: "Amalfi Coast",
    country: "Italy",
    excerpt: "Cliffside villages, lemon groves cascading into the sea, and tables set for two at the edge of the world.",
    body: `The Amalfi Coast is one of those places that looks like a film set because it essentially is one. The road — the SS163, carved into the cliff face above the Tyrrhenian Sea — is one of the most dramatic drives in Europe. The villages that cling to the rock above and below it — Positano, Ravello, Amalfi itself — have been hosting wealthy travelers for over a century and have refined the art of doing so.\n\nThis is not a hidden gem. It is one of the most visited coastlines in Europe, and in July and August the road becomes a slow-moving queue. Timing matters enormously here, and we know the windows.\n\nMay, early June, and September are exceptional. The light is extraordinary, the sea is warm enough, and the restaurants are fully operational without the peak-season pressure.\n\nPositano for the main event — the vertical village tumbling down to the sea, the beach, the boutiques. Ravello above the cloud line for the gardens, the music festival, and the silence. Praiano, between the two, for the nights when you want to eat extraordinarily well without the crowds.\n\nFor those who want to arrive differently: the hydrofoil from Naples is excellent. A private boat along the coast, stopping where you choose, is better. We arrange both.`,
    date: "April 2025",
    readTime: "4 min read",
    gradient: "linear-gradient(135deg, #1a0a00 0%, #2d1500 30%, rgba(201,169,110,0.2) 100%)",
    featured: false
  },
  {
    slug: "dubrovnik",
    title: "Dubrovnik After Dark: The City the Tourists Never See",
    location: "Dubrovnik",
    country: "Croatia",
    excerpt: "When the cruise ships leave and the old city falls silent, the real Dubrovnik reveals itself.",
    body: `Dubrovnik has a timing problem, and it's not one the city asked for.\n\nThe cruise ships arrive in the morning and the old city fills beyond comfortable capacity. By noon on a summer day, the marble streets — polished to a near-mirror shine by centuries of footsteps — are navigated shoulder-to-shoulder. The walls, the views, the architecture are still extraordinary. The experience is not.\n\nBut the ships leave in the afternoon.\n\nBy 6pm, the old city begins to exhale. By 8pm, with the golden light falling across the Stradun and the restaurants filling with people who are staying, not visiting, Dubrovnik becomes something else entirely. The place it was before the world discovered it, or close enough.\n\nWe always arrange accommodation inside or immediately adjacent to the old city walls for this reason. The ability to wake up at 6am and walk the walls before anyone else arrives — to have that limestone and sea view entirely to yourself — is one of the genuinely great travel experiences available in Europe.\n\nBeyond the walls: the Elaphiti Islands by private boat, Lokrum island for an afternoon, the Konavle valley inland for wine and the kind of quiet that seems impossible given how close it is to all of this.\n\nFor dinner: we know the tables worth sitting at. Several of them don't advertise.`,
    date: "June 2025",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #000d1a 0%, #001a2e 30%, rgba(100,140,180,0.2) 100%)",
    featured: false
  }
];
