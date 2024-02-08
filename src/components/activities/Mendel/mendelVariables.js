import shuffle from '../shuffle'


const dominantAlleles = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K','M', 'N', 'P', 'Q', 'R', 'T','W', 'Y', 'Z' ]
// const positions = [{x: 100, y: 120},{x: 100, y: 180},{x: 100, y: 240},{x: 100, y: 300}, {x: 100, y: 360}, ]
const L3cellPositions = [60, 170, 280, 390]

const labels = [
  {
    text: 'Drag these genotypes to the corresponding',
    type: 'boldText',
    x: 550,
    y: 30,
  },
  {
    text: `${String.fromCharCode(8592)} phenotype on the left:`,
    type: 'boldText',
    x: 550,
    y: 50,
  },
  {
    text: 'Match these phenotypes:',
    type: 'boldText',
    x: 100,
    y: 30,
  },
  {
    x: 55,
    y: 70,
    name: 'dominant',
    text: 'Dominant',
    type: 'boldText',
  },
  {
    x: 55,
    y: 200,
    name: 'recessive',
    text: 'Recessive',
    type: 'boldText',
  },
  {
    x: 55,
    y: 330,
    name: 'cannot determine',
    text: 'Cannot determine',
    type: 'boldText',
  },
  {
    text: `${String.fromCharCode(8592)} cell on the left:`,
    type: 'boldText',
    x: 550,
    y: 50,
  },
  {
    text: 'Parent 1',
    type: 'boldText',
    x: 50,
    y: 30,
  },
  {
    text: 'Parent 2',
    type: 'boldText',
    x: 330,
    y: 30,
  },
  {
    text: 'Possible',
    type: 'text',
    x: 185,
    y: 200,
  },
  {
    text: 'Possible gametes',
    type: 'text',
    x: 320,
    y: 155,
  },
  {
    text: 'gametes',
    type: 'text',
    x: 185,
    y: 220,
  },
];

const targetsL1 = [
  {
    x: 50,
    y: 50,
    width: 400,
    height: 100,
    name: 'dominant',
    type: 'target',
    color:"#afe1fd",
  },
  {
    x: 50,
    y: 180,
    width: 400,
    height: 100,
    name: 'recessive',
    type: 'target',
    color:"#afe1fd",
  },
  {
    x: 50,
    y: 310,
    width: 400,
    height: 100,
    name: 'Cannot determine',
    type: 'target',
    color:"#afe1fd",
  }
 
]

const generateRandomGenotypes = (n) => {
  let draggables = [];
  let x = 700;
  let y = 110;
  for (let i =0; i < n; i++) {
    let letter = dominantAlleles[Math.floor(Math.random() * dominantAlleles.length)];
    let newDragItem = {
      type: 'text',
      x: x,
      y: y,
      initialX: x,
      initialY: y,
      width: 60,
      height: 20,
      isDragging: false,
    }
    y += 60; // increase y for next iteration
    if (i=== 4) {x = 800; y= 110; }
    const rand1 = Math.round(Math.random());
    const rand2 = Math.round(Math.random());
    if (rand1 === 0 && rand2 === 0) {
      newDragItem.text= `${letter.toLowerCase()}${letter.toLowerCase()}`;
      newDragItem.id = `${letter.toLowerCase()}${letter.toLowerCase()}`;
      newDragItem.name = 'recessive';
    } else if (rand1 === 1 && rand2 === 1) {
      newDragItem.text= `${letter.toUpperCase()}${letter.toUpperCase()}`;
      newDragItem.id = `${letter.toUpperCase()}${letter.toUpperCase()}`;
      newDragItem.name = 'dominant';
    } else if (rand1 === 0 && rand2 === 1) {
      newDragItem.text= `${letter.toUpperCase()}${letter.toLowerCase()}`;
      newDragItem.id = `${letter.toUpperCase()}${letter.toLowerCase()}`;
      newDragItem.name = 'dominant';
    } else if (rand1 === 1 && rand2 === 0) {
      if (i%2 === 0) {
        newDragItem.text= `${letter.toUpperCase()}`;
        newDragItem.id= `${letter.toUpperCase()}`;
        newDragItem.name = 'dominant';
    
      } else {
        newDragItem.text= `${letter.toLowerCase()}`;
        newDragItem.id = `${letter.toLowerCase()}`;
        newDragItem.name = 'recessive';
      }
    }
    draggables.push(newDragItem)
  }
  // console.log(draggables)
  return draggables
};

