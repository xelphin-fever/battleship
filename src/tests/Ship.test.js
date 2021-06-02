import Ship from '../functions/Ship'

describe('Check Ship No Hits Yet', () => {
  let ship;

  beforeEach(() => {
    ship = Ship(3,[8,18,28,38]);
  });

  test('Check for Valid Hit on Ship', () => {
    expect(ship.hit(28)).toBeTruthy();
  });

  test('Check for Is Sunken', () => {
    expect(ship.checkIsSunk()).toBe(false);
  });


});

describe('Check for Ship Already Sunk', () => {
  let ship;

  beforeEach(() => {
    ship = Ship(3,[8,18]);
    ship.hit(8)
    ship.hit(18)
  });

  test('Check for all Hits', () => {
    expect(ship.sendLocationHits()).toStrictEqual([8,18]);
  });

  test('Check for Sunken is true', () => {
    expect(ship.checkIsSunk()).toBe(true);
  });

  test('Cannot hit Sunken Ship in Valid', () => {
    expect(ship.hit(8)).toBe(false);
  });

});

describe('Check for Ship with Some Hits', () => {
  let ship;

  beforeEach(() => {
    ship = Ship(3,[8,18,28,38]);
    ship.hit(8)
    ship.hit(28)
  });

  test('Check for all Hits', () => {
    expect(ship.sendLocationHits()).toStrictEqual([8,28]);
  });

  test('Check for Sunken is false', () => {
    expect(ship.checkIsSunk()).toBe(false);
  });

  test('Cannot hit Sunken Ship in Place already Hit', () => {
    expect(ship.hit(8)).toBe(false);
  });

  test('Can hit Ship in Valid', () => {
    expect(ship.hit(38)).toBe(true);
  });

});