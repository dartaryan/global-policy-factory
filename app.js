/* ============================================
   Global Policy Factory — PassportCard
   app.js — All JavaScript Logic
   ============================================ */

// === State ===
const state = {
  currentView: 'dashboard',
  sidebarOpen: false,
  wizardStep: 1,
  wizardData: { type: 'individual' },
  selectedProduct: null,
  activeEventFilter: null,
  activeTerritoryFilter: null,
  activeGuardrailCategory: null,
  expandedRows: {}
};

// === View Names (Hebrew) ===
const viewNames = {
  'dashboard': 'לוח בקרה',
  'product-shelf': 'מדף מוצרים',
  'rule-engine': 'מנוע חוקים',
  'versioning': 'ניהול גרסאות',
  'price-calc': 'מחשבון תמחור',
  'currency': 'ניהול מטבעות',
  'gatekeeper': 'שומר סף והעברות',
  'reinsurance': 'ביטוח משנה',
  'guardrails': 'מעקות בטיחות',
  'audit': 'ביקורת ובקרה',
  'wizard': 'אשף הגדרה',
  'border-control': 'בקרת גבולות',
  'life-events': 'מגיב אירועי חיים',
  'corporate': 'מבנה ארגוני',
  'finance': 'פיננסים מתקדם'
};

// === Sample Data ===

const products = [
  { id: 1, name: 'Travel Basic', status: 'פעיל', statusClass: 'badge-active', version: 'v4.2', desc: 'ביטוח נסיעות סטנדרטי לטיולים קצרים. מכסה רפואי, מזוודות, ביטולים.', markets: '12 שווקים', score: 98, category: 'travel', created: '15/03/2023', modified: '08/02/2026', owner: 'שרה מ.' },
  { id: 2, name: 'Health Premium', status: 'פעיל', statusClass: 'badge-active', version: 'v3.1', desc: 'כיסוי בריאות מקיף לאקספטים. מחליף קופת חולים מקומית.', markets: '8 שווקים', score: 97, category: 'health', created: '01/06/2022', modified: '08/02/2026', owner: 'דוד ל.' },
  { id: 3, name: 'Digital Nomad Global', status: 'טיוטה', statusClass: 'badge-draft', version: 'v1.0', desc: 'כיסוי גלובלי לנוודים דיגיטליים. החלפת טריטוריה אוטומטית.', markets: 'גלובלי', score: 82, category: 'travel', created: '07/02/2026', modified: '07/02/2026', owner: 'אלון כ.' },
  { id: 4, name: 'Group Life', status: 'פעיל', statusClass: 'badge-active', version: 'v2.0', desc: 'ביטוח חיים קבוצתי ללקוחות ארגוניים. פוליסת אם + תעודות.', markets: '5 שווקים', score: 96, category: 'life', created: '10/01/2024', modified: '05/02/2026', owner: 'שרה מ.' },
  { id: 5, name: 'Travel Long-Term', status: 'פעיל', statusClass: 'badge-active', version: 'v5.3', desc: 'כיסוי נסיעות מורחב 90+ ימים. תוכניות סטודנטים ושבתון.', markets: '10 שווקים', score: 99, category: 'travel', created: '20/08/2021', modified: '01/02/2026', owner: 'שרה מ.' },
  { id: 6, name: 'Health Basic (Legacy)', status: 'הוצא משימוש', statusClass: 'badge-deprecated', version: 'v1.8', desc: 'דור קודם של תוכנית בריאות. בהעברה ל-Health Premium.', markets: '3 שווקים', score: null, category: 'health', created: '01/01/2020', modified: '15/12/2025', owner: 'דוד ל.' }
];

const rules = [
  { id: 1, name: 'תקופת חסד — 30 ימים', trigger: 'תשלום באיחור > 0 ימים', action: 'הגדר סטטוס → תקופת חסד', products: 'כל הנסיעות', status: 'פעיל', statusClass: 'badge-active', fired: 142, on: true },
  { id: 2, name: 'פקיעה אוטומטית', trigger: 'תקופת חסד הסתיימה', action: 'הגדר סטטוס → פג תוקף', products: 'כל המוצרים', status: 'פעיל', statusClass: 'badge-active', fired: 38, on: true },
  { id: 3, name: 'חלון חידוש — 60 ימים', trigger: 'תאריך פקיעה - 60 ימים', action: 'שלח הודעת חידוש', products: 'Health Premium', status: 'פעיל', statusClass: 'badge-active', fired: 256, on: true },
  { id: 4, name: 'מעבר קבוצת גיל', trigger: 'יום הולדת לקוח', action: 'חשב פרמיה מחדש', products: 'כל הבריאות', status: 'בבדיקה', statusClass: 'badge-review', fired: null, on: true },
  { id: 5, name: 'נעילת טריטוריה — 12 חודשים', trigger: 'אותו טריטוריה > 12 חודשים', action: 'הפעל החלפת מוצר', products: 'Digital Nomad', status: 'טיוטה', statusClass: 'badge-draft', fired: null, on: false },
  { id: 6, name: 'בדיקת תאימות רגולטורית', trigger: 'שינוי פוליסה', action: 'אמת מול מסגרת תאימות', products: 'כל המוצרים', status: 'פעיל', statusClass: 'badge-active', fired: 89, on: true }
];

const versionData = {
  'Travel Basic': [
    { version: 'v4.2', current: true, major: false, desc: 'עדכון טבלאות תעריפים לשוק DE. פורסם ע"י שרה מ.', date: '8 בפב׳ 2026, 09:14' },
    { version: 'v4.1', current: false, major: false, desc: 'הוספת שכבת כיסוי ביטול. התאמת תמחור קלה.', date: '22 בינו׳ 2026, 14:30' },
    { version: 'v4.0', current: false, major: true, desc: 'מבנה מחדש מלא לתאימות EU. שכבות כיסוי חדשות.', date: '15 בדצמ׳ 2025, 11:00' },
    { version: 'v3.8', current: false, major: false, desc: 'הוספת הרחבת כיסוי COVID.', date: '3 בנוב׳ 2025, 16:45' },
    { version: 'v3.7', current: false, major: false, desc: 'תיקון חישוב פרמיה לשוק UK.', date: '18 באוק׳ 2025, 10:22' }
  ],
  'Health Premium': [
    { version: 'v3.1', current: true, major: false, desc: 'עדכון טבלת תעריפים AU. תוספת כיסוי שיניים.', date: '8 בפב׳ 2026, 08:45' },
    { version: 'v3.0', current: false, major: true, desc: 'מעבר לטבלאות גיל חדשות. רמת כיסוי פלטינום חדשה.', date: '1 בינו׳ 2026, 10:00' },
    { version: 'v2.5', current: false, major: false, desc: 'תיקון חישוב תקופת המתנה.', date: '15 בנוב׳ 2025, 14:30' }
  ],
  'Group Life': [
    { version: 'v2.0', current: true, major: true, desc: 'מבנה מחדש — פוליסת אם + תעודות חברים.', date: '10 בינו׳ 2026, 09:00' },
    { version: 'v1.5', current: false, major: false, desc: 'הוספת תמיכה בתת-קבוצות.', date: '1 בנוב׳ 2025, 11:30' }
  ],
  'Digital Nomad Global': [
    { version: 'v1.0', current: true, major: true, desc: 'גרסה ראשונית. תבנית בסיס עם כיסוי גלובלי.', date: '7 בפב׳ 2026, 18:22' }
  ]
};

const auditLogs = [
  { timestamp: '8 בפב׳, 09:14:32', user: 'שרה מ.', action: 'פרסום', actionClass: 'badge-green', entity: 'Travel Basic DE v4.2', tags: ['SOX'], desc: 'פרסום גרסה 4.2 לשוק גרמניה', before: 'v4.1', after: 'v4.2' },
  { timestamp: '8 בפב׳, 08:45:11', user: 'דוד ל.', action: 'עדכון', actionClass: 'badge-blue', entity: 'טבלת תעריפים — Health AU', tags: ['GDPR', 'SOX'], desc: 'עדכון תעריפי בסיס לקבוצת גיל 50-59', before: '$340.00', after: '$355.00' },
  { timestamp: '8 בפב׳, 07:30:00', user: 'מערכת', action: 'התראה', actionClass: 'badge-amber', entity: 'Group Life IL — ציון 93%', tags: ['SOX'], desc: 'ציון שלמות ירד מתחת לסף 95%', before: '96%', after: '93%' },
  { timestamp: '7 בפב׳, 18:22:44', user: 'אלון כ.', action: 'יצירה', actionClass: 'badge-purple', entity: 'תבנית Digital Nomad Global', tags: ['GDPR'], desc: 'יצירת תבנית מוצר חדשה לנוודים דיגיטליים', before: '—', after: 'v1.0 טיוטה' },
  { timestamp: '7 בפב׳, 16:10:05', user: 'שרה מ.', action: 'שחזור', actionClass: 'badge-red', entity: 'Travel Basic DE v4.1 → v4.0', tags: ['SOX'], desc: 'שחזור גרסה קודמת בעקבות בעיית תמחור', before: 'v4.1', after: 'v4.0' },
  { timestamp: '7 בפב׳, 14:55:20', user: 'דוד ל.', action: 'עדכון', actionClass: 'badge-blue', entity: 'חוק מעבר קבוצת גיל', tags: ['GDPR'], desc: 'עדכון תנאי טריגר — שינוי מ-30 ל-60 ימים', before: '30 ימים', after: '60 ימים' },
  { timestamp: '7 בפב׳, 11:30:00', user: 'מערכת', action: 'יצירה', actionClass: 'badge-purple', entity: 'בורדרו Q1-2026 — Swiss Re', tags: ['SOX'], desc: 'יצירה אוטומטית של בורדרו רבעוני', before: '—', after: 'Q1-2026' },
  { timestamp: '6 בפב׳, 16:42:18', user: 'שרה מ.', action: 'עדכון', actionClass: 'badge-blue', entity: 'Health Premium AU — כיסוי שיניים', tags: ['GDPR', 'SOX'], desc: 'הוספת כיסוי שיניים לחבילת פרימיום', before: 'לא כלול', after: 'כלול עד $2,000/שנה' }
];

