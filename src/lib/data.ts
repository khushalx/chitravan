export type VisualPattern =
  | "madhubani"
  | "warli"
  | "gond"
  | "pattachitra"
  | "tanjore"
  | "kalamkari"
  | "phulkari"
  | "block"
  | "miniature"
  | "pottery"
  | "default";

export type Visual = {
  pattern: VisualPattern;
  colors: [string, string, string, string];
};

export type Artist = {
  id: string;
  slug: string;
  name: string;
  state: string;
  city: string;
  region: string;
  styles: string[];
  mediums: string[];
  bio: string;
  story: string;
  verified: boolean;
  followers: number;
  profileViews: number;
  audienceLocation: string;
  topArtworkSlug: string;
  visual: Visual;
};

export type Artwork = {
  id: string;
  slug: string;
  title: string;
  artistSlug: string;
  style: string;
  state: string;
  category: "Original" | "Print" | "Digital art" | "Handmade";
  description: string;
  culturalContext: string;
  price?: number;
  featured?: boolean;
  visual: Visual;
};

export type CommunityPost = {
  id: string;
  artistSlug: string;
  postType:
    | "Work in progress"
    | "Process note"
    | "Finished work"
    | "Workshop update"
    | "Challenge entry";
  postedAt: string;
  text: string;
  tags: string[];
  comments: number;
  likes: number;
  accent: string;
  artworkSlug: string;
};

export type RegionalArtForm = {
  slug: string;
  name: string;
  state: string;
  medium: string;
  context: string;
  featuredArtists: string[];
  visual: Visual;
};

export type Workshop = {
  id: string;
  title: string;
  teacherSlug: string;
  artForm: string;
  region: string;
  format: "Live" | "Recorded";
  access: "Free" | "Ticketed";
  dateTime: string;
  duration: string;
  seats: number;
  description: string;
};

export type MonthlyChallenge = {
  id: string;
  title: string;
  theme: string;
  prizeDetails: string;
  deadline: string;
  eligibility: string;
  submissions: number;
  description: string;
};

export type CollaborationCall = {
  id: string;
  title: string;
  artStyleNeeded: string;
  budgetRange: string;
  deadline: string;
  regionPreference: string;
  description: string;
};

export type GrantListing = {
  id: string;
  title: string;
  organization: string;
  support: string;
  deadline: string;
  eligibility: string;
  region: string;
  description: string;
};

export type SponsoredAd = {
  id: string;
  sponsor: string;
  title: string;
  copy: string;
  placement: string;
};

export type Inquiry = {
  id: string;
  title: string;
  collector: string;
  contact: string;
  budget: string;
  timeline: string;
  description: string;
  relatedArtworkSlug?: string;
  status: "New" | "Discussing" | "Accepted" | "Completed" | "Declined";
};

