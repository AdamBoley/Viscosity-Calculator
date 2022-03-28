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

    displayDeterminabilityEquation()

    determinabilityFactor(finalViscosity)

    return finalViscosity
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
    console.log(`the final kinematic viscosity to significant figures is ${preciseFinalViscosity}`)

    document.getElementById('final-calculated-viscosity').innerText = preciseFinalViscosity

    displayDeterminabilityEquation()

    determinabilityFactor(finalViscosity)

    return finalViscosity
}

//Determinability
function displayDeterminabilityEquation() {

    let select = document.getElementById('sample-type')

    if(select.value === '0.0037') {

        let message = '0.0037 x final calculated viscosity, or 0.37%'
        document.getElementById('determinability-equation').innerText = message
        console.log('the determinability equation being used is', message)
    }

    else if (select.value === '0.0036') {

        let message = '0.0036 x Final calculated viscosity, or 0.36%'
        document.getElementById('determinability-equation').innerText = message
        console.log('the determinability equation being used is', message)
    }

    else if (select.value === '0.0150') {

        let message = '0.0150 x Final calculated viscosity, or 1.5%'
        document.getElementById('determinability-equation').innerText = message
        console.log('the determinability equation being used is', message)
    }

    else if (select.value === '0.0080') {

        let message = '0.0080 x Final calculated viscosity, or 0.80%'
        document.getElementById('determinability-equation').innerText = message
        console.log('the determinability equation being used is', message)
    }

    else if (select.value === '0.0244') {

        let message = '0.0244 x Final calculated viscosity, or 2.44%'
        document.getElementById('determinability-equation').innerText = message
        console.log('the determinability equation being used is', message)
    }

    else if (select.value === '0.0300') {

        let message = '0.03 x Final calculated viscosity, or 3%'
        document.getElementById('determinability-equation').innerText = message
        console.log('the determinability equation being used is', message)
    }

    else if (select.value === '0.00106^1.1') {

        let message = '(Final calculated viscosity ^ 1.1) x 0.00106' //use a span and vertical alignment to display the power as a superscripted value here?
        document.getElementById('determinability-equation').innerText = message
        console.log('the determinability equation being used is', message)
    }

    else if (select.value === '0.0013(y+1)') {

        let message = '(Final calculated viscosity + 1) x 0.0013'
        document.getElementById('determinability-equation').innerText = message
        console.log('the determinability equation being used is', message)
    }

    else if (select.value === '0.007608') {

        let message = '0.007608 x Final calculated viscosity, or 0.7608%'
        document.getElementById('determinability-equation').innerText = message
        console.log('the determinability equation being used is', message)
    }

    else {//should never trigger, but included as a failsafe

        let message = 'invalid determinability equation'
        document.getElementById('determinability-equation').innerText = message
        console.log('the determinability equation being used is', message)
    }

}
//DRY - the building blocks of each conditional statement are the same, so build the message out of variables using string concatenation

