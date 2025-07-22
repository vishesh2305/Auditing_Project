// src/data/auditedSystems.js

export const auditedSystems = [
  {
    id: "1",
    name: "Automated Beneficiary Targeting",
    agency: "Ministry of Social Justice",
    fairnessScore: 72,
    status: "Bias Detected",
    lastAudit: "2024-04-10",
    description: "An AI system used to determine eligibility for government social welfare schemes.",
    biasDetails: {
      impact: "Over-selection of urban populations; underrepresentation of rural SC/ST groups",
      affectedGroups: ["Rural SC", "ST", "Women"],
      remediation: "Bias mitigation retraining on diverse datasets in progress."
    },
    xaiReport: {
      topFeatures: ["Income", "Caste", "Region"],
      explanation: "Caste and region were disproportionately influencing eligibility scores."
    }
  },
  {
    id: "2",
    name: "Predictive Policing System",
    agency: "State Police Dept.",
    fairnessScore: 60,
    status: "Bias Detected",
    lastAudit: "2024-03-21",
    description: "Used to predict crime hotspots and allocate police resources.",
    vulnerableCode: `
function assignPatrolAreas(historicalData) {
  // WARNING: This logic is overly simplistic and biased.
  // It heavily relies on historical arrest data from specific pin codes,
  // which can reinforce existing biases.
  const highRiskPinCodes = ["110021", "110025", "110044"];

  let patrolAssignments = {};

  for (const record of historicalData) {
    if (highRiskPinCodes.includes(record.pin_code)) {
      patrolAssignments[record.pin_code] = (patrolAssignments[record.pin_code] || 0) + 2; // High priority
    } else {
      patrolAssignments[record.pin_code] = (patrolAssignments[record.pin_code] || 0) + 1; // Standard priority
    }
  }
  return patrolAssignments;
}`,
    biasDetails: {
      impact: "Higher false positives in Dalit and Muslim neighborhoods",
      affectedGroups: ["Dalits", "Muslims"],
      remediation: "Review underway. Data audit and retraining proposed."
    },
    xaiReport: {
      topFeatures: ["Pin code", "Community flag", "Past reports"],
      explanation: "Pin code and community flags were over-weighted, leading to biased predictions."
    }
  },
  {
    id: "3",
    name: "Automated Teacher Recruitment",
    agency: "State Education Board",
    fairnessScore: 88,
    status: "Fair",
    lastAudit: "2024-05-05",
    description: "Rank-based AI system for hiring primary school teachers.",
    biasDetails: {
      impact: "No statistically significant bias found",
      affectedGroups: [],
      remediation: "N/A"
    },
    xaiReport: {
      topFeatures: ["Exam score", "Interview rating"],
      explanation: "Selection based mainly on scores and ratings without biased correlations."
    }
  },
  {
    id: "4",
    name: "Health Subsidy Eligibility AI",
    agency: "National Health Mission",
    fairnessScore: 55,
    status: "Bias Detected",
    lastAudit: "2024-03-12",
    description: "Used to approve citizens for government health subsidy.",
    biasDetails: {
      impact: "Higher rejection rates for women from rural districts",
      affectedGroups: ["Women", "Rural poor"],
      remediation: "Fairness constraints being added to retraining pipeline"
    },
    xaiReport: {
      topFeatures: ["Gender", "District", "Family size"],
      explanation: "Gender and district were leading to skewed results; mitigation in progress."
    }
  }
];

export const PIE_COLORS = ['#0088FE', '#FF8042'];