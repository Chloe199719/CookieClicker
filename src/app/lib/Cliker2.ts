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
  description: string;
  type: "cursor" | "grandma" | "farm" | "mine" | "factory" | "bank";
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
  structureCostDefault: Resource;
  structureResourceGeneration: Resource;

  structureResourceGenerationDefault: Resource;
};

// const grandmaInit: StructureInit = {
//   structure: 0,
//   structureCost: {
//     cookies: 100,
//   } as Resource,

//   structureResourceGeneration: {
//     cookies: 1,
//   } as Resource,
//   structureUpgrade: 0,

//   structureUpgradeCost: {
//     cookies: 100,
//   } as Resource,
//   structureUpgradeMultiplier: 1.4,

//   structureResourceGenerationDefault: {
//     cookies: 1,
//   } as Resource,
//   structureCostDefault: { cookies: 20 } as Resource,
//   structureUpgradeCostDefault: { cookies: 100 } as Resource,
// };
// const autoClickerInit: StructureInit = {
//   structure: 0,
//   structureCost: {
//     cookies: 15,
//   },

//   structureResourceGeneration: {
//     cookies: 0.1,
//   } as Resource,
//   structureUpgrade: 0,
//   structureResourceGenerationDefault: {
//     cookies: 1,
//   },
//   structureUpgradeCost: {
//     cookies: 100,
//   } as Resource,
//   structureUpgradeMultiplier: 1.15,
//   structureCostDefault: { cookies: 10 } as Resource,
//   structureUpgradeCostDefault: { cookies: 100 } as Resource,
// };

