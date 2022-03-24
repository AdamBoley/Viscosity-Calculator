let ubbelohdeButton = document.getElementById('ubbelohde-button')
let zeitfuchsButton = document.getElementById('zeitfuchs-button')

ubbelohdeButton.addEventListener('click', ubbelohdeConstant)
zeitfuchsButton.addEventListener('click', zeitfuchsConstant)

//Suspended flow Viscometer / Ubbelohde viscometer logic
function ubbelohdeConstant() {
    let constant = document.getElementById("constants")

    constant.innerHTML = `
        <div id="constant-div">

            <p id="constant">Constant:</p>
            <input type="number" id="constant-input">

        </div>`

        let submit = document.getElementById("submit-div")

        submit.innerHTML = `<button type="submit" onclick=getValuesUbbelohde() id="submit-ubbelohde">calculate</button>`
        //Breaks from convention by using event listener in the html code, but using it with an event listener in the JS file doesn't seem to work
}
//

//let getValuesUbbelohdeButton = document.getElementById('submit-ubbelohde')

//getValuesUbbelohdeButton.addEventListener('click', getValuesUbbelohde)


function getValuesUbbelohde() {

    let time1 = parseFloat(document.getElementById('run-time-1').value);
    let time2 = parseFloat(document.getElementById('run-time-2').value);
    let viscConstant = parseFloat(document.getElementById('constant-input').value);

    console.log(`run time 1 is ${time1}`);
    console.log(`run time 2 is ${time2}`);
    console.log(`the viscometer constant is ${viscConstant}`);

    calculateUbbelohde(time1, time2, viscConstant);
}

function calculateUbbelohde(runTime1, runTime2, constant) {

    let kv1 = runTime1 * constant;
    let kv2 = runTime2 * constant;

    let preciseKv1 = kv1.toPrecision(4)
    let preciseKv2 = kv2.toPrecision(4)

    document.getElementById('kinematic-viscosity-1').innerText = preciseKv1;
    document.getElementById('kinematic-viscosity-2').innerText = preciseKv2;

    console.log(`kinematic viscosity 1 is ${kv1}`);
    console.log(`kinematic viscosity 2 is ${kv2}`);
    console.log(`kinematic viscosity 1 to 4 sig figs is ${preciseKv1}`);
    console.log(`kinematic viscosity 2 to 4 sig figs is ${preciseKv2}`);

    getValuesFinalUbbelohde()

}

function getValuesFinalUbbelohde() {

    let kv1 = parseFloat(document.getElementById('kinematic-viscosity-1').innerText)
    let kv2 = parseFloat(document.getElementById('kinematic-viscosity-2').innerText)

    console.log(`kinematic viscosity 1 is ${kv1}`);
    console.log(`kinematic viscosity 2 is ${kv2}`);


    calculateFinalUbbelohde(kv1, kv2)

}

function calculateFinalUbbelohde(kv1, kv2) {

    let finalViscosity = ((kv1 + kv2) / 2)

    console.log(`the final kinematic viscosity is ${finalViscosity}`)

    document.getElementById('final-calculated-viscosity').innerText = finalViscosity;

    determinabilityFactor(finalViscosity)
}

//Cross Arm viscomter / Zeitfuchs viscometer logic
function zeitfuchsConstant() {

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

        submit.innerHTML = `<button type="submit" onclick=getValuesZeitfuchs() id="submit-zeitfuchs">calculate</button>`//abstract out the onclick listener to the JS file fully
}
//

//let getValuesZeitfuchsButton = document.getElementById('submit-zeitfuchs')

//getValuesZeitfuchsButton.addEventListener('click', getValuesZeitfuchs)


function getValuesZeitfuchs() {

    let time1 = parseFloat(document.getElementById('run-time-1').value);
    let time2 = parseFloat(document.getElementById('run-time-2').value);
    let viscConstant1 = parseFloat(document.getElementById('constant-1-input').value);
    let viscConstant2 = parseFloat(document.getElementById('constant-2-input').value);

    console.log(`run time 1 is ${time1}`);
    console.log(`run time 2 is ${time2}`);
    console.log(`the viscometer constant is ${viscConstant1}`);
    console.log(`the viscometer constant is ${viscConstant2}`);

    calculateZeitfuchs(time1, time2, viscConstant1, viscConstant2)

}

