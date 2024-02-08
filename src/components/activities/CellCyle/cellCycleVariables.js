const cells = [
  {
    type: 'cell',
    x: 120, // percent of maxWidth
    y: 104, // percent of maxHeight r is 0.2 maxheight === 0.1 max width
    r: 80, // percent of maxWidth
  },
  {
    type: 'cell',
    x: 360,
    y: 104,
    r: 80,
  },
  {
    type: 'cell',
    x: 600,
    y: 104,
    r: 80,
  },
  {
    type: 'cell',
    x: 120, // percent of maxWidth
    y: 300, // percent of maxHeight
    r: 80, // percent of maxWidth
  },
  {
    type: 'cell',
    x: 360,
    y: 300,
    r: 80,
  },
  {
    type: 'cell',
    x: 600,
    y: 300,
    r: 80,
  },
];

const cellA = [{ type: 'cell', x: 250, y:200, r: 80 }];
const cellB = [{ type: 'cell', x: 500, y:200, r: 80 }];
const cellC = [{ type: 'cell', x: 500, y:100, r: 80 }];
const cellD = [{ type: 'cell', x: 500, y:300, r: 80 }];
const arrowA = [{  type: 'arrow', fromx: 340, fromy: 200, tox: 400, toy: 200, }];
const arrowM = [
  {  type: 'arrow', fromx: 340, fromy: 200, tox: 400, toy: 100, },
  {  type: 'arrow', fromx: 340, fromy: 200, tox: 400, toy: 300, },
];

// const target =  [{ type: 'box', x: 40, y: 100, width: 600, height: 285, name: 'G1'}];
const chromosomeCellASingle = [
  {
    type: 'chromosome', 
    x: 210, 
    y: 200, 
    size: 'large', 
    arms: ['top left', 'bottom left'],
    name: 'large single',
  },
  {
    type: 'chromosome', 
    x: 306,
    y: 200, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    name: 'small single',
  },
  {
    type: 'chromosome', 
    x: 258, 
    y: 160, 
    size: 'large', 
    arms: ['bottom left'],
    name: 'large bottom single',
  },
  {
    type: 'chromosome', 
    x: 258,
    y: 232, 
    size: 'small', 
    arms: ['bottom left'],
    name: 'small bottom single',
  },
];

const chromosomeCellAReplicated = [
  {
    type: 'chromosome', 
    x: 210, 
    y: 200, 
    size: 'large', 
    arms: ['top left', 'bottom left', 'bottom right', 'top right'],
    name: 'large double'
  },
  {
    type: 'chromosome', 
    x: 306,
    y: 200, 
    size: 'small', 
    arms: ['top left', 'bottom left', 'bottom right', 'top right'],
    name: 'small double',
  },
  {
    type: 'chromosome', 
    x: 266, 
    y: 140, 
    size: 'large', 
    arms: ['bottom left', 'bottom right',],
    name: 'large bottom double',
  },
  {
    type: 'chromosome', 
    x: 266,
    y: 232, 
    size: 'small', 
    arms: ['bottom left', 'bottom right'],
    name: 'small bottom double',
  },
]

const chromosomeCellBSingle = [
  {
    type: 'chromosome', 
    x: 460, 
    y: 200, 
    size: 'large', 
    arms: ['top left', 'bottom left'],
    name: 'large single',
  },
  {
    type: 'chromosome', 
    x: 556,
    y: 200, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    name: 'small single',
  },
  {
    type: 'chromosome', 
    x: 508, 
    y: 160, 
    size: 'large', 
    arms: ['bottom left'],
    name: 'large bottom single',
  },
  {
    type: 'chromosome', 
    x: 508,
    y: 232, 
    size: 'small', 
    arms: ['bottom left'],
    name: 'small bottom single',
  },
];

