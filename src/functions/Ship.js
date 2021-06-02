const Ship = (shipIndex, positionArray) => {
  const shipLength = positionArray.length;
  let locationHits = [];
  let isSunk = false;

  const hit = (location) => {
    if (positionArray.includes(Number(location)) && !locationHits.includes(Number(location))){
      locationHits.push(location);
      checkIsSunk();
      return true;
    }
    return false;
  }

  const sendLocationHits = () => {
    return locationHits;
  }

  const checkIsSunk = () => {
    if (locationHits.length === shipLength){
      isSunk = true;
      console.log(`Ship ${shipIndex} has been sunken, so isSunk is:`, isSunk)
    } else {
      isSunk = false;
    }
    return isSunk;
  }

  const getPosition = () => {
    return positionArray;
  }

  return {hit, sendLocationHits, checkIsSunk, getPosition}

}

export default Ship;