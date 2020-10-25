import layout from "../css/layout.global.css";
import typography from "../css/typography.global.css";
import * as helpers from "../helpers/ComponentHelpers.js";
import * as config from "../config/ComponentConfig.js";

helpers.addNavigation(config.ourLogo, config.navLinks);
helpers.addTitle("Our Menu", "#ffffff");
helpers.addSlideshow(8, config.slideShowImages);
helpers.addFoodMenu(config.ourMenu);




