const cells = [
  {
    type: 'cell',
    x: 60, 
    y: 55, 
    r: 45, 
    name: 'maternal gamete',
    id: 'cell1'
  },
  {
    type: 'cell',
    x: 60,
    y: 165,
    r: 45,
    name: 'paternal gamete',
    id: 'cell2'
  },
  {
    type: 'cell',
    x: 250,
    y: 85,
    r: 70,
    name: 'end of fertilization',
    id: 'cell3'
  },
  {
    type: 'cell',
    x: 540, 
    y: 100, // percent of maxHeight
    r: 80, 
    name: 'end of synthesis',
    id: 'cell4'
  },
  {
    type: 'cell',
    x: 350,
    y: 240,
    r: 80,
    name: 'end of crossing over',
    id: 'cell5'
  },
  {
    type: 'cell',
    x: 210,
    y: 350,
    r: 60,
    name: 'end of meiosis 1a',
    id: 'cell6'
  },
  {
    type: 'cell',
    x: 490,
    y: 350,
    r: 60,
    name: 'end of meiosis 1b',
    id: 'cell7'
  },
  {
    type: 'cell',
    x: 60, 
    y: 290, 
    r: 45, 
    name: 'end of meiosis 2a',
    id: 'cell8'
  },
  {
    type: 'cell',
    x: 60, 
    y: 395, 
    r: 45, 
    name: 'end of meiosis 2a',
    id: 'cell9'
  },
  {
    type: 'cell',
    x: 630, 
    y: 290, 
    r: 45, 
    name: 'end of meiosis 2b',
    id: 'cell10'
  },
  {
    type: 'cell',
    x: 630, 
    y: 395, 
    r: 45, 
    name: 'end of meiosis 2b',
    id: 'cell11'
  },
];

const arrows = [
  {
    type: 'arrow',
    fromx: cells[0].x + cells[0].r + 5,
    fromy: cells[0].y,
    tox: cells[2].x - cells[2].r - 10,
    toy: cells[2].y - 5,
  },
  {
    type: 'arrow',
    fromx: cells[1].x + cells[1].r ,
    fromy: cells[1].y - 20,
    tox: cells[2].x - cells[2].r - 10,
    toy: cells[2].y + 10,
  },
  {
    type: 'arrow',
    fromx: cells[2].x + cells[2].r + 5,
    fromy: cells[2].y,
    tox: cells[3].x - cells[3].r - 10,
    toy: cells[3].y - 5,
  },
  {
    type: 'arrow',
    fromx: cells[3].x - 60,
    fromy: cells[3].y + cells[3].r - 20,
    tox: cells[4].x + cells[3].r + 5,
    toy: cells[4].y - 40,
  },
  {
    type: 'arrow',
    fromx: cells[4].x - 58,
    fromy: cells[4].y + cells[4].r - 22,
    tox: cells[5].x + cells[5].r ,
    toy: cells[5].y - 36,
  },
  {
    type: 'arrow',
    fromx: cells[4].x + 58,
    fromy: cells[4].y + cells[4].r - 22,
    tox: cells[6].x - cells[6].r ,
    toy: cells[6].y - 36,
  },
  {
    type: 'arrow',
    fromx: cells[5].x - cells[5].r - 5,
    fromy: cells[5].y,
    tox: cells[7].x + cells[7].r + 5,
    toy: cells[7].y + 25,
  },
  {
    type: 'arrow',
    fromx: cells[5].x - cells[5].r - 5,
    fromy: cells[5].y,
    tox: cells[8].x + cells[8].r + 5,
    toy: cells[8].y - 25,
  },
  {
    type: 'arrow',
    fromx: cells[6].x + cells[6].r + 5,
    fromy: cells[6].y,
    tox: cells[9].x - cells[9].r - 5,
    toy: cells[9].y + 25,
  },
  {
    type: 'arrow',
    fromx: cells[6].x + cells[6].r + 5,
    fromy: cells[6].y,
    tox: cells[10].x - cells[10].r - 5,
    toy: cells[10].y - 25,
  },
];

const chromosomesCell1 = [
  {
    type: 'chromosome', 
    x: cells[0].x -10,
    y: cells[0].y -5, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'maternal',
    name: 'small single maternal',
  },
  {
    type: 'chromosome', 
    x: cells[0].x + 20,
    y: cells[0].y -15,
    size: 'large', 
    arms: ['bottom left'],
    origin: 'maternal',
    name: 'large bottom single maternal',
  },
];

const chromosomesCell2 = [
  {
    type: 'chromosome', 
    x: cells[1].x -10,
    y: cells[1].y -5, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'paternal',
    name: 'small single paternal',

  },
  {
    type: 'chromosome', 
    x: cells[1].x + 20,
    y: cells[1].y -15,
    size: 'large', 
    arms: ['bottom left'],
    origin: 'paternal',
    name: 'large bottom single paternal',
  },
]

