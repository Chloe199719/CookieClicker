import { Resource } from "./Cliker2";

export interface SaveType {
  resource: Resource;
  lifeTimeCookies: Resource;
  multiplier: number;
  grandma: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    grandmaUpgrades: { [key: string]: UpgradeType };
  };
  autoClicker: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    cursorUpgrades: { [key: string]: UpgradeType };
  };
  farm: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    farmUpgrades: { [key: string]: UpgradeType };
  };
  mine: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    mineUpgrades: { [key: string]: UpgradeType };
  };
  factory: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    factoryUpgrades: { [key: string]: UpgradeType };
  };
  bank: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    bankUpgrades: { [key: string]: UpgradeType };
  };
  temple: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    templeUpgrades: { [key: string]: UpgradeType };
  };
  wizardTower: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    wizardTowerUpgrades: { [key: string]: UpgradeType };
  };
  shipment: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    shipmentUpgrades: { [key: string]: UpgradeType };
  };
  alchemyLab: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    alchemyLabUpgrades: { [key: string]: UpgradeType };
  }
  portal: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    portalUpgrades: { [key: string]: UpgradeType };
  }
  timeMachine: {
    structure: number;
    structureCost: Resource;
    lifeTimeCookiesBuilding: Resource;
    timeMachineUpgrades: { [key: string]: UpgradeType };
  }
}
