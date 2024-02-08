import shuffle from '../shuffle'

const dominantAlleles = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K','M', 'N', 'P', 'Q', 'R', 'T','W', 'Y', 'Z' ]

const cellLocations = [
  {x:200, y:450},
  {x:350, y:450},
  {x:500, y:450},
  {x:650, y:450},
];

const cellLocations2 = [
  {x:150, y:290},
  {x:300, y:290},
  {x:550, y:290},
  {x:700, y:290},
];

const cellLocations3 = [
  {x:100, y:250},
  {x:100, y:400},
  {x:280, y:250},
  {x:280, y:400},
];

const targetsL1 = [
  {
    x: 50,
    y: 200,
    width: 350,
    height: 160,
    name: 'parental',
    type: 'target',
    color:"#afe1fd",
  },
  {
    x: 450,
    y: 200,
    width: 350,
    height: 160,
    name: 'recombinant',
    type: 'target',
    color:"#afe1fd",
  },
];

const labels1 = [
  {
    x: targetsL1[0].x+ 5,// 55,
    y: targetsL1[0].y+ 20, //250,
    name: 'parental',
    text: 'Parental gametes',
    type: 'boldText',
  },
  {
    x: targetsL1[1].x+ 5, //455,
    y: targetsL1[1].y+ 20, //250,
    name: 'recombinant',
    text: 'Recombinant gametes',
    type: 'boldText',
  },
  {
    x: 355,
    y: 15,
    name: 'recombinant',
    text: 'Parental cell',
    type: 'boldText',
  },
  {
    x: 15,
    y: 400,
    text: 'Drag these:',
    type: 'boldText',
  },
  {
    x: 425,
    y: 100,
    r: 70,
    name: 'parental cell',
    type: 'cell',
  },
  {
    type: 'arrow',
    fromx: 365, 
    fromy: 150, 
    tox: 320, 
    toy: 190,
  },
  {
    type: 'arrow',
    fromx: 490, 
    fromy: 150, 
    tox: 535, 
    toy: 190,
  },
]

const generateLevel1 = (level, n) => {
  const newLocations = shuffle(cellLocations);
  const letter1 = dominantAlleles[Math.floor(Math.random() * 9)];
  const letter2 = dominantAlleles[9+ Math.floor(Math.random() * 10)];
  const radius = 60;
  const rand = Math.random();
  let mother= [letter1, letter2];
  let father= [letter1.toLowerCase(), letter2.toLowerCase()];
  if (n%2 === 0) {
    if (rand < 0.5) {
      mother=[letter1.toLowerCase(), letter2.toLowerCase()];
      father=[letter1, letter2];
    } 
  } else {
    if (rand < 0.5) {
      mother=[letter1.toLowerCase(), letter2];
      father=[letter1, letter2.toLowerCase()];
    } else {
      mother=[letter1, letter2.toLowerCase()];
      father=[letter1.toLowerCase(), letter2];
    }
  }
  const parentalChromosomes = [
    {
      type: 'chromosome',
      origin: level === 1 ? 'maternal' : 'none',
      x:labels1[4].x-15,
      y:labels1[4].y,
      label1: `${mother[0]}`,
      label2: `${mother[1]}`,
    },
    {
      type: 'chromosome',
      origin:  level === 1 ? 'paternal' : 'none',
      x:labels1[4].x+30,
      y:labels1[4].y,
      label1: `${father[0]}`,
      label2: `${father[1]}`,
    }
  ]
  const draggables = [
    {
      type: 'cell with chromosomes',
      x: newLocations[0].x,
      y: newLocations[0].y,
      initialX: newLocations[0].x,
      initialY: newLocations[0].y,
      finalX: cellLocations2[0].x,
      finalY: cellLocations2[0].y,
      r:radius,
      origin: level === 1 ? 'maternal' : 'none',
      id: 'maternal',
      name: 'parental',
      label1: `${mother[0]}`,
      label2: `${mother[1]}`,
      isDragging: false,
    }, {
      type: 'cell with chromosomes',
      x: newLocations[1].x,
      y: newLocations[1].y,
      initialX: newLocations[1].x,
      initialY: newLocations[1].y,
      finalX: cellLocations2[1].x,
      finalY: cellLocations2[1].y,
      r:radius,
      origin: level === 1 ? 'paternal' : 'none',
      id: 'paternal',
      name: 'parental',
      label1: `${father[0]}`,
      label2: `${father[1]}`,
      isDragging: false,
    }, {
      type: 'cell with chromosomes',
      x: newLocations[2].x,
      y: newLocations[2].y,
      initialX: newLocations[2].x,
      initialY: newLocations[2].y,
      finalX: cellLocations2[2].x,
      finalY: cellLocations2[2].y,
      r:radius,
      origin: level === 1 ? 'maternal recombinant' : 'none',
      id: 'maternal recombinant',
      name: 'recombinant',
      label1: `${father[0]}`,
      label2: `${mother[1]}`,
      isDragging: false,
    }, {
      type: 'cell with chromosomes',
      x: newLocations[3].x,
      y: newLocations[3].y,
      initialX: newLocations[3].x,
      initialY: newLocations[3].y,
      finalX: cellLocations2[3].x,
      finalY: cellLocations2[3].y,
      r:radius,
      origin: level === 1 ? 'paternal recombinant': 'none',
      id: 'paternal recombinant',
      name: 'recombinant',
      label1: `${mother[0]}`,
      label2: `${father[1]}`,
      isDragging: false,
    }
  ]
  return {draggables, parentalChromosomes}
}

