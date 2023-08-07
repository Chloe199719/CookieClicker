export type Resource = {
  cookies: number;
};
export type gameInit = {
  resource: Resource;
  clickResourceGeneration: Resource;
  resourceGeneration: Resource;
  grandma: Structure;
  // autoClicker: Cursor;
};

export type StructureInit = {
  structure: number;
  structureCost: Resource;

  structureResourceGeneration: Resource;
  structureUpgrade: number;
  structureUpgradeMultiplier: number;
  structureUpgradeCost: Resource;
  structureResourceGenerationDefault: Resource;
  structureCostDefault: Resource;
  structureUpgradeCostDefault: Resource;
};

const grandmaInit: StructureInit = {
  structure: 0,
  structureCost: {
    cookies: 100,
  } as Resource,

  structureResourceGeneration: {
    cookies: 1,
  } as Resource,
  structureUpgrade: 0,

  structureUpgradeCost: {
    cookies: 100,
  } as Resource,
  structureUpgradeMultiplier: 1.4,

  structureResourceGenerationDefault: {
    cookies: 1,
  } as Resource,
  structureCostDefault: { cookies: 20 } as Resource,
  structureUpgradeCostDefault: { cookies: 100 } as Resource,
};
const autoClickerInit: StructureInit = {
  structure: 0,
  structureCost: {
    cookies: 15,
  },

  structureResourceGeneration: {
    cookies: 0.1,
  } as Resource,
  structureUpgrade: 0,
  structureResourceGenerationDefault: {
    cookies: 1,
  },
  structureUpgradeCost: {
    cookies: 100,
  } as Resource,
  structureUpgradeMultiplier: 1.15,
  structureCostDefault: { cookies: 10 } as Resource,
  structureUpgradeCostDefault: { cookies: 100 } as Resource,
};

export default class Clicker {
  private resource: Resource;
  public grandma: Structure;
  public autoClicker: Cursor = new Cursor(this);
  private clickResourceGeneration: Resource;
  private resourceGeneration: Resource;
  constructor(
    {
      resource,
      clickResourceGeneration,
      resourceGeneration,
      grandma,
    }: gameInit = {
      resource: {
        cookies: 0,
      } as Resource,
      clickResourceGeneration: { cookies: 1 } as Resource,
      resourceGeneration: {
        cookies: 0,
      } as Resource,

      grandma: new Structure(grandmaInit),
    }
  ) {
    this.resource = resource;
    this.clickResourceGeneration = clickResourceGeneration;
    this.resourceGeneration = resourceGeneration;
    this.grandma = grandma;

    // this.autoClicker = autoClicker;
    this.PassiveCalculateResourceGeneration();
    this.initialize();
  }
  private initialize(): void {
    this.autoClicker = new Cursor(this);
  }

  private PassiveCalculateResourceGeneration(): void {
    this.resourceGeneration.cookies = 0;
    const Structs: Resource[] = [];
    // Required to Add more Structures
    Structs.push(this.grandma.getStructureResourceGeneration());
    Structs.push(this.autoClicker.getStructureResourceGeneration());
    Structs.forEach((struct) => {
      this.resourceGeneration.cookies += struct.cookies;
    });
  }
  public getClickResourceGeneration(): Resource {
    return this.clickResourceGeneration;
  }
  public ClickCalculateResourceGeneration(): void {
    let start = 1;

    for (let i = 1; i < this.autoClicker.getStructureUpgrade() + 1; i++) {
      if (i !== 4 && i <= 15) {
        start *= this.autoClicker.cursorUpgrades.get(i.toString())?.multiplier!;
      } else if (i === 4) {
        start += this.autoClicker.getNoneCursorAmount() * 0.1;
      }
    }

    this.clickResourceGeneration.cookies = start;
  }
  public getPassiveResourceGeneration(): Resource {
    return this.resourceGeneration;
  }
  // Grandma
  public buyGrandma(): void {
    this.grandma.increaseStructure(this.resource);
    this.PassiveCalculateResourceGeneration();
  }
  public buyGrandmaUpgrade(): void {
    this.grandma.buyUpgradeStructure(this.resource);
    this.PassiveCalculateResourceGeneration();
  }
  // AutoClicker
  public buyAutoClicker(): void {
    this.autoClicker.increaseStructure(this.resource);
    this.PassiveCalculateResourceGeneration();
  }
  public buyAutoClickerUpgrade(): void {
    this.autoClicker.buyUpgradeLevel(this.resource);
    this.PassiveCalculateResourceGeneration();
  }
  public increaseResource(addValue: Resource): void {
    this.resource.cookies += addValue.cookies;
  }

  public get_resources(): Resource {
    return this.resource;
  }
  public get_string_Number(): string {
    return Math.floor(this.resource.cookies).toString();
  }
}
class Global {
  //Help Function to update the cost of the upgrade
  public updateCost(
    currentCost: Resource,
    base: Resource,
    totalBuilding: number
  ): Resource {
    currentCost.cookies = base.cookies * 1.15 ** totalBuilding;
    return currentCost;
  }
  //Help Function to check if the player can buy the upgrade
  public canBuy(currentCost: Resource, cookies: Resource): boolean {
    if (cookies.cookies > currentCost.cookies) {
      return true;
    }

    // Gold and Silver are equal, now compare bronze
    return false;
  }
  //Help Function to buy the upgrade or structure
  public buyUpgrade(currentCost: Resource, cookies: Resource): void {
    cookies.cookies -= currentCost.cookies;
  }
  //Help Function to convert the resource to a string
  public ResourceToString(resource: Resource): string {
    return resource.cookies.toString();
  }
}

export class Structure extends Global {
  private structure: number;
  private structureCost: Resource;

