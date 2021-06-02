import {checkVerticalConfig, checkHorizontalConfig, findAvailableMoves, findAllShipHits} from '../functions/Helper'


describe('Check Helper Vertical Config', () => {
  
  test('Check Vertical Valid', () => {
    expect(checkVerticalConfig([26,36,46])).toBe(true);
  });

  test('Check Vertical InValid', () => {
    expect(checkVerticalConfig([26,37,46])).toBe(false);
  });

  test('Check Vertical Valid Backwards', () => {
    expect(checkVerticalConfig([26,16])).toBe(true);
  });

  test('Check Single is True', () => {
    expect(checkVerticalConfig([26])).toBe(true);
  });

  test('Check Vertical Jumbled -> Invalid as of now', () => {
    expect(checkVerticalConfig([26,46,36])).toBe(false);
  });

});

describe('Check Helper Horizontal Config', () => {
  
  test('Check Horizontal Valid', () => {
    expect(checkHorizontalConfig([1,2,3])).toBe(true);
  });

  test('Check Horizontal InValid', () => {
    expect(checkHorizontalConfig([1,4,7])).toBe(false);
  });

  test('Check Horizontal Jumbled -> Invalid as of now', () => {
    expect(checkHorizontalConfig([2,4,3])).toBe(false);
  });

  test('Check Horizontal is in fact On Same Line', () => {
    expect(checkHorizontalConfig([8,9,10])).toBe(false);
  });

  test('Check Horizontal is in fact On Same Line -2', () => {
    expect(checkHorizontalConfig([18,19,20])).toBe(false);
  });

  test('Check Horizontal Backwards', () => {
    expect(checkHorizontalConfig([11,10])).toBe(true);
  });

  test('Check Horizontal One Numbers', () => {
    expect(checkHorizontalConfig([11])).toBe(true);
  });

});


describe('Check Available Moves', () => {
  let mockBoard = [-1,-1,-1,0,0,0,-1,-1,1,1,0,-1,-1];
  let mockCorrect = [0,1,2,6,7,11,12]
  
  test('Example 1', () => {
    expect(findAvailableMoves(mockBoard)).toStrictEqual(mockCorrect);
  });
});

describe('Check Hit Ship Locations', () => {
  let mockBoard = [-1,-1,-1,0,0,0,-1,-1,1,1,0,-1,-1,1,1,0,1];
  let mockCorrect = [8,9,13,14,16]
  
  test('Example 1', () => {
    expect(findAllShipHits(mockBoard)).toStrictEqual(mockCorrect);
  });
});