const chromosomesCell3 = [
  {
    type: 'chromosome', 
    x: cells[2].x - 30,
    y: cells[2].y -20,
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'maternal',
    name: 'small single maternal',
  },
  {
    type: 'chromosome', 
    x: cells[2].x - 5,
    y: cells[2].y + 15,
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'paternal',
    name: 'small single paternal',
  },
  {
    type: 'chromosome', 
    x: cells[2].x + 20,
    y: cells[2].y -40,
    size: 'large', 
    arms: ['bottom left'],
    origin: 'maternal',
    name: 'large bottom single maternal',
  },
  {
    type: 'chromosome', 
    x: cells[2].x + 45,
    y: cells[2].y -5,
    size: 'large', 
    arms: ['bottom left'],
    origin: 'paternal',
    name: 'large bottom single paternal',
  },
];

const chromosomesCell4 = [
  {
    type: 'chromosome', 
    x: cells[3].x - 40,
    y: cells[3].y -15,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'maternal',
    name: 'small double maternal',
  },
  {
    type: 'chromosome', 
    x: cells[3].x - 10,
    y: cells[3].y + 30,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'paternal',
    name: 'small double paternal',
  },
  {
    type: 'chromosome', 
    x: cells[3].x + 15,
    y: cells[3].y - 50,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'maternal',
    name: 'large bottom double maternal',
  },
  {
    type: 'chromosome', 
    x: cells[3].x + 45,
    y: cells[3].y -10,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'paternal',
    name: 'large bottom double paternal',
  },
];

const chromosomesCell5 = [
  {
    type: 'chromosome', 
    x: cells[4].x - 40,
    y: cells[4].y -15,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'maternal recombinant',
    name: 'small double recombinant',
  },
  {
    type: 'chromosome', 
    x: cells[4].x - 10,
    y: cells[4].y + 30,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'paternal recombinant',
    name: 'small double recombinant',
  },
  {
    type: 'chromosome', 
    x: cells[4].x + 15,
    y: cells[4].y - 50,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'maternal recombinant',
    name: 'large bottom double recombinant',
  },
  {
    type: 'chromosome', 
    x: cells[4].x + 45,
    y: cells[4].y -10,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'paternal recombinant',
    name: 'large bottom double recombinant',
  },
];

const chromosomesCell6 = [
  {
    type: 'chromosome', 
    x: cells[5].x - 20,
    y: cells[5].y + 10,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'paternal recombinant',
    name: 'small double recombinant',
  },
  {
    type: 'chromosome', 
    x: cells[5].x + 25,
    y: cells[5].y - 25,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'maternal recombinant',
    name: 'large bottom double recombinant',
  },
];

const chromosomesCell7 = [
  {
    type: 'chromosome', 
    x: cells[6].x - 20,
    y: cells[6].y + 10,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'maternal recombinant',
    name: 'small double recombinant',
  },
  {
    type: 'chromosome', 
    x: cells[6].x + 25,
    y: cells[6].y - 25,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'paternal recombinant',
    name: 'large bottom double recombinant',
  },
];

const chromosomesCell8 = [
  {
    type: 'chromosome', 
    x: cells[7].x - 20,
    y: cells[7].y,
    size: 'small', 
    arms: ['top right', 'bottom right'],
    origin: 'paternal recombinant',
    name: 'small single recombinant',
  },
  {
    type: 'chromosome', 
    x: cells[7].x + 25,
    y: cells[7].y - 20,
    size: 'large', 
    arms: ['bottom left'],
    origin: 'maternal recombinant',
    name: 'large bottom single recombinant',
  },
];

const chromosomesCell9 = [
  {
    type: 'chromosome', 
    x: cells[8].x - 10,
    y: cells[8].y,
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'paternal recombinant',
    name: 'small single recombinant',
  },
  {
    type: 'chromosome', 
    x: cells[8].x + 20,
    y: cells[8].y - 25,
    size: 'large', 
    arms: ['bottom right'],
    origin: 'maternal recombinant',
    name: 'large bottom single recombinant',
  },
];

const chromosomesCell10 = [
  {
    type: 'chromosome', 
    x: cells[9].x - 20,
    y: cells[9].y,
    size: 'small', 
    arms: ['top right', 'bottom right'],
    origin: 'maternal recombinant',
    name: 'small single recombinant',
  },
  {
    type: 'chromosome', 
    x: cells[9].x + 25,
    y: cells[9].y - 20,
    size: 'large', 
    arms: ['bottom left'],
    origin: 'paternal recombinant',
    name: 'large bottom single recombinant',
  },
];

