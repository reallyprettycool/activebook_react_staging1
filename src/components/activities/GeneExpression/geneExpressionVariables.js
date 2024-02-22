const proteinsDraggable = [
  {
    type: 'activator', 
    x: 920,
    y: 10, 
    initialX: 920,
    initialY: 10,
    targetX: 200,
    targetY: 360,
    width: 80,
    height: 40,
    isDragging: false,
    name: 'activator',
  },
  {
    type: 'polymerase', 
    x: 910,
    y: 100, 
    initialX: 910,
    initialY: 100,
    targetX: 300,
    targetY: 270,
    width: 100,
    height: 95,
    isDragging: false,
    name: 'polymerase',
  },
  {
    type: 'repressor', 
    x: 920,
    y: 215, 
    initialX: 920,
    initialY: 215,
    targetX: 415,
    targetY: 280,
    width: 80,
    height: 60,
    isDragging: false,
    name: 'repressor',
  },
  {
    type: 'ribosome', 
    x: 910,
    y: 320, 
    rotation: false,
    initialX: 910,
    initialY: 320,
    targetX: 370,
    targetY: 120,
    width: 100,
    height: 95,
    isDragging: false,
    name: 'ribosome',
  },
];

const proteinsFixtures = [
  {
    type: 'activator', 
    x: 200,
    y: 360, 
    name: 'activator',
  },
  {
    type: 'polymerase', 
    x: 300,
    y: 270, 
    vx: 2,
    name: 'polymerase',
  },
  {
    type: 'repressor', 
    x: 415,
    y: 280, 
    name: 'repressor',
  },
  {
    type: 'ribosome', 
    x: 370,
    y: 120,
    rotation: false, 
    name: 'ribosome',
  },
  {
    type: 'polymerase', 
    x: 800,
    y: 270, 
    vx: 2,
    name: 'polymerase after transcription',
  },
  {
    type: 'ribosome', 
    x: 450, // 450, ribosome at the top of translation // 480 half way through transcription
    y: 88, // 100, ribosome at the top of translation // 188 half way through transcription
    rotation: true, 
    vx: 1,
    name: 'ribosome',
  },
];

const otherFixtures = [
  {
    type: 'rna',
    fromX: 500,
    fromY: 115,
    toX: 800,
    toY: 340,
  },
  {
    type: 'rna', // rna half way through transcription
    fromX: 500,
    fromY: 224.5,
    toX: 654,
    toY: 340,
  }
];

const processesDraggable = [
  {
    type: 'text',
    name: 'Drag',
    text: 'Drag from here:',
    x: 890,
    y: 50,
  },
  {
    type: 'text',
    name: 'DNA replication',
    text: 'DNA replication',
    x: 890,
    y: 100,
    initialX: 890,
    initialY: 100,
    width: 100,
    height: 40,
    isDragging: false,
  },
  {
    type: 'text',
    name: 'gene expression',
    text: 'Gene expression',
    x: 890,
    y: 150,
    initialX: 890,
    initialY: 150,
    width: 100,
    height: 40,
    isDragging: false,
  },
  {
    type: 'text',
    name: 'transcription',
    text: 'Transcription',
    x: 890,
    y: 200,
    initialX: 890,
    initialY: 200,
    width: 100,
    height: 40,
    isDragging: false,
  },
  {
    type: 'text',
    name: 'translation',
    text: 'Translation',
    x: 890,
    y: 250,
    initialX: 890,
    initialY: 250,
    width: 100,
    height: 40,
    isDragging: false,
  },
];

const processesFixtures = [
  {
    type: 'text',
    name: 'transcription',
    text: 'Transcription',
    x: 300,
    y: 70,
  },
  {
    type: 'text',
    name: 'translation',
    text: 'Translation',
    x: 300,
    y: 70,
  },
  {
    type: 'text',
    name: 'gene expression',
    text: 'Gene Expression',
    x: 300,
    y: 30,
  },
];

