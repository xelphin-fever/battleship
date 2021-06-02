import Player from '../functions/Player'

describe('Check Available Moves', () => {
  let player;
  let mockGameBoard = new Array(100).fill(-1);

  beforeEach(() => {
    player = Player();
  });
  
  // incase horizontal say at 50 -> shouldn't choose 49 OR say at 49 -> shouldn't choose 50

  test('Example With One Value, All Surounding Available -> Choose ClockWise', () => {
    mockGameBoard[26] = 1;
    expect(player.smartMove(mockGameBoard)).toBe(25);
    mockGameBoard[26] = -1;
  });

  test('Example With One Value, Not All Surounding Available -> Choose ClockWise', () => {
    mockGameBoard[26] = 1;
    mockGameBoard[25] = 0;
    mockGameBoard[16] = 0;
    expect(player.smartMove(mockGameBoard)).toBe(27);
    mockGameBoard[26] = -1;
    mockGameBoard[25] = -1;
    mockGameBoard[16] = -1;
  });

  test('Continue Line of Ship Vertical', () => {
    mockGameBoard[26] = 1;
    mockGameBoard[36] = 1;
    expect(player.smartMove(mockGameBoard)).toBe(16);
    mockGameBoard[26] = -1;
    mockGameBoard[36] = -1;
  });

  test('Continue Line of Ship Vertical with Blocked in Obvious', () => {
    mockGameBoard[16] = 0;
    mockGameBoard[26] = 1;
    mockGameBoard[36] = 1;
    expect(player.smartMove(mockGameBoard)).toBe(46);
    mockGameBoard[16] = -1;
    mockGameBoard[26] = -1;
    mockGameBoard[36] = -1;
  });


  test('Continue Line of Ship Horizontal with Blocked in Obvious', () => {
    mockGameBoard[16] = 0;
    mockGameBoard[17] = 1;
    mockGameBoard[18] = 1;
    expect(player.smartMove(mockGameBoard)).toBe(19);
    mockGameBoard[16] = -1;
    mockGameBoard[17] = -1;
    mockGameBoard[18] = -1;
  });

  test('Continue Line of Ship Horizontal - Normal (add left)', () => {
    mockGameBoard[11] = 1;
    mockGameBoard[12] = 1;
    expect(player.smartMove(mockGameBoard)).toBe(10);
    mockGameBoard[11] = -1;
    mockGameBoard[12] = -1;
  });

  test('Continue Line of Ship Horizontal - But Stay on Line (so this case add right)', () => {
    mockGameBoard[10] = 1;
    mockGameBoard[11] = 1;
    expect(player.smartMove(mockGameBoard)).toBe(12);
    mockGameBoard[10] = -1;
    mockGameBoard[11] = -1;
  });

  test('Continue Line of Ship Horizontal - But Stay on Line (so this case add up)', () => {
    mockGameBoard[18] = 0;
    mockGameBoard[19] = 1;
    expect(player.smartMove(mockGameBoard)).toBe(9);
    mockGameBoard[18] = -1;
    mockGameBoard[19] = -1;
  });

  test('Continue Line of Ship Horizontal - But Stay on Line (so this case add down)', () => {
    mockGameBoard[8] = 0;
    mockGameBoard[9] = 1;
    expect(player.smartMove(mockGameBoard)).toBe(19);
    mockGameBoard[8] = -1;
    mockGameBoard[9] = -1;
  });

  test('Do Not Select Negative From Up', () => {
    mockGameBoard[3] = 0;
    mockGameBoard[4] = 1;
    expect(player.smartMove(mockGameBoard)).toBe(5);
    mockGameBoard[3] = -1;
    mockGameBoard[4] = -1;
  });

  test('Do Not Select Overflow From Right', () => {
    mockGameBoard[98] = 0;
    mockGameBoard[89] = 0;
    mockGameBoard[99] = 1;
    expect(player.smartMove(mockGameBoard)).not.toBe(100);
    mockGameBoard[98] = -1;
    mockGameBoard[89] = -1;
    mockGameBoard[99] = -1;
  });
});