const chromosomeCellBReplicated = [
  {
    type: 'chromosome', 
    x: 460, 
    y: 200, 
    size: 'large', 
    arms: ['top left', 'bottom left', 'bottom right', 'top right'], 
    name: 'large double'
  },
  {
    type: 'chromosome', 
    x: 556,
    y: 200, 
    size: 'small', 
    arms: ['top left', 'bottom left', 'bottom right', 'top right'],
    name: 'small double'
  },
  {
    type: 'chromosome', 
    x: 516, 
    y: 140, 
    size: 'large', 
    arms: ['bottom left', 'bottom right',],
    name: 'large bottom double'
  },
  {
    type: 'chromosome', 
    x: 516,
    y: 232, 
    size: 'small', 
    arms: ['bottom left', 'bottom right'],
    name: 'small bottom double'
  },
]

const chromosomeCellCSingle = [
  {
    type: 'chromosome', 
    x: 460, 
    y: 100, 
    size: 'large', 
    arms: ['top left', 'bottom left'],
    name: 'large single',
  },
  {
    type: 'chromosome', 
    x: 556,
    y: 100, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    name: 'small single',
  },
  {
    type: 'chromosome', 
    x: 508, 
    y: 60, 
    size: 'large', 
    arms: ['bottom left'],
    name: 'large bottom single',
  },
  {
    type: 'chromosome', 
    x: 508,
    y: 132, 
    size: 'small', 
    arms: ['bottom left'],
    name: 'small bottom single',
  },
]

const chromosomeCellDSingle = [
  {
    type: 'chromosome', 
    x: 460, 
    y: 300, 
    size: 'large', 
    arms: ['top left', 'bottom left'],
    name: 'large single',
  },
  {
    type: 'chromosome', 
    x: 556,
    y: 300, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    name: 'small single',
  },
  {
    type: 'chromosome', 
    x: 508, 
    y: 260, 
    size: 'large', 
    arms: ['bottom left'],
    name: 'large bottom single',
  },
  {
    type: 'chromosome', 
    x: 508,
    y: 332, 
    size: 'small', 
    arms: ['bottom left'],
    name: 'small bottom single',
  },
];

const chromosomesCell1 = [

  {
    type: 'chromosome', 
    x: 320, 
    y: 104, 
    size: 'large', 
    arms: ['top left', 'bottom left'],
    name: 'large single',
  },
  {
    type: 'chromosome', 
    x: 416,
    y: 104, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    name: 'small single',
  },
  {
    type: 'chromosome', 
    x: 368, 
    y: 64, 
    size: 'large', 
    arms: ['bottom left'],
    name: 'large bottom single',
  },
  {
    type: 'chromosome', 
    x: 368,
    y: 136, 
    size: 'small', 
    arms: ['bottom left'],
    name: 'small bottom single',
  },
]

const chromosomesCell2 = [

  {
    type: 'chromosome', 
    x: 560, 
    y: 104, 
    size: 'large', 
    arms: ['top left', 'bottom left'],
    name: 'large single',
  },
  {
    type: 'chromosome', 
    x: 656,
    y: 104, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    name: 'small single',
  },
  {
    type: 'chromosome', 
    x: 608, 
    y: 64, 
    size: 'large', 
    arms: ['bottom left'],
    name: 'large bottom single',
  },
  {
    type: 'chromosome', 
    x: 608,
    y: 136, 
    size: 'small', 
    arms: ['bottom left'],
    name: 'small bottom single',
  },
]

const chromosomesCell3 = [
  {
    type: 'chromosome', 
    x: 560, 
    y: 300, 
    size: 'large', 
    arms: ['top left', 'bottom left', 'bottom right', 'top right'],
    name: 'large double',
  },
  {
    type: 'chromosome', 
    x: 656,
    y: 300, 
    size: 'small', 
    arms: ['top left', 'bottom left', 'bottom right', 'top right'],
    name: 'small double',
  },
  {
    type: 'chromosome', 
    x: 616, 
    y: 240, 
    size: 'large', 
    arms: ['bottom left', 'bottom right',],
    name: 'large bottom double',
  },
  {
    type: 'chromosome', 
    x: 616,
    y: 332, 
    size: 'small', 
    arms: ['bottom left', 'bottom right'],
    name: 'small bottom double',
  },
];

