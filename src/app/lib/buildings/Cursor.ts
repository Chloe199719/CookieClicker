import Clicker, { Resource, Structure } from "../Cliker2";

export class Cursor extends Structure {
    public cursorUpgrades1 = {
      "1": {
        name: "Reinforced Index Finger",
        cost: { cookies: 100 },
        multiplier: 2,
        requirement: 1,
      },
      "2": {
        name: "Carpal Tunnel Prevention Cream",
        cost: { cookies: 500 },
        multiplier: 2,
        requirement: 1,
      },
      "3": {
        name: "Ambidextrous",
        cost: { cookies: 10000 },
        multiplier: 2,
        requirement: 10,
      },
      "4": {
        name: "Thousand Fingers",
        cost: { cookies: 100000 },
        multiplier: 0.1, // This requires a special function to check every Building that exists
        requirement: 25,
      },
      "5": {
        name: "Million Fingers",
        cost: { cookies: 10000000 },
        multiplier: 5, // Increase the first 1000 cursor by 5?
        requirement: 50,
      },
      "6": {
        name: "Billion Fingers",
        cost: { cookies: 1000000000 },
        multiplier: 10, // Increase the first 1000 cursor by 10?
        requirement: 100,
      },
      "7": {
        name: "Trillion Fingers",
        cost: { cookies: 100000000000 },
        multiplier: 20, // Increase the first 1000 cursor by 20?
        requirement: 150,
      },
      "8": {
        name: "Quadrillion Fingers",
        cost: { cookies: 10000000000000 },
        multiplier: 20, // Increase the first 1000 cursor by 20?
        requirement: 200,
      },
      "9": {
        name: "Quintillion Fingers",
        cost: { cookies: 1000000000000000 },
        multiplier: 20, // Increase the first 1000 cursor by 20?
        requirement: 250,
      },
      "10": {
        name: "Sextillion Fingers",
        cost: { cookies: 100000000000000000 },
        multiplier: 20, // Increase the first 1000 cursor by 20?
        requirement: 300,
      },
      "11": {
        name: "Septillion Fingers",
        cost: { cookies: 10000000000000000000 },
        multiplier: 20, // Increase the first 1000 cursor by 20?
        requirement: 350,
      },
      "12": {
        name: "Octillion Fingers",
        cost: { cookies: 1000000000000000000000 },
        multiplier: 20, // Increase the first 1000 cursor by 20?
        requirement: 400,
      },
      "13": {
        name: "Nonillion Fingers",
        cost: { cookies: 100000000000000000000000 },
        multiplier: 20, // Increase the first 1000 cursor by 20?
        requirement: 450,
      },
      "14": {
        name: "Decillion Fingers",
        cost: { cookies: 10000000000000000000000000 },
        multiplier: 20, // Increase the first 1000 cursor by 20?
        requirement: 500,
      },
      "15": {
        name: "Undecillion Fingers",
        cost: { cookies: 1000000000000000000000000000 },
        multiplier: 20, // Increase the first 1000 cursor by 20?
        requirement: 550,
      },
    };
    public cursorUpgrades = new Map(Object.entries(this.cursorUpgrades1));
    private game: Clicker;
    // Constructor Needs to be fixed to Allow for Saving
    constructor(game: Clicker) {
      super({
        structure: 0,
        structureCost: { cookies: 15 },
        structureResourceGeneration: { cookies: 0.1 },
        structureResourceGenerationDefault: { cookies: 0.1 },
        structureUpgrade: 0,
        structureUpgradeCost: { cookies: 100 },
        structureUpgradeMultiplier: 2, // Not Used to remove
        structureCostDefault: { cookies: 15 },
        structureUpgradeCostDefault: { cookies: 100 },
      });
      this.game = game;
      this.calculateStructureResourceGeneration1();
    }
    // Needs Requirements Check TODO
    public buyUpgradeLevel(cookies: Resource): void {
      const nextUpgrade = this.cursorUpgrades.get(
        (this.getStructureUpgrade() + 1).toString()
      );
      if (!nextUpgrade) {
        return;
      }
      if (!this.canBuyStructureUpgrade(cookies)) {
        return;
      }
      cookies.cookies = cookies.cookies - nextUpgrade.cost.cookies;
      this.increaseStructureLevel();
      this.calculateStructureResourceGeneration1();
    }
    // Fix name after a concrete Plan
    public calculateStructureResourceGeneration1(): void {
      this.structureResourceGeneration.cookies =
        this.structureResourceGenerationDefault.cookies;
  
      for (let i = 1; i < this.getStructureUpgrade() + 1; i++) {
        if (i !== 4 && i <= 15) {
          this.structureResourceGeneration.cookies *= this.cursorUpgrades.get(
            i.toString()
          )?.multiplier!;
        } else if (i === 4) {
          this.structureResourceGeneration.cookies +=
            this.getNoneCursorAmount() * 0.1;
          // Check how many other buildigns exist from clicker and multiply by 0.1 per each
        }
      }
    }
    public getStructureUpgradeCost(): string {
      return this.cursorUpgrades
        .get((this.getStructureUpgrade() + 1).toString())
        ?.cost.cookies.toString()!;
    }
    public canBuyStructureUpgrade(cookies: Resource): boolean {
      const nextUpgrade = this.cursorUpgrades.get(
        (this.getStructureUpgrade() + 1).toString()
      );
      if (!nextUpgrade) {
        return false;
      }
  
      if (
        cookies.cookies >= nextUpgrade.cost.cookies &&
        this.getStructureAmount() >= nextUpgrade.requirement
      ) {
        return true;
      }
      return false;
    }
    // This Function needs to be updated
    private getNoneCursorAmount(): number {
      let amount = 0;
      amount += this.game.grandma.getStructureAmount();
      return amount;
    }
  }
  