const monomersDraggable = [
  {
    type: 'text', 
    text: 'DNA nucleotides', 
    x: 890,
    y: 110, 
  },
  {
    type: 'draggableMonomers', 
    x: 920,
    y: 110, 
    initialX: 920,
    initialY: 110,
    width: 80,
    height: 80,
    isDragging: false,
    name: 'DNA nucleotides',
    color: ['#8c61df', '#cb61df', '#6175df', '#baa1ec', '#8c61df', '#cb61df', '#6175df', '#baa1ec'],
    xArray: [50,	76,	42,	69,	38,	61,	19,	12], 
    yArray: [32,	17,	11,	42,	51,	13,	45,	19], 
  },
  {
    type: 'text', 
    text: 'RNA nucleotides', 
    x: 890,
    y: 220, 
  },
  {
    type: 'draggableMonomers', 
    x: 920,
    y: 220, 
    initialX: 920,
    initialY: 220,
    width: 80,
    height: 80,
    isDragging: false,
    name: 'RNA nucleotides',
    color: ['#50ddc4', '#3caee5', '#3c5ae5', '#3ce5c8','#50ddc4', '#3caee5', '#3c5ae5', '#3ce5c8'],
    xArray: [29,	12,	54,	60,	41,	31,	15,	67], 
    yArray: [12,	27,	53,	25,	39,	32,	45,	48], 
  },
  {
    type: 'text', 
    text: 'Aminoacids', 
    x: 920,
    y: 340, 
  },
  {
    type: 'draggableMonomers', 
    x: 920,
    y: 340, 
    initialX: 920,
    initialY: 340,
    width: 80,
    height: 80,
    isDragging: false,
    name: 'aminoacids',
    color: ['#ffd4e5', '#d4ffea', '#eecbff', '#feffa3', '#dbdcff', '#3ce5c8', '#baa1ec', '#3caee5' ],
    xArray: [11, 22, 36, 18, 57, 75, 43, 80] , 
    yArray: [64, 22, 63, 42, 20, 49, 36, 28] , 
  },
]

const monomerFixtures = [
  {
    type: 'text', 
    text: 'RNA nucleotides', 
    x: 890,
    y: 110, 
  },
  {
    type: 'draggableMonomers', 
    x: 920,
    y: 110, 
    name: 'RNA nucleotides',
    color: ['#50ddc4', '#3caee5', '#3c5ae5', '#3ce5c8','#50ddc4', '#3caee5', '#3c5ae5', '#3ce5c8'],
    xArray: [29,	12,	54,	60,	41,	31,	15,	67], 
    yArray: [12,	27,	53,	25,	39,	32,	45,	48], 
  },
  {
    type: 'text', 
    text: 'Aminoacids', 
    x: 920,
    y: 340, 
  },
  {
    type: 'draggableMonomers', 
    x: 920,
    y: 340, 
    name: 'aminoacids',
    color: ['#ffd4e5', '#d4ffea', '#eecbff', '#feffa3', '#dbdcff', '#3ce5c8', '#baa1ec', '#3caee5' ],
    xArray: [11, 22, 36, 18, 57, 75, 43, 80] , 
    yArray: [64, 22, 63, 42, 20, 49, 36, 28] , 
  },
]

const spawnMolecules = (qty, type, colors) => {
  let moleculeArray = [];
  for (let i = 0; i < qty; i++) {
    const theX = 10+ (Math.random()*840); // between 10 - 850
    const theY = 50 + (Math.random()*250); // between 50 - 300
    const angle = Math.random()*2*Math.PI;
    const direction = [Math.cos(angle), Math.sin(angle)];
    moleculeArray.push({
      x: theX,
      y: theY,
      vx: 2 * direction[0],
      vy: 2 * direction[1],
      radius: 3,
      color:colors[Math.floor(Math.random() * colors.length)],
      type: type,
      name: 'monomer',
    })
  }
  return moleculeArray
}
const movableRNAnucleotides = spawnMolecules(20, 'RNA nucleotides', ['#50ddc4', '#3caee5', '#3c5ae5', '#3ce5c8']);

