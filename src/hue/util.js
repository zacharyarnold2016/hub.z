import inquirer from "inquirer";
import dotenv from "dotenv";
import { writeFile } from "fs";
import { hostname } from "os";

const connect = async () => {
  dotenv.config();
  if (!process.env.HUEUSER) {
    const { appName } = await inquirer.prompt({
      name: "appName",
      message:
        "Please input your app name, press the hue link button, and then enter",
    });

    const deviceName = hostname();

    const { username, clientkey } = await discoverAndCreateUser(
      appName,
      deviceName
    );

    const loggedUser = `HUEUSER=${username}`;
    writeFile(".env", loggedUser, () => {
      console.log(loggedUser);
    });
  } else {
    console.log("You already have a username assigned to this app.");
  }
};

export default connect;
