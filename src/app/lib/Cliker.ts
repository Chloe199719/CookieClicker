export type Resource = {
  gold: number;
  silver: number;
  bronze: number;
};
export type gameInit = {
  resource: Resource;
  clickResourceGeneration: Resource;
  resourceGeneration: Resource;
  grandma: Structure;
  autoClicker: Structure;
};

export type StructureInit = {
  structure: number;
  structureCost: Resource;
  structureCostIncrease: number;
  structureResourceGeneration: Resource;
  structureUpgrade: number;
  structureUpgradeMultiplier: number;
  structureUpgradeCost: Resource;
  structureUpgradeCostIncrease: number;
  structureResourceGenerationDefault: Resource;
};

const grandmaInit: StructureInit = {
  structure: 0,
  structureCost: {
    gold: 0,
    silver: 0,
    bronze: 20,
  } as Resource,
  structureCostIncrease: 3,
  structureResourceGeneration: {
    gold: 0,
    silver: 0,
    bronze: 1,
  } as Resource,
  structureUpgrade: 0,

  structureUpgradeCost: {
    gold: 0,
    silver: 0,
    bronze: 100,
  } as Resource,
  structureUpgradeMultiplier: 1.4,
  structureUpgradeCostIncrease: 2,
  structureResourceGenerationDefault: {
    gold: 0,
    silver: 0,
    bronze: 1,
  } as Resource,
};
const autoClickerInit: StructureInit = {
  structure: 0,
  structureCost: {
    gold: 0,
    silver: 0,
    bronze: 10,
  },
  structureCostIncrease: 2,
  structureResourceGeneration: {
    gold: 0,
    silver: 0,
    bronze: 1,
  } as Resource,
  structureUpgrade: 0,
  structureResourceGenerationDefault: {
    gold: 0,
    silver: 0,
    bronze: 1,
  },
  structureUpgradeCost: {
    gold: 0,
    silver: 0,
    bronze: 50,
  } as Resource,
  structureUpgradeMultiplier: 1.2,
  structureUpgradeCostIncrease: 2,
};

export default class Clicker {
  private resource: Resource;
  public grandma: Structure;
  public autoClicker: Structure;
  private clickResourceGeneration: Resource;
  private resourceGeneration: Resource;
  constructor(
    {
      resource,
      clickResourceGeneration,
      resourceGeneration,
      grandma,
      autoClicker,
    }: gameInit = {
      resource: {
        gold: 0,
        silver: 0,
        bronze: 0,
      } as Resource,
      clickResourceGeneration: { gold: 0, silver: 0, bronze: 1 } as Resource,
      resourceGeneration: {
        gold: 0,
        silver: 0,
        bronze: 0,
      } as Resource,
      autoClicker: new Structure(autoClickerInit),
      grandma: new Structure(grandmaInit),
    }
  ) {
    this.resource = resource;
    this.clickResourceGeneration = clickResourceGeneration;
    this.resourceGeneration = resourceGeneration;
    this.grandma = grandma;
    this.autoClicker = autoClicker;
    this.PassiveCalculateResourceGeneration();
  }
  private PassiveCalculateResourceGeneration(): void {
    const Structs: Resource[] = [];
    // Required to Add more Structures
    Structs.push(this.grandma.getStructureResourceGeneration());
    Structs.push(this.autoClicker.getStructureResourceGeneration());
    Structs.forEach((struct) => {
      if (this.resourceGeneration.bronze + struct.bronze === 9_999_999_999) {
        this.resourceGeneration.silver += 1;
        this.resourceGeneration.bronze =
          this.resourceGeneration.bronze + struct.bronze - 9_999_999_999;
      } else {
        this.resourceGeneration.bronze += struct.bronze;
      }
      if (this.resourceGeneration.silver + struct.silver === 9_999_999_999) {
        this.resourceGeneration.gold += 1;
        this.resourceGeneration.silver =
          this.resourceGeneration.silver + struct.silver - 9_999_999_999;
      } else {
        this.resourceGeneration.silver += struct.silver;
      }
      this.resourceGeneration.gold += struct.gold;
    });
  }
  public getClickResourceGeneration(): Resource {
    return this.clickResourceGeneration;
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
    this.autoClicker.buyUpgradeStructure(this.resource);
    this.PassiveCalculateResourceGeneration();
  }
  public increaseResource(addValue: Resource): void {
    if (this.resource.bronze + addValue.bronze === 9_999_999_999) {
      this.resource.silver += 1;
      this.resource.bronze =
        this.resource.bronze + addValue.bronze - 9_999_999_999;
    } else {
      this.resource.bronze += addValue.bronze;
    }
    if (this.resource.silver + addValue.silver === 9_999_999_999) {
      this.resource.gold += 1;
      this.resource.silver =
        this.resource.silver + addValue.silver - 9_999_999_999;
    } else {
      this.resource.silver += addValue.silver;
    }
    this.resource.gold += addValue.gold;
  }

