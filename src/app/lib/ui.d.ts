import { Resource } from "./Cliker";
import { UpgradeType } from "./Cliker";
export interface SaveType {
  resource: Resource;
  lifeTimeCookies: Resource;
  lifeTimeCookiesClicking: Resource;
  multiplier: number;
  clickingMultiplier: number;
  clickingUpgrades: UpgradeType[];
  flavoredCookies: UpgradeType[];
  kittens: UpgradeType[];
  clickingAchievements: AchievementType[];
  TotalCookiesAchievements: AchievementType[];
  cookiesPerSecondAchievement: AchievementType[];
  TotalBuildingsAchievements: SavingType[];
  grandma: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    grandmaUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    grandmaAchievements: AchievementType[];
  };
  autoClicker: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    cursorUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    CursorAchievements: AchievementType[];
  };
  farm: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    farmUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    farmAchievements: AchievementType[];
  };
  mine: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    mineUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    mineAchievements: AchievementType[];
  };
  factory: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    factoryUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    factoryAchievements: AchievementType[];
  };
  bank: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    bankUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    bankAchievements: AchievementType[];
  };
  temple: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    templeUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    templeAchievements: AchievementType[];
  };
  wizardTower: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    wizardTowerUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    wizardTowerAchievements: AchievementType[];
  };
  shipment: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    shipmentUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    shipmentAchievements: AchievementType[];
  };
  alchemyLab: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    alchemyLabUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    alchemyLabAchievements: AchievementType[];
  };
  portal: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    portalUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    portalAchievements: AchievementType[];
  };
  timeMachine: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    timeMachineUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    timeMachineAchievements: AchievementType[];
  };
  antimatterCondenser: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    antimatterCondenserUpgrades:
      | SavingTypeUpgrades[]
      | { [key: string]: UpgradeType };
    antimatterCondenserAchievements: AchievementType[];
  };
  prism: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    prismUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    prismAchievements: AchievementType[];
  };
  chancemaker: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    chancemakerUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    chancemakerAchievements: AchievementType[];
  };
  fractalEngine: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    fractalEngineUpgrades:
      | SavingTypeUpgrades[]
      | { [key: string]: UpgradeType };
    fractalEngineAchievements: AchievementType[];
  };
  javascriptConsole: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    javascriptConsoleUpgrades:
      | SavingTypeUpgrades[]
      | { [key: string]: UpgradeType };
    javascriptConsoleAchievements: AchievementType[];
  };
  idleverse: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    idleverseUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    idleverseAchievements: AchievementType[];
  };
  cortexBaker: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    cortexBakerUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    cortexBakerAchievements: AchievementType[];
  };
  you: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    youUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    youAchievements: AchievementType[];
  };
}

export interface SavingType {
  id: number;
  acquired: boolean;
}
export interface SavingTypeUpgrades {
  id: string;
  acquired: boolean;
}