export const artists: Artist[] = [
  {
    id: "a-01",
    slug: "ananya-jha",
    name: "Ananya Jha",
    state: "Bihar",
    city: "Madhubani",
    region: "Mithila",
    styles: ["Madhubani", "Natural pigment", "Linework"],
    mediums: ["Traditional", "Painting", "Handmade"],
    bio: "A Mithila painter building contemporary compositions from folk memory, festivals, and courtyard rituals.",
    story:
      "Ananya learned linework from her grandmother and now documents everyday rituals in a quieter modern palette. Her work often begins in sketchbooks before moving to handmade paper.",
    verified: true,
    followers: 4820,
    profileViews: 18400,
    audienceLocation: "Patna, Delhi, Pune",
    topArtworkSlug: "courtyard-fish-song",
    visual: {
      pattern: "madhubani",
      colors: ["#E76F51", "#D9A441", "#C0DD97", "#3B6D11"],
    },
  },
  {
    id: "a-02",
    slug: "ramesh-varkhade",
    name: "Ramesh Varkhade",
    state: "Maharashtra",
    city: "Dahanu",
    region: "Konkan",
    styles: ["Warli", "Community murals", "Ritual forms"],
    mediums: ["Traditional", "Painting"],
    bio: "A Warli artist translating village gatherings, harvest, and music into spare rhythmic compositions.",
    story:
      "Ramesh paints with rice-paste-inspired geometry and teaches younger artists how to build movement with the simplest marks.",
    verified: true,
    followers: 3920,
    profileViews: 12900,
    audienceLocation: "Mumbai, Nashik, Bengaluru",
    topArtworkSlug: "night-harvest-circle",
    visual: {
      pattern: "warli",
      colors: ["#5F8F2F", "#3B6D11", "#FAF8F4", "#24231F"],
    },
  },
  {
    id: "a-03",
    slug: "meera-markam",
    name: "Meera Markam",
    state: "Madhya Pradesh",
    city: "Mandla",
    region: "Gondwana",
    styles: ["Gond", "Wildlife", "Dot pattern"],
    mediums: ["Traditional", "Digital", "Painting"],
    bio: "A Gond-inspired illustrator drawing forests, birds, and memory maps with patient dotted textures.",
    story:
      "Meera works between acrylic studies and digital translations, keeping the energy of hand-built dots visible in both.",
    verified: false,
    followers: 2140,
    profileViews: 7600,
    audienceLocation: "Bhopal, Hyderabad, Kochi",
    topArtworkSlug: "sal-tree-breathing",
    visual: {
      pattern: "gond",
      colors: ["#C0DD97", "#D96C9F", "#D9A441", "#3B6D11"],
    },
  },
  {
    id: "a-04",
    slug: "subhasis-padhi",
    name: "Subhasis Padhi",
    state: "Odisha",
    city: "Raghurajpur",
    region: "Puri",
    styles: ["Pattachitra", "Mythic panels", "Palm leaf"],
    mediums: ["Traditional", "Handmade", "Painting"],
    bio: "A Pattachitra maker focused on narrative panels, scroll rhythm, and temple-town detail.",
    story:
      "Subhasis builds each work as a story sequence, balancing devotional iconography with contemporary collectors' wall scale.",
    verified: true,
    followers: 5060,
    profileViews: 20200,
    audienceLocation: "Bhubaneswar, Kolkata, Chennai",
    topArtworkSlug: "jagannath-rath-study",
    visual: {
      pattern: "pattachitra",
      colors: ["#E76F51", "#D9A441", "#FAF8F4", "#3B6D11"],
    },
  },
  {
    id: "a-05",
    slug: "kavya-narayanan",
    name: "Kavya Narayanan",
    state: "Tamil Nadu",
    city: "Thanjavur",
    region: "Cauvery delta",
    styles: ["Tanjore", "Gold relief", "Devotional portraiture"],
    mediums: ["Traditional", "Painting", "Handmade"],
    bio: "A Tanjore artist pairing gold relief traditions with intimate portrait studies.",
    story:
      "Kavya works slowly with layered surfaces, recording how shine changes through the day before final varnishing.",
    verified: true,
    followers: 6410,
    profileViews: 24400,
    audienceLocation: "Chennai, Coimbatore, Dubai",
    topArtworkSlug: "golden-veena-study",
    visual: {
      pattern: "tanjore",
      colors: ["#D9A441", "#E76F51", "#FAF8F4", "#3B6D11"],
    },
  },
  {
    id: "a-06",
    slug: "nafisa-qureshi",
    name: "Nafisa Qureshi",
    state: "Andhra Pradesh",
    city: "Srikalahasti",
    region: "Rayalaseema",
    styles: ["Kalamkari", "Botanical drawing", "Textile art"],
    mediums: ["Textile", "Handmade", "Traditional"],
    bio: "A Kalamkari textile artist exploring botanical stories through hand-drawn cloth panels.",
    story:
      "Nafisa studies old garden drawings and market flowers, then translates them into cloth pieces with patient linework.",
    verified: false,
    followers: 1780,
    profileViews: 6900,
    audienceLocation: "Hyderabad, Jaipur, Ahmedabad",
    topArtworkSlug: "indigo-garden-cloth",
    visual: {
      pattern: "kalamkari",
      colors: ["#5F8F2F", "#D96C9F", "#D9A441", "#24231F"],
    },
  },
  {
    id: "a-07",
    slug: "gurleen-kaur",
    name: "Gurleen Kaur",
    state: "Punjab",
    city: "Patiala",
    region: "Malwa",
    styles: ["Phulkari", "Embroidery", "Textile memory"],
    mediums: ["Textile", "Handmade"],
    bio: "A Phulkari maker composing heirloom embroidery into wearable and framed textile works.",
    story:
      "Gurleen documents stitches from family wardrobes and rebuilds them as bright, contemporary textile maps.",
    verified: true,
    followers: 3180,
    profileViews: 9800,
    audienceLocation: "Chandigarh, Ludhiana, Delhi",
    topArtworkSlug: "gulabi-field-stitch",
    visual: {
      pattern: "phulkari",
      colors: ["#D96C9F", "#E76F51", "#D9A441", "#3B6D11"],
    },
  },
  {
    id: "a-08",
    slug: "devansh-somani",
    name: "Devansh Somani",
    state: "Rajasthan",
    city: "Jaipur",
    region: "Shekhawati",
    styles: ["Block printing", "Miniature painting", "Pattern systems"],
    mediums: ["Digital", "Textile", "Painting"],
    bio: "A digital illustrator and block-print researcher building repeat patterns from Rajasthani motifs.",
    story:
      "Devansh prototypes on tablet, carves selected motifs, and compares digital rhythm with hand-printed irregularity.",
    verified: false,
    followers: 2510,
    profileViews: 8300,
    audienceLocation: "Jaipur, Udaipur, Gurugram",
    topArtworkSlug: "desert-repeat-one",
    visual: {
      pattern: "block",
      colors: ["#D9A441", "#C0DD97", "#E76F51", "#24231F"],
    },
  },
];

