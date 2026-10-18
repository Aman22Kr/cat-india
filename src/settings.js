// ===== QUICK SETTINGS: edit these to rebrand / retune the whole site =====
export const SETTINGS = {
  brand: 'CAT-INDIA',
  tagline: 'Coaching for CAT, CET, GATE, IPM, CUET, Law & Study Abroad',
  referenceNote: 'Demo recreation. Not affiliated with any real institute.',
  animationSpeed: 'NORMAL',     // SLOW | NORMAL | FAST | OFF
  animationIntensity: 'STRONG', // SUBTLE | MEDIUM | STRONG
  github: 'Aman22kr',
};
const DUR = { SLOW: 0.8, NORMAL: 0.5, FAST: 0.25, OFF: 0 };
const DIST = { SUBTLE: 14, MEDIUM: 26, STRONG: 44 };
export const MOTION = {
  off: SETTINGS.animationSpeed === 'OFF',
  duration: DUR[SETTINGS.animationSpeed] ?? 0.5,
  distance: DIST[SETTINGS.animationIntensity] ?? 26,
  stagger: SETTINGS.animationIntensity === 'STRONG' ? 0.1 : 0.06,
};
