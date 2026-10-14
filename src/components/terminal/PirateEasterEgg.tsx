export function PirateEasterEgg() {
  return <div className="pirate-easter-egg" role="img" aria-label="A tiny straw-hat pirate waving hello">
    <svg viewBox="0 0 120 150" aria-hidden="true" focusable="false">
      <ellipse className="pirate-shadow" cx="59" cy="140" rx="34" ry="6" />
      <g className="pirate-figure">
        {/* raised, waving arm */}
        <path className="pirate-skin" d="M39 82 25 57q-4-7 2-11 6-3 10 4l8 13-4-24q-1-8 6-9 7 0 8 8l3 19 3-17q1-7 8-6 7 2 6 9l-2 25-9 21Z" />
        <path className="pirate-vest" d="m42 78 34 0 11 51H34Z" />
        <path className="pirate-shirt" d="m54 79 11 0 5 50H49Z" />
        <path className="pirate-shorts" d="m35 120 53 0-3 18H62l-4-12-5 12H34Z" />
        <path className="pirate-sandal" d="M34 136h22l-2 5H31q-2-2 3-5Zm32 0h20q5 2 3 5H65Z" />
        <path className="pirate-neck" d="M48 63h23v21H48z" />
        <ellipse className="pirate-face" cx="59" cy="53" rx="27" ry="31" />
        <path className="pirate-hair" d="M33 49q-5-26 16-32l-4 12 13-16 1 14 15-12-4 18q12 7 12 23l-9-7-4 10-8-10-8 9-6-11-9 10-1-11-11 10Z" />
        <path className="pirate-eye" d="M47 52v5m23-5v5" />
        <path className="pirate-smile" d="M52 68q7 6 14 0" />
        <path className="pirate-scar" d="m36 45 9 8m-9-8-2 8" />
        <path className="pirate-hat-crown" d="M33 36q4-26 26-27 24 0 28 27Z" />
        <path className="pirate-hat-band" d="M34 31h52l3 9H31Z" />
        <path className="pirate-hat-brim" d="M24 40q35-11 71 0 6 2 2 7-39 12-78 0-4-4 5-7Z" />
      </g>
    </svg>
    <span className="sr-only">Straw-hat pirate Easter egg</span>
  </div>;
}
