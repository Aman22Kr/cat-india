// Sample data modelled on the reference site's structure. Prices/dates are DEMO values.
export const EXAMS = [
  { slug: 'cat', name: 'CAT', group: 'After Graduation' },
  { slug: 'cet', name: 'CET', group: 'After Graduation' },
  { slug: 'cmat', name: 'CMAT', group: 'After Graduation' },
  { slug: 'bank-ssc', name: 'Bank, SSC-CGL & Govt. Exams', group: 'After Graduation' },
  { slug: '3-yr-llb', name: '3-yr LLB', group: 'After Graduation' },
  { slug: 'ipm-bba', name: 'IPM BBA', group: 'Degrees After XII' },
  { slug: 'cuet', name: 'CUET', group: 'Degrees After XII' },
  { slug: 'clat', name: 'Law (5-Year LLB)', group: 'Degrees After XII' },
  ...['DA', 'ME', 'CE', 'EE', 'EC', 'CS'].map((s) => ({ slug: 'gate-' + s.toLowerCase(), name: 'GATE ' + s, group: 'GATE Academy' })),
  { slug: 'gmat', name: 'GMAT', group: 'International Exams' },
  { slug: 'gre', name: 'GRE', group: 'International Exams' },
  { slug: 'ielts', name: 'IELTS', group: 'International Exams' },
  { slug: 'toefl', name: 'TOEFL', group: 'International Exams' },
  { slug: 'sat', name: 'SAT', group: 'International Exams' },
  { slug: 'mba-consulting', name: 'MBA Admissions Consulting', group: 'Admissions Consulting' },
  { slug: 'ms-consulting', name: 'MS Admissions Consulting', group: 'Admissions Consulting' },
  { slug: 'ug-consulting', name: 'UG Admissions Consulting', group: 'Admissions Consulting' },
];
export const GROUPS = [...new Set(EXAMS.map((e) => e.group))];
export const examBySlug = (s) => EXAMS.find((e) => e.slug === s);

const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const P = (exam, mode, title, price, off, blurb) => ({ slug: slugify(title), exam, mode, title, price, off, blurb });

export const PROGRAMS = [
  P('cat', 'Test Series', 'SimCAT Core (30 mocks) 2026', 5950, 40, 'Focused mock practice: 30 full-length mocks with analytics and 30 sectional tests.'),
  P('cat', 'Test Series', 'SimCAT Plus (30 mocks) 2026', 6750, 40, 'Mocks plus extra DILR and RC practice sets with video solutions.'),
  P('cat', 'Test Series', 'SimCAT Ultimate (30 mocks) 2026', 8450, 40, 'Everything in Plus along with mocks for 11 other MBA entrance tests.'),
  P('cat', 'Self-paced', 'CATapult Self-Learning Program 2026', 15750, 40, 'Recorded lessons and online mocks for learners who study on their own schedule.'),
  P('cat', 'Test Series', 'ADMAT Test Series 2026', 4950, 25, 'Mocks across non-CAT MBA exams such as NMAT, SNAP, CMAT, XAT and MICAT.'),
  P('cat', 'Test Series', 'NMAT-SNAP Test Pack 2026', 2950, 25, 'Dedicated full-length and adaptive mocks for NMAT and SNAP.'),
  P('cet', 'Online', 'Online CMAT-CET Xclusive Live 2027', 18450, 30, 'Live online classes with mentor guidance and full-length mocks.'),
  P('cet', 'Classroom', 'Classroom CET Xclusive 2027', null, 0, 'Structured classroom program for MBA CET. Availability depends on city.'),
  P('cet', 'Classroom', 'Classroom NMAT-SNAP-CET Comprehensive 2027', null, 0, 'Offline program covering CET, CMAT, NMAT and SNAP.'),
  P('3-yr-llb', 'Test Series', '3 Year LLB Test Series 2027', 1500, 0, 'Practice tests for MAH-CET (3-year LLB) and related law entrance exams.'),
  P('3-yr-llb', 'Online', '3 Year LLB Online 2027', 40000, 30, 'Live online mentoring for graduates targeting 3-year law programs.'),
  P('3-yr-llb', 'Classroom', '3 Year LLB Classroom 2027', null, 0, 'Classroom coaching for 3-year LLB entrance exams.'),
  P('ipm-bba', 'Online', 'IPM Indore Online 2027', 55084, 30, 'Live online program for Class 12 (2027) students aiming at integrated management programs.'),
  P('ipm-bba', 'Classroom', 'IPM Indore Classroom Pro 2027', null, 0, 'In-person IPM preparation with mentors. City specific.'),
  P('ipm-bba', 'Test Series', 'Liberal Studies Test Series 2027', 1000, 0, 'Five mocks each for Ashoka, Krea and FLAME style tests.'),
  P('clat', 'Self-paced', 'CLAT Self-Learning Program 2027', 15000, 75, 'Courseware, mocks and performance insights for CLAT and allied exams.'),
  P('clat', 'Online', 'Law ADLAT Online 2027', 45000, 30, 'Structured online program for MH-CET Law, SLAT, NMIMS-LAT and more.'),
  P('clat', 'Classroom', 'CLAT Comprehensive Classroom Pro 2027', null, 0, 'Classroom program for CLAT, AILET and other law exams.'),
  P('cuet', 'Online', 'CUET Online 2027', 19000, 30, 'Live online CUET classes for students without a nearby centre.'),
  P('cuet', 'Classroom', 'CUET Comprehensive Classroom 2027', null, 0, 'Face-to-face CUET preparation with a peer group.'),
  P('sat', 'Online', 'SAT Online 2026', 60000, 0, 'Live strategy sessions, guided homework reviews and proctored mocks.'),
  P('sat', '1-on-1', 'SAT 1-on-1 Premium', null, 0, 'Personalised SAT plan with flexible hours.'),
  P('gmat', 'Online', 'GMAT Pro Live Online 2026', 59085, 0, 'Interactive live online batches from fundamentals to advanced.'),
  P('gmat', 'Self-paced', 'GMAT Self-Paced 2026', 24576, 0, 'Study materials, drills and mocks with mentor support.'),
  P('gre', 'Online', 'GRE Online 2026', 22033, 0, 'Live online GRE classes with doubt-solving.'),
  P('gre', 'Self-paced', 'GRE Self-Paced 2026', 12118, 0, 'Flexible GRE learning with on-demand doubt support.'),
  P('ielts', 'Classroom', 'IELTS Classroom 2026', null, 0, 'Instructor-led coaching for all four IELTS sections.'),
  P('mba-consulting', 'Consulting', 'MBA Admissions Consulting', null, 0, 'One-to-one guidance from profile evaluation to interviews.'),
  P('ms-consulting', 'Consulting', 'MS Admissions Consulting', null, 0, 'University shortlisting, essays and visa support.'),
  P('ug-consulting', 'Consulting', 'UG Admissions Consulting', null, 0, 'Profile building and applications for top global universities.'),
  ...['DA', 'ME', 'CE', 'EE', 'EC', 'CS'].flatMap((s) => [
    P('gate-' + s.toLowerCase(), 'Self-paced', `GATE Self-Learning ${s} 2027`, 27076, 30, 'Recorded content and online mocks for repeat GATE takers.'),
    P('gate-' + s.toLowerCase(), 'Online', `GATE Live Online ${s} 2027`, 34000, 30, 'Live online classes for first-time GATE takers.'),
  ]),
];
export const MODES = [...new Set(PROGRAMS.map((p) => p.mode))];
export const programBySlug = (s) => PROGRAMS.find((p) => p.slug === s);
export const gst = (p) => Math.round(p * 0.18);
export const discounted = (p) => (p.price ? Math.round(p.price * (1 - p.off / 100)) : null);