const treaties = [
  { id: 1, name: 'QS-2026-Travel', type: 'Quota Share (40%)', partner: 'Swiss Re', capacity: '$50M', utilization: 87, period: '01/2026-12/2026', status: 'פעיל', statusClass: 'badge-active' },
  { id: 2, name: 'SL-2026-Health', type: 'Stop Loss ($2M xs $1M)', partner: 'Munich Re', capacity: '$25M', utilization: 62, period: '01/2026-12/2026', status: 'פעיל', statusClass: 'badge-active' },
  { id: 3, name: 'QS-2025-Life', type: 'Quota Share (30%)', partner: 'Allianz Re', capacity: '$30M', utilization: 91, period: '01/2025-12/2025', status: 'חידוש', statusClass: 'badge-draft' },
  { id: 4, name: 'HYB-2026-Nomad', type: 'Hybrid (QS 25% + SL)', partner: 'Gen Re', capacity: '$15M', utilization: 45, period: '03/2026-02/2027', status: 'טיוטה', statusClass: 'badge-draft' }
];

const currencyPairs = [
  { pair: 'USD / EUR', rate: '0.9284', change: '+0.12%', positive: true, data: [0.921, 0.925, 0.923, 0.928, 0.926, 0.930, 0.928] },
  { pair: 'USD / GBP', rate: '0.7891', change: '-0.08%', positive: false, data: [0.792, 0.790, 0.793, 0.788, 0.791, 0.787, 0.789] },
  { pair: 'USD / ILS', rate: '3.6420', change: '+0.24%', positive: true, data: [3.620, 3.628, 3.635, 3.630, 3.640, 3.638, 3.642] },
  { pair: 'USD / AUD', rate: '1.5734', change: '-0.15%', positive: false, data: [1.580, 1.578, 1.575, 1.577, 1.574, 1.576, 1.573] }
];

const currencyConfig = [
  { product: 'Travel Basic IL', premiumCcy: 'ILS (₪)', coverageCcy: 'USD ($)', lock: 'נעילה חודשית', lockClass: 'badge-green' },
  { product: 'Health Premium DE', premiumCcy: 'EUR (€)', coverageCcy: 'EUR (€)', lock: 'מטבע זהה', lockClass: 'badge-blue' },
  { product: 'Travel Basic AU', premiumCcy: 'AUD (A$)', coverageCcy: 'USD ($)', lock: 'נעילה שנתית', lockClass: 'badge-amber' },
  { product: 'Digital Nomad Global', premiumCcy: 'USD ($)', coverageCcy: 'USD ($)', lock: 'זמן אמת', lockClass: 'badge-purple' }
];

const migrations = [
  { from: 'Health Basic', to: 'Health Premium', total: 4218, migrated: 2826, remaining: 1340, failed: 52, percent: 67, status: 'בתהליך', statusClass: 'badge-amber' },
  { from: 'Travel Basic v3', to: 'Travel Basic v4', total: 948, migrated: 891, remaining: 45, failed: 12, percent: 94, status: 'כמעט הושלם', statusClass: 'badge-green' }
];

const territories = [
  { code: 'PT', name: 'פורטוגל', nomads: 1240, risk: 'נמוך', riskColor: '#16A34A' },
  { code: 'TH', name: 'תאילנד', nomads: 980, risk: 'נמוך', riskColor: '#16A34A' },
  { code: 'DE', name: 'גרמניה', nomads: 1450, risk: 'בינוני', riskColor: '#D97706' },
  { code: 'JP', name: 'יפן', nomads: 620, risk: 'גבוה', riskColor: '#E30613' },
  { code: 'AU', name: 'אוסטרליה', nomads: 890, risk: 'בינוני', riskColor: '#D97706' },
  { code: 'UK', name: 'בריטניה', nomads: 1100, risk: 'בינוני', riskColor: '#D97706' },
  { code: 'CO', name: 'קולומביה', nomads: 540, risk: 'נמוך', riskColor: '#16A34A' },
  { code: 'ID', name: 'בלי', nomads: 1600, risk: 'נמוך', riskColor: '#16A34A' }
];

const borderChanges = [
  { customer: 'ID-88421', from: 'פורטוגל', to: 'תאילנד', impact: '-18% ($-23.40/חודש)', impactColor: '#16A34A', status: 'הושלם', statusClass: 'badge-active' },
  { customer: 'ID-77234', from: 'גרמניה', to: 'יפן', impact: '+12% (+$15.80/חודש)', impactColor: '#E30613', status: 'בעיבוד', statusClass: 'badge-review' },
  { customer: 'ID-65102', from: 'אוסטרליה', to: 'בריטניה', impact: '-5% ($-6.20/חודש)', impactColor: '#16A34A', status: 'ממתין', statusClass: 'badge-draft' },
  { customer: 'ID-91045', from: 'תאילנד', to: 'גרמניה', impact: '+22% (+$18.90/חודש)', impactColor: '#E30613', status: 'הושלם', statusClass: 'badge-active' },
  { customer: 'ID-43278', from: 'בלי', to: 'פורטוגל', impact: '+8% (+$6.40/חודש)', impactColor: '#D97706', status: 'בעיבוד', statusClass: 'badge-review' }
];

const lifeEvents = [
  { id: 1, type: 'marriage', icon: 'heart', iconColor: '#EC4899', iconBg: '#FCE7F3', customer: 'ID-44521', desc: 'דווח על נישואין', impact: 'כיסוי עודכן: נוסף בן/בת זוג. פרמיה +$45.20/חודש', status: 'הוחל', statusClass: 'badge-active' },
  { id: 2, type: 'birth', icon: 'baby', iconColor: '#3B82F6', iconBg: '#DBEAFE', customer: 'ID-33210', desc: 'תלוי חדש (ילד)', impact: 'כיסוי עודכן: יולדות + תינוק. פרמיה +$32.00/חודש', status: 'ממתין לאישור', statusClass: 'badge-review' },
  { id: 3, type: 'job', icon: 'briefcase', iconColor: '#16A34A', iconBg: '#DCFCE7', customer: 'ID-55678', desc: 'מעבר מפרילנסר לשכיר', impact: 'הועבר מפוליסה פרטית לקבוצתית. פרמיה -$28.00/חודש', status: 'הוחל', statusClass: 'badge-active' },
  { id: 4, type: 'relocation', icon: 'home', iconColor: '#D97706', iconBg: '#FEF3C7', customer: 'ID-72341', desc: 'רילוקיישן לגרמניה', impact: 'עדכון טריטוריה + חישוב פרמיה מחדש. פרמיה +$15.80/חודש', status: 'הוחל', statusClass: 'badge-active' },
  { id: 5, type: 'marriage', icon: 'heart', iconColor: '#EC4899', iconBg: '#FCE7F3', customer: 'ID-88912', desc: 'דווח על גירושין', impact: 'הסרת בן/בת זוג מכיסוי. פרמיה -$45.20/חודש', status: 'ממתין לאישור', statusClass: 'badge-review' },
  { id: 6, type: 'job', icon: 'briefcase', iconColor: '#16A34A', iconBg: '#DCFCE7', customer: 'ID-61234', desc: 'מעבר לסטטוס סטודנט', impact: 'שדרוג לתוכנית סטודנטים. פרמיה -$52.00/חודש', status: 'הוחל', statusClass: 'badge-active' }
];

const eventTypes = [
  { type: 'marriage', icon: 'heart', color: '#EC4899', bg: '#FCE7F3', label: 'נישואין', count: 34 },
  { type: 'birth', icon: 'baby', color: '#3B82F6', bg: '#DBEAFE', label: 'לידה', count: 18 },
  { type: 'job', icon: 'briefcase', color: '#16A34A', bg: '#DCFCE7', label: 'שינוי תעסוקה', count: 52 },
  { type: 'relocation', icon: 'home', color: '#D97706', bg: '#FEF3C7', label: 'רילוקיישן', count: 87 }
];

