import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";

const welcome = chalkAnimation.rainbow(
  "Welcome to The Hub. Please select an option:"
);

export default async () => {
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
      console.log(selection);
      switch (selection) {
        case "Hue":
          console.log("HUE");
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
