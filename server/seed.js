import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = new Database(path.join(__dirname, "data", "makeup_artist.db"));

const posts = [
  {
    slug: "prepare-skin-before-bridal-makeup",
    title: "How to Prepare Your Skin Before Bridal Makeup",
    category: "Bridal Preparation",
    excerpt: "A glowing complexion starts weeks before the wedding. Here is the skincare ritual every bride should follow for flawless bridal makeup.",
    date: "2026-08-15",
    author: "Aurelia",
    cover: "",
    readTime: "6 min read",
    content: [
      "Your wedding day makeup is only as flawless as the canvas beneath it. Preparing your skin in the weeks leading up to your wedding ensures your makeup applies smoothly, lasts throughout the day, and photographs beautifully.",
      "Start a consistent skincare routine at least six to eight weeks before the wedding. Cleanse, tone, moisturize, and never skip sunscreen. Hydration is the secret to that coveted dewy bridal glow.",
      "Gentle exfoliation twice a week removes dead skin cells and reveals a brighter complexion. Avoid harsh treatments or new products in the final two weeks to prevent unexpected reactions.",
      "On the wedding morning, arrive with clean, moisturized skin. Avoid heavy creams or oils that can cause makeup to slip."
    ]
  },
  {
    slug: "5-things-every-bride-should-know",
    title: "5 Things Every Bride Should Know Before Her Wedding Makeup",
    category: "Bridal Makeup",
    excerpt: "From trial sessions to timing, these five essentials will make your wedding makeup experience stress-free and stunning.",
    date: "2026-08-02",
    author: "Aurelia",
    cover: "",
    readTime: "5 min read",
    content: [
      "Your wedding makeup should feel like you — elevated. Here are five things every bride should know before sitting in the artist's chair.",
      "First, always book a makeup trial. It lets you and your artist align on the look, test products on your skin, and avoid surprises on the big day.",
      "Second, bring inspiration photos but stay open to professional guidance. Third, schedule enough time. Fourth, consider HD or airbrush makeup for long-lasting, photo-ready results. Fifth, pack a small touch-up kit."
    ]
  },
  {
    slug: "hd-makeup-vs-traditional-makeup",
    title: "HD Makeup vs Traditional Makeup: What Should You Choose?",
    category: "Makeup Tips",
    excerpt: "A simple guide to understanding HD and traditional makeup for events, photography and everyday glamour.",
    date: "2026-07-25",
    author: "Aurelia",
    cover: "",
    readTime: "5 min read",
    content: [
      "HD makeup is designed to look smooth and natural under high-resolution cameras, while traditional makeup can be adapted for a wide range of events.",
      "The right choice depends on your event, lighting, skin type and the finish you want. A consultation can help match the technique to your needs."
    ]
  }
];

const insert = db.prepare(`
  INSERT OR IGNORE INTO blog_posts
  (slug,title,category,excerpt,content,cover,author,read_time,published)
  VALUES (@slug,@title,@category,@excerpt,@content,@cover,@author,@readTime,1)
`);
const tx=db.transaction((items)=>items.forEach(p=>insert.run({...p,content:JSON.stringify(p.content)})));
tx(posts);
console.log(`Seed complete. Blog posts: ${db.prepare("SELECT COUNT(*) c FROM blog_posts").get().c}`);
db.close();
