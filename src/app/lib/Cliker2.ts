export type Resource = {
  cookies: number;
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
    cookies: 20,
  } as Resource,
  structureCostIncrease: 3,
  structureResourceGeneration: {
    cookies: 1,
  } as Resource,
  structureUpgrade: 0,

  structureUpgradeCost: {
    cookies: 100,
  } as Resource,
  structureUpgradeMultiplier: 1.4,
  structureUpgradeCostIncrease: 2,
  structureResourceGenerationDefault: {
    cookies: 1,
  } as Resource,
};
const autoClickerInit: StructureInit = {
  structure: 0,
  structureCost: {
    cookies: 10,
  },
  structureCostIncrease: 2,
  structureResourceGeneration: {
    cookies: 1,
  } as Resource,
  structureUpgrade: 0,
  structureResourceGenerationDefault: {
    cookies: 1,
  },
  structureUpgradeCost: {
    cookies: 50,
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
        cookies: 0,
      } as Resource,
      clickResourceGeneration: { cookies: 1 } as Resource,
      resourceGeneration: {
        cookies: 0,
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
  public updateCost(currentCost: Resource, increase: number): Resource {
    currentCost.cookies *= increase;
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
