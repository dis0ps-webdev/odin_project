import { PageAbout } from "../pages/PageAbout.js";
import { PageMenu } from "../pages/PageMenu.js";
import { PageVisit } from "../pages/PageVisit.js";

export const containerDiv = document.querySelector("#container");

export const routeMapping = {
  "#about": PageAbout,
  "#menu": PageMenu,
  "#visit": PageVisit,
};

export const ourLogo = "images/cask_n_grill.png";

export const navLinks = {
  about: "#about",
  menu: "#menu",
  visit: "#visit",
};

export const slideShowImages = [
  "images/appetizer-bread.jpg",
  "images/appetizer-fries.jpg",
  "images/appetizer-goat-satay.jpg",
  "images/appetizer-charcuterie.jpg",
  "images/appetizer-salad.jpg",
  "images/bar-blantons.jpg",
  "images/bar-glenfiddich.jpg",
  "images/bar-glenrothes.jpg",
  "images/dessert-chocolates.jpg",
  "images/dessert-pannacotta.jpg",
  "images/dessert-tiramisu.jpg",
  "images/entree-beef-wellington.jpg",
  "images/entree-ribs.jpg",
  "images/entree-sausage.jpg",
  "images/entree-steak.jpg",
];

export const ourMenu = {
  bourbons: [
    {
      name: "Blanton's Single Barrel",
      price: "18",
      description:
        "A deep, satisfying nose of nutmeg and spices. Powerful dry vanilla notes in harmony with hints of honey amid strong caramel and corn. A medium finish composed of returning corn and nutmeg flavors.",
    },
  ],
  scotches: [
    {
      name: "Glenfiddich 12 Year Single Malt",
      price: "6",
      description: "Good starter Scotch for those curious.  Green apples, white wine vinegar and caramel provide an inoffensive arrival. Barley drops bring sweetness alongside shortbread with lemon peel and a gentle vanilla caress. Cotton sheets and unsalted peanuts round off an ok presentation. Water reveals honey, a floral note and more oaky characteristics.",
    },
    {
      name: "Lagavulin 11 Year Old Nick Offerman Edition",
      price: "10",
      description: "The flavor profile is the perfect Islay with beach campfire, salted caramels, dutch apple pie, dark chocolate, and cigars.   The finish is dry with interesting notes of Grand Marnier and peat. ",
    },
  ],
  appetizers: [
    {
      name: "Truffle Fries",
      price: "10",
      description:
        "Thin cut potato, shave parmesan and parsley, finished in truffle oil.",
    },
    {
      name: "Goat Satay",
      price: "15",
      description: "Locally sourced goat grilled over coals, served with a spicy chili peanut sauce."
    },
  ],
  entrees: [
    {
      name: "Beef Wellington",
      price: "32",
      description: "Grass-fed filet mignon, coated in a mushroom pate, and wrapped in house made puff pastry.  Served with seasonal vegetables and garlic mashed potatoes.",
    },
    {
      name: "Slow Smoked Ribs",
      price: "24",
      description: "Full rack of ribs, dry rubbed with our secret mix of herbs and spices, and smoked with Applewood for eight hours.  Served with cole slaw and corn fritters."
    },
  ],
  dessert: [
    {
      name: "Pumpkin Spice Coffee Pannacotta",
      price: "10",
      description: "Coffee infused pannacotta with cinnamon, nutmeg and ginger, and drizzled with caramel.",
    },
    {
      name: "Coconut Chai Tiramisu",
      price: "15",
      description: "Chai tea lady fingers, layered in Marscapone cheese, topped with coconut shavings and chocolate.",
    },
  ],
};
