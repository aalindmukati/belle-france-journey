const TricolorDivider = ({ className = "" }: { className?: string }) => (
  <div className={`tricolor-divider ${className}`}>
    <span /><span /><span />
  </div>
);

export default TricolorDivider;
