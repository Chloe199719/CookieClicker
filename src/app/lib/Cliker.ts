import { AlchemyLabAchievements } from "./achievements/AlchemyLab";
import { AntiMatterCondenserAchievements } from "./achievements/AntiMatter";
import { BankAchievements } from "./achievements/Bank";
import { ChanceMakerAchievements } from "./achievements/ChanceMaker";
import { ClickingAchievements } from "./achievements/Clicking";
import { cookiesPerSecondAchievements } from "./achievements/CookiesPerSec";
import { CortexBakerAchievements } from "./achievements/CortexBaker";
import { CursorAchievements } from "./achievements/Cursors";
import { FactoryAchievements } from "./achievements/Factory";
import { FarmAchievements } from "./achievements/Farms";
import { FractalEngineAchievements } from "./achievements/FractalEngine";
import { GrandmaAchievements } from "./achievements/Grandma";
import { IdleVerseAchievements } from "./achievements/IdleVerse";
import { JavascriptConsoleAchievement } from "./achievements/JavascriptConsole";
import { MineAchievements } from "./achievements/Mines";
import { PortalAchievements } from "./achievements/Portal";
import { PrismAchievements } from "./achievements/Prism";
import { ShipmentAchievements } from "./achievements/Shipment";
import { TempleAchievements } from "./achievements/Temple";
import { TimeMachineAchievements } from "./achievements/TimeMachine";
import { totalCookiesAchievements } from "./achievements/TotalCookies";
import { TotalBuildingAndUpgradesAchievements } from "./achievements/Totals";
import { WizardTowerAchievements } from "./achievements/WizardTowers";
import { YouAchievements } from "./achievements/You";
import { SaveType, SavingType, SavingTypeUpgrades } from "./ui";
import { ChanceMakersUpgrades } from "./upgrades/Chancemaker";
import { ClickingUpgrades } from "./upgrades/Clicking";
import { CortexBakerUpgrades } from "./upgrades/CortexBaker";
import { FractalEngineUpgrades } from "./upgrades/FractalEngine";
import { IdleverseUpgrades } from "./upgrades/Idleverse";
import { JavaScriptConsoleUpgrades } from "./upgrades/JavaScriptConsole";
import { KittensUpgrades } from "./upgrades/Kittens";
import { PrismUpgrades } from "./upgrades/Prism";
import { YouUpgrades } from "./upgrades/You";
import FlavoredCookies from "./upgrades/flavoredCookies";
import toast from "react-hot-toast";
export type Resource = {
  cookies: number;
};

export interface AchievementType {
  id: number;
  name: string;
  description: string;
  acquired: boolean;
  condition: number;
  type:
    | BuildingType
    | "Generation"
    | "Click"
    | "Total"
    | "Owned Buildings"
    | "Everything"
    | "Purchase Upgrades";
  achievementType: "Having" | "Baking";
}
export type BuildingType =
  | "cursor"
  | "grandma"
  | "farm"
  | "mine"
  | "factory"
  | "bank"
  | "temple"
  | "wizardTower"
  | "shipment"
  | "alchemyLab"
  | "portal"
  | "timeMachine"
  | "antimatterCondenser"
  | "prism"
  | "chancemaker"
  | "fractalEngine"
  | "javascriptConsole"
  | "idleverse"
  | "cortexBaker"
  | "you"
  | "flavoredCookies"
  | "kittens"
  | "clicking";

interface ExtraType {
  tier:
    | "Plain"
    | "Berrylium"
    | "Blueberrylium"
    | "Chalcedhoney"
    | "Buttergold"
    | "Sugarmuck"
    | "Jetmint"
    | "Cherrysilver"
    | "Hazelrald"
    | "Mooncandy"
    | "Astrofudge"
    | "Alabascream"
    | "Iridyum"
    | "Glucosmium"
    | "Glimmeringue"
    | "None";
}
export interface UpgradeType extends ExtraType {
  id: number;
  name: string;
  cost: Resource;
  multiplier: number;
  requirement: number;
  acquired: boolean;
  description: string;
  type: BuildingType;
}
export type gameInit = {
  resource: Resource;
  clickResourceGeneration: Resource;
  resourceGeneration: Resource;
};

export type StructureInit = {
  structure: number;
  structureCost: Resource;
  structureCostDefault: Resource;
  structureResourceGeneration: Resource;

  structureResourceGenerationDefault: Resource;
};

export default class Clicker {
  private time = new Date();
  public resource: Resource;
  private lifeTimeCookies: Resource = { cookies: 0 };
  private lifeTimeCookiesClick: Resource = { cookies: 0 };
  public multiplier: number = 100;
  public milk: number = 0;
  public milkMultiplier: number = 1;
  public earnedAchievements: number = 0;
  public clickingMultiplier: number = 0;

  //Upgrades
  private flavoredCookies: UpgradeType[] = [...FlavoredCookies];
  private kittens: UpgradeType[] = [...KittensUpgrades];
  private clickingUpgrades: UpgradeType[] = [...ClickingUpgrades];

  //Building's
  public grandma: Grandma = new Grandma(this);
  public autoClicker: Cursor = new Cursor(this);
  public farm: Farm = new Farm(this);
  public mine: Mine = new Mine(this);
  public factory: Factory = new Factory(this);
  public bank: Bank = new Bank(this);
  public temple: Temple = new Temple(this);
  public wizardTower: WizardTower = new WizardTower(this);
  public shipment: Shipment = new Shipment(this);
  public alchemyLab: AlchemyLab = new AlchemyLab(this);
  public portal: Portal = new Portal(this);
  public timeMachine: TimeMachine = new TimeMachine(this);
  public antimatterCondenser: AntiMatterCondenser = new AntiMatterCondenser(
    this
  );
  public prism: Prism = new Prism(this);
  public chanceMaker: ChanceMaker = new ChanceMaker(this);
  public fractalEngine: FractalEngine = new FractalEngine(this);
  public javascriptConsole: JavaScriptConsole = new JavaScriptConsole(this);
  public idleverse: IdleVerse = new IdleVerse(this);
  public cortexBaker: CortexBaker = new CortexBaker(this);
  public you: You = new You(this);

  //Achievements
  public clickingAchievements: AchievementType[] = [...ClickingAchievements];
  public TotalCookiesAchievements: AchievementType[] = [
    ...totalCookiesAchievements,
  ];
  public cookiesPerSecondAchievements: AchievementType[] = [
    ...cookiesPerSecondAchievements,
  ];
  public TotalBuildingsAchievements: AchievementType[] = [
    ...TotalBuildingAndUpgradesAchievements,
  ];
  // Generation
  private clickResourceGeneration: Resource;
  private resourceGeneration: Resource;

  constructor(
    { resource, clickResourceGeneration, resourceGeneration }: gameInit = {
      resource: {
        cookies: 0,
      } as Resource,
      clickResourceGeneration: { cookies: 1 } as Resource,
      resourceGeneration: {
        cookies: 0,
      } as Resource,
    }
  ) {
    this.resource = resource;
    this.clickResourceGeneration = clickResourceGeneration;
    this.resourceGeneration = resourceGeneration;

    // this.autoClicker = autoClicker;
    this.PassiveCalculateResourceGeneration();
    this.initialize();
  }
  //Initialize (game context inside each building)
  private initialize(): void {
    this.autoClicker = new Cursor(this);
    this.grandma = new Grandma(this);
    this.farm = new Farm(this);
    this.mine = new Mine(this);
    this.factory = new Factory(this);
    this.bank = new Bank(this);
    this.temple = new Temple(this);
    this.wizardTower = new WizardTower(this);
    this.shipment = new Shipment(this);
    this.alchemyLab = new AlchemyLab(this);
    this.portal = new Portal(this);
    this.timeMachine = new TimeMachine(this);
    this.antimatterCondenser = new AntiMatterCondenser(this);
    this.prism = new Prism(this);
    this.chanceMaker = new ChanceMaker(this);
    this.fractalEngine = new FractalEngine(this);
    this.javascriptConsole = new JavaScriptConsole(this);
    this.idleverse = new IdleVerse(this);
    this.cortexBaker = new CortexBaker(this);
    this.you = new You(this);
  }

  //React Toast
  //TODO: Need to be improved and customized
  public toast(message: string): void {
    toast(message, {
      position: "bottom-center",
    });
  }

