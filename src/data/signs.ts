import type { RoadSign } from '@/lib/types';

export const ROAD_SIGNS: RoadSign[] = [
  {
    id: "stop",
    name: "Stop",
    category: "prohibitory",
    meaning: "You must come to a complete stop before proceeding.",
    penalty: "3 points and £100 fine for failure to stop; up to £1,000 if referred to court.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,5 110,25 110,95 60,115 10,95 10,25" fill="#C8102E" stroke="white" stroke-width="3"/>
      <text x="60" y="70" font-family="Arial,sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">STOP</text>
    </svg>`
  },
  {
    id: "give_way",
    name: "Give Way",
    category: "prohibitory",
    meaning: "You must give way to traffic on the major road ahead.",
    penalty: "3 points and £100 fine; up to £1,000 if dangerous driving results.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,10 110,100 10,100" fill="white" stroke="#C8102E" stroke-width="8"/>
      <polygon points="60,25 95,90 25,90" fill="#C8102E"/>
    </svg>`
  },
  {
    id: "speed_limit_30",
    name: "Speed limit 30",
    category: "speed",
    meaning: "Maximum speed limit of 30 mph.",
    penalty: "3 points and £100 fine; speed awareness course possible; court may impose 6 points.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" fill="white" stroke="#C8102E" stroke-width="8"/>
      <text x="60" y="82" font-family="Arial,sans-serif" font-size="48" font-weight="bold" fill="black" text-anchor="middle">30</text>
    </svg>`
  },
  {
    id: "speed_limit_60",
    name: "Speed limit 60",
    category: "speed",
    meaning: "Maximum speed limit of 60 mph (single carriageway).",
    penalty: "3 points and £100 fine; speed awareness course possible; court may impose 6 points.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" fill="white" stroke="#C8102E" stroke-width="8"/>
      <text x="60" y="82" font-family="Arial,sans-serif" font-size="48" font-weight="bold" fill="black" text-anchor="middle">60</text>
    </svg>`
  },
  {
    id: "national_speed_limit",
    name: "National speed limit",
    category: "speed",
    meaning: "Default national speed limits apply (60 mph on single carriageway, 70 mph on dual carriageway/motorway).",
    penalty: "3 points and £100 fine; speed awareness course possible; court may impose 6 points.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" fill="white" stroke="#1D1D1B" stroke-width="2"/>
      <line x1="25" y1="95" x2="95" y2="25" stroke="#1D1D1B" stroke-width="10"/>
    </svg>`
  },
  {
    id: "no_entry",
    name: "No entry",
    category: "prohibitory",
    meaning: "No entry for any vehicle.",
    penalty: "3 points and £100 fine; up to £1,000 if dangerous.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" fill="#C8102E"/>
      <rect x="18" y="50" width="84" height="20" fill="white"/>
    </svg>`
  },
  {
    id: "mini_roundabout",
    name: "Mini roundabout",
    category: "mandatory",
    meaning: "Give way to traffic from the right and circulate clockwise around the roundabout.",
    penalty: "3 points and £100 fine for dangerous use; up to £1,000 if court referred.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" fill="#0044CC" stroke="white" stroke-width="3"/>
      <path d="M 60 25 A 20 20 0 1 1 60 85" fill="none" stroke="white" stroke-width="8" stroke-linecap="round"/>
      <polygon points="50,75 60,95 70,75" fill="white"/>
      <path d="M 85 60 L 75 50 M 85 60 L 75 70" stroke="white" stroke-width="6" stroke-linecap="round"/>
      <path d="M 35 60 L 45 50 M 35 60 L 45 70" stroke="white" stroke-width="6" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "pedestrian_crossing_ahead",
    name: "Pedestrian crossing ahead",
    category: "warning",
    meaning: "Pedestrian crossing ahead; be prepared to stop.",
    penalty: "3 points and £100 fine for failing to stop at crossing; up to £1,000 and disqualification if dangerous.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,10 110,100 10,100" fill="#FFD100" stroke="#1D1D1B" stroke-width="4"/>
      <circle cx="55" cy="55" r="5" fill="#1D1D1B"/>
      <path d="M 55 62 L 50 80 L 45 80 L 50 62 Z" fill="#1D1D1B"/>
      <path d="M 50 62 L 60 72 L 65 68 L 58 60 Z" fill="#1D1D1B"/>
      <rect x="44" y="80" width="5" height="12" fill="#1D1D1B"/>
      <rect x="54" y="80" width="5" height="12" fill="#1D1D1B"/>
      <path d="M 65 50 L 75 50 M 70 45 L 70 55" stroke="#1D1D1B" stroke-width="3"/>
    </svg>`
  },
  {
    id: "dual_carriageway_ends",
    name: "Dual carriageway ends",
    category: "warning",
    meaning: "The dual carriageway ends ahead; traffic may now meet oncoming vehicles.",
    penalty: "No direct penalty, but careless driving may result in 3–9 points and up to £2,500 fine.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,10 110,100 10,100" fill="#FFD100" stroke="#1D1D1B" stroke-width="4"/>
      <rect x="40" y="55" width="12" height="30" fill="#1D1D1B"/>
      <rect x="68" y="55" width="12" height="30" fill="#1D1D1B"/>
      <rect x="52" y="55" width="16" height="30" fill="white"/>
      <line x1="60" y1="55" x2="60" y2="85" stroke="#1D1D1B" stroke-width="2" stroke-dasharray="4,2"/>
    </svg>`
  },
  {
    id: "slippery_road",
    name: "Slippery road",
    category: "warning",
    meaning: "Road surface may be slippery ahead; reduce speed and avoid harsh braking or steering.",
    penalty: "No direct penalty, but causing a collision may lead to 3–9 points and up to £2,500 fine.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,10 110,100 10,100" fill="#FFD100" stroke="#1D1D1B" stroke-width="4"/>
      <path d="M 25 90 Q 35 70 45 85 T 65 75 T 85 85 T 95 90" fill="none" stroke="#1D1D1B" stroke-width="4" stroke-linecap="round"/>
      <path d="M 30 95 Q 40 75 50 90 T 70 80 T 90 90 T 100 95" fill="none" stroke="#1D1D1B" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "traffic_lights_ahead",
    name: "Traffic lights ahead",
    category: "warning",
    meaning: "Traffic signals ahead; be prepared to stop.",
    penalty: "3 points and £100 fine for running a red light; up to £1,000 if court referred.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,10 110,100 10,100" fill="#FFD100" stroke="#1D1D1B" stroke-width="4"/>
      <rect x="48" y="40" width="24" height="50" rx="4" fill="#1D1D1B"/>
      <circle cx="60" cy="52" r="6" fill="#C8102E"/>
      <circle cx="60" cy="65" r="6" fill="#FFD100"/>
      <circle cx="60" cy="78" r="6" fill="#007A33"/>
    </svg>`
  },
  {
    id: "school_crossing_patrol",
    name: "School crossing patrol",
    category: "warning",
    meaning: "School crossing patrol ahead; stop when sign is displayed.",
    penalty: "3 points and £100 fine for failing to stop; up to £1,000 if dangerous.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,10 110,100 10,100" fill="#FFD100" stroke="#1D1D1B" stroke-width="4"/>
      <circle cx="50" cy="45" r="4" fill="#1D1D1B"/>
      <path d="M 50 50 L 45 70 M 50 50 L 55 70" stroke="#1D1D1B" stroke-width="3" stroke-linecap="round"/>
      <rect x="43" y="70" width="4" height="10" fill="#1D1D1B"/>
      <rect x="53" y="70" width="4" height="10" fill="#1D1D1B"/>
      <circle cx="70" cy="45" r="4" fill="#1D1D1B"/>
      <path d="M 70 50 L 65 70 M 70 50 L 75 70" stroke="#1D1D1B" stroke-width="3" stroke-linecap="round"/>
      <rect x="63" y="70" width="4" height="10" fill="#1D1D1B"/>
      <rect x="73" y="70" width="4" height="10" fill="#1D1D1B"/>
    </svg>`
  },
  {
    id: "no_overtaking",
    name: "No overtaking",
    category: "prohibitory",
    meaning: "You must not overtake any vehicle while this restriction applies.",
    penalty: "3 points and £100 fine; up to £1,000 if dangerous overtaking.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" fill="white" stroke="#C8102E" stroke-width="8"/>
      <rect x="25" y="62" width="22" height="8" rx="3" fill="#1D1D1B"/>
      <rect x="30" y="55" width="14" height="7" rx="2" fill="#1D1D1B"/>
      <circle cx="30" cy="73" r="3" fill="#1D1D1B"/>
      <circle cx="42" cy="73" r="3" fill="#1D1D1B"/>
      <rect x="55" y="62" width="18" height="8" rx="3" fill="#1D1D1B"/>
      <rect x="59" y="56" width="10" height="6" rx="2" fill="#1D1D1B"/>
      <circle cx="58" cy="72" r="2.5" fill="#1D1D1B"/>
      <circle cx="70" cy="72" r="2.5" fill="#1D1D1B"/>
      <line x1="85" y1="30" x2="35" y2="90" stroke="#C8102E" stroke-width="6"/>
    </svg>`
  },
  {
    id: "end_of_no_overtaking",
    name: "End of no overtaking",
    category: "prohibitory",
    meaning: "The no-overtaking restriction ends.",
    penalty: "No direct penalty, but overtaking carelessly may result in 3–9 points and up to £2,500 fine.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" fill="white" stroke="#1D1D1B" stroke-width="2"/>
      <line x1="25" y1="95" x2="95" y2="25" stroke="#1D1D1B" stroke-width="10"/>
      <rect x="25" y="62" width="22" height="8" rx="3" fill="#1D1D1B"/>
      <rect x="30" y="55" width="14" height="7" rx="2" fill="#1D1D1B"/>
      <circle cx="30" cy="73" r="3" fill="#1D1D1B"/>
      <circle cx="42" cy="73" r="3" fill="#1D1D1B"/>
      <rect x="55" y="62" width="18" height="8" rx="3" fill="#1D1D1B"/>
      <rect x="59" y="56" width="10" height="6" rx="2" fill="#1D1D1B"/>
      <circle cx="58" cy="72" r="2.5" fill="#1D1D1B"/>
      <circle cx="70" cy="72" r="2.5" fill="#1D1D1B"/>
    </svg>`
  },
  {
    id: "keep_left",
    name: "Keep left",
    category: "mandatory",
    meaning: "You must pass the obstacle on the left.",
    penalty: "3 points and £100 fine; up to £1,000 if dangerous.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" fill="#0044CC" stroke="white" stroke-width="3"/>
      <rect x="75" y="20" width="15" height="80" rx="4" fill="white"/>
      <polygon points="50,60 75,45 75,75" fill="white"/>
    </svg>`
  },
  {
    id: "ahead_only",
    name: "Ahead only",
    category: "mandatory",
    meaning: "You must proceed ahead only at the junction.",
    penalty: "3 points and £100 fine; up to £1,000 if dangerous.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" fill="#0044CC" stroke="white" stroke-width="3"/>
      <polygon points="60,20 80,50 68,50 68,90 52,90 52,50 40,50" fill="white"/>
    </svg>`
  },
  {
    id: "left_turn_only",
    name: "Left turn only",
    category: "mandatory",
    meaning: "You must turn left at the junction.",
    penalty: "3 points and £100 fine; up to £1,000 if dangerous.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" fill="#0044CC" stroke="white" stroke-width="3"/>
      <polygon points="30,60 60,40 60,52 90,52 90,68 60,68 60,80" fill="white"/>
    </svg>`
  },
  {
    id: "motorway_ahead",
    name: "Motorway ahead",
    category: "information",
    meaning: "Motorway begins ahead; motorway regulations now apply.",
    penalty: "3 points and £100 fine for motorway violations (e.g., learner drivers, prohibited vehicles); up to £1,000.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="100" height="100" rx="4" fill="#007A33"/>
      <text x="60" y="55" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">MOTORWAY</text>
      <text x="60" y="85" font-family="Arial,sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">AHEAD</text>
    </svg>`
  },
  {
    id: "lane_closed",
    name: "Lane closed",
    category: "warning",
    meaning: "One lane of the carriageway is closed ahead.",
    penalty: "3 points and £100 fine for ignoring lane closure; up to £1,000 if dangerous.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,10 110,100 10,100" fill="#FFD100" stroke="#1D1D1B" stroke-width="4"/>
      <rect x="35" y="55" width="12" height="30" fill="#1D1D1B"/>
      <rect x="53" y="55" width="12" height="30" fill="white"/>
      <rect x="71" y="55" width="12" height="30" fill="#1D1D1B"/>
      <line x1="59" y1="55" x2="59" y2="85" stroke="#1D1D1B" stroke-width="2" stroke-dasharray="4,2"/>
    </svg>`
  },
  {
    id: "chevron",
    name: "Chevron",
    category: "warning",
    meaning: "Sharp bend in the road ahead; slow down and follow the direction indicated.",
    penalty: "No direct penalty, but causing a collision may lead to 3–9 points and up to £2,500 fine.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,10 110,100 10,100" fill="#FFD100" stroke="#1D1D1B" stroke-width="4"/>
      <polygon points="60,30 80,70 70,70 60,50 50,70 40,70" fill="#1D1D1B"/>
    </svg>`
  },
  {
    id: "double_white_lines",
    name: "Double white lines",
    category: "road_marking",
    meaning: "You must not cross or straddle double white lines where the line nearest to you is solid, except to turn into a property or side road, or to overtake a pedal cycle, horse, or road maintenance vehicle travelling at 10 mph or less.",
    penalty: "3 points and £100 fine; up to £1,000 if dangerous overtaking.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" fill="#808080"/>
      <line x1="50" y1="0" x2="50" y2="120" stroke="white" stroke-width="4"/>
      <line x1="60" y1="0" x2="60" y2="120" stroke="white" stroke-width="4"/>
    </svg>`
  },
  {
    id: "box_junction",
    name: "Box junction",
    category: "road_marking",
    meaning: "You must not enter the box junction unless your exit is clear; you may enter and wait only when turning right and prevented from doing so by oncoming traffic or other vehicles waiting to turn right.",
    penalty: "£130 PCN (Penalty Charge Notice) in London and other enforceable areas; no points, but fine can double if unpaid.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" fill="#808080"/>
      <rect x="10" y="10" width="100" height="100" fill="none" stroke="#FFD100" stroke-width="6"/>
      <line x1="10" y1="10" x2="110" y2="110" stroke="#FFD100" stroke-width="4"/>
      <line x1="110" y1="10" x2="10" y2="110" stroke="#FFD100" stroke-width="4"/>
    </svg>`
  },
  {
    id: "zigzag_lines",
    name: "Zigzag lines",
    category: "road_marking",
    meaning: "You must not overtake, park, or wait on the zigzag lines near pedestrian crossings; they indicate the controlled area of the crossing.",
    penalty: "3 points and £100 fine; parking PCN up to £130; dangerous driving may result in court prosecution.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" fill="#808080"/>
      <polygon points="0,0 20,40 40,0 60,40 80,0 100,40 120,0 120,20 100,60 80,20 60,60 40,20 20,60 0,20" fill="white"/>
    </svg>`
  },
  {
    id: "no_waiting",
    name: "No waiting",
    category: "prohibitory",
    meaning: "You must not wait or park in the restricted area during the times shown on the nearby sign.",
    penalty: "£50–£130 PCN depending on area; no points, but fine increases if unpaid.",
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="55" fill="#0044CC" stroke="#C8102E" stroke-width="8"/>
      <line x1="25" y1="95" x2="95" y2="25" stroke="#C8102E" stroke-width="8"/>
    </svg>`
  }
];
