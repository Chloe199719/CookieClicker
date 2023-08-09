import { UpgradeType } from "../Cliker2";

const FlavoredCookies: UpgradeType[] = [
  {
    id: 180,
    name: "Plain Cookies",
    description: "Plain cookies are the best cookies",
    cost: { cookies: 1_000_000 },
    requirement: 50_000,
    acquired: false,
    multiplier: 1,
    type: "flavoredCookies",
  },
  {
    id: 181,
    name: "Sugar Cookies",
    description: "Sugar cookies are the best cookies",
    cost: { cookies: 5_000_000 },
    requirement: 250_000,
    acquired: false,
    multiplier: 1,
    type: "flavoredCookies",
  },
];

export default FlavoredCookies;