const chromosomesCell11 = [
  {
    type: 'chromosome', 
    x: cells[10].x - 10,
    y: cells[10].y,
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'maternal recombinant',
    name: 'small single recombinant',
  },
  {
    type: 'chromosome', 
    x: cells[10].x + 20,
    y: cells[10].y - 25,
    size: 'large', 
    arms: ['bottom right'],
    origin: 'paternal recombinant',
    name: 'large bottom single recombinant',
  },
];

const phases = [
  {
    type: 'phases',
    x: 100,
    y: 30,
    text: `Fertilization`,
    name: 'fertilization'
  },
  {
    type: 'phases',
    x: 315,
    y: 65,
    text: 'DNA replication',
    name: 'DNA replication'
  },
  {
    type: 'phases',
    x: 460,
    y: 200,
    text: 'Crossing over',
    name: 'crossing over'
  },
  {
    type: 'phases',
    x: 310,
    y: 360,
    text: 'Meiosis I',
    name: 'meiosis 1'
  },
  {
    type: 'phases',
    x: 110,
    y: 285,
    text: 'Meiosis II',
    name: 'meiosis 2'
  },
  {
    type: 'phases',
    x: 495,
    y: 285,
    text: 'Meiosis II',
    name: 'meiosis 2'
  },
];

const phases2 = [
  {
    type: 'phases',
    x: 320,
    y: 40,
    text: `Fertilization`,
    name: 'fertilization'
  },
  {
    type: 'phases',
    x: 320,
    y: 40,
    text: 'DNA replication',
    name: 'DNA replication'
  },
  {
    type: 'phases',
    x: 320,
    y: 40,
    text: 'Crossing over',
    name: 'crossing over'
  },
  {
    type: 'phases',
    x: 320,
    y: 40,
    text: 'Meiosis I',
    name: 'meiosis 1'
  },
  {
    type: 'phases',
    x: 320,
    y: 40,
    text: 'Meiosis II',
    name: 'meiosis 2'
  },
  {
    type: 'phases',
    x: 320,
    y: 40,
    text: 'Meiosis II',
    name: 'meiosis 2'
  },
];

const phaseBoxes = [
  {
    type: 'box',
    x: 120,
    y: 10,
    width: 60,
    height: 30,
    name: 'fertilization'
  },
  {
    type: 'box',
    x: 350,
    y: 40,
    width: 60,
    height: 30,
    name: 'DNA replication'
  },
  {
    type: 'box',
    x: 465,
    y: 185,
    width: 60,
    height: 30,
    name: 'crossing over'
  },
  {
    type: 'box',
    x: 310,
    y: 340,
    width: 80,
    height: 30,
    name: 'meiosis 1'
  },
  {
    type: 'box',
    x: 110,
    y: 270,
    width: 60,
    height: 30,
    name: 'meiosis 2'
  },
  {
    type: 'box',
    x: 520,
    y: 265,
    width: 60,
    height: 30,
    name: 'meiosis 2'
  },
];

const phasesDraggable = [
  {
    type: 'phases',
    x: 760,
    y: 120,
    text: 'Crossing over',
    initialX: 760,
    initialY: 120,
    width: 250,
    height: 20,
    isDragging: false,
    name: 'crossing over'
  },
  {
    type: 'phases',
    x: 760,
    y: 168,
    text: 'DNA replication',
    initialX: 760,
    initialY: 168,
    width: 250,
    height: 20,
    isDragging: false,
    name: 'DNA replication'
  },
  {
    type: 'phases',
    x: 760,
    y: 217,
    text: 'Fertilization',
    initialX: 760,
    initialY: 217,
    width: 250,
    height: 20,
    isDragging: false,
    name: 'fertilization'
  },
  {
    type: 'phases',
    x: 760,
    y: 265,
    text: 'Meiosis I',
    initialX: 760,
    initialY: 265,
    width: 250,
    height: 20,
    isDragging: false,
    name: 'meiosis 1'
  },
  {
    type: 'phases',
    x: 760,
    y: 313,
    text: 'Meiosis II',
    initialX: 760,
    initialY: 313,
    width: 250,
    height: 20,
    isDragging: false,
    name: 'meiosis 2'
  },
]

const cellA = [{ type: 'cell', x: 250, y:200, r: 80 }];
const cellB = [{ type: 'cell', x: 500, y:200, r: 80 }];
const cellC = [{ type: 'cell', x: 500, y:100, r: 80 }];
const cellD = [{ type: 'cell', x: 500, y:300, r: 80 }];
const cellA1 = [{ type: 'cell', x: 250, y:100, r: 60 }];
const cellA2 = [{ type: 'cell', x: 250, y:300, r: 60 }];

const arrowA = [{  type: 'arrow', fromx: 340, fromy: 200, tox: 400, toy: 200, }];
const arrowM = [
  {  type: 'arrow', fromx: 340, fromy: 200, tox: 400, toy: 100, },
  {  type: 'arrow', fromx: 340, fromy: 200, tox: 400, toy: 300, },
];
const arrowF = [
  {  type: 'arrow', fromx: 320, fromy: 120, tox: 400, toy: 190, },
  {  type: 'arrow', fromx: 320, fromy: 280, tox: 400, toy: 210, },
];

