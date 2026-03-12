import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="section-navy py-12">
    <div className="container mx-auto px-6 text-center">
      <div className="tricolor-divider mb-8">
        <span /><span /><span />
      </div>
      <p className="font-display text-2xl mb-2 text-cream">
        <span className="text-french-gold">⚜️</span> La Belle France
      </p>
      <p className="font-body text-sm text-cream/60 mb-6">
        A French Language &amp; Culture School Project
      </p>
      <div className="flex flex-wrap justify-center gap-6 text-sm text-cream/70">
        {[
          { to: "/", label: "Home" },
          { to: "/regions", label: "Regions" },
          { to: "/map", label: "Map" },
          { to: "/cuisine", label: "Cuisine" },
          { to: "/landmarks", label: "Landmarks" },
          { to: "/about", label: "About" },
        ].map((l) => (
          <Link key={l.to} to={l.to} className="hover:text-french-gold transition-colors">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