const corporateClients = [
  { name: 'Wix.com', policy: 'Health Premium Group', members: 1240, subGroups: 8, premium: '$2.4M', status: 'פעיל', statusClass: 'badge-active',
    orgChart: ['R&D Israel — 450', 'R&D Ukraine — 180', 'Sales US — 220', 'Sales EU — 160', 'Marketing Global — 95', 'Operations IL — 85', 'HR — 30', 'Executive — 20'] },
  { name: 'IAI (תעשייה אווירית)', policy: 'Travel + Health Bundle', members: 3400, subGroups: 15, premium: '$5.8M', status: 'פעיל', statusClass: 'badge-active', orgChart: [] },
  { name: 'טבע תרופות', policy: 'Global Health Coverage', members: 890, subGroups: 6, premium: '$1.9M', status: 'חידוש', statusClass: 'badge-draft', orgChart: [] },
  { name: 'Check Point', policy: 'Cyber + Health Bundle', members: 2100, subGroups: 12, premium: '$4.1M', status: 'פעיל', statusClass: 'badge-active', orgChart: [] }
];

const financeConfig = [
  { product: 'Health Premium IL', premiumCcy: 'ILS', coverageCcy: 'USD', deductibleCcy: 'ILS', strategy: 'נעילה חודשית', strategyClass: 'badge-green' },
  { product: 'Travel Basic AU', premiumCcy: 'AUD', coverageCcy: 'USD', deductibleCcy: 'AUD', strategy: 'נעילה שנתית', strategyClass: 'badge-amber' },
  { product: 'Digital Nomad Global', premiumCcy: 'USD', coverageCcy: 'USD', deductibleCcy: 'מקומי', strategy: 'זמן אמת', strategyClass: 'badge-purple' }
];

const fxExposure = [
  { ccy: 'USD', amount: '$12.4M', pct: 100, type: 'hedged' },
  { ccy: 'EUR', amount: '$8.2M', pct: 66, type: 'hedged' },
  { ccy: 'GBP', amount: '$3.1M', pct: 25, type: 'partial' },
  { ccy: 'ILS', amount: '$2.8M', pct: 22, type: 'partial' },
  { ccy: 'AUD', amount: '$1.9M', pct: 15, type: 'unhedged' }
];

const guardrailData = {
  'Digital Nomad Global': { score: 82, badge: 'מתחת לסף (95%)', badgeClass: 'badge-amber',
    categories: [
      { name: 'תמחור', score: 100, color: 'green' }, { name: 'כיסוי', score: 95, color: 'green' },
      { name: 'תאימות', score: 60, color: 'red' }, { name: 'תפעול', score: 75, color: 'amber' },
      { name: 'ביטוח משנה', score: 80, color: 'amber' }, { name: 'חוקים', score: 90, color: 'green' }
    ],
    actions: [
      { severity: 'critical', category: 'תאימות', desc: 'חסרים תגי אישור רגולטורי ל-8 טריטוריות', nav: 'audit' },
      { severity: 'critical', category: 'תאימות', desc: 'הסכם עיבוד נתונים GDPR לא מקושר', nav: 'audit' },
      { severity: 'warning', category: 'תפעול', desc: 'חוקי תקופת חסד לא מוגדרים ל-3 שווקים', nav: 'rule-engine' },
      { severity: 'warning', category: 'ביטוח משנה', desc: 'חוזה QS-2026 לא מקושר למוצר זה', nav: 'reinsurance' },
      { severity: 'success', category: 'תמחור', desc: 'כל טבלאות התעריפים מעודכנות', nav: null }
    ]
  },
  'Travel Basic': { score: 98, badge: 'עבר סף (95%)', badgeClass: 'badge-green',
    categories: [
      { name: 'תמחור', score: 100, color: 'green' }, { name: 'כיסוי', score: 100, color: 'green' },
      { name: 'תאימות', score: 95, color: 'green' }, { name: 'תפעול', score: 98, color: 'green' },
      { name: 'ביטוח משנה', score: 100, color: 'green' }, { name: 'חוקים', score: 95, color: 'green' }
    ],
    actions: [{ severity: 'success', category: 'כללי', desc: 'כל הדרישות מתקיימות — המוצר מוכן להשקה', nav: null }]
  },
  'Health Premium': { score: 97, badge: 'עבר סף (95%)', badgeClass: 'badge-green',
    categories: [
      { name: 'תמחור', score: 100, color: 'green' }, { name: 'כיסוי', score: 98, color: 'green' },
      { name: 'תאימות', score: 92, color: 'amber' }, { name: 'תפעול', score: 100, color: 'green' },
      { name: 'ביטוח משנה', score: 95, color: 'green' }, { name: 'חוקים', score: 97, color: 'green' }
    ],
    actions: [
      { severity: 'warning', category: 'תאימות', desc: 'עדכון GDPR נדרש ל-2 שווקים', nav: 'audit' },
      { severity: 'success', category: 'כללי', desc: 'יתר הדרישות מתקיימות', nav: null }
    ]
  },
  'Group Life': { score: 93, badge: 'מתחת לסף (95%)', badgeClass: 'badge-amber',
    categories: [
      { name: 'תמחור', score: 100, color: 'green' }, { name: 'כיסוי', score: 95, color: 'green' },
      { name: 'תאימות', score: 90, color: 'green' }, { name: 'תפעול', score: 88, color: 'amber' },
      { name: 'ביטוח משנה', score: 75, color: 'amber' }, { name: 'חוקים', score: 95, color: 'green' }
    ],
    actions: [
      { severity: 'warning', category: 'ביטוח משנה', desc: 'קישור ביטוח משנה חסר', nav: 'reinsurance' },
      { severity: 'warning', category: 'תפעול', desc: 'חוקי תפעול לא מעודכנים', nav: 'rule-engine' }
    ]
  }
};

// === Price Calculator Data ===
const baseRates = {
  'Travel Basic': { '18-29': 78.00, '30-39': 98.50, '40-49': 128.00, '50-59': 168.00, '60+': 220.00 },
  'Health Premium': { '18-29': 145.00, '30-39': 185.00, '40-49': 245.00, '50-59': 340.00, '60+': 480.00 },
  'Digital Nomad Global': { '18-29': 110.00, '30-39': 135.00, '40-49': 175.00, '50-59': 230.00, '60+': 310.00 },
  'Group Life': { '18-29': 55.00, '30-39': 72.00, '40-49': 95.00, '50-59': 135.00, '60+': 190.00 }
};
const territoryFactors = { 'גרמניה': 1.075, 'אוסטרליה': 1.12, 'ישראל': 0.95, 'בריטניה': 1.15, 'יפן': 1.22, 'תאילנד': 0.82 };
const coverageMultipliers = { 'סטנדרטי': 1.0, 'פרימיום': 1.35, 'פלטינום': 1.75 };
const durationMultipliers = { '1': 1.0, '3': 0.95, '6': 0.90, '12': 0.85 };
const usdToEur = 0.9284;

// === Navigation ===
function showView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const view = document.getElementById('view-' + viewId);
  if (view) {
    view.classList.add('active');
    view.classList.remove('fade-in');
    void view.offsetWidth;
    view.classList.add('fade-in');
  }
  state.currentView = viewId;

  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.view === viewId) item.classList.add('active');
  });

  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.view === viewId) item.classList.add('active');
  });

  const bc = document.getElementById('breadcrumb');
  if (bc) {
    bc.innerHTML = `<a href="#" onclick="showView('dashboard')">מפעל</a><span class="separator">/</span><span class="current">${viewNames[viewId] || viewId}</span>`;
  }

  if (state.sidebarOpen) toggleSidebar();

  const mainContent = document.querySelector('.main-content');
  if (mainContent) mainContent.scrollTop = 0;

  initViewData(viewId);
  initIcons();
}

function initViewData(viewId) {
  switch (viewId) {
    case 'dashboard': animateDashboardCounters(); break;
    case 'product-shelf': renderProductGrid(); break;
    case 'rule-engine': renderRules(); break;
    case 'versioning': renderVersionTimeline(); break;
    case 'price-calc': calculatePremium(); break;
    case 'currency': renderCurrency(); break;
    case 'gatekeeper': renderMigrations(); break;
    case 'reinsurance': renderReinsurance(); break;
    case 'guardrails': updateGuardrails(); break;
    case 'audit': renderAuditLog(); break;
    case 'border-control': renderBorderControl(); break;
    case 'life-events': renderLifeEvents(); break;
    case 'corporate': renderCorporate(); break;
    case 'finance': renderFinance(); break;
  }
}

// === Sidebar Toggle ===
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('drawer-backdrop');
  state.sidebarOpen = !state.sidebarOpen;
  if (state.sidebarOpen) {
    sidebar.classList.add('open');
    backdrop.classList.add('active');
  } else {
    sidebar.classList.remove('open');
    backdrop.classList.remove('active');
  }
}

