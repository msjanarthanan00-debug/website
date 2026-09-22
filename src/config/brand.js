// =====================================================================
//  CENTRAL BRAND CONFIGURATION
//  Edit everything here — brand name, contact, images, services,
//  packages, testimonials, blog posts. Components read from this file.
// =====================================================================

export const brand = {
  // -------- BRAND IDENTITY --------
  name: "Aurelia",                       // <- Your brand / artist name
  tagline: "Professional Makeup Artist",
  quote: "Enhancing your natural beauty, one flawless look at a time.",
  // Replace with your real logo URL (upload to /public/images/logo/logo.png)
  logo: null,                            // null = uses stylized text logo
  logoText: "Aurelia",

  // -------- CONTACT INFORMATION --------
  phone: "+91 98765 43210",              // <- Your phone number
  whatsapp: "919876543210",              // <- WhatsApp number (digits only, with country code)
  email: "hello@aureliabeauty.com",      // <- Your email
  location: "Mumbai, India",             // <- Your city
  address: "Studio by appointment · Mumbai, India",
  instagram: "https://instagram.com",    // <- Your Instagram URL
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
  hours: "Mon – Sat · 9:00 AM – 7:00 PM",

  // -------- IMAGES (replace URLs with your own uploads) --------
  images: {
    hero: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/082530070_generated_0454038b.jpg",
    artist: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/676f8c1bb_generated_2008cdf8.jpg",
    bridalEye: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/d44e1c8f8_generated_d8ddfa06.jpg",
    reception: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/d8f80ecc6_generated_1a715f3e.jpg",
    engagement: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/1fbe5858b_generated_c201896d.jpg",
    party: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/fd28c0132_generated_d22367c1.jpg",
    hd: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/02deb9abf_generated_766b1b09.jpg",
    hair: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/c2ba6c00e_generated_abdb75f5.jpg",
    saree: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/82f6ad585_generated_e142b0ff.jpg",
    before: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/74dd906da_generated_b2ab1850.jpg",
    after: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/7e340312c_generated_4da4e71a.jpg",
    blogCover: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/e6713f8f7_generated_f77ae89e.jpg",
  },

  // -------- STATISTICS (animated counters) --------
  stats: [
    { value: 500, suffix: "+", label: "Happy Clients" },
    { value: 180, suffix: "+", label: "Bridal Looks" },
    { value: 8, suffix: "+", label: "Years Experience" },
    { value: 1200, suffix: "+", label: "Makeup Transformations" },
  ],
};

// -------- NAVIGATION --------
export const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/#about" },
  { label: "Services", path: "/#services" },
  { label: "Portfolio", path: "/#portfolio" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/#contact" },
];

// -------- SERVICES --------
export const services = [
  { name: "Bridal Makeup", desc: "Wedding makeup designed to create a timeless, elegant bridal look.", image: brand.images.hero, category: "bridal" },
  { name: "Reception Makeup", desc: "Glamorous looks designed for reception and evening events.", image: brand.images.reception, category: "reception" },
  { name: "Engagement Makeup", desc: "Elegant and photo-ready makeup for engagement ceremonies.", image: brand.images.engagement, category: "engagement" },
  { name: "Party Makeup", desc: "Modern glam looks for parties and special occasions.", image: brand.images.party, category: "party" },
  { name: "HD Makeup", desc: "High-definition makeup designed for photography and video.", image: brand.images.hd, category: "hd" },
  { name: "Hair Styling", desc: "Professional hairstyles customized to match the outfit and makeup.", image: brand.images.hair, category: "hair" },
  { name: "Saree Draping", desc: "Professional saree draping for weddings and special occasions.", image: brand.images.saree, category: "bridal" },
  { name: "Custom Makeup", desc: "Personalized makeup based on your preferences and event.", image: brand.images.bridalEye, category: "hd" },
];

// -------- PORTFOLIO (gallery) --------
export const portfolioCategories = ["All", "Bridal", "Reception", "Engagement", "Party", "HD Makeup", "Hair Styling"];

