export type Resource = {
  cookies: number;
};
type UpgradeType = {
  id: number;
  name: string;
  cost: Resource;
  multiplier: number;
  requirement: number;
  acquired: boolean;
  type: "cursor" | "grandma";
};
export type gameInit = {
  resource: Resource;
  clickResourceGeneration: Resource;
  resourceGeneration: Resource;
  // grandma: Structure;
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
  public grandma: Grandma = new Grandma(this);
  public autoClicker: Cursor = new Cursor(this);

  private clickResourceGeneration: Resource;
  private resourceGeneration: Resource;
  constructor(
    { resource, clickResourceGeneration, resourceGeneration }: gameInit = {
      resource: {
        cookies: 0,
      } as Resource,
      clickResourceGeneration: { cookies: 1 } as Resource,
      resourceGeneration: {
        cookies: 0,
      } as Resource,
    }
  ) {
    this.resource = resource;
    this.clickResourceGeneration = clickResourceGeneration;
    this.resourceGeneration = resourceGeneration;

    // this.autoClicker = autoClicker;
    this.PassiveCalculateResourceGeneration();
    this.initialize();
  }
  private initialize(): void {
    this.autoClicker = new Cursor(this);
    this.grandma = new Grandma(this);
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

    this.autoClicker.cursorUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        start *= upgrade.multiplier;
      }
    });

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
  public buyAutoClickerUpgrade(id: number): void {
    this.autoClicker.buyUpgradeLevel(this.resource, id);
    this.PassiveCalculateResourceGeneration();
  }
  public increaseResource(addValue: Resource): void {
    this.resource.cookies += addValue.cookies;
  }
  public buyStructureUpgrade(id: number, type: string): void {
    if (type === "cursor") {
      this.autoClicker.buyUpgradeLevel(this.resource, id);
    }
    if (type === "grandma") {
      this.grandma.buyUpgradeLevel(this.resource, id);
    }

    this.PassiveCalculateResourceGeneration();
  }
  public canBuyStructureUpgrade(id: number, type: String): boolean {
    if (type === "cursor") {
      return this.autoClicker.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "grandma") {
      return this.grandma.canBuyStructureUpgrade(this.resource, id);
    }
    return false;
  }
  public get_resources(): Resource {
    return this.resource;
  }
  public get_string_Number(): string {
    return Math.floor(this.resource.cookies).toString();
  }
  public getPossibleUpgradeList(): UpgradeType[] {
    const list: UpgradeType[] = [
      ...this.autoClicker.getUpgradesInRange(),
      ...this.grandma.getUpgradesInRange(),
    ].sort((a, b) => {
      return a.cost.cookies - b.cost.cookies;
    });

    return list;
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
    return Math.floor(resource.cookies).toString();
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
  public getStructureUpgradeCost(id?: number): string {
    return this.ResourceToString(this.structureUpgradeCost);
  }
  public getStructureUpgrade(): number {
    return this.structureUpgrade;
  }
  public canBuyStructure(cookies: Resource): boolean {
    return this.canBuy(this.structureCost, cookies);
  }
  public canBuyStructureUpgrade(cookies: Resource, id?: number): boolean {
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
      type: "cursor",
    } as UpgradeType,
    "2": {
      id: 2,
      name: "Carpal Tunnel Prevention Cream",
      cost: { cookies: 500 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "3": {
      id: 3,
      name: "Ambidextrous",
      cost: { cookies: 10000 },
      multiplier: 2,
      requirement: 10,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "4": {
      id: 4,
      name: "Thousand Fingers",
      cost: { cookies: 100000 },
      multiplier: 0.1, // This requires a special function to check every Building that exists
      requirement: 25,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "5": {
      id: 5,
      name: "Million Fingers",
      cost: { cookies: 10000000 },
      multiplier: 5, // Increase the first 1000 cursor by 5?
      requirement: 50,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "6": {
      id: 6,
      name: "Billion Fingers",
      cost: { cookies: 1000000000 },
      multiplier: 10, // Increase the first 1000 cursor by 10?
      requirement: 100,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "7": {
      id: 7,
      name: "Trillion Fingers",
      cost: { cookies: 100000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 150,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "8": {
      id: 8,
      name: "Quadrillion Fingers",
      cost: { cookies: 10000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 200,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "9": {
      id: 9,
      name: "Quintillion Fingers",
      cost: { cookies: 1000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 250,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "10": {
      id: 10,
      name: "Sextillion Fingers",
      cost: { cookies: 100000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 300,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "11": {
      id: 11,
      name: "Septillion Fingers",
      cost: { cookies: 10000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 350,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "12": {
      id: 12,
      name: "Octillion Fingers",
      cost: { cookies: 1000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 400,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "13": {
      id: 13,
      name: "Nonillion Fingers",
      cost: { cookies: 100000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 450,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "14": {
      id: 14,
      name: "Decillion Fingers",
      cost: { cookies: 10000000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 500,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "15": {
      id: 15,
      name: "Undecillion Fingers",
      cost: { cookies: 1000000000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 550,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
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
  public getUpgradesInRange(): UpgradeType[] {
    const list: UpgradeType[] = [];
    this.cursorUpgrades.forEach((value, key) => {
      if (this.getStructureAmount() >= value.requirement && !value.acquired) {
        list.push(value);
      }
    });
    return list;
  }
  // Needs Requirements Check TODO
  public buyUpgradeLevel(cookies: Resource, id: number): void {
    const nextUpgrade = this.cursorUpgrades.get(id.toString());
    if (!nextUpgrade) {
      return;
    }
    if (!this.canBuyStructureUpgrade(cookies, id)) {
      return;
    }
    cookies.cookies = cookies.cookies - nextUpgrade.cost.cookies;
    nextUpgrade.acquired = true;
    this.calculateStructureResourceGeneration1();
    this.game.ClickCalculateResourceGeneration();
  }
  // Fix name after a concrete Plan
  public calculateStructureResourceGeneration1(): void {
    this.structureResourceGeneration.cookies =
      this.structureResourceGenerationDefault.cookies;
    this.cursorUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.cursorUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.cursorUpgrades.get(id.toString());
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

class Grandma extends Structure {
  public grandmaUpgrades1: { [key: string]: UpgradeType } = {
    "16": {
      id: 16,
      name: "Forwards from grandma",
      cost: { cookies: 1000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "grandma",
    } as UpgradeType,
    "17": {
      id: 17,
      name: "Steel-plated rolling pins",
      cost: { cookies: 5000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "grandma",
    },
    "18": {
      id: 18,
      name: "Lubricated dentures",
      cost: { cookies: 50000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "grandma",
    },
    "19": {
      id: 19,
      name: "Prune juice",
      cost: { cookies: 5_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "grandma",
    },
    "20": {
      id: 20,
      name: "Double-thick glasses",
      cost: { cookies: 500_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "grandma",
    },
    "21": {
      id: 21,
      name: "Aging agents",
      cost: { cookies: 50_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "grandma",
    },
    "22": {
      id: 22,
      name: "Xtreme walkers",
      cost: { cookies: 50_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "grandma",
    },
    "23": {
      id: 23,
      name: "The Unbridling",
      cost: { cookies: 50_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "grandma",
    },
    "24": {
      id: 24,
      name: "Reverse dementia",
      cost: { cookies: 50_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "grandma",
    },
    "25": {
      id: 25,
      name: "Timeproof hair dyes",
      cost: { cookies: 50_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "grandma",
    },
    "26": {
      id: 26,
      name: "Good manners",
      cost: { cookies: 50_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "grandma",
    },
    "27": {
      id: 27,
      name: "Generation degeneration",
      cost: { cookies: 50_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "grandma",
    },
    "28": {
      id: 28,
      name: "Visits",
      cost: { cookies: 50_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "grandma",
    },
    "29": {
      id: 29,
      name: "Kitchen cabinets",
      cost: { cookies: 50_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "grandma",
    },
    "30": {
      id: 30,
      name: "Foam-tipped canes",
      cost: { cookies: 50_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "grandma",
    },
  };
  public grandmaUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.grandmaUpgrades1)
  );
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 100 },
      structureResourceGeneration: { cookies: 1 },
      structureResourceGenerationDefault: { cookies: 1 },
      structureUpgrade: 0,
      structureUpgradeCost: { cookies: 100 },
      structureUpgradeMultiplier: 2, // Not Used to remove
      structureCostDefault: { cookies: 100 },
      structureUpgradeCostDefault: { cookies: 100 },
    });
    this.game = game;
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.grandmaUpgrades.forEach((upgrade) => {
      if (
        upgrade.requirement <= this.getStructureAmount() &&
        !upgrade.acquired
      ) {
        upgrades.push(upgrade);
      }
    });
    return upgrades;
  }
  public buyUpgradeLevel(cookies: Resource, id: number): void {
    const upgrade = this.grandmaUpgrades.get(id.toString());
    if (!upgrade) return;
    if (!this.canBuyStructureUpgrade(cookies, id)) return;
    cookies.cookies -= upgrade.cost.cookies;
    upgrade.acquired = true;
    this.calculateStructureResourceGeneration1();
    this.game.ClickCalculateResourceGeneration();
  }
  public calculateStructureResourceGeneration1(): void {
    this.structureResourceGeneration.cookies =
      this.structureResourceGenerationDefault.cookies;
    this.grandmaUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.grandmaUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.grandmaUpgrades.get(id.toString());
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
}
