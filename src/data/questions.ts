import type { Question } from '@/lib/types';

export const THEORY_QUESTIONS: Question[] = [
  // ============================================================
  // 1. ALERTNESS (5 questions)
  // ============================================================
  {
    id: 1,
    topic: "Alertness",
    question: "Before starting a journey, you should check your tyre pressures. When should this be done?",
    options: [
      "When the tyres are cold",
      "When the tyres are hot",
      "After driving at high speed for 10 minutes",
      "Only when the tyres look flat"
    ],
    correctIndex: 0,
    explanation: "Tyre pressures should be checked when the tyres are cold. Hot tyres give a false reading because the air inside expands with heat, leading to an inaccurate pressure measurement. Correct pressures ensure safety, fuel efficiency, and even tyre wear.",
    difficulty: "easy"
  },
  {
    id: 2,
    topic: "Alertness",
    question: "You are about to drive home but you cannot find your glasses. You need them to drive. What should you do?",
    options: [
      "Drive home slowly using side roads",
      "Borrow a friend's glasses",
      "Find a way to get home without driving",
      "Squint to improve your focus"
    ],
    correctIndex: 2,
    explanation: "If you need glasses to meet the legal eyesight standard for driving, you must wear them every time you drive. Driving without them is illegal and dangerous. You should find an alternative way to get home.",
    difficulty: "easy"
  },
  {
    id: 3,
    topic: "Alertness",
    question: "What should you do if you begin to feel drowsy while driving on a motorway?",
    options: [
      "Turn up the radio volume",
      "Open a window for fresh air and continue driving",
      "Stop at the next service area or exit and rest",
      "Drink a strong coffee and keep driving"
    ],
    correctIndex: 2,
    explanation: "If you feel drowsy while driving, you should stop at the next service area or motorway exit and rest. Turning up the radio or opening a window are temporary measures that do not cure fatigue. Caffeine takes time to work and is not a substitute for proper rest.",
    difficulty: "medium"
  },
  {
    id: 4,
    topic: "Alertness",
    question: "You are driving in heavy rain. What should you do if your steering suddenly feels very light?",
    options: [
      "Brake firmly to slow down",
      "Steer sharply to test grip",
      "Ease off the accelerator to allow tyres to regain grip",
      "Accelerate to push water away from the tyres"
    ],
    correctIndex: 2,
    explanation: "If your steering feels light, you may be aquaplaning, where a layer of water builds between the tyres and the road surface. Ease off the accelerator and do not brake or steer suddenly. Allow the tyres to regain contact with the road naturally.",
    difficulty: "medium"
  },
  {
    id: 5,
    topic: "Alertness",
    question: "Why is it particularly important to check your blind spot before moving off from the kerb?",
    options: [
      "To check for potholes near the kerb",
      "Because cyclists or motorcyclists may be overtaking on your left",
      "To see if your indicators are working",
      "Because pedestrians may be crossing the road ahead"
    ],
    correctIndex: 1,
    explanation: "Cyclists and motorcyclists can approach quickly in your blind spot, especially on the left side. Mirrors do not cover all angles, so a physical shoulder check is essential before moving off to avoid a collision.",
    difficulty: "easy"
  },

  // ============================================================
  // 2. ATTITUDE (5 questions)
  // ============================================================
  {
    id: 6,
    topic: "Attitude",
    question: "You are driving at the speed limit when a vehicle behind starts to flash its headlights. What should you do?",
    options: [
      "Speed up to get away from the vehicle",
      "Allow the vehicle to overtake when it is safe",
      "Brake sharply to show your brake lights",
      "Ignore the vehicle and continue driving"
    ],
    correctIndex: 1,
    explanation: "If a driver wishes to overtake, you should not speed up or obstruct them. Allow them to pass when it is safe to do so. Speeding up is dangerous and illegal, and brake-checking another vehicle is reckless.",
    difficulty: "medium"
  },
  {
    id: 7,
    topic: "Attitude",
    question: "A driver cuts in front of you, causing you to brake sharply. What should you do?",
    options: [
      "Sound your horn and flash your headlights",
      "Stay calm and maintain a safe following distance",
      "Drive closely behind them to show your annoyance",
      "Overtake them immediately and gesture"
    ],
    correctIndex: 1,
    explanation: "Road rage and aggressive driving increase the risk of accidents. You should remain calm, keep a safe distance, and focus on your own driving. Retaliating can escalate the situation and endanger everyone.",
    difficulty: "easy"
  },
  {
    id: 8,
    topic: "Attitude",
    question: "Why should you avoid driving closely behind large goods vehicles on a wet road?",
    options: [
      "Because they may stop suddenly",
      "Because spray from their tyres reduces your visibility",
      "Because they block your view of road signs",
      "Because they may reverse without warning"
    ],
    correctIndex: 1,
    explanation: "Large vehicles create significant spray from their tyres in wet conditions, which severely reduces visibility. You should maintain a greater following distance in wet weather to ensure you can see and react safely.",
    difficulty: "easy"
  },
  {
    id: 9,
    topic: "Attitude",
    question: "You are driving in a residential area. Some children are playing near the pavement. What should you do?",
    options: [
      "Sound your horn to warn them you are coming",
      "Continue at the same speed but watch them",
      "Slow down and be prepared to stop",
      "Wave at them to move off the road"
    ],
    correctIndex: 2,
    explanation: "Children can be unpredictable and may run into the road without warning. In residential areas where children are playing, you should slow down and be prepared to stop. Sounding your horn can startle them and cause them to panic.",
    difficulty: "easy"
  },
  {
    id: 10,
    topic: "Attitude",
    question: "A learner driver is driving very slowly in front of you. What should you do?",
    options: [
      "Flash your headlights to hurry them",
      "Be patient and overtake only when it is safe",
      "Drive very close behind to encourage them to speed up",
      "Sound your horn repeatedly"
    ],
    correctIndex: 1,
    explanation: "Learner drivers may need extra time to make decisions. You should be patient and only overtake when it is safe and legal. Tailgating or using your horn aggressively can cause them to panic and make mistakes.",
    difficulty: "easy"
  },

  // ============================================================
  // 3. SAFETY AND YOUR VEHICLE (5 questions)
  // ============================================================
  {
    id: 11,
    topic: "Safety and Your Vehicle",
    question: "What is the legal minimum depth of tread for car tyres?",
    options: [
      "1.0 mm across the central three-quarters of the tyre",
      "1.6 mm across the central three-quarters of the tyre",
      "2.0 mm across the entire width of the tyre",
      "3.0 mm across the central three-quarters of the tyre"
    ],
    correctIndex: 1,
    explanation: "The legal minimum tread depth for car tyres is 1.6 mm across the central three-quarters of the breadth of the tyre and around the entire circumference. However, many safety experts recommend replacing tyres when tread reaches 3 mm for better wet-weather performance.",
    difficulty: "easy"
  },
  {
    id: 12,
    topic: "Safety and Your Vehicle",
    question: "Your vehicle has a catalytic converter. What should you avoid doing?",
    options: [
      "Driving short distances from cold starts",
      "Using unleaded petrol",
      "Driving at a steady speed on motorways",
      "Having your vehicle serviced regularly"
    ],
    correctIndex: 0,
    explanation: "Catalytic converters need to reach high temperatures to work effectively. Repeated short journeys from cold starts prevent them from heating up fully, causing them to become clogged and less effective, and increasing emissions.",
    difficulty: "medium"
  },
  {
    id: 13,
    topic: "Safety and Your Vehicle",
    question: "What will happen if you put too much oil in your engine?",
    options: [
      "The engine will run more smoothly",
      "The oil pressure warning light will come on and oil may leak",
      "The engine will use less fuel",
      "The engine will overheat immediately"
    ],
    correctIndex: 1,
    explanation: "Overfilling the engine with oil can cause excessive pressure, leading to oil leaks and potential damage to seals and gaskets. The oil may also foam, reducing its lubricating properties. Always fill to the correct level on the dipstick.",
    difficulty: "medium"
  },
  {
    id: 14,
    topic: "Safety and Your Vehicle",
    question: "Which of the following will reduce the stability of a vehicle?",
    options: [
      "Having properly inflated tyres",
      "Carrying a heavy load on the roof rack",
      "Having the fuel tank half full",
      "Driving with the windows closed"
    ],
    correctIndex: 1,
    explanation: "A heavy load on the roof rack raises the vehicle's centre of gravity, making it less stable, especially when cornering or in strong winds. It also increases wind resistance, affecting handling and fuel consumption. Heavy items should be placed inside the vehicle when possible.",
    difficulty: "easy"
  },
  {
    id: 15,
    topic: "Safety and Your Vehicle",
    question: "What is the main purpose of an anti-lock braking system (ABS)?",
    options: [
      "To allow you to brake later than normal",
      "To prevent the wheels from locking so you can steer while braking",
      "To reduce stopping distances on all road surfaces",
      "To make the brakes last longer"
    ],
    correctIndex: 1,
    explanation: "ABS prevents the wheels from locking during hard braking, allowing you to maintain steering control. It does not necessarily reduce stopping distances on all surfaces, and you should not rely on it to brake later. Maintain normal safe following distances.",
    difficulty: "easy"
  },

  // ============================================================
  // 4. SAFETY MARGINS (6 questions)
  // ============================================================
  {
    id: 16,
    topic: "Safety Margins",
    question: "What is the typical overall stopping distance at 30 mph in good dry conditions?",
    options: [
      "12 metres (39 feet)",
      "23 metres (75 feet)",
      "36 metres (118 feet)",
      "53 metres (175 feet)"
    ],
    correctIndex: 1,
    explanation: "The overall stopping distance at 30 mph in good dry conditions is 23 metres (75 feet). This comprises 9 metres of thinking distance and 14 metres of braking distance. Stopping distances increase significantly in wet or icy conditions.",
    difficulty: "medium"
  },
  {
    id: 17,
    topic: "Safety Margins",
    question: "What is the overall stopping distance at 70 mph on a dry road?",
    options: [
      "53 metres (175 feet)",
      "73 metres (240 feet)",
      "96 metres (315 feet)",
      "120 metres (394 feet)"
    ],
    correctIndex: 2,
    explanation: "At 70 mph, the overall stopping distance on a dry road is 96 metres (315 feet), consisting of 21 metres thinking distance and 75 metres braking distance. This is why the Highway Code recommends a two-second gap in dry conditions, increasing to four seconds in the wet.",
    difficulty: "medium"
  },
  {
    id: 18,
    topic: "Safety Margins",
    question: "In wet conditions, what should you do to your following distance?",
    options: [
      "Keep it the same as in dry conditions",
      "Double it",
      "Halve it to reduce spray",
      "Reduce it to avoid being overtaken"
    ],
    correctIndex: 1,
    explanation: "In wet conditions, you should double your following distance because tyres have less grip on wet roads, increasing braking distances. The Highway Code recommends at least a four-second gap from the vehicle in front in wet weather.",
    difficulty: "easy"
  },
  {
    id: 19,
    topic: "Safety Margins",
    question: "You are driving on an icy road. How can your steering and braking be affected?",
    options: [
      "Braking and steering are more effective",
      "Braking and steering are almost totally ineffective",
      "Only braking is affected, steering remains normal",
      "Only steering is affected, braking remains normal"
    ],
    correctIndex: 1,
    explanation: "On icy roads, both braking and steering are severely reduced because the tyres cannot grip the surface effectively. Stopping distances can be up to ten times greater than on dry roads. Drive extremely slowly, avoid harsh braking or steering, and use the highest gear possible.",
    difficulty: "medium"
  },
  {
    id: 20,
    topic: "Safety Margins",
    question: "In very windy conditions, you need to take extra care when overtaking which type of vehicle?",
    options: [
      "A small car",
      "A motorcycle",
      "A high-sided lorry",
      "A sports car"
    ],
    correctIndex: 2,
    explanation: "High-sided vehicles such as lorries and caravans are most affected by strong winds because they have a large surface area. They may be blown off course suddenly, so you should give them extra room and avoid overtaking if conditions are hazardous.",
    difficulty: "easy"
  },
  {
    id: 21,
    topic: "Safety Margins",
    question: "You are driving along a road that has speed humps. What should you do?",
    options: [
      "Accelerate between the humps to maintain momentum",
      "Drive slowly over them in a low gear",
      "Steer around them to avoid them",
      "Brake sharply just before each hump"
    ],
    correctIndex: 1,
    explanation: "Speed humps are designed to slow traffic. You should reduce your speed and drive over them slowly in a low gear. Accelerating between humps or swerving to avoid them is dangerous, and sharp braking can cause loss of control or a rear-end collision.",
    difficulty: "easy"
  },

  // ============================================================
  // 5. HAZARD AWARENESS (7 questions)
  // ============================================================
  {
    id: 22,
    topic: "Hazard Awareness",
    question: "You see a pedestrian carrying a white stick with a red reflective band. What does this indicate?",
    options: [
      "They are elderly",
      "They are deaf and blind",
      "They are partially sighted",
      "They have a broken leg"
    ],
    correctIndex: 1,
    explanation: "A white stick with a red reflective band indicates that the person is both deaf and blind. They may not hear your vehicle approaching, so you should give them plenty of space and be prepared for them to step into the road unexpectedly.",
    difficulty: "medium"
  },
  {
    id: 23,
    topic: "Hazard Awareness",
    question: "You are driving past a row of parked cars. What hazard should you watch for most carefully?",
    options: [
      "The cars may be stolen",
      "A car door may open or a child may run out",
      "The parked cars may start moving without warning",
      "Other drivers may flash their headlights"
    ],
    correctIndex: 1,
    explanation: "When passing parked cars, be alert for doors opening suddenly or pedestrians, especially children, stepping out from between vehicles. Reduce your speed and be prepared to stop. Leaving extra room between you and the parked cars improves safety.",
    difficulty: "easy"
  },
  {
    id: 24,
    topic: "Hazard Awareness",
    question: "You notice a bus signalling to pull out from a bus stop. What should you do?",
    options: [
      "Speed up to get past before it moves",
      "Flash your headlights to warn the bus driver",
      "Be prepared to give way if it is safe to do so",
      "Sound your horn to tell the bus to wait"
    ],
    correctIndex: 2,
    explanation: "You should give priority to buses signalling to pull out from bus stops when it is safe to do so. This is particularly important in built-up areas. Do not speed up to overtake or use aggressive signals; instead, allow the bus to rejoin traffic smoothly.",
    difficulty: "easy"
  },
  {
    id: 25,
    topic: "Hazard Awareness",
    question: "You are approaching a zebra crossing. A person is standing on the pavement near the crossing but not on it. What should you do?",
    options: [
      "Continue driving unless they step onto the crossing",
      "Stop and wave them across",
      "Slow down and be prepared to stop if they step onto the crossing",
      "Sound your horn to encourage them to cross"
    ],
    correctIndex: 2,
    explanation: "At a zebra crossing, you must give way to pedestrians who have stepped onto the crossing. If someone is waiting at the kerb, slow down and be prepared to stop. Do not wave them across, as this could be dangerous if other vehicles are approaching.",
    difficulty: "easy"
  },
  {
    id: 26,
    topic: "Hazard Awareness",
    question: "You are driving on a country road and see a horse rider ahead. What should you do?",
    options: [
      "Sound your horn to alert them of your approach",
      "Rev your engine so they know you are there",
      "Pass wide and slowly, avoiding sudden noises",
      "Flash your headlights to warn them"
    ],
    correctIndex: 2,
    explanation: "Horses can be easily startled. You should slow down, pass wide and slowly, and avoid sudden noises such as sounding your horn or revving your engine. Look out for signals from the rider, who may ask you to stop.",
    difficulty: "easy"
  },
  {
    id: 27,
    topic: "Hazard Awareness",
    question: "You see roadworks ahead with a temporary speed limit displayed. What should you do?",
    options: [
      "Obey the temporary speed limit",
      "Ignore it if no workers are visible",
      "Only obey it during daylight hours",
      "Maintain the normal speed limit for that road"
    ],
    correctIndex: 0,
    explanation: "Temporary speed limits at roadworks are legally enforceable and must be obeyed at all times, even if no workers are visible. Road surfaces may be uneven, lanes may be narrow, and hazards may be present even when the site appears empty.",
    difficulty: "easy"
  },
  {
    id: 28,
    topic: "Hazard Awareness",
    question: "You are driving behind a cyclist approaching a roundabout. What should you expect?",
    options: [
      "The cyclist will use the left lane regardless of their exit",
      "The cyclist may take up a different position than you expect",
      "The cyclist will always signal their intentions clearly",
      "The cyclist will dismount and use the pedestrian crossing"
    ],
    correctIndex: 1,
    explanation: "Cyclists may position themselves differently from motor vehicles at roundabouts, sometimes taking the centre of the lane for safety or visibility. Do not assume they will stay in the left lane. Give them plenty of room and be patient.",
    difficulty: "medium"
  },

  // ============================================================
  // 6. VULNERABLE ROAD USERS (6 questions)
  // ============================================================
  {
    id: 29,
    topic: "Vulnerable Road Users",
    question: "Why should you be particularly careful when passing a bus that has stopped at a bus stop?",
    options: [
      "Because the bus may move off suddenly",
      "Because pedestrians may cross the road from behind the bus",
      "Because the bus driver may not see you",
      "Because the bus may reverse into you"
    ],
    correctIndex: 1,
    explanation: "Pedestrians getting off a bus may cross the road immediately from behind the bus without looking properly. You should slow down and be prepared to stop, as your view of pedestrians is blocked by the bus.",
    difficulty: "easy"
  },
  {
    id: 30,
    topic: "Vulnerable Road Users",
    question: "You see a group of school children waiting to cross the road. What should you do?",
    options: [
      "Wave at them to cross",
      "Continue at the same speed but be ready to sound your horn",
      "Slow down and be prepared to stop",
      "Flash your headlights to warn them"
    ],
    correctIndex: 2,
    explanation: "Children can be unpredictable and may not judge traffic speeds well. When you see children near the road, you should slow down and be prepared to stop. Do not wave or signal them to cross, as other road users may not see them.",
    difficulty: "easy"
  },
  {
    id: 31,
    topic: "Vulnerable Road Users",
    question: "You are turning left into a side road. What danger should you watch out for from the left?",
    options: [
      "A car overtaking on your left",
      "A cyclist undertaking on your left",
      "A pedestrian on the opposite pavement",
      "A motorcyclist on the opposite side of the road"
    ],
    correctIndex: 1,
    explanation: "Cyclists and motorcyclists may be undertaking on your left as you turn left. Always check your left mirror and blind spot before turning, especially in slow-moving or stationary traffic where filtering is common.",
    difficulty: "easy"
  },
  {
    id: 32,
    topic: "Vulnerable Road Users",
    question: "An older person is crossing the road ahead of you. What should you do?",
    options: [
      "Sound your horn to hurry them",
      "Be patient and allow them to cross in their own time",
      "Rev your engine to encourage them to hurry",
      "Drive around them slowly"
    ],
    correctIndex: 1,
    explanation: "Older pedestrians may take longer to cross the road due to reduced mobility or impaired vision or hearing. You should be patient and not pressure them. Sounding your horn or revving your engine may startle them and cause them to fall.",
    difficulty: "easy"
  },
  {
    id: 33,
    topic: "Vulnerable Road Users",
    question: "You are driving at night and see a pedestrian wearing reflective clothing. Why is this helpful?",
    options: [
      "It makes them easier to see in your headlights",
      "It keeps them warm",
      "It allows them to see better in the dark",
      "It is required by law"
    ],
    correctIndex: 0,
    explanation: "Reflective clothing reflects light from vehicle headlights back to the driver, making pedestrians and cyclists much more visible at night. This is especially important on unlit roads where pedestrians may otherwise be invisible until very close.",
    difficulty: "easy"
  },
  {
    id: 34,
    topic: "Vulnerable Road Users",
    question: "You are approaching a pelican crossing. The lights have changed to flashing amber. What does this mean?",
    options: [
      "You must stop and wait for the lights to turn green",
      "You must give way to pedestrians already on the crossing",
      "You can drive straight across without stopping",
      "You should treat it as a normal traffic light"
    ],
    correctIndex: 1,
    explanation: "At a pelican crossing, a flashing amber light means you must give way to pedestrians already on the crossing, but you may proceed if the crossing is clear. Unlike a red light, you do not have to wait for a green light if no pedestrians are crossing.",
    difficulty: "easy"
  },

  // ============================================================
  // 7. OTHER TYPES OF VEHICLE (5 questions)
  // ============================================================
  {
    id: 35,
    topic: "Other Types of Vehicle",
    question: "You are following a long vehicle approaching a crossroads. It signals left but moves to the right. What should you do?",
    options: [
      "Overtake it on the left immediately",
      "Assume it has made a mistake and is turning right",
      "Stay back and give it room to complete the manoeuvre",
      "Sound your horn to warn other drivers"
    ],
    correctIndex: 2,
    explanation: "Long vehicles such as articulated lorries may need to swing out to the right to make a left turn. Do not overtake or assume they have changed direction. Stay well back and give them the space they need to complete the turn safely.",
    difficulty: "medium"
  },
  {
    id: 36,
    topic: "Other Types of Vehicle",
    question: "You are on a motorway and see a lorry ahead with a sign reading 'LONG VEHICLE'. What should you expect?",
    options: [
      "The lorry will be driving faster than normal",
      "The lorry may need extra room when turning or manoeuvring",
      "The lorry is carrying an abnormal load",
      "The lorry is about to stop on the hard shoulder"
    ],
    correctIndex: 1,
    explanation: "A 'LONG VEHICLE' sign indicates that the vehicle is longer than standard and may need extra space when turning, reversing, or changing lanes. Give these vehicles extra room and be patient when they are manoeuvring.",
    difficulty: "easy"
  },
  {
    id: 37,
    topic: "Other Types of Vehicle",
    question: "You are driving behind a tractor. The road ahead is clear and straight. What should you do?",
    options: [
      "Overtake immediately to avoid delays",
      "Follow closely so you can overtake quickly",
      "Wait until you have a clear view ahead and it is safe to overtake",
      "Flash your headlights to tell the tractor driver to pull over"
    ],
    correctIndex: 2,
    explanation: "Tractors travel slowly, but you must not overtake unless you have a clear view of the road ahead and it is safe to do so. Tractors may turn suddenly into fields or driveways, and the road may have hidden hazards.",
    difficulty: "easy"
  },
  {
    id: 38,
    topic: "Other Types of Vehicle",
    question: "You are approaching a junction and see a large goods vehicle signalling right. Why might it stay on the left?",
    options: [
      "Because the driver has forgotten to cancel the left signal",
      "Because it is giving way to traffic from the right",
      "Because large vehicles often need extra room to turn right",
      "Because it is waiting for a pedestrian to cross"
    ],
    correctIndex: 2,
    explanation: "Large goods vehicles may position themselves on the left when turning right to allow their rear wheels to clear the kerb and avoid mounting the pavement. Do not overtake on the left or assume the vehicle is going straight on.",
    difficulty: "medium"
  },
  {
    id: 39,
    topic: "Other Types of Vehicle",
    question: "Why should you be careful when overtaking a bus at a bus stop?",
    options: [
      "Because the bus may pull out suddenly",
      "Because the road surface may be slippery",
      "Because the bus may reverse",
      "Because the bus driver cannot see you"
    ],
    correctIndex: 0,
    explanation: "Buses at bus stops may pull out suddenly after dropping off or picking up passengers. Additionally, pedestrians may cross the road from behind the bus. Only overtake when you are sure it is safe and that the bus is not about to move off.",
    difficulty: "easy"
  },

  // ============================================================
  // 8. VEHICLE HANDLING (5 questions)
  // ============================================================
  {
    id: 40,
    topic: "Vehicle Handling",
    question: "You are driving on a very hot day and the road surface is soft. What effect might this have?",
    options: [
      "It will improve your braking",
      "Tyre grip may be reduced and steering may feel less responsive",
      "It will improve your fuel economy",
      "It will make the road less noisy"
    ],
    correctIndex: 1,
    explanation: "In very hot weather, road surfaces can soften, reducing tyre grip and making steering feel less precise. You should reduce your speed and drive more carefully, especially when cornering or braking.",
    difficulty: "medium"
  },
  {
    id: 41,
    topic: "Vehicle Handling",
    question: "What is 'trailer swing'?",
    options: [
      "When a trailer moves from side to side at high speed",
      "When a trailer detaches from the towing vehicle",
      "When a trailer blocks the road when reversing",
      "When a trailer causes the towing vehicle to accelerate faster"
    ],
    correctIndex: 0,
    explanation: "Trailer swing occurs when a trailer moves from side to side at speed, often caused by incorrect loading, high speed, or crosswinds. It can be very dangerous and may lead to loss of control. Reduce speed gradually and avoid sudden steering inputs.",
    difficulty: "hard"
  },
  {
    id: 42,
    topic: "Vehicle Handling",
    question: "Your vehicle pulls to one side when you brake. What is the most likely cause?",
    options: [
      "The tyres are overinflated",
      "Uneven brake wear or a brake fault on one side",
      "The steering wheel is not straight",
      "The road camber is too steep"
    ],
    correctIndex: 1,
    explanation: "If your vehicle pulls to one side when braking, it is likely due to uneven brake wear or a brake fault on one side, such as a seized caliper or contaminated brake pad. This is dangerous and should be inspected by a mechanic immediately.",
    difficulty: "medium"
  },
  {
    id: 43,
    topic: "Vehicle Handling",
    question: "What should you do when driving in foggy conditions?",
    options: [
      "Drive close to the vehicle in front so you can follow their tail lights",
      "Use dipped headlights and reduce your speed",
      "Use full beam headlights for maximum visibility",
      "Keep your windscreen fogged to reduce glare"
    ],
    correctIndex: 1,
    explanation: "In fog, you should use dipped headlights (and fog lights if visibility is seriously reduced) and reduce your speed. Full beam headlights reflect off fog and reduce visibility. Following another vehicle closely is dangerous because you have less time to react if they brake suddenly.",
    difficulty: "easy"
  },
  {
    id: 44,
    topic: "Vehicle Handling",
    question: "You are driving down a steep hill. What should you do to help control your speed?",
    options: [
      "Select a low gear and use the brakes gently",
      "Coast in neutral to save fuel",
      "Select a high gear and brake firmly",
      "Hold the clutch down and brake"
    ],
    correctIndex: 0,
    explanation: "When descending a steep hill, select a low gear to use engine braking and apply the brakes gently. This prevents brake fade from overheating. Coasting in neutral or holding the clutch down reduces control and is dangerous.",
    difficulty: "easy"
  },

  // ============================================================
  // 9. MOTORWAY RULES (5 questions)
  // ============================================================
  {
    id: 45,
    topic: "Motorway Rules",
    question: "What is the national speed limit for cars and motorcycles on a motorway?",
    options: [
      "60 mph",
      "70 mph",
      "80 mph",
      "90 mph"
    ],
    correctIndex: 1,
    explanation: "The national speed limit for cars and motorcycles on motorways in the UK is 70 mph. Some vehicles such as cars towing caravans or trailers, buses, and goods vehicles have lower limits. Always obey variable speed limits displayed on overhead gantries.",
    difficulty: "easy"
  },
  {
    id: 46,
    topic: "Motorway Rules",
    question: "You are joining a motorway from a slip road. What should you do?",
    options: [
      "Stop at the end of the slip road and wait for a gap",
      "Give way to traffic already on the motorway and adjust your speed to match",
      "Drive onto the hard shoulder and merge from there",
      "Sound your horn to warn other drivers"
    ],
    correctIndex: 1,
    explanation: "When joining a motorway from a slip road, you should give way to traffic already on the motorway. Use the slip road to accelerate and adjust your speed to match the flow of traffic, then merge when it is safe to do so. Do not stop at the end of the slip road unless absolutely necessary.",
    difficulty: "easy"
  },
  {
    id: 47,
    topic: "Motorway Rules",
    question: "You miss your exit on the motorway. What should you do?",
    options: [
      "Reverse along the hard shoulder to the exit",
      "Make a U-turn using the central reservation",
      "Continue to the next exit",
      "Stop and ask for directions"
    ],
    correctIndex: 2,
    explanation: "If you miss your exit on the motorway, you must continue to the next exit. Reversing on a motorway or making a U-turn is extremely dangerous and illegal. Plan your journey in advance to avoid missing exits.",
    difficulty: "easy"
  },
  {
    id: 48,
    topic: "Motorway Rules",
    question: "When may you drive on the hard shoulder of a motorway?",
    options: [
      "When you are overtaking slow-moving traffic",
      "When traffic is heavy and you need to bypass congestion",
      "When directed to do so by traffic signs or a police officer",
      "When you need to stop for a short rest"
    ],
    correctIndex: 2,
    explanation: "You may only drive on the hard shoulder when directed to do so by traffic signs, such as during active traffic management schemes, or by a police officer. The hard shoulder is for emergencies and breakdowns only. Stopping or driving on it without reason is illegal and dangerous.",
    difficulty: "easy"
  },
  {
    id: 49,
    topic: "Motorway Rules",
    question: "What colour are the reflective studs between the lanes on a motorway?",
    options: [
      "Red",
      "Amber",
      "Green",
      "White"
    ],
    correctIndex: 3,
    explanation: "White reflective studs are placed between the lanes on a motorway. Red studs mark the left edge, amber studs mark the central reservation, and green studs mark slip roads and junctions. These help you identify your position at night or in poor visibility.",
    difficulty: "medium"
  },

  // ============================================================
  // 10. RULES OF THE ROAD (6 questions)
  // ============================================================
  {
    id: 50,
    topic: "Rules of the Road",
    question: "What is the speed limit for cars and motorcycles in a built-up area, unless signs indicate otherwise?",
    options: [
      "20 mph",
      "30 mph",
      "40 mph",
      "50 mph"
    ],
    correctIndex: 1,
    explanation: "The default speed limit for cars and motorcycles in a built-up area in the UK is 30 mph, indicated by the presence of street lights placed not more than 200 yards apart. Always look for speed limit signs that may indicate a different limit.",
    difficulty: "easy"
  },
  {
    id: 51,
    topic: "Rules of the Road",
    question: "You are approaching an unmarked crossroads. Who has priority?",
    options: [
      "The largest vehicle",
      "The vehicle travelling fastest",
      "No one has priority; proceed with extreme caution",
      "The vehicle coming from the right"
    ],
    correctIndex: 2,
    explanation: "At an unmarked crossroads, no one has priority. You must proceed with extreme caution and be prepared to give way to other vehicles. Always approach slowly and be ready to stop if another vehicle is already crossing or approaching the junction.",
    difficulty: "medium"
  },
  {
    id: 52,
    topic: "Rules of the Road",
    question: "You are turning right at a crossroads. An oncoming vehicle is also turning right. What is the safest way to proceed?",
    options: [
      "Turn right side to right side (offside to offside)",
      "Turn left side to left side (nearside to nearside)",
      "Wait until the other vehicle has turned",
      "Accelerate to complete your turn first"
    ],
    correctIndex: 0,
    explanation: "When two vehicles are turning right at a crossroads, the safest method is to turn offside to offside (right side to right side). This keeps both vehicles on the opposite sides of the road and gives each driver a clearer view of oncoming traffic.",
    difficulty: "medium"
  },
  {
    id: 53,
    topic: "Rules of the Road",
    question: "You are in a one-way street and want to turn right. Where should you position your vehicle?",
    options: [
      "In the left-hand lane",
      "In the right-hand lane",
      "In either lane, depending on traffic",
      "In the centre of the road"
    ],
    correctIndex: 1,
    explanation: "In a one-way street, you should position your vehicle in the right-hand lane when turning right. This allows traffic going straight ahead or turning left to use the left-hand lane and helps keep traffic flow smooth and safe.",
    difficulty: "easy"
  },
  {
    id: 54,
    topic: "Rules of the Road",
    question: "What is the maximum fine for driving without insurance?",
    options: [
      "£500",
      "£1,000",
      "Unlimited",
      "£5,000"
    ],
    correctIndex: 2,
    explanation: "Driving without insurance carries an unlimited fine and 6 to 8 penalty points on your licence. In some cases, the court may disqualify you from driving. It is a serious offence because uninsured drivers put other road users at financial risk.",
    difficulty: "medium"
  },
  {
    id: 55,
    topic: "Rules of the Road",
    question: "You are approaching a roundabout. A cyclist is signalling to turn right. Where should you expect them to be positioned?",
    options: [
      "In the left-hand lane",
      "In the centre or right-hand lane",
      "On the pavement",
      "On the hard shoulder"
    ],
    correctIndex: 1,
    explanation: "Cyclists turning right at a roundabout may position themselves in the centre or right-hand lane for visibility and safety. Give them plenty of room and do not attempt to overtake them on the roundabout. Be aware that not all cyclists feel confident taking this position.",
    difficulty: "medium"
  },

  // ============================================================
  // 11. ROAD AND TRAFFIC SIGNS (8 questions)
  // ============================================================
  {
    id: 56,
    topic: "Road and Traffic Signs",
    question: "What does a circular road sign with a red border indicate?",
    options: [
      "A warning of a hazard ahead",
      "A mandatory instruction",
      "A prohibition",
      "Directions to a tourist attraction"
    ],
    correctIndex: 2,
    explanation: "Circular signs with a red border indicate prohibitions, such as no entry, no U-turn, or speed limits. Warning signs are typically triangular with a red border, mandatory signs are blue circles, and tourist information signs are brown rectangles.",
    difficulty: "easy"
  },
  {
    id: 57,
    topic: "Road and Traffic Signs",
    question: "What does a red circle with a white horizontal bar mean?",
    options: [
      "No stopping at any time",
      "No entry",
      "No waiting",
      "National speed limit applies"
    ],
    correctIndex: 0,
    explanation: "A red circle with a white horizontal bar means 'no stopping' (also known as a 'clearway'). You must not stop on the road or verge at any time, except in a traffic jam or for an emergency. This is different from no waiting, which allows brief stops to pick up or drop off passengers.",
    difficulty: "medium"
  },
  {
    id: 58,
    topic: "Road and Traffic Signs",
    question: "What does a blue circular sign with a white arrow pointing straight ahead mean?",
    options: [
      "You may go straight ahead or turn left",
      "You must go straight ahead",
      "Straight ahead is the recommended route",
      "The road ahead is one-way"
    ],
    correctIndex: 1,
    explanation: "Blue circular signs with white symbols are mandatory instruction signs. A white arrow pointing straight ahead means you must proceed straight ahead. You cannot turn left or right at that junction unless additional arrows indicate otherwise.",
    difficulty: "easy"
  },
  {
    id: 59,
    topic: "Road and Traffic Signs",
    question: "You see a triangular sign with a red border showing a deer symbol. What does it mean?",
    options: [
      "Deer crossing ahead",
      "A zoo is nearby",
      "Deer may be on the road for the next mile",
      "Hunting is allowed in this area"
    ],
    correctIndex: 2,
    explanation: "A triangular warning sign with a deer symbol indicates that wild animals are likely to be in the road ahead. The sign may include a distance plate indicating the length of road affected. Slow down and be vigilant, especially at dawn and dusk when deer are most active.",
    difficulty: "easy"
  },
  {
    id: 60,
    topic: "Road and Traffic Signs",
    question: "What does a white diagonal stripe on a circular blue sign with a red border indicate?",
    options: [
      "The national speed limit applies",
      "End of a previous restriction",
      "A mandatory minimum speed",
      "A pedestrian crossing ahead"
    ],
    correctIndex: 1,
    explanation: "A circular blue sign with a red border and a white diagonal stripe indicates the end of a previously signed restriction, such as the end of a speed limit, no overtaking zone, or clearway. The restriction no longer applies beyond this point.",
    difficulty: "medium"
  },
  {
    id: 61,
    topic: "Road and Traffic Signs",
    question: "What does a flashing amber light at a pelican crossing mean?",
    options: [
      "You must stop immediately",
      "You must give way to pedestrians on the crossing",
      "The crossing is out of order",
      "Pedestrians must wait"
    ],
    correctIndex: 1,
    explanation: "A flashing amber light at a pelican crossing means you must give way to any pedestrians still on the crossing. If the crossing is clear, you may proceed. This is different from puffin crossings, which use sensors and do not have a flashing amber phase.",
    difficulty: "medium"
  },
  {
    id: 62,
    topic: "Road and Traffic Signs",
    question: "What does a rectangular sign with a brown background indicate?",
    options: [
      "A warning about roadworks",
      "A mandatory direction",
      "Tourist information or an attraction",
      "A prohibition"
    ],
    correctIndex: 2,
    explanation: "Brown road signs are used to indicate tourist information and attractions such as historic sites, museums, nature reserves, and camping facilities. They help visitors find points of interest and are not regulatory signs.",
    difficulty: "easy"
  },
  {
    id: 63,
    topic: "Road and Traffic Signs",
    question: "What do double yellow lines at the side of the road mean?",
    options: [
      "No waiting at any time",
      "No parking during peak hours",
      "Parking is limited to 30 minutes",
      "Waiting is permitted for loading only"
    ],
    correctIndex: 0,
    explanation: "Double yellow lines indicate that waiting and parking are prohibited at all times, unless signed otherwise (e.g., loading restrictions during certain hours). Single yellow lines typically mean waiting is restricted at certain times shown on nearby signs.",
    difficulty: "easy"
  },

  // ============================================================
  // 12. DOCUMENTS (5 questions)
  // ============================================================
  {
    id: 64,
    topic: "Documents",
    question: "How long must you keep your MOT certificate?",
    options: [
      "You do not need to keep it; it is held electronically",
      "Until the next MOT is due",
      "For one year after the test date",
      "For three years"
    ],
    correctIndex: 0,
    explanation: "MOT certificates are held electronically on the DVSA database. You do not need to keep a paper certificate, though many people do for their records. You can check your MOT status and history online using your vehicle registration number.",
    difficulty: "easy"
  },
  {
    id: 65,
    topic: "Documents",
    question: "When must you renew your photocard driving licence?",
    options: [
      "Every 3 years",
      "Every 10 years",
      "Every 5 years",
      "When you change your vehicle"
    ],
    correctIndex: 1,
    explanation: "Photocard driving licences must be renewed every 10 years because the photograph needs to be updated. If you do not renew it, you could be fined up to £1,000. Drivers over 70 must renew their licence every 3 years.",
    difficulty: "easy"
  },
  {
    id: 66,
    topic: "Documents",
    question: "Your car insurance has been cancelled by your insurer. When must you declare this to a new insurer?",
    options: [
      "Only if they specifically ask",
      "You do not need to declare it if it was not your fault",
      "You must declare it when applying for new insurance",
      "Only if the cancellation happened in the last year"
    ],
    correctIndex: 2,
    explanation: "You must declare any previous insurance cancellation when applying for new insurance, regardless of whose fault it was. Failure to disclose this could result in the new policy being invalidated and claims being rejected.",
    difficulty: "medium"
  },
  {
    id: 67,
    topic: "Documents",
    question: "What is the penalty for not having an MOT certificate when required?",
    options: [
      "A £50 fixed penalty notice",
      "A fine of up to £1,000",
      "3 penalty points on your licence",
      "A warning letter from the DVLA"
    ],
    correctIndex: 1,
    explanation: "Driving a vehicle without a valid MOT certificate when one is required can result in a fine of up to £1,000. Additionally, your insurance may be invalidated. Vehicles over 3 years old must have an MOT test every 12 months.",
    difficulty: "medium"
  },
  {
    id: 68,
    topic: "Documents",
    question: "Who is responsible for ensuring a vehicle has valid vehicle excise duty (road tax)?",
    options: [
      "The vehicle manufacturer",
      "The registered keeper of the vehicle",
      "The MOT tester",
      "The vehicle insurer"
    ],
    correctIndex: 1,
    explanation: "The registered keeper of the vehicle is responsible for ensuring valid vehicle excise duty (road tax) is in place. This can be checked and purchased online via the DVLA website. Driving an untaxed vehicle can result in a fine and the vehicle being clamped or seized.",
    difficulty: "easy"
  },

  // ============================================================
  // 13. ACCIDENTS (INCIDENTS, ACCIDENTS AND EMERGENCIES) (5 questions)
  // ============================================================
  {
    id: 69,
    topic: "Accidents",
    question: "You are involved in a collision that causes damage to a parked car, but the owner is not around. What should you do?",
    options: [
      "Leave your name and address on the car or report the collision to the police within 24 hours",
      "Wait by the car for the owner to return",
      "Drive away if the damage appears minor",
      "Ask a passer-by to leave a note for the owner"
    ],
    correctIndex: 0,
    explanation: "If you damage a parked vehicle and cannot find the owner, you must leave your name and address on the vehicle or report the collision to the police within 24 hours. Failing to do so is an offence and can result in penalty points and a fine.",
    difficulty: "easy"
  },
  {
    id: 70,
    topic: "Accidents",
    question: "At the scene of an accident, someone is unconscious. What should be your FIRST priority?",
    options: [
      "Check their breathing and airway",
      "Move them to a safe place",
      "Give them water",
      "Check their pockets for identification"
    ],
    correctIndex: 0,
    explanation: "The first priority in any emergency is to check the casualty's airway and breathing. If they are not breathing, call 999 immediately and begin CPR if trained. Only move an unconscious person if they are in immediate danger, such as from oncoming traffic.",
    difficulty: "easy"
  },
  {
    id: 71,
    topic: "Accidents",
    question: "You arrive at the scene of a motorcycle accident. The rider is conscious and lying in the road. What should you do?",
    options: [
      "Remove their helmet immediately to help them breathe",
      "Keep them warm and still, and only remove the helmet if essential for breathing",
      "Move them to the pavement straight away",
      "Give them food and drink while waiting for help"
    ],
    correctIndex: 1,
    explanation: "A motorcyclist's helmet should only be removed if it is essential for breathing or if they are vomiting. Removing it incorrectly can worsen a spinal or neck injury. Keep them warm, still, and reassured until emergency services arrive.",
    difficulty: "medium"
  },
  {
    id: 72,
    topic: "Accidents",
    question: "You see an accident on the motorway. There are no emergency services present. What should you do?",
    options: [
      "Continue driving and assume someone else will call",
      "Use an emergency telephone to call for help",
      "Stop on the hard shoulder and run back to help",
      "Reverse to the scene on the hard shoulder"
    ],
    correctIndex: 1,
    explanation: "If you witness an accident on the motorway and emergency services are not present, you should use an emergency telephone to call for help. These phones connect directly to the police or Highways England. Do not stop or reverse on the motorway unless it is unavoidable.",
    difficulty: "easy"
  },
  {
    id: 73,
    topic: "Accidents",
    question: "Your vehicle breaks down on a motorway. Where should you wait for help?",
    options: [
      "In the driver's seat with your seatbelt on",
      "On the embankment well away from the traffic",
      "Behind the vehicle to warn other drivers",
      "In the front passenger seat"
    ],
    correctIndex: 1,
    explanation: "If your vehicle breaks down on the motorway, you should exit the vehicle through the left-hand door and wait on the embankment well away from the traffic. Do not wait in or near the vehicle, as passing traffic poses a serious risk.",
    difficulty: "easy"
  },

  // ============================================================
  // 14. VEHICLE LOADING (5 questions)
  // ============================================================
  {
    id: 74,
    topic: "Vehicle Loading",
    question: "How should a load be carried on your roof rack?",
    options: [
      "Distributed evenly and secured properly",
      "Placed mainly at the front to reduce drag",
      "Placed mainly at the back to improve handling",
      "Loaded as high as possible to save space"
    ],
    correctIndex: 0,
    explanation: "A roof rack load should be distributed evenly and secured properly with straps. An uneven or unsecured load can affect handling, fall off, and cause accidents. Placing heavy items at the front or back alters weight distribution and stability.",
    difficulty: "easy"
  },
  {
    id: 75,
    topic: "Vehicle Loading",
    question: "A heavy load in your vehicle's boot will affect the car's handling. How?",
    options: [
      "It will make the steering lighter and the front tyres grip better",
      "It will make the steering heavier and reduce front tyre grip",
      "It will improve acceleration",
      "It will reduce fuel consumption"
    ],
    correctIndex: 1,
    explanation: "A heavy load in the boot shifts weight to the rear of the vehicle, making the steering feel heavier and reducing front tyre grip. This can cause understeer, especially in front-wheel-drive cars. Distribute weight evenly and adjust tyre pressures if carrying a heavy load.",
    difficulty: "medium"
  },
  {
    id: 76,
    topic: "Vehicle Loading",
    question: "You are towing a trailer. What is the maximum speed limit on a dual carriageway?",
    options: [
      "50 mph",
      "60 mph",
      "70 mph",
      "80 mph"
    ],
    correctIndex: 1,
    explanation: "When towing a trailer or caravan, the maximum speed limit on a dual carriageway is 60 mph. On motorways, it is also 60 mph. These lower limits apply because towing affects braking distances, handling, and stability.",
    difficulty: "medium"
  },
  {
    id: 77,
    topic: "Vehicle Loading",
    question: "You are carrying a heavy load in your vehicle. What should you do to your tyre pressures?",
    options: [
      "Reduce them to improve comfort",
      "Increase them according to the vehicle manufacturer's recommendations",
      "Keep them the same as normal",
      "Reduce the front tyre pressures and increase the rear"
    ],
    correctIndex: 1,
    explanation: "When carrying a heavy load, you should increase your tyre pressures in accordance with the vehicle manufacturer's recommendations, usually found in the handbook or on a sticker inside the door frame. This prevents excessive tyre wear and maintains handling and safety.",
    difficulty: "medium"
  },
  {
    id: 78,
    topic: "Vehicle Loading",
    question: "What is the main danger of overloading your vehicle?",
    options: [
      "It will use less fuel",
      "It can make the vehicle difficult to control and increase braking distances",
      "It will improve road grip",
      "It will make the steering lighter"
    ],
    correctIndex: 1,
    explanation: "Overloading a vehicle makes it more difficult to control, increases braking distances, and can cause tyre blowouts or suspension damage. It is also illegal. Always check your vehicle's maximum authorised mass (MAM) and ensure you do not exceed it.",
    difficulty: "easy"
  }
];