export const artworks: Artwork[] = [
  {
    id: "w-01",
    slug: "courtyard-fish-song",
    title: "Courtyard Fish Song",
    artistSlug: "ananya-jha",
    style: "Madhubani",
    state: "Bihar",
    category: "Original",
    description:
      "A balanced Mithila composition of fish, leaves, and women gathered near a monsoon courtyard.",
    culturalContext:
      "Fish motifs in Mithila painting often carry fertility, abundance, and river memory.",
    price: 28000,
    featured: true,
    visual: artists[0].visual,
  },
  {
    id: "w-02",
    slug: "sita-garden-sketch",
    title: "Sita Garden Sketch",
    artistSlug: "ananya-jha",
    style: "Madhubani",
    state: "Bihar",
    category: "Print",
    description: "A smaller study translating folk narrative into a green garden rhythm.",
    culturalContext:
      "The piece borrows from household storytelling traditions without depicting a single fixed scene.",
    price: 4200,
    visual: {
      pattern: "madhubani",
      colors: ["#C0DD97", "#D96C9F", "#D9A441", "#3B6D11"],
    },
  },
  {
    id: "w-03",
    slug: "night-harvest-circle",
    title: "Night Harvest Circle",
    artistSlug: "ramesh-varkhade",
    style: "Warli",
    state: "Maharashtra",
    category: "Original",
    description: "A moonlit circular dance painted with spare village geometry.",
    culturalContext:
      "Warli compositions often turn communal work and celebration into a shared visual rhythm.",
    price: 18000,
    featured: true,
    visual: artists[1].visual,
  },
  {
    id: "w-04",
    slug: "monsoon-drumline",
    title: "Monsoon Drumline",
    artistSlug: "ramesh-varkhade",
    style: "Warli",
    state: "Maharashtra",
    category: "Handmade",
    description: "A long-format piece made for a hallway, full of dancers and drummers.",
    culturalContext:
      "The repeated figures reference seasonal gathering and oral performance.",
    visual: {
      pattern: "warli",
      colors: ["#3B6D11", "#C0DD97", "#FAF8F4", "#24231F"],
    },
  },
  {
    id: "w-05",
    slug: "sal-tree-breathing",
    title: "Sal Tree Breathing",
    artistSlug: "meera-markam",
    style: "Gond",
    state: "Madhya Pradesh",
    category: "Digital art",
    description: "A digital study of a living sal tree built from thousands of hand-placed dots.",
    culturalContext:
      "Gond-inspired visual language often treats forest life as animated and relational.",
    price: 9000,
    featured: true,
    visual: artists[2].visual,
  },
  {
    id: "w-06",
    slug: "hornbill-map",
    title: "Hornbill Map",
    artistSlug: "meera-markam",
    style: "Gond",
    state: "Madhya Pradesh",
    category: "Print",
    description: "A bird form carrying a pattern-map of streams and seeds.",
    culturalContext:
      "The work uses wildlife as a way to remember paths through forest villages.",
    price: 5200,
    visual: {
      pattern: "gond",
      colors: ["#D9A441", "#5F8F2F", "#D96C9F", "#24231F"],
    },
  },
  {
    id: "w-07",
    slug: "jagannath-rath-study",
    title: "Jagannath Rath Study",
    artistSlug: "subhasis-padhi",
    style: "Pattachitra",
    state: "Odisha",
    category: "Original",
    description: "A compact narrative panel inspired by the movement of the Rath Yatra.",
    culturalContext:
      "Pattachitra paintings from Odisha are known for story panels, firm linework, and devotional detail.",
    price: 36000,
    featured: true,
    visual: artists[3].visual,
  },
  {
    id: "w-08",
    slug: "palm-leaf-quiet",
    title: "Palm Leaf Quiet",
    artistSlug: "subhasis-padhi",
    style: "Pattachitra",
    state: "Odisha",
    category: "Handmade",
    description: "An intimate palm-leaf-inspired study with small repeating borders.",
    culturalContext:
      "The format nods to manuscript craft and devotional storytelling traditions.",
    visual: {
      pattern: "pattachitra",
      colors: ["#D9A441", "#3B6D11", "#E76F51", "#24231F"],
    },
  },
  {
    id: "w-09",
    slug: "golden-veena-study",
    title: "Golden Veena Study",
    artistSlug: "kavya-narayanan",
    style: "Tanjore",
    state: "Tamil Nadu",
    category: "Original",
    description: "A luminous study of music, gold relief, and devotional stillness.",
    culturalContext:
      "Tanjore painting is recognized for rich surfaces, relief work, and gold-toned detail.",
    price: 62000,
    featured: true,
    visual: artists[4].visual,
  },
  {
    id: "w-10",
    slug: "lamp-at-dusk",
    title: "Lamp at Dusk",
    artistSlug: "kavya-narayanan",
    style: "Tanjore",
    state: "Tamil Nadu",
    category: "Original",
    description: "A smaller gold-accented panel for collectors starting with Tanjore work.",
    culturalContext:
      "The lamp motif references evening ritual and the changing shine of gold leaf.",
    price: 24000,
    visual: {
      pattern: "tanjore",
      colors: ["#D9A441", "#C0DD97", "#E76F51", "#3B6D11"],
    },
  },
  {
    id: "w-11",
    slug: "indigo-garden-cloth",
    title: "Indigo Garden Cloth",
    artistSlug: "nafisa-qureshi",
    style: "Kalamkari",
    state: "Andhra Pradesh",
    category: "Handmade",
    description: "A hand-drawn textile panel of leaves, seed pods, and small birds.",
    culturalContext:
      "Kalamkari traditions use pen-drawn cloth storytelling and botanical or narrative detail.",
    price: 15000,
    visual: artists[5].visual,
  },
  {
    id: "w-12",
    slug: "market-flower-border",
    title: "Market Flower Border",
    artistSlug: "nafisa-qureshi",
    style: "Kalamkari",
    state: "Andhra Pradesh",
    category: "Print",
    description: "A border study inspired by flower sellers around Charminar.",
    culturalContext:
      "The work translates a living city scene into a textile pattern language.",
    price: 3800,
    visual: {
      pattern: "kalamkari",
      colors: ["#D96C9F", "#C0DD97", "#D9A441", "#24231F"],
    },
  },
  {
    id: "w-13",
    slug: "gulabi-field-stitch",
    title: "Gulabi Field Stitch",
    artistSlug: "gurleen-kaur",
    style: "Phulkari",
    state: "Punjab",
    category: "Handmade",
    description: "A bright embroidered panel arranged like a remembered field boundary.",
    culturalContext:
      "Phulkari work is deeply connected to domestic textiles, gifting, and regional memory.",
    price: 19500,
    featured: true,
    visual: artists[6].visual,
  },
  {
    id: "w-14",
    slug: "patiala-archive-piece",
    title: "Patiala Archive Piece",
    artistSlug: "gurleen-kaur",
    style: "Phulkari",
    state: "Punjab",
    category: "Original",
    description: "A stitched archive panel built from motifs found in family textiles.",
    culturalContext:
      "The work studies how inherited stitches can become contemporary wall pieces.",
    visual: {
      pattern: "phulkari",
      colors: ["#E76F51", "#D96C9F", "#D9A441", "#3B6D11"],
    },
  },
  {
    id: "w-15",
    slug: "desert-repeat-one",
    title: "Desert Repeat One",
    artistSlug: "devansh-somani",
    style: "Block Printing",
    state: "Rajasthan",
    category: "Digital art",
    description: "A repeat pattern prototype inspired by carved blocks and desert shrubs.",
    culturalContext:
      "Block printing in Rajasthan carries a long relationship between motif, dye, and cloth trade.",
    price: 7000,
    visual: artists[7].visual,
  },
  {
    id: "w-16",
    slug: "blue-pottery-morning",
    title: "Blue Pottery Morning",
    artistSlug: "devansh-somani",
    style: "Blue pottery",
    state: "Rajasthan",
    category: "Print",
    description: "A Jaipur blue pottery pattern interpreted as a flat digital poster.",
    culturalContext:
      "The blue and white language references ceramic craft without copying a specific historical tile.",
    price: 3200,
    visual: {
      pattern: "pottery",
      colors: ["#C0DD97", "#5F8F2F", "#D9A441", "#24231F"],
    },
  },
  {
    id: "w-17",
    slug: "miniature-monsoon-window",
    title: "Miniature Monsoon Window",
    artistSlug: "devansh-somani",
    style: "Miniature painting",
    state: "Rajasthan",
    category: "Digital art",
    description: "A digital miniature-inspired window scene with restrained detail.",
    culturalContext:
      "The composition studies scale, architecture, and mood from miniature painting traditions.",
    price: 8800,
    visual: {
      pattern: "miniature",
      colors: ["#D9A441", "#C0DD97", "#E76F51", "#3B6D11"],
    },
  },
  {
    id: "w-18",
    slug: "green-mithila-birds",
    title: "Green Mithila Birds",
    artistSlug: "ananya-jha",
    style: "Madhubani",
    state: "Bihar",
    category: "Original",
    description: "A bird pair study made with a calmer forest palette.",
    culturalContext:
      "Birds in folk paintings often carry ideas of companionship, travel, and seasonal return.",
    visual: {
      pattern: "madhubani",
      colors: ["#5F8F2F", "#C0DD97", "#D9A441", "#24231F"],
    },
  },
  {
    id: "w-19",
    slug: "village-procession-study",
    title: "Village Procession Study",
    artistSlug: "ramesh-varkhade",
    style: "Warli",
    state: "Maharashtra",
    category: "Print",
    description: "A study of movement, animals, and music in a horizontal procession.",
    culturalContext:
      "The minimal figures point toward shared village activity rather than individual portraiture.",
    price: 2800,
    visual: {
      pattern: "warli",
      colors: ["#E76F51", "#3B6D11", "#FAF8F4", "#24231F"],
    },
  },
  {
    id: "w-20",
    slug: "forest-listening-post",
    title: "Forest Listening Post",
    artistSlug: "meera-markam",
    style: "Gond",
    state: "Madhya Pradesh",
    category: "Digital art",
    description: "A digital composition where leaves, animal tracks, and wind marks share a frame.",
    culturalContext:
      "The piece uses forest motifs as active presences rather than scenic background.",
    visual: {
      pattern: "gond",
      colors: ["#3B6D11", "#C0DD97", "#D96C9F", "#D9A441"],
    },
  },
];

