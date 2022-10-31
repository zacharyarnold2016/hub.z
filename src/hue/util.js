import inquirer from "inquirer";
import dotenv from "dotenv";
import { writeFile } from "fs";
import { hostname } from "os";
import { v3 } from "node-hue-api";
import discoverAndCreateUser from "./discovery.js";

const { discovery, api, lightStates } = v3;
const { LightState } = lightStates;
// const username = process.env.HUEUSER;
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
  discovery
    .nupnpSearch()
    .then(async (searchResults) => {
      const { ipaddress } = searchResults[0];
      console.log(await api.createLocal(ipaddress).connect(username));
      return api.createLocal(ipaddress).connect(username);
    })
    .then(async (api) => {
      const state = new LightState().on().ct(200).brightness(100);
      console.log(state);

      await api.lights.setLightState(1, state);
    })
    .then((result) => {
      console.log(`Light state change was successful? ${result}`);
    });
};

export { connect, changeLights };
