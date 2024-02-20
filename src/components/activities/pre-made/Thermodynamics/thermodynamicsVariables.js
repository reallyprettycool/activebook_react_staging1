const L1Variables = [
  { question: 'that the products have more energy than the reactants', correctOption: 'Product'},
  { question: 'that the reactants have more energy than the products', correctOption: 'Reactant'},
  { question: 'a reaction that requires energy input', correctOption: 'Product'},
  { question: 'a reaction that releases energy', correctOption: 'Reactant'},
];

const L2Variables = [
  { question: 'an endergonic reaction', correctOption: 'Product'},
  { question: 'an exergonic reaction', correctOption: 'Reactant'},
  { question: 'a reaction that will NOT occur spontaneously', correctOption: 'Product'},
  { question: 'a reaction can occur spontaneously', correctOption: 'Reactant'},
];

const L3Variables = [
  { question: 'a reaction that decreases entropy', correctOption: 'Product'},
  { question: 'a reaction that increases entropy', correctOption: 'Reactant'},
  { question: 'a reaction with a negative change in free energy', correctOption: 'Reactant'},
  { question: 'a reaction with a positive change in free energy', correctOption: 'Product'},
];

const L4Variables = [
  { question: `the synthesis of ATP from ADP and P${String.fromCharCode(7522)}`, correctOption: 'Product'},
  { question: `the hydrolysis of ATP into ADP and P${String.fromCharCode(7522)}`, correctOption: 'Reactant'},
  { question: `the breakdown of glucose into CO${String.fromCharCode(8322)} and water`, correctOption: 'Reactant'},
  { question: `the synthesis of glucose from CO${String.fromCharCode(8322)} and water during photosynthesis`, correctOption: 'Product'},
];

const optionChoices = [
  [
    {
      x: 160,
      y: 40,
      width: 87,
      height: 30,
      fill: "#6600ff",
      text: 'Reactant',
      name: 'Reactant',
      isDragging: false
    },
    {
      x: 260,
      y: 40,
      width: 77,
      height: 30,
      fill: "#ff0033",
      text: 'Product',
      name: 'Product',
      isDragging: false
    } 
  ],
  
]

const getRandomScenario = (level) => {
  let newState = {};
  switch(level) {
    case 1:
      newState= L1Variables[Math.floor(Math.random() * L1Variables.length)];
      return newState
    case 2:
      newState= L2Variables[Math.floor(Math.random() * L2Variables.length)];
      return newState
    case 3:
      newState= L3Variables[Math.floor(Math.random() * L3Variables.length)];
      return newState
    case 4:
      newState= L4Variables[Math.floor(Math.random() * L4Variables.length)];
      return newState
    default:
      return newState
  }
}

export {optionChoices, getRandomScenario };