const generateMatchingFixtures = (array) => {
  let newFixtures = [];
  for (let item of array) {
    let newFixt = {
      type: 'text',
      name: item.text,
      text: item.text,
      id: item.text,
    }
    if (item.name === 'recessive') {
      newFixt.x = item.y-55;
      newFixt.y = (item.x-600)*0.5+175;
    } else if (item.name === 'dominant'){
      newFixt.x = item.y-55;
      newFixt.y = (item.x-600)*0.5+45;
    }
    newFixtures.push(newFixt)
  }
  return newFixtures
}

const cellsL2 = [
  {
    type: 'cell',
    x: 180, 
    y: 75, 
    r: 70, 
  },
  {
    type: 'cell',
    x: 180, 
    y: 225, 
    r: 70, 
  },
  {
    type: 'cell',
    x: 180, 
    y: 375, 
    r: 70, 
  },
  {
    type: 'cell',
    x: 330, 
    y: 145, 
    r: 70, 
  },
  {
    type: 'cell',
    x: 330, 
    y: 305, 
    r: 70, 
  },
]

const generateDraggablesL2 = () => {
  let initialArray = generateRandomGenotypes(5);
  initialArray = initialArray.map(item => {
    item.name = item.text;
    return item
  })
  return initialArray
}

const generateTargets = (array=[]) => { // array of draggablesL2 and shuffles them
  const newArray = shuffle(array);
  const targetArray = [];
  for (let i = 0; i < newArray.length; i++) {
   const newTarget = {
      x: cellsL2[i].x - cellsL2[i].r,
      y: cellsL2[i].y - cellsL2[i].r,
      width: cellsL2[i].r * 2,
      height: cellsL2[i].r * 2,
      name: newArray[i].name,
      type: 'target',
      color:"#afe1fd",
    };
    targetArray.push(newTarget);
  }
  return targetArray
}

const generateChromosomesL2 = (array) => { // array of targets L2
  const fixtures = [];
  for (let i = 0; i < array.length; i++) {
    let newFixt = {};
    let newLabel = {};
    if (array[i].name.length > 1) {
      newFixt = {
        type: 'chromosome', 
        x: cellsL2[i].x -15,
        y: cellsL2[i].y -5, 
        size: 'large', 
        arms: ['top left', 'bottom left'],
        origin: 'maternal',
      };
      const newFixtA = {
        type: 'chromosome', 
        x: cellsL2[i].x + 30,
        y: cellsL2[i].y + 5,
        size: 'large', 
        arms: ['top left', 'bottom left'],
        origin: 'paternal',
      }
      newLabel = {
        x: cellsL2[i].x -25,
        y: cellsL2[i].y -25,
        width: 10,
        height: 10,
        text: array[i].name[0],
        type: 'label',
      }
      const newLabelA = {
        x: cellsL2[i].x + 21,
        y: cellsL2[i].y -15,
        width: 10,
        height: 10,
        text: array[i].name[1],
        type: 'label',
      }
      fixtures.push(newFixtA)
      fixtures.push(newLabelA)
    } else {
      newFixt = {
        type: 'chromosome', 
        x: cellsL2[i].x + 5,
        y: cellsL2[i].y, 
        size: 'large', 
        arms: ['top left', 'bottom left'],
        origin: 'none',
      };
      newLabel = {
        x: cellsL2[i].x - 5,
        y: cellsL2[i].y -20,
        width: 10,
        height: 10,
        text: array[i].name[0],
        type: 'label',
      }
    }
    fixtures.push(newFixt)
    fixtures.push(newLabel)
  }
  return fixtures
}

const generateMatchingFixturesL2 = (array) => { // array of targets L2
  const fixtures = array.map((item, index)=> {
    let newFixt = {
      type: 'text',
      x: item.x + 13,
      y: item.y + 68,
      text: item.name,
      name: item.name,
    };
    return newFixt;
  })
  return fixtures
}

