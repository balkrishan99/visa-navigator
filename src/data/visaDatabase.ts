// Visa database with country-specific requirements and rules

export interface VisaRequirement {
  visaType: string;
  processingTime: string;
  documents: {
    name: string;
    description: string;
    required: boolean;
  }[];
  rejectionReasons: string[];
  tips: string[];
  fees?: string;
  validity?: string;
}

export interface CountryVisaInfo {
  work: VisaRequirement;
  study: VisaRequirement;
  travel: VisaRequirement;
}

export const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
] as const;

export const countryNames: Record<string, string> = Object.fromEntries(
  countries.map(c => [c.code, c.name])
);

export const countryFlags: Record<string, string> = Object.fromEntries(
  countries.map(c => [c.code, c.flag])
);

// Default visa requirements (used when specific country pair data isn't available)
const defaultVisaRequirements: CountryVisaInfo = {
  work: {
    visaType: "Employment Visa",
    processingTime: "6-12 weeks",
    fees: "$200-500",
    validity: "1-5 years",
    documents: [
      { name: "Valid Passport", description: "Must be valid for at least 6 months beyond intended stay", required: true },
      { name: "Job Offer Letter", description: "Official offer from sponsoring employer", required: true },
      { name: "Proof of Qualifications", description: "Degrees, certifications, or professional licenses", required: true },
      { name: "Financial Proof", description: "Bank statements from last 3-6 months", required: true },
      { name: "Health Insurance", description: "Coverage for duration of stay", required: true },
      { name: "Police Clearance", description: "Criminal background check from home country", required: true },
      { name: "Passport Photos", description: "Recent photos meeting visa requirements", required: true },
    ],
    rejectionReasons: [
      "Incomplete or insufficient financial documentation",
      "Employer verification failed or pending",
      "Insufficient qualifications for the role",
      "Gaps in employment history unexplained",
      "Previous visa violations or overstays",
    ],
    tips: [
      "Maintain consistent bank balance for 3+ months",
      "Include employer registration details and company profile",
      "Get all documents notarized where required",
      "Submit complete application to avoid processing delays",
    ],
  },
  study: {
    visaType: "Student Visa",
    processingTime: "4-8 weeks",
    fees: "$150-350",
    validity: "Duration of course",
    documents: [
      { name: "Valid Passport", description: "Must be valid for at least 6 months beyond intended stay", required: true },
      { name: "Admission Letter", description: "Acceptance from recognized educational institution", required: true },
      { name: "Proof of Funds", description: "Evidence of sufficient funds for tuition and living expenses", required: true },
      { name: "Academic Transcripts", description: "Previous educational records and certificates", required: true },
      { name: "Health Insurance", description: "Medical coverage for the study duration", required: true },
      { name: "Language Proficiency", description: "IELTS, TOEFL, or equivalent test scores", required: true },
      { name: "Passport Photos", description: "Recent photos meeting visa requirements", required: true },
    ],
    rejectionReasons: [
      "Insufficient proof of financial support",
      "Unrecognized or unaccredited institution",
      "Gaps in academic history",
      "Failed to demonstrate genuine student intent",
      "Inadequate language proficiency scores",
    ],
    tips: [
      "Apply well in advance of course start date",
      "Show clear academic progression plan",
      "Prepare for possible interview questions",
      "Have sponsor letter if someone else is funding",
    ],
  },
  travel: {
    visaType: "Tourist Visa",
    processingTime: "2-4 weeks",
    fees: "$50-160",
    validity: "30-90 days",
    documents: [
      { name: "Valid Passport", description: "Must be valid for at least 6 months beyond intended stay", required: true },
      { name: "Travel Itinerary", description: "Flight bookings and travel plan", required: true },
      { name: "Hotel Reservations", description: "Accommodation proof for entire stay", required: true },
      { name: "Financial Proof", description: "Bank statements showing sufficient travel funds", required: true },
      { name: "Travel Insurance", description: "Coverage for medical emergencies during travel", required: true },
      { name: "Passport Photos", description: "Recent photos meeting visa requirements", required: true },
    ],
    rejectionReasons: [
      "Insufficient ties to home country",
      "Weak financial documentation",
      "Incomplete travel itinerary",
      "Previous visa rejections or overstays",
      "Lack of clear travel purpose",
    ],
    tips: [
      "Show strong ties to home country (job, property, family)",
      "Book refundable flights and hotels",
      "Provide complete travel itinerary",
      "Apply during off-peak seasons for faster processing",
    ],
  },
};

