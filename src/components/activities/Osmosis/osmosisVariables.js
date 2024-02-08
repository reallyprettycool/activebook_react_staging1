
const radii = [ 4.5, 5, 6];

const colors = ['red', '#e9275e', '#017467', '#fc5f09', '#b1123f', '#670174', '#746701', '#74010e'];

const L1Variables = [
  { insideMolecules: 3, outsideMolecules: 40, question: 'Which solution has MORE solutes?', correctOption: 'Outside the cell' },
  { insideMolecules: 18, outsideMolecules: 8, question: 'Which solution has MORE solutes?', correctOption: "Inside the cell"},
  { insideMolecules: 3, outsideMolecules: 40, question: 'Which solution has FEWER solutes?', correctOption: "Inside the cell"},
  { insideMolecules: 18, outsideMolecules: 8, question: 'Which solution has FEWER solutes?', correctOption: 'Outside the cell' },
];

const L2Variables = [
  { insideMolecules: 3, outsideMolecules: 40, question: 'Which solution is HYPERTONIC?', correctOption: 'Outside the cell' },
  { insideMolecules: 18, outsideMolecules: 8, question: 'Which solution is HYPERTONIC?', correctOption: "Inside the cell" },
  { insideMolecules: 3, outsideMolecules: 40, question: 'Which solution is HYPOTONIC', correctOption: "Inside the cell" },
  { insideMolecules: 18, outsideMolecules: 8, question: 'Which solution is HYPOTONIC?', correctOption: 'Outside the cell' },
];

const L3Variables = [
  { insideMolecules: 3, outsideMolecules: 40, question: 'In which direction will water move more?', correctOption: 'Out of the cell' },
  { insideMolecules: 18, outsideMolecules: 8, question: 'In which direction will water move more?', correctOption: "Into the cell"},
];

const L4Variables = [
  { insideMolecules: 3, outsideMolecules: 40, question: 'What would make water move INTO the cell?', correctOption:'Add more solutes inside the cell'},
  { insideMolecules: 18, outsideMolecules: 8, question: 'What would make water move OUT OF the cell?', correctOption:'Add more solutes outside the cell'},
  // { insideMolecules: 3, outsideMolecules: 40, question: 'What would make water move OUT OF the cell?', correctOption:'Leave it as is'},
  // { insideMolecules: 18, outsideMolecules: 8, question: 'What would make water move INTO the cell?', correctOption:'Leave it as is'},
];

const L5Variables = [
  { insideMolecules: 3, outsideMolecules: 40, question: 'What would prevent water from moving OUT OF the cell?', correctOption:'Add more solutes inside the cell'},
  { insideMolecules: 18, outsideMolecules: 8, question: 'What would prevent water from moving INTO the cell?', correctOption:'Allow solutes to exit the cell'},
];

const L6Variables = [
  { insideMolecules: 3, outsideMolecules: 40, question: 'What would prevent water from moving OUT OF the cell?', correctOption:'Add more solutes inside the cell'},
  { insideMolecules: 18, outsideMolecules: 8, question: 'What would prevent water from moving INTO the cell?', correctOption:'Give the cell a cell wall'},
];



const getRandomScenario = (level) => {
  let newState = {};
  switch(level) {
    case 1:
      newState= L1Variables[Math.floor(Math.random() * L1Variables.length)];
      newState.radius= radii[Math.floor(Math.random() * radii.length)];
      newState.moleculeColor= colors[Math.floor(Math.random() * colors.length)];
      return newState
    case 2:
      newState= L2Variables[Math.floor(Math.random() * L2Variables.length)];
      newState.radius= radii[Math.floor(Math.random() * radii.length)];
      newState.moleculeColor= colors[Math.floor(Math.random() * colors.length)];
      return newState
    case 3:
      newState= L3Variables[Math.floor(Math.random() * L3Variables.length)];
      newState.radius= radii[Math.floor(Math.random() * radii.length)];
      newState.moleculeColor= colors[Math.floor(Math.random() * colors.length)];
      return newState
    case 4:
      newState= L4Variables[Math.floor(Math.random() * L4Variables.length)];
      newState.radius= radii[Math.floor(Math.random() * radii.length)];
      newState.moleculeColor= colors[Math.floor(Math.random() * colors.length)];
      return newState
    case 5:
      newState= L5Variables[Math.floor(Math.random() * L5Variables.length)];
      newState.radius= radii[Math.floor(Math.random() * radii.length)];
      newState.moleculeColor= colors[Math.floor(Math.random() * colors.length)];
      return newState
    case 6:
      newState= L6Variables[Math.floor(Math.random() * L6Variables.length)];
      newState.radius= radii[Math.floor(Math.random() * radii.length)];
      newState.moleculeColor= colors[Math.floor(Math.random() * colors.length)];
      return newState
      default: 
        return;
  }
}

export { radii, colors, getRandomScenario };