const generateLevel3 = (n) => {
  const letter1 = dominantAlleles[Math.floor(Math.random() * 9)];
  const letter2 = dominantAlleles[9+ Math.floor(Math.random() * 10)];
  let goal
  if (n>1 && n%3 === 0) {
    goal = 50 + Math.ceil(Math.random()*49);
  } else if (n%2 === 0) {
    goal = 50
  } else {
    goal = Math.ceil(Math.random()*49);
  }
  let letterMark = 420 + 420*Math.random();
  if (letterMark > 640 && letterMark < 660)  { letterMark = 870}
  const radius = 60;
  const rand = Math.random();
  let mother= [letter1, letter2];
  let father= [letter1.toLowerCase(), letter2.toLowerCase()];
  if (n%2 === 0) {
    if (rand < 0.5) {
      mother=[letter1.toLowerCase(), letter2.toLowerCase()];
      father=[letter1, letter2];
    } 
  } else {
    if (rand < 0.5) {
      mother=[letter1.toLowerCase(), letter2];
      father=[letter1, letter2.toLowerCase()];
    } else {
      mother=[letter1, letter2.toLowerCase()];
      father=[letter1.toLowerCase(), letter2];
    }
  }
  const fixtures = [
    {
      x: 30,// 55,
      y: 80, //250,
      text: 'Parental',
      type: 'boldText',
    },
    {
      x: 30,// 55,
      y: 100, //250,
      text: 'gametes',
      type: 'boldText',
    },
    {
      x: 210, //455,
      y: 80, //250,
      text: 'Recombinant',
      type: 'boldText',
    },
    {
      x: 210, //455,
      y: 100, //250,
      text: 'gametes',
      type: 'boldText',
    },
    {
      x: 25,
      y: 120,
      width: 150,
      height: 370,
      name: 'parental',
      type: 'target',
      color:"#afe1fd",
    },
    {
      x: 205,
      y: 120,
      width: 150,
      height: 370,
      name: 'recombinant',
      type: 'target',
      color:"#cc99ff",
    },
  {
    type: 'bigChromosome',
    origin: 'maternal',
    mark:letterMark,
    x:650,
    y:300,
  },
  {
    type: 'bigChromosome',
    origin: 'paternal',
    mark:letterMark,
    x:650,
    y:400,
  },
  {
    type: 'cell with labels',
    x: cellLocations3[0].x,
    y: cellLocations3[0].y,
    r:radius,
    labels: [{
      text:`${mother[0]}`,
      origin:'maternal',
      },{
        text:`${mother[1]}`,
        origin:'maternal',
      },
    ]
  }, {
    type: 'cell with labels',
    x: cellLocations3[1].x,
    y: cellLocations3[1].y,
    r:radius,
    labels: [{
      text:`${father[0]}`,
      origin:'paternal',
      },{
        text:`${father[1]}`,
        origin:'paternal',
      },
    ]
  }, {
    type: 'cell with labels',
    x: cellLocations3[2].x,
    y: cellLocations3[2].y,
    r:radius,
    labels: [{
      text:`${father[0]}`,
      origin:'paternal',
      },{
        text:`${mother[1]}`,
        origin:'maternal',
      },
    ]
  }, {
    type: 'cell with labels',
    x: cellLocations3[3].x,
    y: cellLocations3[3].y,
    r:radius,
    labels: [{
      text:`${mother[0]}`,
      origin:'maternal',
      },{
        text:`${father[1]}`,
        origin:'paternal',
      },
    ]
  },


 
]

  const draggables = [
  {
    mark:letterMark,
    type:'mark',
    x: 639,
    y:100,
    initialX: 639,
    initialY: 100,
    width: 60,
    height:400,
    maternal: mother,
    paternal: father,
    isDragging: false,
  }
  ]; 

  return{fixtures, draggables, letterMark, letter1, letter2, goal}
}

const getRandomScenario = (level, trial) => {
  let newState = {};
  newState.feedback= false;
  if (level <= 2) {
    const itemsL1 = generateLevel1(level,trial)
    newState.draggables = itemsL1.draggables;
    newState.targets = targetsL1;
    newState.fixtures = targetsL1.concat(labels1).concat(itemsL1.parentalChromosomes);
    newState.question= 'Drag each gamete to match its type';
    newState.incorrectMessage= 'Gametes with the same alleles on the chromosome as the orginal parental chromosome are called "parental". Gametes combining alleles from each parental chromosome are called "recombinant"';
    return newState
  } else {
    const itemsL3 = generateLevel3(trial);
    newState.maxCount = 6;
    newState.fixtures= itemsL3.fixtures;
    newState.question= `Genes ${itemsL3.letter1} and ${itemsL3.letter2} have a recombination frequency of ${itemsL3.goal}%. Drag gene ${itemsL3.letter2} ${String.fromCharCode(8596)} to find its possible location`;
    newState.draggables = itemsL3.draggables;
    newState.goal= itemsL3.goal;
    newState.mark = itemsL3.letterMark;
    newState.incorrectMessage= 'The proportion of recombinant gametes produced is equal to the recombination frequency';
    return newState
  } 
};


export { getRandomScenario};