const chromosomesCell4 = [
  {
    type: 'chromosome', 
    x: 320, 
    y: 300, 
    size: 'large', 
    arms: ['top left', 'bottom left', 'bottom right', 'top right'],
    name: 'large double',
  },
  {
    type: 'chromosome', 
    x: 416,
    y: 300, 
    size: 'small', 
    arms: ['top left', 'bottom left', 'bottom right', 'top right'],
    name: 'small double',
  },
  {
    type: 'chromosome', 
    x: 368, 
    y: 240, 
    size: 'large', 
    arms: ['bottom left', 'bottom right',],
    name: 'large bottom double',
  },
  {
    type: 'chromosome', 
    x: 368,
    y: 332, 
    size: 'small', 
    arms: ['bottom left', 'bottom right'],
    name: 'small bottom double',
  },
];

const chromosomesCell5 = [

  {
    type: 'chromosome', 
    x: 80, 
    y: 304, 
    size: 'large', 
    arms: ['top left', 'bottom left'],
    name: 'large single',
  },
  {
    type: 'chromosome', 
    x: 176,
    y: 304, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    name: 'small single',
  },
  {
    type: 'chromosome', 
    x: 128, 
    y: 264, 
    size: 'large', 
    arms: ['bottom left'],
    name: 'large bottom single',
  },
  {
    type: 'chromosome', 
    x: 128,
    y: 336, 
    size: 'small', 
    arms: ['bottom left'],
    name: 'small bottom single',
  },
]

const chromosomesCell6 = [

  {
    type: 'chromosome', 
    x: 80, 
    y: 104, 
    size: 'large', 
    arms: ['top left', 'bottom left'],
    name: 'large single',
  },
  {
    type: 'chromosome', 
    x: 176,
    y: 104, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    name: 'small single',
  },
  {
    type: 'chromosome', 
    x: 128, 
    y: 64, 
    size: 'large', 
    arms: ['bottom left'],
    name: 'large bottom single',
  },
  {
    type: 'chromosome', 
    x: 128,
    y: 136, 
    size: 'small', 
    arms: ['bottom left'],
    name: 'small bottom single',
  },
]

const arrows = [
  // {
  //   type: 'arrow',
  //   fromx: 0.308,
  //   fromy: 0.26,
  //   tox: 0.385,
  //   toy: 0.26,
  // },
  {
    type: 'arrow',
    fromx: 446,
    fromy: 104,
    tox: 508,
    toy: 104,
  },
  {
    type: 'arrow',
    fromx: 600,
    fromy: 188,
    tox: 600,
    toy: 214,
  },
  {
    type: 'arrow',
    fromx: 516,
    fromy: 300,
    tox: 454,
    toy: 300,
  },
    {
    type: 'arrow',
    fromx: 276,
    fromy: 300,
    tox: 208,
    toy: 300,
  },
  {
    type: 'arrow',
    fromx: 276,
    fromy: 300,
    tox: 180,
    toy: 170,
  },
];

const phases = [
  {
    type: 'phases',
    x: 464,
    y: 84,
    text: `G${String.fromCharCode(8321)}`,
    name: 'G1'
  },
  {
    type: 'phases',
    x: 616,
    y: 208,
    text: `S`,
    name: 'S'
  },
  {
    type: 'phases',
    x: 472,
    y: 284,
    text: `G${String.fromCharCode(8322)}`,
    name: 'G2'
  },
  {
    type: 'phases',
    x: 232,
    y: 208,
    text: `M`,
    name: 'M'
  },
];

