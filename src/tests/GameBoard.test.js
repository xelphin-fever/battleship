import GameBoard from '../functions/GameBoard'


describe('Check with Empty GameBoard', () => {
  let gameBoard;
  let mockGameBoard = new Array(100).fill(-1);
  mockGameBoard[26] = 0;
  mockGameBoard[27] = 0;
  mockGameBoard[28] = 0;

  beforeEach(() => {
    gameBoard = GameBoard();
  });

  test('Check for Valid Ship', () => {
    expect(gameBoard.addShipToBoard([26,27,28])).toStrictEqual(mockGameBoard);
  });
  
  test('Ignores Position with neg Values', () => {
    expect(gameBoard.addShipToBoard([-1,0,1,2])).toStrictEqual(new Array(100).fill(-1));
  });

  test('Ignores Position with Too High Values', () => {
    expect(gameBoard.addShipToBoard([88,99,100,101])).toStrictEqual(new Array(100).fill(-1));
  });

  test('Cannot enter because bad config', () => {
    expect(gameBoard.addShipToBoard([86,87,89])).toStrictEqual(new Array(100).fill(-1));
  });

  test('Cannot enter because bad config - horizontal overlap', () => {
    expect(gameBoard.addShipToBoard([86,87,88,89,90])).toStrictEqual(new Array(100).fill(-1));
  });

  test('Check Amount Sunk is Zero', () => {
    expect(gameBoard.checkAmountSunk()).toStrictEqual(0);
  });
});

describe('Check with GameBoard that has Ships', () => {
  let gameBoard;
  let mockGameBoard = new Array(100).fill(-1);
  mockGameBoard[3] = 0;
  mockGameBoard[4] = 0;
  mockGameBoard[5] = 0;
  mockGameBoard[22] = 1;
  mockGameBoard[32] = 1;
  mockGameBoard[42] = 1;
  mockGameBoard[52] = 1;
  mockGameBoard[23] = 2;
  mockGameBoard[24] = 2;
  mockGameBoard[25] = 2;
  mockGameBoard[44] = 3;
  let mockHitBoard = new Array(100).fill(-1);
  
  beforeEach(() => {
    gameBoard = GameBoard();
    gameBoard.addShipToBoard([3,4,5]);
    gameBoard.addShipToBoard([22,32,42,52]);
    gameBoard.addShipToBoard([23,24,25]);
    gameBoard.addShipToBoard([44]);
  });

  test('Cannot add Ship on other Ship', () => {
    expect(gameBoard.addShipToBoard([5,6,7])).toStrictEqual(mockGameBoard);
  });

  test('Can Add Ship in Valid Place', () => {
    mockGameBoard[80] = 4;
    mockGameBoard[81] = 4;
    mockGameBoard[82] = 4;
    expect(gameBoard.addShipToBoard([80,81,82])).toStrictEqual(mockGameBoard);
  });

  test('Receive Attack on Empty', () => {
    mockHitBoard[8] = 0;
    gameBoard.receiveAttack(8)
    expect(gameBoard.getHitBoard()).toStrictEqual(mockHitBoard);
    mockHitBoard[8] = -1; // reset
  });

  test('Receive Attack on Ship', () => {
    mockHitBoard[3] = 1;
    gameBoard.receiveAttack(3);
    expect(gameBoard.getHitBoard()).toStrictEqual(mockHitBoard);
    mockHitBoard[3] = -1; // reset
  });

  test('Check Amount Sunk is Correct to One', () => {
    gameBoard.receiveAttack(3);
    gameBoard.receiveAttack(4);
    gameBoard.receiveAttack(5);
    expect(gameBoard.checkAmountSunk()).toStrictEqual(1);
  });

  test('Check Amount Sunk is Correct to Two', () => {
    gameBoard.receiveAttack(0);
    gameBoard.receiveAttack(3);
    gameBoard.receiveAttack(4);
    gameBoard.receiveAttack(5);
    gameBoard.receiveAttack(44);
    gameBoard.receiveAttack(32);
    gameBoard.receiveAttack(42);
    expect(gameBoard.checkAmountSunk()).toStrictEqual(2);
  });

  test('Check Amount Sunk is Correct to Two with Some Random Shots', () => {
    gameBoard.receiveAttack(3);
    gameBoard.receiveAttack(4);
    gameBoard.receiveAttack(5);
    gameBoard.receiveAttack(44);
    expect(gameBoard.checkAmountSunk()).toStrictEqual(2);
  });

  test('Receive Attack on Multiple Places', () => {
    mockHitBoard[3] = 1;
    mockHitBoard[24] = 1;
    mockHitBoard[34] = 0;
    gameBoard.receiveAttack(3);
    gameBoard.receiveAttack(24);
    gameBoard.receiveAttack(34);
    expect(gameBoard.getHitBoard()).toStrictEqual(mockHitBoard);
    mockHitBoard[3] = -1; // reset
    mockHitBoard[24] = -1; // reset
    mockHitBoard[34] = -1; // reset
  });

  test('Receive Attack and Sink Ship Length 1', () => {
    gameBoard.receiveAttack(44);
    expect(gameBoard.getAllShips()[3].checkIsSunk()).toBe(true);
  });

  test('Receive Attack on Multiple Places on Ship But Not Sink Yet', () => {
    gameBoard.receiveAttack(3);
    gameBoard.receiveAttack(4);
    expect(gameBoard.getAllShips()[0].checkIsSunk()).toBe(false);
  });

  test('Receive Attack on Multiple Places on Ship and Sink', () => {
    gameBoard.receiveAttack(3);
    gameBoard.receiveAttack(4);
    gameBoard.receiveAttack(5);
    expect(gameBoard.getAllShips()[0].checkIsSunk()).toBe(true);
  });

  test('Ship Sends Correct Location Hits', () => {
    gameBoard.receiveAttack(22);
    gameBoard.receiveAttack(42);
    gameBoard.receiveAttack(52);
    gameBoard.receiveAttack(53);
    expect(gameBoard.getAllShips()[1].checkIsSunk()).toBe(false);
    expect(gameBoard.getAllShips()[1].sendLocationHits()).toStrictEqual([22,42,52]);
  });

});

