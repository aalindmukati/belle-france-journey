import ScrollReveal from "./ScrollReveal";

const events = [
  { year: "1163", text: "Construction of Notre-Dame Cathedral begins" },
  { year: "1661", text: "Louis XIV begins construction of Versailles" },
  { year: "1789", text: "The French Revolution" },
  { year: "1793", text: "The Louvre opens as a public museum" },
  { year: "1806", text: "Napoleon commissions the Arc de Triomphe" },
  { year: "1889", text: "The Eiffel Tower is built for the World's Fair" },
];

const LandmarkTimeline = () => (
  <section className="section-cream-light noise-texture py-16">
    <div className="container mx-auto px-6">
      <ScrollReveal>
        <h2 className="font-display text-3xl font-bold text-center mb-12 heading-reveal revealed">
          Timeline of French History
        </h2>
      </ScrollReveal>

      {/* Desktop: horizontal scroll */}
      <div className="hidden md:block overflow-x-auto pb-4">
        <div className="relative flex items-start gap-0 min-w-max px-8">
          {/* Gold connecting line */}
          <div className="absolute top-[18px] left-8 right-8 h-[3px] timeline-line" />
          {events.map((ev, i) => (
            <ScrollReveal key={ev.year} delay={i * 120}>
              <div className="relative flex flex-col items-center w-48 px-4">
                <div className="timeline-dot z-10" />
                <p className="font-display text-lg font-bold text-accent mt-3">{ev.year}</p>
                <p className="font-body text-xs text-center text-foreground/80 mt-1 leading-relaxed">{ev.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden relative pl-8">
        <div className="absolute left-[7px] top-0 bottom-0 w-[3px] timeline-line" />
        {events.map((ev, i) => (
          <ScrollReveal key={ev.year} delay={i * 100}>
            <div className="relative flex items-start gap-4 mb-8">
              <div className="timeline-dot mt-1 -ml-[15px]" />
              <div>
                <p className="font-display text-lg font-bold text-accent">{ev.year}</p>
                <p className="font-body text-sm text-foreground/80">{ev.text}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default LandmarkTimeline;
