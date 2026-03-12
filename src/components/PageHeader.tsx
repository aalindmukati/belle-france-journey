import TricolorDivider from "./TricolorDivider";

const PageHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <section className="section-navy pt-28 pb-16 text-center">
    <div className="container mx-auto px-6">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">{title}</h1>
      {subtitle && <p className="font-body text-lg text-cream/70 max-w-2xl mx-auto">{subtitle}</p>}
      <TricolorDivider className="mt-8" />
    </div>
  </section>
);

export default PageHeader;