const cellsL3 = [
  {
    type: 'cell',
    x: 330,//150, 
    y: 60,//100, 
    r: 50, 
  },
  {
    type: 'cell',
    x: 610,//430, 
    y: 60,//100, 
    r: 50, 
  },
  {
    type: 'cell', // maternal gamete 1
    x: 190,//430, 
    y: 215,//100, 
    r: 50, 
  },
  {
    type: 'cell', // maternal gamete 2
    x: 330,//430, 
    y: 215,//100, 
    r: 50, 
  },
  {
    type: 'cell', // paternal gamete 1
    x: 470,//430, 
    y: 215,//100, 
    r: 50, 
  },
  {
    type: 'cell', // paternal gamete 2
    x: 610,//430, 
    y: 215,//100, 
    r: 50, 
  },
  {
    type: 'cell', // offspring 1
    x: 190,//430, 
    y: 370,//100, 
    r: 50, 
  },
  {
    type: 'cell', // offspring 2
    x: 330,//430, 
    y: 370,//100, 
    r: 50, 
  },
  {
    type: 'cell', // offspring 3
    x: 470,//430, 
    y: 370,//100, 
    r: 50, 
  },
  {
    type: 'cell', // offspring 4
    x: 610,//430, 
    y: 370,//100, 
    r: 50, 
  },
];

