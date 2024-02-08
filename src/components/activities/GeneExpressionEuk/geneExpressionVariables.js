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
    type: 'transcription factor', 
    x: 920,
    y: 215, 
    initialX: 920,
    initialY: 215,
    targetX: 415,
    targetY: 280,
    width: 80,
    height: 60,
    isDragging: false,
    name: 'transcription factor',
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
    y: 370, 
    name: 'activator',
  },
  {
    type: 'polymerase', 
    x: 340,
    y: 250, 
    vx: 2,
    name: 'polymerase',
  },
  {
    type: 'transcription factor', 
    x: 342,
    y: 315, 
    name: 'transcription factor',
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
  { // 5
    type: 'ribosome', 
    x: 450, // 450, ribosome at the top of translation // 480 half way through transcription
    y: 70, // 100, ribosome at the top of translation // 188 half way through transcription
    vx: 1,
    name: 'ribosome',
  },
];

const otherFixtures = [
  {
    type: 'rna',
    fromX: 500,
    fromY: 250,
    toX: 800,
    toY: 250,
  },
  {
    type: 'rna', // rna after splicing
    fromX: 560,
    fromY: 250,
    toX: 740,
    toY: 250,
  },
  {
    type: 'intron',
    x: 740,
    y: 250,
    length: 60,
    name: 'poly-A',
  },
  {
    type: 'intron',
    x: 500,
    y: 250,
    length: 60,
    name: 'G-cap',
  },
  {
    type: 'text',
    x: 478,
    y: 255,
    text: "5'",
    name: 'G-cap',
  },
  {
    type: 'text',
    x: 810,
    y: 255,
    text: "3'",
    name: 'poly-A',
  },
   {// 6
    type: 'draggableRNA',
    x: 500,
    y: 150,
    name: 'draggableRNA',
  },
];

const otherDraggables = [
  { //0
    type: 'text',
    x: 478,
    y: 255,
    length: 60,
    text: "5'",
  },
  {//1
    type: 'intron',
    x: 500,
    y: 250,
    length: 60,
    name: 'exon',
    initialX: 500,
    initialY: 250,
    width: 60,
    height: 20,
    isDragging: false,
  },
  {// 2
    type: 'intron',
    x: 560,
    y: 250,
    length: 60,
    name: 'intron',
    initialX: 560,
    initialY: 250,
    width: 60,
    height: 20,
    isDragging: false,
  },
  {// 3
    type: 'intron',
    x: 620,
    y: 250,
    length: 60,
    name: 'exon',   
    initialX: 620,
    initialY: 250,
    width: 60,
    height: 20,
    isDragging: false,
  },
  {// 4
    type: 'intron',
    x: 680,
    y: 250,
    length: 60,
    name: 'intron',
    initialX: 680,
    initialY: 250,
    width: 60,
    height: 20,
    isDragging: false,
  },
  {// 5
    type: 'intron',
    x: 740,
    y: 250,
    length: 60,
    name: 'exon',
    initialX: 740,
    initialY: 250,
    width: 60,
    height: 20,
    isDragging: false,
  },
  {// 6
    type: 'text',
    x: 810,
    y: 255,
    length: 60,
    text: "3'",
  },
  {// 7
    type: 'text',
    name: 'Drag',
    text: 'Drag from inside',
    x: 890,
    y: 50,
  },
  {// 8
    type: 'text',
    name: 'Drag',
    text: 'the diagram',
    x: 890,
    y: 85,
  },
  {// 9
    type: 'intron',
    x: 910,
    y: 130,
    length: 60,
    name: 'poly-A',
    initialX: 910,
    initialY: 130,
    width: 60,
    height: 20,
    isDragging: false,
  },
  {// 10
    type: 'intron',
    x: 910,
    y: 180,
    length: 60,
    name: 'intron',
    initialX: 910,
    initialY: 180,
    width: 60,
    height: 20,
    isDragging: false,
  },
  {// 11
    type: 'intron',
    x: 910,
    y: 230,
    length: 60,
    name: 'exon',
    initialX: 910,
    initialY: 230,
    width: 60,
    height: 20,
    isDragging: false,
  },
  {// 12
    type: 'intron',
    x: 910,
    y: 280,
    length: 60,
    name: 'G-cap',
    initialX: 910,
    initialY: 280,
    width: 60,
    height: 20,
    isDragging: false,
  },
  {// 13
    type: 'draggableRNA',
    x: 500,
    y: 250,
    name: 'draggableRNA',
    initialX: 500,
    initialY: 250,
    width: 300,
    height: 20,
    isDragging: false,
  },
]

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
  {
    type: 'text',
    name: 'splicing',
    text: 'RNA Splicing',
    x: 890,
    y: 300,
    initialX: 890,
    initialY: 300,
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
    x: 30,
    y: 270,
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
  {
    type: 'text',
    name: 'splicing',
    text: 'RNA editing',
    x: 35,
    y: 290,
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
    let theY; 
    let theX;
    if (type === 'RNA nucleotides') {
      theX = 20+ (Math.random()*820); // between 10 - 850
      theY = 210 + (Math.random()*140); // between 210 - 350
    } else {
      theX = 10+ (Math.random()*840); // between 10 - 850
      theY = 60 + (Math.random()*130); // between 60 - 190
    }
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
      name: type,
    })
  }
  return moleculeArray
}
const movableRNAnucleotides = spawnMolecules(16, 'RNA nucleotides', ['#50ddc4', '#3caee5', '#3c5ae5', '#3ce5c8']);

