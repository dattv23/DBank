import {DBank} from "../../declarations/DBank";

window.addEventListener("load", async function () {
    // console.log("Finished loading!");
    update();
});

document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const button = event.target.querySelector("#submit-btn");

    const inputAmout = parseFloat(document.getElementById("input-amount").value);
    const outputAmout =parseFloat(document.getElementById("withdrawal-amount").value);

    button.setAttribute("disabled", true);
    
    if (document.getElementById("input-amount").value.length != 0) {
        await DBank.topUp(inputAmout);
        document.getElementById("input-amount").value = "";
    }

    if (document.getElementById("withdrawal-amount").value.length != 0) {
        await DBank.withDraw(outputAmout);
        document.getElementById("withdrawal-amount").value = "";
    }

    await DBank.compound();

    update();

    button.removeAttribute("disabled");
});

async function update() {
    const currentAmount = await DBank.getBalance();
    document.getElementById("value").innerHTML = currentAmount.toFixed(2);
}