const movableAminoacids = spawnMolecules(20, 'aminoacid', ['#ffd4e5', '#d4ffea', '#eecbff', '#feffa3', '#dbdcff', '#3ce5c8', '#baa1ec', '#3caee5' ]);

const stateOptions = [
  {
    feedback: false,
    loopDNA: false,
    fixtures:[],
    question: 'Drag the first process in Gene Expression to the area where it occurs',
    incorrectMessage: `Drag transcription into the cytoplasm, where it occurs in Prokaryotes`,
    draggables: processesDraggable,
    futureFixtures: processesFixtures,
    targets: [{ x: 0, y: 50, width: 870, height: 450, name: 'transcription'},],
  },
  {
    feedback: false,
    loopDNA: false,
    fixtures:[processesFixtures[0]],
    question: 'Drag the proteins that bind to DNA to their target region in the DNA segment',
    incorrectMessage: `Drag: Activator ${String.fromCharCode(8594)} Enhancer region, Repressor ${String.fromCharCode(8594)} Opertor region, and RNA polymerase ${String.fromCharCode(8594)} Promoter region`,
    draggables: proteinsDraggable,
    futureFixtures: proteinsFixtures.slice(0,3), // slice doesn't modify the array, last index not included
    targets: [{ x: 300, y: 200, width: 100, height: 400, name: 'polymerase'},
    { x: 400, y: 200, width: 100, height: 400, name: 'repressor'},
    { x: 190, y: 200, width: 100, height: 400, name: 'activator'},],
  },
  {
    feedback: false,
    loopDNA: false,
    fixtures:[processesFixtures[0]],
    question: 'Drag the protein that would increase Gene Expression to the region where it binds',
    incorrectMessage: `Activators increase the chances of RNA polymerase finding the promoter. Drag the Activator ${String.fromCharCode(8594)} Enhancer region`,
    draggables: proteinsDraggable,
    futureFixtures: proteinsFixtures.slice(0,1), // slice doesn't modify the array, last index not included
    targets: [{ x: 190, y: 200, width: 100, height: 400, name: 'activator'},],
  },
  {
    feedback: false,
    fixtures: [proteinsFixtures[0], processesFixtures[0]],
    loopDNA: true,
    question: 'Drag the enzyme responsible from transcription to the DNA region where it binds',
    incorrectMessage: `Drag RNA polymerase ${String.fromCharCode(8594)} Promoter region`,
    draggables: proteinsDraggable,
    futureFixtures: proteinsFixtures.slice(1,2), // slice doesn't modify the array, last index not included
    targets: [{ x: 300, y: 200, width: 100, height: 400, name: 'polymerase'},],
  },
  {
    feedback: false,
    loopDNA: false,
    fixtures:[processesFixtures[0]],
    question: 'Drag the protein that would stop Gene Expression to the region where it binds',
    incorrectMessage: `Repressors prevent RNA polymerase from reaching the coding region. Drag the Repressor ${String.fromCharCode(8594)} Operator region`,
    draggables: proteinsDraggable,
    futureFixtures: proteinsFixtures.slice(2,3), // slice doesn't modify the array, last index not included
    targets: [{ x: 400, y: 200, width: 100, height: 400, name: 'repressor'},],
  },
  {
    feedback: false,
    loopDNA: false,
    fixtures:[processesFixtures[0]],
    question: 'In order, drag the proteins needed to start to their target region in the DNA segment',
    incorrectMessage: `First drag: Activator to the Enhancer region`,
    draggables: proteinsDraggable,
    futureFixtures: proteinsFixtures.slice(0,1), // slice doesn't modify the array, last index not included
    targets: [{ x: 190, y: 200, width: 100, height: 400, name: 'activator'},],
  },
  {
    feedback: false,
    loopDNA: true,
    fixtures: [proteinsFixtures[0], processesFixtures[0]],
    question: 'In order, drag the proteins needed to start to their target region in the DNA segment',
    incorrectMessage: `Now drag RNA polymerase to the Promoter region`,
    draggables: proteinsDraggable,
    futureFixtures: proteinsFixtures.slice(1,2), // slice doesn't modify the array, last index not included
    targets: [{ x: 300, y: 200, width: 100, height: 400, name: 'polymerase'},],
  },
    {
    feedback: false,
    loopDNA: true,
    fixtures: [proteinsFixtures[0], proteinsFixtures[1], processesFixtures[0]],
    question: 'What else does RNA polymerase need in order to transcribe the DNA?',
    incorrectMessage: `Drag the RNA nucleotides into the cell`,
    draggables: monomersDraggable,
    futureFixtures: [], // monomers 
    targets: [{ x: 6, y: 50, width: 860, height: 450, name: 'RNA nucleotides'},],
  },
  {
    feedback: false,
    animation: true,
    fixtures:proteinsFixtures.slice(0,2).concat([processesFixtures[0]]).concat(monomerFixtures.slice(0,2)),
    loopDNA: true,
    question: 'RNA polymerase is transcribing the coding region of the DNA strand, game will resume afterwards',
    draggables: [],
    incorrectMessage: '',
    futureFixtures: [], // slice doesn't modify the array, last index not included
    targets: [],
    movables: movableRNAnucleotides.concat(proteinsFixtures.slice(1,2)),
  },
  {
    feedback: false,
    loopDNA: true,
    fixtures:[],
    question: 'Drag the next process in Gene Expression to the area where it occurs',
    incorrectMessage: `Drag translation into the cytoplasm, where it occurs in Prokaryotes`,
    draggables: processesDraggable,
    futureFixtures: processesFixtures,
    targets: [{ x: 0, y: 50, width: 870, height: 450, name: 'translation'},],
  },
  {
    feedback: false,
    loopDNA: true,
    animation: false,
    fixtures: [proteinsFixtures[4],otherFixtures[0],processesFixtures[1]] , // proteinsFixtures.slice(0,1).concat(otherFixtures.slice(0,1)),
    question: 'Drag the molecule needed for translation to the region where it will bind',
    incorrectMessage: `Drag Ribosome to the 5' end of the RNA molecule`,
    draggables: proteinsDraggable,
    futureFixtures: proteinsFixtures.slice(5,6), // slice doesn't modify the array, last index not included
    movables: [],
    targets: [{ x: 400, y: 15, width: 250, height: 250, name: 'ribosome'},],
  },
  { /// move amino acids 
    feedback: false,
    loopDNA: true,
    animation: false,
    fixtures: [proteinsFixtures[4],proteinsFixtures[5],otherFixtures[0],processesFixtures[1]] , // proteinsFixtures.slice(0,1).concat(otherFixtures.slice(0,1)),
    question: 'What else does the ribosome need in order to translate the RNA into a protein?',
    incorrectMessage: `Drag the aminoacids into the cell`,
    draggables: monomersDraggable,
    futureFixtures: [], // slice doesn't modify the array, last index not included
    movables: [],
    targets: [{ x: 6, y: 50, width: 860, height: 450, name: 'aminoacids'},],
  },
  { // will have to turn into animation
    feedback: false,
    loopDNA: true,
    animation: true,
    fixtures: [proteinsFixtures[0],otherFixtures[0],processesFixtures[1]].concat(monomerFixtures.slice(2,4)),
    movables: movableAminoacids.concat([proteinsFixtures[5],proteinsFixtures[4]]),
    question: 'The ribosome is translating the RNA, using its information to synthesize a protein',
    incorrectMessage: '',
    draggables: [],
    futureFixtures: [],
    targets: [],
  },
  {
    feedback: false,
    loopDNA: true,
    animation: false,
    futureFixtures: [processesFixtures[2]],
    draggables: processesDraggable,
    question: 'Drag the name of the process that was completed, from DNA to protein',
    incorrectMessage: `Gene expression is the process of transcribing the information in DNA and translating it to make proteins`,
    targets: [{ x: 0, y: 50, width: 870, height: 450, name: 'gene expression'},],
  },
];

export {stateOptions}
