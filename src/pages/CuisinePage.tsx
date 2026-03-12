import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import TricolorDivider from "@/components/TricolorDivider";

import croissantImg from "@/assets/croissant.jpg";
import bouillabaisseImg from "@/assets/bouillabaisse.jpg";
import crepeImg from "@/assets/crepe-bretonne.jpg";
import ratatouilleImg from "@/assets/ratatouille.jpg";
import coqImg from "@/assets/coq-au-vin.jpg";
import cremeImg from "@/assets/creme-brulee.jpg";
import bordeauxImg from "@/assets/bordeaux-wine.jpg";
import burgundyImg from "@/assets/burgundy-wine.jpg";
import champagneImg from "@/assets/champagne-region.jpg";

type Category = "All" | "Savory" | "Sweet" | "Pastry" | "Regional Classic";

const dishes = [
  { english: "Croissant", french: "Croissant", image: croissantImg, origin: "Paris / Île-de-France", description: "A flaky, buttery pastry of Austrian origin that France made its own. Best enjoyed fresh from a boulangerie on a Sunday morning. A staple of French breakfast culture.", category: "Pastry" as Category, badge: "Must Try" },
  { english: "Fish Stew", french: "Bouillabaisse", image: bouillabaisseImg, origin: "Provence", description: "A rich, saffron-infused seafood stew originating from the port city of Marseille. Traditionally made with local Mediterranean fish and served with crusty bread and rouille sauce.", category: "Savory" as Category, badge: "Regional Classic" },
  { english: "Buckwheat Crepes", french: "Crêpes Bretonnes", image: crepeImg, origin: "Brittany", description: "Thin savory pancakes made from buckwheat flour, filled with cheese, ham, and egg. A beloved specialty of Brittany enjoyed at street-side crêperies.", category: "Savory" as Category, badge: "Regional Classic" },
  { english: "Ratatouille", french: "Ratatouille", image: ratatouilleImg, origin: "Provence", description: "A hearty Provençal vegetable stew made from tomatoes, zucchini, eggplant, and bell peppers. A rustic, colorful dish that celebrates the summer harvest.", category: "Savory" as Category, badge: "Hidden Gem" },
  { english: "Chicken in Wine", french: "Coq au Vin", image: coqImg, origin: "Burgundy", description: "A classic French braise of chicken slow-cooked in red wine with mushrooms, lardons, and herbs. Deeply flavorful and a hallmark of French home cooking.", category: "Regional Classic" as Category, badge: "Must Try" },
  { english: "Burnt Cream", french: "Crème Brûlée", image: cremeImg, origin: "France-wide", description: "A silky vanilla custard topped with a thin layer of caramelized sugar, shattered at the table with a spoon. One of France's most iconic desserts.", category: "Sweet" as Category, badge: "Most Popular" },
];

const filters: Category[] = ["All", "Savory", "Sweet", "Pastry", "Regional Classic"];

const wineRegions = [
  { name: "Bordeaux", image: bordeauxImg, description: "The world's most renowned wine region, producing full-bodied reds and elegant whites from estates dating back centuries.", badge: "UNESCO Site" },
  { name: "Burgundy", image: burgundyImg, description: "Home to Pinot Noir and Chardonnay, Burgundy's terroir-driven wines are considered among the finest expressions of winemaking artistry.", badge: "Hidden Gem" },
  { name: "Champagne", image: champagneImg, description: "The birthplace of sparkling wine, where strict traditional methods produce the world's most celebrated celebratory drink.", badge: "Must Try" },
];

const CuisinePage = () => {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? dishes : dishes.filter((d) => d.category === active);

  return (
    <Layout>
      <PageHeader title="French Cuisine" subtitle="A celebration of flavor, tradition, and the art of eating well." />

      {/* Intro */}
      <section className="section-cream noise-texture py-16">
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <ScrollReveal>
            <p className="font-body text-lg leading-relaxed text-foreground/90 drop-cap">
              French cuisine is celebrated worldwide for its sophistication, technique, and regional diversity. In 2010, UNESCO
              added the traditional French gastronomic meal to its list of Intangible Cultural Heritage, recognizing its cultural
              importance. From buttery pastries to slow-simmered stews, every dish tells a story of place and tradition.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <TricolorDivider />

      {/* Filter + Dishes Grid */}
      <section className="section-cream-light noise-texture py-16">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`font-body text-sm px-5 py-2 rounded-full border transition-all duration-300 ${
                  active === f
                    ? "bg-accent text-accent-foreground border-accent shadow-md"
                    : "bg-background text-foreground border-border hover:border-accent hover:text-accent"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((dish, i) => (
              <div
                key={dish.english}
                className="bg-background rounded-xl shadow-md overflow-hidden h-full flex flex-col gold-border-card animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="image-card aspect-square relative">
                  <span className="ribbon-badge">{dish.badge}</span>
                  <img src={dish.image} alt={dish.english} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-xl font-bold mb-1">{dish.english}</h3>
                  <p className="french-word text-sm mb-3">{dish.french}</p>
                  <p className="font-body text-sm text-foreground/80 leading-relaxed flex-1">{dish.description}</p>
                  <span className="inline-block mt-4 text-xs font-body px-3 py-1 rounded-full bg-primary text-primary-foreground self-start">
                    {dish.origin}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TricolorDivider />

      {/* Pull quote */}
      <section className="section-navy py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <ScrollReveal>
            <blockquote className="gold-quote">
              <p className="font-display text-2xl md:text-3xl italic text-cream leading-relaxed">
                To eat well in France is not a luxury — it is a way of life.
              </p>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      <TricolorDivider />

      {/* Wine Regions */}
      <section className="section-cream noise-texture py-16">
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-center mb-12 heading-reveal">Wine Regions</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {wineRegions.map((region, i) => (
              <ScrollReveal key={region.name} delay={i * 150}>
                <div className="image-card gold-border-card aspect-[3/4] rounded-lg shadow-lg">
                  <span className="ribbon-badge">{region.badge}</span>
                  <img src={region.image} alt={region.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="image-card-overlay flex-col justify-end">
                    <h3 className="font-display text-xl font-bold text-cream mb-2">{region.name}</h3>
                    <p className="font-body text-xs text-cream/80 leading-relaxed">{region.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <TricolorDivider />
    </Layout>
  );
};

export default CuisinePage;
