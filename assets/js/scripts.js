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

repeatabilityButton.addEventListener('click', averageViscosityCalculator)

function averageViscosityCalculator() {

    let select = document.getElementById('sample-type-repeatability')

    if(select.value === 'disabled') {
        alert('Please select a sample type from the drop-down menu')
    }
    else {
        let viscosity1 = parseFloat(document.getElementById('viscosity-1').value)
        let viscosity2 = parseFloat(document.getElementById('viscosity-2').value)

        let averageViscosity = ((viscosity1 + viscosity2) / 2)
        let preciseAverageViscosity = averageViscosity.toPrecision(4)

        console.log(`the average viscosity is ${averageViscosity}`)
        console.log(`the average viscosity to 4 significant figures is ${preciseAverageViscosity}`)

        document.getElementById('average-viscosity').textContent = preciseAverageViscosity

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

    let averageViscosity = parseFloat(document.getElementById('average-viscosity').textContent)
    let repeatabilityFactor = parseFloat(document.getElementById('repeatability-factor').textContent)

    let repeatabilityUpper = averageViscosity + repeatabilityFactor
    let preciseRepeatabilityUpper = repeatabilityUpper.toPrecision(4)

    document.getElementById('repeatability-upper-limit').textContent = preciseRepeatabilityUpper
}

function repeatabilityLowerLimit() {

    let averageViscosity = parseFloat(document.getElementById('average-viscosity').textContent)
    let repeatabilityFactor = parseFloat(document.getElementById('repeatability-factor').textContent)

    let repeatabilityLower = averageViscosity - repeatabilityFactor
    let preciseRepeatabilityLower = repeatabilityLower.toPrecision(4)

    document.getElementById('repeatability-lower-limit').textContent = preciseRepeatabilityLower

    repeatabilityChecker()
}

function repeatabilityChecker() {

    let viscosity1 = parseFloat(document.getElementById('viscosity-1').value)
    let viscosity2 = parseFloat(document.getElementById('viscosity-2').value)
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


//Do I want to use the outputs of the toPrecision method in the final calculations? There are edge cases where I round my number throughout the process and come out with a 
//slightly different value to what GLIMS calculates, because GLIMS presumably doesn't round. 
//Alternatively, the entire point is to calculate and display values at each step of the process
//display both?

//to try - use onKeyUp event handler to count 5 or 6 key presses for the run-time number inputs - https://stackoverflow.com/questions/22086823/limit-number-of-characters-in-input-type-number 
//Later - add some logic to determine if the viscometer type button matches the option selected. If not, prompt the user

//onchange event listener works! - perhaps refactor to use the code at the top