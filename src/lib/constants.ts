import type { HazardClip } from "@/lib/types";

export const STORAGE_KEY = "learnerTheory_state";
export const MOCK_TEST_QUESTIONS = 50;
export const MOCK_TEST_PASS_MARK = 43;
export const MOCK_TEST_DURATION = 57 * 60;

export const TOPIC_ORDER = [
  "Alertness",
  "Attitude",
  "Safety and Your Vehicle",
  "Safety Margins",
  "Hazard Awareness",
  "Motorway Rules",
  "Rules of the Road",
  "Road and Traffic Signs",
  "Documents",
  "Incidents, Accidents and Emergencies",
  "Vehicle Handling",
  "Motorway Driving",
  "Theory Test Essentials",
  "Other",
];

export const HAZARD_CLIPS: HazardClip[] = [
  {
    title: "Residential Street",
    description: "You are driving on a quiet residential street.",
    duration: 8000,
    hazardStart: 3000,
    hazardEnd: 5500,
    maxScore: 5,
    elements: [
      { type: "ball", start: 2800, end: 7000, css: "hazard-ball" },
      { type: "child", start: 3500, end: 7000, css: "hazard-child" },
    ],
  },
  {
    title: "Approaching Junction",
    description: "You approach a junction. A car is waiting at a side road.",
    duration: 8000,
    hazardStart: 4000,
    hazardEnd: 6500,
    maxScore: 5,
    elements: [{ type: "car", start: 3800, end: 7000, css: "hazard-car-side" }],
  },
  {
    title: "Parked Cars",
    description: "You drive past a line of parked cars.",
    duration: 7000,
    hazardStart: 2500,
    hazardEnd: 5000,
    maxScore: 5,
    elements: [{ type: "door", start: 2200, end: 6000, css: "hazard-door" }],
  },
];