export const communityPosts: CommunityPost[] = [
  {
    id: "p-01",
    artistSlug: "ananya-jha",
    postType: "Work in progress",
    postedAt: "2 hours ago",
    text: "Testing a softer green border before I fill the fish scales. The quiet part of the painting always arrives first.",
    tags: ["process", "madhubani", "natural-pigment"],
    comments: 18,
    likes: 126,
    accent: "#E76F51",
    artworkSlug: "green-mithila-birds",
  },
  {
    id: "p-02",
    artistSlug: "ramesh-varkhade",
    postType: "Process note",
    postedAt: "4 hours ago",
    text: "Today's mural sketch is all rhythm. I am trying to keep the dancers light but the circle strong.",
    tags: ["warli", "wip", "murals"],
    comments: 11,
    likes: 98,
    accent: "#3B6D11",
    artworkSlug: "night-harvest-circle",
  },
  {
    id: "p-03",
    artistSlug: "meera-markam",
    postType: "Work in progress",
    postedAt: "Yesterday",
    text: "Dot layer three. I like when the bird starts looking like it is listening back.",
    tags: ["gond", "digital", "wildlife"],
    comments: 9,
    likes: 84,
    accent: "#D96C9F",
    artworkSlug: "hornbill-map",
  },
  {
    id: "p-04",
    artistSlug: "subhasis-padhi",
    postType: "Process note",
    postedAt: "Yesterday",
    text: "Border studies from this morning. The small mistakes are showing me where the scroll wants to breathe.",
    tags: ["pattachitra", "story-panel"],
    comments: 14,
    likes: 142,
    accent: "#D9A441",
    artworkSlug: "palm-leaf-quiet",
  },
  {
    id: "p-05",
    artistSlug: "kavya-narayanan",
    postType: "Finished work",
    postedAt: "2 days ago",
    text: "Gold catches the room differently after sunset. Keeping this one under a lamp for the final checks.",
    tags: ["tanjore", "gold-work"],
    comments: 23,
    likes: 210,
    accent: "#E76F51",
    artworkSlug: "lamp-at-dusk",
  },
  {
    id: "p-06",
    artistSlug: "nafisa-qureshi",
    postType: "Workshop update",
    postedAt: "2 days ago",
    text: "The flower border is becoming more Hyderabad than I expected. That is usually a good sign.",
    tags: ["kalamkari", "textile", "botanical"],
    comments: 8,
    likes: 73,
    accent: "#5F8F2F",
    artworkSlug: "market-flower-border",
  },
  {
    id: "p-07",
    artistSlug: "gurleen-kaur",
    postType: "Process note",
    postedAt: "3 days ago",
    text: "Archiving an old stitch from my nani's dupatta before adapting it for a framed panel.",
    tags: ["phulkari", "archive", "stitching"],
    comments: 19,
    likes: 156,
    accent: "#D96C9F",
    artworkSlug: "patiala-archive-piece",
  },
  {
    id: "p-08",
    artistSlug: "devansh-somani",
    postType: "Challenge entry",
    postedAt: "3 days ago",
    text: "Tablet sketch to carved block test. Digital repeat is perfect, block print is alive.",
    tags: ["block-printing", "digital", "pattern"],
    comments: 15,
    likes: 121,
    accent: "#D9A441",
    artworkSlug: "desert-repeat-one",
  },
  {
    id: "p-09",
    artistSlug: "ananya-jha",
    postType: "Finished work",
    postedAt: "4 days ago",
    text: "Finished the bird pair study and left the background quiet. Sometimes the empty cream space carries the song.",
    tags: ["madhubani", "finished-work", "birds"],
    comments: 21,
    likes: 184,
    accent: "#D96C9F",
    artworkSlug: "green-mithila-birds",
  },
  {
    id: "p-10",
    artistSlug: "subhasis-padhi",
    postType: "Workshop update",
    postedAt: "5 days ago",
    text: "Preparing a small session on story panel planning. Bring one folk story, one border idea, and patience.",
    tags: ["pattachitra", "workshop", "storytelling"],
    comments: 12,
    likes: 109,
    accent: "#3B6D11",
    artworkSlug: "jagannath-rath-study",
  },
];

