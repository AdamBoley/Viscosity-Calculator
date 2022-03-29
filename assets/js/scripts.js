//Calculation selector

let calculationSelector = document.getElementById('calculation-selector')

calculationSelector.addEventListener('change', selectCalculation)

function selectCalculation() {

    if(calculationSelector.value === 'determinability') {
        document.getElementById('determinability-calculations').style.display = 'block'
        document.getElementById('repeatability-calculations').style.display = 'none'
        document.getElementById('reproducibility-calculations').style.display = 'none'
        document.getElementById('viscometer-calibration').style.display = 'none'
        document.getElementById('viscometer-constant-recalibration').style.display = 'none'
    }
    else if(calculationSelector.value === 'repeatability') {
        document.getElementById('determinability-calculations').style.display = 'none'
        document.getElementById('repeatability-calculations').style.display = 'block'
        document.getElementById('reproducibility-calculations').style.display = 'none'
        document.getElementById('viscometer-calibration').style.display = 'none'
        document.getElementById('viscometer-constant-recalibration').style.display = 'none'
    }
    else if(calculationSelector.value === 'reproducibility') {
        document.getElementById('determinability-calculations').style.display = 'none'
        document.getElementById('repeatability-calculations').style.display = 'none'
        document.getElementById('reproducibility-calculations').style.display = 'block'
        document.getElementById('viscometer-calibration').style.display = 'none'
        document.getElementById('viscometer-constant-recalibration').style.display = 'none'
    }
    else if(calculationSelector.value === 'calibration') {
        document.getElementById('determinability-calculations').style.display = 'none'
        document.getElementById('repeatability-calculations').style.display = 'none'
        document.getElementById('reproducibility-calculations').style.display = 'none'
        document.getElementById('viscometer-calibration').style.display = 'block'
        document.getElementById('viscometer-constant-recalibration').style.display = 'none'
    }
    else if(calculationSelector.value === 'recalibration') {
        document.getElementById('determinability-calculations').style.display = 'none'
        document.getElementById('repeatability-calculations').style.display = 'none'
        document.getElementById('reproducibility-calculations').style.display = 'none'
        document.getElementById('viscometer-calibration').style.display = 'none'
        document.getElementById('viscometer-constant-recalibration').style.display = 'block'

    }
}


//Suspended flow Viscometer / Ubbelohde viscometer logic

let ubbelohdeButton = document.getElementById('ubbelohde-button')

ubbelohdeButton.addEventListener('click', ubbelohdeConstant)

function ubbelohdeConstant() {

    if(document.getElementById('constant-1-div').style.display !== 'none') {
        
        document.getElementById('constant-1-div').style.display = 'none'
        document.getElementById('constant-2-div').style.display = 'none'
        document.getElementById('submit-zeitfuchs').style.display = 'none'

        document.getElementById('constant-div').style.display = 'block'
        document.getElementById('submit-ubbelohde').style.display = 'block'
    }
    else {

        document.getElementById('constant-div').style.display = 'block'
        document.getElementById('submit-ubbelohde').style.display = 'block'
    }

    document.getElementById('run-time-1').focus()
}

let getValuesUbbelohdeButton = document.getElementById('submit-ubbelohde')

getValuesUbbelohdeButton.addEventListener('click', getValuesUbbelohde)

function getValuesUbbelohde() {

    let select = document.getElementById('sample-type') 

    if(select.value === 'disabled') {

        alert('Please select a sample type from the drop-down menu')
    }
    else {

        let time1 = parseFloat(document.getElementById('run-time-1').value);
        let time2 = parseFloat(document.getElementById('run-time-2').value);
        let viscConstant = parseFloat(document.getElementById('constant-input').value);

        console.log(`run time 1 is ${time1}`);
        console.log(`run time 2 is ${time2}`);
        console.log(`the viscometer constant is ${viscConstant}`);

        calculateUbbelohde(time1, time2, viscConstant);
    }
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
    console.log(`kinematic viscosity 1 to 4 significant figures is ${preciseKv1}`);
    console.log(`kinematic viscosity 2 to 4 significant figures is ${preciseKv2}`);

    calculateFinalUbbelohde(kv1, kv2)

}

function calculateFinalUbbelohde(kv1, kv2) {

    let finalViscosity = ((kv1 + kv2) / 2)
    let preciseFinalViscosity = finalViscosity.toPrecision(4)

    console.log(`the final kinematic viscosity is ${finalViscosity}`)
    console.log(`the final kinematic viscosity to 4 significant figures is ${preciseFinalViscosity}`)

    document.getElementById('final-calculated-viscosity').innerText = preciseFinalViscosity;

    determinability(finalViscosity, kv1, kv2)
}

//Cross Arm viscomter / Zeitfuchs viscometer logic