function calculateZeitfuchs(runTime1, runTime2, constant1, constant2) {

    let kv1 = runTime1 * constant1;
    let kv2 = runTime2 * constant2;

    let preciseKv1 = kv1.toPrecision(4)
    let preciseKv2 = kv2.toPrecision(4)

    document.getElementById('kinematic-viscosity-1').innerText = preciseKv1;
    document.getElementById('kinematic-viscosity-2').innerText = preciseKv2; 
    
    console.log(`kinematic viscosity 1 is ${kv1}`);
    console.log(`kinematic viscosity 2 is ${kv2}`);
    console.log(`kinematic viscosity 1 to 4 sig figs is ${preciseKv1}`);
    console.log(`kinematic viscosity 2 to 4 sig figs is ${preciseKv2}`);

    getValuesFinalZeitfuchs()

}

function getValuesFinalZeitfuchs() {

    let kv1 = parseFloat(document.getElementById('kinematic-viscosity-1').innerText)
    let kv2 = parseFloat(document.getElementById('kinematic-viscosity-2').innerText)

    calculateFinalZeitfuchs(kv1, kv2)
}

function calculateFinalZeitfuchs(kv1, kv2) {

    let finalViscosity = ((kv1 + kv2) / 2)

    console.log(`the final kinematic viscosity is ${finalViscosity}`)

    document.getElementById('final-calculated-viscosity').innerText = finalViscosity

    determinabilityFactor(finalViscosity)
}

let sampleType = document.getElementById('sample-type')

sampleType.addEventListener('change', displayDeterminabilityFactor)

function displayDeterminabilityFactor() {

    let select = document.getElementById('sample-type')

    if(select.value === '0.0037') {

        let message = '0.0037 x final calculated viscosity, or 0.37%'
        document.getElementById('determinability-equation').innerText = message
        console.log(message)
    }

    else if (select.value === '0.0036') {

        let message = '0.0036 x Final calculated viscosity, or 0.36%'
        document.getElementById('determinability-equation').innerText = message
        console.log(message)
    }

    else if (select.value === '0.0150') {

        let message = '0.0150 x Final calculated viscosity, or 1.5%'
        document.getElementById('determinability-equation').innerText = message
        console.log(message)
    }

    else if (select.value === '0.0080') {

        let message = '0.0080 x Final calculated viscosity, or 0.80%'
        document.getElementById('determinability-equation').innerText = message
        console.log(message)
    }

    else if (select.value === '0.0244') {

        let message = '0.0244 x Final calculated viscosity, or 2.44%'
        document.getElementById('determinability-equation').innerText = message
        console.log(message)
    }

    else if (select.value === '0.0300') {

        let message = '0.03 x Final calculated viscosity, or 3%'
        document.getElementById('determinability-equation').innerText = message
        console.log(message)
    }

    else if (select.value === '0.00106^1.1') {

        let message = '(Final calculated viscosity ^ 1.1) x 0.00106' //use a span and vertical alignment to display the power as a superscripted value here?
        document.getElementById('determinability-equation').innerText = message
        console.log(message)
    }

    else if (select.value === '0.0013(y+1)') {

        let message = '(Final calculated viscosity + 1) x 0.0013'
        document.getElementById('determinability-equation').innerText = message
        console.log(message)
    }

    else if (select.value === '0.007608') {

        let message = '0.007608 x Final calculated viscosity, or 0.7608%'
        document.getElementById('determinability-equation').innerText = message
        console.log(message)
    }

    else {//should never trigger, but included as a failsafe

        let message = 'invalid determinability equation'
        document.getElementById('determinability-equation').innerText = message
        console.log(message)
    }

}
//DRY - the building blocks of each conditional statement are the same, so build the message out of variables using string concatenation

sampleType.addEventListener('change', determinabilityFactor)