// Country-specific visa requirements overrides
const countrySpecificRequirements: Record<string, Partial<Record<string, Partial<CountryVisaInfo>>>> = {
  US: {
    default: {
      work: {
        ...defaultVisaRequirements.work,
        visaType: "H-1B Work Visa",
        processingTime: "3-6 months",
        fees: "$460-2,500",
        documents: [
          ...defaultVisaRequirements.work.documents,
          { name: "Labor Condition Application (LCA)", description: "DOL certified labor condition application", required: true },
          { name: "Form I-129", description: "Petition for nonimmigrant worker", required: true },
        ],
      },
      study: {
        ...defaultVisaRequirements.study,
        visaType: "F-1 Student Visa",
        processingTime: "3-5 weeks",
        fees: "$185",
        documents: [
          ...defaultVisaRequirements.study.documents,
          { name: "I-20 Form", description: "Certificate of eligibility from SEVP-certified school", required: true },
          { name: "SEVIS Fee Receipt", description: "Payment confirmation for I-901 SEVIS fee", required: true },
        ],
      },
      travel: {
        ...defaultVisaRequirements.travel,
        visaType: "B-2 Tourist Visa",
        processingTime: "3-5 weeks",
        fees: "$185",
        validity: "Up to 10 years (multiple entry)",
      },
    },
  },
  GB: {
    default: {
      work: {
        ...defaultVisaRequirements.work,
        visaType: "Skilled Worker Visa",
        processingTime: "3-8 weeks",
        fees: "£625-1,423",
        documents: [
          ...defaultVisaRequirements.work.documents,
          { name: "Certificate of Sponsorship", description: "Reference number from licensed UK employer", required: true },
          { name: "English Language Certificate", description: "Proof of English proficiency (B1 level)", required: true },
        ],
      },
      study: {
        ...defaultVisaRequirements.study,
        visaType: "Student Visa (Tier 4)",
        processingTime: "3-4 weeks",
        fees: "£363",
        documents: [
          ...defaultVisaRequirements.study.documents,
          { name: "CAS Number", description: "Confirmation of Acceptance for Studies from licensed sponsor", required: true },
        ],
      },
    },
  },
  CA: {
    default: {
      work: {
        ...defaultVisaRequirements.work,
        visaType: "Work Permit",
        processingTime: "8-16 weeks",
        fees: "CAD $155",
        documents: [
          ...defaultVisaRequirements.work.documents,
          { name: "LMIA", description: "Labour Market Impact Assessment (if required)", required: true },
          { name: "Biometrics", description: "Fingerprints and photo at designated location", required: true },
        ],
      },
      study: {
        ...defaultVisaRequirements.study,
        visaType: "Study Permit",
        processingTime: "4-12 weeks",
        fees: "CAD $150",
        documents: [
          ...defaultVisaRequirements.study.documents,
          { name: "Provincial Attestation Letter", description: "Required for most study permit applications", required: true },
        ],
      },
    },
  },
  AU: {
    default: {
      work: {
        ...defaultVisaRequirements.work,
        visaType: "Subclass 482 (TSS) Visa",
        processingTime: "1-4 months",
        fees: "AUD $1,455-2,770",
        documents: [
          ...defaultVisaRequirements.work.documents,
          { name: "Skills Assessment", description: "Assessment from relevant assessing authority", required: true },
          { name: "Health Examination", description: "Medical exam from approved panel physician", required: true },
        ],
      },
      study: {
        ...defaultVisaRequirements.study,
        visaType: "Subclass 500 Student Visa",
        processingTime: "1-4 weeks",
        fees: "AUD $710",
        documents: [
          ...defaultVisaRequirements.study.documents,
          { name: "CoE", description: "Confirmation of Enrolment from education provider", required: true },
          { name: "GTE Statement", description: "Genuine Temporary Entrant written statement", required: true },
        ],
      },
    },
  },
  DE: {
    default: {
      work: {
        ...defaultVisaRequirements.work,
        visaType: "Employment Visa / EU Blue Card",
        processingTime: "4-12 weeks",
        fees: "€75-100",
        documents: [
          ...defaultVisaRequirements.work.documents,
          { name: "Recognition of Qualifications", description: "German recognition of foreign qualifications if required", required: true },
          { name: "German Health Insurance", description: "Public or private health insurance in Germany", required: true },
        ],
      },
    },
  },
  IT: {
    default: {
      work: {
        ...defaultVisaRequirements.work,
        visaType: "Nulla Osta / Work Visa",
        processingTime: "4-12 weeks",
        fees: "€116",
        documents: [
          ...defaultVisaRequirements.work.documents,
          { name: "Nulla Osta", description: "Authorization from Italian immigration office", required: true },
          { name: "Codice Fiscale", description: "Italian tax code (may be obtained on arrival)", required: false },
        ],
        rejectionReasons: [
          ...defaultVisaRequirements.work.rejectionReasons,
          "Nulla Osta not approved by Sportello Unico",
          "Employer quota exhausted for the year",
        ],
        tips: [
          "Apply early as Italy has annual work visa quotas (Decreto Flussi)",
          "Ensure employer applies for Nulla Osta before your visa application",
          "All documents must be translated into Italian and apostilled",
          "Health insurance must meet Schengen minimum coverage (€30,000)",
        ],
      },
      study: {
        ...defaultVisaRequirements.study,
        visaType: "Student Visa (Type D)",
        processingTime: "3-8 weeks",
        fees: "€50",
        documents: [
          ...defaultVisaRequirements.study.documents,
          { name: "Pre-enrollment Confirmation", description: "Proof of pre-enrollment at Italian university", required: true },
          { name: "Proof of Accommodation", description: "Housing arrangement for first year", required: true },
        ],
        tips: [
          "Pre-enroll through Universitaly portal for most universities",
          "Demonstrate at least €6,000 per year for living expenses",
          "Italian language courses may require A2-B1 proficiency",
          "Apply at least 2 months before course start date",
        ],
      },
      travel: {
        ...defaultVisaRequirements.travel,
        visaType: "Schengen Visa (Type C)",
        processingTime: "2-4 weeks",
        fees: "€80",
        validity: "Up to 90 days in 180-day period",
        tips: [
          "Apply to Italy if it's your main destination in Schengen area",
          "Show complete day-by-day itinerary",
          "Travel insurance must cover all Schengen countries",
          "Book appointments early during peak tourist season",
        ],
      },
    },
  },
  ES: {
    default: {
      work: {
        ...defaultVisaRequirements.work,
        visaType: "Work Visa / Autorizacion de Trabajo",
        processingTime: "4-12 weeks",
        fees: "€80",
        documents: [
          ...defaultVisaRequirements.work.documents,
          { name: "Work Authorization", description: "Approval from Spanish Ministry of Labor", required: true },
          { name: "NIE Number", description: "Foreigner identity number (obtained on arrival)", required: false },
        ],
        rejectionReasons: [
          ...defaultVisaRequirements.work.rejectionReasons,
          "Position not on shortage occupation list",
          "Employer failed to meet local hiring requirements",
        ],
        tips: [
          "Highly-skilled professionals may qualify for faster EU Blue Card process",
          "Digital Nomad Visa available for remote workers earning 200% of minimum wage",
          "All documents require apostille and sworn translation to Spanish",
          "Consider Golden Visa if investing €500,000+ in Spanish property",
        ],
      },
      study: {
        ...defaultVisaRequirements.study,
        visaType: "Student Visa (Visado de Estudiante)",
        processingTime: "4-8 weeks",
        fees: "€80",
        documents: [
          ...defaultVisaRequirements.study.documents,
          { name: "Proof of Accommodation", description: "Housing arrangement in Spain", required: true },
          { name: "Health Certificate", description: "Medical certificate from authorized doctor", required: true },
        ],
        tips: [
          "Students can work up to 20 hours per week with authorization",
          "Private health insurance required for full duration",
          "Show financial means of €600+ per month",
          "Masters students can apply for job-seeker extension after graduation",
        ],
      },
      travel: {
        ...defaultVisaRequirements.travel,
        visaType: "Schengen Visa (Type C)",
        processingTime: "2-3 weeks",
        fees: "€80",
        validity: "Up to 90 days in 180-day period",
        tips: [
          "Spain processes Schengen visas relatively quickly",
          "Show travel insurance with €30,000 minimum coverage",
          "Apply at BLS or VFS center in your country",
          "Detailed travel itinerary improves approval chances",
        ],
      },
    },
  },
  NL: {
    default: {
      work: {
        ...defaultVisaRequirements.work,
        visaType: "Highly Skilled Migrant Visa (Kennismigrant)",
        processingTime: "2-6 weeks",
        fees: "€210",
        documents: [
          ...defaultVisaRequirements.work.documents,
          { name: "IND Recognized Sponsor", description: "Employment with IND-recognized company", required: true },
          { name: "Antecedents Certificate", description: "Declaration of no criminal record", required: true },
        ],
        rejectionReasons: [
          ...defaultVisaRequirements.work.rejectionReasons,
          "Salary below Kennismigrant threshold",
          "Employer not IND-recognized sponsor",
        ],
        tips: [
          "Highly skilled migrant visa has salary thresholds (age-dependent)",
          "30% tax ruling may apply for first 5 years",
          "Orientation Year visa available for recent graduates",
          "Spouse gets open work permit automatically",
        ],
      },
      study: {
        ...defaultVisaRequirements.study,
        visaType: "Student Residence Permit (MVV + VVR)",
        processingTime: "4-8 weeks",
        fees: "€210",
        documents: [
          ...defaultVisaRequirements.study.documents,
          { name: "Proof of Funds", description: "€13,000+ in blocked account or scholarship proof", required: true },
          { name: "TB Test", description: "Tuberculosis test for certain nationalities", required: false },
        ],
        tips: [
          "University handles residence permit application (TEV procedure)",
          "Dutch courses available but most masters are in English",
          "Students can work 16 hours/week during studies",
          "Orientation Year available after graduation",
        ],
      },
      travel: {
        ...defaultVisaRequirements.travel,
        visaType: "Schengen Visa (Type C)",
        processingTime: "2-4 weeks",
        fees: "€80",
        validity: "Up to 90 days in 180-day period",
        tips: [
          "Amsterdam Schiphol is major European hub - apply here for multi-country trips",
          "VFS Global handles applications in most countries",
          "Strong ties to home country are critical for approval",
          "Consider applying in winter for faster processing",
        ],
      },
    },
  },
  SG: {
    default: {
      work: {
        ...defaultVisaRequirements.work,
        visaType: "Employment Pass",
        processingTime: "3-8 weeks",
        fees: "SGD $105-225",
        documents: [
          ...defaultVisaRequirements.work.documents.filter(d => d.name !== "Health Insurance"),
          { name: "Educational Certificates", description: "Verified copies of degrees and diplomas", required: true },
        ],
      },
    },
  },
  PT: {
    default: {
      work: {
        ...defaultVisaRequirements.work,
        visaType: "Work Visa / Tech Visa",
        processingTime: "4-8 weeks",
        fees: "€90",
        documents: [
          ...defaultVisaRequirements.work.documents,
          { name: "SEF Approval", description: "Immigration service preliminary approval", required: true },
          { name: "NIF Number", description: "Portuguese tax identification number", required: false },
        ],
        tips: [
          "Tech Visa offers fast-track for certified tech companies",
          "D7 Passive Income Visa for remote workers/retirees",
          "All documents need apostille and Portuguese translation",
          "Portugal offers path to EU citizenship after 5 years",
        ],
      },
      travel: {
        ...defaultVisaRequirements.travel,
        visaType: "Schengen Visa (Type C)",
        processingTime: "2-4 weeks",
        fees: "€80",
        validity: "Up to 90 days in 180-day period",
      },
    },
  },
  CH: {
    default: {
      work: {
        ...defaultVisaRequirements.work,
        visaType: "Work Permit (L/B/C Permit)",
        processingTime: "6-12 weeks",
        fees: "CHF 65-150",
        documents: [
          ...defaultVisaRequirements.work.documents,
          { name: "Employer Application", description: "Swiss employer must apply to cantonal authorities", required: true },
          { name: "Proof of No Local Candidate", description: "Evidence position couldn't be filled locally", required: true },
        ],
        rejectionReasons: [
          ...defaultVisaRequirements.work.rejectionReasons,
          "Annual quota for non-EU workers exhausted",
          "Insufficient proof of specialized skills",
        ],
        tips: [
          "Switzerland has strict quotas for non-EU/EFTA workers",
          "L permit for short-term (up to 1 year), B permit for long-term",
          "Highly specialized roles have better approval chances",
          "Salary must meet Swiss standards for the position",
        ],
      },
    },
  },
  IE: {
    default: {
      work: {
        ...defaultVisaRequirements.work,
        visaType: "Employment Permit",
        processingTime: "4-12 weeks",
        fees: "€1,000",
        documents: [
          ...defaultVisaRequirements.work.documents,
          { name: "Employment Permit", description: "Approved permit from DETE", required: true },
          { name: "Labor Market Needs Test", description: "Proof job was advertised locally for 28 days", required: true },
        ],
        tips: [
          "Critical Skills permit for in-demand occupations (faster processing)",
          "ICT permit available for intra-company transfers",
          "Spouse can get Stamp 1G open work permit",
          "Path to permanent residence after 5 years",
        ],
      },
      study: {
        ...defaultVisaRequirements.study,
        visaType: "Study Visa (Stamp 2)",
        processingTime: "4-8 weeks",
        fees: "€60",
        documents: [
          ...defaultVisaRequirements.study.documents,
          { name: "Course Fee Payment", description: "Proof of tuition payment or scholarship", required: true },
          { name: "Medical Insurance", description: "Private health insurance for Ireland", required: true },
        ],
        tips: [
          "Students can work 20 hours/week during term, 40 hours during holidays",
          "Third Level Graduate Scheme allows 1-2 years post-study work",
          "GNIB registration required within 90 days of arrival",
          "Minimum funds requirement of €10,000 in bank account",
        ],
      },
    },
  },
  KR: {
    default: {
      work: {
        ...defaultVisaRequirements.work,
        visaType: "E-7 Skilled Worker Visa",
        processingTime: "4-8 weeks",
        fees: "USD $45-90",
        documents: [
          ...defaultVisaRequirements.work.documents,
          { name: "Employer Invitation Letter", description: "Official invitation from Korean employer", required: true },
          { name: "Degree Verification", description: "Apostilled educational credentials", required: true },
        ],
        tips: [
          "E-7 visa requires employer sponsorship and expertise verification",
          "H-1 Working Holiday visa available for ages 18-30 from certain countries",
          "D-10 Job Seeker visa for those with Korean qualifications",
          "TOPIK score helpful but not always required",
        ],
      },
    },
  },
};