describe('Check with GameBoard and Sink all Ships', () => {
  let gameBoard;
  let mockGameBoard = new Array(100).fill(-1);
  mockGameBoard[3] = 0;
  mockGameBoard[4] = 0;
  mockGameBoard[5] = 0;
  mockGameBoard[22] = 1;
  mockGameBoard[32] = 1;
  
  beforeEach(() => {
    gameBoard = GameBoard();
    gameBoard.addShipToBoard([3,4,5]);
    gameBoard.addShipToBoard([22,32]);
  });

  test('Sink Only One Ship, still not all sunken', () => {
    gameBoard.receiveAttack(3);
    gameBoard.receiveAttack(4);
    gameBoard.receiveAttack(5);
    gameBoard.receiveAttack(32);
    expect(gameBoard.getAllSunk()).toStrictEqual(false);
  });

  test('Sink All Ships, all sunken', () => {
    gameBoard.receiveAttack(3);
    gameBoard.receiveAttack(4);
    gameBoard.receiveAttack(5);
    gameBoard.receiveAttack(22);
    gameBoard.receiveAttack(32);
    expect(gameBoard.getAllSunk()).toBe(true);
  });

  test('Sink All Ships, Correct Count', () => {
    gameBoard.receiveAttack(3);
    gameBoard.receiveAttack(4);
    gameBoard.receiveAttack(5);
    gameBoard.receiveAttack(22);
    gameBoard.receiveAttack(32);
    expect(gameBoard.checkAmountSunk()).toStrictEqual(2);
  });
});