const checkVerticalConfig = (positionArray) => {
  // Will FAIL on Duplications NOTE
  let ans = true;
  for (let i = 0; i< positionArray.length;i++){
    if (i!==0){
      if (positionArray[i]+10 !== positionArray[i-1] && positionArray[i]-10 !== positionArray[i-1] ){
        ans = false;
      }
    }
  }
  return ans;
}

const checkHorizontalConfig = (positionArray) => {
  for (let i = 0; i< positionArray.length;i++){
    if (i!==0){
      if (positionArray[i]+1 !== positionArray[i-1] && positionArray[i]-1 !== positionArray[i-1] ){
        return false;
      }
      if (Math.floor(positionArray[i]/10) !== Math.floor(positionArray[i-1]/10)){
        return false;
      }
    }
  }
  return true;
}

const findAvailableMoves = (board) => {
  let availableLocations = [];
  board.forEach((location, index) => {
    if (location === -1){
      availableLocations.push(index);
    }
  })
  return availableLocations;
}

const findAllShipHits = (board) => {
  let shipHits = [];
  board.forEach((location, index) => {
    if (location === 1){
      shipHits.push(index);
    }
  })
  return shipHits;
}

const checkPositionAvailable = (positionArray, gameBoard) => {
  let ans = true;
  if (checkHorizontalConfig(positionArray)!==true && checkVerticalConfig(positionArray)!==true){
    return false; // bad config
  }
  positionArray.forEach((location) => {
    if (location<0 || location>99){ // can't be outside board
      ans = false;
    }
  })
 positionArray.forEach((location) => {
   if (gameBoard[location]!== -1){ // can't be on another ship
     ans = false;
   }
 })
  return ans;
}



const randomizeComputerShips = (shipSizes) => {
  let shipArrays = [];
  let currentBoard = new Array(100).fill(-1);
  shipSizes.forEach((size) => {
    let newShipArray;
    let choice = Math.floor(Math.random() * 2);
    if (choice === 0){
      newShipArray = makeRandomVertical(size, currentBoard);
    } else {
      newShipArray = makeRandomHorizontal(size, currentBoard);
    }
    shipArrays.push(newShipArray);
    newShipArray.forEach((location) => {
      currentBoard[location] = 1; // simply so ships aren't put on top of one another
    })
  })
  console.log('computer ship arrays: ', shipArrays);
  return shipArrays;
}

const makeVertical = (initial, size) => {
  let positionArray = [initial];
  for (let i=1; i<size; i++){
    const nextValue = (10*i) + initial;
    positionArray.push(nextValue);
  }
  return positionArray;
}

const makeRandomVertical = (size, currentBoard) => {
  // picked number is top, the rest go down vertically
  let positionArray = [-3,-2,-1];
  while (checkPositionAvailable(positionArray, currentBoard) !== true){
    const startValue = Math.floor(Math.random() * (100-((size-1)*10)));
    positionArray = makeVertical(startValue, size);
  }
  return positionArray;
}

const makeHorizontal = (initial, size) => {
  let positionArray = [initial];
  for (let i=1; i<size; i++){
    const nextValue = initial+i;
    positionArray.push(nextValue);
  }
  return positionArray;
}

const makeRandomHorizontal = (size, currentBoard) => {
  // picked number is top, the rest go down vertically
  let positionArray = [-3,-2,-1];
  while (checkPositionAvailable(positionArray, currentBoard) !== true){
    const startValue = Math.floor(Math.random() * (100-size));
    positionArray = makeHorizontal(startValue,size);
  }
  return positionArray;
}

export {
  checkVerticalConfig,
  checkHorizontalConfig,
  findAvailableMoves,
  findAllShipHits,
  checkPositionAvailable,
  randomizeComputerShips,
  makeVertical,
  makeHorizontal
}