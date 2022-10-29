import inquirer from "inquirer"
import connect from "./util.js"

const hueInterface = () => {
    console.clear()
    return (
        inquirer.prompt([
            {
                type: "list",
                name: "selection",
                message: "What About the Lights?",
                choices: ["Change", "On", "Off", "Init"],
            },
        ]).then(({ selection }) => {
            switch (selection) {
                case "Change":
                    console.log("Change");
                    break;
                case "On":
                    console.log("On");
                    break;
                case "Off":
                    console.log("Off");
                    break;
                case "Init":
                    connect()
                    break;
            }
        }))
}

export default hueInterface;