let zeitfuchsButton = document.getElementById('zeitfuchs-button')

zeitfuchsButton.addEventListener('click', zeitfuchsConstant)

function zeitfuchsConstant() {

    if(document.getElementById('constant-div').style.display !== 'none') {

        document.getElementById('constant-div').style.display = 'none'
        document.getElementById('submit-ubbelohde').style.display = 'none'

        document.getElementById('constant-1-div').style.display = 'block'
        document.getElementById('constant-2-div').style.display = 'block'
        document.getElementById('submit-zeitfuchs').style.display = 'block'
    }
    else {
        document.getElementById('constant-1-div').style.display = 'block'
        document.getElementById('constant-2-div').style.display = 'block'
        document.getElementById('submit-zeitfuchs').style.display = 'block'
    }

    document.getElementById('run-time-1').focus()
    
}

let getValuesZeitfuchsButton = document.getElementById('submit-zeitfuchs')

getValuesZeitfuchsButton.addEventListener('click', getValuesZeitfuchs)

function getValuesZeitfuchs() {

    let select = document.getElementById('sample-type')

    if(select.value === 'disabled') {
        alert('Please select a sample type from the drop down menu')
        return
    }
    else {

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
    console.log(`kinematic viscosity 1 to 4 significant figures is ${preciseKv1}`);
    console.log(`kinematic viscosity 2 to 4 significant figures is ${preciseKv2}`);

    calculateFinalZeitfuchs(kv1, kv2)

}

function calculateFinalZeitfuchs(kv1, kv2) {

    let finalViscosity = ((kv1 + kv2) / 2)
    let preciseFinalViscosity = finalViscosity.toPrecision(4)

    console.log(`the final kinematic viscosity is ${finalViscosity}`)
    console.log(`the final kinematic viscosity to 4 significant figures is ${preciseFinalViscosity}`)

    document.getElementById('final-calculated-viscosity').innerText = preciseFinalViscosity

    determinability(finalViscosity, kv1, kv2)

}

//Determinability

function determinability(finalViscosity, kv1, kv2) {

    let select = document.getElementById('sample-type')

    let message = ''
    let determinability
    let preciseDeterminability

    switch(true) {
        case select.value === 'BO40'|| select.value === 'FO40' || select.value === 'KD40':
            message = '0.0037 x final calculated viscosity, or 0.37%'
            determinability = finalViscosity * 0.0037
            preciseDeterminability = determinability.toPrecision(4)
            console.log('the determinability equation being used is', message)
            console.log(`the determinability factor is ${finalViscosity} x 0.0037 = ${determinability}`)
            break
        
        case select.value === 'BO100' || select.value === 'FO100':
            message = '0.0036 x Final calculated viscosity, or 0.36%'
            determinability = finalViscosity * 0.0037
            preciseDeterminability = determinability.toPrecision(4)
            console.log('the determinability equation being used is', message)
            console.log(`the determinability factor is ${finalViscosity} x 0.0036 = ${determinability}`)
            break

        case select.value === 'FO150':
            message = '0.0150 x Final calculated viscosity, or 1.5%'
            determinability = finalViscosity * 0.0150
            preciseDeterminability = determinability.toPrecision(4)
            console.log('the determinability equation being used is', message)
            console.log(`the determinability factor is ${finalViscosity} x 0.0150 = ${determinability}`)
            break
        
        case select.value === 'PW100':
            message = '0.0080 x Final calculated viscosity, or 0.80%'
            determinability = finalViscosity * 0.0080
            preciseDeterminability = determinability.toPrecision(4)
            console.log('the determinability equation being used is', message)
            console.log(`the determinability factor is ${finalViscosity} x 0.0080 = ${determinability}`)
            break

        case select.value === 'RFO50':
            message = '0.0244 x Final calculated viscosity, or 2.44%'
            determinability = finalViscosity * 0.0244
            preciseDeterminability = determinability.toPrecision(4)
            console.log('the determinability equation being used is', message)
            console.log(`the determinability factor is ${finalViscosity} x 0.0244 = ${determinability}`)
            break

        case select.value === 'RFO100' || select.value === 'CR':
            message = '0.03 x Final calculated viscosity, or 3%'
            determinability = finalViscosity * 0.03
            preciseDeterminability = determinability.toPrecision(4)
            console.log('the determinability equation being used is', message)
            console.log(`the determinability factor is ${finalViscosity} x 0.03 = ${determinability}`)
            break

        case select.value === 'ADD100':
            message = '(Final calculated viscosity ^ 1.1) x 0.00106'
            determinability = (finalViscosity ** 1.1) * 0.00106//use a span and vertical alignment to display the power as a superscripted value here?
            preciseDeterminability = determinability.toPrecision(4)
            console.log('the determinability equation being used is', message)
            console.log(`the determinability factor is (${finalViscosity} ^1.1) x 0.00106 = ${determinability}`)
            break

        case select.value === 'GO40':
            message = '(Final calculated viscosity + 1) x 0.0013'
            determinability = (finalViscosity + 1) * 0.0013
            preciseDeterminability = determinability.toPrecision(4)
            console.log('the determinability equation being used is', message)
            console.log(`the determinability factor is (${finalViscosity} + 1) x 0.0013 = ${determinability}`)
            break

        case select.value === 'JFM20':
            message = '0.007608 x Final calculated viscosity, or 0.7608%'
            determinability = finalViscosity * 0.007608
            preciseDeterminability = determinability.toPrecision(4)
            console.log('the determinability equation being used is', message)
            console.log(`the determinability factor is ${finalViscosity} x 0.007608 = ${determinability}`)
            break

    }

    document.getElementById('determinability-equation').innerText = message
    console.log(`the determinability factor to 4 significant figures is ${preciseDeterminability}`)
    document.getElementById('determinability-factor').innerText = preciseDeterminability

    upperLimit(determinability, finalViscosity, kv1, kv2)
    
}

function upperLimit(determinability, finalViscosity, kv1, kv2) {

    let upperAllowedViscosity = finalViscosity + determinability
    let preciseUpperAllowedViscosity = upperAllowedViscosity.toPrecision(4)

    document.getElementById('upper-limit').innerText = preciseUpperAllowedViscosity

    console.log(`The upper allowed viscosity is ${finalViscosity} + ${determinability} = ${preciseUpperAllowedViscosity}`)

    lowerLimit(determinability, finalViscosity, upperAllowedViscosity, kv1, kv2)
}

function lowerLimit(determinability, finalViscosity, upperAllowedViscosity, kv1, kv2) {

    let lowerAllowedViscosity = finalViscosity - determinability
    let preciseLowerAllowedViscosity = lowerAllowedViscosity.toPrecision(4)

    document.getElementById('lower-limit').innerText = preciseLowerAllowedViscosity

    console.log(`The lower allowed viscosity is ${finalViscosity} - ${determinability} = ${preciseLowerAllowedViscosity}`)

    checker(upperAllowedViscosity, lowerAllowedViscosity, kv1, kv2)
}

function checker(upperAllowedViscosity, lowerAllowedViscosity, kv1, kv2) {

    if(kv1 > lowerAllowedViscosity && kv1 < upperAllowedViscosity && kv2 > lowerAllowedViscosity && kv2 < upperAllowedViscosity) {

        document.getElementById('output').innerText = "Your viscosities fall within the defined limits"
    }

    else {
        document.getElementById('output').innerText = "Your viscosities do not fall within the defined limits"
    }

}


let resetButton = document.getElementById('reset')

resetButton.addEventListener('click', reset)

function reset() {

    document.getElementById('run-time-1').value = ''
    document.getElementById('run-time-2').value = ''
    document.getElementById('constant-input').value = ''
    document.getElementById('constant-1-input').value = ''
    document.getElementById('constant-2-input').value = ''

    document.getElementById('run-time-1').focus()

    document.getElementById('kinematic-viscosity-1').textContent = ''
    document.getElementById('kinematic-viscosity-2').textContent = ''
    document.getElementById('final-calculated-viscosity').textContent = ''
    document.getElementById('determinability-equation').textContent = ''
    document.getElementById('determinability-factor').textContent = ''
    document.getElementById('upper-limit').textContent = ''
    document.getElementById('lower-limit').textContent = ''
    document.getElementById('output').textContent = ''
}



//repeatability calculations

let repeatabilityButton = document.getElementById('submit-repeatability')

repeatabilityButton.addEventListener('click', averageViscosityRepeatability)

function averageViscosityRepeatability() {

    let select = document.getElementById('sample-type-repeatability')

    if(select.value === 'disabled') {
        alert('Please select a sample type from the drop-down menu')
    }
    else {
        let viscosity1 = parseFloat(document.getElementById('viscosity-repeatability-1').value)
        let viscosity2 = parseFloat(document.getElementById('viscosity-repeatability-2').value)

        let averageViscosity = ((viscosity1 + viscosity2) / 2)
        let preciseAverageViscosity = averageViscosity.toPrecision(4)

        console.log(`the average viscosity is ${averageViscosity}`)
        console.log(`the average viscosity to 4 significant figures is ${preciseAverageViscosity}`)

        document.getElementById('average-viscosity-repeatability').textContent = preciseAverageViscosity

        //displayRepeatabilityEquation()

        repeatability(viscosity1, viscosity2, averageViscosity)
    }

}

function repeatability(viscosity1, viscosity2, averageViscosity) {

    let select = document.getElementById('sample-type-repeatability')

    let message = ''
    let repeatability
    let preciseRepeatability

    switch(true) {

        case select.value === 'BO40':
            message = '0.0101 x average viscosity, or 1.01%'
            repeatability = averageViscosity * 0.0101
            preciseRepeatability = repeatability.toPrecision(4)
            console.log('the repeatability equation being used is', message)
            console.log(`the repeatability factor is ${averageViscosity} x 0.0101 = ${repeatability}`)
            break

        case select.value === 'BO100':
            message = '0.0085 x average viscosity, or 0.85%'
            repeatability = averageViscosity * 0.0085
            preciseRepeatability = repeatability.toPrecision(4)
            console.log('the repeatability equation being used is', message)
            console.log(`the repeatability factor is ${averageViscosity} x 0.0085 = ${repeatability}`)
            break

        case select.value === 'FO40':
            message = '0.0074 x average viscosity, or 0.74%'
            repeatability = averageViscosity * 0.0074
            preciseRepeatability = repeatability.toPrecision(4)
            console.log('the repeatability equation being used is', message)
            console.log(`the repeatability factor is ${averageViscosity} x 0.0074 = ${repeatability}`)
            break

        case select.value === 'FO100':
            message = '0.0084 x average viscosity, or 0.84%'
            repeatability = averageViscosity * 0.0084
            preciseRepeatability = repeatability.toPrecision(4)
            console.log('the repeatability equation being used is', message)
            console.log(`the repeatability factor is ${averageViscosity} x 0.0084 = ${repeatability}`)
            break

        case select.value === 'FO150' || select.value === 'KD40':
            message = '0.0056 x average viscosity, or 0.56%'
            repeatability = averageViscosity * 0.0056
            preciseRepeatability = repeatability.toPrecision(4)
            console.log('the repeatability equation being used is', message)
            console.log(`the repeatability factor is ${averageViscosity} x 0.0056 = ${repeatability}`)
            break
        
        case select.value === 'PW100':
            message = '0.0141 x (average viscosity ^ 1.2)'
            repeatability = (averageViscosity ** 1.2) * 0.0141
            preciseRepeatability = repeatability.toPrecision(4)
            console.log('the repeatability equation being used is', message)
            console.log(`the repeatability factor is (${averageViscosity} ^ 1.2) x 0.0141 = ${repeatability}`)
            break

        case select.value === 'RFO50':
            message = '0.07885 x average viscosity, or 7.88%'
            repeatability = averageViscosity * 0.07885
            preciseRepeatability = repeatability.toPrecision(4)
            console.log('the repeatability equation being used is', message)
            console.log(`the repeatability factor is ${averageViscosity} x 0.07885 = ${repeatability}`)
            break

        case select.value === 'RFO100':
            message = '0.08088 x average viscosity, or 8.08%'
            repeatability = averageViscosity * 0.08088
            preciseRepeatability = repeatability.toPrecision(4)
            console.log('the repeatability equation being used is', message)
            console.log(`the repeatability factor is ${averageViscosity} x 0.08088 = ${repeatability}`)
            break

        case select.value === 'ADD100':
            message = '0.00192 x (average viscosity ^ 1.1)'
            repeatability = (averageViscosity ** 1.1)* 0.00192
            preciseRepeatability = repeatability.toPrecision(4)
            console.log('the repeatability equation being used is', message)
            console.log(`the repeatability factor is (${averageViscosity} ^ 1.1) x 0.00192 = ${repeatability}`)
            break

        case select.value === 'GO40':
            message = '(average viscosity + 1) x 0.0043'
            repeatability = (averageViscosity + 1) * 0.0043
            preciseRepeatability = repeatability.toPrecision(4)
            console.log('the repeatability equation being used is', message)
            console.log(`the repeatability factor is (${averageViscosity} + 1) x 0.0043 = ${repeatability}`)
            break

        case select.value === 'JFM20':
            message = '0.001368 x (average viscosity ^ 1.4)'
            repeatability = (averageViscosity ** 1.4)* 0.001368
            preciseRepeatability = repeatability.toPrecision(4)
            console.log('the repeatability equation being used is', message)
            console.log(`the repeatability factor is (${averageViscosity} ^ 1.4) x 0.001368 = ${repeatability}`)
            break

        case select.value === 'UFO40':
            message = '0.001005 x (average viscosity ^ 1.4633)'
            repeatability = (averageViscosity ** 1.722) * 0.000233
            preciseRepeatability = repeatability.toPrecision(4)
            console.log('the repeatability equation being used is', message)
            console.log(`the repeatability factor is (${averageViscosity} ^ 1.722) x 0.000233 = ${repeatability}`)
            break

        case select.value === 'UFO100':
            message = '0.001005 x (average viscosity ^ 1.4633)'
            repeatability = (averageViscosity ** 1.4633) * 0.001005
            preciseRepeatability = repeatability.toPrecision(4)
            console.log('the repeatability equation being used is', message)
            console.log(`the repeatability factor is (${averageViscosity} ^ 1.4633) x 0.001005 = ${repeatability}`)
            break
        
        case select.value === 'CR':
            message = '0.03 x average viscosity, or 3%'
            repeatability = averageViscosity * 0.03
            preciseRepeatability = repeatability.toPrecision(4)
            console.log('the repeatability equation being used is', message)
            console.log(`the repeatability factor is ${averageViscosity} x 0.03 = ${repeatability}`)
            break
    }

    document.getElementById('repeatability-equation').innerText = message
    console.log(`the repeatability factor to 4 significant figures is ${preciseRepeatability}`)
    document.getElementById('repeatability-factor').innerText = preciseRepeatability

    repeatabilityUpperLimit(viscosity1, viscosity2, averageViscosity, repeatability)
}

function repeatabilityUpperLimit(viscosity1, viscosity2, averageViscosity, repeatability) {

    let repeatabilityUpper = averageViscosity + repeatability
    let preciseRepeatabilityUpper = repeatabilityUpper.toPrecision(4)
    document.getElementById('repeatability-upper-limit').textContent = preciseRepeatabilityUpper

    repeatabilityLowerLimit(viscosity1, viscosity2, averageViscosity, repeatability, repeatabilityUpper) 
}

function repeatabilityLowerLimit(viscosity1, viscosity2, averageViscosity, repeatability, repeatabilityUpper) {

    let repeatabilityLower = averageViscosity - repeatability
    let preciseRepeatabilityLower = repeatabilityLower.toPrecision(4)

    document.getElementById('repeatability-lower-limit').textContent = preciseRepeatabilityLower

    repeatabilityChecker(viscosity1, viscosity2, repeatabilityUpper, repeatabilityLower)
}

function repeatabilityChecker(viscosity1, viscosity2, repeatabilityUpper, repeatabilityLower) {

    if(viscosity1 > repeatabilityLower && viscosity1 < repeatabilityUpper && viscosity2 > repeatabilityLower && viscosity2 < repeatabilityUpper) {

        document.getElementById('repeatability-output').innerText = 'Your viscosities are repeatable'
    }

    else {
        document.getElementById('repeatability-output').innerText = 'Your viscosities are not repeatable'
    }
}

let repeatabilityResetButton = document.getElementById('repeatability-reset')

repeatabilityResetButton.addEventListener('click', repeatabilityReset)

function repeatabilityReset() {

    document.getElementById('viscosity-repeatability-1').value = ''
    document.getElementById('viscosity-repeatability-2').value = ''
    document.getElementById('average-viscosity-repeatability').textContent = ''
    document.getElementById('repeatability-equation').textContent = ''
    document.getElementById('repeatability-factor').textContent = ''
    document.getElementById('repeatability-upper-limit').textContent = ''
    document.getElementById('repeatability-lower-limit').textContent = ''
    document.getElementById('repeatability-output').textContent = ''
    document.getElementById('viscosity-repeatability-1').focus()
}


//Reproducibility calculation functions

let reproducibilityButton = document.getElementById('submit-reproducibility')

reproducibilityButton.addEventListener('click', averageViscosityReproducibility)

function averageViscosityReproducibility() {

    let select = document.getElementById('sample-type-reproducibility')

    if(select.value === 'disabled') {
        alert('Please select a sample type from the drop-down menu')
    }
    else {
        let viscosity1 = parseFloat(document.getElementById('viscosity-reproducibility-1').value)
        let viscosity2 = parseFloat(document.getElementById('viscosity-reproducibility-2').value)

        let averageViscosity = ((viscosity1 + viscosity2) / 2)
        let preciseAverageViscosity = averageViscosity.toPrecision(4)

        console.log(`the average viscosity is ${averageViscosity}`)
        console.log(`the average viscosity to 4 significant figures is ${preciseAverageViscosity}`)

        document.getElementById('average-viscosity-reproducibility').textContent = preciseAverageViscosity

        //displayReproducibilityEquation()

        reproducibility(viscosity1, viscosity2, averageViscosity)
    }

}

function reproducibility(viscosity1, viscosity2, averageViscosity) {

    let select = document.getElementById('sample-type-reproducibility')

    let message = ''
    let reproducibility
    let preciseReproducibility

    switch(true) {

        case select.value === 'BO40':
            message = '0.0136 x average viscosity, or 1.36%'
            reproducibility = averageViscosity * 0.0136
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is ${averageViscosity} x 0.0136 = ${reproducibility}`)
            break

        case select.value === 'BO100':
            message = '0.0190 x average viscosity, or 1.90%'
            reproducibility = averageViscosity * 0.0190
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is ${averageViscosity} x 0.0190 = ${reproducibility}`)
            break

        case select.value === 'FO40':
            message = '0.0122 x average viscosity, or 1.22%'
            reproducibility = averageViscosity * 0.0122
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is ${averageViscosity} x 0.0122 = ${reproducibility}`)
            break

        case select.value === 'FO100':
            message = '0.0138 x average viscosity, or 1.38%'
            reproducibility = averageViscosity * 0.0138
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is ${averageViscosity} x 0.0138 = ${reproducibility}`)
            break

        case select.value === 'FO150':
            message = '0.018 x average viscosity, or 1.8%'
            reproducibility = averageViscosity * 0.018
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is ${averageViscosity} x 0.018 = ${reproducibility}`)
            break
        
        case select.value === 'PW100':
            message = '0.0366 x (average viscosity ^ 1.2)'
            reproducibility = (averageViscosity ** 1.2) * 0.0366
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is (${averageViscosity} ^ 1.2) x 0.0366 = ${reproducibility}`)
            break

        case select.value === 'RFO50':
            message = '0.08461 x average viscosity, or 8.46%'
            reproducibility = averageViscosity * 0.08461
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is ${averageViscosity} x 0.08461 = ${reproducibility}`)
            break

        case select.value === 'RFO100':
            message = '0.1206 x average viscosity, or 12.06%'
            reproducibility = averageViscosity * 0.1206
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is ${averageViscosity} x 0.1206 = ${reproducibility}`)
            break

        case select.value === 'ADD100':
            message = '0.00862 x (average viscosity ^ 1.1)'
            reproducibility = (averageViscosity ** 1.1)* 0.00862
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is (${averageViscosity} ^ 1.1) x 0.00862 = ${reproducibility}`)
            break

        case select.value === 'GO40':
            message = '0.0082 x (average viscosity + 1)'
            reproducibility = (averageViscosity + 1) * 0.0082
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is (${averageViscosity} + 1) x 0.0082 = ${reproducibility}`)
            break

        case select.value === 'JFM20':
            message = '0.002899 x (average viscosity ^ 1.4)'
            reproducibility = (averageViscosity ** 1.4)* 0.002899
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is (${averageViscosity} ^ 1.4) x 0.002899 = ${reproducibility}`)
            break

        case select.value === 'KD40':
            message = '0.0224 x average viscosity, or 2.24%'
            reproducibility = averageViscosity * 0.0224
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is ${averageViscosity} x 0.0224 = ${reproducibility}`)
            break

        case select.value === 'UFO40':
            message = '0.000594 x (average viscosity ^ 1.722)'
            reproducibility = (averageViscosity ** 1.722) * 0.000594
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is (${averageViscosity} ^ 1.722) x 0.000594 = ${reproducibility}`)
            break

        case select.value === 'UFO100':
            message = '0.003361 x (average viscosity ^ 1.4633)'
            reproducibility = (averageViscosity ** 1.4633) * 0.003361
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is (${averageViscosity} ^ 1.4633) x 0.003361 = ${reproducibility}`)
            break
        
        case select.value === 'CR':
            message = '0.03 x average viscosity, or 3%'
            reproducibility = averageViscosity * 0.03
            preciseReproducibility = reproducibility.toPrecision(4)
            console.log('the reproducibility equation being used is', message)
            console.log(`the reproducibility factor is ${averageViscosity} x 0.03 = ${reproducibility}`)
            break
    }

    document.getElementById('reproducibility-equation').innerText = message
    console.log(`the reproducibility factor to 4 significant figures is ${preciseReproducibility}`)
    document.getElementById('reproducibility-factor').innerText = preciseReproducibility

    reproducibilityUpperLimit(viscosity1, viscosity2, averageViscosity, reproducibility)
}