const generateLevel3 = (parent1, parent2) => {
  // const labels = [];
  // const chromosomeLabels=[];
  let draggables=[];
  const order = shuffle(L3cellPositions);
  const letter = dominantAlleles[Math.floor(Math.random() * dominantAlleles.length)];
  let parent1Genotype = '';
  let parent2Genotype = '';
  let parent1Phenotype = '';
  let parent2Phenotype = '';
  let expectedRatios = '';
  switch(parent1) {
    case 'homozygous dominant':
      parent1Genotype = `${letter.toUpperCase()}${letter.toUpperCase()}`;
      parent1Phenotype = 'Dominant'
      break;
    case 'homozygous recessive':
      parent1Genotype = `${letter.toLowerCase()}${letter.toLowerCase()}`;
      parent1Phenotype = 'Recessive'
      break;
    case 'heterozygous':
      parent1Genotype = `${letter.toUpperCase()}${letter.toLowerCase()}`;
      parent1Phenotype = 'Dominant'
      break;
    default: 
    break;
  }
  switch(parent2) {
    case 'homozygous dominant':
      parent2Genotype = `${letter.toUpperCase()}${letter.toUpperCase()}`;
      parent2Phenotype = 'Dominant';
      if (parent1 === 'homozygous dominant') {expectedRatios = `100% ${letter.toUpperCase()}${letter.toUpperCase()}`;}
      else if (parent1 === 'homozygous recessive') {expectedRatios = `100% ${letter.toUpperCase()}${letter.toLowerCase()}`;}
      else if (parent1 === 'heterozygous') {expectedRatios = `50% ${letter.toUpperCase()}${letter.toLowerCase()}, 50% ${letter.toLowerCase()}${letter.toLowerCase()}`;}
      break;
    case 'homozygous recessive':
      parent2Genotype = `${letter.toLowerCase()}${letter.toLowerCase()}`;
      parent2Phenotype = 'Recessive';
      if (parent1 === 'homozygous dominant') {expectedRatios = `100% ${letter.toUpperCase()}${letter.toLowerCase()}`;}
      else if (parent1 === 'homozygous recessive') {expectedRatios = `100% ${letter.toLowerCase()}${letter.toLowerCase()}`;}
      else if (parent1 === 'heterozygous') {expectedRatios = `50% ${letter.toUpperCase()}${letter.toLowerCase()}, 50% ${letter.toLowerCase()}${letter.toLowerCase()}`;}
      break;
    case 'heterozygous':
      parent2Genotype = `${letter.toUpperCase()}${letter.toLowerCase()}`;
      parent2Phenotype = 'Dominant';
      if (parent1 === 'homozygous dominant') {expectedRatios = `50% ${letter.toUpperCase()}${letter.toUpperCase()}, 50% ${letter.toUpperCase()}${letter.toLowerCase()}`;}
      else if (parent1 === 'homozygous recessive') {expectedRatios = `50% ${letter.toUpperCase()}${letter.toLowerCase()}, 50% ${letter.toLowerCase()}${letter.toLowerCase()}`;}
      else if (parent1 === 'heterozygous') {expectedRatios = `25% ${letter.toUpperCase()}${letter.toUpperCase()}, 50% ${letter.toUpperCase()}${letter.toLowerCase()}, 25% ${letter.toLowerCase()}${letter.toLowerCase()}`;}
      break;
    default: 
    break;
  }
  const fixtures = {
    stage1: [
      {
        x: 680,
        y: 5,
        width: 360,
        height: 440,
        // x: 900,
        // y: 5,
        // width: 100,
        // height: 440,
        type: 'target',
      },
      {
        text: 'Drag options',
        type: 'boldText',
        x: 700,
        y: 70,
      },
      {
        text: 'from here:',
        type: 'boldText',
        x: 700,
        y: 100,
      },
      // {
      //   text: 'to the left:',
      //   type: 'boldText',
      //   x: 700,
      //   y: 130,
      // },
      {
        text: 'F0',
        type: 'boldText',
        x: 50,
        y: 70,
      },
      {
        text: 'Parent 1',
        type: 'boldText',
        x: 150,
        y: 30,
      },
      {
        text: 'Parent 2',
        type: 'boldText',
        x: 430,
        y: 30,
      },
      {
        text: `Genotype: ${parent1Genotype}`,
        type: 'text',
        x: 150, //145,
        y: 55,// 30,
      },
      {
        text: `Genotype: ${parent2Genotype}`,
        type: 'text',
        x: 430, // 425,
        y: 55, //30,
      },
      {
        text: `Phenotype:`,
        type: 'text',
        x: 150, //145,
        y: 80,// 30,
      },
      {
        text: `Phenotype:`,
        type: 'text',
        x: 430, // 425,
        y: 80, //30,
      },
      {
        text: `${parent1Phenotype}`,
        type: 'text',
        x: 150, //145,
        y: 100,// 30,
      },
      {
        text: `${parent2Phenotype}`,
        type: 'text',
        x: 430, // 425,
        y: 100, //30,
      }, cellsL3[0], cellsL3[1]
    ],
    stage2: [
      {
        text: 'possible',
        type: 'boldText',
        x: 30,
        y: 205,
      },
      {
        text: 'gametes',
        type: 'boldText',
        x: 30,
        y: 235,
      },
      {
        type: 'arrow',
        fromx: 330, 
        fromy: 115, 
        tox: 230, 
        toy: 170,
        color: 'red'
      },
      {
        type: 'arrow',
        fromx: 330, 
        fromy: 115, 
        tox: 330, 
        toy: 155,
        color: 'red'
      },
      {
        type: 'arrow',
        fromx: 610, 
        fromy: 115, 
        tox: 510, 
        toy: 170,
        color: 'blue'
      },
      {
        type: 'arrow',
        fromx: 610, 
        fromy: 115, 
        tox: 610, 
        toy: 155,
        color: 'blue'
      }, cellsL3[2], cellsL3[3], cellsL3[4], cellsL3[5]
    ],
    stage3: [
      {
        x: 690,
        y: 280,
        width: 210,
        height: 160,
        type: 'target',
        color: 'white',
        name: expectedRatios,
      },
      {
        text: 'Your prediction:',
        type: 'boldText',
        x: 700,
        y: 300,
      },
    ],
    stage4: [
      {
        text: 'F1',
        type: 'boldText',
        x: 50,
        y: 355,
      },
      {
        text: 'possibilities',
        type: 'boldText',
        x: 10,
        y: 385,
      },
      {
        type: 'arrow',
        fromx: 360, 
        fromy: 260, 
        tox: 435, 
        toy: 320,
        color: 'red'
      },
      {
        type: 'arrow',
        fromx: 360, 
        fromy: 260, 
        tox: 575, 
        toy: 320,
        color: 'red'
      },
      {
        type: 'arrow',
        fromx: 190, 
        fromy: 270, 
        tox: 190, 
        toy: 310,
        color: 'red'
      },
      {
        type: 'arrow',
        fromx: 190, 
        fromy: 270, 
        tox: 300, 
        toy: 320,
        color: 'red'
      },
      {
        type: 'arrow',
        fromx: 470, 
        fromy: 270, 
        tox: 225, 
        toy: 320,
        color: 'blue'
      },
      {
        type: 'arrow',
        fromx: 470, 
        fromy: 270, 
        tox: 470, 
        toy: 310,
        color: 'blue'
      },
      {
        type: 'arrow',
        fromx: 610, 
        fromy: 270, 
        tox: 610, 
        toy: 310,
        color: 'blue'
      },
      {
        type: 'arrow',
        fromx: 610, 
        fromy: 270, 
        tox: 365, 
        toy: 320,
        color: 'blue'
      }, cellsL3[6], cellsL3[7], cellsL3[8], cellsL3[9]
    ],
    stage5: [
      {
        type: 'boldText',
        x: 700,//150, 
        y: 370,//100, 
        text: 'Actual ratios',
      }
    ]
  }

  const futureFixtures = {
    stage1: [
      {
        type: 'chromosome with label', 
        x: cellsL3[0].x -15,
        y: cellsL3[0].y -5, 
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'maternal',
        name: `maternal ${parent1Genotype[0]}`,
        label: `${parent1Genotype[0]}`,
      },
      {
        type: 'chromosome with label', 
        x: cellsL3[0].x + 30,
        y: cellsL3[0].y + 5,
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'maternal',
        name: `maternal ${parent1Genotype[1]}`,
        label:`${parent1Genotype[1]}`,
      },
      {
        type: 'chromosome with label', 
        x: cellsL3[1].x -15,
        y: cellsL3[1].y -5, 
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'paternal',
        name: `paternal ${parent2Genotype[0]}`,
        label:`${parent2Genotype[0]}`,
      },
      {
        type: 'chromosome with label', 
        x: cellsL3[1].x + 30,
        y: cellsL3[1].y + 5,
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'paternal',
        name: `paternal ${parent2Genotype[1]}`,
        label:`${parent2Genotype[1]}`,
      },
    ], 
    stage2: [
      {
        type: 'chromosome with label', 
        x: cellsL3[2].x + 5,
        y: cellsL3[2].y, 
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'maternal',
        name: `maternal ${parent1Genotype[0]}`,
        label: `${parent1Genotype[0]}`,
      },
      {
        type: 'chromosome with label', 
        x: cellsL3[3].x + 5,
        y: cellsL3[3].y,
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'maternal',
        name: `maternal ${parent1Genotype[1]}`,
        label: `${parent1Genotype[1]}`,
      },
      {
        type: 'chromosome with label', 
        x: cellsL3[4].x + 5,
        y: cellsL3[4].y, 
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'paternal',
        name: `paternal ${parent2Genotype[0]}`,
        label: `${parent2Genotype[0]}`
      },
      {
        type: 'chromosome with label', 
        x: cellsL3[5].x + 5,
        y: cellsL3[5].y,
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'paternal',
        name: `paternal ${parent2Genotype[1]}`,
        label: `${parent2Genotype[1]}`
      },
    ],
    stage3: [],
    stage4: [
      {
        type: 'chromosome with label', 
        x: cellsL3[6].x -15,
        y: cellsL3[6].y -5, 
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'maternal',
        name: `maternal ${parent1Genotype[0]}`,
        label: `${parent1Genotype[0]}`,
      },
      {
        type: 'chromosome with label', 
        x: cellsL3[6].x + 30,
        y: cellsL3[6].y + 5,
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'paternal',
        name: `paternal ${parent2Genotype[0]}`,
        label: `${parent2Genotype[0]}`,
      },
      {
        type: 'chromosome with label', 
        x: cellsL3[7].x -15,
        y: cellsL3[7].y -5, 
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'maternal',
        name: `maternal ${parent1Genotype[0]}`,
        label: `${parent1Genotype[0]}`,
      },
      {
        type: 'chromosome with label', 
        x: cellsL3[7].x + 30,
        y: cellsL3[7].y + 5,
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'paternal',
        name: `paternal ${parent2Genotype[1]}`,
        label: `${parent2Genotype[1]}`,
      },
      {
        type: 'chromosome with label', 
        x: cellsL3[8].x -15,
        y: cellsL3[8].y -5, 
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'maternal',
        name: `maternal ${parent1Genotype[1]}`,
        label: `${parent1Genotype[1]}`,
      },
      {
        type: 'chromosome with label', 
        x: cellsL3[8].x + 30,
        y: cellsL3[8].y + 5,
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'paternal',
        name: `paternal ${parent2Genotype[0]}`,
        label: `${parent2Genotype[0]}`,
      },
      {
        type: 'chromosome with label', 
        x: cellsL3[9].x -15,
        y: cellsL3[9].y -5, 
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'maternal',
        name: `maternal ${parent1Genotype[1]}`,
        label: `${parent1Genotype[1]}`,
      },
      {
        type: 'chromosome with label', 
        x: cellsL3[9].x + 30,
        y: cellsL3[9].y + 5,
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'paternal',
        name: `paternal ${parent2Genotype[1]}`,
        label: `${parent2Genotype[1]}`,
      },
    ],
    stage5: [
      {
        type: 'text',
        x: 700,//150, 
        y: 400,//100, 
        name: expectedRatios,
        text: expectedRatios,
      }
    ]
  }

  // include a stage in between 2 and 3 to make a prediction on the genotypic ratios
  // then have a stage 4 to state the actual phenotypic ratios 
  const targetsL3 = {
    stage1: [
    {
      x: 130,
      y: 5,
      width: 260,
      height: 120,
      name: `maternal ${parent1Genotype[0]}`,//'parent 1',
      type: 'target',
      color:"#FFCCCC",
    },
    {
      x: 130,
      y: 5,
      width: 260,
      height: 120,
      name: `maternal ${parent1Genotype[1]}`,//'parent 1',
      type: 'target',
      color:"#FFCCCC",
    },
    {
      x: 410,
      y: 5,
      width: 260,
      height: 120,
      name: `paternal ${parent2Genotype[0]}`,//'parent 2',
      type: 'target',
      color:"#afe1fd",
    },
    {
      x: 410,
      y: 5,
      width: 260,
      height: 120,
      name: `paternal ${parent2Genotype[1]}`,//'parent 2',
      type: 'target',
      color:"#afe1fd",
    }
  ],
    stage2: [
      {
        x: 130,
        y: 155,
        width: 120,
        height: 120,
        name: `maternal ${parent1Genotype[0]}`,//'maternal gamete 1',
        type: 'target',
        color:"#FFCCCC",
      },
      {
        x: 270,
        y: 155,
        width: 120,
        height: 120,
        name: `maternal ${parent1Genotype[1]}`,//'maternal gamete 2',
        type: 'target',
        color:"#FFCCCC",
      },
      {
        x: 410,
        y: 155,
        width: 120,
        height: 120,
        name: `paternal ${parent2Genotype[0]}`,//'paternal gamete 1',
        type: 'target',
        color:"#afe1fd",
      },
      {
        x: 550,
        y: 155,
        width: 120,
        height: 120,
        name: `paternal ${parent2Genotype[1]}`,//'paternal gamete 2',
        type: 'target',
        color:"#afe1fd",
      }
    ],
    stage3: [
      {
        x: 690,
        y: 280,
        width: 210,
        height: 160,
        type: 'target',
        color: 'white',
        name: expectedRatios,
      },
    ],
    stage4: [
    {
      x: 130,
      y: 305,
      width: 120,
      height: 120,
      name: `maternal ${parent1Genotype[0]}`,//'offspring 1',
      type: 'target',
      color:"#cc99ff",
    },
    {
      x: 130,
      y: 305,
      width: 120,
      height: 120,
      name: `paternal ${parent2Genotype[0]}`,//'offspring 1',
      type: 'target',
      color:"#cc99ff",
    },
    {
      x: 270,
      y: 305,
      width: 120,
      height: 120,
      name: `maternal ${parent1Genotype[0]}`,//'offspring 2',
      type: 'target',
      color:"#cc99ff",
    },
    {
      x: 270,
      y: 305,
      width: 120,
      height: 120,
      name: `paternal ${parent2Genotype[1]}`,//'offspring 2',
      type: 'target',
      color:"#cc99ff",
    },
    {
      x: 410,
      y: 305,
      width: 120,
      height: 120,
      name: `maternal ${parent1Genotype[1]}`,//'offspring 3',
      type: 'target',
      color:"#cc99ff",
    },
    {
      x: 410,
      y: 305,
      width: 120,
      height: 120,
      name: `paternal ${parent2Genotype[0]}`,//'offspring 3',
      type: 'target',
      color:"#cc99ff",
    },
    {
      x: 550,
      y: 305,
      width: 120,
      height: 120,
      name: `maternal ${parent1Genotype[1]}`,//'offspring 4',
      type: 'target',
      color:"#cc99ff",
    },
    {
      x: 550,
      y: 305,
      width: 120,
      height: 120,
      name: `paternal ${parent2Genotype[1]}`,//'offspring 4',
      type: 'target',
      color:"#cc99ff",
    },
  ]}

  draggables= {
    stage1: [
      {
        type: 'chromosome with label',
        x: 950,//150, 
        y: order[0],//100, 
        name: `maternal ${letter.toUpperCase()}`,//'maternal gamete',
        label: `${letter.toUpperCase()}`,//'maternal gamete',
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'maternal',
        initialX: 950,
        initialY: order[0],
        width: 100,
        height: 100,
        isDragging: false,
      },
      {
        type: 'chromosome with label',
        x: 950,//150, 
        y: order[1],//100, 
        name: `maternal ${letter.toLowerCase()}`,//'maternal gamete',
        label: `${letter.toLowerCase()}`,//'maternal gamete',
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'maternal',
        initialX: 950,
        initialY: order[1],
        width: 100,
        height: 100,
        isDragging: false,
      },
      {
        type: 'chromosome with label',
        x: 950,//150, 
        y: order[2],//100, 
        name: `paternal ${letter.toUpperCase()}`,//'maternal gamete',
        label: `${letter.toUpperCase()}`,//'maternal gamete',
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'paternal',
        initialX: 950,
        initialY: order[2],
        width: 100,
        height: 100,
        isDragging: false,
      },
      {
        type: 'chromosome with label',
        x: 950,//150, 
        y: order[3],//100, 
        name: `paternal ${letter.toLowerCase()}`,//'maternal gamete',
        label: `${letter.toLowerCase()}`,//'maternal gamete',
        size: 'small', 
        arms: ['top left', 'bottom left'],
        origin: 'paternal',
        initialX: 950,
        initialY: order[3],
        width: 100,
        height: 100,
        isDragging: false,
      },
    ],
    stage3: [
      {
        type: 'text',
        x: 910,//150, 
        y: 150,//100, 
        initialX: 910,
        initialY: 150,
        name: `100% ${letter.toLowerCase()}${letter.toLowerCase()}`,
        text: `100% ${letter.toLowerCase()}${letter.toLowerCase()}`,
        width: 100,
        height: 50,
        isDragging: false,
      },
      {
        type: 'text',
        x: 910,//150, 
        y: 100,//100, 
        initialX: 910,
        initialY: 100,
        name: `100% ${letter.toUpperCase()}${letter.toUpperCase()}`,
        text: `100% ${letter.toUpperCase()}${letter.toUpperCase()}`,
        width: 100,
        height: 50,
        isDragging: false,
      },
      {
        type: 'text',
        x: 910,//150, 
        y: 200,//100, 
        initialX: 910,
        initialY: 200,
        name: `100% ${letter.toUpperCase()}${letter.toLowerCase()}`,
        text: `100% ${letter.toUpperCase()}${letter.toLowerCase()}`,
        width: 100,
        height: 50,
        isDragging: false,
      },
      {
        type: 'text',
        x: 730,//150, 
        y: 150,//100, 
        initialX: 730,
        initialY: 150,
        name: `50% ${letter.toUpperCase()}${letter.toUpperCase()}, 50% ${letter.toUpperCase()}${letter.toLowerCase()}`,
        text: `50% ${letter.toUpperCase()}${letter.toUpperCase()}, 50% ${letter.toUpperCase()}${letter.toLowerCase()}`,
        width: 150,
        height: 50,
        isDragging: false,
      },
      {
        type: 'text',
        x: 730,//150, 
        y: 200,//100, 
        initialX: 730,
        initialY: 200,
        name: `50% ${letter.toUpperCase()}${letter.toLowerCase()}, 50% ${letter.toLowerCase()}${letter.toLowerCase()}`,
        text: `50% ${letter.toUpperCase()}${letter.toLowerCase()}, 50% ${letter.toLowerCase()}${letter.toLowerCase()}`,
        width: 150,
        height: 50,
        isDragging: false,
      },
      {
        type: 'text',
        x: 730,//700, 
        y: 250,//360, 
        initialX: 730,
        initialY: 250,
        name: `25% ${letter.toUpperCase()}${letter.toUpperCase()}, 50% ${letter.toUpperCase()}${letter.toLowerCase()}, 25% ${letter.toLowerCase()}${letter.toLowerCase()}`,
        text: `25% ${letter.toUpperCase()}${letter.toUpperCase()}, 50% ${letter.toUpperCase()}${letter.toLowerCase()}, 25% ${letter.toLowerCase()}${letter.toLowerCase()}`,
        width: 200,
        height: 50,
        isDragging: false,
      },
    ]
  }

  const question = {
    stage1: "Drag the chromosomes that you would find in each of the parents' cells", 
    stage2: 'Drag the chromosomes that you would find in the possible gametes produced by each parent',
    stage3: 'Drag the genotype ratios you predict for the offspring resulting from this cross',
    stage4: 'Drag the chromosomes that you would find in the offspring given the possible gamete pairing',
    stage5: 'Drag the actual genotype ratios for the offspring resulting from this cross'
  };

  const incorrectMessage = {
    stage1: "Look at each parent's genotype and find a chromosome matching in genotype and color", 
    stage2: 'Gametes are haploid so each will have only one of the two chromosomes that a parent has',
    stage3: 'Drag the genotype ratios you predict for the offspring resulting from this cross',
    stage4: 'Look at the arrows to see which gametes are being crossed for each offspring and match the chromosomes',
    stage5: 'Drag the actual genotype ratios for the offspring resulting from this cross'
  }
  
  return { 
    fixtures, futureFixtures, draggables, targetsL3, question, incorrectMessage
  }
}

