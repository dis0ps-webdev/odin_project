import layout from "../css/layout.global.css";
import typography from "../css/typography.global.css";
import * as helpers from "../helpers/ComponentHelpers.js";
import * as config from "../config/ComponentConfig.js";

helpers.addNavigation(config.ourLogo, config.navLinks);
helpers.addImage(config.ourLogo, "Cask n Grill Logo", "50%");

let welcomeMessage =  "Welcome to the Cask n' Grill restaurant.  We aim to provide the freshest ingredients, prepared simply and honestly.  We believe the simplest preparations are the best, whether it's fine foods or fine spirits.  When you're here, you're home."

helpers.addTextBlock(welcomeMessage, "#ffffff");

helpers.addTitle("Hours of Operation", "#ffffff");

let hoursOfOperation = `Tuesday - Saturday: 4:00 PM - 10:00 PM <br/> Sunday, Monday: Closed`

helpers.addTextBlock(hoursOfOperation, "#ffffff");