const movableAminoacids = spawnMolecules(20, 'aminoacid', ['#ffd4e5', '#d4ffea', '#eecbff', '#feffa3', '#dbdcff', '#3ce5c8', '#baa1ec', '#3caee5' ]);

const stateOptions = [
  {
    feedback: false,
    loopDNA: false,
    fixtures:[],
    question: 'Drag the first process in Gene Expression to the area where it occurs',
    incorrectMessage: `Drag transcription into the nucleus, where it occurs in Eukaryotes`,
    draggables: processesDraggable,
    futureFixtures: processesFixtures,
    targets: [{ x: 20, y: 350, width: 850, height: 150, name: 'transcription'},],
  },
  {
    feedback: false,
    loopDNA: false,
    fixtures:[processesFixtures[0]],
    question: 'Drag the protein that would increase gene expression to the region where it binds',
    incorrectMessage: `Activators increase the chances of RNA polymerase finding the promoter. Drag the Activator ${String.fromCharCode(8594)} Enhancer region`,
    draggables: proteinsDraggable,
    futureFixtures: proteinsFixtures.slice(0,1), // slice doesn't modify the array, last index not included
    targets: [{ x: 190, y: 200, width: 100, height: 400, name: 'activator'},],
  },
  {
    feedback: false,
    loopDNA: true,
    fixtures:[processesFixtures[0], proteinsFixtures[0]],
    question: 'Drag the proteins required for RNA polymerase to bind to the DNA',
    incorrectMessage: `Drag transcription factors to the promoter region`,
    draggables: proteinsDraggable,
    futureFixtures: proteinsFixtures.slice(0,3), // slice doesn't modify the array, last index not included
    targets: [{ x: 300, y: 200, width: 100, height: 400, name: 'transcription factor'}],
  },
  {
    feedback: false,
    loopDNA: true,
    fixtures:[processesFixtures[0], proteinsFixtures[0], proteinsFixtures[2]],
    question: 'Drag the enzyme that transcribes the DNA into RNA the DNA region where it binds',
    incorrectMessage: `In Eukaryotes, RNA polymerase binds to transcription factors bound to the promoter region`,
    draggables: proteinsDraggable,
    futureFixtures: [proteinsFixtures[1]], // slice doesn't modify the array, last index not included
    targets: [{ x: 300, y: 200, width: 100, height: 400, name: 'polymerase'}],
  },
  {
    feedback: false,
    loopDNA: false,
    fixtures:[processesFixtures[0]],
    question: 'In order, drag the proteins needed to start transcription to their target region in the DNA segment',
    incorrectMessage: `First drag: Activator to the Enhancer region`,
    draggables: proteinsDraggable,
    futureFixtures: proteinsFixtures.slice(0,1), // slice doesn't modify the array, last index not included
    targets: [{ x: 190, y: 200, width: 100, height: 400, name: 'activator'},],
  },
  {
    feedback: false,
    loopDNA: true,
    fixtures:[processesFixtures[0], proteinsFixtures[0]],
    question: 'In order, drag the proteins needed to start transcription to their target region in the DNA segment',
    incorrectMessage: `Now drag transcription factors to the promoter region`,
    draggables: proteinsDraggable,
    futureFixtures: proteinsFixtures.slice(0,3), // slice doesn't modify the array, last index not included
    targets: [{ x: 300, y: 200, width: 100, height: 400, name: 'transcription factor'}],
  },
  {
    feedback: false,
    loopDNA: true,
    fixtures: [processesFixtures[0], proteinsFixtures[0], proteinsFixtures[2]],
    question: 'In order, drag the proteins needed to start transcription to their target region in the DNA segment',
    incorrectMessage: `Now drag RNA polymerase to the Promoter region`,
    draggables: proteinsDraggable,
    futureFixtures: proteinsFixtures.slice(1,2), // slice doesn't modify the array, last index not included
    targets: [{ x: 300, y: 300, width: 100, height: 100, name: 'polymerase'},],
  },
    {
    feedback: false,
    loopDNA: true,
    fixtures: [proteinsFixtures[0], proteinsFixtures[1], proteinsFixtures[2], processesFixtures[0]],
    question: 'What else does RNA polymerase need in order to transcribe the DNA?',
    incorrectMessage: `Drag the RNA nucleotides into the nucleus`,
    draggables: monomersDraggable,
    futureFixtures: [], // monomers 
    targets: [{ x: 20, y: 350, width: 850, height: 150, name: 'RNA nucleotides'},],
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
    loopDNA: false,
    fixtures:[processesFixtures[0]],
    question: 'Drag the next process in Gene Expression to the area where it occurs',
    incorrectMessage: `In Eukaryotes, once transcription is completed, the RNA is spliced, removing the introns before leaving the nucleus`,
    draggables: processesDraggable,
    futureFixtures: processesFixtures,
    targets: [{ x: 20, y: 350, width: 850, height: 150, name: 'splicing'},],
  },
  {
    feedback: false,
    loopDNA: false,
    animation: false,
    fixtures: [processesFixtures[0],processesFixtures[3]] , // proteinsFixtures.slice(0,1).concat(otherFixtures.slice(0,1)),
    question: 'Splice the RNA by dragging the elements that need to be removed away from the RNA molecule',
    incorrectMessage: `Drag the introns away of the RNA molecule`,
    draggables: otherDraggables.slice(0,9),
    futureFixtures: [], // slice doesn't modify the array, last index not included
    movables: [],
    targets: [{ x: 0, y: 0, width: 500, height: 500, name: 'intron'},
    { x: 800, y: 0, width: 500, height: 500, name: 'intron'},
    { x: 500, y: 0, width: 300, height: 230, name: 'intron'},
    { x: 500, y: 260, width: 300, height: 330, name: 'intron'},
    ],
  },
  {
    feedback: false,
    loopDNA: false,
    animation: false,
    fixtures: [processesFixtures[0],processesFixtures[3], otherFixtures[1], processesDraggable[0]] , // proteinsFixtures.slice(0,1).concat(otherFixtures.slice(0,1)),
    question: 'What else do you need to add to the RNA molecule to finish processing?',
    incorrectMessage: `Drag poly-A tail to 3' end and drag G-cap to the 5' end`,
    draggables: otherDraggables.slice(9,13),
    futureFixtures: otherFixtures.slice(2,6), // slice doesn't modify the array, last index not included
    movables: [],
    targets: [{ x: 740, y: 250, width: 50, height: 50, name: 'poly-A'},
    { x: 550, y: 250, width: 50, height: 50, name: 'G-cap'},
    ],
  },
  {
    feedback: false,
    loopDNA: false,
    fixtures:[processesDraggable[0]].concat(otherFixtures.slice(1,6)),
    question: 'Now that your messenger RNA is ready, drag the next process in gene expression to the area where it occurs',
    incorrectMessage: `Drag translation into the cytoplasm, where it occurs in Eukaryotes`,
    draggables: processesDraggable,
    futureFixtures: processesFixtures,
    targets: [{ x: 6, y: 50, width: 870, height: 150, name: 'translation'},],
  },
  {
    feedback: false,
    animation: false,
    fixtures: otherDraggables.slice(7,9).concat([processesFixtures[1]]) , // proteinsFixtures.slice(0,1).concat(otherFixtures.slice(0,1)),
    question: 'Drag the messenger RNA to the area of the cell where it will be translated',
    incorrectMessage: `Drag the RNA to the cytoplasm`,
    draggables: [otherDraggables[13]],
    futureFixtures: [otherFixtures[6]], // slice doesn't modify the array, last index not included
    movables: [],
    targets: [{ x: 6, y: 50, width: 870, height: 150, name: 'draggableRNA'} ],
  },
  {
    feedback: false,
    animation: false,
    fixtures: [processesFixtures[1],processesFixtures[3], otherFixtures[6]] , // proteinsFixtures.slice(0,1).concat(otherFixtures.slice(0,1)),
    question: 'Drag the enzyme or ribozyme to the area where it will start translation',
    incorrectMessage: `Drag the ribosome to the 5' end of the mRNA`,
    draggables: proteinsDraggable,
    futureFixtures: [proteinsFixtures[5]], // slice doesn't modify the array, last index not included
    movables: [],
    targets: [{ x: 400, y: 150, width: 100, height: 100, name: 'ribosome'} ],
  },
  { /// move amino acids 
    feedback: false,
    animation: false,
    fixtures: [proteinsFixtures[5],otherFixtures[6],processesFixtures[1]] , // proteinsFixtures.slice(0,1).concat(otherFixtures.slice(0,1)),
    question: 'What else does the ribosome need in order to translate the RNA into a protein?',
    incorrectMessage: `Drag the aminoacids into the cell`,
    draggables: monomersDraggable,
    futureFixtures: [], // slice doesn't modify the array, last index not included
    movables: [],
    targets: [{ x: 6, y: 50, width: 860, height: 150, name: 'aminoacids'},],
  },
  { // will have to turn into animation
    feedback: false,
    animation: true,
    fixtures: [proteinsFixtures[0],otherFixtures[6],processesFixtures[1]].concat(monomerFixtures.slice(2,4)),
    movables: movableAminoacids.concat([proteinsFixtures[5],proteinsFixtures[4]]),
    question: 'The ribosome is translating the RNA, using its information to synthesize a protein',
    incorrectMessage: '',
    draggables: [],
    futureFixtures: [],
    targets: [],
  },
  {
    feedback: false,
    animation: false,
    futureFixtures: [processesFixtures[2]],
    draggables: processesDraggable,
    question: 'Drag the name of the process that was completed, from DNA to protein',
    incorrectMessage: `Gene expression is the process of transcribing the information in DNA and translating it to make proteins`,
    targets: [{ x: 0, y: 50, width: 870, height: 450, name: 'gene expression'},],
  },
];

export {stateOptions}