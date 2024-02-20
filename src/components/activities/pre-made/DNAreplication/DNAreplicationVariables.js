const slides = [
  { name: 'Step0',   img: 'Slide01.png', description: 'DNA replication in Prokaryotes. Click on an enzyme or process'},
  { name: 'Step1',   img: 'Slide02.png', description: 'Helicase unwinds the double helix by breaking the hydrogen bonds between complementary base pairs'},
  { name: 'Step2',   img: 'Slide03.png', description: 'Primase synthesizes a short fragment of RNA to which DNA nucleotides can be attached'},
  { name: 'Step3',   img: 'Slide04.png', description: 'DNA polymerase 3 attaches DNA nucleotides to the 3 prime end of the growing strand'},
  { name: 'Step4',   img: 'Slide05.png', description: 'Helicase unwinds another section of the double helix'},
  { name: 'Step5',   img: 'Slide06.png', description: 'Primase adds another primer to the lagging strand'},
  { name: 'Step6',   img: 'Slide07.png', description: 'DNA polymerase 3 continue to add DNA nucleotides to the lagging and leading strands'},
  { name: 'Step7',   img: 'Slide08.png', description: 'DNA polymerase 1 removes the RNA nucleotides and replaces them with DNA nucleotides'},
  { name: 'Step8',   img: 'Slide09.png', description: 'Ligase connect the Okazaki fragments made by DNA poymerase 1 with the previous fragment'},
];

const enzymes = [
  { name: 'helicase',            displayText: 'Helicase' ,            img: 'helicase.png' },
  { name: 'primase',             displayText: 'Primase' ,             img: 'primase.png' },
  { name: 'DNA polymerase 3',    displayText: 'DNA Polymerase III' ,  img: 'DNA_pol_III.jpg' },
  { name: 'DNA polymerase 1',    displayText: 'DNA Polymerase I' ,    img: 'DNA_pol_I.png' },
  { name: 'ligase',              displayText: 'Ligase' ,              img: 'ligase.png' },
];

const processes = [
  { name: 'helicase',           displayText: 'Unwind the DNA helix' ,},
  { name: 'primase',            displayText: 'Add RNA nucleotides' ,},
  { name: 'DNA polymerase 3',   displayText: 'Add DNA nucleotides' ,},
  { name: 'DNA polymerase 1',   displayText: 'Remove & replace RNA nucleotides' ,},
  { name: 'ligase',             displayText: 'Connect Okazaki fragments' ,},
];

const instructionList = [
  "Start by clicking on the first enzyme and on the corresponding first step in DNA replication",
  "You can click on the process first and then pick the corresponding enzyme or viceversa",
  "Continue clicking on the corresponding enzymes and process of DNA replication in order",
  "You must get all the steps in order in the minimum number of clicks in order to win the game",
]

export { slides, enzymes, processes, instructionList };
