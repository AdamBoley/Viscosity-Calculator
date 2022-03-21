/**document.addEventListener("DOMContentLoaded", function() {

    let options = document.getElementsByTagName('option')

    for(let option of options) {

        option.addEventListener('change', function(){

            if(this.getAttribute('data-type') === "suspended") {

                alert("you clicked suspended")

                document.getElementById('constants').innerHTML = `
                    <div id="constant-1-div">

                        <p id="constant-1">Constant:</p>
                        <input type="number" id="constant-1-input">

                    </div>`
            }
            else if(this.getAttribute('data-type') === "cross-arm") {

                alert("you clicked cross-arm")

                document.getElementById('constants').innerHTML = `
                    <div id="constant-1-div">

                        <p id="constant-1">Constant 1:</p>
                        <input type="number" id="constant-1-input">
                
                    </div>
                
                    <div id="constant-2-div">
                    
                        <p id="constant-2">Constant 2:</p>
                        <input type="number" id="constant-2-input">
                    
                    </div>`
            }
        
        })

    }
})*/
//Currently not working


function suspendedConstant() {
    let constant = document.getElementById("constants")

    constant.innerHTML = `
        <div id="constant-div">

            <p id="constant">Constant:</p>
            <input type="number" id="constant-input">

        </div>`

        let submit = document.getElementById("submit-div")

        submit.innerHTML = `<button type="submit" onclick="getValuesSuspended()" id="submit">calculate</button>`
}

function crossArmConstant() {

    let constants = document.getElementById("constants")

    constants.innerHTML = `
        <div id="constant-1-div">

            <p id="constant-1">Constant 1:</p>
            <input type="number" id="constant-1-input">
    
        </div>
    
        <div id="constant-2-div">
        
            <p id="constant-2">Constant 2:</p>
            <input type="number" id="constant-2-input">
        
        </div>`

        let submit = document.getElementById("submit-div")

        submit.innerHTML = `<button type="submit" onclick="getValuesCrossArm()" id="submit">calculate</button>`
}

function getValuesSuspended() {

    let time1 = parseFloat(document.getElementById('run-time-1').value);
    let time2 = parseFloat(document.getElementById('run-time-2').value);
    let viscConstant = parseFloat(document.getElementById('constant-input').value);

    console.log(time1);
    console.log(time2);
    console.log(viscConstant);

    calculateSuspended(time1, time2, viscConstant);
}

function calculateSuspended(runTime1, runTime2, constant) {

    let kv1 = runTime1 * constant;
    let kv2 = runTime2 * constant;

    document.getElementById('kinematic-viscosity-1').innerText = kv1;
    document.getElementById('kinematic-viscosity-2').innerText = kv2;

    console.log(kv1);
    console.log(kv1);
}

function getValuesCrossArm() {

    let time1 = parseFloat(document.getElementById('run-time-1').value);
    let time2 = parseFloat(document.getElementById('run-time-2').value);
    let viscConstant1 = parseFloat(document.getElementById('constant-1-input').value);
    let viscConstant2 = parseFloat(document.getElementById('constant-2-input').value);

    calculateCrossArm(time1, time2, viscConstant1, viscConstant2);

}

function calculateCrossArm(runTime1, runTime2, constant1, constant2) {

    let kv1 = runTime1 * constant1;
    let kv2 = runTime2 * constant2;

    document.getElementById('kinematic-viscosity-1').innerText = kv1;
    document.getElementById('kinematic-viscosity-2').innerText = kv2;    

}