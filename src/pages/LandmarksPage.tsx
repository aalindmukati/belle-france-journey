import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import TricolorDivider from "@/components/TricolorDivider";

import eiffelImg from "@/assets/eiffel-tower.jpg";
import notreDameImg from "@/assets/notre-dame.jpg";
import montImg from "@/assets/mont-saint-michel.jpg";
import versaillesImg from "@/assets/versailles.jpg";
import louvreImg from "@/assets/louvre.jpg";
import arcImg from "@/assets/arc-de-triomphe.jpg";

const landmarks = [
  {
    english: "Eiffel Tower",
    french: "Tour Eiffel",
    image: eiffelImg,
    year: "1889",
    location: "Paris",
    description: "Originally built as a temporary structure for the 1889 World's Fair, the Eiffel Tower has since become the enduring symbol of France. Standing 330 meters tall, it was the world's tallest man-made structure for 41 years. Today it welcomes nearly 7 million visitors annually and dazzles nightly with its sparkling light show.",
  },
  {
    english: "Notre-Dame Cathedral",
    french: "Cathédrale Notre-Dame de Paris",
    image: notreDameImg,
    year: "1163–1345",
    location: "Paris",
    description: "One of the finest examples of French Gothic architecture, Notre-Dame Cathedral stands on the Île de la Cité in the heart of Paris. Its iconic twin towers, flying buttresses, and stunning rose windows have inspired artists and writers for centuries. After the devastating 2019 fire, extensive restoration work is underway to restore it to its former glory.",
  },
  {
    english: "Mont Saint-Michel",
    french: "Mont Saint-Michel",
    image: montImg,
    year: "8th century",
    location: "Normandy / Brittany border",
    description: "Rising dramatically from a tidal island off the Normandy coast, Mont Saint-Michel is one of France's most extraordinary sights. The medieval abbey at its peak was a major pilgrimage destination throughout the Middle Ages. Twice a day, the tides surround the island, creating the illusion that it floats on the sea.",
  },
  {
    english: "Palace of Versailles",
    french: "Château de Versailles",
    image: versaillesImg,
    year: "1661–1710",
    location: "Versailles",
    description: "The Palace of Versailles was the principal royal residence of France for over a century under kings Louis XIV, XV, and XVI. Its Hall of Mirrors — a 73-meter-long gallery lined with 357 mirrors — remains one of the most spectacular interiors in the world. The palace and its vast gardens are now a UNESCO World Heritage Site.",
  },
  {
    english: "The Louvre",
    french: "Le Louvre",
    image: louvreImg,
    year: "12th century",
    location: "Paris",
    description: "Originally a medieval fortress, the Louvre was transformed into a royal palace before opening as a public museum in 1793. Today it is the world's most visited museum, housing approximately 35,000 works of art across 73,000 square meters. Its modern glass pyramid entrance, designed by I.M. Pei, has become an iconic landmark in its own right.",
  },
  {
    english: "Arc de Triomphe",
    french: "Arc de Triomphe",
    image: arcImg,
    year: "1806–1836",
    location: "Paris",
    description: "Commissioned by Napoleon Bonaparte to honor the soldiers of the French Revolutionary and Napoleonic Wars, the Arc de Triomphe stands at the center of the famous roundabout at the end of the Champs-Élysées. Beneath it lies the Tomb of the Unknown Soldier, with an eternal flame that has burned since 1921.",
  },
];

const LandmarksPage = () => (
  <Layout>
    <PageHeader title="Iconic Landmarks" subtitle="Timeless monuments that define the grandeur and history of France." />

    <section className="section-cream py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10">
          {landmarks.map((lm, i) => (
            <ScrollReveal key={lm.english} delay={i * 100}>
              <div className="bg-background rounded-xl shadow-lg overflow-hidden">
                <div className="image-card aspect-video">
                  <img src={lm.image} alt={lm.english} className="w-full h-full object-cover" loading="lazy" />
                  <div className="image-card-overlay">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-cream">{lm.english}</h3>
                      <p className="french-word text-sm">{lm.french}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-body px-3 py-1 rounded-full bg-primary text-primary-foreground">
                      {lm.location}
                    </span>
                    <span className="text-xs font-body text-muted-foreground">Built: {lm.year}</span>
                  </div>
                  <p className="font-body text-sm text-foreground/85 leading-relaxed">{lm.description}</p>
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

export default LandmarksPage;
