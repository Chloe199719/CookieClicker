import Clicker, { Resource } from "./Cliker";

describe("Clicker", () => {
  test("should initialize resources to given values", () => {
    const clicker = new Clicker();
    expect(clicker.get_resources()).toEqual({
      gold: 0,
      silver: 0,
      bronze: 0,
    });
  });

  test("should increase resources", () => {
    const clicker = new Clicker();
    clicker.increaseResource({ gold: 1, silver: 2, bronze: 3 });
    expect(clicker.get_resources()).toEqual({
      gold: 1,
      silver: 2,
      bronze: 3,
    });
  });

  // Add other relevant tests...
});