function reproducibilityUpperLimit(viscosity1, viscosity2, averageViscosity, reproducibility) {

    let reproducibilityUpper = averageViscosity + reproducibility
    let preciseReproducibilityUpper = reproducibilityUpper.toPrecision(4)
    document.getElementById('reproducibility-upper-limit').textContent = preciseReproducibilityUpper

    reproducibilityLowerLimit(viscosity1, viscosity2, averageViscosity, reproducibility, reproducibilityUpper) 
}

function reproducibilityLowerLimit(viscosity1, viscosity2, averageViscosity, reproducibility, reproducibilityUpper) {

    let reproducibilityLower = averageViscosity - reproducibility
    let preciseReproducibilityLower = reproducibilityLower.toPrecision(4)

    document.getElementById('reproducibility-lower-limit').textContent = preciseReproducibilityLower

    reproducibilityChecker(viscosity1, viscosity2, reproducibilityUpper, reproducibilityLower)
}

function reproducibilityChecker(viscosity1, viscosity2, reproducibilityUpper, reproducibilityLower) {

    if(viscosity1 > reproducibilityLower && viscosity1 < reproducibilityUpper && viscosity2 > reproducibilityLower && viscosity2 < reproducibilityUpper) {

        document.getElementById('reproducibility-output').innerText = 'Your viscosities are reproducible'
    }

    else {
        document.getElementById('reproducibility-output').innerText = 'Your viscosities are not reproducible'
    }
}