function determinabilityFactor(finalViscosity) {

    let select = document.getElementById('sample-type')

    if(select.value === '0.0037') {

        let determinability = finalViscosity * 0.0037
        let preciseDeterminability = determinability.toPrecision(4)
        console.log(`${finalViscosity} x 0.0037 = `, determinability)
        console.log(`the determinability to 4 significant figures is ${preciseDeterminability}`)
        document.getElementById('determinability-factor').innerText = preciseDeterminability
    }

    else if (select.value === '0.0036') {

        let determinability = finalViscosity * 0.0036
        let preciseDeterminability = determinability.toPrecision(4)
        console.log(`${finalViscosity} x 0.0036 = `, determinability)
        console.log(`the determinability to 4 significant figures is ${preciseDeterminability}`)
        document.getElementById('determinability-factor').innerText = preciseDeterminability
    }

    else if (select.value === '0.0150') {

        let determinability = finalViscosity * 0.0150
        let preciseDeterminability = determinability.toPrecision(4)
        console.log(`${finalViscosity} x 0.0150 = `, determinability)
        console.log(`the determinability to 4 significant figures is ${preciseDeterminability}`)
        document.getElementById('determinability-factor').innerText = preciseDeterminability
    }

    else if (select.value === '0.0080') {

        let determinability = finalViscosity * 0.0080
        let preciseDeterminability = determinability.toPrecision(4)
        console.log(`${finalViscosity} x 0.0080 = `, determinability)
        console.log(`the determinability to 4 significant figures is ${preciseDeterminability}`)
        document.getElementById('determinability-factor').innerText = preciseDeterminability
    }

    else if (select.value === '0.0244') {

        let determinability = finalViscosity * 0.0244
        let preciseDeterminability = determinability.toPrecision(4)
        console.log(`${finalViscosity} x 0.0244 = `, determinability)
        console.log(`the determinability to 4 significant figures is ${preciseDeterminability}`)
        document.getElementById('determinability-factor').innerText = preciseDeterminability
    }

    else if (select.value === '0.0300') {

        let determinability = finalViscosity * 0.03
        let preciseDeterminability = determinability.toPrecision(4)
        console.log(`${finalViscosity} x 0.03 = `, determinability)
        console.log(`the determinability to 4 significant figures is ${preciseDeterminability}`)
        document.getElementById('determinability-factor').innerText = preciseDeterminability
    }

    else if (select.value === '0.00106^1.1') {

        let determinability = (finalViscosity ** 1.1) * 0.00106//use a span and vertical alignment to display the power as a superscripted value here?
        let preciseDeterminability = determinability.toPrecision(4)
        console.log(`(${finalViscosity} ^1.1) x 0.00106 = `, determinability)
        console.log(`the determinability to 4 significant figures is ${preciseDeterminability}`)
        document.getElementById('determinability-factor').innerText = preciseDeterminability
    }

    else if (select.value === '0.0013(y+1)') {

        let determinability = (finalViscosity + 1) * 0.0013
        let preciseDeterminability = determinability.toPrecision(4)
        console.log(`(${finalViscosity} + 1) x 0.0013 = `, determinability)
        console.log(`the determinability to 4 significant figures is ${preciseDeterminability}`)
        document.getElementById('determinability-factor').innerText = preciseDeterminability
    }

    else if (select.value === '0.007608') {

        let determinability = finalViscosity * 0.007608
        let preciseDeterminability = determinability.toPrecision(4)
        console.log(`${finalViscosity} x 0.007608 = `, determinability)
        console.log(`the determinability to 4 significant figures is ${preciseDeterminability}`)
        document.getElementById('determinability-factor').innerText = preciseDeterminability
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
    let preciseUpperAllowedViscosity = upperAllowedViscosity.toPrecision(4)

    document.getElementById('upper-limit').innerText = preciseUpperAllowedViscosity

    console.log(`The upper allowed viscosity is ${preciseUpperAllowedViscosity}`)

}

function lowerLimit() {

    let finalViscosity = parseFloat(document.getElementById('final-calculated-viscosity').innerText)
    let determinabilityFactor = parseFloat(document.getElementById('determinability-factor').innerText)

    let lowerAllowedViscosity = finalViscosity - determinabilityFactor
    let preciseLowerAllowedViscosity = lowerAllowedViscosity.toPrecision(4)

    document.getElementById('lower-limit').innerText = preciseLowerAllowedViscosity

    console.log(`The lower allowed viscosity is ${preciseLowerAllowedViscosity}`)

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

        displayRepeatabilityEquation()

        repeatabilityFactor(averageViscosity)
    }

}