  private getUpgradesInRange(): UpgradeType[] {
    const list: UpgradeType[] = [];
    this.flavoredCookies.forEach((value, key) => {
      if (
        this.lifeTimeCookies.cookies >= value.requirement &&
        !value.acquired
      ) {
        list.push(value);
      }
    });
    this.kittens.forEach((value, key) => {
      if (this.earnedAchievements >= value.requirement && !value.acquired) {
        list.push(value);
      }
    });
    this.clickingUpgrades.forEach((value) => {
      if (
        this.lifeTimeCookiesClick.cookies >= value.requirement &&
        !value.acquired
      ) {
        list.push(value);
      }
    });
    return list;
  }
  // Achievements Check
  public checkTotalCookiesAchievements(): void {
    this.TotalCookiesAchievements.forEach((achievement) => {
      if (
        this.lifeTimeCookies.cookies >= achievement.condition &&
        !achievement.acquired
      ) {
        achievement.acquired = true;
        this.calculateMilk();
        this.toast(`Achievement Unlocked: ${achievement.name}`);
      }
    });
  }
  public checkClickingAchievements(): void {
    this.clickingAchievements.forEach((achievement) => {
      if (
        this.lifeTimeCookiesClick.cookies >= achievement.condition &&
        !achievement.acquired
      ) {
        achievement.acquired = true;
        this.calculateMilk();
        this.toast(`Achievement Unlocked: ${achievement.name}`);
      }
    });
  }
  public checkCookiesPerSecondAchievements(): void {
    this.cookiesPerSecondAchievements.forEach((achievement) => {
      if (
        this.getPassiveResourceGeneration() >= achievement.condition &&
        !achievement.acquired
      ) {
        achievement.acquired = true;
        this.calculateMilk();
        this.toast(`Achievement Unlocked: ${achievement.name}`);
      }
    });
  }
  public getTotalBuildings(): number {
    let total = 0;
    total += this.autoClicker.structure;
    total += this.grandma.structure;
    total += this.farm.structure;
    total += this.mine.structure;
    total += this.factory.structure;
    total += this.bank.structure;
    total += this.temple.structure;
    total += this.wizardTower.structure;
    total += this.shipment.structure;
    total += this.alchemyLab.structure;
    total += this.portal.structure;
    total += this.timeMachine.structure;
    total += this.antimatterCondenser.structure;
    total += this.prism.structure;
    total += this.chanceMaker.structure;
    total += this.fractalEngine.structure;
    total += this.javascriptConsole.structure;
    total += this.idleverse.structure;
    total += this.cortexBaker.structure;
    total += this.you.structure;

    return total;
  }
  public getTotalUpgrades(): number {
    let total = 0;
    this.autoClicker.cursorUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.grandma.grandmaUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.farm.farmUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.mine.mineUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.factory.factoryUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.bank.bankUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.temple.templeUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.wizardTower.WizardTowerUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.shipment.shipmentUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.alchemyLab.alchemyLabUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.portal.PortalUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.timeMachine.timeMachineUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.antimatterCondenser.antimatterCondenserUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.prism.prismUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.chanceMaker.chanceMakerUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.fractalEngine.fractalEngineUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.javascriptConsole.javascriptConsoleUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.idleverse.idleVerse.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.cortexBaker.cortexBakerUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.you.youUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.clickingUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.flavoredCookies.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });
    this.kittens.forEach((upgrade) => {
      if (upgrade.acquired) {
        total++;
      }
    });

    return total;
  }
  public checkTotalBuildingsAchievements(): void {
    const totalBuildings = this.getTotalBuildings();
    const totalUpgrades = this.getTotalUpgrades();
    this.TotalBuildingsAchievements.forEach((achievement) => {
      if (
        totalBuildings >= achievement.condition &&
        !achievement.acquired &&
        achievement.type === "Owned Buildings"
      ) {
        achievement.acquired = true;
        this.calculateMilk();
        this.toast(`Achievement Unlocked: ${achievement.name}`);
      } else if (
        totalUpgrades >= achievement.condition &&
        !achievement.acquired &&
        achievement.type === "Purchase Upgrades"
      ) {
        achievement.acquired = true;
        this.calculateMilk();
        this.toast(`Achievement Unlocked: ${achievement.name}`);
      }
    });
  }
  private calculateClickingMultiplier(): void {
    this.clickingMultiplier = 0;
    this.clickingUpgrades.forEach((upgrade) => {
      if (upgrade.acquired) {
        this.clickingMultiplier += upgrade.multiplier;
      }
    });
  }
  private calculateMilk(): void {
    let milk = 0;
    let list = [
      ...this.clickingAchievements,
      ...this.TotalCookiesAchievements,
      ...this.cookiesPerSecondAchievements,
      ...this.TotalBuildingsAchievements,
      ...this.autoClicker.CursorAchievements,
      ...this.grandma.grandmaAchievements,
      ...this.farm.farmAchievements,
      ...this.mine.mineAchievements,
      ...this.factory.factoryAchievements,
      ...this.bank.bankAchievements,
      ...this.temple.templeAchievements,
      ...this.wizardTower.wizardTowerAchievements,
      ...this.shipment.shipmentAchievements,
      ...this.alchemyLab.alchemyLabAchievements,
      ...this.portal.portalAchievements,
      ...this.timeMachine.timeMachineAchievements,
      ...this.antimatterCondenser.antimatterCondenserAchievements,
      ...this.prism.prismAchievements,
      ...this.chanceMaker.chanceMakerAchievements,
      ...this.fractalEngine.fractalEngineAchievements,
      ...this.javascriptConsole.javascriptConsoleAchievements,
      ...this.idleverse.idleVerseAchievements,
      ...this.cortexBaker.cortexBakerAchievements,
      ...this.you.youAchievements,
    ];
    list.forEach((achievement) => {
      if (achievement.acquired) {
        milk += 4;
      }
    });
    this.milk = milk;
    this.earnedAchievements = milk / 4;
  }
  //Get Achievement List
  public getAchievementList(): AchievementType[] {
    return (
      [
        ...this.clickingAchievements,
        ...this.TotalCookiesAchievements,
        ...this.cookiesPerSecondAchievements,
        ...this.TotalBuildingsAchievements,
        ...this.autoClicker.CursorAchievements,
        ...this.grandma.grandmaAchievements,
        ...this.farm.farmAchievements,
        ...this.mine.mineAchievements,
        ...this.factory.factoryAchievements,
        ...this.bank.bankAchievements,
        ...this.temple.templeAchievements,
        ...this.wizardTower.wizardTowerAchievements,
        ...this.shipment.shipmentAchievements,
        ...this.alchemyLab.alchemyLabAchievements,
        ...this.portal.portalAchievements,
        ...this.timeMachine.timeMachineAchievements,
        ...this.antimatterCondenser.antimatterCondenserAchievements,
        ...this.prism.prismAchievements,
        ...this.chanceMaker.chanceMakerAchievements,
        ...this.fractalEngine.fractalEngineAchievements,
        ...this.javascriptConsole.javascriptConsoleAchievements,
        ...this.idleverse.idleVerseAchievements,
        ...this.cortexBaker.cortexBakerAchievements,
        ...this.you.youAchievements,
      ]
        // .sort((a, b) => {
        //   return a.condition - b.condition;
        // });
        .sort((a, b) => {
          return a.acquired === b.acquired ? 0 : a.acquired ? -1 : 1;
        })
    );
  }
  // Check Buildings Achievements
  public checkBuildingsAchievements(type: BuildingType): void {
    if (type === "cursor") {
      this.autoClicker.checkAchievements();
    }
    if (type === "grandma") {
      this.grandma.checkAchievements();
    }
    if (type === "farm") {
      this.farm.checkAchievements();
    }
    if (type === "mine") {
      this.mine.checkAchievements();
    }
    if (type === "factory") {
      this.factory.checkAchievements();
    }
    if (type === "bank") {
      this.bank.checkAchievements();
    }
    if (type === "temple") {
      this.temple.checkAchievements();
    }
    if (type === "wizardTower") {
      this.wizardTower.checkAchievements();
    }
    if (type === "shipment") {
      this.shipment.checkAchievements();
    }
    if (type === "alchemyLab") {
      this.alchemyLab.checkAchievements();
    }
    if (type === "portal") {
      this.portal.checkAchievements();
    }
    if (type === "timeMachine") {
      this.timeMachine.checkAchievements();
    }
    if (type === "antimatterCondenser") {
      this.antimatterCondenser.checkAchievements();
    }
    if (type === "prism") {
      this.prism.checkAchievements();
    }
    if (type === "chancemaker") {
      this.chanceMaker.checkAchievements();
    }
    if (type === "fractalEngine") {
      this.fractalEngine.checkAchievements();
    }
    if (type === "javascriptConsole") {
      this.javascriptConsole.checkAchievements();
    }
    if (type === "idleverse") {
      this.idleverse.checkAchievements();
    }
    if (type === "cortexBaker") {
      this.cortexBaker.checkAchievements();
    }
    if (type === "you") {
      this.you.checkAchievements();
    }
    this.calculateMilk();
  }
  public InitCheckBuildingsAchievements(): void {
    this.autoClicker.checkAchievements();
    this.grandma.checkAchievements();
    this.farm.checkAchievements();
    this.mine.checkAchievements();
    this.factory.checkAchievements();
    this.bank.checkAchievements();
    this.temple.checkAchievements();
    this.wizardTower.checkAchievements();
    this.shipment.checkAchievements();
    this.alchemyLab.checkAchievements();
    this.portal.checkAchievements();
    this.timeMachine.checkAchievements();
    this.antimatterCondenser.checkAchievements();
    this.prism.checkAchievements();
    this.chanceMaker.checkAchievements();
    this.fractalEngine.checkAchievements();
    this.javascriptConsole.checkAchievements();
    this.idleverse.checkAchievements();
    this.cortexBaker.checkAchievements();
    this.you.checkAchievements();
    this.calculateMilk();
  }

  // Calculate how many cookies per second are generated by all structures
  //TODO: Need to be improved
  private PassiveCalculateResourceGeneration(): void {
    this.autoClicker.calculateStructureResourceGeneration1();
    this.grandma.calculateStructureResourceGeneration1();
    this.farm.calculateStructureResourceGeneration1();
    this.mine.calculateStructureResourceGeneration1();
    this.factory.calculateStructureResourceGeneration1();
    this.bank.calculateStructureResourceGeneration1();
    this.temple.calculateStructureResourceGeneration1();
    this.wizardTower.calculateStructureResourceGeneration1();
    this.shipment.calculateStructureResourceGeneration1();
    this.alchemyLab.calculateStructureResourceGeneration1();
    this.portal.calculateStructureResourceGeneration1();
    this.timeMachine.calculateStructureResourceGeneration1();
    this.antimatterCondenser.calculateStructureResourceGeneration1();
    this.prism.calculateStructureResourceGeneration1();
    this.chanceMaker.calculateStructureResourceGeneration1();
    this.fractalEngine.calculateStructureResourceGeneration1();
    this.javascriptConsole.calculateStructureResourceGeneration1();
    this.idleverse.calculateStructureResourceGeneration1();
    this.cortexBaker.calculateStructureResourceGeneration1();
    this.you.calculateStructureResourceGeneration1();

    this.resourceGeneration.cookies = 0;
    const Structs: Resource[] = [];
    // Required to Add more Structures
    Structs.push(this.grandma.getStructureResourceGeneration());
    Structs.push(this.autoClicker.getStructureResourceGeneration());
    Structs.push(this.farm.getStructureResourceGeneration());
    Structs.push(this.mine.getStructureResourceGeneration());
    Structs.push(this.factory.getStructureResourceGeneration());
    Structs.push(this.bank.getStructureResourceGeneration());
    Structs.push(this.temple.getStructureResourceGeneration());
    Structs.push(this.wizardTower.getStructureResourceGeneration());
    Structs.push(this.shipment.getStructureResourceGeneration());
    Structs.push(this.alchemyLab.getStructureResourceGeneration());
    Structs.push(this.portal.getStructureResourceGeneration());
    Structs.push(this.timeMachine.getStructureResourceGeneration());
    Structs.push(this.antimatterCondenser.getStructureResourceGeneration());
    Structs.push(this.prism.getStructureResourceGeneration());
    Structs.push(this.chanceMaker.getStructureResourceGeneration());
    Structs.push(this.fractalEngine.getStructureResourceGeneration());
    Structs.push(this.javascriptConsole.getStructureResourceGeneration());
    Structs.push(this.idleverse.getStructureResourceGeneration());
    Structs.push(this.cortexBaker.getStructureResourceGeneration());
    Structs.push(this.you.getStructureResourceGeneration());
    Structs.forEach((struct) => {
      this.resourceGeneration.cookies += struct.cookies;
    });
    this.ClickCalculateResourceGeneration();
    this.checkCookiesPerSecondAchievements();
  }

  // Calculate how many cookies per click are generated
  public ClickCalculateResourceGeneration(): void {
    let start = 1;

    this.autoClicker.cursorUpgrades.forEach((upgrade) => {
      if (upgrade.acquired && upgrade.id !== 4) {
        start *= upgrade.multiplier;
      } else if (upgrade.acquired && upgrade.id === 4) {
        start += upgrade.multiplier * this.autoClicker.getNoneCursorAmount();
      }
    });

    this.clickResourceGeneration.cookies = start;
  }

  // Getters
  public getClickResourceGeneration(): number {
    return (
      ((this.clickResourceGeneration.cookies * this.multiplier) / 100) *
        this.milkMultiplier +
      this.getPassiveResourceGeneration() * this.clickingMultiplier
    );
  }

  public getPassiveResourceGeneration(): number {
    return (
      ((this.resourceGeneration.cookies * this.multiplier) / 100) *
      this.milkMultiplier
    );
  }

  public buyBuilding(type: BuildingType, amount: number = 1): void {
    if (type === "cursor") {
      this.autoClicker.increaseStructure(this.resource, amount);
    }
    if (type === "grandma") {
      this.grandma.increaseStructure(this.resource, amount);
    }
    if (type === "farm") {
      this.farm.increaseStructure(this.resource, amount);
    }
    if (type === "mine") {
      this.mine.increaseStructure(this.resource, amount);
    }
    if (type === "factory") {
      this.factory.increaseStructure(this.resource, amount);
    }
    if (type === "bank") {
      this.bank.increaseStructure(this.resource, amount);
    }
    if (type === "temple") {
      this.temple.increaseStructure(this.resource, amount);
    }
    if (type === "wizardTower") {
      this.wizardTower.increaseStructure(this.resource, amount);
    }
    if (type === "shipment") {
      this.shipment.increaseStructure(this.resource, amount);
    }
    if (type === "alchemyLab") {
      this.alchemyLab.increaseStructure(this.resource, amount);
    }
    if (type === "portal") {
      this.portal.increaseStructure(this.resource, amount);
    }
    if (type === "timeMachine") {
      this.timeMachine.increaseStructure(this.resource, amount);
    }
    if (type === "antimatterCondenser") {
      this.antimatterCondenser.increaseStructure(this.resource, amount);
    }
    if (type === "prism") {
      this.prism.increaseStructure(this.resource, amount);
    }
    if (type === "chancemaker") {
      this.chanceMaker.increaseStructure(this.resource, amount);
    }
    if (type === "fractalEngine") {
      this.fractalEngine.increaseStructure(this.resource, amount);
    }
    if (type === "javascriptConsole") {
      this.javascriptConsole.increaseStructure(this.resource, amount);
    }
    if (type === "idleverse") {
      this.idleverse.increaseStructure(this.resource, amount);
    }
    if (type === "cortexBaker") {
      this.cortexBaker.increaseStructure(this.resource, amount);
    }
    if (type === "you") {
      this.you.increaseStructure(this.resource, amount);
    }
    this.PassiveCalculateResourceGeneration();
    this.checkBuildingsAchievements(type);
    this.checkTotalBuildingsAchievements();
  }
  public canBuyBuilding(type: BuildingType, amount: number = 1): boolean {
    if (type === "cursor") {
      return this.autoClicker.canBuy(this.resource, amount);
    }
    if (type === "grandma") {
      return this.grandma.canBuy(this.resource, amount);
    }
    if (type === "farm") {
      return this.farm.canBuy(this.resource, amount);
    }
    if (type === "mine") {
      return this.mine.canBuy(this.resource, amount);
    }
    if (type === "factory") {
      return this.factory.canBuy(this.resource, amount);
    }
    if (type === "bank") {
      return this.bank.canBuy(this.resource, amount);
    }
    if (type === "temple") {
      return this.temple.canBuy(this.resource, amount);
    }
    if (type === "wizardTower") {
      return this.wizardTower.canBuy(this.resource, amount);
    }
    if (type === "shipment") {
      return this.shipment.canBuy(this.resource, amount);
    }
    if (type === "alchemyLab") {
      return this.alchemyLab.canBuy(this.resource, amount);
    }
    if (type === "portal") {
      return this.portal.canBuy(this.resource, amount);
    }
    if (type === "timeMachine") {
      return this.timeMachine.canBuy(this.resource, amount);
    }
    if (type === "antimatterCondenser") {
      return this.antimatterCondenser.canBuy(this.resource, amount);
    }
    if (type === "prism") {
      return this.prism.canBuy(this.resource, amount);
    }
    if (type === "chancemaker") {
      return this.chanceMaker.canBuy(this.resource, amount);
    }
    if (type === "fractalEngine") {
      return this.fractalEngine.canBuy(this.resource, amount);
    }
    if (type === "javascriptConsole") {
      return this.javascriptConsole.canBuy(this.resource, amount);
    }
    if (type === "idleverse") {
      return this.idleverse.canBuy(this.resource, amount);
    }
    if (type === "cortexBaker") {
      return this.cortexBaker.canBuy(this.resource, amount);
    }
    if (type === "you") {
      return this.you.canBuy(this.resource, amount);
    }
    return false;
  }
  // Method Called by clock and click to increase resource(cookies)
  public increaseResource(): void {
    let now = new Date();

    let diff = (now.getTime() - this.time.getTime()) / 1000;

    const cookiesToAdd = this.getPassiveResourceGeneration() * diff;
    this.time = now;
    this.resource.cookies += cookiesToAdd;
    this.lifeTimeCookies.cookies += cookiesToAdd;
    this.autoClicker.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.grandma.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.farm.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.mine.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.factory.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.bank.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.temple.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.wizardTower.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.shipment.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.alchemyLab.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.portal.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.timeMachine.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.antimatterCondenser.gameTick(
      this.multiplier,
      this.milkMultiplier,
      diff
    );
    this.prism.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.chanceMaker.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.fractalEngine.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.javascriptConsole.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.idleverse.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.cortexBaker.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.you.gameTick(this.multiplier, this.milkMultiplier, diff);
    this.checkTotalCookiesAchievements();
  }
  public devModeIncreaseResource(addValue: Resource): void {
    this.resource.cookies += addValue.cookies;
    this.lifeTimeCookies.cookies += addValue.cookies;
    this.checkTotalCookiesAchievements();
  }

  public increaseResourceClick(addValue: Resource): void {
    this.resource.cookies += addValue.cookies;
    this.lifeTimeCookies.cookies += addValue.cookies;
    this.lifeTimeCookiesClick.cookies += addValue.cookies;
    this.checkTotalCookiesAchievements();
    this.checkClickingAchievements();
  }

  public calculateMultiplier(): void {
    this.multiplier = 100;
    this.flavoredCookies.forEach((element) => {
      if (element.acquired) {
        this.multiplier += this.multiplier * (element.multiplier / 100);
      }
    });
  }
  public calculateMilkMultiplier(): void {
    this.milkMultiplier = 1;
    this.kittens.forEach((element) => {
      if (element.acquired) {
        this.milkMultiplier *= 1 + (this.milk / 100) * element.multiplier;
      }
    });
  }
  public buyStructureUpgrade(id: number, type: BuildingType): void {
    if (type === "clicking") {
      for (const element of this.clickingUpgrades) {
        if (element.id === id) {
          if (
            this.lifeTimeCookiesClick.cookies >= element.requirement &&
            !element.acquired &&
            this.resource.cookies >= element.cost.cookies
          ) {
            this.resource.cookies -= element.cost.cookies;
            element.acquired = true;
            this.calculateClickingMultiplier();
          } else {
            return;
          }
        }
      }
    }
    if (type === "flavoredCookies") {
      for (const element of this.flavoredCookies) {
        if (element.id === id) {
          if (
            this.resource.cookies >= element.cost.cookies &&
            !element.acquired
          ) {
            this.resource.cookies -= element.cost.cookies;
            element.acquired = true;
            this.calculateMultiplier();
          } else {
            return;
          }
        }
      }
    }
    if (type === "kittens") {
      for (const element of this.kittens) {
        if (element.id === id) {
          if (
            this.earnedAchievements >= element.requirement &&
            !element.acquired &&
            this.resource.cookies >= element.cost.cookies
          ) {
            this.resource.cookies -= element.cost.cookies;
            element.acquired = true;
            this.calculateMilkMultiplier();
          } else {
            return;
          }
        }
      }
    }
    if (type === "cursor") {
      this.autoClicker.buyUpgradeLevel(this.resource, id);
    }
    if (type === "grandma") {
      this.grandma.buyUpgradeLevel(this.resource, id);
    }
    if (type === "farm") {
      this.farm.buyUpgradeLevel(this.resource, id);
    }
    if (type === "mine") {
      this.mine.buyUpgradeLevel(this.resource, id);
    }
    if (type === "factory") {
      this.factory.buyUpgradeLevel(this.resource, id);
    }
    if (type === "bank") {
      this.bank.buyUpgradeLevel(this.resource, id);
    }
    if (type === "temple") {
      this.temple.buyUpgradeLevel(this.resource, id);
    }
    if (type === "wizardTower") {
      this.wizardTower.buyUpgradeLevel(this.resource, id);
    }
    if (type === "shipment") {
      this.shipment.buyUpgradeLevel(this.resource, id);
    }
    if (type === "alchemyLab") {
      this.alchemyLab.buyUpgradeLevel(this.resource, id);
    }
    if (type === "portal") {
      this.portal.buyUpgradeLevel(this.resource, id);
    }
    if (type === "timeMachine") {
      this.timeMachine.buyUpgradeLevel(this.resource, id);
    }
    if (type === "antimatterCondenser") {
      this.antimatterCondenser.buyUpgradeLevel(this.resource, id);
    }
    if (type === "prism") {
      this.prism.buyUpgradeLevel(this.resource, id);
    }
    if (type === "chancemaker") {
      this.chanceMaker.buyUpgradeLevel(this.resource, id);
    }
    if (type === "fractalEngine") {
      this.fractalEngine.buyUpgradeLevel(this.resource, id);
    }
    if (type === "javascriptConsole") {
      this.javascriptConsole.buyUpgradeLevel(this.resource, id);
    }
    if (type === "idleverse") {
      this.idleverse.buyUpgradeLevel(this.resource, id);
    }
    if (type === "cortexBaker") {
      this.cortexBaker.buyUpgradeLevel(this.resource, id);
    }
    if (type === "you") {
      this.you.buyUpgradeLevel(this.resource, id);
    }
    this.checkTotalBuildingsAchievements();
    this.PassiveCalculateResourceGeneration();
  }

  // Check if the player can buy an upgrade for a structure
  public canBuyStructureUpgrade(id: number, type: BuildingType): boolean {
    if (type === "clicking") {
      for (const clickingUpgrade of this.clickingUpgrades) {
        if (clickingUpgrade.id === id) {
          if (
            this.lifeTimeCookiesClick.cookies >= clickingUpgrade.requirement &&
            !clickingUpgrade.acquired &&
            this.resource.cookies >= clickingUpgrade.cost.cookies
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
    if (type === "flavoredCookies") {
      for (const flavoredCookie of this.flavoredCookies) {
        if (flavoredCookie.id === id) {
          if (
            this.resource.cookies >= flavoredCookie.cost.cookies &&
            flavoredCookie.acquired === false
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
    if (type === "kittens") {
      for (const kitten of this.kittens) {
        if (kitten.id === id) {
          if (
            this.earnedAchievements >= kitten.requirement &&
            kitten.acquired === false &&
            this.resource.cookies >= kitten.cost.cookies
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
    if (type === "cursor") {
      return this.autoClicker.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "grandma") {
      return this.grandma.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "farm") {
      return this.farm.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "mine") {
      return this.mine.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "factory") {
      return this.factory.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "bank") {
      return this.bank.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "temple") {
      return this.temple.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "wizardTower") {
      return this.wizardTower.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "shipment") {
      return this.shipment.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "alchemyLab") {
      return this.alchemyLab.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "portal") {
      return this.portal.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "timeMachine") {
      return this.timeMachine.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "antimatterCondenser") {
      return this.antimatterCondenser.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "prism") {
      return this.prism.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "chancemaker") {
      return this.chanceMaker.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "fractalEngine") {
      return this.fractalEngine.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "javascriptConsole") {
      return this.javascriptConsole.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "idleverse") {
      return this.idleverse.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "cortexBaker") {
      return this.cortexBaker.canBuyStructureUpgrade(this.resource, id);
    }
    if (type === "you") {
      return this.you.canBuyStructureUpgrade(this.resource, id);
    }
    return false;
  }

  // Getters Resource
  public get_resources(): Resource {
    return this.resource;
  }
  public get_string_Number(): string {
    return Math.floor(this.resource.cookies).toString();
  }

  public get_lifeTimeCookies(): Resource {
    return this.lifeTimeCookies;
  }

  // Get the list of possible upgrades for all structures
  public getPossibleUpgradeList(): UpgradeType[] {
    const list: UpgradeType[] = [
      ...this.getUpgradesInRange(),
      ...this.autoClicker.getUpgradesInRange(),
      ...this.grandma.getUpgradesInRange(),
      ...this.farm.getUpgradesInRange(),
      ...this.mine.getUpgradesInRange(),
      ...this.factory.getUpgradesInRange(),
      ...this.bank.getUpgradesInRange(),
      ...this.temple.getUpgradesInRange(),
      ...this.wizardTower.getUpgradesInRange(),
      ...this.shipment.getUpgradesInRange(),
      ...this.alchemyLab.getUpgradesInRange(),
      ...this.portal.getUpgradesInRange(),
      ...this.timeMachine.getUpgradesInRange(),
      ...this.antimatterCondenser.getUpgradesInRange(),
      ...this.prism.getUpgradesInRange(),
      ...this.chanceMaker.getUpgradesInRange(),
      ...this.fractalEngine.getUpgradesInRange(),
      ...this.javascriptConsole.getUpgradesInRange(),
      ...this.idleverse.getUpgradesInRange(),
      ...this.cortexBaker.getUpgradesInRange(),
      ...this.you.getUpgradesInRange(),
    ].sort((a, b) => {
      return a.cost.cookies - b.cost.cookies;
    });

    return list;
  }

  // Save Game to LocalStorage (not Stable)
  public SaveGame() {
    const GrandmaUpgrades: SavingTypeUpgrades[] = [];
    this.grandma.grandmaUpgrades.forEach((value, key) => {
      GrandmaUpgrades.push({ id: key, acquired: value.acquired });
    });
    const CursorUpgrades: SavingTypeUpgrades[] = [];
    this.autoClicker.cursorUpgrades.forEach((value, key) => {
      CursorUpgrades.push({ id: key, acquired: value.acquired });
    });
    const FarmUpgrades: SavingTypeUpgrades[] = [];
    this.farm.farmUpgrades.forEach((value, key) => {
      FarmUpgrades.push({ id: key, acquired: value.acquired });
    });
    const MineUpgrades: SavingTypeUpgrades[] = [];
    this.mine.mineUpgrades.forEach((value, key) => {
      MineUpgrades.push({ id: key, acquired: value.acquired });
    });
    const FactoryUpgrades: SavingTypeUpgrades[] = [];
    this.factory.factoryUpgrades.forEach((value, key) => {
      FactoryUpgrades.push({ id: key, acquired: value.acquired });
    });
    const BankUpgrades: SavingTypeUpgrades[] = [];
    this.bank.bankUpgrades.forEach((value, key) => {
      BankUpgrades.push({ id: key, acquired: value.acquired });
    });
    const TempleUpgrades: SavingTypeUpgrades[] = [];
    this.temple.templeUpgrades.forEach((value, key) => {
      TempleUpgrades.push({ id: key, acquired: value.acquired });
    });
    const WizardTowerUpgrades: SavingTypeUpgrades[] = [];
    this.wizardTower.WizardTowerUpgrades.forEach((value, key) => {
      WizardTowerUpgrades.push({ id: key, acquired: value.acquired });
    });
    const ShipmentUpgrades: SavingTypeUpgrades[] = [];
    this.shipment.shipmentUpgrades.forEach((value, key) => {
      ShipmentUpgrades.push({ id: key, acquired: value.acquired });
    });
    const AlchemyLabUpgrades: SavingTypeUpgrades[] = [];
    this.alchemyLab.alchemyLabUpgrades.forEach((value, key) => {
      AlchemyLabUpgrades.push({ id: key, acquired: value.acquired });
    });
    const PortalUpgrades: SavingTypeUpgrades[] = [];
    this.portal.PortalUpgrades.forEach((value, key) => {
      PortalUpgrades.push({ id: key, acquired: value.acquired });
    });
    const TimeMachineUpgrades: SavingTypeUpgrades[] = [];
    this.timeMachine.timeMachineUpgrades.forEach((value, key) => {
      TimeMachineUpgrades.push({ id: key, acquired: value.acquired });
    });
    const AntimatterCondenserUpgrades: SavingTypeUpgrades[] = [];
    this.antimatterCondenser.antimatterCondenserUpgrades.forEach(
      (value, key) => {
        AntimatterCondenserUpgrades.push({ id: key, acquired: value.acquired });
      }
    );
    const PrismUpgrades: SavingTypeUpgrades[] = [];
    this.prism.prismUpgrades.forEach((value, key) => {
      PrismUpgrades.push({ id: key, acquired: value.acquired });
    });
    const ChanceMakerUpgrades: SavingTypeUpgrades[] = [];
    this.chanceMaker.chanceMakerUpgrades.forEach((value, key) => {
      ChanceMakerUpgrades.push({ id: key, acquired: value.acquired });
    });
    const FractalEngineUpgrades: SavingTypeUpgrades[] = [];
    this.fractalEngine.fractalEngineUpgrades.forEach((value, key) => {
      FractalEngineUpgrades.push({ id: key, acquired: value.acquired });
    });
    const JavascriptConsoleUpgrades: SavingTypeUpgrades[] = [];
    this.javascriptConsole.javascriptConsoleUpgrades.forEach((value, key) => {
      JavascriptConsoleUpgrades.push({ id: key, acquired: value.acquired });
    });
    const IdleverseUpgrades: SavingTypeUpgrades[] = [];
    this.idleverse.idleVerse.forEach((value, key) => {
      IdleverseUpgrades.push({ id: key, acquired: value.acquired });
    });
    const CortexBakerUpgrades: SavingTypeUpgrades[] = [];
    this.cortexBaker.cortexBakerUpgrades.forEach((value, key) => {
      CortexBakerUpgrades.push({ id: key, acquired: value.acquired });
    });
    const YouUpgrades: SavingTypeUpgrades[] = [];
    this.you.youUpgrades.forEach((value, key) => {
      YouUpgrades.push({ id: key, acquired: value.acquired });
    });

    let save: SaveType = {
      resource: this.resource,
      lifeTimeCookies: this.lifeTimeCookies,
      lifeTimeCookiesClicking: this.lifeTimeCookiesClick,
      multiplier: this.multiplier,
      clickingMultiplier: this.clickingMultiplier,
      clickingAchievements: this.clickingAchievements,
      TotalCookiesAchievements: this.TotalCookiesAchievements,
      cookiesPerSecondAchievement: this.cookiesPerSecondAchievements,
      TotalBuildingsAchievements: this.TotalBuildingsAchievements.map(
        (achievement) => {
          let x: SavingType = {
            id: achievement.id,
            acquired: achievement.acquired,
          };
          return x;
        }
      ),
      flavoredCookies: this.flavoredCookies,
      clickingUpgrades: this.clickingUpgrades,
      kittens: this.kittens,
      grandma: {
        structure: this.grandma.structure,
        structureCost: this.grandma.structureCost,
        lifeTimeCookiesBuilding: this.grandma.lifeTimeCookiesBuilding,
        grandmaUpgrades: GrandmaUpgrades,
        grandmaAchievements: this.grandma.grandmaAchievements.map(
          (achievement) => {
            let x: SavingType = {
              id: achievement.id,
              acquired: achievement.acquired,
            };
            return x;
          }
        ),
      },
      autoClicker: {
        structure: this.autoClicker.structure,
        structureCost: this.autoClicker.structureCost,
        lifeTimeCookiesBuilding: this.autoClicker.lifeTimeCookiesBuilding,
        cursorUpgrades: CursorUpgrades,
        CursorAchievements: this.autoClicker.CursorAchievements.map(
          (achievement) => {
            let x: SavingType = {
              id: achievement.id,
              acquired: achievement.acquired,
            };
            return x;
          }
        ),
      },
      farm: {
        structure: this.farm.structure,
        structureCost: this.farm.structureCost,
        lifeTimeCookiesBuilding: this.farm.lifeTimeCookiesBuilding,
        farmUpgrades: FarmUpgrades,
        farmAchievements: this.farm.farmAchievements.map((achievement) => {
          let x: SavingType = {
            id: achievement.id,
            acquired: achievement.acquired,
          };
          return x;
        }),
      },
      mine: {
        structure: this.mine.structure,
        structureCost: this.mine.structureCost,
        lifeTimeCookiesBuilding: this.mine.lifeTimeCookiesBuilding,
        mineUpgrades: MineUpgrades,
        mineAchievements: this.mine.mineAchievements.map((achievement) => {
          let x: SavingType = {
            id: achievement.id,
            acquired: achievement.acquired,
          };
          return x;
        }),
      },
      factory: {
        structure: this.factory.structure,
        structureCost: this.factory.structureCost,
        lifeTimeCookiesBuilding: this.factory.lifeTimeCookiesBuilding,
        factoryUpgrades: FactoryUpgrades,
        factoryAchievements: this.factory.factoryAchievements.map(
          (achievement) => {
            let x: SavingType = {
              id: achievement.id,
              acquired: achievement.acquired,
            };
            return x;
          }
        ),
      },
      bank: {
        structure: this.bank.structure,
        structureCost: this.bank.structureCost,
        lifeTimeCookiesBuilding: this.bank.lifeTimeCookiesBuilding,
        bankUpgrades: BankUpgrades,
        bankAchievements: this.bank.bankAchievements.map((achievement) => {
          let x: SavingType = {
            id: achievement.id,
            acquired: achievement.acquired,
          };
          return x;
        }),
      },
      temple: {
        structure: this.temple.structure,
        structureCost: this.temple.structureCost,
        lifeTimeCookiesBuilding: this.temple.lifeTimeCookiesBuilding,
        templeUpgrades: TempleUpgrades,
        templeAchievements: this.temple.templeAchievements.map(
          (achievement) => {
            let x: SavingType = {
              id: achievement.id,
              acquired: achievement.acquired,
            };
            return x;
          }
        ),
      },
      wizardTower: {
        structure: this.wizardTower.structure,
        structureCost: this.wizardTower.structureCost,
        lifeTimeCookiesBuilding: this.wizardTower.lifeTimeCookiesBuilding,
        wizardTowerUpgrades: WizardTowerUpgrades,
        wizardTowerAchievements: this.wizardTower.wizardTowerAchievements.map(
          (achievement) => {
            let x: SavingType = {
              id: achievement.id,
              acquired: achievement.acquired,
            };
            return x;
          }
        ),
      },
      shipment: {
        structure: this.shipment.structure,
        structureCost: this.shipment.structureCost,
        lifeTimeCookiesBuilding: this.shipment.lifeTimeCookiesBuilding,
        shipmentUpgrades: ShipmentUpgrades,
        shipmentAchievements: this.shipment.shipmentAchievements.map(
          (achievement) => {
            let x: SavingType = {
              id: achievement.id,
              acquired: achievement.acquired,
            };
            return x;
          }
        ),
      },
      alchemyLab: {
        structure: this.alchemyLab.structure,
        structureCost: this.alchemyLab.structureCost,
        lifeTimeCookiesBuilding: this.alchemyLab.lifeTimeCookiesBuilding,
        alchemyLabUpgrades: AlchemyLabUpgrades,
        alchemyLabAchievements: this.alchemyLab.alchemyLabAchievements.map(
          (achievement) => {
            let x: SavingType = {
              id: achievement.id,
              acquired: achievement.acquired,
            };
            return x;
          }
        ),
      },
      portal: {
        structure: this.portal.structure,
        structureCost: this.portal.structureCost,
        lifeTimeCookiesBuilding: this.portal.lifeTimeCookiesBuilding,
        portalUpgrades: PortalUpgrades,
        portalAchievements: this.portal.portalAchievements.map(
          (achievement) => {
            let x: SavingType = {
              id: achievement.id,
              acquired: achievement.acquired,
            };
            return x;
          }
        ),
      },
      timeMachine: {
        structure: this.timeMachine.structure,
        structureCost: this.timeMachine.structureCost,
        lifeTimeCookiesBuilding: this.timeMachine.lifeTimeCookiesBuilding,
        timeMachineUpgrades: TimeMachineUpgrades,
        timeMachineAchievements: this.timeMachine.timeMachineAchievements.map(
          (achievement) => {
            let x: SavingType = {
              id: achievement.id,
              acquired: achievement.acquired,
            };
            return x;
          }
        ),
      },
      antimatterCondenser: {
        structure: this.antimatterCondenser.structure,
        structureCost: this.antimatterCondenser.structureCost,
        lifeTimeCookiesBuilding:
          this.antimatterCondenser.lifeTimeCookiesBuilding,
        antimatterCondenserUpgrades: AntimatterCondenserUpgrades,
        antimatterCondenserAchievements:
          this.antimatterCondenser.antimatterCondenserAchievements.map(
            (achievement) => {
              let x: SavingType = {
                id: achievement.id,
                acquired: achievement.acquired,
              };
              return x;
            }
          ),
      },
      prism: {
        structure: this.prism.structure,
        structureCost: this.prism.structureCost,
        lifeTimeCookiesBuilding: this.prism.lifeTimeCookiesBuilding,
        prismUpgrades: PrismUpgrades,
        prismAchievements: this.prism.prismAchievements.map((achievement) => {
          let x: SavingType = {
            id: achievement.id,
            acquired: achievement.acquired,
          };
          return x;
        }),
      },
      chancemaker: {
        structure: this.chanceMaker.structure,
        structureCost: this.chanceMaker.structureCost,
        lifeTimeCookiesBuilding: this.chanceMaker.lifeTimeCookiesBuilding,
        chancemakerUpgrades: ChanceMakerUpgrades,
        chancemakerAchievements: this.chanceMaker.chanceMakerAchievements.map(
          (achievement) => {
            let x: SavingType = {
              id: achievement.id,
              acquired: achievement.acquired,
            };
            return x;
          }
        ),
      },
      fractalEngine: {
        structure: this.fractalEngine.structure,
        structureCost: this.fractalEngine.structureCost,
        lifeTimeCookiesBuilding: this.fractalEngine.lifeTimeCookiesBuilding,
        fractalEngineUpgrades: FractalEngineUpgrades,
        fractalEngineAchievements:
          this.fractalEngine.fractalEngineAchievements.map((achievement) => {
            let x: SavingType = {
              id: achievement.id,
              acquired: achievement.acquired,
            };
            return x;
          }),
      },
      javascriptConsole: {
        structure: this.javascriptConsole.structure,
        structureCost: this.javascriptConsole.structureCost,
        lifeTimeCookiesBuilding: this.javascriptConsole.lifeTimeCookiesBuilding,
        javascriptConsoleUpgrades: JavascriptConsoleUpgrades,
        javascriptConsoleAchievements:
          this.javascriptConsole.javascriptConsoleAchievements.map(
            (achievement) => {
              let x: SavingType = {
                id: achievement.id,
                acquired: achievement.acquired,
              };
              return x;
            }
          ),
      },
      idleverse: {
        structure: this.idleverse.structure,
        structureCost: this.idleverse.structureCost,
        lifeTimeCookiesBuilding: this.idleverse.lifeTimeCookiesBuilding,
        idleverseUpgrades: IdleverseUpgrades,
        idleverseAchievements: this.idleverse.idleVerseAchievements.map(
          (achievement) => {
            let x: SavingType = {
              id: achievement.id,
              acquired: achievement.acquired,
            };
            return x;
          }
        ),
      },
      cortexBaker: {
        structure: this.cortexBaker.structure,
        structureCost: this.cortexBaker.structureCost,
        lifeTimeCookiesBuilding: this.cortexBaker.lifeTimeCookiesBuilding,
        cortexBakerUpgrades: CortexBakerUpgrades,
        cortexBakerAchievements: this.cortexBaker.cortexBakerAchievements.map(
          (achievement) => {
            let x: SavingType = {
              id: achievement.id,
              acquired: achievement.acquired,
            };
            return x;
          }
        ),
      },
      you: {
        structure: this.you.structure,
        structureCost: this.you.structureCost,
        lifeTimeCookiesBuilding: this.you.lifeTimeCookiesBuilding,
        youUpgrades: YouUpgrades,
        youAchievements: this.you.youAchievements.map((achievement) => {
          let x: SavingType = {
            id: achievement.id,
            acquired: achievement.acquired,
          };
          return x;
        }),
      },
    };

    this.toast("Game Saved");
    return save;
  }

  public LoadGame(save: SaveType) {
    // Set Cookies

    this.resource = save.resource;
    this.lifeTimeCookies = save.lifeTimeCookies;
    this.lifeTimeCookiesClick = save.lifeTimeCookiesClicking ?? { cookies: 0 };
    this.multiplier = save.multiplier ?? 100;
    this.clickingMultiplier = save.clickingMultiplier ?? 0;
    // Set Achievements
    this.clickingAchievements =
      save.clickingAchievements ?? ClickingAchievements;
    this.TotalCookiesAchievements =
      save.TotalCookiesAchievements ?? totalCookiesAchievements;
    this.cookiesPerSecondAchievements =
      save.cookiesPerSecondAchievement ?? cookiesPerSecondAchievements;
    this.TotalBuildingsAchievements = this.TotalBuildingsAchievements.map(
      (achievement) => {
        if (save.TotalBuildingsAchievements) {
          save.TotalBuildingsAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      }
    );
    //Upgrade's
    this.flavoredCookies = save.flavoredCookies ?? [...FlavoredCookies];
    this.kittens = save.kittens ?? [...KittensUpgrades];
    this.clickingUpgrades = save.clickingUpgrades ?? [...ClickingUpgrades];
    // Set the Grandma
    this.grandma.structureCost = save.grandma.structureCost;
    this.grandma.structure = save.grandma.structure;
    this.grandma.lifeTimeCookiesBuilding = save.grandma
      .lifeTimeCookiesBuilding ?? { cookies: 0 };

    if (save.grandma.grandmaUpgrades instanceof Array) {
      save.grandma.grandmaUpgrades.forEach((element) => {
        this.grandma.grandmaUpgrades.get(element.id)!.acquired =
          element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.grandma.grandmaUpgrades).forEach(([key, value]) => {
        this.grandma.grandmaUpgrades.get(key)!.acquired = value.acquired;
      });
    }

    this.grandma.grandmaAchievements = this.grandma.grandmaAchievements.map(
      (achievement) => {
        if (save.grandma.grandmaAchievements) {
          save.grandma.grandmaAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      }
    );
    this.grandma.calculateStructureResourceGeneration1();
    // Set the Cursor
    this.autoClicker.structureCost = save.autoClicker.structureCost;
    this.autoClicker.structure = save.autoClicker.structure;
    this.autoClicker.lifeTimeCookiesBuilding = save.autoClicker
      .lifeTimeCookiesBuilding ?? { cookies: 0 };
    if (save.autoClicker.cursorUpgrades instanceof Array) {
      save.autoClicker.cursorUpgrades.forEach((element) => {
        this.autoClicker.cursorUpgrades.get(element.id)!.acquired =
          element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.autoClicker.cursorUpgrades).forEach(
        ([key, value]) => {
          this.autoClicker.cursorUpgrades.get(key)!.acquired = value.acquired;
        }
      );
    }

    this.autoClicker.CursorAchievements =
      this.autoClicker.CursorAchievements.map((achievement) => {
        if (save.autoClicker.CursorAchievements) {
          save.autoClicker.CursorAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      });
    this.autoClicker.calculateStructureResourceGeneration1();
    // Set the farm
    this.farm.structureCost = save.farm.structureCost;
    this.farm.structure = save.farm.structure;
    this.farm.lifeTimeCookiesBuilding = save.farm.lifeTimeCookiesBuilding ?? {
      cookies: 0,
    };
    if (save.farm.farmUpgrades instanceof Array) {
      save.farm.farmUpgrades.forEach((element) => {
        this.farm.farmUpgrades.get(element.id)!.acquired = element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.farm.farmUpgrades).forEach(([key, value]) => {
        this.farm.farmUpgrades.get(key)!.acquired = value.acquired;
      });
    }
    this.farm.farmAchievements = this.farm.farmAchievements.map(
      (achievement) => {
        if (save.farm.farmAchievements) {
          save.farm.farmAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      }
    );
    this.farm.calculateStructureResourceGeneration1();
    // Set the mine
    this.mine.structureCost = save.mine.structureCost;
    this.mine.structure = save.mine.structure;
    this.mine.lifeTimeCookiesBuilding = save.mine.lifeTimeCookiesBuilding ?? {
      cookies: 0,
    };
    if (save.mine.mineUpgrades instanceof Array) {
      save.mine.mineUpgrades.forEach((element) => {
        this.mine.mineUpgrades.get(element.id)!.acquired = element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.mine.mineUpgrades).forEach(([key, value]) => {
        this.mine.mineUpgrades.get(key)!.acquired = value.acquired;
      });
    }
    this.mine.mineAchievements = this.mine.mineAchievements.map(
      (achievement) => {
        if (save.mine.mineAchievements) {
          save.mine.mineAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      }
    );
    this.mine.calculateStructureResourceGeneration1();

    // Set the factory
    this.factory.structureCost = save.factory.structureCost;
    this.factory.structure = save.factory.structure;
    this.factory.lifeTimeCookiesBuilding = save.factory
      .lifeTimeCookiesBuilding ?? { cookies: 0 };
    if (save.factory.factoryUpgrades instanceof Array) {
      save.factory.factoryUpgrades.forEach((element) => {
        this.factory.factoryUpgrades.get(element.id)!.acquired =
          element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.factory.factoryUpgrades).forEach(([key, value]) => {
        this.factory.factoryUpgrades.get(key)!.acquired = value.acquired;
      });
    }
    this.factory.factoryAchievements = this.factory.factoryAchievements.map(
      (achievement) => {
        if (save.factory.factoryAchievements) {
          save.factory.factoryAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      }
    );
    this.factory.calculateStructureResourceGeneration1();

    // Set the bank
    this.bank.structureCost = save.bank.structureCost;
    this.bank.structure = save.bank.structure;
    this.bank.lifeTimeCookiesBuilding = save.bank.lifeTimeCookiesBuilding ?? {
      cookies: 0,
    };
    if (save.bank.bankUpgrades instanceof Array) {
      save.bank.bankUpgrades.forEach((element) => {
        this.bank.bankUpgrades.get(element.id)!.acquired = element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.bank.bankUpgrades).forEach(([key, value]) => {
        this.bank.bankUpgrades.get(key)!.acquired = value.acquired;
      });
    }
    this.bank.bankAchievements = this.bank.bankAchievements.map(
      (achievement) => {
        if (save.bank.bankAchievements) {
          save.bank.bankAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      }
    );
    this.bank.calculateStructureResourceGeneration1();

    // Set the temple
    this.temple.structureCost = save.temple.structureCost;
    this.temple.structure = save.temple.structure;
    this.temple.lifeTimeCookiesBuilding = save.temple
      .lifeTimeCookiesBuilding ?? { cookies: 0 };
    if (save.temple.templeUpgrades instanceof Array) {
      save.temple.templeUpgrades.forEach((element) => {
        this.temple.templeUpgrades.get(element.id)!.acquired = element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.temple.templeUpgrades).forEach(([key, value]) => {
        this.temple.templeUpgrades.get(key)!.acquired = value.acquired;
      });
    }
    this.temple.templeAchievements = this.temple.templeAchievements.map(
      (achievement) => {
        if (save.temple.templeAchievements) {
          save.temple.templeAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      }
    );
    this.temple.calculateStructureResourceGeneration1();

    // Set the wizardTower
    this.wizardTower.structureCost = save.wizardTower.structureCost;
    this.wizardTower.structure = save.wizardTower.structure;
    this.wizardTower.lifeTimeCookiesBuilding = save.wizardTower
      .lifeTimeCookiesBuilding ?? { cookies: 0 };
    if (save.wizardTower.wizardTowerUpgrades instanceof Array) {
      save.wizardTower.wizardTowerUpgrades.forEach((element) => {
        this.wizardTower.WizardTowerUpgrades.get(element.id)!.acquired =
          element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.wizardTower.wizardTowerUpgrades).forEach(
        ([key, value]) => {
          this.wizardTower.WizardTowerUpgrades.get(key)!.acquired =
            value.acquired;
        }
      );
    }
    this.wizardTower.wizardTowerAchievements =
      this.wizardTower.wizardTowerAchievements.map((achievement) => {
        if (save.wizardTower.wizardTowerAchievements) {
          save.wizardTower.wizardTowerAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      });
    this.wizardTower.calculateStructureResourceGeneration1();

    // Set the shipment
    this.shipment.structureCost = save.shipment.structureCost;
    this.shipment.structure = save.shipment.structure;
    this.shipment.lifeTimeCookiesBuilding = save.shipment
      .lifeTimeCookiesBuilding ?? { cookies: 0 };
    if (save.shipment.shipmentUpgrades instanceof Array) {
      save.shipment.shipmentUpgrades.forEach((element) => {
        this.shipment.shipmentUpgrades.get(element.id)!.acquired =
          element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.shipment.shipmentUpgrades).forEach(([key, value]) => {
        this.shipment.shipmentUpgrades.get(key)!.acquired = value.acquired;
      });
    }
    this.shipment.shipmentAchievements = this.shipment.shipmentAchievements.map(
      (achievement) => {
        if (save.shipment.shipmentAchievements) {
          save.shipment.shipmentAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      }
    );
    this.shipment.calculateStructureResourceGeneration1();

    // Set the alchemyLab
    this.alchemyLab.structureCost = save.alchemyLab.structureCost;
    this.alchemyLab.structure = save.alchemyLab.structure;
    this.alchemyLab.lifeTimeCookiesBuilding = save.alchemyLab
      .lifeTimeCookiesBuilding ?? { cookies: 0 };
    if (save.alchemyLab.alchemyLabUpgrades instanceof Array) {
      save.alchemyLab.alchemyLabUpgrades.forEach((element) => {
        this.alchemyLab.alchemyLabUpgrades.get(element.id)!.acquired =
          element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.alchemyLab.alchemyLabUpgrades).forEach(
        ([key, value]) => {
          this.alchemyLab.alchemyLabUpgrades.get(key)!.acquired =
            value.acquired;
        }
      );
    }
    this.alchemyLab.alchemyLabAchievements =
      this.alchemyLab.alchemyLabAchievements.map((achievement) => {
        if (save.alchemyLab.alchemyLabAchievements) {
          save.alchemyLab.alchemyLabAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      });
    this.alchemyLab.calculateStructureResourceGeneration1();

    // Set the portal
    this.portal.structureCost = save.portal.structureCost;
    this.portal.structure = save.portal.structure;
    this.portal.lifeTimeCookiesBuilding = save.portal
      .lifeTimeCookiesBuilding ?? {
      cookies: 0,
    };
    if (save.portal.portalUpgrades instanceof Array) {
      save.portal.portalUpgrades.forEach((element) => {
        this.portal.PortalUpgrades.get(element.id)!.acquired = element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.portal.portalUpgrades).forEach(([key, value]) => {
        this.portal.PortalUpgrades.get(key)!.acquired = value.acquired;
      });
    }
    this.portal.portalAchievements = this.portal.portalAchievements.map(
      (achievement) => {
        if (save.portal.portalAchievements) {
          save.portal.portalAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      }
    );
    this.portal.calculateStructureResourceGeneration1();

    // Set the timeMachine
    this.timeMachine.structureCost = save.timeMachine.structureCost;
    this.timeMachine.structure = save.timeMachine.structure;
    this.timeMachine.lifeTimeCookiesBuilding = save.timeMachine
      .lifeTimeCookiesBuilding ?? { cookies: 0 };
    if (save.timeMachine.timeMachineUpgrades instanceof Array) {
      save.timeMachine.timeMachineUpgrades.forEach((element) => {
        this.timeMachine.timeMachineUpgrades.get(element.id)!.acquired =
          element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.timeMachine.timeMachineUpgrades).forEach(
        ([key, value]) => {
          this.timeMachine.timeMachineUpgrades.get(key)!.acquired =
            value.acquired;
        }
      );
    }
    this.timeMachine.timeMachineAchievements =
      this.timeMachine.timeMachineAchievements.map((achievement) => {
        if (save.timeMachine.timeMachineAchievements) {
          save.timeMachine.timeMachineAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      });
    this.timeMachine.calculateStructureResourceGeneration1();

    // Set the antimatterCondenser

    this.antimatterCondenser.structureCost =
      save.antimatterCondenser.structureCost;
    this.antimatterCondenser.structure = save.antimatterCondenser.structure;
    this.antimatterCondenser.lifeTimeCookiesBuilding = save.antimatterCondenser
      .lifeTimeCookiesBuilding ?? { cookies: 0 };
    if (save.antimatterCondenser.antimatterCondenserUpgrades instanceof Array) {
      save.antimatterCondenser.antimatterCondenserUpgrades.forEach(
        (element) => {
          this.antimatterCondenser.antimatterCondenserUpgrades.get(
            element.id
          )!.acquired = element.acquired;
        }
      );
    } else {
      //Legacy Support
      Object.entries(
        save.antimatterCondenser.antimatterCondenserUpgrades
      ).forEach(([key, value]) => {
        this.antimatterCondenser.antimatterCondenserUpgrades.get(
          key
        )!.acquired = value.acquired;
      });
    }
    this.antimatterCondenser.antimatterCondenserAchievements =
      this.antimatterCondenser.antimatterCondenserAchievements.map(
        (achievement) => {
          if (save.antimatterCondenser.antimatterCondenserAchievements) {
            save.antimatterCondenser.antimatterCondenserAchievements.forEach(
              (element) => {
                if (element.id === achievement.id) {
                  achievement.acquired = element.acquired;
                  return achievement;
                }
              }
            );
          }
          return achievement;
        }
      );
    this.antimatterCondenser.calculateStructureResourceGeneration1();

    // Set the prism
    this.prism.structureCost = save.prism.structureCost;
    this.prism.structure = save.prism.structure;
    this.prism.lifeTimeCookiesBuilding = save.prism.lifeTimeCookiesBuilding ?? {
      cookies: 0,
    };
    if (save.prism.prismUpgrades instanceof Array) {
      save.prism.prismUpgrades.forEach((element) => {
        this.prism.prismUpgrades.get(element.id)!.acquired = element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.prism.prismUpgrades).forEach(([key, value]) => {
        this.prism.prismUpgrades.get(key)!.acquired = value.acquired;
      });
    }
    this.prism.prismAchievements = this.prism.prismAchievements.map(
      (achievement) => {
        if (save.prism.prismAchievements) {
          save.prism.prismAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      }
    );
    this.prism.calculateStructureResourceGeneration1();

    // Set the chancemaker
    this.chanceMaker.structureCost = save.chancemaker.structureCost;
    this.chanceMaker.structure = save.chancemaker.structure;
    this.chanceMaker.lifeTimeCookiesBuilding = save.chancemaker
      .lifeTimeCookiesBuilding ?? { cookies: 0 };
    if (save.chancemaker.chancemakerUpgrades instanceof Array) {
      save.chancemaker.chancemakerUpgrades.forEach((element) => {
        this.chanceMaker.chanceMakerUpgrades.get(element.id)!.acquired =
          element.acquired;
      });
    }
    this.chanceMaker.chanceMakerAchievements =
      this.chanceMaker.chanceMakerAchievements.map((achievement) => {
        if (save.chancemaker.chancemakerAchievements) {
          save.chancemaker.chancemakerAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      });
    this.chanceMaker.calculateStructureResourceGeneration1();

    // Set the fractalEngine
    this.fractalEngine.structureCost = save.fractalEngine.structureCost;
    this.fractalEngine.structure = save.fractalEngine.structure;
    this.fractalEngine.lifeTimeCookiesBuilding = save.fractalEngine
      .lifeTimeCookiesBuilding ?? { cookies: 0 };
    if (save.fractalEngine.fractalEngineUpgrades instanceof Array) {
      save.fractalEngine.fractalEngineUpgrades.forEach((element) => {
        this.fractalEngine.fractalEngineUpgrades.get(element.id)!.acquired =
          element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.fractalEngine.fractalEngineUpgrades).forEach(
        ([key, value]) => {
          this.fractalEngine.fractalEngineUpgrades.get(key)!.acquired =
            value.acquired;
        }
      );
    }
    this.fractalEngine.fractalEngineAchievements =
      this.fractalEngine.fractalEngineAchievements.map((achievement) => {
        if (save.fractalEngine.fractalEngineAchievements) {
          save.fractalEngine.fractalEngineAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      });
    this.fractalEngine.calculateStructureResourceGeneration1();

    // Set the javascriptConsole
    this.javascriptConsole.structureCost = save.javascriptConsole.structureCost;
    this.javascriptConsole.structure = save.javascriptConsole.structure;
    this.javascriptConsole.lifeTimeCookiesBuilding = save.javascriptConsole
      .lifeTimeCookiesBuilding ?? { cookies: 0 };
    if (save.javascriptConsole.javascriptConsoleUpgrades instanceof Array) {
      save.javascriptConsole.javascriptConsoleUpgrades.forEach((element) => {
        this.javascriptConsole.javascriptConsoleUpgrades.get(
          element.id
        )!.acquired = element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.javascriptConsole.javascriptConsoleUpgrades).forEach(
        ([key, value]) => {
          this.javascriptConsole.javascriptConsoleUpgrades.get(key)!.acquired =
            value.acquired;
        }
      );
    }
    this.javascriptConsole.javascriptConsoleAchievements =
      this.javascriptConsole.javascriptConsoleAchievements.map(
        (achievement) => {
          if (save.javascriptConsole.javascriptConsoleAchievements) {
            save.javascriptConsole.javascriptConsoleAchievements.forEach(
              (element) => {
                if (element.id === achievement.id) {
                  achievement.acquired = element.acquired;
                  return achievement;
                }
              }
            );
          }
          return achievement;
        }
      );
    this.javascriptConsole.calculateStructureResourceGeneration1();

    // Set the idleverse
    this.idleverse.structureCost = save.idleverse.structureCost;
    this.idleverse.structure = save.idleverse.structure;
    this.idleverse.lifeTimeCookiesBuilding = save.idleverse
      .lifeTimeCookiesBuilding ?? { cookies: 0 };
    if (save.idleverse.idleverseUpgrades instanceof Array) {
      save.idleverse.idleverseUpgrades.forEach((element) => {
        this.idleverse.idleVerse.get(element.id)!.acquired = element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.idleverse.idleverseUpgrades).forEach(
        ([key, value]) => {
          this.idleverse.idleVerse.get(key)!.acquired = value.acquired;
        }
      );
    }
    this.idleverse.idleVerseAchievements =
      this.idleverse.idleVerseAchievements.map((achievement) => {
        if (save.idleverse.idleverseAchievements) {
          save.idleverse.idleverseAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      });
    this.idleverse.calculateStructureResourceGeneration1();

    // Set the cortexBaker
    this.cortexBaker.structureCost = save.cortexBaker.structureCost;
    this.cortexBaker.structure = save.cortexBaker.structure;
    this.cortexBaker.lifeTimeCookiesBuilding = save.cortexBaker
      .lifeTimeCookiesBuilding ?? { cookies: 0 };
    if (save.cortexBaker.cortexBakerUpgrades instanceof Array) {
      save.cortexBaker.cortexBakerUpgrades.forEach((element) => {
        this.cortexBaker.cortexBakerUpgrades.get(element.id)!.acquired =
          element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.cortexBaker.cortexBakerUpgrades).forEach(
        ([key, value]) => {
          this.cortexBaker.cortexBakerUpgrades.get(key)!.acquired =
            value.acquired;
        }
      );
    }
    this.cortexBaker.cortexBakerAchievements =
      this.cortexBaker.cortexBakerAchievements.map((achievement) => {
        if (save.cortexBaker.cortexBakerAchievements) {
          save.cortexBaker.cortexBakerAchievements.forEach((element) => {
            if (element.id === achievement.id) {
              achievement.acquired = element.acquired;
              return achievement;
            }
          });
        }
        return achievement;
      });
    this.cortexBaker.calculateStructureResourceGeneration1();

    // Set the you
    this.you.structureCost = save.you.structureCost;
    this.you.structure = save.you.structure;
    this.you.lifeTimeCookiesBuilding = save.you.lifeTimeCookiesBuilding ?? {
      cookies: 0,
    };
    if (save.you.youUpgrades instanceof Array) {
      save.you.youUpgrades.forEach((element) => {
        this.you.youUpgrades.get(element.id)!.acquired = element.acquired;
      });
    } else {
      //Legacy Support
      Object.entries(save.you.youUpgrades).forEach(([key, value]) => {
        this.you.youUpgrades.get(key)!.acquired = value.acquired;
      });
    }
    this.you.youAchievements = this.you.youAchievements.map((achievement) => {
      if (save.you.youAchievements) {
        save.you.youAchievements.forEach((element) => {
          if (element.id === achievement.id) {
            achievement.acquired = element.acquired;
            return achievement;
          }
        });
      }
      return achievement;
    });
    this.you.calculateStructureResourceGeneration1();

    // Reload Game generation
    this.InitCheckBuildingsAchievements();
    this.checkTotalBuildingsAchievements();
    this.PassiveCalculateResourceGeneration();
    this.ClickCalculateResourceGeneration();
    this.calculateMultiplier();
    this.calculateMilkMultiplier();
  }
  public resetGame(): void {
    this.resource = { cookies: 0 };
    this.lifeTimeCookies = { cookies: 0 };
    this.lifeTimeCookiesClick = { cookies: 0 };
    this.clickingMultiplier = 0;
    this.multiplier = 100;
    this.milkMultiplier = 1;
    this.milk = 0;
    this.earnedAchievements = 0;
    this.grandma = new Grandma(this);
    this.autoClicker = new Cursor(this);
    this.farm = new Farm(this);
    this.mine = new Mine(this);
    this.factory = new Factory(this);
    this.bank = new Bank(this);
    this.temple = new Temple(this);
    this.wizardTower = new WizardTower(this);
    this.shipment = new Shipment(this);
    this.alchemyLab = new AlchemyLab(this);
    this.portal = new Portal(this);
    this.timeMachine = new TimeMachine(this);
    this.antimatterCondenser = new AntiMatterCondenser(this);
    this.prism = new Prism(this);
    this.chanceMaker = new ChanceMaker(this);
    this.fractalEngine = new FractalEngine(this);
    this.javascriptConsole = new JavaScriptConsole(this);
    this.idleverse = new IdleVerse(this);
    this.cortexBaker = new CortexBaker(this);
    this.you = new You(this);
    this.flavoredCookies = [...FlavoredCookies];
    this.clickingAchievements = [...ClickingAchievements];
    this.TotalCookiesAchievements = [...totalCookiesAchievements];
    this.cookiesPerSecondAchievements = [...cookiesPerSecondAchievements];
    this.TotalBuildingsAchievements = [...TotalBuildingAndUpgradesAchievements];
    this.clickingUpgrades = [...ClickingUpgrades];
    this.kittens = [...KittensUpgrades];
    this.checkTotalBuildingsAchievements();
    this.PassiveCalculateResourceGeneration();
    this.ClickCalculateResourceGeneration();
    this.calculateMultiplier();
  }
}
class Global {
  //Help Function to update the cost of the upgrade
  public updateCost(
    currentCost: Resource,
    base: Resource,
    totalBuilding: number
  ): Resource {
    currentCost.cookies = base.cookies * 1.15 ** totalBuilding;
    return currentCost;
  }
  //Help Function to check if the player can buy the upgrade

  //Help Function to buy the upgrade or structure
  public buyUpgrade(cost: number, cookies: Resource): void {
    cookies.cookies -= cost;
  }
  //Help Function to convert the resource to a string
  public ResourceToString(resource: Resource): string {
    return Math.floor(resource.cookies).toString();
  }
}

class Structure extends Global {
  public canBuy(cookies: Resource, amount: number = 1): boolean {
    if (amount === 1) {
      if (cookies.cookies > this.structureCost.cookies) {
        return true;
      }
    } else {
      let total = 0;
      for (let i = 0; i < amount; i++) {
        total += this.checkFutureCost(i);
      }
      if (cookies.cookies > total) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }

  public checkFutureCost(amount: number): number {
    if (amount === 0) {
      return this.structureCost.cookies;
    }
    let currentCostTemp =
      this.structureCostDefault.cookies * 1.15 ** (this.structure + amount);

    return currentCostTemp;
  }
  //How many of this Building the player has.
  public structure: number;

  //The cost of the next Building
  public structureCost: Resource;

  //How much the Building generates per second
  public structureResourceGeneration: Resource;

  //The default cost of the Building
  private structureCostDefault: Resource;
  //The default generation of the Building
  public structureResourceGenerationDefault: Resource;
  public lifeTimeCookiesBuilding: { cookies: number } = { cookies: 0 };
  constructor({
    structure,
    structureCost,
    structureCostDefault,
    structureResourceGeneration,
    structureResourceGenerationDefault,
  }: StructureInit) {
    super();
    this.structure = structure;
    this.structureCost = structureCost;
    this.structureCostDefault = structureCostDefault;
    this.structureResourceGeneration = structureResourceGeneration;
    this.structureResourceGenerationDefault =
      structureResourceGenerationDefault;
  }
  public checkAchievements(): void {}
  //Buy a structure
  public increaseStructure(cookies: Resource, amount: number = 1): void {
    if (this.canBuy(cookies, amount)) {
      this.buyUpgrade(this.getStructureCost(amount).cookies, cookies);
      this.structure += amount;
      this.increaseStructureCost();
    }
  }
  //
  public gameTick(
    multiplier: number,
    milkMultiplier: number,
    diff: number
  ): void {
    this.lifeTimeCookiesBuilding.cookies +=
      ((this.getStructureResourceGeneration().cookies * multiplier * diff) /
        100) *
      milkMultiplier;
    if (this.lifeTimeCookiesBuilding.cookies > 1e20) {
      this.checkAchievements();
    }
  }
  public getLifeTimeCookiesBuilding(): number {
    return this.lifeTimeCookiesBuilding.cookies;
  }

  //Update the cost of the structure after buying one
  private increaseStructureCost(): void {
    this.structureCost = this.updateCost(
      this.structureCost,
      this.structureCostDefault,
      this.structure
    );
  }

  //Get the Total generation of the buildings of this type  (structure * generation)
  public getStructureResourceGeneration(): Resource {
    return {
      cookies: this.structureResourceGeneration.cookies * this.structure,
    };
  }

  //Get Cost of the next structure
  public getStructureCost(amount: number = 1): Resource {
    if (amount === 1) {
      return this.structureCost;
    }
    let total = 0;
    for (let i = 0; i < amount; i++) {
      total += this.checkFutureCost(i);
    }
    return { cookies: total };
  }

  //Get the cost of the next structure as a string
  public getStructureCostString(): string {
    return this.ResourceToString(this.structureCost);
  }

  // If the player can buy the structure
  public canBuyStructure(cookies: Resource): boolean {
    return this.canBuy(cookies);
  }

  //Get the generation of the structure as a string

  //Get the amount of the Buildings
  public getStructureAmount(): number {
    return this.structure;
  }
}

class Cursor extends Structure {
  public cursorUpgrades1 = {
    "1": {
      id: 1,
      description: `The mouse and cursors are twice as efficient.
      "prod prod"`,
      name: "Reinforced Index Finger",
      cost: { cookies: 100 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "cursor",
      tier: "Plain",
    } as UpgradeType,
    "2": {
      id: 2,
      name: "Carpal Tunnel Prevention Cream",
      description: `The mouse and cursors are twice as efficient.
      "it... it hurts to click..."`,
      cost: { cookies: 500 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "cursor",
      tier: "Berrylium",
    } as UpgradeType,
    "3": {
      id: 3,
      name: "Ambidextrous",
      description: `The mouse and cursors are twice as efficient.
      "Look ma, both hands!"`,
      cost: { cookies: 10000 },
      multiplier: 2,
      requirement: 10,
      acquired: false,
      type: "cursor",
      tier: "Blueberrylium",
    } as UpgradeType,
    "4": {
      id: 4,
      name: "Thousand Fingers",
      description: `The mouse and cursors gain +0.1 cookies for each non-cursor object owned.`,
      cost: { cookies: 100000 },
      multiplier: 0.1, // This requires a special function to check every Building that exists
      requirement: 25,
      acquired: false,
      type: "cursor",
      tier: "Chalcedhoney",
    } as UpgradeType,
    "5": {
      id: 5,
      name: "Million Fingers",
      description: `Multiplies the gain from Thousand fingers by 5.
      "clickityclickity"`,
      cost: { cookies: 10000000 },
      multiplier: 5, // Increase the first 1000 cursor by 5?
      requirement: 50,
      acquired: false,
      type: "cursor",
      tier: "Buttergold",
    } as UpgradeType,
    "6": {
      id: 6,
      name: "Billion Fingers",
      description: `Multiplies the gain from Thousand fingers by 10.`,
      cost: { cookies: 1000000000 },
      multiplier: 10, // Increase the first 1000 cursor by 10?
      requirement: 100,
      acquired: false,
      type: "cursor",
      tier: "Sugarmuck",
    } as UpgradeType,
    "7": {
      id: 7,
      name: "Trillion Fingers",
      cost: { cookies: 100000000000 },
      description: `Multiplies the gain from Thousand fingers by 20.`,
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 150,
      acquired: false,
      type: "cursor",
      tier: "Jetmint",
    } as UpgradeType,
    "8": {
      id: 8,
      name: "Quadrillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 10000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 200,
      acquired: false,
      type: "cursor",
      tier: "Cherrysilver",
    } as UpgradeType,
    "9": {
      id: 9,
      name: "Quintillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 1000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 250,
      acquired: false,
      type: "cursor",
      tier: "Hazelrald",
    } as UpgradeType,
    "10": {
      id: 10,
      name: "Sextillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 100000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 300,
      acquired: false,
      type: "cursor",
      tier: "Mooncandy",
    } as UpgradeType,
    "11": {
      id: 11,
      name: "Septillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 10000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 350,
      acquired: false,
      type: "cursor",
      tier: "Astrofudge",
    } as UpgradeType,
    "12": {
      id: 12,
      name: "Octillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 1000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 400,
      acquired: false,
      type: "cursor",
      tier: "Alabascream",
    } as UpgradeType,
    "13": {
      id: 13,
      name: "Nonillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 100000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 450,
      acquired: false,
      type: "cursor",
      tier: "Iridyum",
    } as UpgradeType,
    "14": {
      id: 14,
      name: "Decillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 10000000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 500,
      acquired: false,
      type: "cursor",
      tier: "Glucosmium",
    } as UpgradeType,
    "15": {
      id: 15,
      name: "Undecillion Fingers",
      description: `Multiplies the gain from Thousand fingers by 20.`,
      cost: { cookies: 1000000000000000000000000000 },
      multiplier: 20, // Increase the first 1000 cursor by 20?
      requirement: 550,
      acquired: false,
      type: "cursor",
      tier: "Glimmeringue",
    } as UpgradeType,
  };
  public cursorUpgrades = new Map(Object.entries(this.cursorUpgrades1));
  private game: Clicker;
  public CursorAchievements = [...CursorAchievements];
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 15 },
      structureResourceGeneration: { cookies: 0.0 },
      structureResourceGenerationDefault: { cookies: 0.1 },

      structureCostDefault: { cookies: 15 },
    });
    this.game = game;
    this.calculateStructureResourceGeneration1();
  }
  // Achievement Methods
  public checkAchievements(): void {
    this.CursorAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }

  public getUpgradesInRange(): UpgradeType[] {
    const list: UpgradeType[] = [];
    this.cursorUpgrades.forEach((value, key) => {
      if (this.getStructureAmount() >= value.requirement && !value.acquired) {
        list.push(value);
      }
    });
    return list;
  }
  // Needs Requirements Check TODO
  public buyUpgradeLevel(cookies: Resource, id: number): void {
    const nextUpgrade = this.cursorUpgrades.get(id.toString());
    if (!nextUpgrade) {
      return;
    }
    if (!this.canBuyStructureUpgrade(cookies, id)) {
      return;
    }
    cookies.cookies = cookies.cookies - nextUpgrade.cost.cookies;
    nextUpgrade.acquired = true;
    this.calculateStructureResourceGeneration1();
    this.game.ClickCalculateResourceGeneration();
  }
  // Fix name after a concrete Plan
  public calculateStructureResourceGeneration1(): void {
    this.structureResourceGeneration.cookies =
      this.structureResourceGenerationDefault.cookies;
    this.cursorUpgrades.forEach((value, key) => {
      if (value.acquired && value.id !== 4) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      } else if (value.acquired && value.id === 4) {
        this.structureResourceGeneration.cookies +=
          value.multiplier * this.getNoneCursorAmount();
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.cursorUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.cursorUpgrades.get(id.toString());
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
  public getNoneCursorAmount(): number {
    let amount = 0;
    amount += this.game.grandma.getStructureAmount();
    amount += this.game.farm.getStructureAmount();
    amount += this.game.mine.getStructureAmount();
    amount += this.game.factory.getStructureAmount();
    amount += this.game.bank.getStructureAmount();
    amount += this.game.temple.getStructureAmount();
    amount += this.game.wizardTower.getStructureAmount();
    amount += this.game.shipment.getStructureAmount();
    amount += this.game.alchemyLab.getStructureAmount();
    amount += this.game.portal.getStructureAmount();
    amount += this.game.timeMachine.getStructureAmount();
    amount += this.game.antimatterCondenser.getStructureAmount();
    amount += this.game.prism.getStructureAmount();
    amount += this.game.chanceMaker.getStructureAmount();
    amount += this.game.fractalEngine.getStructureAmount();
    amount += this.game.javascriptConsole.getStructureAmount();
    amount += this.game.idleverse.getStructureAmount();
    amount += this.game.cortexBaker.getStructureAmount();
    amount += this.game.you.getStructureAmount();
    return amount;
  }
}

class Grandma extends Structure {
  public grandmaUpgrades1: { [key: string]: UpgradeType } = {
    "16": {
      id: 16,
      name: "Forwards from grandma",
      description: `Grandmas are twice as efficient.
      "RE:RE:thought you'd get a kick out of this ;))"`,
      cost: { cookies: 1000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "grandma",
      tier: "Plain",
    },
    "17": {
      id: 17,
      name: "Steel-plated rolling pins",
      description: `Grandmas are twice as efficient.
      "Just what you kneaded."`,
      cost: { cookies: 5000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "grandma",
      tier: "Berrylium",
    },
    "18": {
      id: 18,
      name: "Lubricated dentures",
      description: `Grandmas are twice as efficient.
      "squish"`,
      cost: { cookies: 50000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "grandma",
      tier: "Blueberrylium",
    },
    "19": {
      id: 19,
      name: "Prune juice",
      cost: { cookies: 5_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Gets me going."`,
      tier: "Chalcedhoney",
    },
    "20": {
      id: 20,
      name: "Double-thick glasses",
      cost: { cookies: 500_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Oh... so THAT's what I've been baking."`,
      tier: "Buttergold",
    },
    "21": {
      id: 21,
      name: "Aging agents",
      cost: { cookies: 50_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Counter-intuitively, grandmas have the uncanny ability to become more powerful the older they get."`,
      tier: "Sugarmuck",
    },
    "22": {
      id: 22,
      name: "Xtreme walkers",
      cost: { cookies: 50_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Complete with flame decals and a little horn that goes "toot"."`,
      tier: "Jetmint",
    },
    "23": {
      id: 23,
      name: "The Unbridling",
      cost: { cookies: 50_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "It might be a classic tale of bad parenting, but let's see where grandma is going with this."`,
      tier: "Cherrysilver",
    },
    "24": {
      id: 24,
      name: "Reverse dementia",
      cost: { cookies: 50_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Extremely unsettling, and somehow even worse than the regular kind."`,
      tier: "Hazelrald",
    },
    "25": {
      id: 25,
      name: "Timeproof hair dyes",
      cost: { cookies: 50_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Why do they always have those strange wispy pink dos? What do they know about candy floss that we don't?"`,
      tier: "Mooncandy",
    },
    "26": {
      id: 26,
      name: "Good manners",
      cost: { cookies: 50_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "grandma",
      description: `Grandmas are twice as efficient.
      "Apparently these ladies are much more amiable if you take the time to learn their strange, ancient customs, which seem to involve saying "please" and "thank you" and staring at the sun with bulging eyes while muttering eldritch curses under your breath."`,
      tier: "Astrofudge",
    },
    "27": {
      id: 27,
      name: "Generation degeneration",
      cost: { cookies: 50_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "grandma",
      tier: "Alabascream",
      description: `Grandmas are twice as efficient.
      "Genetic testing shows that most of your grandmas are infected with a strange degenerative disease that only seems to further their powers; the more time passes, the older they get. This should concern you."`,
    },
    "28": {
      id: 28,
      name: "Visits",
      cost: { cookies: 50_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "grandma",
      tier: "Iridyum",
      description: `Grandmas are twice as efficient.
      "In an extensive double-blind study (sample size: 12 millions), your researchers have found evidence that grandmas are up to twice as productive if you just come by and say hi once in a while. It's nice to check up on your grans! (Do not under any circumstances ingest any tea or tea-like substances the grandmas may offer you.)."`,
    },
    "29": {
      id: 29,
      name: "Kitchen cabinets",
      cost: { cookies: 50_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "grandma",
      tier: "Glucosmium",
      description: `Grandmas are twice as efficient.
      "A grandma's kitchen cabinet is a befuddling place. Through lesser-studied aggregating instincts, grandmas will tend to gradually fill all nearby cabinets with various sorts of things, such as curious coconut snacks or dietetic powders. By contract, these are legally yours, which opens up exciting opportunities for your substance investigation department."`,
    },
    "30": {
      id: 30,
      name: "Foam-tipped canes",
      cost: { cookies: 50_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "grandma",
      tier: "Glimmeringue",
      description: `Grandmas are twice as efficient.
      "Perhaps the result of prolonged service, your grandmas have developed all kinds of odd and aggressive hierarchies among themselves; these will help them not hurt each other as bad during their endless turf wars."`,
    },
  };
  public grandmaUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.grandmaUpgrades1)
  );
  public grandmaAchievements = [...GrandmaAchievements];
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 100 },
      structureResourceGeneration: { cookies: 1 },
      structureResourceGenerationDefault: { cookies: 1 },

      structureCostDefault: { cookies: 100 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.grandmaAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.grandmaUpgrades.forEach((upgrade) => {
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
    const upgrade = this.grandmaUpgrades.get(id.toString());
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
    this.grandmaUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.grandmaUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.grandmaUpgrades.get(id.toString());
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

class Farm extends Structure {
  public farmUpgrades1: { [key: string]: UpgradeType } = {
    "31": {
      id: 31,
      name: "Cheap hoes",
      cost: { cookies: 11_000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Rake in the dough!"`,
      tier: "Plain",
    },
    "32": {
      id: 32,
      name: "Fertilizer",
      cost: { cookies: 55_000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "It's chocolate, I swear."`,
      tier: "Berrylium",
    },
    "33": {
      id: 33,
      name: "Cookie trees",
      cost: { cookies: 550_000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "A relative of the breadfruit."`,
      tier: "Blueberrylium",
    },
    "34": {
      id: 34,
      name: "Genetically-modified cookies",
      cost: { cookies: 55_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "All-natural mutations."`,
      tier: "Chalcedhoney",
    },
    "35": {
      id: 35,
      name: "Gingerbread scarecrows",
      cost: { cookies: 550_000_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Staring at your crops with mischievous glee."`,
      tier: "Buttergold",
    },
    "36": {
      id: 36,
      name: "Pulsar sprinklers",
      cost: { cookies: 550_000_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "There's no such thing as over-watering. The moistest is the bestest."`,
      tier: "Sugarmuck",
    },
    "37": {
      id: 37,
      name: "Fudge fungus",
      cost: { cookies: 550_000_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "A sugary parasite whose tendrils help cookie growth.
      Please do not breathe in the spores. In case of spore ingestion, seek medical help within the next 36 seconds."`,
      tier: "Jetmint",
    },
    "38": {
      id: 38,
      name: "Wheat triffids",
      cost: { cookies: 550_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Taking care of crops is so much easier when your plants can just walk about and help around the farm.
      Do not pet. Do not feed. Do not attempt to converse with."`,
      tier: "Cherrysilver",
    },
    "39": {
      id: 39,
      name: "Humane pesticides",
      cost: { cookies: 550_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Made by people, for people, from people and ready to unleash some righteous scorching pain on those pesky insects that so deserve it."`,
      tier: "Hazelrald",
    },
    "40": {
      id: 40,
      name: "Barnstars",

      cost: { cookies: 550_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Ah, yes. These help quite a bit. Somehow."`,
      tier: "Mooncandy",
    },
    "41": {
      id: 41,
      name: "Lindworms",
      cost: { cookies: 550_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "You have to import these from far up north, but they really help areate the soil!"`,
      tier: "Astrofudge",
    },
    "42": {
      id: 42,
      name: "Global seed vault",
      cost: { cookies: 550_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "An enormous genetic repository that could outlive an apocalypse. Guarantees the survival of your empire, or at the very least its agricultural components, should civilization fall. Which should be any day now."`,
      tier: "Alabascream",
    },
    "43": {
      id: 43,
      name: "Reverse-veganism",
      cost: { cookies: 550_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Plants aren't for eating, plants are for exploitative agriculture and astronomical profit margins!"`,
      tier: "Iridyum",
    },
    "44": {
      id: 44,
      name: "Cookie mulch",
      cost: { cookies: 550_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "farm",
      tier: "Glucosmium",
      description: `Farms are twice as efficient.
      "Grinding surplus cookies into paste that you then spread onto your fields enables a strange feedback loop in the quality of your cookie crops. Cookie feeding on cookie should be an abomination, but then why does it taste so good?"`,
    },
    "45": {
      id: 45,
      name: "Self-driving tractors",
      cost: {
        cookies: 550_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "farm",
      description: `Farms are twice as efficient.
      "Embarked AI lets your field vehicles sow and harvest cookie crops at any time of the day or night, and with so few human casualties, too!"`,
      tier: "Glimmeringue",
    },
  };
  public farmUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.farmUpgrades1)
  );
  public farmAchievements = [...FarmAchievements];
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 1100 },
      structureResourceGeneration: { cookies: 8 },
      structureResourceGenerationDefault: { cookies: 8 },

      structureCostDefault: { cookies: 1100 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.farmAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.farmUpgrades.forEach((upgrade) => {
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
    const upgrade = this.farmUpgrades.get(id.toString());
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
    this.farmUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.farmUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.farmUpgrades.get(id.toString());
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
class Mine extends Structure {
  public farmUpgrades1: { [key: string]: UpgradeType } = {
    "46": {
      id: 46,
      name: "Sugar gas",
      cost: { cookies: 120_000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "A pink, volatile gas, found in the depths of some chocolate caves."`,
      tier: "Plain",
    },
    "47": {
      id: 47,
      name: "Megadrill",
      cost: { cookies: 600_000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "You're in deep."`,
      tier: "Berrylium",
    },
    "48": {
      id: 48,
      name: "Ultradrill",
      cost: { cookies: 6_000_000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "Finally caved in?"`,
      tier: "Blueberrylium",
    },
    "49": {
      id: 49,
      name: "Ultimadrill",
      cost: { cookies: 600_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "Pierce the heavens, etc."`,
      tier: "Chalcedhoney",
    },
    "50": {
      id: 50,
      name: "H-bomb mining",
      cost: { cookies: 60_000_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "Questionable efficiency, but spectacular nonetheless."`,
      tier: "Buttergold",
    },
    "51": {
      id: 51,
      name: "Coreforge",
      cost: { cookies: 6_000_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "You've finally dug a tunnel down to the Earth's core. It's pretty warm down here."`,
      tier: "Sugarmuck",
    },
    "52": {
      id: 52,
      name: "Planetsplitters",
      cost: { cookies: 6_000_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "mine",
      tier: "Jetmint",
      description: `Mines are twice as efficient.
      "These new state-of-the-art excavators have been tested on Merula, Globort and Flwanza VI, among other distant planets which have been curiously quiet lately."`,
    },
    "53": {
      id: 53,
      name: "Canola oil wells",
      cost: { cookies: 6_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "mine",
      tier: "Cherrysilver",
      description: `Mines are twice as efficient.
      "A previously untapped resource, canola oil permeates the underground olifers which grant it its particular taste and lucrative properties."`,
    },
    "54": {
      id: 54,
      name: "Mole people",
      cost: { cookies: 6_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "mine",
      tier: "Hazelrald",
      description: `Mines are twice as efficient.
      "Engineered from real human beings within your very labs, these sturdy little folks have a knack for finding the tastiest underground minerals in conditions that more expensive machinery probably wouldn't survive."`,
    },
    "55": {
      id: 55,
      name: "Mine canaries",
      cost: { cookies: 6_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "mine",
      description: `Mines are twice as efficient.
      "These aren't used for anything freaky! The miners just enjoy having a pet or two down there."`,
      tier: "Mooncandy",
    },
    "56": {
      id: 56,
      name: "Bore again",
      cost: { cookies: 6_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "mine",
      tier: "Astrofudge",
      description: `Mines are twice as efficient.
      "After extracting so much sediment for so long, you've formed some veritable mountains of your own from the accumulated piles of rock and dirt. Time to dig through those and see if you find anything fun!"`,
    },
    "57": {
      id: 57,
      name: "Air mining",
      cost: { cookies: 6_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "mine",
      tier: "Alabascream",
      description: `Mines are twice as efficient.
      "You've dug your drills through just about every solid surface you could find. But did you know recent advances have revealed untold riches hiding within non-solid surfaces too?"`,
    },
    "58": {
      id: 58,
      name: "Caramel alloys",
      cost: { cookies: 6_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "mine",
      tier: "Iridyum",
      description: `Mines are twice as efficient.
      "Your geologists have isolated a family of once-overlooked sugary ores that, when combined, may be turned into even more cookie ingredients. Your millions of miles of previously useless tunnels probably house insane amounts of the stuff!"`,
    },
    "59": {
      id: 59,
      name: "Delicious mineralogy",
      cost: { cookies: 6_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "mine",
      tier: "Glucosmium",
      description: `Mines are twice as efficient.
      "Stratum after stratum, you've extracted strange new minerals heretofore unknown to geology. Ushering a new era of materials research, your scientists have been able to identify every new element your mines have discovered, including whatever those things are in the upgrade tier names."`,
    },
    "60": {
      id: 60,
      name: "Mineshaft supports",
      cost: { cookies: 6_000_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "mine",
      tier: "Glimmeringue",
      description: `Mines are twice as efficient.
      "You were rather skeptical about installing such embarrassingly low-tech implements, but limiting the number of daily cave-ins really does help with that annoying employee turnover!"`,
    },
  };
  public mineUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.farmUpgrades1)
  );
  private game: Clicker;
  public mineAchievements: AchievementType[] = [...MineAchievements];
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 12_000 },
      structureResourceGeneration: { cookies: 47 },
      structureResourceGenerationDefault: { cookies: 47 },

      structureCostDefault: { cookies: 12_000 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.mineAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.mineUpgrades.forEach((upgrade) => {
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
    const upgrade = this.mineUpgrades.get(id.toString());
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
    this.mineUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.mineUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.mineUpgrades.get(id.toString());
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

class Factory extends Structure {
  public FactoryUpgrades1: { [key: string]: UpgradeType } = {
    "61": {
      id: 61,
      name: "Sturdier conveyor belts",
      cost: { cookies: 1_300_000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Plain",
    },
    "62": {
      id: 62,
      name: "Child labor",
      cost: { cookies: 6_500_000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Berrylium",
    },
    "63": {
      id: 63,
      name: "Sweatshop",
      cost: { cookies: 65_000_000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Blueberrylium",
    },
    "64": {
      id: 64,
      name: "Radium reactors",
      cost: { cookies: 6_500_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Chalcedhoney",
    },
    "65": {
      id: 65,
      name: "Recombobulators",
      cost: { cookies: 650_000_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Buttergold",
    },
    "66": {
      id: 66,
      name: "Deep-bake process",
      cost: { cookies: 65_000_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Sugarmuck",
    },
    "67": {
      id: 67,
      name: "Cyborg workforce",
      cost: { cookies: 65_000_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Jetmint",
    },
    "68": {
      id: 68,
      name: "78-hour days",
      cost: { cookies: 65_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Cherrysilver",
    },
    "69": {
      id: 69,
      name: "Machine learning",
      cost: { cookies: 65_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Hazelrald",
    },
    "70": {
      id: 70,
      name: "Brownie point system",
      cost: { cookies: 65_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Mooncandy",
    },
    "71": {
      id: 71,
      name: "Volunteer interns",
      cost: { cookies: 65_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Astrofudge",
    },
    "72": {
      id: 72,
      name: "Behavioral reframing",
      cost: { cookies: 65_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Alabascream",
    },
    "73": {
      id: 73,
      name: "The Infinity Engine",
      cost: { cookies: 65_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Iridyum",
    },
    "74": {
      id: 74,
      name: "N-dimensional assembly lines",
      cost: { cookies: 65_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Glucosmium",
    },
    "75": {
      id: 75,
      name: "Universal automation",
      cost: { cookies: 65_000_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "factory",
      description: `Factories are twice as efficient.`,
      tier: "Glimmeringue",
    },
  };
  public factoryUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.FactoryUpgrades1)
  );
  private game: Clicker;
  public factoryAchievements: AchievementType[] = [...FactoryAchievements];
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 130_000 },
      structureResourceGeneration: { cookies: 260 },
      structureResourceGenerationDefault: { cookies: 260 },

      structureCostDefault: { cookies: 130_000 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.factoryAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.factoryUpgrades.forEach((upgrade) => {
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
    const upgrade = this.factoryUpgrades.get(id.toString());
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
    this.factoryUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.factoryUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.factoryUpgrades.get(id.toString());
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

class Bank extends Structure {
  public BankUpgrades1: { [key: string]: UpgradeType } = {
    "76": {
      id: 76,
      name: "Taller tellers",
      cost: { cookies: 14_000_000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Plain",
    },
    "77": {
      id: 77,
      name: "Scissor-resistant credit cards",
      cost: { cookies: 70_000_000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Berrylium",
    },
    "78": {
      id: 78,
      name: "Acid-proof vaults",
      cost: { cookies: 700_000_000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Blueberrylium",
    },
    "79": {
      id: 79,
      name: "Chocolate coins",
      cost: { cookies: 70_000_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Chalcedhoney",
    },
    "80": {
      id: 80,
      name: "Exponential interest rates",
      cost: { cookies: 7_000_000_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Buttergold",
    },
    "81": {
      id: 81,
      name: "Financial zen",
      cost: { cookies: 700_000_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Sugarmuck",
    },
    "82": {
      id: 82,
      name: "Way of the wallet",
      cost: { cookies: 700_000_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Jetmint",
    },
    "83": {
      id: 83,
      name: "The stuff rationale",
      cost: { cookies: 700_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Cherrysilver",
    },
    "84": {
      id: 84,
      name: "Edible money",
      cost: { cookies: 700_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Hazelrald",
    },
    "85": {
      id: 85,
      name: "Grand supercycles",
      cost: { cookies: 700_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Mooncandy",
    },
    "86": {
      id: 86,
      name: "Rules of acquisition",
      cost: { cookies: 700_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Astrofudge",
    },
    "87": {
      id: 87,
      name: "Altruistic loop",
      cost: { cookies: 700_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Alabascream",
    },
    "88": {
      id: 88,
      name: "Diminishing tax returns",
      cost: { cookies: 700_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Iridyum",
    },
    "89": {
      id: 89,
      name: "The 1%",
      cost: { cookies: 700_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Glucosmium",
    },
    "90": {
      id: 90,
      name: "Financial recursion",
      cost: {
        cookies: 700_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "bank",
      description: `Banks are twice as efficient.`,
      tier: "Glimmeringue",
    },
  };
  public bankUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.BankUpgrades1)
  );
  private game: Clicker;
  public bankAchievements: AchievementType[] = [...BankAchievements];
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 1_400_000 },
      structureResourceGeneration: { cookies: 1_400 },
      structureResourceGenerationDefault: { cookies: 1_400 },

      structureCostDefault: { cookies: 1_400_000 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.bankAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.bankUpgrades.forEach((upgrade) => {
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
    const upgrade = this.bankUpgrades.get(id.toString());
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
    this.bankUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.bankUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.bankUpgrades.get(id.toString());
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

class Temple extends Structure {
  public templeUpgrades1: { [key: string]: UpgradeType } = {
    "91": {
      id: 91,
      name: "Golden idols",
      cost: { cookies: 200_000_000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Plain",
    },
    "92": {
      id: 92,
      name: "Sacrifices",
      cost: { cookies: 1_000_000_000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Berrylium",
    },
    "93": {
      id: 93,
      name: "Delicious blessing",
      cost: { cookies: 10_000_000_000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Blueberrylium",
    },
    "94": {
      id: 94,
      name: "Sun festival",
      cost: { cookies: 1_000_000_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Chalcedhoney",
    },
    "95": {
      id: 95,
      name: "Enlarged pantheon",
      cost: { cookies: 100_000_000_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Buttergold",
    },
    "96": {
      id: 96,
      name: "Great Baker in the sky",
      cost: { cookies: 10_000_000_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Sugarmuck",
    },
    "97": {
      id: 97,
      name: "Creation myth",
      cost: { cookies: 10_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Jetmint",
    },
    "98": {
      id: 98,
      name: "Theocracy",
      cost: { cookies: 10_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Cherrysilver",
    },
    "99": {
      id: 99,
      name: "Sick rap prayers",
      cost: { cookies: 10_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Hazelrald",
    },
    "100": {
      id: 100,
      name: "Psalm-reading",
      cost: { cookies: 10_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Mooncandy",
    },
    "101": {
      id: 101,
      name: "War of the gods",
      cost: { cookies: 100_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Astrofudge",
    },
    "102": {
      id: 102,
      name: "A novel idea",
      cost: { cookies: 1_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Alabascream",
    },
    "103": {
      id: 103,
      name: "Apparitions",
      cost: { cookies: 10_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Iridyum",
    },
    "104": {
      id: 104,
      name: "Negatheism",
      cost: {
        cookies: 100_000_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Glucosmium",
    },
    "105": {
      id: 105,
      name: " Temple Traps",
      cost: {
        cookies: 1_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "temple",
      description: `Temples are twice as efficient.`,
      tier: "Glimmeringue",
    },
  };
  public templeUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.templeUpgrades1)
  );
  private game: Clicker;
  public templeAchievements: AchievementType[] = [...TempleAchievements];
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 20_000_000 },
      structureResourceGeneration: { cookies: 7_800 },
      structureResourceGenerationDefault: { cookies: 7_800 },

      structureCostDefault: { cookies: 20_000_000 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.templeAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.templeUpgrades.forEach((upgrade) => {
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
    const upgrade = this.templeUpgrades.get(id.toString());
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
    this.templeUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.templeUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.templeUpgrades.get(id.toString());
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

class WizardTower extends Structure {
  public wizardTowerUpgrades1: { [key: string]: UpgradeType } = {
    "106": {
      id: 106,
      name: "Pointier hats",
      cost: { cookies: 3_300_000_000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Plain",
    },
    "107": {
      id: 107,
      name: "Beardlier beards",
      cost: { cookies: 16_500_000_000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Berrylium",
    },
    "108": {
      id: 108,
      name: "Ancient grimoires",
      cost: { cookies: 165_000_000_000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Blueberrylium",
    },
    "109": {
      id: 109,
      name: "Kitchen curses",
      cost: { cookies: 16_500_000_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Chalcedhoney",
    },
    "110": {
      id: 110,
      name: "School of sorcery",
      cost: { cookies: 1_650_000_000_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Buttergold",
    },
    "111": {
      id: 111,
      name: "Dark formulas",
      cost: { cookies: 165_000_000_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Sugarmuck",
    },
    "112": {
      id: 112,
      name: "Cookiemancy",
      cost: { cookies: 165_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Jetmint",
    },
    "113": {
      id: 113,
      name: "Rabbit trick",
      cost: { cookies: 165_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Cherrysilver",
    },
    "114": {
      id: 114,
      name: "Deluxe tailored wands",
      cost: { cookies: 165_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Hazelrald",
    },
    "115": {
      id: 115,
      name: "Immobile spellcasting",
      cost: { cookies: 165_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Mooncandy",
    },
    "116": {
      id: 116,
      name: "Electricity",
      cost: { cookies: 165_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Astrofudge",
    },
    "117": {
      id: 117,
      name: "Spelling bees",
      cost: { cookies: 165_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Alabascream",
    },
    "118": {
      id: 118,
      name: "Wizzaaaaaard wands",
      cost: { cookies: 165_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Iridyum",
    },
    "119": {
      id: 119,
      name: "Hexes and curses",
      cost: {
        cookies: 165_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Glucosmium",
    },
    "120": {
      id: 120,
      name: "Pointier hats",
      cost: {
        cookies: 165_000_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "wizardTower",
      description: `Wizard towers are twice as efficient.`,
      tier: "Glimmeringue",
    },
  };
  public WizardTowerUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.wizardTowerUpgrades1)
  );
  private game: Clicker;
  public wizardTowerAchievements: AchievementType[] = [
    ...WizardTowerAchievements,
  ];
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 330_000_000 },
      structureResourceGeneration: { cookies: 44_800 },
      structureResourceGenerationDefault: { cookies: 44_800 },

      structureCostDefault: { cookies: 330_000_000 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.wizardTowerAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.WizardTowerUpgrades.forEach((upgrade) => {
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
    const upgrade = this.WizardTowerUpgrades.get(id.toString());
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
    this.WizardTowerUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.WizardTowerUpgrades.get(
      id.toString()
    )?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.WizardTowerUpgrades.get(id.toString());
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

class Shipment extends Structure {
  public shipmentUpgrades1: { [key: string]: UpgradeType } = {
    "121": {
      id: 121,
      name: "Vanilla nebulae",
      cost: { cookies: 51_000_000_000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Plain",
    },
    "122": {
      id: 122,
      name: "Wormholes",
      cost: { cookies: 255_000_000_000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Berrylium",
    },
    "123": {
      id: 123,
      name: "Frequent flyer",
      cost: { cookies: 2_550_000_000_000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Blueberrylium",
    },
    "124": {
      id: 124,
      name: "Warp drive",
      cost: { cookies: 255_000_000_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Chalcedhoney",
    },
    "125": {
      id: 125,
      name: "Chocolate monoliths",
      cost: { cookies: 25_500_000_000_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Buttergold",
    },
    "126": {
      id: 126,
      name: "Generation ship",
      cost: { cookies: 2_550_000_000_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Sugarmuck",
    },
    "127": {
      id: 127,
      name: "Dyson sphere",
      cost: { cookies: 2_550_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Jetmint",
    },
    128: {
      id: 128,
      name: "The final frontier",
      cost: { cookies: 2_550_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Cherrysilver",
    },
    129: {
      id: 129,
      name: "Autopilot",
      cost: { cookies: 2_550_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Hazelrald",
    },
    130: {
      id: 130,
      name: "Restaurants at the end of the universe",
      cost: { cookies: 2_550_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Mooncandy",
    },
    131: {
      id: 131,
      name: "Universal alphabet",
      cost: { cookies: 2_550_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Astrofudge",
    },
    132: {
      id: 132,
      name: "Ancient tablet",
      cost: { cookies: 2_550_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Alabascream",
    },
    133: {
      id: 133,
      name: "Insane oatling workers",
      cost: { cookies: 2_550_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Iridyum",
    },
    134: {
      id: 134,
      name: "Soul bond",
      cost: {
        cookies: 2_550_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Glucosmium",
    },
    135: {
      id: 135,
      name: "Flux capacitors",
      cost: {
        cookies: 2_550_000_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "shipment",
      description: `Shipments are twice as efficient.`,
      tier: "Glimmeringue",
    },
  };
  public shipmentUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.shipmentUpgrades1)
  );
  private game: Clicker;
  public shipmentAchievements: AchievementType[] = [...ShipmentAchievements];
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 5_100_000_000 },
      structureResourceGeneration: { cookies: 260_000 },
      structureResourceGenerationDefault: { cookies: 260_000 },

      structureCostDefault: { cookies: 5_100_000_000 },
    });
    this.game = game;
  }

  public checkAchievements(): void {
    this.shipmentAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.shipmentUpgrades.forEach((upgrade) => {
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
    const upgrade = this.shipmentUpgrades.get(id.toString());
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
    this.shipmentUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.shipmentUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.shipmentUpgrades.get(id.toString());
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

class AlchemyLab extends Structure {
  public AlchemyLabUpgrades1: { [key: string]: UpgradeType } = {
    136: {
      id: 136,
      name: "Antimony",
      cost: { cookies: 750_000_000_000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "alchemyLab",
      description: `Alchemy labs are twice as efficient.`,
      tier: "Plain",
    },

    137: {
      id: 137,
      name: "Essence of dough",
      cost: { cookies: 3_750_000_000_000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "alchemyLab",
      description: `Alchemy labs are twice as efficient.`,
      tier: "Berrylium",
    },
    138: {
      id: 138,
      name: "True chocolate",
      cost: { cookies: 37_500_000_000_000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "alchemyLab",
      description: `Alchemy labs are twice as efficient.`,
      tier: "Blueberrylium",
    },
    139: {
      id: 139,
      name: "Ambrosia",
      cost: { cookies: 3_750_000_000_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "alchemyLab",
      description: `Alchemy labs are twice as efficient.`,
      tier: "Chalcedhoney",
    },
    140: {
      id: 140,
      name: "Aqua crustulae",
      cost: { cookies: 375_000_000_000_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "alchemyLab",
      description: `Alchemy labs are twice as efficient.`,
      tier: "Buttergold",
    },
    141: {
      id: 141,
      name: "Origin crucible",
      cost: { cookies: 37_500_000_000_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "alchemyLab",
      description: `Alchemy labs are twice as efficient.`,
      tier: "Sugarmuck",
    },
    142: {
      id: 142,
      name: "Theory of atomic fluidity",
      cost: { cookies: 37_500_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "alchemyLab",
      description: `Alchemy labs are twice as efficient.`,
      tier: "Jetmint",
    },
    143: {
      id: 143,
      name: "Beige goo",
      cost: { cookies: 37_500_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "alchemyLab",
      description: `Alchemy labs are twice as efficient.`,
      tier: "Cherrysilver",
    },
    144: {
      id: 144,
      name: "The advent of chemistry",
      cost: { cookies: 37_500_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "alchemyLab",
      description: `Alchemy labs are twice as efficient.`,
      tier: "Hazelrald",
    },
    145: {
      id: 145,
      name: "On second thought",
      cost: { cookies: 37_500_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "alchemyLab",
      description: `Alchemy labs are twice as efficient.`,
      tier: "Mooncandy",
    },
    146: {
      id: 146,
      name: "Public betterment",

      cost: { cookies: 37_500_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "alchemyLab",
      description: `Alchemy labs are twice as efficient.`,
      tier: "Astrofudge",
    },
    147: {
      id: 147,
      name: "The secrets of the universe",
      cost: { cookies: 37_500_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "alchemyLab",
      description: `Alchemy labs are twice as efficient.`,
      tier: "Alabascream",
    },
    148: {
      id: 148,
      name: "Occult obstruction",
      cost: { cookies: 37_500_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "alchemyLab",
      description: `Alchemy labs are twice as efficient.`,
      tier: "Iridyum",
    },
    149: {
      id: 149,
      name: "Molecular gastronomy",
      cost: {
        cookies: 37_500_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "alchemyLab",
      description: `Alchemy labs are twice as efficient.`,
      tier: "Glucosmium",
    },
  };
  public alchemyLabUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.AlchemyLabUpgrades1)
  );
  public alchemyLabAchievements: AchievementType[] = [
    ...AlchemyLabAchievements,
  ];
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
  public checkAchievements(): void {
    this.alchemyLabAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
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
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
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

class Portal extends Structure {
  public PortalUpgrades1: { [key: string]: UpgradeType } = {
    150: {
      id: 150,
      name: "Ancient tablet",
      cost: { cookies: 10_000_000_000_000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Plain",
    },
    151: {
      id: 151,
      name: "Insane oatling workers",
      cost: { cookies: 50_000_000_000_000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Berrylium",
    },
    152: {
      id: 152,
      name: "Soul bond",
      cost: { cookies: 500_000_000_000_000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Blueberrylium",
    },
    153: {
      id: 153,
      name: "Sanity dance",
      cost: { cookies: 50_000_000_000_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Chalcedhoney",
    },
    154: {
      id: 154,
      name: "Brane transplant",
      cost: { cookies: 5_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Buttergold",
    },
    155: {
      id: 155,
      name: "Deity-sized portals",
      cost: { cookies: 500_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Sugarmuck",
    },
    156: {
      id: 156,
      name: "End of times back-up plan",
      cost: { cookies: 500_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Jetmint",
    },
    157: {
      id: 157,
      name: "Maddening chants",
      cost: { cookies: 500_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Cherrysilver",
    },
    158: {
      id: 158,
      name: "The real world",
      cost: { cookies: 500_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Hazelrald",
    },
    159: {
      id: 159,
      name: "Dimensional garbage gulper",

      cost: { cookies: 500_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Mooncandy",
    },
    160: {
      id: 160,
      name: "Embedded microportals",
      cost: { cookies: 500_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Astrofudge",
    },
    161: {
      id: 161,
      name: "Recursive mirrors",

      cost: { cookies: 500_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Alabascream",
    },
    162: {
      id: 162,
      name: "Menger sponge",
      cost: {
        cookies: 500_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Iridyum",
    },
    163: {
      id: 163,
      name: "Mantle of knowledge",
      cost: {
        cookies: 500_000_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Glucosmium",
    },
    164: {
      id: 164,
      name: "Planetsplitters",
      cost: {
        cookies: 500_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "portal",
      description: `Portals are twice as efficient.`,
      tier: "Glimmeringue",
    },
  };
  public PortalUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.PortalUpgrades1)
  );
  private game: Clicker;
  public portalAchievements: AchievementType[] = [...PortalAchievements];
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 1_000_000_000_000 },
      structureResourceGeneration: { cookies: 10_000_000 },
      structureResourceGenerationDefault: { cookies: 10_000_000 },

      structureCostDefault: { cookies: 1_000_000_000_000 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.portalAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.PortalUpgrades.forEach((upgrade) => {
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
    const upgrade = this.PortalUpgrades.get(id.toString());
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
    this.PortalUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.PortalUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }

  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.PortalUpgrades.get(id.toString());
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

class TimeMachine extends Structure {
  public timeMachineUpgrades1: { [key: string]: UpgradeType } = {
    165: {
      id: 165,
      name: "Flux capacitors",
      cost: { cookies: 140_000_000_000_000 },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Plain",
    },
    166: {
      id: 166,
      name: "Time paradox resolver",
      cost: { cookies: 700_000_000_000_000 },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Berrylium",
    },
    167: {
      id: 167,
      name: "Quantum conundrum",
      cost: { cookies: 7_000_000_000_000_000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Blueberrylium",
    },
    168: {
      id: 168,
      name: "Causality enforcer",
      cost: { cookies: 700_000_000_000_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Chalcedhoney",
    },
    169: {
      id: 169,
      name: "Yestermorrow comparators",
      cost: { cookies: 70_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Buttergold",
    },
    170: {
      id: 170,
      name: "Far future enactment",
      cost: { cookies: 7_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Sugarmuck",
    },
    171: {
      id: 171,
      name: "Great loop hypothesis",
      cost: { cookies: 7_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Jetmint",
    },
    172: {
      id: 172,
      name: "Cookietopian moments of maybe",
      cost: { cookies: 7_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Cherrysilver",
    },
    173: {
      id: 173,
      name: "Second seconds",
      cost: { cookies: 7_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Hazelrald",
    },
    174: {
      id: 174,
      name: "Additional clock hands",
      cost: { cookies: 7_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Mooncandy",
    },
    175: {
      id: 175,
      name: "Nostalgia",
      cost: { cookies: 70_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Astrofudge",
    },
    176: {
      id: 176,
      name: "Split seconds",
      cost: {
        cookies: 700_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Alabascream",
    },
    177: {
      id: 177,
      name: "Patience abolished",
      cost: {
        cookies: 7_000_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Iridyum",
    },
    178: {
      id: 178,
      name: "Timeproof hair dyes",
      cost: {
        cookies: 70_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Glucosmium",
    },
    179: {
      id: 179,
      name: "Timeline overclocking",
      cost: {
        cookies: 700_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "timeMachine",
      description: `Time machines are twice as efficient.`,
      tier: "Glimmeringue",
    },
  };
  public timeMachineUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.timeMachineUpgrades1)
  );
  private game: Clicker;
  public timeMachineAchievements: AchievementType[] = [
    ...TimeMachineAchievements,
  ];
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
  public checkAchievements(): void {
    this.timeMachineAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
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
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
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

class AntiMatterCondenser extends Structure {
  public antimatterCondenserUpgrades1: { [key: string]: UpgradeType } = {
    1: {
      id: 1,
      name: "Sugar bosons",
      cost: {
        cookies: 1_700_000_000_000_000,
      },
      multiplier: 2,
      requirement: 1,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Plain",
    },
    2: {
      id: 2,
      name: "String theory",
      cost: {
        cookies: 8_500_000_000_000_000,
      },
      multiplier: 2,
      requirement: 5,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Berrylium",
    },
    3: {
      id: 3,
      name: "Large macaron collider",
      cost: { cookies: 85_000_000_000_000_000 },
      multiplier: 2,
      requirement: 25,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Blueberrylium",
    },
    4: {
      id: 4,
      name: "Big bang bake",
      cost: { cookies: 8_500_000_000_000_000_000 },
      multiplier: 2,
      requirement: 50,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Chalcedhoney",
    },
    5: {
      id: 5,
      name: "Reverse cyclotrons",
      cost: { cookies: 850_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 100,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Buttergold",
    },
    6: {
      id: 6,
      name: "Nanocosmics",
      cost: { cookies: 85_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 150,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Sugarmuck",
    },
    7: {
      id: 7,
      name: "The Pulse",
      cost: { cookies: 85_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 200,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Jetmint",
    },
    8: {
      id: 8,
      name: "Some other super-tiny fundamental particle? Probably?",
      cost: { cookies: 85_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 250,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Cherrysilver",
    },
    9: {
      id: 9,
      name: "Quantum comb",
      cost: { cookies: 85_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 300,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Hazelrald",
    },
    10: {
      id: 10,
      name: "Baking Nobel prize",
      cost: { cookies: 85_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 350,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Mooncandy",
    },
    11: {
      id: 11,
      name: "The definite molecule",
      cost: { cookies: 850_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 400,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Astrofudge",
    },
    12: {
      id: 12,
      name: "Flavor itself",
      cost: { cookies: 8_500_000_000_000_000_000_000_000_000_000_000_000_000 },
      multiplier: 2,
      requirement: 450,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Alabascream",
    },
    13: {
      id: 13,
      name: "Delicious pull",
      cost: {
        cookies: 85_000_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 500,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Iridyum",
    },
    14: {
      id: 14,
      name: "The chocolate nexus",
      cost: {
        cookies: 850_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 550,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Glucosmium",
    },
    15: {
      id: 15,
      name: "Candied atoms",
      cost: {
        cookies: 8_500_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000,
      },
      multiplier: 2,
      requirement: 600,
      acquired: false,
      type: "antimatterCondenser",
      description: `Antimatter condensers are twice as efficient.`,
      tier: "Glimmeringue",
    },
  };
  public antimatterCondenserUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(this.antimatterCondenserUpgrades1)
  );
  public antimatterCondenserAchievements: AchievementType[] = [
    ...AntiMatterCondenserAchievements,
  ];
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 170_000_000_000_000 },
      structureResourceGeneration: { cookies: 430_000_000 },
      structureResourceGenerationDefault: { cookies: 430_000_000 },

      structureCostDefault: { cookies: 170_000_000_000_000 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.antimatterCondenserAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.antimatterCondenserUpgrades.forEach((upgrade) => {
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
    const upgrade = this.antimatterCondenserUpgrades.get(id.toString());
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
    this.antimatterCondenserUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.antimatterCondenserUpgrades
      .get(id.toString())
      ?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.antimatterCondenserUpgrades.get(id.toString());
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

class Prism extends Structure {
  public prismUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(PrismUpgrades)
  );
  public prismAchievements: AchievementType[] = [...PrismAchievements];
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 2.1e15 },
      structureResourceGeneration: { cookies: 2_900_000_000 },
      structureResourceGenerationDefault: { cookies: 2_900_000_000 },

      structureCostDefault: { cookies: 2.1e15 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.prismAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.prismUpgrades.forEach((upgrade) => {
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
    const upgrade = this.prismUpgrades.get(id.toString());
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
    this.prismUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.prismUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.prismUpgrades.get(id.toString());
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

class ChanceMaker extends Structure {
  public chanceMakerUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(ChanceMakersUpgrades)
  );
  public chanceMakerAchievements: AchievementType[] = [
    ...ChanceMakerAchievements,
  ];
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 26e15 },
      structureResourceGeneration: { cookies: 21_000_000_000 },
      structureResourceGenerationDefault: { cookies: 21_000_000_000 },

      structureCostDefault: { cookies: 26e15 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.chanceMakerAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.chanceMakerUpgrades.forEach((upgrade) => {
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
    const upgrade = this.chanceMakerUpgrades.get(id.toString());
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
    this.chanceMakerUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.chanceMakerUpgrades
      .get(id.toString())
      ?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.chanceMakerUpgrades.get(id.toString());
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

class FractalEngine extends Structure {
  public fractalEngineUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(FractalEngineUpgrades)
  );
  public fractalEngineAchievements: AchievementType[] = [
    ...FractalEngineAchievements,
  ];
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 310e15 },
      structureResourceGeneration: { cookies: 150_000_000_000 },
      structureResourceGenerationDefault: { cookies: 150_000_000_000 },

      structureCostDefault: { cookies: 310e15 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.fractalEngineAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.fractalEngineUpgrades.forEach((upgrade) => {
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
    const upgrade = this.fractalEngineUpgrades.get(id.toString());
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
    this.fractalEngineUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.fractalEngineUpgrades
      .get(id.toString())
      ?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.fractalEngineUpgrades.get(id.toString());
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

class JavaScriptConsole extends Structure {
  public javascriptConsoleUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(JavaScriptConsoleUpgrades)
  );
  public javascriptConsoleAchievements: AchievementType[] = [
    ...JavascriptConsoleAchievement,
  ];
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 7.1e19 },
      structureResourceGeneration: { cookies: 1_100_000_000_000 },
      structureResourceGenerationDefault: { cookies: 1_100_000_000_000 },

      structureCostDefault: { cookies: 7.1e19 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.javascriptConsoleAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.javascriptConsoleUpgrades.forEach((upgrade) => {
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
    const upgrade = this.javascriptConsoleUpgrades.get(id.toString());
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
    this.javascriptConsoleUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.javascriptConsoleUpgrades
      .get(id.toString())
      ?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.javascriptConsoleUpgrades.get(id.toString());
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

class CortexBaker extends Structure {
  public cortexBakerUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(CortexBakerUpgrades)
  );
  public cortexBakerAchievements: AchievementType[] = [
    ...CortexBakerAchievements,
  ];
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 1.9e24 },
      structureResourceGeneration: { cookies: 64_000_000_000_000 },
      structureResourceGenerationDefault: { cookies: 64_000_000_000_000 },

      structureCostDefault: { cookies: 1.9e24 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.cortexBakerAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.cortexBakerUpgrades.forEach((upgrade) => {
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
    const upgrade = this.cortexBakerUpgrades.get(id.toString());
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
    this.cortexBakerUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.cortexBakerUpgrades
      .get(id.toString())
      ?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.cortexBakerUpgrades.get(id.toString());
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

class IdleVerse extends Structure {
  public idleVerse: Map<string, UpgradeType> = new Map(
    Object.entries(IdleverseUpgrades)
  );
  public idleVerseAchievements: AchievementType[] = [...IdleVerseAchievements];
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 1.2e21 },
      structureResourceGeneration: { cookies: 8_300_000_000_000 },
      structureResourceGenerationDefault: { cookies: 8_300_000_000_000 },

      structureCostDefault: { cookies: 1.2e21 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.idleVerseAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.idleVerse.forEach((upgrade) => {
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
    const upgrade = this.idleVerse.get(id.toString());
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
    this.idleVerse.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.idleVerse.get(id.toString())?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.idleVerse.get(id.toString());
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

class You extends Structure {
  public youUpgrades: Map<string, UpgradeType> = new Map(
    Object.entries(YouUpgrades)
  );
  public youAchievements: AchievementType[] = [...YouAchievements];
  private game: Clicker;
  constructor(game: Clicker) {
    super({
      structure: 0,
      structureCost: { cookies: 540e24 },
      structureResourceGeneration: { cookies: 510_000_000_000_000 },
      structureResourceGenerationDefault: { cookies: 510_000_000_000_000 },

      structureCostDefault: { cookies: 540e24 },
    });
    this.game = game;
  }
  public checkAchievements(): void {
    this.youAchievements.forEach((value) => {
      if (
        this.getStructureAmount() >= value.condition &&
        !value.acquired &&
        value.achievementType === "Having"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      } else if (
        this.lifeTimeCookiesBuilding.cookies >= value.condition &&
        !value.acquired &&
        value.achievementType === "Baking"
      ) {
        value.acquired = true;
        this.game.toast(value.name);
      }
    });
  }
  public getUpgradesInRange(): UpgradeType[] {
    const upgrades: UpgradeType[] = [];
    this.youUpgrades.forEach((upgrade) => {
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
    const upgrade = this.youUpgrades.get(id.toString());
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
    this.youUpgrades.forEach((value, key) => {
      if (value.acquired) {
        this.structureResourceGeneration.cookies *= value.multiplier;
      }
    });
  }
  public getStructureUpgradeCost(id: number): string {
    return this.youUpgrades.get(id.toString())?.cost.cookies.toString()!;
  }
  public getBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies *
        this.structure *
        this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public getSingleBuildingCPS(): number {
    return (
      ((this.structureResourceGeneration.cookies * this.game.multiplier) /
        100) *
      this.game.milkMultiplier
    );
  }
  public canBuyStructureUpgrade(cookies: Resource, id: number): boolean {
    const nextUpgrade = this.youUpgrades.get(id.toString());
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