const chromosomeCellASingle = [
  {
    type: 'chromosome', 
    x: cellA[0].x - 30,
    y: cellA[0].y -20,
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'maternal',
    name: 'small single maternal',
  },
  {
    type: 'chromosome', 
    x: cellA[0].x - 5,
    y: cellA[0].y + 15,
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'paternal',
    name: 'small single paternal',
  },
  {
    type: 'chromosome', 
    x: cellA[0].x + 20,
    y: cellA[0].y -40,
    size: 'large', 
    arms: ['bottom left'],
    origin: 'maternal',
    name: 'large bottom single maternal',
  },
  {
    type: 'chromosome', 
    x: cellA[0].x + 45,
    y: cellA[0].y -5,
    size: 'large', 
    arms: ['bottom left'],
    origin: 'paternal',
    name: 'large bottom single paternal',
  },
]

const chromosomeCellAReplicated = [
  {
    type: 'chromosome', 
    x: cellA[0].x - 40,
    y: cellA[0].y -15,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'maternal',
    name: 'small double maternal'
  },
  {
    type: 'chromosome', 
    x: cellA[0].x - 10,
    y: cellA[0].y + 30,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'paternal',
    name: 'small double paternal'
  },
  {
    type: 'chromosome', 
    x: cellA[0].x + 15,
    y: cellA[0].y - 50,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'maternal',
    name: 'large bottom double maternal',
  },
  {
    type: 'chromosome', 
    x: cellA[0].x + 45,
    y: cellA[0].y -10,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'paternal',
    name: 'large bottom double paternal',
  },
]

const chromosomeCellACrossed = [
  {
    type: 'chromosome', 
    x: cellA[0].x - 40,
    y: cellA[0].y -15,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'maternal recombinant',
    name: 'small double recombinant'
  },
  {
    type: 'chromosome', 
    x: cellA[0].x - 10,
    y: cellA[0].y + 30,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'paternal recombinant',
    name: 'small double recombinant'
  },
  {
    type: 'chromosome', 
    x: cellA[0].x + 15,
    y: cellA[0].y - 50,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'maternal recombinant',
    name: 'large bottom double recombinant'
  },
  {
    type: 'chromosome', 
    x: cellA[0].x + 45,
    y: cellA[0].y -10,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'paternal recombinant',
    name: 'large bottom double recombinant'
  },
];

const chromosomeCellAM1 = [
  {
    type: 'chromosome', 
    x: cellA[0].x - 20,
    y: cellA[0].y + 10,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'maternal recombinant',
    name: 'small double recombinant'
  },
  {
    type: 'chromosome', 
    x: cellA[0].x + 25,
    y: cellA[0].y - 25,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'paternal recombinant',
    name: 'large bottom double recombinant'
  },
];

const chromosomeCellA1 = [
  {
    type: 'chromosome', 
    x: cellA1[0].x -10,
    y: cellA1[0].y -5, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'maternal',
    name: 'small single maternal',
  },
  {
    type: 'chromosome', 
    x: cellA1[0].x + 20,
    y: cellA1[0].y -15,
    size: 'large', 
    arms: ['bottom left'],
    origin: 'maternal',
    name: 'large bottom single maternal',
  },
]

const chromosomeCellA2 = [
  {
    type: 'chromosome', 
    x: cellA2[0].x -10,
    y: cellA2[0].y -5, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'paternal',
    name: 'small single paternal',
  },
  {
    type: 'chromosome', 
    x: cellA2[0].x + 20,
    y: cellA2[0].y -15,
    size: 'large', 
    arms: ['bottom left'],
    origin: 'paternal',
    name: 'large bottom single paternal',
  },
]

const chromosomeCellBSingle = [
  {
    type: 'chromosome', 
    x: cellB[0].x - 30,
    y: cellB[0].y -20,
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'maternal',
    name: 'small single maternal'
  },
  {
    type: 'chromosome', 
    x: cellB[0].x - 5,
    y: cellB[0].y + 15,
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'paternal',
    name: 'small single paternal'
  },
  {
    type: 'chromosome', 
    x: cellB[0].x + 20,
    y: cellB[0].y -40,
    size: 'large', 
    arms: ['bottom left'],
    origin: 'maternal',
    name: 'large bottom single maternal',
  },
  {
    type: 'chromosome', 
    x: cellB[0].x + 45,
    y: cellB[0].y -5,
    size: 'large', 
    arms: ['bottom left'],
    origin: 'paternal',
    name: 'large bottom single paternal'
  },
]

