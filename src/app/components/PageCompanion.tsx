type Companion = {
  alt: string;
  className: string;
};

const companion = {
  alt: 'Tiny space soldier standing on the moon',
  className: 'is-space-soldier',
} as const satisfies Companion;

export function PageCompanion() {
  return (
    <div aria-hidden="true" className={`page-companion ${companion.className}`}>
      <div aria-label={companion.alt} className="companion-figure" role="img" />
    </div>
  );
}