let reproducibilityResetButton = document.getElementById('reproducibility-reset')

reproducibilityResetButton.addEventListener('click', reproducibilityReset)

function reproducibilityReset() {

    document.getElementById('viscosity-reproducibility-1').value = ''
    document.getElementById('viscosity-reproducibility-2').value = ''
    document.getElementById('average-viscosity-reproducibility').textContent = ''
    document.getElementById('reproducibility-equation').textContent = ''
    document.getElementById('reproducibility-factor').textContent = ''
    document.getElementById('reproducibility-upper-limit').textContent = ''
    document.getElementById('reproducibility-lower-limit').textContent = ''
    document.getElementById('reproducibility-output').textContent = ''
    document.getElementById('viscosity-reproducibility-1').focus()
}

//Calibration calculations

let calibrationCalculateButton = document.getElementById('submit-calibration')

calibrationCalculateButton.addEventListener('click', getValuesCalibration)

function getValuesCalibration() {

    let calibrationRunTime1 = parseFloat(document.getElementById('calibration-run-time-1').value)
    let calibrationRunTime2 = parseFloat(document.getElementById('calibration-run-time-2').value)
    let calibrationConstant = parseFloat(document.getElementById('calibration-constant').value)

    console.log(`run time 1 is ${calibrationRunTime1}`)
    console.log(`run time 2 is ${calibrationRunTime2}`)
    console.log(`the viscometer constant is ${calibrationConstant}`)

    calculateCalibration(calibrationRunTime1, calibrationRunTime2, calibrationConstant)

}

