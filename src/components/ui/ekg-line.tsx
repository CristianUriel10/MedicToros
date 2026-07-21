/**
 * Línea de pulso EKG decorativa del hero
 * @returns {JSX.Element} SVG de electrocardiograma
 */
export function EkgLine() {
  return (
    <svg
      viewBox="0 0 120 24"
      className="h-6 w-28 text-accent-500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 12 H20 L26 4 L32 20 L38 12 H120"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
