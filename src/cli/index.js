import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import hueInterface from "../hue/index.js";
import dotenv from "dotenv";

dotenv.config();
const user = process.env.CLIUSER;
let welcome;

if (!user) {
  welcome = chalkAnimation.rainbow(
    "Welcome to The Hub. Please select an option:"
  );
} else {
  welcome = chalkAnimation.rainbow(`Hello ${user}, please select an option:`);
}

export default async () => {
  console.clear();
  welcome.start();
  await delay(1000);
  welcome.stop();
  inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        message: "What do you want to do?",
        choices: ["Hue", "Music", "Alexa", "UI", "Config"],
      },
    ])
    .then(({ selection }) => {
      switch (selection) {
        case "Hue":
          hueInterface();
          break;
        case "Music":
          console.log("Music");
          break;
        case "Alexa":
          console.log("Alexa");
          break;
        case "UI":
          console.log("UI");
          break;
        case "Config":
          console.log("Config");
          break;
      }
    });
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