function calculateCalibration(calibrationRunTime1, calibrationRunTime2, calibrationConstant) {

    let averageRunTime = ((calibrationRunTime1 + calibrationRunTime2) / 2)
    let viscosity1 = calibrationRunTime1 * calibrationConstant
    let viscosity2 = calibrationRunTime2 * calibrationConstant
    let averageViscosity = ((viscosity1 + viscosity2) / 2)

    console.log(`the average run time is ${averageRunTime}`)
    console.log(`viscosity 1 is ${viscosity1}`)
    console.log(`viscosity 2 is ${viscosity2}`)
    console.log(`the average viscosity is ${averageViscosity}`)

    document.getElementById('calibration-average-run-time').textContent = averageRunTime
    document.getElementById('calibration-average-viscosity').textContent = averageViscosity

    tolerance(averageViscosity)

}

function tolerance(averageViscosity) {

    let calibrationFluidViscosity = document.getElementById('calibration-fluid-viscosity').value
    
    switch (true) {
        case calibrationFluidViscosity < 10 :
            document.getElementById('calibration-viscosity-range').textContent = '<10'
            document.getElementById('calibration-tolerance-band').textContent = '+/- 0.30%'
            toleranceBand = 0.30
            break
        
        case calibrationFluidViscosity >= 10 && calibrationFluidViscosity < 100:
            document.getElementById('calibration-viscosity-range').textContent = '10 to 100'
            document.getElementById('calibration-tolerance-band').textContent = '+/- 0.32%'
            toleranceBand = 0.32
            break
        
        case calibrationFluidViscosity >= 100 && calibrationFluidViscosity < 1000 :
            document.getElementById('calibration-viscosity-range').textContent = '100 to 1000'
            document.getElementById('calibration-tolerance-band').textContent = '+/- 0.36%'
            toleranceBand = 0.36
            break

        case calibrationFluidViscosity >= 1000 && calibrationFluidViscosity < 10000 :
            document.getElementById('calibration-viscosity-range').textContent = '1000 to 10000'
            document.getElementById('calibration-tolerance-band').textContent = '+/- 0.42%'
            toleranceBand = 0.42
            break

        case calibrationFluidViscosity >= 10000 && calibrationFluidViscosity < 100000 :
            document.getElementById('calibration-viscosity-range').textContent = '10000 to 100000'
            document.getElementById('calibration-tolerance-band').textContent = '+/- 0.54%'
            toleranceBand = 0.54
            break

        case calibrationFluidViscosity >= 100000 :
            document.getElementById('calibration-viscosity-range').textContent = '>100000'
            document.getElementById('calibration-tolerance-band').textContent = '+/- 0.73%'
            toleranceBand = 0.73
            break
    }
    
    percentageDifference(calibrationFluidViscosity, averageViscosity, toleranceBand)
}