function displayRepeatabilityEquation() {

    let select = document.getElementById('sample-type-repeatability')

    if(select.value === 'BO40') {

        let message = '0.0101 x average viscosity, or 1.01%'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }    

    else if (select.value === 'BO100') {

        let message = '0.0085 x average viscosity, or 0.85%'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    else if (select.value === 'FO40') {

        let message = '0.0074 x average viscosity, or 0.74%'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    else if (select.value === 'FO100') {

        let message = '0.0084 x average viscosity, or 0.84%'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    else if (select.value === 'FO150') {

        let message = '0.0056 x average viscosity, or 0.56%'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    else if (select.value === 'PW100') {

        let message = '0.0141 x (average viscosity ^ 1.2)'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    else if (select.value === 'RFO50') {

        let message = '0.07885 x average viscosity, or 7.88%'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    else if (select.value === 'RFO100') {

        let message = '0.08088 x average viscosity, or 8.08%'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    else if (select.value === 'ADD100') {

        let message = '0.0192 x (average viscosity ^ 1.1)'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    else if (select.value === 'GO40') {

        let message = '0.0043 x (average viscosity + 1)'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    else if (select.value === 'JFM20') {

        let message = '0.001368 x (average viscosity ^ 1.4)'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    else if (select.value === 'KD40') {

        let message = '0.0056 x average viscosity, or 0.56%'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    else if (select.value === 'UFO40') {

        let message = '0.000233 x (average viscosity ^ 1.722)'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    else if (select.value === 'UFO100') {

        let message = '0.001005 x (average viscosity ^ 1.4633)'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    else if (select.value === 'CR') {

        let message = '0.03 x average viscosity, or 3%'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    else {

        let message = 'invalid repeatability equation'
        document.getElementById('repeatability-equation').innerText = message
        console.log('the repeatability equation being used is', message)
    }

}

function repeatabilityFactor(averageViscosity) {

    let select = document.getElementById('sample-type-repeatability')

    if(select.value === 'BO40') {

        let repeatability = averageViscosity * 0.0101
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`${averageViscosity} x 0.0101 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }    

    else if (select.value === 'BO100') {

        let repeatability = averageViscosity * 0.0085
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`${averageViscosity} x 0.0085 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }

    else if (select.value === 'FO40') {

        let repeatability = averageViscosity * 0.0074
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`${averageViscosity} x 0.0074 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }

    else if (select.value === 'FO100') {

        let repeatability = averageViscosity * 0.0084
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`${averageViscosity} x 0.0084 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }

    else if (select.value === 'FO150') {

        let repeatability = averageViscosity * 0.0056
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`${averageViscosity} x 0.0056 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }

    else if (select.value === 'PW100') {

        let repeatability = (averageViscosity ** 1.2) * 0.0141
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`(${averageViscosity} ^ 1.2) x 0.0141 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }

    else if (select.value === 'RFO50') {

        let repeatability = averageViscosity * 0.07885
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`${averageViscosity} x 0.07885 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }

    else if (select.value === 'RFO100') {

        let repeatability = averageViscosity * 0.08088
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`${averageViscosity} x 0.08088 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }

    else if (select.value === 'ADD100') {

        let repeatability = (averageViscosity ** 1.1)* 0.00192
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`(${averageViscosity} ^ 1.1) x 0.0192 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }

    else if (select.value === 'GO40') {

        let repeatability = (averageViscosity + 1) * 0.0043
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`(${averageViscosity} +1 ) x 0.0043 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }

    else if (select.value === 'JFM20') {

        let repeatability = (averageViscosity ** 1.4)* 0.001368
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`(${averageViscosity} ^ 1.4) x 0.001368 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }

    else if (select.value === 'KD40') {

        let repeatability = averageViscosity * 0.0056
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`${averageViscosity} x 0.0056 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }

    else if (select.value === 'UFO40') {

        let repeatability = (averageViscosity ** 1.722) * 0.000233
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`(${averageViscosity} ^ 1.722) x 0.000233 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }

    else if (select.value === 'UFO100') {

        let repeatability = (averageViscosity ** 1.4633) * 0.001005
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`(${averageViscosity} ^ 1.4633) x 0.001005 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }

    else if (select.value === 'CR') {

        let repeatability = averageViscosity * 0.03
        let preciseRepeatability = repeatability.toPrecision(4)
        console.log(`${averageViscosity} x 0.03 = `, repeatability)
        console.log(`the repeatability to 4 significant figures is ${preciseRepeatability}`)
        document.getElementById('repeatability-factor').innerText = preciseRepeatability
    }

    else {

        let message = 'invalid repeatability equation'
        document.getElementById('repeatability-factor').innerText = message
        console.log('the repeatability equation being used is', message)
    }

    repeatabilityUpperLimit()
    repeatabilityLowerLimit()
}

function repeatabilityUpperLimit() {

    let averageViscosity = parseFloat(document.getElementById('average-viscosity-repeatability').textContent)
    let repeatabilityFactor = parseFloat(document.getElementById('repeatability-factor').textContent)

    let repeatabilityUpper = averageViscosity + repeatabilityFactor
    let preciseRepeatabilityUpper = repeatabilityUpper.toPrecision(4)

    document.getElementById('repeatability-upper-limit').textContent = preciseRepeatabilityUpper
}

function repeatabilityLowerLimit() {

    let averageViscosity = parseFloat(document.getElementById('average-viscosity-repeatability').textContent)
    let repeatabilityFactor = parseFloat(document.getElementById('repeatability-factor').textContent)

    let repeatabilityLower = averageViscosity - repeatabilityFactor
    let preciseRepeatabilityLower = repeatabilityLower.toPrecision(4)

    document.getElementById('repeatability-lower-limit').textContent = preciseRepeatabilityLower

    repeatabilityChecker()
}

function repeatabilityChecker() {

    let viscosity1 = parseFloat(document.getElementById('viscosity-repeatability-1').value)
    let viscosity2 = parseFloat(document.getElementById('viscosity-repeatability-2').value)
    let upperAllowedViscosity = parseFloat(document.getElementById('repeatability-upper-limit').innerText)
    let lowerAllowedViscosity = parseFloat(document.getElementById('repeatability-lower-limit').innerText)

    if(viscosity1 > lowerAllowedViscosity && viscosity1 < upperAllowedViscosity && viscosity2 > lowerAllowedViscosity && viscosity2 < upperAllowedViscosity) {

        document.getElementById('repeatability-output').innerText = 'Your viscosities are repeatable'
    }

    else {
        document.getElementById('repeatability-output').innerText = 'Your viscosities are not repeatable'
    }
}

let repeatabilityResetButton = document.getElementById('repeatability-reset')

repeatabilityResetButton.addEventListener('click', repeatabilityReset)

function repeatabilityReset() {

    document.getElementById('viscosity-1').value = ''
    document.getElementById('viscosity-2').value = ''
    document.getElementById('average-viscosity').textContent = ''
    document.getElementById('repeatability-equation').textContent = ''
    document.getElementById('repeatability-factor').textContent = ''
    document.getElementById('repeatability-upper-limit').textContent = ''
    document.getElementById('repeatability-lower-limit').textContent = ''
    document.getElementById('repeatability-output').textContent = ''
    document.getElementById('viscosity-1').focus()
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

        displayReproducibilityEquation()

        reproducibilityFactor(averageViscosity)
    }

}

function displayReproducibilityEquation() {

    let select = document.getElementById('sample-type-reproducibility')

    if(select.value === 'BO40') {

        let message = '0.0136 x average viscosity, or 1.36%'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }    

    else if (select.value === 'BO100') {

        let message = '0.0190 x average viscosity, or 1.90%'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

    else if (select.value === 'FO40') {

        let message = '0.0122 x average viscosity, or 1.22%'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

    else if (select.value === 'FO100') {

        let message = '0.0138 x average viscosity, or 1.38%'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

    else if (select.value === 'FO150') {

        let message = '0.018 x average viscosity, or 1.8%'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

    else if (select.value === 'PW100') {

        let message = '0.0366 x (average viscosity ^ 1.2)'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

    else if (select.value === 'RFO50') {

        let message = '0.08461 x average viscosity, or 8.46%'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

    else if (select.value === 'RFO100') {

        let message = '0.1206 x average viscosity, or 12.06%'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

    else if (select.value === 'ADD100') {

        let message = '0.00862 x (average viscosity ^ 1.1)'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

    else if (select.value === 'GO40') {

        let message = '0.0082 x (average viscosity + 1)'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

    else if (select.value === 'JFM20') {

        let message = '0.002899 x (average viscosity ^ 1.4)'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

    else if (select.value === 'KD40') {

        let message = '0.0224 x average viscosity, or 2.24%'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

    else if (select.value === 'UFO40') {

        let message = '0.000594 x (average viscosity ^ 1.722)'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

    else if (select.value === 'UFO100') {

        let message = '0.003361 x (average viscosity ^ 1.4633)'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

    else if (select.value === 'CR') {

        let message = '0.03 x average viscosity, or 3%'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

    else {

        let message = 'invalid reproducibility equation'
        document.getElementById('reproducibility-equation').innerText = message
        console.log('the reproducibility equation being used is', message)
    }

}

function reproducibilityFactor(averageViscosity) {

    let select = document.getElementById('sample-type-reproducibility')

    if(select.value === 'BO40') {

        let reproducibility = averageViscosity * 0.0136
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`${averageViscosity} x 0.0136 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }    

    else if (select.value === 'BO100') {

        let reproducibility = averageViscosity * 0.0190
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`${averageViscosity} x 0.0190 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }

    else if (select.value === 'FO40') {

        let reproducibility = averageViscosity * 0.0122
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`${averageViscosity} x 0.0122 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }

    else if (select.value === 'FO100') {

        let reproducibility = averageViscosity * 0.0138
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`${averageViscosity} x 0.0138 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }

    else if (select.value === 'FO150') {

        let reproducibility = averageViscosity * 0.018
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`${averageViscosity} x 0.018 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }

    else if (select.value === 'PW100') {

        let reproducibility = (averageViscosity ** 1.2) * 0.0366
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`(${averageViscosity} ^ 1.2) x 0.0366 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }

    else if (select.value === 'RFO50') {

        let reproducibility = averageViscosity * 0.08461
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`${averageViscosity} x 0.08461 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }

    else if (select.value === 'RFO100') {

        let reproducibility = averageViscosity * 0.1206
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`${averageViscosity} x 0.1206 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }

    else if (select.value === 'ADD100') {

        let reproducibility = (averageViscosity ** 1.1)* 0.00862
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`(${averageViscosity} ^ 1.1) x 0.00862 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }

    else if (select.value === 'GO40') {

        let reproducibility = (averageViscosity + 1) * 0.0082
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`(${averageViscosity} +1 ) x 0.0082 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }

    else if (select.value === 'JFM20') {

        let reproducibility = (averageViscosity ** 1.4)* 0.002899
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`(${averageViscosity} ^ 1.4) x 0.002899 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }

    else if (select.value === 'KD40') {

        let reproducibility = averageViscosity * 0.0224
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`${averageViscosity} x 0.0224 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }

    else if (select.value === 'UFO40') {

        let reproducibility = (averageViscosity ** 1.722) * 0.000594
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`(${averageViscosity} ^ 1.722) x 0.000594 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }

    else if (select.value === 'UFO100') {

        let reproducibility = (averageViscosity ** 1.4633) * 0.003361
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`(${averageViscosity} ^ 1.4633) x 0.003361 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }

    else if (select.value === 'CR') {

        let reproducibility = averageViscosity * 0.03
        let preciseReproducibility = reproducibility.toPrecision(4)
        console.log(`${averageViscosity} x 0.03 = `, reproducibility)
        console.log(`the reproducibility to 4 significant figures is ${preciseReproducibility}`)
        document.getElementById('reproducibility-factor').innerText = preciseReproducibility
    }

    else {

        let message = 'invalid reproducibility equation'
        document.getElementById('reproducibility-factor').innerText = message
        console.log( message)
    }

    reproducibilityUpperLimit()
    reproducibilityLowerLimit()
}

function reproducibilityUpperLimit() {

    let averageViscosity = parseFloat(document.getElementById('average-viscosity-reproducibility').textContent)
    let reproducibilityFactor = parseFloat(document.getElementById('reproducibility-factor').textContent)

    let reproducibilityUpper = averageViscosity + reproducibilityFactor
    let preciseReproducibilityUpper = reproducibilityUpper.toPrecision(4)

    document.getElementById('reproducibility-upper-limit').textContent = preciseReproducibilityUpper
}

function reproducibilityLowerLimit() {

    let averageViscosity = parseFloat(document.getElementById('average-viscosity-reproducibility').textContent)
    let reproducibilityFactor = parseFloat(document.getElementById('reproducibility-factor').textContent)

    let reproducibilityLower = averageViscosity - reproducibilityFactor
    let preciseReproducibilityLower = reproducibilityLower.toPrecision(4)

    document.getElementById('reproducibility-lower-limit').textContent = preciseReproducibilityLower

    reproducibilityChecker()
}

function reproducibilityChecker() {

    let viscosity1 = parseFloat(document.getElementById('viscosity-reproducibility-1').value)
    let viscosity2 = parseFloat(document.getElementById('viscosity-reproducibility-2').value)
    let upperAllowedViscosity = parseFloat(document.getElementById('reproducibility-upper-limit').innerText)
    let lowerAllowedViscosity = parseFloat(document.getElementById('reproducibility-lower-limit').innerText)

    if(viscosity1 > lowerAllowedViscosity && viscosity1 < upperAllowedViscosity && viscosity2 > lowerAllowedViscosity && viscosity2 < upperAllowedViscosity) {

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