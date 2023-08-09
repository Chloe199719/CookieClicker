import Clicker, { Resource, Structure, UpgradeType } from "../Cliker2";

export class AlchemyLab extends Structure {
  public AlchemyLabUpgrades1: { [key: string]: UpgradeType } = {};
  public alchemyLabUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.AlchemyLabUpgrades1)
  );
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 75_000_000_000 },
      structureResourceGeneration: { cookies: 1_600_000 },
      structureResourceGenerationDefault: { cookies: 1_600_000 },

      structureCostDefault: { cookies: 75_000_000_000 },
    });
    this.game = game;
  }
  // public buyBuilding(amount: number = 1): void {
  //   this.increaseStructure(this.game.resource, amount);
  //   this.calculateStructureResourceGeneration1();
  // }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.alchemyLabUpgrades.forEach((upgrade) => {
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
    const upgrade = this.alchemyLabUpgrades.get(id.toString());
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
    this.alchemyLabUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.alchemyLabUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.alchemyLabUpgrades.get(id.toString());
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