function percentageDifference(calibrationFluidViscosity, averageViscosity, toleranceBand) {

    let numerator = calibrationFluidViscosity - averageViscosity
    numerator = Math.abs(numerator)

    let denominator = ((calibrationFluidViscosity + averageViscosity) / 2)

    let percentageDifference = (numerator / denominator) * 100

    document.getElementById('calibration-percentage-difference').textContent = percentageDifference

    percentageDifferenceChecker(percentageDifference, toleranceBand)
}

function percentageDifferenceChecker(percentageDifference, toleranceBand) {

    if(percentageDifference <= toleranceBand) {
        document.getElementById('calibration-output').textContent = 'percentage difference is less than or equal to tolerance band. Viscometer passes calibration check'
    }
    else if(percentageDifference > toleranceBand) {
        document.getElementById('calibration-output').textContent = 'percentage difference is greater than tolerance band. Viscometer fails calibration check'
    }
}

let calibrationResetButton = document.getElementById('calibration-reset')

calibrationResetButton.addEventListener('click', calibrationReset)

function calibrationReset() {

    document.getElementById('calibration-run-time-1').value = ''
    document.getElementById('calibration-run-time-2').value = ''
    document.getElementById('calibration-constant').value = ''
    document.getElementById('calibration-fluid-viscosity').value = ''
    document.getElementById('calibration-average-run-time').textContent = ''
    document.getElementById('calibration-average-viscosity').textContent = ''
    document.getElementById('calibration-viscosity-range').textContent = ''
    document.getElementById('calibration-tolerance-band').textContent = ''
    document.getElementById('calibration-percentage-difference').textContent = ''
    document.getElementById('calibration-output').textContent = ''
    document.getElementById('calibration-run-time-1').focus()
}

