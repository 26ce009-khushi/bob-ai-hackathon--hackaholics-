/**
 * data.js — Sample Dataset for Clinical Trial Risk Monitor
 * IBM BoB AI Innovation Hackathon 2026
 * 200 Patient Records across 10 Hospital Sites
 */

// ────────────────────────────────────────────────────────────
// Site Master List
// ────────────────────────────────────────────────────────────
const SITES = [
  { id: "S01", name: "Apollo Research Center",       city: "Mumbai",    country: "India" },
  { id: "S02", name: "Mayo Clinical Hub",            city: "Chicago",   country: "USA"   },
  { id: "S03", name: "Stanford Trial Institute",     city: "Palo Alto", country: "USA"   },
  { id: "S04", name: "Royal London Clinical Centre", city: "London",    country: "UK"    },
  { id: "S05", name: "Max Healthcare Trial Unit",    city: "Delhi",     country: "India" },
  { id: "S06", name: "Johns Hopkins Research Site",  city: "Baltimore", country: "USA"   },
  { id: "S07", name: "Tata Memorial Clinical Wing",  city: "Kolkata",   country: "India" },
  { id: "S08", name: "Geneva BioPharma Center",      city: "Geneva",    country: "Switzerland" },
  { id: "S09", name: "AIIMS Clinical Research Unit", city: "Hyderabad", country: "India" },
  { id: "S10", name: "Singapore Trial Hub",          city: "Singapore", country: "Singapore" }
];

// ────────────────────────────────────────────────────────────
// Banned Co-medications list (ICH E6 protocol)
// ────────────────────────────────────────────────────────────
const BANNED_MEDS = [
  "Warfarin", "Methotrexate", "Amiodarone",
  "Rifampicin", "Phenytoin", "Carbamazepine",
  "St. John's Wort", "Ketoconazole"
];

const ALLOWED_MEDS = [
  "None", "Paracetamol", "Ibuprofen", "Omeprazole",
  "Atorvastatin", "Metformin", "Lisinopril", "Amlodipine",
  "Vitamin D", "Folic Acid", "Iron Supplement"
];

// ────────────────────────────────────────────────────────────
// Utility helpers
// ────────────────────────────────────────────────────────────
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randPick(arr)     { return arr[Math.floor(Math.random() * arr.length)]; }
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
function formatDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

// ────────────────────────────────────────────────────────────
// Generate 200 Patient Records
// ────────────────────────────────────────────────────────────
const FIRST_NAMES = ["Aditya","Priya","Rohan","Sunita","Vikram","Ananya","Kiran","Meera",
  "James","Sarah","Michael","Emily","David","Jennifer","Robert","Linda","William","Mary",
  "Ahmed","Fatima","Hassan","Zara","Omar","Layla","Chen","Wei","Liu","Mei","Raj","Nisha"];
const LAST_NAMES  = ["Sharma","Patel","Singh","Kumar","Shah","Mehta","Reddy","Nair",
  "Johnson","Williams","Brown","Jones","Davis","Miller","Wilson","Moore","Taylor","Anderson",
  "Khan","Ali","Ahmed","Hassan","Chen","Wang","Li","Zhang","Gupta","Verma","Rao","Iyer"];

function generatePatients() {
  const patients = [];
  for (let i = 1; i <= 200; i++) {
    const site       = randPick(SITES);
    const schedDate  = formatDate(randInt(0, 90));
    const visitDiff  = randInt(-14, 21); // negative = early, positive = late
    const visitDate  = addDays(schedDate, visitDiff);
    const expectedDose = randPick([10, 20, 25, 50, 100]);
    const doseGiven    = Math.random() < 0.15
      ? (Math.random() < 0.5 ? expectedDose * 2 : expectedDose * 0.5)
      : expectedDose;
    const comed   = Math.random() < 0.12 ? randPick(BANNED_MEDS) : randPick(ALLOWED_MEDS);
    const labDone = Math.random() < 0.18 ? "No" : "Yes";
    const docComplete = Math.random() < 0.15 ? "No" : "Yes";
    const status  = Math.random() < 0.05 ? "Withdrawn" : Math.random() < 0.08 ? "Screening" : "Active";

    patients.push({
      id:             `PT-${String(i).padStart(4, "0")}`,
      name:           `${randPick(FIRST_NAMES)} ${randPick(LAST_NAMES)}`,
      age:            randInt(18, 75),
      gender:         randPick(["Male", "Female"]),
      siteId:         site.id,
      siteName:       site.name,
      visitDate:      visitDate,
      scheduledDate:  schedDate,
      doseGiven:      doseGiven,
      expectedDose:   expectedDose,
      comed:          comed,
      labCompleted:   labDone,
      docComplete:    docComplete,
      status:         status,
      enrolledDate:   formatDate(randInt(90, 365))
    });
  }
  return patients;
}

// ────────────────────────────────────────────────────────────
// Export dataset
// ────────────────────────────────────────────────────────────
const PATIENTS = generatePatients();

// Freeze seed for consistent demo (regenerate on refresh for variety)
window.APP_DATA = {
  sites:      SITES,
  patients:   PATIENTS,
  bannedMeds: BANNED_MEDS
};
