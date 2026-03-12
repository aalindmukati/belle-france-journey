const facts = [
  "France is the most visited country in the world, welcoming over 90 million tourists annually",
  "The French consume approximately 26,000 tonnes of snails every year",
  "France has 1,200 different types of cheese",
  "The French Kiss was not invented in France — the French call it a 'tongue kiss'",
  "France is the largest country by area in the European Union",
  "The Tour de France cycling race has been held since 1903",
];

const FactsTicker = () => (
  <div className="section-navy py-3 overflow-hidden">
    <div className="ticker-track">
      {[...facts, ...facts].map((fact, i) => (
        <span key={i} className="font-body text-sm text-french-gold whitespace-nowrap px-8 flex items-center gap-3">
          <span className="text-cream/40">⚜️</span>
          {fact}
        </span>
      ))}
    </div>
  </div>
);

export default FactsTicker;