export const portfolio = [
  { url: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/b9e981f4c_generated_image.png", category: "Bridal", title: "Soft Romantic Bridal", alt: "Indian bride with soft romantic bridal makeup, rose-gold eyeshadow and dewy radiant skin", featured: true },
  { url: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/d4ec10386_generated_image.png", category: "Reception", title: "Smokey Reception Glam", alt: "Reception glam with smokey bronze eyes, glossy nude lips and statement gold earrings", featured: true },
  { url: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/88b0c64ea_generated_image.png", category: "Engagement", title: "Natural Engagement Glow", alt: "Soft natural engagement makeup with pink rose tones and fresh dewy skin" },
  { url: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/d000068f7_generated_image.png", category: "Party", title: "Bold Party Glam", alt: "Bold party glam with shimmering bronze eyeshadow, winged liner and glowing highlight" },
  { url: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/4ef831ef6_generated_image.png", category: "HD Makeup", title: "Flawless HD Detail", alt: "Macro close-up of flawless HD makeup with visible shimmer and dewy highlight on cheekbone" },
  { url: "https://media.base44.com/images/public/6aa5a54cf308a792be1a23c6/88951f32e_generated_image.png", category: "Hair Styling", title: "Romantic Bridal Updo", alt: "Elegant bridal updo hairstyle with soft curls, fresh flowers and gold accessories", featured: true },
  { url: brand.images.hero, category: "Bridal", title: "Rose-Gold Bridal", alt: "Bridal makeup featuring soft rose-gold eyeshadow and matte nude lips" },
  { url: brand.images.bridalEye, category: "HD Makeup", title: "Champagne Eye Detail", alt: "Macro close-up of bridal eye with rose-gold and champagne eyeshadow detail" },
  { url: brand.images.reception, category: "Reception", title: "Evening Elegance", alt: "Evening reception look with glossy nude lips and smokey definition" },
  { url: brand.images.engagement, category: "Engagement", title: "Blush Engagement", alt: "Soft natural engagement makeup with pink rose tones" },
  { url: brand.images.party, category: "Party", title: "Bronze Party Glow", alt: "Modern party glam with shimmering bronze eyeshadow and bold lashes" },
  { url: brand.images.saree, category: "Bridal", title: "Heritage Saree Bride", alt: "Bride in red and gold saree with elegant draping" },
  { url: brand.images.hair, category: "Hair Styling", title: "Soft Curl Romance", alt: "Romantic bridal hairstyle with soft curls and accessories" },
];

// -------- PACKAGES --------
export const packages = [
  {
    name: "Bridal Signature",
    tagline: "The essential bridal collection",
    features: ["Bridal Makeup", "Hair Styling", "Saree Draping", "Lashes", "HD Finish", "Touch-up"],
    featured: false,
  },
  {
    name: "Bridal Premium",
    tagline: "The complete wedding day experience",
    features: ["Bridal Makeup", "Reception Makeup", "Hair Styling", "Saree Draping", "HD Makeup", "Lashes", "Touch-up"],
    featured: true,
  },
  {
    name: "Event Glam",
    tagline: "Perfect for parties & special occasions",
    features: ["Party Makeup", "Hairstyling", "Lashes", "HD Finish"],
    featured: false,
  },
];

// -------- TESTIMONIALS --------
export const testimonials = [
  { name: "Priya Sharma", rating: 5, text: "Beautiful experience! The makeup was exactly what I wanted and looked amazing in photos. I felt like the most beautiful version of myself." },
  { name: "Ananya Iyer", rating: 5, text: "Absolutely stunning work. My bridal makeup lasted the entire day and looked flawless in every single photograph. Highly recommend!" },
  { name: "Riya Nair", rating: 5, text: "The attention to detail is incredible. She understood exactly the look I wanted and delivered beyond my expectations." },
  { name: "Meera Reddy", rating: 5, text: "Professional, punctual and so talented. My reception look was glamorous yet elegant. Thank you for making my day special!" },
  { name: "Sneha Patel", rating: 5, text: "Best makeup artist in the city. The HD makeup was so natural and flawless. I received endless compliments all evening." },
];

// -------- BLOG --------
export const blogCategories = [
  "Bridal Makeup", "Makeup Tips", "Skincare", "Beauty Trends",
  "Bridal Preparation", "Hair Styling", "Product Recommendations", "Makeup Tutorials"
];

export const blogPosts = [
  {
    slug: "prepare-skin-before-bridal-makeup",
    title: "How to Prepare Your Skin Before Bridal Makeup",
    category: "Bridal Preparation",
    excerpt: "A glowing complexion starts weeks before the wedding. Here is the skincare ritual every bride should follow for flawless bridal makeup.",
    date: "2026-08-15",
    author: "Aurelia",
    cover: brand.images.blogCover,
    readTime: "6 min read",
    content: [
      "Your wedding day makeup is only as flawless as the canvas beneath it. Preparing your skin in the weeks leading up to your wedding ensures your makeup applies smoothly, lasts throughout the day, and photographs beautifully.",
      "Start a consistent skincare routine at least six to eight weeks before the wedding. Cleanse, tone, moisturize, and never skip sunscreen. Hydration is the secret to that coveted dewy bridal glow — drink plenty of water and use a hyaluronic acid serum morning and night.",
      "Gentle exfoliation twice a week removes dead skin cells and reveals a brighter complexion. Avoid harsh treatments or new products in the final two weeks to prevent any unexpected reactions.",
      "On the wedding morning, arrive with clean, moisturized skin. Avoid heavy creams or oils that can cause makeup to slip. Trust your artist — a well-prepped face is the foundation of a look that lasts from the first vow to the last dance.",
    ],
  },
  {
    slug: "5-things-every-bride-should-know",
    title: "5 Things Every Bride Should Know Before Her Wedding Makeup",
    category: "Bridal Makeup",
    excerpt: "From trial sessions to timing, these five essentials will make your wedding makeup experience stress-free and stunning.",
    date: "2026-08-02",
    author: "Aurelia",
    cover: brand.images.hero,
    readTime: "5 min read",
    content: [
      "Your wedding makeup should feel like you — elevated. Here are five things every bride should know before sitting in the artist's chair.",
      "First, always book a makeup trial. It lets you and your artist align on the look, test products on your skin, and avoid any surprises on the big day.",
      "Second, bring inspiration photos but stay open to professional guidance. Third, schedule enough time — rushed makeup is never flawless. Fourth, consider HD or airbrush makeup for long-lasting, photo-ready results. Fifth, pack a small touch-up kit with lipstick and blotting paper for the reception.",
      "With these essentials covered, you can relax and enjoy the transformation — and the moments that follow.",
    ],
  },
  {
    slug: "hd-makeup-vs-traditional-makeup",
    title: "HD Makeup vs Traditional Makeup: What's the Difference?",
    category: "Makeup Tips",
    excerpt: "Confused between HD and traditional makeup? We break down the differences so you can choose the right finish for your event.",
    date: "2026-07-20",
    author: "Aurelia",
    cover: brand.images.hd,
    readTime: "7 min read",
    content: [
      "HD (high-definition) makeup and traditional makeup serve different purposes, and choosing the right one depends on your event, lighting, and photography needs.",
      "Traditional makeup uses standard formulations and is perfect for everyday wear and dimly lit venues. HD makeup, on the other hand, uses finely milled pigments that diffuse light, creating a flawless, invisible-to-the-camera finish ideal for photography and video.",
      "For weddings, receptions, and any event with professional photography, HD makeup is the clear winner — it prevents the flashback that can leave a white cast in flash photography. For intimate gatherings or evening parties, traditional makeup can be equally beautiful.",
      "Not sure which to choose? Book a consultation and we will recommend the perfect formula for your occasion.",
    ],
  },
  {
    slug: "makeup-last-all-day",
    title: "How to Make Your Makeup Last All Day",
    category: "Makeup Tips",
    excerpt: "Long events demand long-lasting makeup. Follow these pro techniques to keep your look fresh from morning to midnight.",
    date: "2026-07-05",
    author: "Aurelia",
    cover: brand.images.party,
    readTime: "5 min read",
    content: [
      "The secret to all-day makeup is layering, not piling. Start with a clean, primed canvas — primer grips your foundation and extends its wear dramatically.",
      "Use long-wear, waterproof formulas for eyes and lips, and set your base with a finely milled translucent powder only where needed. A setting spray locks everything in place and adds a natural, skin-like finish.",
      "Blot — never wipe — excess shine throughout the day, and carry your lipstick for a quick refresh. With these techniques, your makeup will look as fresh at midnight as it did at sunrise.",
    ],
  },
  {
    slug: "best-bridal-looks-indian-weddings",
    title: "Best Bridal Makeup Looks for Indian Weddings",
    category: "Beauty Trends",
    excerpt: "From soft glam to royal traditional, explore the most sought-after bridal makeup looks for Indian weddings this season.",
    date: "2026-06-18",
    author: "Aurelia",
    cover: brand.images.saree,
    readTime: "8 min read",
    content: [
      "Indian weddings are a celebration of color, culture, and beauty. The right bridal look honors tradition while reflecting your personal style.",
      "The Royal Traditional look features bold eyes, deep lips, and ornate jewelry — perfect for the main ceremony. The Soft Glam look is dewy, fresh, and romantic, ideal for daytime functions and engagement ceremonies.",
      "The Modern Minimal bride embraces natural skin with subtle definition — a beautiful choice for contemporary celebrations. Whatever your vision, we tailor every look to your outfit, features, and the story you want your photographs to tell.",
    ],
  },
  {
    slug: "choose-makeup-look-wedding-outfit",
    title: "How to Choose the Right Makeup Look for Your Wedding Outfit",
    category: "Bridal Makeup",
    excerpt: "Your outfit sets the tone — your makeup should complement it. Here's how to harmonize color, fabric, and finish for a cohesive bridal look.",
    date: "2026-06-01",
    author: "Aurelia",
    cover: brand.images.engagement,
    readTime: "6 min read",
    content: [
      "A cohesive bridal look balances makeup and outfit so neither competes for attention. The key is harmony in color, intensity, and finish.",
      "For richly embroidered reds and golds, deeper eye makeup and defined lips create balance. For pastels and lighter hues, softer makeup keeps the look airy and elegant. Match your makeup's finish to your outfit's fabric — matte for structured silhouettes, dewy for flowing, romantic drapes.",
      "Bring your outfit swatches and inspiration to your trial. Together, we will craft a look where every element sings in harmony.",
    ],
  },
];

export const getPostBySlug = (slug) => blogPosts.find((p) => p.slug === slug);