const genotypeOptions1 = ['homozygous dominant', 'heterozygous', 'homozygous recessive', 'heterozygous']
const genotypeOptions2 = ['heterozygous', 'homozygous recessive', 'homozygous dominant', 'heterozygous']

const getRandomScenario = (level) => {
  let newState = {};
  newState.feedback= false;
  switch(level) {
    case 1:
      const draggablesL1 = generateRandomGenotypes(10);
      newState.targets = targetsL1;
      newState.draggables = draggablesL1;
      newState.fixtures = targetsL1.concat(labels.slice(0,6));
      newState.futureFixtures = generateMatchingFixtures(draggablesL1);
      newState.question= 'Match each genotype to its corresponding phenotype';
      newState.incorrectMessage= 'Capital letters represent dominant alleles, as long as a genotype has at least one dominant allele, the organism will express the dominant phenotype';
      return newState
    case 2:
      const draggablesL2 = generateDraggablesL2();
      const targetsL2 = generateTargets(draggablesL2);
      const chromosomesL2 = generateChromosomesL2(targetsL2)
      newState.targets = targetsL2;
      newState.fixtures = cellsL2.concat([labels[0], labels[6]]).concat(chromosomesL2);
      newState.draggables = draggablesL2;
      newState.question= 'Match each cell to its genotype';
      newState.incorrectMessage= 'Look at the chromosomes inside each cell, which alleles do they have?';
      newState.futureFixtures = generateMatchingFixturesL2(targetsL2);
      return newState
    case 3:
      const variables = generateLevel3('homozygous dominant', 'homozygous recessive');
      newState.fixtures = variables.fixtures; //.concat(cellsL3)
      newState.question = variables.question;
      newState.incorrectMessage= variables.incorrectMessage;
      newState.targets = variables.targetsL3;
      newState.futureFixtures = variables.futureFixtures;
      newState.draggables = variables.draggables;
      return newState
  // include a stage in between 2 and 3 to make a prediction on the genotypic ratios
  // then have a stage 4 to state the actual phenotypic ratios 
    case 4:
      const variables4 = generateLevel3('heterozygous', 'homozygous recessive');
      newState.fixtures = variables4.fixtures; //.concat(cellsL3)
      newState.question = variables4.question;
      newState.incorrectMessage= variables4.incorrectMessage;
      newState.targets = variables4.targetsL3;
      newState.futureFixtures = variables4.futureFixtures;
      newState.draggables = variables4.draggables;
      return newState
    case 5:
      const variables5 = generateLevel3('heterozygous', 'heterozygous');
      newState.fixtures = variables5.fixtures; //.concat(cellsL3)
      newState.question = variables5.question;
      newState.incorrectMessage= variables5.incorrectMessage;
      newState.targets = variables5.targetsL3;
      newState.futureFixtures = variables5.futureFixtures;
      newState.draggables = variables5.draggables;
      return newState
    case 6:
      const rand = Math.round(Math.random()); // number between 0 & 1
      const variables6 = generateLevel3(genotypeOptions1[rand], genotypeOptions2[rand]);
      newState.fixtures = variables6.fixtures; //.concat(cellsL3)
      newState.question = variables6.question;
      newState.incorrectMessage= variables6.incorrectMessage;
      newState.targets = variables6.targetsL3;
      newState.futureFixtures = variables6.futureFixtures;
      newState.draggables = variables6.draggables;
      return newState
    case 7:
      const rand2 = 2 + Math.round(Math.random()); // number between 2 & 3
      const variables7 = generateLevel3(genotypeOptions2[rand2], genotypeOptions1[rand2]);
      newState.fixtures = variables7.fixtures; //.concat(cellsL3)
      newState.question = variables7.question;
      newState.incorrectMessage= variables7.incorrectMessage;
      newState.targets = variables7.targetsL3;
      newState.futureFixtures = variables7.futureFixtures;
      newState.draggables = variables7.draggables;
      return newState
    default: 
      return;
  }
}


export { getRandomScenario};
