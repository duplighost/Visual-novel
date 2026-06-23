// ============================================================================
//  PORTRAIT ENGINE  —  procedural Danganronpa-style SVG sprites
//  Each Ultimate gets a stylized half-body sprite derived from their palette,
//  a unique hair silhouette, eye shape, and the emblem of their talent.
// ============================================================================

// Per-character cosmetic overrides: hair style id, expression, eye style, extras.
const PORTRAIT_STYLE = {
  protagonist: { hair:"short",   eye:"determined", mouth:"flat",   extra:"" },
  itsuki:      { hair:"swoop",   eye:"soft",       mouth:"smirk",  extra:"mic" },
  silas:       { hair:"slick",   eye:"narrow",     mouth:"flat",   extra:"hat" },
  imogen:      { hair:"long",    eye:"halflid",    mouth:"tiny",   extra:"phones" },
  chloe:       { hair:"bob",     eye:"wide",       mouth:"grin",   extra:"sparkle" },
  jasmine:     { hair:"wave",    eye:"sharp",      mouth:"smirk",  extra:"crown" },
  sienna:      { hair:"pony",    eye:"keen",       mouth:"smirk",  extra:"" },
  leo:         { hair:"messy",   eye:"tired",      mouth:"smirk",  extra:"cig" },
  caleb:       { hair:"buzz",    eye:"wide",       mouth:"grin",   extra:"scar" },
  sabrina:     { hair:"wave",    eye:"soft",       mouth:"grin",   extra:"wink" },
  declan:      { hair:"slick",   eye:"narrow",     mouth:"flat",   extra:"" },
  fiona:       { hair:"bob",     eye:"sharp",      mouth:"flat",   extra:"" },
  asher:       { hair:"messy",   eye:"wide",       mouth:"tiny",   extra:"" },
  tanya:       { hair:"pony",    eye:"wide",       mouth:"grin",   extra:"" },
  rex:         { hair:"slick",   eye:"narrow",     mouth:"smirk",  extra:"glasses" },
  maeve:       { hair:"long",    eye:"keen",       mouth:"smirk",  extra:"" },
  elias:       { hair:"swoop",   eye:"soft",       mouth:"smirk",  extra:"hat" },
  nyx:         { hair:"long",    eye:"halflid",    mouth:"tiny",   extra:"" },
  rowan:       { hair:"emo",     eye:"halflid",    mouth:"flat",   extra:"" },
  kieran:      { hair:"swoop",   eye:"narrow",     mouth:"flat",   extra:"" },
  noboru:      { hair:"short",   eye:"soft",       mouth:"tiny",   extra:"" },
};

function hairPath(style) {
  // returns an SVG path string for a hair silhouette over a 200-wide head box
  switch (style) {
    case "short":  return "M55 78 Q56 28 100 26 Q144 28 145 78 Q140 50 100 46 Q60 50 55 78 Z";
    case "swoop":  return "M52 80 Q50 26 104 26 Q150 28 148 70 Q150 46 110 44 Q120 56 96 52 Q70 50 60 76 Q56 60 52 80 Z";
    case "slick":  return "M56 70 Q58 26 100 26 Q142 26 144 70 Q120 40 100 42 Q80 40 56 70 Z";
    case "long":   return "M50 150 Q44 60 100 26 Q156 60 150 150 Q150 100 138 92 Q150 60 100 48 Q50 60 62 92 Q50 100 50 150 Z";
    case "bob":    return "M52 118 Q48 30 100 26 Q152 30 148 118 Q150 70 132 66 Q150 48 100 46 Q50 48 68 66 Q50 70 52 118 Z";
    case "wave":   return "M50 140 Q42 50 100 26 Q158 50 150 140 Q156 96 136 80 Q150 56 100 48 Q50 56 64 80 Q44 96 50 140 Z";
    case "pony":   return "M58 70 Q58 26 100 26 Q150 26 148 78 Q160 60 168 110 Q150 96 144 74 Q120 42 100 44 Q80 42 56 70 Z";
    case "messy":  return "M52 76 Q48 24 100 24 Q152 24 148 76 Q150 44 130 50 Q140 34 112 44 Q116 56 92 48 Q70 42 66 60 Q70 44 54 54 Q56 64 52 76 Z";
    case "buzz":   return "M60 64 Q62 34 100 32 Q138 34 140 64 Q120 50 100 50 Q80 50 60 64 Z";
    case "emo":    return "M48 130 Q44 40 100 26 Q156 40 152 130 Q150 90 138 84 Q150 50 118 44 Q96 70 70 60 Q56 56 56 92 Q50 100 48 130 Z";
    default:       return "M55 78 Q56 28 100 26 Q144 28 100 46 Q60 50 55 78 Z";
  }
}

