/**
 * ServerDeck logo - uses the custom SD logo asset.
 */
export function Logo({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <img
      src="/serverdeck-logo.jpg"
      alt="ServerDeck"
      className={`shrink-0 rounded-lg object-cover ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
