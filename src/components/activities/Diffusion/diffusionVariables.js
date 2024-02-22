
const radii = [ 4, 5, 6];

const colors = ['red', '#e9275e', '#017467', '#fc5f09', '#b1123f', '#670174', '#746701', '#74010e'];

const L1Variables = [
  { side: 'right', otherSide: 'left', question: 'In which direction will molecule X move with the gradient?', correctOption: `${String.fromCharCode(8592)} To the left`, scenario: 'Facilitated diffusion' },
  { side: 'left', otherSide: 'right', question: 'In which direction will molecule X move with the gradient?', correctOption: `${String.fromCharCode(8594)} To the right`, scenario: 'Facilitated diffusion' },
];

const L2Variables = [
  { side: 'right', otherSide: 'left', question: 'In which direction will molecule X move WITH the gradient?', correctOption: `${String.fromCharCode(8592)} To the left`, scenario: 'Facilitated diffusion' },
  { side: 'left', otherSide: 'right', question: 'In which direction will molecule X move WITH the gradient?', correctOption: `${String.fromCharCode(8594)} To the right`, scenario: 'Facilitated diffusion' },
  { side: 'right', otherSide: 'left', question: 'In which direction will molecule X move AGAINST the gradient?', correctOption: `${String.fromCharCode(8594)} To the right`, scenario: 'Active transport' },
  { side: 'left', otherSide: 'right', question: 'In which direction will molecule X move AGAINST the gradient?', correctOption: `${String.fromCharCode(8592)} To the left` , scenario: 'Active transport'},
];

const L3Variables = [
  { side: 'right', otherSide: 'left', question: 'In which direction will molecule X move WITHOUT energy?', correctOption: `${String.fromCharCode(8592)} To the left`,scenario: 'Facilitated diffusion' },
  { side: 'left', otherSide: 'right', question: 'In which direction will molecule X move WITHOUT energy?', correctOption: `${String.fromCharCode(8594)} To the right`, scenario: 'Facilitated diffusion'},
  { side: 'right', otherSide: 'left', question: 'In which direction will molecule X REQUIRE energy to move?', correctOption: `${String.fromCharCode(8594)} To the right`, scenario: 'Active transport' },
  { side: 'left', otherSide: 'right', question: 'In which direction will molecule X REQUIRE energy to move?', correctOption: `${String.fromCharCode(8592)} To the left`, scenario: 'Active transport' },
];

const L4Variables = [
  { side: 'right', otherSide: 'left', question: `What is required to move a HYDROPHILIC molecule ${String.fromCharCode(8592)} to the left`, moleculeType:'hydrophilic', correctOption:'Carrier protein', scenario: 'Facilitated diffusion' },
  { side: 'left', otherSide: 'right', question: `What is required to move a HYDROPHILIC molecule ${String.fromCharCode(8594)} to the right`, moleculeType:'hydrophilic', correctOption:'Carrier protein', scenario: 'Facilitated diffusion' },
  { side: 'right', otherSide: 'left', question: `What is required to move a HYDROPHOBIC molecule ${String.fromCharCode(8592)} to the left`, moleculeType:'hydrophobic', correctOption:'Neither', scenario: 'Simple diffusion' },
  { side: 'left', otherSide: 'right', question: `What is required to move a HYDROPHOBIC molecule ${String.fromCharCode(8594)} to the right`, moleculeType:'hydrophobic', correctOption:'Neither' , scenario: 'Simple diffusion' },
];

const L5Variables = [
  { side: 'right', otherSide: 'left', question: `What is required to move a HYDROPHILIC molecule ${String.fromCharCode(8592)} to the left`, moleculeType:'hydrophilic', correctOption:'Carrier protein', scenario: 'Facilitated diffusion' },
  { side: 'left', otherSide: 'right', question: `What is required to move a HYDROPHILIC molecule ${String.fromCharCode(8594)} to the right`, moleculeType:'hydrophilic', correctOption:'Carrier protein', scenario: 'Facilitated diffusion' },
  { side: 'right', otherSide: 'left', question: `What is required to move a HYDROPHOBIC molecule ${String.fromCharCode(8592)} to the left`, moleculeType:'hydrophobic', correctOption:'Neither', scenario: 'Simple diffusion'},
  { side: 'left', otherSide: 'right', question: `What is required to move a HYDROPHOBIC molecule ${String.fromCharCode(8594)} to the right`, moleculeType:'hydrophobic', correctOption:'Neither', scenario: 'Simple diffusion'},
  { side: 'left', otherSide: 'rght', question: `What is required to move a HYDROPHILIC molecule ${String.fromCharCode(8592)} to the left`, moleculeType:'hydrophilic', correctOption:'Carrier protein & energy', scenario: 'Active transport' },
  { side: 'right', otherSide: 'left', question: `What is required to move a HYDROPHILIC molecule ${String.fromCharCode(8594)} to the right`, moleculeType:'hydrophilic', correctOption:'Carrier protein & energy', scenario: 'Active transport' },
  { side: 'left', otherSide: 'right', question: `What is required to move a HYDROPHOBIC molecule ${String.fromCharCode(8592)} to the left`, moleculeType:'hydrophobic', correctOption:'Carrier protein & energy', scenario: 'Active transport' },
  { side: 'right', otherSide: 'left', question: `What is required to move a HYDROPHOBIC molecule ${String.fromCharCode(8594)} to the right`, moleculeType:'hydrophobic', correctOption:'Carrier protein & energy', scenario: 'Active transport' },
];

const L6Variables = [
  { side: 'right', otherSide: 'left', question: `By which process would a HYDROPHILIC molecule ${String.fromCharCode(8592)} move to the left`, moleculeType:'hydrophilic', correctOption:'Facilitated diffusion', scenario: 'Facilitated diffusion' },
  { side: 'left', otherSide: 'right', question: `By which process would a HYDROPHILIC molecule ${String.fromCharCode(8594)} move to the right`, moleculeType:'hydrophilic', correctOption:'Facilitated diffusion', scenario: 'Facilitated diffusion' },
  { side: 'right', otherSide: 'left', question: `By which process would a HYDROPHOBIC molecule ${String.fromCharCode(8592)} move to the left`, moleculeType:'hydrophobic', correctOption:'Simple diffusion', scenario: 'Simple diffusion'},
  { side: 'left', otherSide: 'right', question: `By which process would a HYDROPHOBIC molecule ${String.fromCharCode(8594)} move to the right`, moleculeType:'hydrophobic', correctOption:'Simple diffusion', scenario: 'Simple diffusion'},
  { side: 'left', otherSide: 'right', question: `By which process would a HYDROPHILIC molecule ${String.fromCharCode(8592)} move to the left`, moleculeType:'hydrophilic', correctOption:'Active transport', scenario: 'Active transport' },
  { side: 'right', otherSide: 'left', question: `By which process would a HYDROPHILIC molecule ${String.fromCharCode(8594)} move to the right`, moleculeType:'hydrophilic', correctOption:'Active transport', scenario: 'Active transport' },
  { side: 'left', otherSide: 'right', question: `By which process would a HYDROPHOBIC molecule ${String.fromCharCode(8592)} move to the left`, moleculeType:'hydrophobic', correctOption:'Active transport', scenario: 'Active transport' },
  { side: 'right', otherSide: 'left', question: `By which process would a HYDROPHOBIC molecule ${String.fromCharCode(8594)} move to the right`, moleculeType:'hydrophobic', correctOption:'Active transport', scenario: 'Active transport' },
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
      return
  }
}

export { radii, colors, getRandomScenario };