export const regionalArtForms: RegionalArtForm[] = [
  {
    slug: "madhubani",
    name: "Madhubani",
    state: "Bihar",
    medium: "Painting",
    context:
      "A Mithila tradition known for dense linework, symbolic motifs, natural pigment memory, and domestic storytelling.",
    featuredArtists: ["Ananya Jha"],
    visual: artists[0].visual,
  },
  {
    slug: "warli",
    name: "Warli",
    state: "Maharashtra",
    medium: "Painting",
    context:
      "A visual language of circles, triangles, and community scenes rooted in village life and ritual gatherings.",
    featuredArtists: ["Ramesh Varkhade"],
    visual: artists[1].visual,
  },
  {
    slug: "gond",
    name: "Gond",
    state: "Madhya Pradesh",
    medium: "Painting and digital",
    context:
      "A forest-rich storytelling form where animals, trees, and spirits are often built through dots and pattern.",
    featuredArtists: ["Meera Markam"],
    visual: artists[2].visual,
  },
  {
    slug: "pattachitra",
    name: "Pattachitra",
    state: "Odisha",
    medium: "Painting",
    context:
      "Narrative cloth and scroll painting with firm linework, devotional scenes, and carefully structured borders.",
    featuredArtists: ["Subhasis Padhi"],
    visual: artists[3].visual,
  },
  {
    slug: "tanjore",
    name: "Tanjore",
    state: "Tamil Nadu",
    medium: "Painting",
    context:
      "A luminous tradition known for devotional figures, relief work, and gold-toned surfaces.",
    featuredArtists: ["Kavya Narayanan"],
    visual: artists[4].visual,
  },
  {
    slug: "kalamkari",
    name: "Kalamkari",
    state: "Andhra Pradesh",
    medium: "Textile",
    context:
      "Pen-drawn cloth work shaped by botanical detail, storytelling panels, and patient hand processes.",
    featuredArtists: ["Nafisa Qureshi"],
    visual: artists[5].visual,
  },
  {
    slug: "phulkari",
    name: "Phulkari",
    state: "Punjab",
    medium: "Textile",
    context:
      "A vibrant embroidery tradition connected to family textiles, gifting, memory, and fields of color.",
    featuredArtists: ["Gurleen Kaur"],
    visual: artists[6].visual,
  },
  {
    slug: "block-printing",
    name: "Block Printing",
    state: "Rajasthan",
    medium: "Textile",
    context:
      "A carved-block textile practice where motif, dye, hand pressure, and repetition create living pattern.",
    featuredArtists: ["Devansh Somani"],
    visual: artists[7].visual,
  },
  {
    slug: "miniature-painting",
    name: "Miniature Painting",
    state: "Rajasthan",
    medium: "Painting",
    context:
      "A refined painting language of scale, architecture, gesture, and detailed narrative worlds.",
    featuredArtists: ["Devansh Somani"],
    visual: {
      pattern: "miniature",
      colors: ["#D9A441", "#C0DD97", "#E76F51", "#24231F"],
    },
  },
  {
    slug: "blue-pottery",
    name: "Blue Pottery",
    state: "Rajasthan",
    medium: "Ceramic",
    context:
      "A Jaipur craft recognized for cool blue surfaces, floral geometry, and ceramic ornament.",
    featuredArtists: ["Devansh Somani"],
    visual: {
      pattern: "pottery",
      colors: ["#C0DD97", "#5F8F2F", "#D9A441", "#24231F"],
    },
  },
];