// Generate AI explanation based on visa type and countries
export const generateAIExplanation = (
  nationality: string,
  destination: string,
  purpose: string
): string => {
  const destName = countryNames[destination] || destination;
  
  const explanations: Record<string, string> = {
    work: `As a ${countryNames[nationality] || nationality} citizen applying for a work visa to ${destName}, you'll need a valid job offer from a ${destName} employer. The sponsoring company may need to demonstrate they couldn't find a suitable local candidate. Your salary must typically meet minimum threshold requirements. Ensure your bank statements show stable income for at least 3 months prior to application. Professional qualifications may need to be verified or recognized by ${destName} authorities.`,
    
    study: `To study in ${destName} as a ${countryNames[nationality] || nationality} citizen, you'll need an acceptance letter from a recognized educational institution. Demonstrate sufficient funds to cover both tuition fees and living expenses for your entire course duration. Language proficiency tests like IELTS or TOEFL are typically required. Health insurance coverage is mandatory for the duration of your studies. Consider applying 3-4 months before your course start date.`,
    
    travel: `For visiting ${destName} as a tourist from ${countryNames[nationality] || nationality}, you'll need to show proof of accommodation, return flights, and sufficient funds for your stay. Strong ties to your home country (employment, property, family) help demonstrate your intent to return. Travel insurance covering medical emergencies is highly recommended. Ensure your passport is valid for at least 6 months beyond your planned departure date from ${destName}.`,
  };
  
  return explanations[purpose] || explanations.travel;
};

