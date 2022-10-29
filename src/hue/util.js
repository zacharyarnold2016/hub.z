import inquirer from "inquirer";
import fetch from 'node-fetch';

const connect = async () => {
    let response = await fetch("https://discovery.meethue.com")
    const data = await response.json()
    const { internalipaddress } = data[0]
    console.log(internalipaddress);
    inquirer.prompt([{
        name: "device",
        message: "Please input a desired device name"
    }]).then(({ device }) => {
        console.log(device);
        inquirer.prompt([{
            message: "Press Hue Link button. Then Press Enter"
        }]).then(async () => {
            response = await fetch(`https://${internalipaddress}/debug/clip.html`)
            const data = await response.json();
            const {username} = data.success;
        })
    })
}

export default connect;