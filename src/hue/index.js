import inquirer from "inquirer";
import { connect, changeLights } from "./util.js";
import { writeFile } from "fs";

const hueInterface = async () => {
  console.clear();
  const { selection } = await inquirer.prompt([
    {
      type: "list",
      name: "selection",
      message: "What About the Lights?",
      choices: ["Change", "On", "Off", "Init"],
    },
  ]);
  switch (selection) {
    case "Change":
      console.log("Change");
      break;
    case "On":
      changeLights(1);
      break;
    case "Off":
      console.log("Off");
      break;
    case "Init":
      connect();
      break;
  }
};

export default hueInterface;