export function searchPrograms(q) {
  const t = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!t.length) return [];
  return PROGRAMS.filter((p) => {
    const hay = `${p.title} ${p.mode} ${p.blurb} ${examBySlug(p.exam)?.name}`.toLowerCase();
    return t.every((w) => hay.includes(w));
  });
}

export const PROGRAM_TYPES = [
  ['Classroom', 'For first-time takers; longer programs that start from the basics.'],
  ['Online', 'Live classes for high-aptitude students aiming at top percentiles.'],
  ['Self-paced', 'For repeat takers who want recorded content and flexibility.'],
  ['Test Series', 'Practice and testing content without teaching content.'],
  ['1-on-1', 'Hourly personalised sessions with dedicated support.'],
  ['Consulting', 'End-to-end admissions guidance for India and abroad.'],
];
export const CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Kolkata', 'Pune', 'Chennai', 'Hyderabad', 'Ahmedabad', 'Ranchi', 'Patna', 'Jaipur', 'Lucknow', 'Chandigarh', 'Indore', 'Kochi'];
export const STATS = [['75,000+', 'Students prepared every year'], ['30+', 'Tests covered'], ['49', 'Years of guidance'], ['15+', 'Demo cities']];
export const TESTIMONIALS = [
  ['Aarav S.', 'CAT, sample story', 'The mocks and mentor sessions kept my preparation honest and structured.'],
  ['Meera K.', 'CLAT, sample story', 'Weekly tests and quick doubt support helped me manage school and prep.'],
  ['Rohan D.', 'GATE DA, sample story', 'Recorded lessons plus live revision let me study around my job.'],
  ['Sneha P.', 'GRE, sample story', 'Profile review and SOP feedback made applications far less stressful.'],
];
export const BLOGS = [
  ['how-to-read-rc-for-cat', 'How to read RC passages for CAT', 'Read for the argument, not for every detail. Track the author’s stance and structure.'],
  ['cat-score-vs-percentile', 'CAT score vs percentile', 'Scores depend on difficulty; percentiles show where you stand among test takers.'],
  ['gate-prep-timeline', 'A realistic GATE preparation timeline', 'Split the year into concepts, practice and full mocks with revision loops.'],
  ['clat-gk-strategy', 'Building a steady CLAT current-affairs habit', 'Short daily reading beats weekend cramming. Keep a running revision note.'],
  ['choosing-a-gre-plan', 'Choosing between GRE batch and self-study', 'Match the format to your discipline, schedule and current score gap.'],
  ['mba-colleges-mumbai', 'Planning for MBA colleges in Mumbai', 'Compare exams accepted, fees and placement reports from official sources.'],
].map(([slug, title, excerpt]) => ({ slug, title, excerpt, body: excerpt + ' This is original sample content for the demo site; replace it with real articles.' }));
export const FAQS = [
  ['Is this a real institute website?', 'No. CAT-INDIA is a demo recreation built for learning. No real enrolment or payment happens.'],
  ['Where is my data saved?', 'Only in your own browser via localStorage. It does not sync between devices and is not an account.'],
  ['Can I really buy a program?', 'No. The cart and checkout are mock screens and never process payments.'],
  ['How do I clear saved data?', 'Use the “Clear saved data” button in the footer or clear site data in your browser.'],
  ['Are prices accurate?', 'Prices and discounts are sample values and may differ from any real provider.'],
  ['Which exams are listed?', 'CAT, CET, CMAT, law exams, IPM BBA, CUET, GATE branches, GMAT, GRE, IELTS, TOEFL, SAT and consulting.'],
];
