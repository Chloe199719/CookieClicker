import { UpgradeType } from "../Cliker2";

export const KittensUpgrades: UpgradeType[] = [
  {
    id: 999,
    name: "Kitten helpers",
    description: "You gain more CpS the more milk you have.",
    cost: {
      cookies: 9_000_000,
    },
    multiplier: 0.1,
    type: "kittens",
    acquired: false,
    requirement: 13,
    tier: "Plain",
  },
];