// Get visa requirements for a specific country pair
export const getVisaRequirements = (
  nationality: string,
  destination: string,
  purpose: 'work' | 'study' | 'travel'
): VisaRequirement => {
  // Check for destination-specific requirements
  const destRequirements = countrySpecificRequirements[destination];
  if (destRequirements?.default?.[purpose]) {
    return destRequirements.default[purpose] as VisaRequirement;
  }
  
  // Fall back to default requirements
  return defaultVisaRequirements[purpose];
};

// Calculate rejection risk based on various factors
export const calculateRejectionRisk = (
  purpose: string,
  uploadedDocsCount: number,
  requiredDocsCount: number
): { level: 'low' | 'medium' | 'high'; percentage: number } => {
  const docCompleteness = requiredDocsCount > 0 ? uploadedDocsCount / requiredDocsCount : 0;
  
  // Base risk varies by visa type
  let baseRisk = purpose === 'work' ? 35 : purpose === 'study' ? 25 : 15;
  
  // Adjust based on document completeness
  const docRiskReduction = docCompleteness * 20;
  const finalRisk = Math.max(10, Math.min(80, baseRisk - docRiskReduction));
  
  return {
    level: finalRisk < 30 ? 'low' : finalRisk < 50 ? 'medium' : 'high',
    percentage: Math.round(finalRisk),
  };
};
