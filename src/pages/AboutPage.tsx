import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import TricolorDivider from "@/components/TricolorDivider";

const learningOutcomes = [
  { icon: "🇫🇷", title: "French Language Skills", description: "Researching and writing about French culture helped reinforce vocabulary, grammar, and written expression." },
  { icon: "🏛️", title: "Cultural Knowledge", description: "Exploring France's history, landmarks, cuisine, and regions deepened our appreciation of Francophone culture." },
  { icon: "💻", title: "Digital Literacy", description: "Designing and building this website developed our research, synthesis, and technology skills." },
];

const vocabulary = [
  { french: "Gastronomie", english: "Gastronomy", context: "The art of French cuisine" },
  { french: "Patrimoine", english: "Heritage", context: "Cultural heritage sites" },
  { french: "Château", english: "Castle / Palace", context: "Palace of Versailles" },
  { french: "Boulangerie", english: "Bakery", context: "Where croissants are made" },
  { french: "Paysage", english: "Landscape", context: "Rolling Provençal countryside" },
  { french: "Littoral", english: "Coastline", context: "Brittany's rugged coastline" },
  { french: "Cathédrale", english: "Cathedral", context: "Notre-Dame Cathedral" },
  { french: "Vendange", english: "Grape harvest", context: "Wine regions of France" },
  { french: "Abbaye", english: "Abbey", context: "Mont Saint-Michel abbey" },
  { french: "Marché", english: "Market", context: "Local French markets" },
  { french: "Falaise", english: "Cliff", context: "Cliffs of Normandy" },
  { french: "Île", english: "Island", context: "Île-de-France region" },
];

const skills = [
  { label: "French Vocabulary", value: 85 },
  { label: "Cultural Knowledge", value: 90 },
  { label: "Research Skills", value: 80 },
  { label: "Web Design", value: 75 },
];

const journey = [
  { emoji: "🔍", title: "Research", description: "Gathering information about French regions, culture, and history" },
  { emoji: "✍️", title: "Writing", description: "Drafting and refining all English descriptions and cultural content" },
  { emoji: "🎨", title: "Design", description: "Planning the layout, color palette, and visual identity" },
  { emoji: "💻", title: "Build", description: "Developing the website and bringing everything together" },
];

const SkillBars = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.unobserve(el); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-6">
      {skills.map((s) => (
        <div key={s.label}>
          <div className="flex justify-between mb-2">
            <span className="font-body text-sm text-cream">{s.label}</span>
            <span className="font-body text-sm text-french-gold">{s.value}%</span>
          </div>
          <div className="skill-bar-track">
            <div
              className={`skill-bar-fill ${animate ? "animate" : ""}`}
              style={{ width: animate ? `${s.value}%` : "0%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const AboutPage = () => (
  <Layout>
    <PageHeader title="About This Project" subtitle="A French language and culture school project." />

    {/* Project description */}
    <section className="section-cream noise-texture py-16">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <ScrollReveal>
          <p className="font-body text-lg leading-relaxed text-foreground/90 drop-cap">
            This website was created as part of a French language and culture school project. Through researching and writing about France's most famous attractions and regions, we developed our French language skills — reinforcing vocabulary, grammar, and written expression in authentic, real-world contexts. We expanded our cultural knowledge of France, exploring its rich history, iconic landmarks, culinary traditions, and regional diversity across areas such as Brittany, Provence, and Île-de-France. Collaboratively designing and building this website also strengthened our digital literacy, research, and information synthesis skills. This project allowed us to bring together linguistic, cultural, and technical learning into one meaningful and practical experience.
          </p>
        </ScrollReveal>
      </div>
    </section>

    <TricolorDivider />

    {/* Learning outcomes */}
    <section className="section-cream-light noise-texture py-16">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-center mb-12 heading-reveal">Learning Outcomes</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8">
          {learningOutcomes.map((lo, i) => (
            <ScrollReveal key={lo.title} delay={i * 150}>
              <div className="bg-background rounded-xl shadow-md p-8 text-center h-full gold-border-card">
                <span className="text-4xl block mb-4">{lo.icon}</span>
                <h3 className="font-display text-xl font-bold mb-3">{lo.title}</h3>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">{lo.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <TricolorDivider />

    {/* What We Learned - Skill Bars */}
    <section className="section-navy py-16">
      <div className="container mx-auto px-6 max-w-xl">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-cream">What We Learned</h2>
        </ScrollReveal>
        <SkillBars />
      </div>
    </section>

    <TricolorDivider />

    {/* Project Journey */}
    <section className="section-cream noise-texture py-16">
      <div className="container mx-auto px-6 max-w-2xl relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-center mb-12 heading-reveal">Project Journey</h2>
        </ScrollReveal>
        <div className="relative pl-8">
          <div className="absolute left-[7px] top-0 bottom-0 w-[3px] timeline-line" />
          {journey.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 150}>
              <div className="relative flex items-start gap-4 mb-10">
                <div className="timeline-dot mt-1 -ml-[15px] flex items-center justify-center text-xs">
                </div>
                <div>
                  <p className="font-display text-lg font-bold">
                    <span className="mr-2">{step.emoji}</span>{step.title}
                  </p>
                  <p className="font-body text-sm text-foreground/80 mt-1">{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <TricolorDivider />

    {/* Vocabulary */}
    <section className="section-cream-light noise-texture py-16">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <ScrollReveal>
          <h2 className="font-display text-3xl font-bold text-center mb-4 heading-reveal">French Vocabulary Spotlight</h2>
          <p className="font-body text-center text-muted-foreground mb-10">
            Key French words used throughout this website
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <div className="overflow-x-auto">
            <table className="w-full bg-background rounded-xl shadow-md overflow-hidden">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="font-display text-left px-6 py-4 text-sm">French Word</th>
                  <th className="font-display text-left px-6 py-4 text-sm">English Meaning</th>
                  <th className="font-display text-left px-6 py-4 text-sm hidden md:table-cell">Context</th>
                </tr>
              </thead>
              <tbody>
                {vocabulary.map((v, i) => (
                  <tr key={v.french} className={i % 2 === 0 ? "bg-background" : "bg-secondary/30"}>
                    <td className="px-6 py-3 french-word font-body text-sm">{v.french}</td>
                    <td className="px-6 py-3 font-body text-sm">{v.english}</td>
                    <td className="px-6 py-3 font-body text-sm text-muted-foreground hidden md:table-cell">{v.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>

    <TricolorDivider />
  </Layout>
);

export default AboutPage;
