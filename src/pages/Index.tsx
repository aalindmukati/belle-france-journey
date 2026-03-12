import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import TricolorDivider from "@/components/TricolorDivider";
import heroImg from "@/assets/hero-paris.jpg";
import ileImg from "@/assets/ile-de-france.jpg";
import provenceImg from "@/assets/provence-lavender.jpg";
import brittanyImg from "@/assets/brittany-coast.jpg";

const regions = [
  { name: "Île-de-France", image: ileImg, teaser: "The cultural and political heart of France, home to the dazzling city of Paris." },
  { name: "Provence", image: provenceImg, teaser: "Sun-drenched lavender fields, olive groves, and charming hilltop villages along the Mediterranean." },
  { name: "Brittany", image: brittanyImg, teaser: "A rugged, windswept peninsula with dramatic coastlines and an ancient Celtic heritage." },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-cream mb-6 animate-fade-in-up">
            Welcome to France
          </h1>
          <p className="font-body text-lg md:text-xl text-cream/80 mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Explore the history, culture, and beauty of one of the world's most beloved destinations
          </p>
          <TricolorDivider className="animate-fade-in-up" />
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-cream/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-cream/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-cream py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <ScrollReveal>
            <p className="font-body text-lg leading-relaxed text-foreground/90">
              France is a country of extraordinary contrasts — from the glittering boulevards of Paris to the sun-soaked
              vineyards of Provence and the wild Atlantic coastline of Brittany. This website takes you on a journey
              through France's most iconic landmarks, vibrant regions, and celebrated culinary traditions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <TricolorDivider />

      {/* Featured Regions */}
      <section className="section-cream-light py-20">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">Featured Regions</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {regions.map((region, i) => (
              <ScrollReveal key={region.name} delay={i * 150}>
                <div className="image-card aspect-[3/4] rounded-lg shadow-lg">
                  <img src={region.image} alt={region.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="image-card-overlay flex-col justify-end">
                    <h3 className="font-display text-2xl font-bold text-cream mb-2">{region.name}</h3>
                    <p className="font-body text-sm text-cream/80 mb-4">{region.teaser}</p>
                    <Link
                      to="/regions"
                      className="inline-block font-body text-sm text-french-gold border-b border-french-gold hover:text-cream hover:border-cream transition-colors"
                    >
                      Discover More →
                    </Link>
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

export default Index;