function eyePaths(style, eyeColor) {
  // returns SVG markup for both eyes; cx for left=80 right=120, cy=92
  const iris = eyeColor;
  const make = (cx) => {
    switch (style) {
      case "wide":       return `<ellipse cx="${cx}" cy="92" rx="9" ry="11" fill="#fff"/><circle cx="${cx}" cy="93" r="6.5" fill="${iris}"/><circle cx="${cx}" cy="93" r="3" fill="#10131a"/><circle cx="${cx-2}" cy="90" r="1.8" fill="#fff"/>`;
      case "sharp":      return `<path d="M${cx-10} 90 Q${cx} 84 ${cx+10} 90 Q${cx} 98 ${cx-10} 90 Z" fill="#fff"/><circle cx="${cx}" cy="91" r="5" fill="${iris}"/><circle cx="${cx}" cy="91" r="2.4" fill="#10131a"/>`;
      case "narrow":     return `<path d="M${cx-10} 92 Q${cx} 88 ${cx+10} 92 Q${cx} 95 ${cx-10} 92 Z" fill="#fff"/><circle cx="${cx}" cy="92" r="4.2" fill="${iris}"/><circle cx="${cx}" cy="92" r="2" fill="#10131a"/>`;
      case "halflid":    return `<ellipse cx="${cx}" cy="93" rx="9" ry="9" fill="#fff"/><circle cx="${cx}" cy="94" r="5.5" fill="${iris}"/><circle cx="${cx}" cy="94" r="2.6" fill="#10131a"/><rect x="${cx-10}" y="84" width="20" height="6" fill="var(--skin)"/>`;
      case "keen":       return `<path d="M${cx-10} 91 Q${cx} 85 ${cx+10} 91 Q${cx} 97 ${cx-10} 91 Z" fill="#fff"/><circle cx="${cx}" cy="92" r="5" fill="${iris}"/><circle cx="${cx}" cy="92" r="2.3" fill="#10131a"/><circle cx="${cx-1.6}" cy="90" r="1.2" fill="#fff"/>`;
      case "tired":      return `<ellipse cx="${cx}" cy="93" rx="8" ry="7" fill="#fff"/><circle cx="${cx}" cy="94" r="4.6" fill="${iris}"/><circle cx="${cx}" cy="94" r="2.2" fill="#10131a"/><path d="M${cx-9} 100 Q${cx} 103 ${cx+9} 100" stroke="#00000022" stroke-width="2" fill="none"/>`;
      case "determined": return `<path d="M${cx-10} 89 Q${cx} 86 ${cx+10} 90 Q${cx} 97 ${cx-10} 93 Z" fill="#fff"/><circle cx="${cx}" cy="92" r="5.2" fill="${iris}"/><circle cx="${cx}" cy="92" r="2.5" fill="#10131a"/><circle cx="${cx-1.8}" cy="90" r="1.3" fill="#fff"/>`;
      case "soft":
      default:           return `<ellipse cx="${cx}" cy="92" rx="8.5" ry="10" fill="#fff"/><circle cx="${cx}" cy="93" r="5.8" fill="${iris}"/><circle cx="${cx}" cy="93" r="2.7" fill="#10131a"/><circle cx="${cx-1.8}" cy="90" r="1.5" fill="#fff"/>`;
    }
  };
  return make(80) + make(120);
}

