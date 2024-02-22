const slides = [
  { name: 'Start',   
    img: 'Slide01.png',
    description: 'Click on the first step or bond involved in protein folding'
  },
  { name: 'Primary structure',   
    img: 'Slide02.png',
    description: 'Amino acids are connected by peptide bonds in the order determined by the sequence of nucleotides in DNA'
  },
  { name: 'Secondary structure',   
    img: 'Slide03.png',
    description: 'Hydrogen bonds in the amino acid backbone cause the polypeptide to fold into itself in a repeatig pattern'
  },
  { name: 'Tertiary structure',   
    img: 'Slide04.png',
    description: 'Proteins need their three-dimensional structure to be functional. This is the final step for proteins made up of a single polypeptide chain'
  },
  { name: 'Quaternary structure',   
    img: 'Slide05.png',
    description: 'Some proteins are made up of multiple polypeptide chains, known as subunits'
  },
];

const bonds = [
  { name: 'Primary structure',   
    bondType: 'Peptide bonds between amino acids',
  },
  { name: 'Secondary structure',   
    bondType: 'Hydrogen bonds between amino and carbonyl groups of different amino acids',
  },
  { name: 'Tertiary structure',   
    bondType: 'Hydrophobic and hydrophilic interactions of side chains or R-groups',
  },
  { name: 'Quaternary structure',   
    bondType: 'Weak interactions between multiple polypeptide chains',
  },
];

const processes = [
  { name: 'Primary structure',   
    displayText: "The amino acid sequence is determined by the sequence of nucleotides in DNA", 
  },
  { name: 'Secondary structure',   
    displayText: 'Most commonly results in the formation of '+String.fromCharCode(945)+'-helixes and '+String.fromCharCode(946)+'-sheets',  
  },
  { name: 'Tertiary structure',   
    displayText: 'Produces the three-dimensional folding pattern of a protein',  
  },
  { name: 'Quaternary structure',   
    displayText: 'Some proteins are made up of multiple polypeptide chains, known as subunits',  
  },
];

const instructionList = [
  "Start by clicking on the type of bond and on the corresponding effect on protein structure",
  "You can click on the effect first and then pick the corresponding bond or viceversa",
  "Continue clicking on the corresponding bonds and effect in the order of protein folding",
  "You must get all the steps in order in the minimum number of clicks in order to win the game",
]

export { slides, bonds, processes, instructionList};