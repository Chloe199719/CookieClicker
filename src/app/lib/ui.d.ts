import { Resource } from "./Cliker";

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
  grandma: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    grandmaUpgrades: { [key: string]: UpgradeType };
    grandmaAchievements: AchievementType[];
  };
  autoClicker: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    cursorUpgrades: { [key: string]: UpgradeType };
    CursorAchievements: AchievementType[];
  };
  farm: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    farmUpgrades: { [key: string]: UpgradeType };
    farmAchievements: AchievementType[];
  };
  mine: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    mineUpgrades: { [key: string]: UpgradeType };
    mineAchievements: AchievementType[];
  };
  factory: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    factoryUpgrades: { [key: string]: UpgradeType };
    factoryAchievements: AchievementType[];
  };
  bank: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    bankUpgrades: { [key: string]: UpgradeType };
    bankAchievements: AchievementType[];
  };
  temple: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    templeUpgrades: { [key: string]: UpgradeType };
    templeAchievements: AchievementType[];
  };
  wizardTower: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    wizardTowerUpgrades: { [key: string]: UpgradeType };
    wizardTowerAchievements: AchievementType[];
  };
  shipment: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    shipmentUpgrades: { [key: string]: UpgradeType };
    shipmentAchievements: AchievementType[];
  };
  alchemyLab: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    alchemyLabUpgrades: { [key: string]: UpgradeType };
    alchemyLabAchievements: AchievementType[];
  };
  portal: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    portalUpgrades: { [key: string]: UpgradeType };
    portalAchievements: AchievementType[];
  };
  timeMachine: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    timeMachineUpgrades: { [key: string]: UpgradeType };
    timeMachineAchievements: AchievementType[];
  };
  antimatterCondenser: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    antimatterCondenserUpgrades: { [key: string]: UpgradeType };
    antimatterCondenserAchievements: AchievementType[];
  };
  prism: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    prismUpgrades: { [key: string]: UpgradeType };
    prismAchievements: AchievementType[];
  };
  chancemaker: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    chancemakerUpgrades: { [key: string]: UpgradeType };
    chancemakerAchievements: AchievementType[];
  };
  fractalEngine: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    fractalEngineUpgrades: { [key: string]: UpgradeType };
    fractalEngineAchievements: AchievementType[];
  };
  javascriptConsole: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    javascriptConsoleUpgrades: { [key: string]: UpgradeType };
    javascriptConsoleAchievements: AchievementType[];
  };
  idleverse: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    idleverseUpgrades: { [key: string]: UpgradeType };
    idleverseAchievements: AchievementType[];
  };
  cortexBaker: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    cortexBakerUpgrades: { [key: string]: UpgradeType };
    cortexBakerAchievements: AchievementType[];
  };
  you: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    youUpgrades: { [key: string]: UpgradeType };
    youAchievements: AchievementType[];
  };
}