// === Modal ===
function openModal(html, title) {
  const overlay = document.getElementById('modal-overlay');
  const container = document.getElementById('modal-container');
  container.innerHTML = `
    <div class="modal-header">
      <h2 style="font-size:16px;font-weight:700;">${title || ''}</h2>
      <button class="modal-close" onclick="closeModal()"><i data-lucide="x" class="w-5 h-5"></i></button>
    </div>
    <div class="modal-body">${html}</div>
  `;
  overlay.classList.add('active');
  initIcons();
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// === Toast ===
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const icons = { success: 'check-circle', error: 'x-circle', warning: 'alert-triangle', info: 'info' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i data-lucide="${icons[type] || 'info'}" class="toast-icon"></i>
    <span style="flex:1;">${message}</span>
    <button class="toast-dismiss" onclick="this.parentElement.classList.add('dismiss');setTimeout(()=>this.parentElement.remove(),300)"><i data-lucide="x" class="w-4 h-4"></i></button>
  `;
  container.appendChild(toast);
  initIcons();
  setTimeout(() => { toast.classList.add('dismiss'); setTimeout(() => toast.remove(), 300); }, 3000);
}

// === Counter Animation ===
function animateCounter(el, target, duration = 800) {
  const suffix = el.dataset.suffix || '';
  const isDecimal = String(target).includes('.');
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    if (isDecimal) {
      el.textContent = current.toFixed(1) + suffix;
    } else {
      el.textContent = Math.round(current).toLocaleString() + suffix;
    }
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function animateDashboardCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseFloat(el.dataset.counter);
    animateCounter(el, target);
  });
}

// === Score Ring Animation ===
function animateScoreRing(score) {
  const ring = document.getElementById('score-ring');
  const text = document.getElementById('score-text');
  if (!ring || !text) return;
  const circumference = 326.7;
  const offset = circumference - (score / 100) * circumference;
  ring.style.strokeDashoffset = circumference;
  void ring.offsetWidth;
  ring.style.strokeDashoffset = offset;
  // Color
  ring.style.stroke = score >= 95 ? '#16A34A' : score >= 80 ? '#D97706' : '#E30613';
  // Animate text
  animateCounter(text, score, 1500);
  text.dataset.suffix = '%';
}

// === Icons ===
function initIcons() {
  try {
    lucide.createIcons();
  } catch (e) {
    console.warn('Lucide init retry...');
    setTimeout(() => { try { lucide.createIcons(); } catch (e2) { console.error('Lucide failed'); } }, 1000);
  }
}

// === Responsive ===
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {}, 200);
});

// === Product Shelf ===
function renderProductGrid(filter = 'all') {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => {
    const scoreColor = p.score === null ? '#94A3B8' : p.score >= 95 ? '#16A34A' : p.score >= 80 ? '#D97706' : '#E30613';
    const barColor = p.score === null ? '#d1d5db' : scoreColor;
    return `
    <div class="card panel cursor-pointer" style="padding:20px;" onclick="openProductModal(${p.id})">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span class="badge ${p.statusClass}">${p.status}</span>
        <span class="font-en" style="font-size:10px;color:var(--pc-slate);">${p.version}</span>
      </div>
      <h3 style="font-weight:700;font-size:14px;margin-bottom:4px;">${p.name}</h3>
      <p style="font-size:12px;color:var(--pc-slate);margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${p.desc}</p>
      <div style="display:flex;align-items:center;justify-content:space-between;font-size:10px;color:var(--pc-slate);">
        <span>${p.markets}</span>
        <span>ציון: <strong class="font-en" style="color:${scoreColor};">${p.score !== null ? p.score + '%' : 'N/A'}</strong></span>
      </div>
      <div class="progress-bar-track" style="margin-top:8px;height:4px;">
        <div style="height:100%;border-radius:3px;background:${barColor};width:${p.score || 0}%;transition:width 1s ease;"></div>
      </div>
    </div>`;
  }).join('');
  initIcons();
}

function setupProductTabs() {
  const tabBar = document.getElementById('product-tabs');
  if (!tabBar) return;
  tabBar.addEventListener('click', e => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    tabBar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProductGrid(btn.dataset.category);
  });
}

function openProductModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const versions = versionData[p.name] || [];
  const html = `
    <div class="tab-bar" id="product-modal-tabs" style="margin-bottom:0;">
      <button class="tab-btn active" onclick="switchProductTab('overview',this)">סקירה</button>
      <button class="tab-btn" onclick="switchProductTab('versions',this)">גרסאות</button>
      <button class="tab-btn" onclick="switchProductTab('pricing',this)">תמחור</button>
      <button class="tab-btn" onclick="switchProductTab('markets',this)">שווקים</button>
    </div>
    <div id="ptab-overview" style="padding-top:16px;">
      <p style="font-size:13px;color:var(--pc-slate);margin-bottom:16px;">${p.desc}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div style="font-size:12px;"><span style="color:var(--pc-slate);">גרסה:</span> <strong class="font-en">${p.version}</strong></div>
        <div style="font-size:12px;"><span style="color:var(--pc-slate);">נוצר:</span> <span class="font-en">${p.created}</span></div>
        <div style="font-size:12px;"><span style="color:var(--pc-slate);">עודכן:</span> <span class="font-en">${p.modified}</span></div>
        <div style="font-size:12px;"><span style="color:var(--pc-slate);">בעלים:</span> ${p.owner}</div>
      </div>
    </div>
    <div id="ptab-versions" style="display:none;padding-top:16px;">
      ${versions.map(v => `
        <div style="display:flex;align-items:center;gap:16px;padding:12px;border-radius:8px;margin-bottom:8px;${v.current ? 'background:#F0FDF4;border:1px solid #BBF7D0;' : 'border:1px solid var(--pc-border);'}">
          <div style="width:40px;height:40px;border-radius:8px;background:${v.current ? '#DCFCE7' : '#f1f5f9'};display:flex;align-items:center;justify-content:center;">
            <i data-lucide="${v.current ? 'check' : 'file-text'}" style="width:20px;height:20px;color:${v.current ? '#16A34A' : '#94A3B8'};"></i>
          </div>
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:600;" class="font-en">${v.version} ${v.current ? '<span style="color:#16A34A;font-weight:400;font-size:11px;">(נוכחי)</span>' : ''}${v.major ? '<span style="color:#2563EB;font-weight:400;font-size:11px;">(ראשי)</span>' : ''}</div>
            <div style="font-size:12px;color:var(--pc-slate);">${v.desc}</div>
          </div>
          <div class="font-en" style="font-size:11px;color:var(--pc-slate);">${v.date}</div>
        </div>
      `).join('')}
    </div>
    <div id="ptab-pricing" style="display:none;padding-top:16px;">
      <p style="font-size:13px;color:var(--pc-slate);margin-bottom:12px;">טבלת תעריפי בסיס חודשיים (${p.name})</p>
      <table class="data-table" style="font-size:12px;">
        <thead><tr><th>קבוצת גיל</th><th class="center">תעריף (USD)</th></tr></thead>
        <tbody>
          ${baseRates[p.name] ? Object.entries(baseRates[p.name]).map(([band, rate]) => `<tr><td class="font-en">${band}</td><td class="center font-en">$${rate.toFixed(2)}</td></tr>`).join('') : '<tr><td colspan="2" style="text-align:center;color:var(--pc-slate);">אין נתוני תמחור</td></tr>'}
        </tbody>
      </table>
    </div>
    <div id="ptab-markets" style="display:none;padding-top:16px;">
      <p style="font-size:13px;color:var(--pc-slate);margin-bottom:12px;">שווקים פעילים: ${p.markets}</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${['ישראל', 'גרמניה', 'אוסטרליה', 'בריטניה', 'יפן'].slice(0, p.score === null ? 3 : 5).map(m => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#f8fafc;border-radius:8px;font-size:12px;">
            <span>${m}</span>
            <span class="badge badge-active">פעיל</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  openModal(html, p.name + ' — ' + p.status);
}

function switchProductTab(tab, btn) {
  document.querySelectorAll('[id^="ptab-"]').forEach(el => el.style.display = 'none');
  document.getElementById('ptab-' + tab).style.display = 'block';
  btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// === Rule Engine ===
function renderRules() {
  const tbody = document.getElementById('rules-tbody');
  if (!tbody) return;
  tbody.innerHTML = rules.map(r => `
    <tr onclick="toggleRuleDetail(${r.id}, event)">
      <td style="font-weight:500;">${r.name}</td>
      <td style="color:var(--pc-slate);">${r.trigger}</td>
      <td style="color:var(--pc-slate);">${r.action}</td>
      <td><span class="tag">${r.products}</span></td>
      <td class="center"><span class="badge ${r.statusClass}">${r.status}</span></td>
      <td class="center font-en" style="font-weight:600;">${r.fired !== null ? r.fired : '—'}</td>
      <td class="center" onclick="event.stopPropagation()">
        <div class="toggle-switch ${r.on ? 'on' : ''}" onclick="toggleRule(${r.id}, this)"><div class="toggle-dot"></div></div>
      </td>
    </tr>
    <tr id="rule-detail-${r.id}" style="display:none;">
      <td colspan="7" style="padding:16px 20px;background:#f8fafc;">
        <div style="font-size:12px;color:var(--pc-slate);">
          <strong>תנאי טריגר:</strong> ${r.trigger}<br>
          <strong>פעולה:</strong> ${r.action}<br>
          <strong>מוצרים:</strong> ${r.products}<br>
          <div style="margin-top:12px;display:flex;gap:8px;">
            <button class="btn btn-outline btn-sm">עריכה</button>
            <button class="btn btn-danger-outline btn-sm">מחיקה</button>
          </div>
        </div>
      </td>
    </tr>
  `).join('');
  initIcons();
}

function toggleRule(id, el) {
  const rule = rules.find(r => r.id === id);
  if (!rule) return;
  rule.on = !rule.on;
  el.classList.toggle('on');
  showToast(`החוק "${rule.name}" ${rule.on ? 'הופעל' : 'הושבת'}`, rule.on ? 'success' : 'warning');
}

function toggleRuleDetail(id, event) {
  if (event.target.closest('.toggle-switch')) return;
  const row = document.getElementById('rule-detail-' + id);
  if (!row) return;
  row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
}

function openNewRuleModal() {
  const html = `
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div><label class="form-label">שם החוק</label><input type="text" class="form-input" placeholder="לדוגמה: בדיקת גיל מינימלי"></div>
      <div><label class="form-label">סוג טריגר</label><select class="form-select"><option>שינוי סטטוס</option><option>תאריך</option><option>ערך פרמיה</option><option>אירוע לקוח</option></select></div>
      <div><label class="form-label">סוג פעולה</label><select class="form-select"><option>שנה סטטוס</option><option>שלח הודעה</option><option>חשב מחדש</option><option>העבר מוצר</option></select></div>
      <div><label class="form-label">היקף מוצרים</label><select class="form-select"><option>כל המוצרים</option><option>כל הנסיעות</option><option>כל הבריאות</option><option>Travel Basic</option><option>Health Premium</option></select></div>
      <button class="btn btn-primary" style="margin-top:8px;" onclick="showToast('החוק נשמר בהצלחה','success');closeModal();">שמירה</button>
    </div>
  `;
  openModal(html, 'חוק חדש');
}

// === Versioning ===
function renderVersionTimeline() {
  const select = document.getElementById('version-product-select');
  const container = document.getElementById('version-timeline');
  if (!select || !container) return;
  const product = select.value;
  const versions = versionData[product] || [];
  container.innerHTML = versions.map(v => `
    <div style="display:flex;align-items:center;gap:16px;padding:12px;border-radius:8px;${v.current ? 'background:#F0FDF4;border:1px solid #BBF7D0;' : 'border:1px solid transparent;'}transition:background 0.15s ease;" class="${v.current ? '' : 'card'}">
      <div style="width:40px;height:40px;border-radius:8px;background:${v.current ? '#DCFCE7' : '#f1f5f9'};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <i data-lucide="${v.current ? 'check' : 'file-text'}" style="width:20px;height:20px;color:${v.current ? '#16A34A' : '#94A3B8'};"></i>
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:13px;font-weight:600;" class="font-en">${v.version} ${v.current ? '<span style="color:#16A34A;font-weight:400;font-size:11px;">(נוכחי)</span>' : ''}${v.major ? '<span style="color:#2563EB;font-weight:400;font-size:11px;">(ראשי)</span>' : ''}</div>
        <div style="font-size:12px;color:var(--pc-slate);">${v.desc}</div>
      </div>
      <div class="font-en" style="font-size:11px;color:var(--pc-slate);white-space:nowrap;">${v.date}</div>
      <button class="btn btn-sm" style="color:var(--pc-red);background:none;border:none;font-weight:500;">צפה</button>
    </div>
  `).join('');
  initIcons();
}

function openVersionCompare() {
  const select = document.getElementById('version-product-select');
  const product = select ? select.value : 'Travel Basic';
  const versions = versionData[product] || [];
  const options = versions.map(v => `<option value="${v.version}">${v.version}</option>`).join('');
  const html = `
    <div style="display:flex;gap:16px;margin-bottom:20px;">
      <div style="flex:1;"><label class="form-label">גרסה A</label><select class="form-select font-en" id="compare-a">${options}</select></div>
      <div style="flex:1;"><label class="form-label">גרסה B</label><select class="form-select font-en" id="compare-b">${versions.length > 1 ? versions.slice(1).map(v => `<option value="${v.version}">${v.version}</option>`).join('') : options}</select></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;">
      <div class="diff-changed" style="display:flex;justify-content:space-between;font-size:12px;">
        <span>תעריף בסיס (גיל 30-39):</span>
        <span class="font-en">$98.50 → $102.30</span>
      </div>
      <div class="diff-added" style="display:flex;justify-content:space-between;font-size:12px;">
        <span>כיסוי ביטול:</span>
        <span>— → כלול עד $5,000</span>
      </div>
      <div class="diff-removed" style="display:flex;justify-content:space-between;font-size:12px;">
        <span>חריגת ספורט אתגרי:</span>
        <span>כלול → —</span>
      </div>
    </div>
  `;
  openModal(html, 'השוואת גרסאות — ' + product);
}

// === Price Calculator ===
function calculatePremium() {
  const productEl = document.getElementById('calc-product');
  const ageEl = document.getElementById('calc-age');
  const territoryEl = document.getElementById('calc-territory');
  const coverageEl = document.getElementById('calc-coverage');
  const durationEl = document.getElementById('calc-duration');
  const resultEl = document.getElementById('calc-result');
  if (!productEl || !ageEl || !resultEl) return;

  const product = productEl.value;
  const age = parseInt(ageEl.value) || 35;
  const territory = territoryEl.value;
  const coverage = coverageEl.value;
  const duration = durationEl.value;

  const rates = baseRates[product];
  if (!rates) return;

  let ageBand = '30-39';
  if (age < 18) ageBand = '18-29';
  else if (age <= 29) ageBand = '18-29';
  else if (age <= 39) ageBand = '30-39';
  else if (age <= 49) ageBand = '40-49';
  else if (age <= 59) ageBand = '50-59';
  else ageBand = '60+';

  const base = rates[ageBand];
  const tFactor = territoryFactors[territory] || 1.0;
  const cMultiplier = coverageMultipliers[coverage] || 1.0;
  const dMultiplier = durationMultipliers[duration] || 1.0;

  const territoryAdj = base * (tFactor - 1);
  const coverageAdj = (base * tFactor) * (cMultiplier - 1);
  const total = (base + territoryAdj + coverageAdj) * dMultiplier;
  const eurTotal = total * usdToEur;

  resultEl.style.display = 'block';
  document.getElementById('result-usd').textContent = '$' + total.toFixed(2);
  document.getElementById('result-eur').textContent = '€' + eurTotal.toFixed(2);
  document.getElementById('result-factor').textContent = tFactor.toFixed(3);

  document.getElementById('calc-breakdown').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:4px;">
      <div style="display:flex;justify-content:space-between;"><span>תעריף בסיס (גיל ${age}, ${coverage}):</span><span class="font-en" style="font-weight:500;">$${base.toFixed(2)}</span></div>
      <div style="display:flex;justify-content:space-between;"><span>התאמת טריטוריה (${territory}, x${tFactor}):</span><span class="font-en" style="font-weight:500;">+$${territoryAdj.toFixed(2)}</span></div>
      <div style="display:flex;justify-content:space-between;"><span>רמת כיסוי (${coverage}):</span><span class="font-en" style="font-weight:500;">+$${coverageAdj.toFixed(2)}</span></div>
      ${duration !== '1' ? `<div style="display:flex;justify-content:space-between;"><span>הנחת משך (${duration} חודשים):</span><span class="font-en" style="font-weight:500;">x${dMultiplier}</span></div>` : ''}
      <div style="display:flex;justify-content:space-between;border-top:1px solid var(--pc-border);padding-top:4px;margin-top:4px;font-weight:600;color:var(--pc-dark);"><span>סה"כ פרמיה חודשית:</span><span class="font-en">$${total.toFixed(2)}</span></div>
    </div>
  `;
}

// === Currency ===
function renderCurrency() {
  const ratesContainer = document.getElementById('currency-rates');
  if (ratesContainer) {
    ratesContainer.innerHTML = currencyPairs.map(cp => {
      const sparkPoints = generateSparkline(cp.data);
      return `
        <div class="stat-card" style="text-align:center;">
          <div class="font-en" style="font-size:11px;color:var(--pc-slate);margin-bottom:4px;">${cp.pair}</div>
          <div class="font-en" style="font-size:20px;font-weight:700;">${cp.rate}</div>
          <div class="font-en" style="font-size:10px;color:${cp.positive ? '#16A34A' : '#E30613'};font-weight:500;">${cp.change}</div>
          <div class="sparkline" style="margin-top:8px;">
            <svg width="100%" height="30" viewBox="0 0 100 30" preserveAspectRatio="none">
              <polyline points="${sparkPoints}" class="sparkline-line animate" style="stroke:${cp.positive ? '#16A34A' : '#E30613'};"/>
            </svg>
          </div>
        </div>
      `;
    }).join('');
  }

  const tbody = document.getElementById('currency-tbody');
  if (tbody) {
    tbody.innerHTML = currencyConfig.map((c, i) => `
      <tr onclick="toggleCurrencyDetail(${i})" style="cursor:pointer;">
        <td style="font-weight:500;">${c.product}</td>
        <td class="font-en">${c.premiumCcy}</td>
        <td class="font-en">${c.coverageCcy}</td>
        <td><span class="badge ${c.lockClass}">${c.lock}</span></td>
      </tr>
      <tr id="currency-detail-${i}" style="display:none;">
        <td colspan="4" style="padding:16px 20px;background:#f8fafc;font-size:12px;color:var(--pc-slate);">
          <div><strong>שער נעול:</strong> <span class="font-en">${c.premiumCcy === 'ILS (₪)' ? '3.6420' : c.premiumCcy === 'AUD (A$)' ? '1.5734' : '1.0000'}</span></div>
          <div style="margin-top:4px;"><strong>תוקף נעילה:</strong> ${c.lock === 'נעילה חודשית' ? '28/02/2026' : c.lock === 'נעילה שנתית' ? '31/12/2026' : '—'}</div>
          <button class="btn btn-outline btn-sm" style="margin-top:8px;" onclick="showToast('נעילת שער עודכנה','success')">עדכן נעילה</button>
        </td>
      </tr>
    `).join('');
  }
}

function toggleCurrencyDetail(i) {
  const row = document.getElementById('currency-detail-' + i);
  if (row) row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
}

function generateSparkline(data) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  return data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 30 - ((v - min) / range) * 25;
    return `${x},${y}`;
  }).join(' ');
}

// === Gatekeeper ===
function renderMigrations() {
  const container = document.getElementById('migrations-container');
  if (!container) return;
  container.innerHTML = migrations.map((m, i) => {
    const barColor = m.percent >= 90 ? '#16A34A' : m.percent >= 60 ? '#3B82F6' : '#D97706';
    return `
    <div style="border:1px solid var(--pc-border);border-radius:8px;padding:16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
        <div style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;">
          <span>${m.from}</span>
          <i data-lucide="arrow-left" style="width:16px;height:16px;color:var(--pc-slate);"></i>
          <span style="color:#16A34A;">${m.to}</span>
        </div>
        <span class="badge ${m.statusClass}">${m.status}</span>
      </div>
      <div style="font-size:12px;color:var(--pc-slate);margin-bottom:8px;display:flex;gap:16px;">
        <span>הועברו: <strong class="font-en">${m.migrated.toLocaleString()}</strong></span>
        <span>נותרו: <strong class="font-en">${m.remaining.toLocaleString()}</strong></span>
        <span>נכשלו: <strong class="font-en" style="color:var(--pc-red);">${m.failed}</strong></span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <div class="progress-bar-track" style="flex:1;">
          <div style="height:100%;border-radius:3px;background:${barColor};width:${m.percent}%;transition:width 1s ease;"></div>
        </div>
        <span class="font-en" style="font-size:12px;font-weight:600;">${m.percent}%</span>
      </div>
      <button class="btn btn-outline btn-sm" style="margin-top:12px;" onclick="showToast('מציג פרטי העברה...','info')">צפה בפרטים</button>
    </div>
  `;
  }).join('');
  initIcons();
}

// === Reinsurance ===
function renderReinsurance() {
  const tbody = document.getElementById('reinsurance-tbody');
  if (!tbody) return;
  tbody.innerHTML = treaties.map((t, i) => {
    const barColor = t.utilization > 85 ? '#E30613' : t.utilization > 70 ? '#D97706' : '#16A34A';
    return `
      <tr onclick="toggleReinsuranceDetail(${i})">
        <td style="font-weight:500;" class="font-en">${t.name}</td>
        <td style="color:var(--pc-slate);" class="font-en">${t.type}</td>
        <td>${t.partner}</td>
        <td class="font-en">${t.capacity}</td>
        <td>
          <div class="inline-progress">
            <div class="inline-progress-bar"><div class="inline-progress-fill" style="width:${t.utilization}%;background:${barColor};"></div></div>
            <span class="font-en" style="font-size:11px;font-weight:500;">${t.utilization}%</span>
          </div>
        </td>
        <td class="font-en" style="color:var(--pc-slate);">${t.period}</td>
        <td class="center"><span class="badge ${t.statusClass}">${t.status}</span></td>
      </tr>
      <tr id="reinsurance-detail-${i}" style="display:none;">
        <td colspan="7" style="padding:20px;background:#f8fafc;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div>
              <div style="font-size:12px;font-weight:600;margin-bottom:8px;">פרמיות שהומחו (חודשי)</div>
              <div class="bar-chart">
                ${[65,72,58,80,75,90,85,70,88,92,78,82].map(h => `<div class="bar-chart-bar" style="height:${h}%;"></div>`).join('')}
              </div>
              <div class="bar-chart-labels" style="display:flex;gap:4px;margin-top:4px;">
                ${['ינו','פב','מרץ','אפר','מאי','יונ','יול','אוג','ספט','אוק','נוב','דצמ'].map(m => `<span style="flex:1;text-align:center;font-size:9px;color:var(--pc-slate);">${m}</span>`).join('')}
              </div>
            </div>
            <div style="font-size:12px;color:var(--pc-slate);">
              <div style="font-weight:600;color:var(--pc-dark);margin-bottom:8px;">סטטוס בורדרו</div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><span class="badge badge-active">נשלח</span> Q4-2025</div>
              <div style="display:flex;align-items:center;gap:8px;"><span class="badge badge-amber">ממתין</span> Q1-2026</div>
              <div style="margin-top:12px;display:flex;gap:8px;">
                <button class="btn btn-outline btn-sm">ערוך חוזה</button>
                <button class="btn btn-outline btn-sm">חדש בורדרו</button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleReinsuranceDetail(i) {
  const row = document.getElementById('reinsurance-detail-' + i);
  if (row) row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
}

// === Guardrails ===
function updateGuardrails() {
  const select = document.getElementById('guardrail-product');
  if (!select) return;
  const product = select.value;
  const data = guardrailData[product];
  if (!data) return;

  // Badge
  const badge = document.getElementById('guardrail-status-badge');
  if (badge) { badge.textContent = data.badge; badge.className = 'badge ' + data.badgeClass; }

  // Score ring
  animateScoreRing(data.score);

  // Categories
  const catContainer = document.getElementById('guardrail-categories');
  if (catContainer) {
    catContainer.innerHTML = data.categories.map(c => {
      const bg = c.color === 'green' ? '#F0FDF4' : c.color === 'amber' ? '#FFFBEB' : '#FEF2F2';
      const fg = c.color === 'green' ? '#16A34A' : c.color === 'amber' ? '#D97706' : '#E30613';
      const barBg = c.color === 'green' ? '#BBF7D0' : c.color === 'amber' ? '#FDE68A' : '#FECACA';
      return `
        <div class="cursor-pointer" style="padding:12px;border-radius:8px;background:${bg};transition:all 0.15s ease;" onclick="filterGuardrailActions('${c.name}')">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="font-size:12px;font-weight:500;">${c.name}</span>
            <span class="font-en" style="font-size:12px;font-weight:700;color:${fg};">${c.score}%</span>
          </div>
          <div style="width:100%;height:6px;background:${barBg};border-radius:3px;margin-top:6px;">
            <div style="height:100%;border-radius:3px;background:${fg};width:${c.score}%;transition:width 1s ease;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Actions
  renderGuardrailActions(data.actions, null);
}

function renderGuardrailActions(actions, category) {
  const container = document.getElementById('guardrail-actions');
  if (!container) return;
  const filtered = category ? actions.filter(a => a.category === category) : actions;
  container.innerHTML = filtered.map(a => {
    const bg = a.severity === 'critical' ? '#FEF2F2' : a.severity === 'warning' ? '#FFFBEB' : '#F0FDF4';
    const iconName = a.severity === 'critical' ? 'alert-circle' : a.severity === 'warning' ? 'alert-triangle' : 'check-circle';
    const iconColor = a.severity === 'critical' ? '#E30613' : a.severity === 'warning' ? '#D97706' : '#16A34A';
    return `
      <div style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:8px;background:${bg};">
        <i data-lucide="${iconName}" style="width:16px;height:16px;color:${iconColor};flex-shrink:0;"></i>
        <div style="flex:1;font-size:12px;"><strong>${a.category}:</strong> ${a.desc}</div>
        ${a.nav ? `<button class="btn btn-sm btn-primary" onclick="showToast('מנווט למודול הרלוונטי...','info');setTimeout(()=>showView('${a.nav}'),500)">תקן עכשיו</button>` : ''}
      </div>
    `;
  }).join('');
  initIcons();
}

function filterGuardrailActions(category) {
  const select = document.getElementById('guardrail-product');
  if (!select) return;
  const product = select.value;
  const data = guardrailData[product];
  if (!data) return;
  if (state.activeGuardrailCategory === category) {
    state.activeGuardrailCategory = null;
    renderGuardrailActions(data.actions, null);
  } else {
    state.activeGuardrailCategory = category;
    renderGuardrailActions(data.actions, category);
  }
}

// === Audit ===
function renderAuditLog() {
  filterAuditLog();
}

function filterAuditLog() {
  const search = (document.getElementById('audit-search')?.value || '').toLowerCase();
  const actionFilter = document.getElementById('audit-action-filter')?.value || '';
  const userFilter = document.getElementById('audit-user-filter')?.value || '';

  const filtered = auditLogs.filter(log => {
    if (search && !log.entity.toLowerCase().includes(search) && !log.desc.toLowerCase().includes(search)) return false;
    if (actionFilter && log.action !== actionFilter) return false;
    if (userFilter && log.user !== userFilter) return false;
    return true;
  });

  const tbody = document.getElementById('audit-tbody');
  if (tbody) {
    tbody.innerHTML = filtered.map((log, i) => `
      <tr onclick="toggleAuditDetail(${i})">
        <td class="font-en" style="font-size:11px;color:var(--pc-slate);">${log.timestamp}</td>
        <td style="font-weight:500;">${log.user}</td>
        <td><span class="badge ${log.actionClass}">${log.action}</span></td>
        <td>${log.entity}</td>
        <td>${log.tags.map(t => `<span class="tag" onclick="event.stopPropagation();filterAuditByTag('${t}')">${t}</span>`).join(' ')}</td>
      </tr>
      <tr id="audit-detail-${i}" style="display:none;">
        <td colspan="5" style="padding:16px 20px;background:#f8fafc;font-size:12px;color:var(--pc-slate);">
          <div><strong>תיאור:</strong> ${log.desc}</div>
          <div style="margin-top:4px;"><strong>לפני:</strong> <span class="font-en">${log.before}</span> → <strong>אחרי:</strong> <span class="font-en">${log.after}</span></div>
          <div style="margin-top:4px;"><strong>IP:</strong> <span class="font-en">10.0.1.${Math.floor(Math.random() * 255)}</span></div>
          <div><strong>Session:</strong> <span class="font-en">ses_${Math.random().toString(36).substr(2, 8)}</span></div>
        </td>
      </tr>
    `).join('');
  }
}

function toggleAuditDetail(i) {
  const row = document.getElementById('audit-detail-' + i);
  if (row) row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
}

function filterAuditByTag(tag) {
  const search = document.getElementById('audit-search');
  if (search) { search.value = tag; filterAuditLog(); }
}

// === Wizard ===
function selectWizardType(btn) {
  document.querySelectorAll('#wizard-type-options button').forEach(b => {
    b.style.border = '2px solid #e2e8f0';
    b.style.background = 'white';
  });
  btn.style.border = '2px solid var(--pc-red)';
  btn.style.background = 'var(--pc-light-red)';
  state.wizardData.type = btn.dataset.type;
}

function wizardNext() {
  if (state.wizardStep === 2) {
    const name = document.getElementById('wizard-name')?.value;
    if (!name || !name.trim()) { showToast('יש להזין שם מוצר', 'error'); return; }
  }
  if (state.wizardStep >= 4) return;
  collectWizardData();
  const current = document.querySelector(`[data-wizard-step="${state.wizardStep}"]`);
  state.wizardStep++;
  const next = document.querySelector(`[data-wizard-step="${state.wizardStep}"]`);
  if (current) current.classList.remove('active');
  if (next) { next.classList.remove('slide-back'); next.classList.add('active'); }
  updateWizardStepper();
  if (state.wizardStep === 4) generateWizardSummary();
  initIcons();
}

function wizardBack() {
  if (state.wizardStep <= 1) return;
  const current = document.querySelector(`[data-wizard-step="${state.wizardStep}"]`);
  state.wizardStep--;
  const prev = document.querySelector(`[data-wizard-step="${state.wizardStep}"]`);
  if (current) current.classList.remove('active');
  if (prev) { prev.classList.add('slide-back'); prev.classList.add('active'); }
  updateWizardStepper();
}

function updateWizardStepper() {
  document.getElementById('wizard-step-label').textContent = `שלב ${state.wizardStep} מתוך 4`;
  document.querySelectorAll('.stepper-circle').forEach(c => {
    const step = parseInt(c.dataset.step);
    c.className = 'stepper-circle ' + (step < state.wizardStep ? 'completed' : step === state.wizardStep ? 'current' : 'upcoming');
    c.textContent = step < state.wizardStep ? '\u2713' : step;
  });
  document.querySelectorAll('.stepper-line').forEach(l => {
    const step = parseInt(l.dataset.step);
    l.className = 'stepper-line' + (step < state.wizardStep ? ' completed' : '');
  });
}

function collectWizardData() {
  if (state.wizardStep === 2) {
    state.wizardData.name = document.getElementById('wizard-name')?.value || '';
    state.wizardData.template = document.getElementById('wizard-template')?.value || '';
    state.wizardData.desc = document.getElementById('wizard-desc')?.value || '';
    state.wizardData.owner = document.getElementById('wizard-owner')?.value || '';
  }
  if (state.wizardStep === 3) {
    state.wizardData.premiumCcy = document.getElementById('wizard-premium-ccy')?.value || '';
    state.wizardData.coverageCcy = document.getElementById('wizard-coverage-ccy')?.value || '';
    const checks = document.querySelectorAll('#wizard-markets input:checked');
    state.wizardData.markets = Array.from(checks).map(c => c.value);
    state.wizardData.rate = document.getElementById('wizard-rate')?.value || '';
  }
}

function generateWizardSummary() {
  const d = state.wizardData;
  const typeMap = { individual: 'יחיד', group: 'קבוצתי', aso: 'ASO' };
  document.getElementById('wizard-summary').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;">
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--pc-slate);">סוג:</span><span style="font-weight:500;">${typeMap[d.type] || d.type}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--pc-slate);">שם:</span><span style="font-weight:500;">${d.name}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--pc-slate);">תבנית:</span><span style="font-weight:500;">${d.template}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--pc-slate);">תיאור:</span><span style="font-weight:500;">${d.desc || '—'}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--pc-slate);">בעלים:</span><span style="font-weight:500;">${d.owner}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--pc-slate);">מטבע פרמיה:</span><span class="font-en" style="font-weight:500;">${d.premiumCcy}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--pc-slate);">מטבע כיסוי:</span><span class="font-en" style="font-weight:500;">${d.coverageCcy}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--pc-slate);">שווקים:</span><span style="font-weight:500;">${d.markets?.join(', ') || '—'}</span></div>
      <div style="display:flex;justify-content:space-between;"><span style="color:var(--pc-slate);">תעריף בסיס:</span><span class="font-en" style="font-weight:500;">${d.rate ? '$' + d.rate : '—'}</span></div>
    </div>
  `;
}

function wizardSubmit() {
  collectWizardData();
  const current = document.querySelector(`[data-wizard-step="4"]`);
  if (current) current.classList.remove('active');
  state.wizardStep = 5;
  const success = document.querySelector(`[data-wizard-step="5"]`);
  if (success) success.classList.add('active');
  const successContainer = document.getElementById('wizard-success');
  if (successContainer) {
    successContainer.innerHTML = `
      <div style="margin-bottom:16px;">
        <div style="width:64px;height:64px;background:#DCFCE7;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;">
          <i data-lucide="check" style="width:32px;height:32px;color:#16A34A;"></i>
        </div>
      </div>
      <h2 style="font-size:20px;font-weight:700;margin-bottom:8px;">המוצר "${state.wizardData.name}" נוצר בהצלחה!</h2>
      <p style="font-size:13px;color:var(--pc-slate);margin-bottom:20px;">ציון שלמות ראשוני: <strong class="font-en" style="color:#D97706;">45%</strong></p>
      <button class="btn btn-primary" onclick="showView('product-shelf');resetWizard();">עבור למדף המוצרים</button>
    `;
  }
  initIcons();
}

function resetWizard() {
  state.wizardStep = 1;
  state.wizardData = { type: 'individual' };
  document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active', 'slide-back'));
  document.querySelector('[data-wizard-step="1"]')?.classList.add('active');
  updateWizardStepper();
  const nameInput = document.getElementById('wizard-name');
  if (nameInput) nameInput.value = '';
  const descInput = document.getElementById('wizard-desc');
  if (descInput) descInput.value = '';
  const rateInput = document.getElementById('wizard-rate');
  if (rateInput) rateInput.value = '';
}

// === Border Control ===
function renderBorderControl() {
  const grid = document.getElementById('territory-grid');
  if (grid) {
    grid.innerHTML = territories.map(t => `
      <div class="territory-block ${state.activeTerritoryFilter === t.code ? 'active' : ''}" onclick="filterByTerritory('${t.code}')">
        <div class="font-en" style="font-size:18px;font-weight:700;margin-bottom:2px;">${t.code}</div>
        <div style="font-size:12px;font-weight:600;margin-bottom:4px;">${t.name}</div>
        <div class="font-en" style="font-size:11px;color:var(--pc-slate);">${t.nomads.toLocaleString()} נוודים</div>
        <div style="font-size:10px;color:${t.riskColor};font-weight:500;margin-top:4px;">סיכון ${t.risk}</div>
      </div>
    `).join('');
  }
  renderBorderTable();
}

function renderBorderTable() {
  const tbody = document.getElementById('border-tbody');
  if (!tbody) return;
  const filtered = state.activeTerritoryFilter
    ? borderChanges.filter(c => {
        const t = territories.find(tt => tt.code === state.activeTerritoryFilter);
        return t && (c.from === t.name || c.to === t.name);
      })
    : borderChanges;
  tbody.innerHTML = filtered.map((c, i) => `
    <tr onclick="toggleBorderDetail(${i})">
      <td class="font-en" style="font-weight:500;">${c.customer}</td>
      <td>${c.from}</td>
      <td>${c.to}</td>
      <td class="font-en" style="color:${c.impactColor};">${c.impact}</td>
      <td class="center"><span class="badge ${c.statusClass}">${c.status}</span></td>
    </tr>
    <tr id="border-detail-${i}" style="display:none;">
      <td colspan="5" style="padding:16px 20px;background:#f8fafc;font-size:12px;color:var(--pc-slate);">
        <div><strong>ימים בטריטוריה נוכחית:</strong> <span class="font-en">${Math.floor(Math.random() * 200) + 30}</span></div>
        <div><strong>תאריך מעבר צפוי:</strong> <span class="font-en">${c.status === 'הושלם' ? 'הושלם' : '15/03/2026'}</span></div>
        <div style="margin-top:8px;display:flex;gap:8px;">
          ${c.status !== 'הושלם' ? '<button class="btn btn-primary btn-sm" onclick="showToast(\'מעבר אושר\',\'success\')">אשר מעבר</button><button class="btn btn-danger-outline btn-sm" onclick="showToast(\'מעבר נדחה\',\'warning\')">דחה</button>' : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

function toggleBorderDetail(i) {
  const row = document.getElementById('border-detail-' + i);
  if (row) row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
}

function filterByTerritory(code) {
  state.activeTerritoryFilter = state.activeTerritoryFilter === code ? null : code;
  renderBorderControl();
}

// === Life Events ===
function renderLifeEvents() {
  const typesContainer = document.getElementById('event-type-cards');
  if (typesContainer) {
    typesContainer.innerHTML = eventTypes.map(et => `
      <div class="event-type-card ${state.activeEventFilter === et.type ? 'active' : ''}" onclick="filterLifeEvents('${et.type}')">
        <i data-lucide="${et.icon}" style="width:20px;height:20px;color:${et.color};margin:0 auto 4px;"></i>
        <div style="font-size:10px;font-weight:600;">${et.label}</div>
        <div class="font-en" style="font-size:18px;font-weight:700;">${et.count}</div>
        <div style="font-size:10px;color:var(--pc-slate);">החודש</div>
      </div>
    `).join('');
  }
  renderLifeEventsList();
  initIcons();
}

function renderLifeEventsList() {
  const container = document.getElementById('life-events-list');
  if (!container) return;
  const filtered = state.activeEventFilter
    ? lifeEvents.filter(e => e.type === state.activeEventFilter)
    : lifeEvents;
  container.innerHTML = filtered.map((e, i) => `
    <div class="card" style="display:flex;align-items:center;gap:16px;padding:12px;border-radius:8px;border:1px solid var(--pc-border);cursor:pointer;" onclick="toggleLifeEventDetail(${i})">
      <div style="width:40px;height:40px;background:${e.iconBg};border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <i data-lucide="${e.icon}" style="width:20px;height:20px;color:${e.iconColor};"></i>
      </div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:13px;font-weight:500;"><span class="font-en">${e.customer}</span> — ${e.desc}</div>
        <div style="font-size:12px;color:var(--pc-slate);">${e.impact}</div>
      </div>
      <span class="badge ${e.statusClass}">${e.status}</span>
    </div>
    <div id="life-event-detail-${i}" style="display:none;padding:12px 16px;margin-top:-8px;margin-bottom:4px;background:#f8fafc;border-radius:0 0 8px 8px;font-size:12px;color:var(--pc-slate);border:1px solid var(--pc-border);border-top:none;">
      <div><strong>דווח:</strong> <span class="font-en">06/02/2026</span></div>
      <div><strong>עובד:</strong> <span class="font-en">07/02/2026</span></div>
      <div><strong>הוחל:</strong> <span class="font-en">${e.status === 'הוחל' ? '08/02/2026' : 'ממתין'}</span></div>
      ${e.status === 'ממתין לאישור' ? '<div style="margin-top:8px;display:flex;gap:8px;"><button class="btn btn-primary btn-sm" onclick="showToast(\'אירוע אושר\',\'success\')">אשר</button><button class="btn btn-danger-outline btn-sm" onclick="showToast(\'אירוע נדחה\',\'warning\')">דחה</button></div>' : ''}
    </div>
  `).join('');
  initIcons();
}

function toggleLifeEventDetail(i) {
  const el = document.getElementById('life-event-detail-' + i);
  if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function filterLifeEvents(type) {
  state.activeEventFilter = state.activeEventFilter === type ? null : type;
  renderLifeEvents();
}

// === Corporate ===
function renderCorporate() {
  const tbody = document.getElementById('corporate-tbody');
  if (!tbody) return;
  tbody.innerHTML = corporateClients.map((c, i) => `
    <tr onclick="toggleOrgChart(${i})" style="cursor:pointer;">
      <td style="font-weight:500;">${c.name}</td>
      <td style="color:var(--pc-slate);">${c.policy}</td>
      <td class="center font-en" style="font-weight:600;">${c.members.toLocaleString()}</td>
      <td class="center font-en">${c.subGroups}</td>
      <td class="font-en">${c.premium}</td>
      <td class="center"><span class="badge ${c.statusClass}">${c.status}</span></td>
    </tr>
  `).join('');
}

function toggleOrgChart(i) {
  const container = document.getElementById('org-chart-container');
  if (!container) return;
  const client = corporateClients[i];
  if (!client || !client.orgChart.length) {
    container.style.display = 'none';
    showToast('אין נתוני מבנה ארגוני למציאת זו', 'info');
    return;
  }
  if (container.style.display !== 'none' && container.dataset.client === String(i)) {
    container.style.display = 'none';
    return;
  }
  container.dataset.client = String(i);
  container.style.display = 'block';
  container.innerHTML = `
    <div class="panel" style="padding:20px;">
      <h3 style="font-size:14px;font-weight:700;margin-bottom:16px;">מבנה ארגוני — ${client.name}</h3>
      <div class="org-chart">
        <div class="org-chart-root">${client.policy} — ${client.name}</div>
        <div class="org-chart-children">
          ${client.orgChart.map(node => {
            const [name, members] = node.split(' — ');
            return `<div class="org-chart-node" onclick="showToast('${name}: ${members} חברים','info')">
              <div style="font-weight:600;">${name}</div>
              <div style="font-size:10px;color:var(--pc-slate);">${members} חברים</div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>
  `;
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// === Finance ===
function renderFinance() {
  const tbody = document.getElementById('finance-tbody');
  if (tbody) {
    tbody.innerHTML = financeConfig.map((f, i) => `
      <tr onclick="toggleFinanceDetail(${i})" style="cursor:pointer;">
        <td style="font-weight:500;">${f.product}</td>
        <td class="center font-en">${f.premiumCcy}</td>
        <td class="center font-en">${f.coverageCcy}</td>
        <td class="center font-en">${f.deductibleCcy}</td>
        <td><span class="badge ${f.strategyClass}">${f.strategy}</span></td>
      </tr>
      <tr id="finance-detail-${i}" style="display:none;">
        <td colspan="5" style="padding:16px 20px;background:#f8fafc;font-size:12px;color:var(--pc-slate);">
          <div><strong>שער נעול:</strong> <span class="font-en">${f.premiumCcy === 'ILS' ? '3.6420' : f.premiumCcy === 'AUD' ? '1.5734' : '1.0000'}</span></div>
          <div><strong>חשיפת מט"ח:</strong> <span class="font-en">${f.premiumCcy === 'ILS' ? '$1.8M' : f.premiumCcy === 'AUD' ? '$0.9M' : '$0'}</span></div>
          <button class="btn btn-outline btn-sm" style="margin-top:8px;" onclick="showToast('שער ננעל','success')">נעל שער</button>
        </td>
      </tr>
    `).join('');
  }

  // FX Bar Chart
  const chartContainer = document.getElementById('fx-chart');
  if (chartContainer) {
    chartContainer.innerHTML = `
      <div class="fx-bar-chart">
        ${fxExposure.map(f => `
          <div class="fx-bar-row">
            <div class="fx-bar-label">${f.ccy}</div>
            <div class="fx-bar-track">
              <div class="fx-bar-fill ${f.type}" style="width:${f.pct}%;">${f.pct > 20 ? f.amount : ''}</div>
            </div>
            <div class="fx-bar-value">${f.amount}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function toggleFinanceDetail(i) {
  const row = document.getElementById('finance-detail-' + i);
  if (row) row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
}

// === Bootstrap ===
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  setupProductTabs();
  showView('dashboard');
});