export default class Clicker {
  private resource: Resource;
  public grandma: Grandma = new Grandma(this);
  public autoClicker: Cursor = new Cursor(this);
  public farm: Farm = new Farm(this);
  public mine: Mine = new Mine(this);
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
    this.farm = new Farm(this);
    this.mine = new Mine(this);
  }

  private PassiveCalculateResourceGeneration(): void {
    this.resourceGeneration.cookies = 0;
    const Structs: Resource[] = [];
    // Required to Add more Structures
    Structs.push(this.grandma.getStructureResourceGeneration());
    Structs.push(this.autoClicker.getStructureResourceGeneration());
    Structs.push(this.farm.getStructureResourceGeneration());
    Structs.push(this.mine.getStructureResourceGeneration());
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
  // AutoClicker
  public buyAutoClicker(): void {
    this.autoClicker.increaseStructure(this.resource);
    this.PassiveCalculateResourceGeneration();
  }
  // Farm
  public buyFarm(): void {
    this.farm.increaseStructure(this.resource);
    this.PassiveCalculateResourceGeneration();
  }
  // Mine
  public buyMine(): void {
    this.mine.increaseStructure(this.resource);
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
    if (type === "farm") {
      this.farm.buyUpgradeLevel(this.resource, id);
    }
    if (type === "mine") {
      this.mine.buyUpgradeLevel(this.resource, id);
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
    if (type === "farm") {
      return this.farm.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "mine") {
      return this.mine.canBuyStructureUpgrade(this.resource, id);
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
      ...this.farm.getUpgradesInRange(),
      ...this.mine.getUpgradesInRange(),
    ].sort((a, b) => {
      return a.cost.cookies - b.cost.cookies;
    });

    return list;
  }
  public SaveGame() {
    let save = {
      resource: this.resource,
      grandma: {
        structure: this.grandma.structure,
        structureCost: this.grandma.structureCost,
        grandmaUpgrades: Object.fromEntries(this.grandma.grandmaUpgrades),
      },
      autoClicker: {
        structure: this.autoClicker.structure,
        structureCost: this.autoClicker.structureCost,

        cursorUpgrades: Object.fromEntries(this.autoClicker.cursorUpgrades),
      },
      farm: {
        structure: this.farm.structure,
        structureCost: this.farm.structureCost,

        farmUpgrades: Object.fromEntries(this.farm.farmUpgrades),
      },
      mine: {
        structure: this.mine.structure,
        structureCost: this.mine.structureCost,
        mineUpgrades: Object.fromEntries(this.mine.mineUpgrades),
      },
    };
    return save;
  }
  public LoadGame(save: any) {
    // Set Cookies
    this.resource = save.resource;
    // Set the Grandma
    this.grandma.structureCost = save.grandma.structureCost;
    this.grandma.structure = save.grandma.structure;
    this.grandma.grandmaUpgrades = new Map(
      Object.entries(save.grandma.grandmaUpgrades)
    );
    this.grandma.calculateStructureResourceGeneration1();
    // Set the Cursor
    this.autoClicker.structureCost = save.autoClicker.structureCost;
    this.autoClicker.structure = save.autoClicker.structure;
    this.autoClicker.cursorUpgrades = new Map(
      Object.entries(save.autoClicker.cursorUpgrades)
    );
    this.autoClicker.calculateStructureResourceGeneration1();
    // Set the farm
    this.farm.structureCost = save.farm.structureCost;
    this.farm.structure = save.farm.structure;
    this.farm.farmUpgrades = new Map(Object.entries(save.farm.farmUpgrades));
    this.farm.calculateStructureResourceGeneration1();
    // Set the mine
    this.mine.structureCost = save.mine.structureCost;
    this.mine.structure = save.mine.structure;
    this.mine.mineUpgrades = new Map(Object.entries(save.mine.mineUpgrades));
    this.mine.calculateStructureResourceGeneration1();

    // Reload Game generation
    this.PassiveCalculateResourceGeneration();
    this.ClickCalculateResourceGeneration();
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
  public structure: number;
  public structureCost: Resource;

  public structureResourceGeneration: Resource;

  private structureCostDefault: Resource;
  public structureResourceGenerationDefault: Resource;

  constructor({
    structure,
    structureCost,
    structureCostDefault,
    structureResourceGeneration,
    structureResourceGenerationDefault,
  }: StructureInit) {
    super();
    this.structure = structure;
    this.structureCost = structureCost;
    this.structureCostDefault = structureCostDefault;
    this.structureResourceGeneration = structureResourceGeneration;
    this.structureResourceGenerationDefault =
      structureResourceGenerationDefault;
  }
  public increaseStructure(cookies: Resource): void {
    this.buyUpgrade(this.structureCost, cookies);
    this.structure += 1;
    this.increaseStructureCost();
  }
  private increaseStructureCost(): void {
    this.structureCost = this.updateCost(
      this.structureCost,
      this.structureCostDefault,
      this.structure
    );
  }
  public getStructureResourceGeneration(): Resource {
    return {
      cookies: this.structureResourceGeneration.cookies * this.structure,
    };
  }

  public getStructureCost(): Resource {
    return this.structureCost;
  }
  public getStructureCostString(): string {
    return this.ResourceToString(this.structureCost);
  }

  public canBuyStructure(cookies: Resource): boolean {
    return this.canBuy(this.structureCost, cookies);
  }
  public getBuildingCPS(): string {
    return (this.structureResourceGeneration.cookies * this.structure).toFixed(
      2
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
      description: `The mouse and cursors are twice as efficient.
      "prod prod"`,
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
      description: `The mouse and cursors are twice as efficient.
      "it... it hurts to click..."`,
      cost: { cookies: 500 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "3": {
      id: 3,
      name: "Ambidextrous",
      description: `The mouse and cursors are twice as efficient.
      "Look ma, both hands!"`,
      cost: { cookies: 10000 },
      multiplier: 2,
      requirement: 10,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "4": {
      id: 4,
      name: "Thousand Fingers",
      description: `The mouse and cursors gain +0.1 cookies for each non-cursor object owned.`,
      cost: { cookies: 100000 },
      multiplier: 0.1, // This requires a special function to check every Building that exists
      requirement: 25,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "5": {
      id: 5,
      name: "Million Fingers",
      description: `Multiplies the gain from Thousand fingers by 5.
      "clickityclickity"`,
      cost: { cookies: 10000000 },
      multiplier: 5, // Increase the first 1000 cursor by 5?
      requirement: 50,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "6": {
      id: 6,
      name: "Billion Fingers",
      description: `Multiplies the gain from Thousand fingers by 10.`,
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
      description: `Multiplies the gain from Thousand fingers by 20.`,
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 150,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "8": {
      id: 8,
      name: "Quadrillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 10000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 200,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "9": {
      id: 9,
      name: "Quintillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 1000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 250,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "10": {
      id: 10,
      name: "Sextillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 100000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 300,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "11": {
      id: 11,
      name: "Septillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 10000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 350,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "12": {
      id: 12,
      name: "Octillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 1000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 400,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "13": {
      id: 13,
      name: "Nonillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 100000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 450,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "14": {
      id: 14,
      name: "Decillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 10000000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 500,
      acquired: false,
      type: "cursor",
    } as UpgradeType,
    "15": {
      id: 15,
      name: "Undecillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
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
      structureResourceGeneration: { cookies: 0.0 },
      structureResourceGenerationDefault: { cookies: 0.1 },

      structureCostDefault: { cookies: 15 },
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
      description: `Grandmas are twice as efficient.
      "RE:RE:thought you'd get a kick out of this ;))"`,
      cost: { cookies: 1000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "grandma",
    },
    "17": {
      id: 17,
      name: "Steel-plated rolling pins",
      description: `Grandmas are twice as efficient.
      "Just what you kneaded."`,
      cost: { cookies: 5000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "grandma",
    },
    "18": {
      id: 18,
      name: "Lubricated dentures",
      description: `Grandmas are twice as efficient.
      "squish"`,
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
      description: `Grandmas are twice as efficient.
      "Gets me going."`,
    },
    "20": {
      id: 20,
      name: "Double-thick glasses",
      cost: { cookies: 500_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Oh... so THAT's what I've been baking."`,
    },
    "21": {
      id: 21,
      name: "Aging agents",
      cost: { cookies: 50_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Counter-intuitively, grandmas have the uncanny ability to become more powerful the older they get."`,
    },
    "22": {
      id: 22,
      name: "Xtreme walkers",
      cost: { cookies: 50_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Complete with flame decals and a little horn that goes "toot"."`,
    },
    "23": {
      id: 23,
      name: "The Unbridling",
      cost: { cookies: 50_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "It might be a classic tale of bad parenting, but let's see where grandma is going with this."`,
    },
    "24": {
      id: 24,
      name: "Reverse dementia",
      cost: { cookies: 50_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Extremely unsettling, and somehow even worse than the regular kind."`,
    },
    "25": {
      id: 25,
      name: "Timeproof hair dyes",
      cost: { cookies: 50_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Why do they always have those strange wispy pink dos? What do they know about candy floss that we don't?"`,
    },
    "26": {
      id: 26,
      name: "Good manners",
      cost: { cookies: 50_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Apparently these ladies are much more amiable if you take the time to learn their strange, ancient customs, which seem to involve saying "please" and "thank you" and staring at the sun with bulging eyes while muttering eldritch curses under your breath."`,
    },
    "27": {
      id: 27,
      name: "Generation degeneration",
      cost: { cookies: 50_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Genetic testing shows that most of your grandmas are infected with a strange degenerative disease that only seems to further their powers; the more time passes, the older they get. This should concern you."`,
    },
    "28": {
      id: 28,
      name: "Visits",
      cost: { cookies: 50_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "In an extensive double-blind study (sample size: 12 millions), your researchers have found evidence that grandmas are up to twice as productive if you just come by and say hi once in a while. It's nice to check up on your grans! (Do not under any circumstances ingest any tea or tea-like substances the grandmas may offer you.)."`,
    },
    "29": {
      id: 29,
      name: "Kitchen cabinets",
      cost: { cookies: 50_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "A grandma's kitchen cabinet is a befuddling place. Through lesser-studied aggregating instincts, grandmas will tend to gradually fill all nearby cabinets with various sorts of things, such as curious coconut snacks or dietetic powders. By contract, these are legally yours, which opens up exciting opportunities for your substance investigation department."`,
    },
    "30": {
      id: 30,
      name: "Foam-tipped canes",
      cost: { cookies: 50_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Perhaps the result of prolonged service, your grandmas have developed all kinds of odd and aggressive hierarchies among themselves; these will help them not hurt each other as bad during their endless turf wars."`,
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

      structureCostDefault: { cookies: 100 },
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

class Farm extends Structure {
  public farmUpgrades1: { [key: string]: UpgradeType } = {
    "31": {
      id: 31,
      name: "Cheap hoes",
      cost: { cookies: 11_000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Rake in the dough!"`,
    },
    "32": {
      id: 32,
      name: "Fertilizer",
      cost: { cookies: 55_000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "It's chocolate, I swear."`,
    },
    "33": {
      id: 33,
      name: "Cookie trees",
      cost: { cookies: 550_000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "A relative of the breadfruit."`,
    },
    "34": {
      id: 34,
      name: "Genetically-modified cookies",
      cost: { cookies: 55_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "All-natural mutations."`,
    },
    "35": {
      id: 35,
      name: "Gingerbread scarecrows",
      cost: { cookies: 550_000_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Staring at your crops with mischievous glee."`,
    },
    "36": {
      id: 36,
      name: "Pulsar sprinklers",
      cost: { cookies: 550_000_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "There's no such thing as over-watering. The moistest is the bestest."`,
    },
    "37": {
      id: 37,
      name: "Fudge fungus",
      cost: { cookies: 550_000_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "A sugary parasite whose tendrils help cookie growth.
      Please do not breathe in the spores. In case of spore ingestion, seek medical help within the next 36 seconds."`,
    },
    "38": {
      id: 38,
      name: "Wheat triffids",
      cost: { cookies: 550_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Taking care of crops is so much easier when your plants can just walk about and help around the farm.
      Do not pet. Do not feed. Do not attempt to converse with."`,
    },
    "39": {
      id: 39,
      name: "Humane pesticides",
      cost: { cookies: 550_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Made by people, for people, from people and ready to unleash some righteous scorching pain on those pesky insects that so deserve it."`,
    },
    "40": {
      id: 40,
      name: "Barnstars",

      cost: { cookies: 550_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Ah, yes. These help quite a bit. Somehow."`,
    },
    "41": {
      id: 41,
      name: "Lindworms",
      cost: { cookies: 550_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "You have to import these from far up north, but they really help areate the soil!"`,
    },
    "42": {
      id: 42,
      name: "Global seed vault",
      cost: { cookies: 550_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "An enormous genetic repository that could outlive an apocalypse. Guarantees the survival of your empire, or at the very least its agricultural components, should civilization fall. Which should be any day now."`,
    },
    "43": {
      id: 43,
      name: "Reverse-veganism",
      cost: { cookies: 550_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Plants aren't for eating, plants are for exploitative agriculture and astronomical profit margins!"`,
    },
    "44": {
      id: 44,
      name: "Cookie mulch",
      cost: { cookies: 550_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Grinding surplus cookies into paste that you then spread onto your fields enables a strange feedback loop in the quality of your cookie crops. Cookie feeding on cookie should be an abomination, but then why does it taste so good?"`,
    },
    "45": {
      id: 45,
      name: "Self-driving tractors",
      cost: {
        cookies: 550_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Embarked AI lets your field vehicles sow and harvest cookie crops at any time of the day or night, and with so few human casualties, too!"`,
    },
  };
  public farmUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.farmUpgrades1)
  );
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 1100 },
      structureResourceGeneration: { cookies: 8 },
      structureResourceGenerationDefault: { cookies: 8 },

      structureCostDefault: { cookies: 1100 },
    });
    this.game = game;
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.farmUpgrades.forEach((upgrade) => {
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
    const upgrade = this.farmUpgrades.get(id.toString());
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
    this.farmUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.farmUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.farmUpgrades.get(id.toString());
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
class Mine extends Structure {
  public farmUpgrades1: { [key: string]: UpgradeType } = {
    "46": {
      id: 46,
      name: "Sugar gas",
      cost: { cookies: 120_000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "A pink, volatile gas, found in the depths of some chocolate caves."`,
    },
    "47": {
      id: 47,
      name: "Megadrill",
      cost: { cookies: 600_000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "You're in deep."`,
    },
    "48": {
      id: 48,
      name: "Ultradrill",
      cost: { cookies: 6_000_000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "Finally caved in?"`,
    },
    "49": {
      id: 49,
      name: "Ultimadrill",
      cost: { cookies: 600_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "Pierce the heavens, etc."`,
    },
    "50": {
      id: 50,
      name: "H-bomb mining",
      cost: { cookies: 60_000_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "Questionable efficiency, but spectacular nonetheless."`,
    },
    "51": {
      id: 51,
      name: "Coreforge",
      cost: { cookies: 6_000_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "You've finally dug a tunnel down to the Earth's core. It's pretty warm down here."`,
    },
    "52": {
      id: 52,
      name: "Planetsplitters",
      cost: { cookies: 6_000_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "These new state-of-the-art excavators have been tested on Merula, Globort and Flwanza VI, among other distant planets which have been curiously quiet lately."`,
    },
    "53": {
      id: 53,
      name: "Canola oil wells",
      cost: { cookies: 6_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "A previously untapped resource, canola oil permeates the underground olifers which grant it its particular taste and lucrative properties."`,
    },
    "54": {
      id: 54,
      name: "Mole people",
      cost: { cookies: 6_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "Engineered from real human beings within your very labs, these sturdy little folks have a knack for finding the tastiest underground minerals in conditions that more expensive machinery probably wouldn't survive."`,
    },
    "55": {
      id: 55,
      name: "Mine canaries",
      cost: { cookies: 6_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "These aren't used for anything freaky! The miners just enjoy having a pet or two down there."`,
    },
    "56": {
      id: 56,
      name: "Bore again",
      cost: { cookies: 6_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "After extracting so much sediment for so long, you've formed some veritable mountains of your own from the accumulated piles of rock and dirt. Time to dig through those and see if you find anything fun!"`,
    },
    "57": {
      id: 57,
      name: "Air mining",
      cost: { cookies: 6_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "You've dug your drills through just about every solid surface you could find. But did you know recent advances have revealed untold riches hiding within non-solid surfaces too?"`,
    },
    "58": {
      id: 58,
      name: "Caramel alloys",
      cost: { cookies: 6_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "Your geologists have isolated a family of once-overlooked sugary ores that, when combined, may be turned into even more cookie ingredients. Your millions of miles of previously useless tunnels probably house insane amounts of the stuff!"`,
    },
    "59": {
      id: 59,
      name: "Delicious mineralogy",
      cost: { cookies: 6_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "Stratum after stratum, you've extracted strange new minerals heretofore unknown to geology. Ushering a new era of materials research, your scientists have been able to identify every new element your mines have discovered, including whatever those things are in the upgrade tier names."`,
    },
    "60": {
      id: 60,
      name: "Mineshaft supports",
      cost: { cookies: 6_000_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "You were rather skeptical about installing such embarrassingly low-tech implements, but limiting the number of daily cave-ins really does help with that annoying employee turnover!"`,
    },
  };
  public mineUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.farmUpgrades1)
  );
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 12_000 },
      structureResourceGeneration: { cookies: 47 },
      structureResourceGenerationDefault: { cookies: 47 },

      structureCostDefault: { cookies: 12_000 },
    });
    this.game = game;
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.mineUpgrades.forEach((upgrade) => {
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
    const upgrade = this.mineUpgrades.get(id.toString());
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
    this.mineUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.mineUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.mineUpgrades.get(id.toString());
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
