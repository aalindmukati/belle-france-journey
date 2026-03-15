import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import TricolorDivider from "@/components/TricolorDivider";

import ileImg from "@/assets/ile-de-france.jpg";
import provenceImg from "@/assets/provence-lavender.jpg";
import brittanyImg from "@/assets/brittany-coast.jpg";
import eiffelImg from "@/assets/eiffel-tower.jpg";
import louvreImg from "@/assets/louvre.jpg";
import versaillesImg from "@/assets/versailles.jpg";
import lavenderImg from "@/assets/provence-lavender.jpg";
import palaisImg from "@/assets/palais-des-papes.jpg";
import calanquesImg from "@/assets/calanques.jpg";
import montImg from "@/assets/mont-saint-michel.jpg";
import saintMaloImg from "@/assets/saint-malo.jpg";
import carnacImg from "@/assets/carnac-stones.jpg";
import normandyImg from "@/assets/normandy-coast.jpg";
import ddayImg from "@/assets/dday-beaches.jpg";
import etretatImg from "@/assets/etretat-cliffs.jpg";
import rouenImg from "@/assets/rouen-cathedral.jpg";
import loireImg from "@/assets/loire-valley.jpg";
import chambordImg from "@/assets/chambord.jpg";
import chenonceauImg from "@/assets/chenonceau.jpg";
import loireVineyardsImg from "@/assets/loire-vineyards.jpg";
import alsaceImg from "@/assets/alsace-colmar.jpg";
import strasbourgImg from "@/assets/strasbourg-cathedral.jpg";
import alsaceWineImg from "@/assets/alsace-wine-route.jpg";
import hautKoenigsbourgImg from "@/assets/haut-koenigsbourg.jpg";

interface Attraction {
  name: string;
  image: string;
  description: string;
  badge: string;
}

interface Region {
  id: string;
  name: string;
  frenchName: string;
  bannerImage: string;
  paragraphs: string[];
  didYouKnow: string;
  attractions: Attraction[];
}

const regions: Region[] = [
  {
    id: "ile-de-france",
    name: "Île-de-France",
    frenchName: "Île-de-France",
    bannerImage: ileImg,
    paragraphs: [
      "Île-de-France is the heartland of France and the region that contains the nation's legendary capital, Paris. It is the political, cultural, and economic center of the country, home to the seat of government, the headquarters of major international organizations, and a concentration of world-renowned cultural institutions.",
      "The region is rich in art and architecture, from the soaring Gothic spires of medieval cathedrals to the grand boulevards and elegant Haussmann-era buildings that define the Parisian skyline. Fashion, philosophy, literature, and cinema all have deep roots here.",
      "Beyond Paris, Île-de-France encompasses charming towns, royal forests, and the magnificent Palace of Versailles. The region attracts more international visitors than almost any other place on Earth, drawing tens of millions of tourists each year.",
      "Whether you are admiring masterpieces at the Louvre, strolling along the banks of the Seine, or exploring the vibrant neighborhoods of Montmartre and Le Marais, Île-de-France offers an unparalleled window into French civilization."
    ],
    didYouKnow: "The Eiffel Tower was originally intended to be dismantled after 20 years but was saved because it served as a radio transmission tower.",
    attractions: [
      { name: "The Eiffel Tower", image: eiffelImg, description: "Built in 1889 by Gustave Eiffel for the World's Fair, this iron lattice tower stands 330 meters tall and is one of the most visited monuments in the world.", badge: "Most Visited" },
      { name: "The Louvre Museum", image: louvreImg, description: "The world's largest art museum, home to over 35,000 works including the Mona Lisa and the Venus de Milo.", badge: "Must Visit" },
      { name: "Palace of Versailles", image: versaillesImg, description: "A royal château of extraordinary opulence built under King Louis XIV, featuring over 2,000 rooms, the Hall of Mirrors, and vast manicured gardens.", badge: "UNESCO Site" },
    ],
  },
  {
    id: "provence",
    name: "Provence",
    frenchName: "Provence",
    bannerImage: provenceImg,
    paragraphs: [
      "Provence is located in southeastern France along the Mediterranean coast. It is one of the most enchanting and visually stunning regions in Europe, famous for its lavender fields, olive groves, warm climate, and charming hilltop villages.",
      "The region has long been a source of artistic inspiration. Vincent van Gogh painted some of his most celebrated works in Arles, while Paul Cézanne found endless inspiration in the landscapes around Aix-en-Provence.",
      "Provence is also known for its vibrant markets, fragrant herbs, and the laid-back art of living that the French call the art de vivre. The cuisine here emphasizes fresh, local ingredients — tomatoes, olives, garlic, and the region's renowned rosé wines.",
      "From the ancient Roman amphitheatres of Nîmes and Arles to the stunning turquoise waters of the Calanques, Provence offers a rich blend of history, natural beauty, and Mediterranean charm."
    ],
    didYouKnow: "Provence produces around 80% of the world's lavender essential oil.",
    attractions: [
      { name: "Lavender Fields of Valensole", image: lavenderImg, description: "Every summer, the plateau of Valensole transforms into a breathtaking sea of purple lavender, one of France's most iconic natural landscapes.", badge: "Hidden Gem" },
      { name: "Palais des Papes, Avignon", image: palaisImg, description: "A massive Gothic palace that served as the seat of the Catholic Church during the 14th century, now a UNESCO World Heritage Site.", badge: "UNESCO Site" },
      { name: "Calanques National Park", image: calanquesImg, description: "Stunning limestone cliffs dropping into turquoise Mediterranean waters, perfect for hiking and boat trips along the coast.", badge: "Must Visit" },
    ],
  },
  {
    id: "brittany",
    name: "Brittany",
    frenchName: "Bretagne",
    bannerImage: brittanyImg,
    paragraphs: [
      "Brittany is a rugged, windswept peninsula in northwestern France with a distinct Celtic heritage that sets it apart from the rest of the country. The region is known for its dramatic coastline, ancient megalithic monuments, and a strong regional identity.",
      "Unlike much of France, Brittany has its own native language — Breton — a Celtic tongue closely related to Welsh and Cornish. Centuries-old traditions, including music, dance, and festivals, remain vibrant in towns and villages throughout the region.",
      "The coastline of Brittany is among the most spectacular in Europe, with towering granite cliffs, hidden coves, and some of the highest tides in the world. The region's maritime heritage is deeply rooted, with historic ports like Saint-Malo once home to fearless privateers and explorers.",
      "Brittany's cuisine is distinctive too — buckwheat crêpes, fresh oysters from Cancale, and rich salted-butter caramel are just a few of the regional specialties that draw food lovers from around the world."
    ],
    didYouKnow: "Mont Saint-Michel receives over 3 million visitors per year, making it one of the most visited sites in all of France.",
    attractions: [
      { name: "Mont Saint-Michel", image: montImg, description: "A breathtaking medieval abbey perched on a tidal island, accessible by a causeway that floods at high tide. One of France's most recognizable landmarks.", badge: "UNESCO Site" },
      { name: "Saint-Malo", image: saintMaloImg, description: "A historic walled port city with ramparts you can walk along, golden sandy beaches, and a rich history of seafaring and privateers.", badge: "Hidden Gem" },
      { name: "Carnac Standing Stones", image: carnacImg, description: "One of the world's most remarkable prehistoric sites, featuring thousands of ancient standing stones arranged in long rows dating back over 6,000 years.", badge: "Must Visit" },
    ],
  },
];

const RegionsPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
    }
  }, [location.hash]);

  return (
    <Layout>
      <PageHeader title="Regions of France" subtitle="From the boulevards of Paris to the wild coasts of Brittany, discover France's most captivating regions." />

      {regions.map((region, idx) => (
        <div key={region.name} id={region.id}>
          <section className={`${idx % 2 === 0 ? "section-cream" : "section-cream-light"} noise-texture py-16`}>
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
              {/* Banner */}
              <ScrollReveal>
                <div className="image-card gold-border-card aspect-[21/9] rounded-xl overflow-hidden shadow-lg mb-10">
                  <img src={region.bannerImage} alt={region.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="image-card-overlay">
                    <div>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">{region.name}</h2>
                      <p className="french-word text-sm mt-1">{region.frenchName}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Content */}
              <ScrollReveal>
                <div className="max-w-3xl mx-auto space-y-4">
                  {region.paragraphs.map((p, i) => (
                    <p key={i} className={`font-body text-base leading-relaxed text-foreground/90 ${i === 0 ? "drop-cap" : ""}`}>{p}</p>
                  ))}
                </div>
              </ScrollReveal>

              {/* Did You Know */}
              <ScrollReveal>
                <div className="did-you-know pinned-note max-w-3xl mx-auto">
                  <p className="font-display text-lg font-semibold mb-2">📌 Did You Know?</p>
                  <p className="font-body text-base text-foreground/80">{region.didYouKnow}</p>
                </div>
              </ScrollReveal>

              {/* Attractions */}
              <ScrollReveal>
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  {region.attractions.map((a) => (
                    <div key={a.name} className="image-card gold-border-card aspect-[3/4] rounded-lg shadow-md">
                      <span className="ribbon-badge">{a.badge}</span>
                      <img src={a.image} alt={a.name} className="w-full h-full object-cover" loading="lazy" />
                      <div className="image-card-overlay flex-col justify-end">
                        <h3 className="font-display text-lg font-bold text-cream mb-1">{a.name}</h3>
                        <p className="font-body text-xs text-cream/80 leading-relaxed">{a.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
          <TricolorDivider />
        </div>
      ))}
    </Layout>
  );
};

export default RegionsPage;