const chromosomeCellBReplicated = [
  {
    type: 'chromosome', 
    x: cellB[0].x - 40,
    y: cellB[0].y -15,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'maternal',
    name: 'small double maternal'
  },
  {
    type: 'chromosome', 
    x: cellB[0].x - 10,
    y: cellB[0].y + 30,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'paternal',
    name: 'small double paternal'
  },
  {
    type: 'chromosome', 
    x: cellB[0].x + 15,
    y: cellB[0].y - 50,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'maternal',
    name: 'large bottom double maternal'
  },
  {
    type: 'chromosome', 
    x: cellB[0].x + 45,
    y: cellB[0].y -10,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'paternal',
    name: 'large bottom double paternal'
  },
]

const chromosomeCellBCrossed = [
  {
    type: 'chromosome', 
    x: cellB[0].x - 40,
    y: cellB[0].y -15,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'maternal recombinant',
    name: 'small double recombinant',
  },
  {
    type: 'chromosome', 
    x: cellB[0].x - 10,
    y: cellB[0].y + 30,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'paternal recombinant',
    name: 'small double recombinant',
  },
  {
    type: 'chromosome', 
    x: cellB[0].x + 15,
    y: cellB[0].y - 50,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'maternal recombinant',
    name: 'large bottom double recombinant',
  },
  {
    type: 'chromosome', 
    x: cellB[0].x + 45,
    y: cellB[0].y -10,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'paternal recombinant',
    name: 'large bottom double recombinant',
  },
];

const chromosomeCellCM1 = [
  {
    type: 'chromosome', 
    x: cellC[0].x - 20,
    y: cellC[0].y + 10,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'paternal recombinant',
    name: 'small double recombinant',
  },
  {
    type: 'chromosome', 
    x: cellC[0].x + 25,
    y: cellC[0].y - 25,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'maternal recombinant',
    name: 'large bottom double recombinant',
  },
]

const chromosomeCellDM1 = [
  {
    type: 'chromosome', 
    x: cellD[0].x - 20,
    y: cellD[0].y + 10,
    size: 'small', 
    arms: ['top left', 'bottom left', 'top right', 'bottom right'],
    origin: 'maternal recombinant',
    name: 'small double recombinant',
  },
  {
    type: 'chromosome', 
    x: cellD[0].x + 25,
    y: cellD[0].y - 25,
    size: 'large', 
    arms: ['bottom left', 'bottom right'],
    origin: 'paternal recombinant',
    name: 'large bottom double recombinant',
  },
];

const chromosomeCellCM2 = [
  {
    type: 'chromosome', 
    x: cellC[0].x - 20,
    y: cellC[0].y,
    size: 'small', 
    arms: ['top right', 'bottom right'],
    origin: 'maternal recombinant',
    name: 'small single recombinant'
  },
  {
    type: 'chromosome', 
    x: cellC[0].x + 25,
    y: cellC[0].y - 20,
    size: 'large', 
    arms: ['bottom left'],
    origin: 'paternal recombinant',
    name: 'large bottom single recombinant'
  },
];

const chromosomeCellDM2 = [
  {
    type: 'chromosome', 
    x: cellD[0].x - 10,
    y: cellD[0].y,
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'maternal recombinant',
    name: 'small single recombinant'
  },
  {
    type: 'chromosome', 
    x: cellD[0].x + 20,
    y: cellD[0].y - 25,
    size: 'large', 
    arms: ['bottom right'],
    origin: 'paternal recombinant',
    name: 'large bottom single recombinant'
  },
];