export const workshops: Workshop[] = [
  {
    id: "ws-01",
    title: "Madhubani Borders for Beginners",
    teacherSlug: "ananya-jha",
    artForm: "Madhubani",
    region: "Bihar",
    format: "Live",
    access: "Free",
    dateTime: "June 15, 2026, 6:00 PM IST",
    duration: "75 minutes",
    seats: 24,
    description: "Build border discipline with leaves, fish, and line repetition.",
  },
  {
    id: "ws-02",
    title: "Warli Movement and Figure Rhythm",
    teacherSlug: "ramesh-varkhade",
    artForm: "Warli",
    region: "Maharashtra",
    format: "Recorded",
    access: "Free",
    dateTime: "Available now",
    duration: "48 minutes",
    seats: 120,
    description: "A compact recorded class on making simple figures feel alive.",
  },
  {
    id: "ws-03",
    title: "Gond-Inspired Digital Brushes",
    teacherSlug: "meera-markam",
    artForm: "Gond",
    region: "Madhya Pradesh",
    format: "Live",
    access: "Ticketed",
    dateTime: "June 22, 2026, 7:30 PM IST",
    duration: "90 minutes",
    seats: 18,
    description: "Translate hand-dot rhythm into digital illustration without losing warmth.",
  },
  {
    id: "ws-04",
    title: "Pattachitra Story Panel Planning",
    teacherSlug: "subhasis-padhi",
    artForm: "Pattachitra",
    region: "Odisha",
    format: "Live",
    access: "Ticketed",
    dateTime: "June 29, 2026, 5:00 PM IST",
    duration: "2 hours",
    seats: 16,
    description: "Plan a small narrative panel with borders, sequence, and focal icons.",
  },
  {
    id: "ws-05",
    title: "Gold Relief Care for Tanjore Work",
    teacherSlug: "kavya-narayanan",
    artForm: "Tanjore",
    region: "Tamil Nadu",
    format: "Recorded",
    access: "Ticketed",
    dateTime: "Available now",
    duration: "62 minutes",
    seats: 80,
    description: "A careful class on surface preparation, shine, and collector handling.",
  },
  {
    id: "ws-06",
    title: "Phulkari Motif Archive",
    teacherSlug: "gurleen-kaur",
    artForm: "Phulkari",
    region: "Punjab",
    format: "Live",
    access: "Free",
    dateTime: "July 4, 2026, 4:00 PM IST",
    duration: "70 minutes",
    seats: 28,
    description: "Document family textile motifs and turn them into a simple stitch chart.",
  },
];