function determinabilityFactor(finalViscosity) {

    let select = document.getElementById('sample-type')

    if(select.value === '0.0037') {

        let determinability = finalViscosity * 0.0037
        console.log(`${finalViscosity} x 0.0037 = `, determinability)
        document.getElementById('determinability-factor').innerText = determinability
    }

    else if (select.value === '0.0036') {

        let determinability = finalViscosity * 0.0036
        console.log(`${finalViscosity} x 0.0036 = `, determinability)
        document.getElementById('determinability-factor').innerText = determinability
    }

    else if (select.value === '0.0150') {

        let determinability = finalViscosity * 0.0150
        console.log(`${finalViscosity} x 0.0150 = `, determinability)
        document.getElementById('determinability-factor').innerText = determinability
    }

    else if (select.value === '0.0080') {

        let determinability = finalViscosity * 0.0080
        console.log(`${finalViscosity} x 0.0080 = `, determinability)
        document.getElementById('determinability-factor').innerText = determinability
    }

    else if (select.value === '0.0244') {

        let determinability = finalViscosity * 0.0244
        console.log(`${finalViscosity} x 0.0244 = `, determinability)
        document.getElementById('determinability-factor').innerText = determinability
    }

    else if (select.value === '0.0300') {

        let determinability = finalViscosity * 0.03
        console.log(`${finalViscosity} x 0.03 = `, determinability)
        document.getElementById('determinability-factor').innerText = determinability
    }

    else if (select.value === '0.00106^1.1') {

        let determinability = (finalViscosity ** 1.1) * 0.00106//use a span and vertical alignment to display the power as a superscripted value here?
        console.log(`(${finalViscosity} ^1.1) x 0.00106 = `, determinability)
        document.getElementById('determinability-factor').innerText = determinability
    }

    else if (select.value === '0.0013(y+1)') {

        let determinability = (finalViscosity + 1) * 0.0013
        console.log(`(${finalViscosity} + 1) x 0.0013 = `, determinability)
        document.getElementById('determinability-factor').innerText = determinability
    }

    else if (select.value === '0.007608') {

        let determinability = finalViscosity * 0.007608
        console.log(`${finalViscosity} x 0.007608 = `, determinability)
        document.getElementById('determinability-factor').innerText = determinability
    }

    else {//should never trigger, but included as a failsafe

        let message = 'invalid determinability equation'
        document.getElementById('determinability-equation').innerText = message
        console.log(message)
    }

    upperLimit()
    lowerLimit()
}

function upperLimit() {

    let finalViscosity = parseFloat(document.getElementById('final-calculated-viscosity').innerText)
    let determinabilityFactor = parseFloat(document.getElementById('determinability-factor').innerText)

    let upperAllowedViscosity = finalViscosity + determinabilityFactor

    document.getElementById('upper-limit').innerText = upperAllowedViscosity

    console.log(`The upper allowed viscosity is ${upperAllowedViscosity}`)

}

function lowerLimit() {

    let finalViscosity = parseFloat(document.getElementById('final-calculated-viscosity').innerText)
    let determinabilityFactor = parseFloat(document.getElementById('determinability-factor').innerText)

    let lowerAllowedViscosity = finalViscosity - determinabilityFactor

    document.getElementById('lower-limit').innerText = lowerAllowedViscosity

    console.log(`The lower allowed viscosity is ${lowerAllowedViscosity}`)

    checker()
}

function checker() {

    let viscosity1 = parseFloat(document.getElementById('kinematic-viscosity-1').innerText)
    let viscosity2 = parseFloat(document.getElementById('kinematic-viscosity-2').innerText)
    let upperAllowedViscosity = parseFloat(document.getElementById('upper-limit').innerText)
    let lowerAllowedViscosity = parseFloat(document.getElementById('lower-limit').innerText)

    if(viscosity1 > lowerAllowedViscosity && viscosity1 < upperAllowedViscosity && viscosity2 > lowerAllowedViscosity && viscosity2 < upperAllowedViscosity) {

        document.getElementById('output').innerText = "Your viscosities fall within the defined limits"
    }

    else {
        document.getElementById('output').innerText = "Your viscosities do not fall within the defined limits"
    }

}





//Do I want to use the outputs of the toPrecision method in the final calculations? There are edge cases where I round my number throughout the process and come out with a 
//slightly different value to what GLIMS calculates, because GLIMS presumably doesn't round. 
//Alternatively, the entire point is to calculate and display values at each step of the process
//display both?

//to try - use onKeyUp event handler to count 5 or 6 key presses for the run-time number inputs - https://stackoverflow.com/questions/22086823/limit-number-of-characters-in-input-type-number 
//Later - add some logic to determine if the viscometer type button matches the option selected. If not, prompt the user

//onchange event listener works! - perhaps refactor to use the code at the top