  public structureResourceGeneration: Resource;
  private structureUpgrade: number;
  private structureUpgradeMultiplier: number;
  private structureUpgradeCost: Resource;
  public structureResourceGenerationDefault: Resource;
  private structureCostDefault: Resource;
  private structureUpgradeCostDefault: Resource;
  constructor({
    structure,
    structureCost,

    structureResourceGeneration,
    structureResourceGenerationDefault,
    structureUpgrade,
    structureUpgradeCost,
    structureUpgradeMultiplier,
    structureCostDefault,
    structureUpgradeCostDefault,
  }: StructureInit) {
    super();
    this.structure = structure;
    this.structureCost = structureCost;
    this.structureResourceGeneration = structureResourceGeneration;
    this.structureResourceGenerationDefault =
      structureResourceGenerationDefault;
    this.structureUpgrade = structureUpgrade;
    this.structureUpgradeCost = structureUpgradeCost;

    this.structureUpgradeMultiplier = structureUpgradeMultiplier;
    this.structureCostDefault = structureCostDefault;
    this.structureUpgradeCostDefault = structureUpgradeCostDefault;
  }
  public getStructureResourceGeneration(): Resource {
    return {
      cookies: this.structureResourceGeneration.cookies * this.structure,
    };
  }
  // Not Happy with this function
  private calculateStructureResourceGeneration(): void {
    this.structureResourceGeneration = this.structureResourceGenerationDefault;
    for (let i = 0; i < this.structureUpgrade; i++) {
      this.structureResourceGeneration.cookies *=
        this.structureUpgradeMultiplier;
    }
  }
  public buyUpgradeStructure(cookies: Resource): void {
    this.canBuy(this.structureUpgradeCost, cookies);
    this.buyUpgrade(this.structureUpgradeCost, cookies);
    this.structureUpgrade += 1;
    this.calculateStructureResourceGeneration();
    this.increaseStructureUpgradeCost();
  }
  private increaseStructureUpgradeCost(): void {
    this.updateCost(
      this.structureUpgradeCost,
      this.structureUpgradeCostDefault,
      this.structureUpgrade
    );
  }
  public getStructureCost(): Resource {
    return this.structureCost;
  }
  public getStructureCostString(): string {
    return this.ResourceToString(this.structureCost);
  }
  public getStructureUpgradeCost(): string {
    return this.ResourceToString(this.structureUpgradeCost);
  }
  public getStructureUpgrade(): number {
    return this.structureUpgrade;
  }
  public canBuyStructure(cookies: Resource): boolean {
    return this.canBuy(this.structureCost, cookies);
  }
  public canBuyStructureUpgrade(cookies: Resource): boolean {
    return this.canBuy(this.structureUpgradeCost, cookies);
  }
  public increaseStructure(cookies: Resource): void {
    this.buyUpgrade(this.structureCost, cookies);
    this.structure += 1;
    this.increaseStructureCost();
  }
  public increaseStructureLevel(): void {
    this.structureUpgrade += 1;
  }
  private increaseStructureCost(): void {
    this.structureCost = this.updateCost(
      this.structureCost,
      this.structureCostDefault,
      this.structure
    );
  }
  public getStructureAmount(): number {
    return this.structure;
  }
}

class Cursor extends Structure {
  public cursorUpgrades1 = {
    "1": {
      id: 1,
      name: "Reinforced Index Finger",
      cost: { cookies: 100 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
    },
    "2": {
      id: 2,
      name: "Carpal Tunnel Prevention Cream",
      cost: { cookies: 500 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
    },
    "3": {
      id: 3,
      name: "Ambidextrous",
      cost: { cookies: 10000 },
      multiplier: 2,
      requirement: 10,
      acquired: false,
    },
    "4": {
      id: 4,
      name: "Thousand Fingers",
      cost: { cookies: 100000 },
      multiplier: 0.1, // This requires a special function to check every Building that exists
      requirement: 25,
      acquired: false,
    },
    "5": {
      id: 5,
      name: "Million Fingers",
      cost: { cookies: 10000000 },
      multiplier: 5, // Increase the first 1000 cursor by 5?
      requirement: 50,
      acquired: false,
    },
    "6": {
      id: 6,
      name: "Billion Fingers",
      cost: { cookies: 1000000000 },
      multiplier: 10, // Increase the first 1000 cursor by 10?
      requirement: 100,
      acquired: false,
    },
    "7": {
      id: 7,
      name: "Trillion Fingers",
      cost: { cookies: 100000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 150,
      acquired: false,
    },
    "8": {
      id: 8,
      name: "Quadrillion Fingers",
      cost: { cookies: 10000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 200,
      acquired: false,
    },
    "9": {
      id: 9,
      name: "Quintillion Fingers",
      cost: { cookies: 1000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 250,
      acquired: false,
    },
    "10": {
      id: 10,
      name: "Sextillion Fingers",
      cost: { cookies: 100000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 300,
      acquired: false,
    },
    "11": {
      id: 11,
      name: "Septillion Fingers",
      cost: { cookies: 10000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 350,
      acquired: false,
    },
    "12": {
      id: 12,
      name: "Octillion Fingers",
      cost: { cookies: 1000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 400,
      acquired: false,
    },
    "13": {
      id: 13,
      name: "Nonillion Fingers",
      cost: { cookies: 100000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 450,
      acquired: false,
    },
    "14": {
      id: 14,
      name: "Decillion Fingers",
      cost: { cookies: 10000000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 500,
      acquired: false,
    },
    "15": {
      id: 15,
      name: "Undecillion Fingers",
      cost: { cookies: 1000000000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 550,
      acquired: false,
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
    this.game.ClickCalculateResourceGeneration();
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
  public getNoneCursorAmount(): number {
    let amount = 0;
    amount += this.game.grandma.getStructureAmount();
    return amount;
  }
}