const phases2 = [
  {
    type: 'phases',
    x: 320,
    y: 60,
    text: `G${String.fromCharCode(8321)}: first gap`,
    name: 'G1'
  },
  {
    type: 'phases',
    x: 320,
    y: 60,
    text: `S: synthesis`,
    name: 'S'
  },
  {
    type: 'phases',
    x: 320,
    y: 60,
    text: `G${String.fromCharCode(8322)}: second gap`,
    name: 'G2'
  },
  {
    type: 'phases',
    x: 320,
    y: 60,
    text: `M: mitotic phase`,
    name: 'M'
  },
];

const phaseBoxes = [
  {
    type: 'box',
    x: 448,
    y: 60,
    width: 60,
    height: 30,
    name: 'G1'
  },
  {
    type: 'box',
    x: 616,
    y: 188,
    width: 60,
    height: 30,
    name: 'S'
  },
  {
    type: 'box',
    x: 452,
    y: 256,
    width: 60,
    height: 30,
    name: 'G2'
  },
  {
    type: 'box',
    x: 240,
    y: 200,
    width: 60,
    height: 30,
    name: 'M'
  },
];

const phasesDraggable = [
  {
    type: 'phases',
    x: 760,
    y: 120,
    text: `G${String.fromCharCode(8321)}: first gap`,
    initialX: 760,
    initialY: 120,
    width: 250,
    height: 20,
    isDragging: false,
    name: 'G1'
  },
  {
    type: 'phases',
    x: 760,
    y: 168,
    text: `S: synthesis`,
    initialX: 760,
    initialY: 168,
    width: 250,
    height: 20,
    isDragging: false,
    name: 'S'
  },
  {
    type: 'phases',
    x: 760,
    y: 217,
    text: `G${String.fromCharCode(8322)}: second gap`,
    initialX: 760,
    initialY: 217,
    width: 250,
    height: 20,
    isDragging: false,
    name: 'G2'
  },
  {
    type: 'phases',
    x: 760,
    y: 265,
    text: `M: mitotic phase`,
    initialX: 760,
    initialY: 265,
    width: 250,
    height: 20,
    isDragging: false,
    name: 'M'
  },
]

const draggableChromosomes = [
  {
    type: 'chromosome', 
    x: 780, 
    y: 140, 
    size: 'large', 
    arms: ['top left', 'bottom left'],
    initialX: 780,
    initialY: 140,
    width: 30,
    height: 120,
    isDragging: false,
    name: 'large single',
  },
  {
    type: 'chromosome', 
    x: 840,
    y: 140, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    initialX: 840,
    initialY: 140,
    width: 30,
    height: 120,
    isDragging: false,
    name: 'small single',
  },
  {
    type: 'chromosome', 
    x: 900, 
    y: 120, 
    size: 'large', 
    arms: ['bottom left'],
    initialX: 900,
    initialY: 120,
    width: 30,
    height: 120,
    isDragging: false,
    name: 'large bottom single',
  },
  {
    type: 'chromosome', 
    x: 960,
    y: 120, 
    size: 'small', 
    arms: ['bottom left'],
    initialX: 960,
    initialY: 120,
    width: 30,
    height: 60,
    isDragging: false,
    name: 'small bottom single',
  },
  {
    type: 'chromosome', 
    x: 780, 
    y: 260, 
    size: 'large', 
    arms: ['top left', 'bottom left', 'bottom right', 'top right'],
    initialX: 780,
    initialY: 260,
    width: 60,
    height: 120,
    isDragging: false,
    name: 'large double',
  },
  {
    type: 'chromosome', 
    x: 840,
    y: 260, 
    size: 'small', 
    arms: ['top left', 'bottom left', 'bottom right', 'top right'],
    initialX: 840,
    initialY: 260,
    width: 60,
    height: 60,
    isDragging: false,
    name: 'small double',
  },
  {
    type: 'chromosome', 
    x: 900, 
    y: 240, 
    size: 'large', 
    arms: ['bottom left', 'bottom right',],
    initialX: 900,
    initialY: 240,
    width: 60,
    height: 120,
    isDragging: false,
    name: 'large bottom double',
  },
  {
    type: 'chromosome', 
    x: 960,
    y: 240, 
    size: 'small', 
    arms: ['bottom left', 'bottom right'],
    initialX: 960,
    initialY: 240,
    width: 60,
    height: 60,
    isDragging: false,
    name: 'small bottom double',
  },
]