  public get_resources(): Resource {
    return this.resource;
  }
  public get_string_Number(): string {
    let string = "";
    string += Math.trunc(this.resource.bronze).toString();
    if (this.resource.silver > 0) {
      while (string.length < 10) {
        string = "0" + string;
      }
      string = Math.trunc(this.resource.silver).toString() + string;
    }
    if (this.resource.gold > 0) {
      while (string.length < 20) {
        string = "0" + string;
      }
      string = Math.trunc(this.resource.gold).toString() + string;
    }
    return string;
  }
}
class Global {
  //Help Function to update the cost of the upgrade
  public updateCost(currentCost: Resource, increase: number): Resource {
    if (currentCost.bronze * increase >= 9_999_999_999) {
      currentCost.silver += 1;
      currentCost.bronze = currentCost.bronze * increase - 9_999_999_999;
    } else {
      currentCost.bronze *= increase;
    }
    if (currentCost.silver * increase >= 9_999_999_999) {
      currentCost.gold += 1;
      currentCost.silver = currentCost.silver * increase - 9_999_999_999;
    } else {
      currentCost.silver *= increase;
    }
    currentCost.gold *= increase;
    return currentCost;
  }
  //Help Function to check if the player can buy the upgrade
  public canBuy(currentCost: Resource, cookies: Resource): boolean {
    if (cookies.gold > currentCost.gold) {
      return true;
    } else if (cookies.gold < currentCost.gold) {
      return false;
    }

    // Gold is equal, now compare silver
    if (cookies.silver > currentCost.silver) {
      return true;
    } else if (cookies.silver < currentCost.silver) {
      return false;
    }

    // Gold and Silver are equal, now compare bronze
    return cookies.bronze >= currentCost.bronze;
  }
  //Help Function to buy the upgrade or structure
  public buyUpgrade(currentCost: Resource, cookies: Resource): void {
    cookies.gold -= currentCost.gold;
    if (cookies.silver - currentCost.silver < 0) {
      cookies.gold -= 1;
      cookies.silver += 9_999_999_999;
      cookies.silver -= currentCost.silver;
    } else {
      cookies.silver -= currentCost.silver;
    }
    if (cookies.bronze - currentCost.bronze < 0) {
      if (cookies.silver === 0) {
        cookies.gold -= 1;
        cookies.silver += 9_999_999_999;
      }
      cookies.silver -= 1;
      cookies.bronze += 9_999_999_999;
      cookies.bronze -= currentCost.bronze;
    } else {
      cookies.bronze -= currentCost.bronze;
    }
  }
  //Help Function to convert the resource to a string
  public ResourceToString(resource: Resource): string {
    let string = "";
    string += Math.trunc(resource.bronze).toString();
    if (resource.silver > 0) {
      while (string.length < 10) {
        string = "0" + string;
      }
      string = Math.trunc(resource.silver).toString() + string;
    }
    if (resource.gold > 0) {
      while (string.length < 20) {
        string = "0" + string;
      }
      string = Math.trunc(resource.gold).toString() + string;
    }
    return string;
  }
}

class Structure extends Global {
  private structure: number;
  private structureCost: Resource;
  private structureCostIncrease: number;
  private structureResourceGeneration: Resource;
  private structureUpgrade: number;
  private structureUpgradeMultiplier: number;
  private structureUpgradeCost: Resource;
  private structureUpgradeCostIncrease: number;
  private structureResourceGenerationDefault: Resource;
  constructor({
    structure,
    structureCost,
    structureCostIncrease,
    structureResourceGeneration,
    structureResourceGenerationDefault,
    structureUpgrade,
    structureUpgradeCost,
    structureUpgradeCostIncrease,
    structureUpgradeMultiplier,
  }: StructureInit) {
    super();
    this.structure = structure;
    this.structureCost = structureCost;
    this.structureCostIncrease = structureCostIncrease;
    this.structureResourceGeneration = structureResourceGeneration;
    this.structureResourceGenerationDefault =
      structureResourceGenerationDefault;
    this.structureUpgrade = structureUpgrade;
    this.structureUpgradeCost = structureUpgradeCost;
    this.structureUpgradeCostIncrease = structureUpgradeCostIncrease;
    this.structureUpgradeMultiplier = structureUpgradeMultiplier;
  }
  public getStructureResourceGeneration(): Resource {
    return {
      gold: this.structureResourceGeneration.gold * this.structure,
      silver: this.structureResourceGeneration.silver * this.structure,
      bronze: this.structureResourceGeneration.bronze * this.structure,
    };
  }
  // Not Happy with this function
  private calculateStructureResourceGeneration(): void {
    this.structureResourceGeneration = this.structureResourceGenerationDefault;
    for (let i = 0; i < this.structureUpgrade; i++) {
      if (
        this.structureResourceGeneration.bronze *
          this.structureUpgradeMultiplier >=
        9_999_999_999
      ) {
        this.structureResourceGeneration.silver += 1;
        this.structureResourceGeneration.bronze =
          this.structureResourceGeneration.bronze *
            this.structureUpgradeMultiplier -
          9_999_999_999;
      } else {
        this.structureResourceGeneration.bronze *=
          this.structureUpgradeMultiplier;
      }
      if (
        this.structureResourceGeneration.silver *
          this.structureUpgradeMultiplier >=
        9_999_999_999
      ) {
        this.structureResourceGeneration.gold += 1;
        this.structureResourceGeneration.silver =
          this.structureResourceGeneration.silver *
            this.structureUpgradeMultiplier -
          9_999_999_999;
      } else {
        this.structureResourceGeneration.silver *=
          this.structureUpgradeMultiplier;
      }
      this.structureResourceGeneration.gold *= this.structureUpgradeMultiplier;
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
      this.structureUpgradeCostIncrease
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
  private increaseStructureCost(): void {
    this.structureCost = this.updateCost(
      this.structureCost,
      this.structureCostIncrease
    );
  }
  public getStructureAmount(): number {
    return this.structure;
  }
}