export const monthlyChallenges: MonthlyChallenge[] = [
  {
    id: "mc-01",
    title: "Monsoon Memory Challenge",
    theme: "Rain, soil, return",
    prizeDetails: "Featured homepage showcase and collector newsletter spotlight",
    deadline: "July 12, 2026",
    eligibility: "Open to Chitravan artists in India working in any medium.",
    submissions: 84,
    description:
      "Submit one artwork or process post that interprets rain, waiting, soil, or seasonal return.",
  },
  {
    id: "mc-02",
    title: "Festival Pattern Study",
    theme: "Local festivals and repeating motifs",
    prizeDetails: "Three artists receive editorial interviews and process features",
    deadline: "August 9, 2026",
    eligibility: "Open to folk, textile, ceramic, digital, and handmade work.",
    submissions: 47,
    description:
      "Create a fresh pattern study inspired by a festival memory from your city, village, or family.",
  },
  {
    id: "mc-03",
    title: "Forest Detail Prompt",
    theme: "Leaves, birds, insects, shade",
    prizeDetails: "Community jury feature and sponsored material kit",
    deadline: "September 1, 2026",
    eligibility: "Open to emerging artists and students.",
    submissions: 32,
    description:
      "Focus on one small forest detail and make it feel alive through your practice.",
  },
];

export const collaborationCalls: CollaborationCall[] = [
  {
    id: "cc-01",
    title: "Handmade Packaging Motif Call",
    artStyleNeeded: "Block printing, Kalamkari, or botanical linework",
    budgetRange: "INR 35,000 to 60,000",
    deadline: "June 30, 2026",
    regionPreference: "Rajasthan or Andhra Pradesh preferred",
    description:
      "A fictional craft studio is shortlisting original motif systems for a warm packaging pilot.",
  },
  {
    id: "cc-02",
    title: "Cafe Wall Folk Mural",
    artStyleNeeded: "Warli or Gond-inspired community scene",
    budgetRange: "INR 70,000 to 1,10,000",
    deadline: "July 18, 2026",
    regionPreference: "Maharashtra, Madhya Pradesh, or nearby",
    description:
      "A placeholder hospitality campaign is seeking a calm mural proposal for an indoor wall.",
  },
  {
    id: "cc-03",
    title: "Textile Story Capsule",
    artStyleNeeded: "Phulkari, Kalamkari, or mixed textile memory",
    budgetRange: "INR 40,000 to 75,000",
    deadline: "August 6, 2026",
    regionPreference: "Open across India",
    description:
      "A fictional lifestyle label wants three original textile storyboards for an editorial collaboration.",
  },
  {
    id: "cc-04",
    title: "Children's Book Pattern Set",
    artStyleNeeded: "Gond, Madhubani, or miniature-inspired digital illustration",
    budgetRange: "INR 55,000 to 90,000",
    deadline: "August 20, 2026",
    regionPreference: "Open across India",
    description:
      "A placeholder publishing project is inviting folk-inspired pattern proposals for endpapers.",
  },
];

