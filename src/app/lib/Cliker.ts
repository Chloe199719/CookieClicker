export type Resource = {
  gold: number;
  silver: number;
  bronze: number;
};

export default class Clicker {
  private resource: Resource;
  public grandma: Grandma = new Grandma();
  private clickResourceGeneration: Resource = {
    gold: 0,
    silver: 0,
    bronze: 1,
  };
  private resourceGeneration: Resource = {
    gold: 0,
    silver: 0,
    bronze: 0,
  };
  constructor() {
    this.resource = {
      gold: 0,
      silver: 0,
      bronze: 0,
    } as Resource;
    this.PassiveCalculateResourceGeneration();
  }
  private PassiveCalculateResourceGeneration(): void {
    const Structs: Resource[] = [];
    Structs.push(this.grandma.getGrandmaResourceGeneration());
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
  public buyGrandma(): void {
    this.grandma.increaseGrandma(this.resource);
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
    if (this.resource.gold > 0) {
      string += this.resource.gold.toString();
    }
    if (this.resource.silver > 0) {
      string += this.resource.silver.toString();
    }
    string += this.resource.bronze.toString();
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
    if (resource.gold > 0) {
      string += Math.trunc(resource.gold).toString();
    }
    if (resource.silver > 0) {
      string += Math.trunc(resource.silver).toString();
    }
    string += Math.trunc(resource.bronze).toString();
    return string;
  }
}
class Grandma extends Global {
  private grandma: number;
  private grandmaCost: Resource;
  private grandmaCostIncrease: number;
  private grandmaResourceGeneration: Resource;
  private grandmasUpgrade: number;
  private grandmasUpgradeCost: Resource;
  private grandmasUpgradeCostIncrease: number;
  constructor() {
    super();
    this.grandma = 0;
    this.grandmaCost = {
      gold: 0,
      silver: 0,
      bronze: 10,
    };
    this.grandmaCostIncrease = 3;
    this.grandmaResourceGeneration = {
      gold: 0,
      silver: 0,
      bronze: 1,
    } as Resource;
    this.grandmasUpgrade = 0;
    this.grandmasUpgradeCost = {
      gold: 0,
      silver: 0,
      bronze: 100,
    } as Resource;
    this.grandmasUpgradeCostIncrease = 2;
  }
  public getGrandmaResourceGeneration(): Resource {
    return {
      gold: this.grandmaResourceGeneration.gold * this.grandma,
      silver: this.grandmaResourceGeneration.silver * this.grandma,
      bronze: this.grandmaResourceGeneration.bronze * this.grandma,
    };
  }
  public getGrandmaCost(): Resource {
    return this.grandmaCost;
  }
  public getGrandmaCostString(): string {
    return this.ResourceToString(this.grandmaCost);
  }
  public getGrandmasUpgradeCost(): Resource {
    return this.grandmasUpgradeCost;
  }
  public canBuyGrandma(cookies: Resource): boolean {
    return this.canBuy(this.grandmaCost, cookies);
  }
  public increaseGrandma(cookies: Resource): void {
    this.buyUpgrade(this.grandmaCost, cookies);
    this.grandma += 1;
    this.increaseGrandmaCost();
  }
  private increaseGrandmaCost(): void {
    this.grandmaCost = this.updateCost(
      this.grandmaCost,
      this.grandmaCostIncrease
    );
  }
  public getGrandmaAmount(): number {
    return this.grandma;
  }
}
