const L1Pairs = [
  { saturated: 'L1Slide1.png',  unsaturated: 'L1Slide2.png'},
  { saturated: 'L1Slide3.png',  unsaturated: 'L1Slide4.png'},
  { saturated: 'L1Slide5.png',  unsaturated: 'L1Slide6.png'},
  { saturated: 'L1Slide7.png',  unsaturated: 'L1Slide8.png'}, 
  { saturated: 'L1Slide1.png',  unsaturated: 'L1Slide4.png'},
  { saturated: 'L1Slide3.png',  unsaturated: 'L1Slide6.png'},
  { saturated: 'L1Slide5.png',  unsaturated: 'L1Slide8.png'},
  { saturated: 'L1Slide7.png',  unsaturated: 'L1Slide2.png'},
  { saturated: 'L1Slide1.png',  unsaturated: 'L1Slide6.png'},
  { saturated: 'L1Slide3.png',  unsaturated: 'L1Slide8.png'},
  { saturated: 'L1Slide5.png',  unsaturated: 'L1Slide2.png'},
  { saturated: 'L1Slide7.png',  unsaturated: 'L1Slide4.png'},  
];

const L2Pairs = [
  { saturated: 'L2Slide01.png',  unsaturated: 'L2Slide02.png'},
  { saturated: 'L2Slide03.png',  unsaturated: 'L2Slide04.png'},
  { saturated: 'L2Slide05.png',  unsaturated: 'L2Slide06.png'},
  { saturated: 'L2Slide12.png',  unsaturated: 'L2Slide07.png'}, 
  { saturated: 'L2Slide13.png',  unsaturated: 'L2Slide08.png'},
  { saturated: 'L2Slide14.png',  unsaturated: 'L2Slide09.png'},
  { saturated: 'L2Slide15.png',  unsaturated: 'L2Slide10.png'},
  { saturated: 'L2Slide16.png',  unsaturated: 'L2Slide17.png'},
  { saturated: 'L2Slide19.png',  unsaturated: 'L2Slide18.png'},
  { saturated: 'L2Slide20.png',  unsaturated: 'L2Slide21.png'},
  { saturated: 'L2Slide22.png',  unsaturated: 'L2Slide23.png'},
  { saturated: 'L2Slide24.png',  unsaturated: 'L2Slide25.png'},
  { saturated: 'L2Slide26.png',  unsaturated: 'L2Slide27.png'},
  { saturated: 'L2Slide29.png',  unsaturated: 'L2Slide28.png'},
  { saturated: 'L2Slide30.png',  unsaturated: 'L2Slide31.png'},
  { saturated: 'L2Slide32.png',  unsaturated: 'L2Slide33.png'},
];

const L3Pairs = [
  { saturated: 'L3Slide01.png',  unsaturated: 'L3Slide02.png'},
  { saturated: 'L3Slide01.png',  unsaturated: 'L3Slide03.png'},
  { saturated: 'L3Slide04.png',  unsaturated: 'L3Slide05.png'},
  { saturated: 'L3Slide04.png',  unsaturated: 'L3Slide06.png'}, 
  { saturated: 'L3Slide07.png',  unsaturated: 'L3Slide08.png'},
  { saturated: 'L3Slide09.png',  unsaturated: 'L3Slide10.png'},
  { saturated: 'L3Slide09.png',  unsaturated: 'L3Slide11.png'},
  { saturated: 'L3Slide12.png',  unsaturated: 'L3Slide13.png'},
  { saturated: 'L3Slide14.png',  unsaturated: 'L3Slide15.png'},
  { saturated: 'L3Slide16.png',  unsaturated: 'L3Slide17.png'},
  { saturated: 'L3Slide18.png',  unsaturated: 'L3Slide19.png'},
];

const instructionList = [
  "Drag the blue boxes to the left or to the right to match the images that will appear below",
  "You must score five (5) correct in a row in order to move to the next level",
  "The progress bar at the top shows your progress towards the next level",
  "If you mismatch a pair, you'll have to start again your count towards the next level",
  "In each level you will have different representations of fats. Difficulty increases with each level",
]

const initialData = {
  options: [
    { id: 'option-1', content: 'Saturated fat' },
    { id: 'option-2', content: 'Unsaturated fat'},
  ],

  titles: { column1: 'Which type of fat?', column2: String.fromCharCode(8592)+' Drag these '+ String.fromCharCode(8594), column3: 'Which type of fat?'},

  columnOrder: ['column-1', 'column-2', 'column-3'],
}

export { L1Pairs, L2Pairs,L3Pairs, initialData, instructionList};
