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

class Grandma {
  private grandma: number;
  private grandmaCost: Resource;
  private grandmaCostIncrease: number;
  private grandmaResourceGeneration: Resource;
  private grandmasUpgrade: number;
  private grandmasUpgradeCost: Resource;
  private grandmasUpgradeCostIncrease: number;
  constructor() {
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
    let string = "";
    if (this.grandmaCost.gold > 0) {
      string += this.grandmaCost.gold.toString();
    }
    if (this.grandmaCost.silver > 0) {
      string += this.grandmaCost.silver.toString();
    }
    string += this.grandmaCost.bronze.toString();
    return string;
  }
  public getGrandmasUpgradeCost(): Resource {
    return this.grandmasUpgradeCost;
  }
  public canBuyGrandma(cookies: Resource): boolean {
    if (cookies.gold > this.grandmaCost.gold) {
      return true;
    } else if (cookies.gold < this.grandmaCost.gold) {
      return false;
    }

    // Gold is equal, now compare silver
    if (cookies.silver > this.grandmaCost.silver) {
      return true;
    } else if (cookies.silver < this.grandmaCost.silver) {
      return false;
    }

    // Gold and Silver are equal, now compare bronze
    return cookies.bronze >= this.grandmaCost.bronze;
  }
  public increaseGrandma(cookies: Resource): void {
    cookies.gold -= this.grandmaCost.gold;
    if (cookies.silver - this.grandmaCost.silver < 0) {
      cookies.gold -= 1;
      cookies.silver += 9_999_999_999;
      cookies.silver -= this.grandmaCost.silver;
    } else {
      cookies.silver -= this.grandmaCost.silver;
    }
    if (cookies.bronze - this.grandmaCost.bronze < 0) {
      if (cookies.silver === 0) {
        cookies.gold -= 1;
        cookies.silver += 9_999_999_999;
      }
      cookies.silver -= 1;
      cookies.bronze += 9_999_999_999;
      cookies.bronze -= this.grandmaCost.bronze;
    } else {
      cookies.bronze -= this.grandmaCost.bronze;
    }
    this.grandma += 1;
    this.increaseGrandmaCost();
  }
  private increaseGrandmaCost(): void {
    if (this.grandmaCost.bronze * this.grandmaCostIncrease >= 9_999_999_999) {
      this.grandmaCost.silver += 1;
      this.grandmaCost.bronze =
        this.grandmaCost.bronze * this.grandmaCostIncrease - 9_999_999_999;
    } else {
      this.grandmaCost.bronze *= this.grandmaCostIncrease;
    }
    if (this.grandmaCost.silver * this.grandmaCostIncrease >= 9_999_999_999) {
      this.grandmaCost.gold += 1;
      this.grandmaCost.silver =
        this.grandmaCost.silver * this.grandmaCostIncrease - 9_999_999_999;
    } else {
      this.grandmaCost.silver *= this.grandmaCostIncrease;
    }
    this.grandmaCost.gold *= this.grandmaCostIncrease;
  }
  public getGrandmaAmount(): number {
    return this.grandma;
  }
}