//Viscometer Recalibration calculations

let recalibrationButton = document.getElementById('submit-recalibration')

recalibrationButton.addEventListener('click', recalibrationPercentageDifference)

function recalibrationPercentageDifference() {

    let testingGravity = parseFloat(document.getElementById('testing-lab-gravity').value)
    let standardisationGravity = parseFloat(document.getElementById('standardisation-lab-gravity').value)
    let constant = parseFloat(document.getElementById('recalibration-constant').value)

    console.log(`the gravity at the testing lab is ${testingGravity}`)
    console.log(`the gravity at the standardisation lab is ${standardisationGravity}`)
    console.log(`the constant of the viscometer is ${constant}`)

    let numerator = testingGravity - standardisationGravity
    numerator = Math.abs(numerator)

    console.log(numerator)

    let denominator = ((testingGravity + standardisationGravity) / 2)

    console.log(denominator)

    let percentageDifference = (numerator / denominator) * 100
    let precisePercentageDifference = percentageDifference.toPrecision(4)

    document.getElementById('recalibration-percentage-difference').textContent = precisePercentageDifference
    console.log(`the percentage difference is ${precisePercentageDifference}`)

    recalibrationFunction(percentageDifference, testingGravity, standardisationGravity, constant)
}

function recalibrationFunction(percentageDifference, testingGravity, standardisationGravity, constant) {

    if(percentageDifference > 0.1) {
        let newConstant = (standardisationGravity / testingGravity) * constant
        let preciseNewConstant = newConstant.toPrecision(4)
        console.log(`the new constant of the viscometer is ${preciseNewConstant}`)
        document.getElementById('new-constant').textContent = preciseNewConstant
    }
    else {
        document.getElementById('new-constant').textContent = 'the difference between the two gravities does not warrant recalibration of the viscometer'
    }
}

let recalibrationResetButton = document.getElementById('recalibration-reset')
recalibrationResetButton.addEventListener('click', recalibrationReset)

function recalibrationReset() {
    document.getElementById('recalibration-constant').value = ''
    document.getElementById('testing-lab-gravity').value = ''
    document.getElementById('standardisation-lab-gravity').value = ''
    document.getElementById('recalibration-percentage-difference').textContent = ''
    document.getElementById('new-constant').textContent = ''
}

//Do I want to use the outputs of the toPrecision method in the final calculations? There are edge cases where I round my number throughout the process and come out with a 
//slightly different value to what GLIMS calculates, because GLIMS presumably doesn't round. 
//Alternatively, the entire point is to calculate and display values at each step of the process
//display both?

//to try - use onKeyUp event handler to count 5 or 6 key presses for the run-time number inputs - https://stackoverflow.com/questions/22086823/limit-number-of-characters-in-input-type-number 
//Later - add some logic to determine if the viscometer type button matches the option selected. If not, prompt the user

//onchange event listener works! - perhaps refactor to use the code at the top