const States = [
  { // options for levels 1
    fixtures: cells.concat(arrows).concat(chromosomesCell1).concat(chromosomesCell2).concat(chromosomesCell3).concat(chromosomesCell4).concat(chromosomesCell5).concat(chromosomesCell6),
    draggables: phasesDraggable,
    targets: phaseBoxes,
    futureFixtures: phases,
    question: 'Drag each phase to its corresponding grey box',
    maxCount: phasesDraggable.length * 2 -1,
  },
  { // options for level 2
    fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellASingle).concat(chromosomeCellBReplicated),
    draggables: phasesDraggable,
    targets: [{ type: 'box', x: 80, y: 10, width: 600, height: 400, name: 'S'}], //y: 10, height: 400
    futureFixtures: phases2,
    question: 'The diagram shows the cell at the begining and at the end of a given phase. Drag the corresponding phase to the grey box',
    maxCount: 5,
  },
  { // options for level 2
    fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellASingle).concat(chromosomeCellBSingle),
    draggables: phasesDraggable,
    targets: [{ type: 'box', x: 80, y: 10, width: 600, height: 400, name: 'G1'}],
    futureFixtures: phases2,
    question: 'The diagram shows the cell at the begining and at the end of a given phase. Drag the corresponding phase to the grey box',
    maxCount: 5,
  },
  { // options for level 2
    fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellAReplicated).concat(chromosomeCellBReplicated),
    draggables: phasesDraggable,
    targets: [{ type: 'box', x: 80, y: 10, width: 600, height: 400, name: 'G2'}],
    futureFixtures: phases2,
    question: 'The diagram shows the cell at the begining and at the end of a given phase. Drag the corresponding phase to the grey box',
    maxCount: 5,
  },
  { // options for level 2
    fixtures: cellA.concat(cellC).concat(cellD).concat(arrowM).concat(chromosomeCellAReplicated).concat(chromosomeCellCSingle).concat(chromosomeCellDSingle),
    draggables: phasesDraggable,
    targets: [{ type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'M'}],
    futureFixtures: phases2,
    question: 'The diagram shows the cell at the begining and at the end of a given phase. Drag the corresponding phase to the grey box',
    maxCount: 5,
  },
  { // options for level 3 
    fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellASingle).concat(phases2[1]),
    draggables: draggableChromosomes,
    targets: [
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large bottom double'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small bottom double'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name:  'large double'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name:  'small double'},
    ],
    futureFixtures: chromosomeCellBReplicated, 
    question: 'What chromosome arrangement would this cell have after DNA replication in the S phase? Drag the corresponding chromosomes into the cell',
    maxCount: 8,
  },
  { // options for level 3 
    fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellASingle).concat(phases2[0]),
    draggables: draggableChromosomes,
    targets: [
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large bottom single'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small bottom single'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large single'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small single'},
    ],
    futureFixtures: chromosomeCellBSingle, 
    question: `What chromosome arrangement would this cell have after the G${String.fromCharCode(8321)} phase? Drag the corresponding chromosomes into the cell`,
    maxCount: 8,
  },
  { // options for level 3 
    fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellAReplicated).concat(phases2[2]),
    draggables: draggableChromosomes,
    targets: [
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large bottom double',},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small bottom double',},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large double'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small double'},
    ],
    futureFixtures: chromosomeCellBReplicated, 
    question: `What chromosome arrangement would this cell have after the G${String.fromCharCode(8322)} phase? Drag the corresponding chromosomes into the cell`,
    maxCount: 8,
  },
  { // options for level 3 
    fixtures: cellA.concat(cellC).concat(cellD).concat(arrowM).concat(chromosomeCellAReplicated).concat(phases2[3]),
    draggables: draggableChromosomes,
    targets: [
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large bottom single'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small bottom single'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large single'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small single'},
    ],
    futureFixtures: chromosomeCellCSingle.concat(chromosomeCellDSingle), 
    question: `What chromosome arrangement would these cells have after Mitosis? Drag the corresponding chromosomes into the cells`,
    maxCount: 8,
  }, // options for level 4:
  {  
    fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellBReplicated).concat(phases2[1]),
    draggables: draggableChromosomes,
    targets: [
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large bottom single'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small bottom single'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large single'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small single'},
    ],
    futureFixtures: chromosomeCellASingle, 
    question: `What chromosome arrangement did this cell have BEFORE the S phase? Drag the corresponding chromosomes into the cells`,
    maxCount: 8,
  },
  {  
    fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellBSingle).concat(phases2[0]),
    draggables: draggableChromosomes,
    targets: [
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large bottom single'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small bottom single'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large single'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small single'},
    ],
    futureFixtures: chromosomeCellASingle, 
    question: `What chromosome arrangement did this cell have at the begining of the G${String.fromCharCode(8321)} phase? Drag the corresponding chromosomes into the cells`,
    maxCount: 8,
  },
  {  
    fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellBReplicated).concat(phases2[2]),
    draggables: draggableChromosomes,
    targets: [
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large bottom double'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small bottom double'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large double'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small double'},
    ],
    futureFixtures: chromosomeCellAReplicated, 
    question: `What chromosome arrangement did this cell have at the begining of the G${String.fromCharCode(8322)} phase? Drag the corresponding chromosomes into the cells`,
    maxCount: 8,
  },
  {
    fixtures: cellA.concat(cellC).concat(cellD).concat(arrowM).concat(chromosomeCellCSingle).concat(chromosomeCellDSingle).concat(phases2[3]),
    draggables: draggableChromosomes,
    targets: [
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large bottom double'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small bottom double'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'large double'},
      { type: 'box', x: 80, y: 0, width: 600, height: 400, name: 'small double'},
  ],
    futureFixtures: chromosomeCellAReplicated, 
    question: `What chromosome arrangement did the PARENT cell have BEFORE the M phase? Drag the corresponding chromosomes into the cells`,
    maxCount: 8,
  },
  { // options for levels 5
    fixtures: cells.concat(arrows).concat(phases),
    draggables: draggableChromosomes,
    targets: [
      { type: 'box', x: 35, y: 19, width: 170, height: 170, name: 'large single', id: 'cell 1'},
      { type: 'box', x: 35, y: 19, width: 170, height: 170, name: 'large bottom single', id: 'cell 1'},
      { type: 'box', x: 35, y: 19, width: 170, height: 170, name: 'small single', id: 'cell 1'},
      { type: 'box', x: 35, y: 19, width: 170, height: 170, name: 'small bottom single', id: 'cell 1'},
      { type: 'box', x: 275, y: 19, width: 170, height: 170, name: 'large single', id: 'cell 2'},
      { type: 'box', x: 275, y: 19, width: 170, height: 170, name: 'large bottom single', id: 'cell 2'},
      { type: 'box', x: 275, y: 19, width: 170, height: 170, name: 'small single', id: 'cell 2'},
      { type: 'box', x: 275, y: 19, width: 170, height: 170, name: 'small bottom single', id: 'cell 2'},
      { type: 'box', x: 515, y: 19, width: 170, height: 170, name: 'large single', id: 'cell 3'},
      { type: 'box', x: 515, y: 19, width: 170, height: 170, name: 'large bottom single', id: 'cell 3'},
      { type: 'box', x: 515, y: 19, width: 170, height: 170, name: 'small single', id: 'cell 3'},
      { type: 'box', x: 515, y: 19, width: 170, height: 170, name: 'small bottom single', id: 'cell 3'},
      { type: 'box', x: 35, y: 215, width: 170, height: 170, name: 'large single', id: 'cell 4'},
      { type: 'box', x: 35, y: 215, width: 170, height: 170, name: 'large bottom single', id: 'cell 4'},
      { type: 'box', x: 35, y: 215, width: 170, height: 170, name: 'small single', id: 'cell 4'},
      { type: 'box', x: 35, y: 215, width: 170, height: 170, name: 'small bottom single', id: 'cell 4'},
      { type: 'box', x: 275, y: 215, width: 170, height: 170, name: 'large double', id: 'cell 5'},
      { type: 'box', x: 275, y: 215, width: 170, height: 170, name: 'large bottom double', id: 'cell 5'},
      { type: 'box', x: 275, y: 215, width: 170, height: 170, name: 'small double', id: 'cell 5'},
      { type: 'box', x: 275, y: 215, width: 170, height: 170, name: 'small bottom double', id: 'cell 5'},
      { type: 'box', x: 515, y: 215, width: 170, height: 170, name: 'large double', id: 'cell 6'},
      { type: 'box', x: 515, y: 215, width: 170, height: 170, name: 'large bottom double', id: 'cell 6'},
      { type: 'box', x: 515, y: 215, width: 170, height: 170, name: 'small double', id: 'cell 6'},
      { type: 'box', x: 515, y: 215, width: 170, height: 170, name: 'small bottom double', id: 'cell 6'},
    ],
    /*

  { type: 'cell',  x: 120,  y: 300,  r: 80, },
  { type: 'cell', x: 360, y: 300, r: 80, },
  {type: 'cell', x: 600, y: 300, r: 80,},
    */
    futureFixtures:chromosomesCell1.concat(chromosomesCell2).concat(chromosomesCell3).concat(chromosomesCell4).concat(chromosomesCell5).concat(chromosomesCell6),
    question: 'Drag the corresponding chromosomes to each cell',
    maxCount: 8,
  },
]

