import { Resource } from "./Cliker";
import { UpgradeType, AchievementType } from "./Cliker";
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
    grandmaAchievements: SavingType[];
  };
  autoClicker: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    cursorUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    CursorAchievements: SavingType[];
  };
  farm: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    farmUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    farmAchievements: SavingType[];
  };
  mine: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    mineUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    mineAchievements: SavingType[];
  };
  factory: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    factoryUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    factoryAchievements: SavingType[];
  };
  bank: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    bankUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    bankAchievements: SavingType[];
  };
  temple: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    templeUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    templeAchievements: SavingType[];
  };
  wizardTower: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    wizardTowerUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    wizardTowerAchievements: SavingType[];
  };
  shipment: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    shipmentUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    shipmentAchievements: SavingType[];
  };
  alchemyLab: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    alchemyLabUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    alchemyLabAchievements: SavingType[];
  };
  portal: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    portalUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    portalAchievements: SavingType[];
  };
  timeMachine: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    timeMachineUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    timeMachineAchievements: SavingType[];
  };
  antimatterCondenser: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    antimatterCondenserUpgrades:
      | SavingTypeUpgrades[]
      | { [key: string]: UpgradeType };
    antimatterCondenserAchievements: SavingType[];
  };
  prism: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    prismUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    prismAchievements: SavingType[];
  };
  chancemaker: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    chancemakerUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    chancemakerAchievements: SavingType[];
  };
  fractalEngine: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    fractalEngineUpgrades:
      | SavingTypeUpgrades[]
      | { [key: string]: UpgradeType };
    fractalEngineAchievements: SavingType[];
  };
  javascriptConsole: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    javascriptConsoleUpgrades:
      | SavingTypeUpgrades[]
      | { [key: string]: UpgradeType };
    javascriptConsoleAchievements: SavingType[];
  };
  idleverse: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    idleverseUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    idleverseAchievements: SavingType[];
  };
  cortexBaker: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    cortexBakerUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    cortexBakerAchievements: SavingType[];
  };
  you: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    youUpgrades: SavingTypeUpgrades[] | { [key: string]: UpgradeType };
    youAchievements: SavingType[];
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