export const grantListings: GrantListing[] = [
  {
    id: "gl-01",
    title: "Emerging Regional Artist Microgrant",
    organization: "Chitravan Placeholder Arts Fund",
    support: "INR 25,000 material support",
    deadline: "August 2, 2026",
    eligibility: "Early-career artists with 1-5 years of practice.",
    region: "Open across India",
    description:
      "Fictional support listing for artists developing traditional, digital, textile, or handmade Indian art practices.",
  },
  {
    id: "gl-02",
    title: "Women in Textile Practice Support",
    organization: "Placeholder Weave Collective",
    support: "Materials, mentorship, and showcase",
    deadline: "August 28, 2026",
    eligibility: "Women and non-binary textile artists.",
    region: "North and South India",
    description:
      "A fictional opportunity for stitch, dye, cloth drawing, and family textile archive projects.",
  },
  {
    id: "gl-03",
    title: "Digital Folk Translation Grant",
    organization: "Imaginary Studio Residency",
    support: "INR 40,000 and online residency",
    deadline: "September 10, 2026",
    eligibility: "Artists translating folk visual language into digital formats.",
    region: "Open across India",
    description:
      "Placeholder support for careful digital practice that credits regional context.",
  },
  {
    id: "gl-04",
    title: "Community Mural Material Support",
    organization: "Fictional Public Art Circle",
    support: "Paint, scaffolding support, and documentation",
    deadline: "September 22, 2026",
    eligibility: "Artist collectives and mural practitioners.",
    region: "Tier 2 and Tier 3 cities",
    description:
      "Fictional listing for collaborative wall projects rooted in local stories.",
  },
  {
    id: "gl-05",
    title: "Young Folk Artist Research Stipend",
    organization: "Placeholder Archive Lab",
    support: "INR 18,000 research stipend",
    deadline: "October 5, 2026",
    eligibility: "Artists under 30 documenting family or regional art memory.",
    region: "Open across India",
    description:
      "A fictional research support listing for sketches, interviews, motif studies, and process journals.",
  },
];

export const sponsoredAds: SponsoredAd[] = [
  {
    id: "ad-01",
    sponsor: "Studio Paper Co.",
    title: "Cold-pressed papers for Indian artists",
    copy: "Archival sheets, handmade texture, and small-batch sketchbooks for process-heavy work.",
    placement: "homepage",
  },
  {
    id: "ad-02",
    sponsor: "Sutradhar Frames",
    title: "Quiet framing for textile and paper works",
    copy: "Museum-grade framing options designed for delicate handmade surfaces.",
    placement: "feed",
  },
  {
    id: "ad-03",
    sponsor: "Rang Studio",
    title: "Natural pigment starter kits",
    copy: "Earthy color kits for workshops, students, and artists testing traditional palettes.",
    placement: "artwork",
  },
];

export const inquiries: Inquiry[] = [
  {
    id: "inq-01",
    title: "Custom Madhubani family tree panel",
    collector: "Priya Menon",
    contact: "priya.menon@example.com",
    budget: "INR 35,000 to 50,000",
    timeline: "6 weeks",
    description: "Looking for a warm housewarming gift with family names worked into the border.",
    relatedArtworkSlug: "courtyard-fish-song",
    status: "New",
  },
  {
    id: "inq-02",
    title: "Warli mural for cafe wall",
    collector: "Arjun Shah",
    contact: "+91 98765 43210",
    budget: "INR 80,000",
    timeline: "September opening",
    description: "Need a calm harvest scene for a 14 ft wall in Pune.",
    relatedArtworkSlug: "night-harvest-circle",
    status: "Discussing",
  },
  {
    id: "inq-03",
    title: "Small Tanjore panel",
    collector: "Nisha Rao",
    contact: "nisha.rao@example.com",
    budget: "INR 20,000 to 28,000",
    timeline: "Flexible",
    description: "Interested in a compact lamp or veena study with gold detail.",
    relatedArtworkSlug: "lamp-at-dusk",
    status: "Accepted",
  },
  {
    id: "inq-04",
    title: "Digital Gond poster series",
    collector: "Mosaic Books",
    contact: "studio@mosaicbooks.example",
    budget: "INR 45,000",
    timeline: "4 weeks",
    description: "Three poster studies for a children's reading corner.",
    relatedArtworkSlug: "sal-tree-breathing",
    status: "Completed",
  },
  {
    id: "inq-05",
    title: "Textile workshop quote",
    collector: "Utsa Collective",
    contact: "+91 90000 11122",
    budget: "To discuss",
    timeline: "Next quarter",
    description: "Exploring a small group session for botanical textile drawing.",
    status: "Declined",
  },
  {
    id: "inq-06",
    title: "Phulkari wedding gift panel",
    collector: "Kabir Sethi",
    contact: "kabir.sethi@example.com",
    budget: "INR 18,000 to 25,000",
    timeline: "8 weeks",
    description:
      "Looking for a framed textile work with pink and amber tones for a family wedding gift.",
    relatedArtworkSlug: "gulabi-field-stitch",
    status: "New",
  },
];

export function getArtistBySlug(slug: string) {
  return artists.find((artist) => artist.slug === slug);
}

export function getArtworkBySlug(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}

export function getArtworksByArtist(slug: string) {
  return artworks.filter((artwork) => artwork.artistSlug === slug);
}

export function getArtistForArtwork(artwork: Artwork) {
  return getArtistBySlug(artwork.artistSlug);
}

export function getFeaturedArtworks() {
  return artworks.filter((artwork) => artwork.featured).slice(0, 8);
}
