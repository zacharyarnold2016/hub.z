import inquirer from "inquirer";
import dotenv from "dotenv";
import { writeFile } from "fs";
import { hostname } from "os";
import { v3 } from "node-hue-api";
import discoverAndCreateUser from "./discovery.js";

const { discovery, api, lightStates } = v3;
const { LightState } = lightStates;
const username = process.env.HUEUSER;

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

const changeLights = async (light = 1) => {
  dotenv.config();

  const USERNAME = "J7-xoLQkRvxa1oTiz7gpxue0SzyxJIRUhtzLFZwZ",
    // The name of the light we wish to retrieve by name
    LIGHT_ID = 1;
};

const getIp = async () => {};

export { connect, changeLights };