const draggableChromosomes = [
  {
    type: 'chromosome', 
    x: 760,
    y: 140, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'maternal',
    initialX: 760,
    initialY: 140,
    width: 30,
    height: 120,
    isDragging: false,
    name: 'small single maternal',
  },
  {
    type: 'chromosome', 
    x: 820, 
    y: 120, 
    size: 'large', 
    arms: ['bottom left'],
    origin: 'maternal',
    initialX: 820,
    initialY: 120,
    width: 30,
    height: 120,
    isDragging: false,
    name: 'large bottom single maternal',
  },
  {
    type: 'chromosome', 
    x: 880,
    y: 140, 
    size: 'small', 
    origin: 'maternal',
    arms: ['top left', 'bottom left', 'bottom right', 'top right'],
    initialX: 880,
    initialY: 140,
    width: 60,
    height: 60,
    isDragging: false,
    name: 'small double maternal',
  },
  {
    type: 'chromosome', 
    x: 940, 
    y: 120, 
    size: 'large', 
    arms: ['bottom left', 'bottom right',],
    origin: 'maternal',
    initialX: 940,
    initialY: 120,
    width: 60,
    height: 120,
    isDragging: false,
    name: 'large bottom double maternal',
  },
  //
  {
    type: 'chromosome', 
    x: 760,
    y: 230, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'paternal',
    initialX: 760,
    initialY: 230,
    width: 30,
    height: 120,
    isDragging: false,
    name: 'small single paternal',
  },
  {
    type: 'chromosome', 
    x: 820, 
    y: 210, 
    size: 'large', 
    arms: ['bottom left'],
    origin: 'paternal',
    initialX: 820,
    initialY: 210,
    width: 30,
    height: 120,
    isDragging: false,
    name: 'large bottom single paternal',
  },
  {
    type: 'chromosome', 
    x: 880,
    y: 230, 
    size: 'small', 
    origin: 'paternal',
    arms: ['top left', 'bottom left', 'bottom right', 'top right'],
    initialX: 880,
    initialY: 230,
    width: 60,
    height: 60,
    isDragging: false,
    name: 'small double paternal',
  },
  {
    type: 'chromosome', 
    x: 940, 
    y: 210, 
    size: 'large', 
    arms: ['bottom left', 'bottom right',],
    origin: 'paternal',
    initialX: 940,
    initialY: 210,
    width: 60,
    height: 120,
    isDragging: false,
    name: 'large bottom double paternal',
  },
  //
  {
    type: 'chromosome', 
    x: 760,
    y: 320, 
    size: 'small', 
    arms: ['top left', 'bottom left'],
    origin: 'maternal recombinant',
    initialX: 760,
    initialY: 320,
    width: 30,
    height: 120,
    isDragging: false,
    name: 'small single recombinant',
  },
  {
    type: 'chromosome', 
    x: 820, 
    y: 300, 
    size: 'large', 
    arms: ['bottom left'],
    origin: 'paternal recombinant',
    initialX: 820,
    initialY: 300,
    width: 30,
    height: 120,
    isDragging: false,
    name: 'large bottom single recombinant',
  },
  {
    type: 'chromosome', 
    x: 880,
    y: 320, 
    size: 'small', 
    origin: 'maternal recombinant',
    arms: ['top left', 'bottom left', 'bottom right', 'top right'],
    initialX: 880,
    initialY: 320,
    width: 60,
    height: 60,
    isDragging: false,
    name: 'small double recombinant',
  },
  {
    type: 'chromosome', 
    x: 940, 
    y: 300, 
    size: 'large', 
    arms: ['bottom left', 'bottom right',],
    origin: 'paternal recombinant',
    initialX: 940,
    initialY: 300,
    width: 60,
    height: 120,
    isDragging: false,
    name: 'large bottom double recombinant',
  },
]