function browPaths(style) {
  switch (style) {
    case "sharp":
    case "narrow": return `<path d="M70 80 L92 78" stroke="#00000055" stroke-width="2.4" stroke-linecap="round"/><path d="M108 78 L130 80" stroke="#00000055" stroke-width="2.4" stroke-linecap="round"/>`;
    case "determined": return `<path d="M70 79 L91 82" stroke="#00000066" stroke-width="2.6" stroke-linecap="round"/><path d="M109 82 L130 79" stroke="#00000066" stroke-width="2.6" stroke-linecap="round"/>`;
    case "tired":
    case "halflid": return `<path d="M71 81 Q80 80 91 81" stroke="#00000044" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M109 81 Q120 80 129 81" stroke="#00000044" stroke-width="2" stroke-linecap="round" fill="none"/>`;
    default: return `<path d="M71 80 Q80 77 91 80" stroke="#00000044" stroke-width="2.2" stroke-linecap="round" fill="none"/><path d="M109 80 Q120 77 129 80" stroke="#00000044" stroke-width="2.2" stroke-linecap="round" fill="none"/>`;
  }
}

function mouthPath(style) {
  switch (style) {
    case "grin":  return `<path d="M88 116 Q100 126 112 116 Q100 121 88 116 Z" fill="#7a2230"/><path d="M89 116 Q100 119 111 116" stroke="#fff" stroke-width="2" fill="none"/>`;
    case "smirk": return `<path d="M90 117 Q104 121 113 114" stroke="#7a2230" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    case "tiny":  return `<path d="M94 117 Q100 120 106 117" stroke="#7a2230" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
    case "flat":
    default:      return `<path d="M91 117 L109 117" stroke="#7a2230" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
  }
}

function extraOverlay(extra, p) {
  switch (extra) {
    case "hat":     return `<path d="M44 56 Q100 30 156 56 L150 60 Q100 42 50 60 Z" fill="${p.outfit2}"/><rect x="64" y="40" width="72" height="20" rx="6" fill="${p.outfit2}"/><rect x="64" y="55" width="72" height="5" fill="${p.accent}"/>`;
    case "glasses": return `<rect x="68" y="85" width="24" height="16" rx="4" fill="none" stroke="#10131a" stroke-width="2.2"/><rect x="108" y="85" width="24" height="16" rx="4" fill="none" stroke="#10131a" stroke-width="2.2"/><path d="M92 91 L108 91" stroke="#10131a" stroke-width="2.2"/>`;
    case "phones":  return `<path d="M48 92 Q48 60 100 60 Q152 60 152 92" stroke="${p.accent}" stroke-width="5" fill="none"/><rect x="42" y="88" width="14" height="22" rx="5" fill="${p.outfit2}"/><rect x="144" y="88" width="14" height="22" rx="5" fill="${p.outfit2}"/>`;
    case "crown":   return `<path d="M74 40 L82 52 L92 38 L100 52 L108 38 L118 52 L126 40 L122 58 L78 58 Z" fill="#ffd24e" stroke="#caa024" stroke-width="1.5"/><circle cx="100" cy="46" r="2.4" fill="#ff5e9a"/>`;
    case "cig":     return `<rect x="110" y="118" width="18" height="3" rx="1.5" fill="#eee"/><rect x="124" y="118" width="5" height="3" fill="#d96a2a"/><circle cx="131" cy="119" r="2" fill="#ff7a3a" opacity="0.8"/>`;
    case "scar":    return `<path d="M122 84 L128 100" stroke="#b04a3a" stroke-width="2" stroke-linecap="round"/><path d="M120 88 L126 90 M122 94 L128 96" stroke="#b04a3a" stroke-width="1.4" stroke-linecap="round"/>`;
    case "mic":     return `<circle cx="120" cy="128" r="7" fill="${p.outfit2}" stroke="${p.accent}" stroke-width="1.5"/><rect x="118" y="133" width="4" height="14" fill="${p.outfit2}"/>`;
    case "sparkle": return `<g fill="${p.accent}"><path d="M150 64 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 z"/><path d="M52 70 l1.4 4 4 1.4 -4 1.4 -1.4 4 -1.4 -4 -4 -1.4 4 -1.4 z"/></g>`;
    case "wink":    return `<path d="M110 92 Q120 88 130 92" stroke="#10131a" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    default:        return "";
  }
}

