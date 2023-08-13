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
    tier: "None",
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
    tier: "None",
  },
  {
    id: 182,
    name: "Oatmeal raisin Cookies",
    description: "Oatmeal raisin cookies are the best cookies",
    cost: { cookies: 10_000_000 },
    requirement: 500_000,
    acquired: false,
    multiplier: 1,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 183,
    name: "Peanut butter Cookies",
    description: "Peanut butter cookies are the best cookies",
    cost: { cookies: 50_000_000 },
    requirement: 2_500_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 184,
    name: "Coconut cookies",
    description: "Flaky, but not unreliable. Some people go crazy for these.",
    cost: { cookies: 100_000_000 },
    requirement: 5_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 185,
    name: "Macadamia nut cookies",
    description: "They're macadamn delicious!",
    cost: { cookies: 100_000_000 },
    requirement: 5_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 186,
    name: "Almond cookies",
    description: "Sometimes you feel like one of these. Sometimes you don't",
    cost: { cookies: 100_000_000 },
    requirement: 5_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 187,
    name: "Hazelnut cookies",
    description:
      "Tastes like a morning stroll through a fragrant forest, minus the clouds of gnats.",
    cost: { cookies: 100_000_000 },
    requirement: 5_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 188,
    name: "Walnut cookies",
    description:
      "Some experts have pointed to the walnut's eerie resemblance to the human brain as a sign of its sentience - a theory most walnuts vehemently object to.",
    cost: { cookies: 100_000_000 },
    requirement: 5_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 189,
    name: "Cashew cookies",
    description:
      "Let me tell you about cashews. Cashews are not nuts, but seeds that grow out of curious red or yellow fruits - which can be eaten on their own, or made into drinks. The shell around the nut itself contains a nasty substance that stains and irritates the hands of whoever handles it for too long. But that's okay, since now that you've read this you'll make sure it doesn't get into the cookies! Oh, you've already eaten how many? Okay then.",
    cost: { cookies: 100_000_000 },
    requirement: 5_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 190,
    name: "White chocolate cookies",
    description: `I know what you'll say. It's just cocoa butter! It's not real chocolate!
    Oh please.`,
    cost: { cookies: 500_000_000 },
    requirement: 25_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 191,
    name: "Milk chocolate cookies",
    description:
      "A strange inversion of chocolate milk. For those who are a little bit too hardcore for white chocolate, but not hardcore enough for dark.",
    cost: { cookies: 500_000_000 },
    requirement: 25_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 192,
    name: "Double-chip cookies",
    description: `DOUBLE THE CHIPS
    DOUBLE THE TASTY
    (double the calories)`,
    cost: { cookies: 5_000_000_000 },
    requirement: 250_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 193,
    name: "White chocolate macadamia nut cookies",
    description: "Chloe would love these.",
    cost: { cookies: 10_000_000_000 },
    requirement: 500_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 194,
    name: "All-chocolate cookies",
    description: `Chocolate chips, chocolate chunks, chocolate sprinkles, chocolate drizzle, chocolate powder, chocolate paste, chocolate dough, chocolate frosting, chocolate icing, chocolate batter, chocolate cookie, chocolate chocolate, chocolate chocolate chocolate, chocolate chocolate chocolate chocolate, chocolate chocolate chocolate chocolate chocolate, chocolate chocolate chocolate chocolate chocolate chocolate, chocolate chocolate chocolate chocolate chocolate chocolate chocolate, chocolate chocolate chocolate chocolate chocolate chocolate chocolate chocolate, chocolate chocolate chocolate chocolate chocolate chocolate chocolate chocolate chocolate, chocolate chocolate chocolate chocolate chocolat
    (chocolate)`,
    cost: { cookies: 50_000_000_000 },
    requirement: 2_500_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 195,
    name: "Dark chocolate-coated cookies",
    description:
      "These absorb light so well you almost need to squint to see them.",
    cost: { cookies: 100_000_000_000 },
    requirement: 5_000_000_000,
    acquired: false,
    multiplier: 5,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 196,
    name: "White chocolate-coated cookies",
    description: "These dazzling cookies absolutely glisten with flavor.",
    cost: { cookies: 100_000_000_000 },
    requirement: 5_000_000_000,
    acquired: false,
    multiplier: 5,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 197,
    name: "Eclipse cookies",
    description: "Look to the cookie.",
    cost: { cookies: 500_000_000_000 },
    requirement: 25_000_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 198,
    name: "Zebra cookies",
    description: "...",
    cost: { cookies: 1_000_000_000_000 },
    requirement: 50_000_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 199,
    name: "Snickerdoodles",
    description:
      "True to their name, these cookies are prone to chuckling and snorting when amused.",
    cost: { cookies: 5_000_000_000_000 },
    requirement: 250_000_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 200,
    name: "Stroopwafels",
    description: "if you can pronounce this, you deserve one.",
    cost: { cookies: 10_000_000_000_000 },
    requirement: 500_000_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 201,
    name: "Macaroons",
    description:
      "These are not macarons. These are macaroons. They are different. They are better. They are the best.",
    cost: { cookies: 50_000_000_000_000 },
    requirement: 2_500_000_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 202,
    name: "Empire biscuits",
    description: "For the glory of the empire!",
    cost: { cookies: 100_000_000_000_000 },
    requirement: 5_000_000_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 203,
    name: "Madeleines",
    description: "Unforgettable.",
    cost: { cookies: 500_000_000_000_000 },
    requirement: 25_000_000_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 204,
    name: "Palmiers",
    description: "Palmier then chloe.",
    cost: { cookies: 500_000_000_000_000 },
    requirement: 25_000_000_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 205,
    name: "Palets",
    description: "You could say these cookies are a little flat.",
    cost: { cookies: 1_000_000_000_000_000 },
    requirement: 50_000_000_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 206,
    name: "Sabl&eacute;s",
    description: "These cookies are a little sandy.",
    cost: { cookies: 1_000_000_000_000_000 },
    requirement: 50_000_000_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 207,
    name: "Gingerbread men",
    description: "You'd better eat them before they try to run away.",
    cost: { cookies: 10_000_000_000_000_000 },
    requirement: 500_000_000_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 208,
    name: "Gingerbread trees",
    description: "Evergreen.",
    cost: { cookies: 10_000_000_000_000_000 },
    requirement: 500_000_000_000_000,
    acquired: false,
    multiplier: 2,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 209,
    name: "Pure black chocolate cookies",
    description:
      "Dipped in the purest black chocolate, these cookies are so dark they absorb light around them.",
    cost: { cookies: 50_000_000_000_000_000 },
    requirement: 2_500_000_000_000_000,
    acquired: false,
    multiplier: 5,
    type: "flavoredCookies",
    tier: "None",
  },
  {
    id: 210,
    name: "Pure white chocolate cookies",
    description:
      "Dipped in the purest white chocolate, these cookies are so bright they reflect light around them.",
    cost: { cookies: 50_000_000_000_000_000 },
    requirement: 2_500_000_000_000_000,
    acquired: false,
    multiplier: 5,
    type: "flavoredCookies",
    tier: "None",
  },
];

export default FlavoredCookies;