const stateOptions = [
  // option for level 1
  {
    fixtures:cells.concat(arrows).concat(chromosomesCell1).concat(chromosomesCell2).concat(chromosomesCell3).concat(chromosomesCell4).concat(chromosomesCell5).concat(chromosomesCell6).concat(chromosomesCell7).concat(chromosomesCell8).concat(chromosomesCell9).concat(chromosomesCell10).concat(chromosomesCell11),
    draggables: phasesDraggable,
    targets: phaseBoxes,
    futureFixtures: phases,
    question: 'Drag each process to its corresponding grey box',
    maxCount: phasesDraggable.length * 2 -2,
  },
  // optiond for level 2
  { 
    fixtures: cellA1.concat(cellA2).concat(cellB).concat(arrowF).concat(chromosomeCellA1).concat(chromosomeCellA2).concat(chromosomeCellBSingle),
    draggables: phasesDraggable,
    targets: [{ type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'fertilization'}],
    futureFixtures: phases2,
    question: 'The diagram shows the cell at the begining and at the end of a process. Drag the corresponding process to the grey box',
    maxCount: 6,
  },
  { // options for level 2
    fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellASingle).concat(chromosomeCellBReplicated),
    draggables: phasesDraggable,
    targets: [{ type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'DNA replication'}],
    futureFixtures: phases2,
    question: 'The diagram shows the cell at the begining and at the end of a process. Drag the corresponding process to the grey box',
    maxCount: 6,
  },
  { // options for level 2
    fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellAReplicated).concat(chromosomeCellBCrossed),
    draggables: phasesDraggable,
    targets: [{ type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'crossing over'}],
    futureFixtures: phases2,
    question: 'The diagram shows the cell at the begining and at the end of a process. Drag the corresponding process to the grey box',
    maxCount: 6,
  },
  {
    fixtures: cellA.concat(cellC).concat(cellD).concat(arrowM).concat(chromosomeCellACrossed).concat(chromosomeCellCM1).concat(chromosomeCellDM1),
    draggables: phasesDraggable,
    targets: [{ type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'meiosis 1'}],
    futureFixtures: phases2,
    question: 'The diagram shows the cell at the begining and at the end of a process. Drag the corresponding process to the grey box',
    maxCount: 6,
  },
  {
    fixtures: cellA.concat(cellC).concat(cellD).concat(arrowM).concat(chromosomeCellAM1).concat(chromosomeCellCM2).concat(chromosomeCellDM2),
    draggables: phasesDraggable,
    targets: [{ type: 'box', x: 70, y: 5, width: 550, height: 410, name: 'meiosis 2'}],
    futureFixtures: phases2,
    question: 'The diagram shows the cell at the begining and at the end of a process. Drag the corresponding process to the grey box',
    maxCount: 6,
  },
  // level 3: drag the chromosomes to each cell 
  {
    fixtures: cellA.concat(cellC).concat(cellD).concat(arrowM).concat(chromosomeCellAM1).concat(phases2[4]),
    draggables: draggableChromosomes,
    targets: [{ type: 'box', x: 70, y: 5, width: 550, height: 410, name: 'large bottom single recombinant'},
              { type: 'box', x: 70, y: 5, width: 550, height: 410, name: 'small single recombinant'},],
    futureFixtures: chromosomeCellCM2.concat(chromosomeCellDM2),
    question: 'Drag the chromosomes that these cells would have at the end of Meiosis II',
    maxCount: 8,
  }, // L3 Meiosis I
  {
    fixtures: cellA.concat(cellC).concat(cellD).concat(arrowM).concat(chromosomeCellACrossed).concat(phases2[3]),
    draggables: draggableChromosomes,
    targets: [{ type: 'box', x: 70, y: 5, width: 550, height: 410, name: 'large bottom double recombinant'},
              { type: 'box', x: 70, y: 5, width: 550, height: 410, name: 'small double recombinant'},],
    futureFixtures: chromosomeCellCM1.concat(chromosomeCellDM1),
    question: 'Drag the chromosomes that these cells would have at the end of Meiosis I',
    maxCount: 8,
  },
  // L3 DNA replication
  {
    fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellASingle).concat(phases2[1]),
    draggables: draggableChromosomes,
    targets: [{ type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'large bottom double paternal'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'large bottom double maternal'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'small double paternal'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'small double maternal'},],
    futureFixtures: chromosomeCellBReplicated,
    question: 'Drag the chromosomes that this cell would have at the end of DNA replication',
    maxCount: 8,
  },
  // L3 crossing over
  {
    fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellAReplicated).concat(phases2[2]),
    draggables: draggableChromosomes,
    targets: [{ type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'large bottom double recombinant'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'large bottom double recombinant'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'small double recombinant'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'small double recombinant'},],
    futureFixtures: chromosomeCellBCrossed,
    question: 'Drag the chromosomes that this cell would have after Crossing over',
    maxCount: 8,
  },
  // L3 fertilization
  {
    fixtures: cellA1.concat(cellA2).concat(cellB).concat(arrowF).concat(chromosomeCellA1).concat(chromosomeCellA2).concat(phases2[0]),
    draggables: draggableChromosomes,
    targets: [{ type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'large bottom single maternal'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'large bottom single paternal'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'small single maternal'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'small single paternal'},],
    futureFixtures: chromosomeCellBSingle,
    question: 'Drag the chromosomes that this cell would have after Fertilization',
    maxCount: 8,
  },
  // level 4: how was the cell before a given process
  {
    fixtures: cellA1.concat(cellA2).concat(cellB).concat(arrowF).concat(chromosomeCellBSingle).concat(phases2[0]),
    draggables: draggableChromosomes,
    targets: [{ type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'large bottom single maternal'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'large bottom single paternal'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'small single maternal'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'small single paternal'},],
    futureFixtures: chromosomeCellA1.concat(chromosomeCellA2),
    question: 'Drag the chromosomes that these cells have before Fertilization',
    maxCount: 8,
  },
    // L4 crossing over
    {
      fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellBCrossed).concat(phases2[2]),
      draggables: draggableChromosomes,
      targets: [{ type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'large bottom double maternal'},
                { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'large bottom double paternal'},
                { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'small double maternal'},
                { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'small double paternal'},],
      futureFixtures: chromosomeCellAReplicated,
      question: 'Drag the chromosomes that this cell had before Crossing over',
      maxCount: 8,
    },
     // L4 DNA replication
  {
    fixtures: cellA.concat(cellB).concat(arrowA).concat(chromosomeCellBReplicated).concat(phases2[1]),
    draggables: draggableChromosomes,
    targets: [{ type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'large bottom single paternal'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'large bottom single maternal'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'small single paternal'},
              { type: 'box', x: 70, y: 10, width: 550, height: 400, name: 'small single maternal'},],
    futureFixtures: chromosomeCellASingle,
    question: 'Drag the chromosomes that this cell had before DNA replication',
    maxCount: 8,
  },// L4 Meiosis I
  {
    fixtures: cellA.concat(cellC).concat(cellD).concat(arrowM).concat(chromosomeCellCM1).concat(chromosomeCellDM1).concat(phases2[3]),
    draggables: draggableChromosomes,
    targets: [{ type: 'box', x: 70, y: 5, width: 550, height: 410, name: 'large bottom double recombinant'},
              { type: 'box', x: 70, y: 5, width: 550, height: 410, name: 'small double recombinant'},],
    futureFixtures: chromosomeCellACrossed,
    question: 'Drag the chromosomes that this cell had before Meiosis I',
    maxCount: 8,
  }, // L4 Meiosis II
  {
    fixtures: cellA.concat(cellC).concat(cellD).concat(arrowM).concat(chromosomeCellCM2).concat(chromosomeCellDM2).concat(phases2[4]),
    draggables: draggableChromosomes,
    targets: [{ type: 'box', x: 70, y: 5, width: 550, height: 410, name: 'large bottom double recombinant'},
              { type: 'box', x: 70, y: 5, width: 550, height: 410, name: 'small double recombinant'},],
    futureFixtures: chromosomeCellAM1,
    question: 'Drag the chromosomes that this cell had before Meiosis II',
    maxCount: 8,
  },
  // Level 5 entire diagram
  {
    fixtures:cells.concat(arrows).concat(phases),
    draggables: draggableChromosomes,
    targets: [
    { type: 'box', x: 10, y: 5, width: 100, height: 210, name: 'large bottom single maternal', id: 'cell 1 & 2'},
    { type: 'box', x: 10, y: 5, width: 100, height: 210, name: 'large bottom single paternal', id: 'cell 1 & 2'},
    { type: 'box', x: 10, y: 5, width: 100, height: 210, name: 'small single maternal', id: 'cell 2 & 1'},
    { type: 'box', x: 10, y: 5, width: 100, height: 210, name: 'small single paternal', id: 'cell 2 & 1'},
    { type: 'box', x: 175, y: 10, width: 155, height: 155, name: 'small single maternal', id: 'cell 3'},
    { type: 'box', x: 175, y: 10, width:155, height:155, name: 'small single paternal', id: 'cell 3'},
    { type: 'box', x: 175, y: 10, width:155, height:155, name: 'large bottom single maternal', id: 'cell 3'},
    { type: 'box', x: 175, y: 10, width:155, height:155, name: 'large bottom single paternal', id: 'cell 3'},
    { type: 'box', x: 455, y: 15, width: 175, height: 175, name: 'large bottom double maternal', id: 'cell 4'},
    { type: 'box', x: 455, y: 15, width: 175, height: 175, name: 'large bottom double paternal', id: 'cell 4'},
    { type: 'box', x: 455, y: 15, width: 175, height: 175, name: 'small double maternal', id: 'cell 4'},
    { type: 'box', x: 455, y: 15, width: 175, height: 175, name: 'small double paternal', id: 'cell 4'},
    { type: 'box', x: 265, y: 155, width: 175, height: 175, name: 'small double recombinant', id: 'cell 5'},
    { type: 'box', x: 265, y: 155, width: 175, height: 175, name: 'small double recombinant', id: 'cell 5'},
    { type: 'box', x: 265, y: 155, width: 175, height: 175, name: 'large bottom double recombinant', id: 'cell 5'},
    { type: 'box', x: 265, y: 155, width: 175, height: 175, name: 'large bottom double recombinant', id: 'cell 5'},
    { type: 'box', x: 145, y: 285, width: 135, height: 135, name: 'large bottom double recombinant', id: 'cell 6'},
    { type: 'box', x: 145, y: 285, width: 135, height: 135, name: 'small double recombinant', id: 'cell 6'},
    { type: 'box', x: 425, y: 285, width: 135, height: 135, name: 'large bottom double recombinant', id: 'cell 7'},
    { type: 'box', x: 425, y: 285, width: 135, height: 135, name: 'small double recombinant', id: 'cell 7'},
    { type: 'box', x: 10, y: 240, width: 100, height: 205, name: 'small single recombinant', id: 'cell 8 & 9'},
    { type: 'box', x: 10, y: 240, width: 100, height: 205, name: 'large bottom single recombinant', id: 'cell 8 & 9'},
    { type: 'box', x: 580, y: 240, width: 100, height: 205, name: 'small single recombinant', id: 'cell 10 & 11'},
    { type: 'box', x: 580, y: 240, width: 100, height: 205, name: 'large bottom single recombinant', id: 'cell 10 & 11'},
  ],
    futureFixtures: chromosomesCell1.concat(chromosomesCell2).concat(chromosomesCell3).concat(chromosomesCell4).concat(chromosomesCell5).concat(chromosomesCell6).concat(chromosomesCell7).concat(chromosomesCell8).concat(chromosomesCell9).concat(chromosomesCell10).concat(chromosomesCell11),
    question: 'Drag the corresponding chromosomes to each cell',
    maxCount: 10,
  },

]

export {stateOptions}