// Builds the full SVG sprite markup for a character.
function buildPortrait(char, opts = {}) {
  const p = char.palette;
  const s = PORTRAIT_STYLE[char.id] || PORTRAIT_STYLE.protagonist;
  const w = opts.w || 200, h = opts.h || 240;
  const gid = "g_" + char.id;

  // both eyes are drawn; a "wink" extra simply paints a closed lid over the right one.
  const eyes = eyePaths(s.eye, p.eyes);

  return `
  <svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMax meet"
       class="dr-portrait" role="img" aria-label="${char.name}" style="--skin:${p.skin}">
    <defs>
      <linearGradient id="bg_${gid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${p.outfit}"/>
        <stop offset="1" stop-color="${p.outfit2}"/>
      </linearGradient>
      <radialGradient id="glow_${gid}" cx="0.5" cy="0.42" r="0.6">
        <stop offset="0" stop-color="${p.accent}" stop-opacity="0.35"/>
        <stop offset="1" stop-color="${p.accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <!-- body / shoulders -->
    <path d="M30 240 Q34 168 100 150 Q166 168 170 240 Z" fill="url(#bg_${gid})"/>
    <path d="M100 150 L100 240" stroke="${p.accent}" stroke-width="2" opacity="0.25"/>
    <path d="M62 178 Q100 162 138 178" stroke="${p.accent}" stroke-width="3" fill="none" opacity="0.5"/>

    <!-- neck -->
    <rect x="90" y="128" width="20" height="26" rx="6" fill="${p.skin}"/>
    <path d="M90 150 Q100 160 110 150" fill="#00000022"/>

    <!-- head -->
    <ellipse cx="100" cy="98" rx="46" ry="52" fill="${p.skin}"/>
    <path d="M62 110 Q100 150 138 110 Q120 140 100 142 Q80 140 62 110 Z" fill="#00000010"/>

    <!-- ears -->
    <ellipse cx="55" cy="100" rx="6" ry="10" fill="${p.skin}"/>
    <ellipse cx="145" cy="100" rx="6" ry="10" fill="${p.skin}"/>

    <!-- back hair (for long styles) -->
    <path d="${hairPath(s.hair)}" fill="${p.hair}"/>
    <path d="${hairPath(s.hair)}" fill="${p.hair2}" opacity="0.35" transform="translate(2,3)"/>

    <!-- face features -->
    ${browPaths(s.eye)}
    ${eyes}
    <path d="M98 104 Q100 108 102 104" stroke="#00000033" stroke-width="1.6" fill="none"/>
    ${mouthPath(s.mouth)}
    <ellipse cx="74" cy="108" rx="6" ry="4" fill="#ff9aa6" opacity="0.35"/>
    <ellipse cx="126" cy="108" rx="6" ry="4" fill="#ff9aa6" opacity="0.35"/>

    <!-- front hair fringe accent -->
    <path d="${hairPath(s.hair)}" fill="none" stroke="${p.accent}" stroke-width="1.2" opacity="0.4"/>

    <!-- extras -->
    ${extraOverlay(s.extra, p)}

    <!-- talent emblem badge -->
    <g transform="translate(150,196)">
      <circle r="20" fill="${p.outfit2}" stroke="${p.accent}" stroke-width="2"/>
      <text y="7" text-anchor="middle" font-size="20">${char.emblem || "★"}</text>
    </g>
    <rect x="0" y="0" width="${w}" height="${h}" fill="url(#glow_${gid})"/>
  </svg>`;
}

if (typeof module !== "undefined") module.exports = { buildPortrait, PORTRAIT_STYLE };