// const selectChromosomes = (arrayOfArrays) => { // the internal arrays must be of same length and follow same order
//   const rand = [Math.floor(Math.random() * arrayOfArrays[0].length)]; // where to start curring
//   const rand1 = [Math.floor(Math.random() * arrayOfArrays[0].length)]
//   const rand2 = rand1 >= arrayOfArrays[0].length - rand ? 1 : rand1; // how many items to remove
//   let newArrayOfArrays = [];
//   for (let i = 0; i < arrayOfArrays.length; i++) {
//       const newArray = arrayOfArrays[i].slice();
//       newArray.splice(rand,rand2);
//       newArrayOfArrays.push(newArray)
//     }
//     const concatenatedArray = newArrayOfArrays.flat();
//     return concatenatedArray
// }

// const getRandomScenario = (level) => {
//   let newState = {};
//   switch(level) {
//     case 1:
//       newState = States[0];
//       const chromosomes = selectChromosomes([chromosomesCell1,chromosomesCell2,chromosomesCell3,chromosomesCell4, chromosomesCell5,chromosomesCell6]);
//       newState.fixtures = cells.concat(chromosomes).concat(arrows); // cells have white background
//       return newState;
//       break;
//     case 2: //  drag the corresponding phase according to diagram
//       newState = States[Math.floor(Math.random()*3)+1]; // pick random from 1-3
//       return newState;
//       break;
//     case 3: // same set up as above, but instead drag the corresponding chromosomes to cell 2 or 3
//       newState = States[Math.floor(Math.random()*4)+5]; //[Math.round(Math.random()*4)+5] pick random from 5-8
//       return newState;
//       break;
//     case 4: // same as above, but instead drag the corresponding chromosomes to cell 1 say which phase it should be
//       newState = States[Math.floor(Math.random()*4)+9]; //[Math.round(Math.random()*4)+5] pick random from 9-12
//       return newState;
//       break;
//   }
// }


export { States  } 
