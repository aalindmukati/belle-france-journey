import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="section-navy py-16">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Column 1: Branding */}
        <div>
          <p className="font-display text-2xl font-bold text-cream mb-2">
            <span className="text-french-gold">⚜️</span> La Belle France
          </p>
          <p className="font-body text-sm text-cream/70 mb-4">
            A journey through the heart of France
          </p>
          <div className="tricolor-divider max-w-[100px] !mx-0">
            <span /><span /><span />
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-display text-lg font-bold text-cream mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { to: "/", label: "Home" },
              { to: "/regions", label: "Regions" },
              { to: "/cuisine", label: "Cuisine" },
              { to: "/landmarks", label: "Landmarks" },
              { to: "/about", label: "About" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="font-body text-sm text-cream/70 hover:text-french-gold transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Regions */}
        <div>
          <h4 className="font-display text-lg font-bold text-cream mb-4">Regions Covered</h4>
          <ul className="space-y-2">
            {[
              { label: "Île-de-France", id: "ile-de-france" },
              { label: "Provence", id: "provence" },
              { label: "Brittany", id: "brittany" },
            ].map((r) => (
              <li key={r.id}>
                <Link
                  to={`/regions#${r.id}`}
                  className="font-body text-sm text-cream/70 hover:text-french-gold transition-colors"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Project Note */}
        <div>
          <h4 className="font-display text-lg font-bold text-cream mb-4">About This Project</h4>
          <p className="font-body text-sm text-cream/60 leading-relaxed">
            Created as part of a French language and culture school project. All content is written in English and intended for educational purposes.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10 pt-6 text-center">
        <p className="font-body text-xs text-cream/50 mb-2">
          © {new Date().getFullYear()} La Belle France. All rights reserved.
        </p>
        <p className="text-french-gold text-sm tracking-widest">⚜️ ⚜️ ⚜️</p>
      </div>
    </div>
  </footer>
);

export default Footer;
