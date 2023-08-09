import Clicker, { Resource, Structure, UpgradeType } from "../Cliker2";

export class TimeMachine extends Structure {
  public timeMachineUpgrades1: { [key: string]: UpgradeType } = {};
  public timeMachineUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.timeMachineUpgrades1)
  );
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 14_000_000_000_000 },
      structureResourceGeneration: { cookies: 65_000_000 },
      structureResourceGenerationDefault: { cookies: 65_000_000 },

      structureCostDefault: { cookies: 14_000_000_000_000 },
    });
    this.game = game;
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.timeMachineUpgrades.forEach((upgrade) => {
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
    const upgrade = this.timeMachineUpgrades.get(id.toString());
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
    this.timeMachineUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.timeMachineUpgrades
      .get(id.toString())
      ?.cost.cookies.toString()!;
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.timeMachineUpgrades.get(id.toString());
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
