//Suspended flow Viscometer / Ubbelohde viscometer logic

let ubbelohdeButton = document.getElementById('ubbelohde-button')

ubbelohdeButton.addEventListener('click', ubbelohdeConstant)

function ubbelohdeConstant() {

    let constant1Div = document.getElementById('constant-1-div')
    let constant2Div = document.getElementById('constant-2-div')
    let determinabilityInput1 = document.getElementById('determinability-input-1')
    let determinabilityInput2 = document.getElementById('determinability-input-2')
    let constantDiv = document.getElementById('constant-div')
    let submitUbbelohde = document.getElementById('submit-ubbelohde')
    let submitZeitfuchs = document.getElementById('submit-zeitfuchs')
    let reset = document.getElementById('reset-determinability')
    let submitDiv = document.getElementById('submit-div')
    

    determinabilityInput1.style.display = 'inline-block'
    determinabilityInput2.style.display = 'inline-block'
    

    if(constant1Div.style.display !== 'none' || constant2Div.style.display !== 'none') {
        constant1Div.style.display = 'none'
        constant2Div.style.display = 'none'

        constantDiv.style.display = 'block'
        submitUbbelohde.style.display = 'inline-block'
        submitZeitfuchs.style.display = 'none'
        reset.style.display = 'inline-block'
        submitDiv.style.marginTop  = '31px' 
    }
    else {
        document.getElementById('constant-div').style.display = 'block'
        submitUbbelohde.style.display = 'inline-block'
        submitZeitfuchs.style.display = 'none'
        reset.style.display = 'inline-block'
        submitDiv.style.marginTop  = '31px'
    }

    document.getElementById('run-time-1').focus()
    
}

let getValuesUbbelohdeButton = document.getElementById('submit-ubbelohde')

getValuesUbbelohdeButton.addEventListener('click', getValuesUbbelohde)

function getValuesUbbelohde() {

    let select = document.getElementById('sample-type-determinability') 

    let runTime1 = document.getElementById('run-time-1')
    let runTime2 = document.getElementById('run-time-2')
    let constant = document.getElementById('constant-input')

    if(select.value === 'disabled') {

        alert('Please select a sample type from the drop-down menu')
    }
    else if(runTime1.value === '' || runTime2.value === '') {
        alert('Please enter two run-times')
    }
    else if(constant.value === '') {
        alert('Please enter a viscometer constant')
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
    document.getElementById('determinability-kv-1-units').style.display = 'inline'
    document.getElementById('determinability-kv-2-units').style.display = 'inline'

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
    document.getElementById('determinability-final-kv-units').style.display = 'inline'

    determinability(finalViscosity, kv1, kv2)
}

//Cross Arm viscomter / Zeitfuchs viscometer logic

let zeitfuchsButton = document.getElementById('zeitfuchs-button')

zeitfuchsButton.addEventListener('click', zeitfuchsConstant)

function zeitfuchsConstant() {

    let constant1Div = document.getElementById('constant-1-div')
    let constant2Div = document.getElementById('constant-2-div')
    let determinabilityInput1 = document.getElementById('determinability-input-1')
    let determinabilityInput2 = document.getElementById('determinability-input-2')
    let constantDiv = document.getElementById('constant-div')
    let submitZeitfuchs = document.getElementById('submit-zeitfuchs')
    let submitUbbelohde = document.getElementById('submit-ubbelohde')
    let reset = document.getElementById('reset-determinability')
    let submitDiv = document.getElementById('submit-div')

    determinabilityInput1.style.display = 'inline-block'
    determinabilityInput2.style.display = 'inline-block'

    if(constantDiv.style.display !== 'none') {
        constantDiv.style.display = 'none'

        constant1Div.style.display = 'block'
        constant2Div.style.display = 'block'
        submitZeitfuchs.style.display = 'inline-block'
        submitUbbelohde.style.display = 'none'
        reset.style.display = 'inline-block'
        submitDiv.style.marginTop = '50px'
    }
    else {
        constant1Div.style.display = 'block'
        constant2Div.style.display = 'block'
        submitZeitfuchs.style.display = 'inline-block'
        submitUbbelohde.style.display = 'none'
        reset.style.display = 'inline-block'
        submitDiv.style.marginTop = '50px'
    }

    document.getElementById('run-time-1').focus()
}

let getValuesZeitfuchsButton = document.getElementById('submit-zeitfuchs')

getValuesZeitfuchsButton.addEventListener('click', getValuesZeitfuchs)

function getValuesZeitfuchs() {

    let select = document.getElementById('sample-type-determinability')

    let runTime1 = document.getElementById('run-time-1')
    let runTime2 = document.getElementById('run-time-2')
    let constant1 = document.getElementById('constant-1-input')
    let constant2 = document.getElementById('constant-2-input')


    if(select.value === 'disabled') {
        alert('Please select a sample type from the drop down menu')
        return
    }
    else if(runTime1.value === '' || runTime2.value === '') {
        alert('Please enter two run-times')
        
    }
    else if (constant1.value === '' || constant2.value === '') {
        alert('Please enter two viscometer constants')
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
    document.getElementById('determinability-kv-1-units').style.display = 'inline'
    document.getElementById('determinability-kv-2-units').style.display = 'inline' 
    
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
    document.getElementById('determinability-final-kv-units').style.display = 'inline'

    determinability(finalViscosity, kv1, kv2)

}

//Determinability

function determinability(finalViscosity, kv1, kv2) {

    let select = document.getElementById('sample-type-determinability')

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
    document.getElementById('determinability-factor-units').style.display = 'inline'

    upperLimit(determinability, finalViscosity, kv1, kv2)
    
}

function upperLimit(determinability, finalViscosity, kv1, kv2) {

    let upperAllowedViscosity = finalViscosity + determinability
    let preciseUpperAllowedViscosity = upperAllowedViscosity.toPrecision(4)

    document.getElementById('upper-limit').innerText = preciseUpperAllowedViscosity
    document.getElementById('determinability-upper-units').style.display = 'inline'

    console.log(`The upper allowed viscosity is ${finalViscosity} + ${determinability} = ${preciseUpperAllowedViscosity}`)

    lowerLimit(determinability, finalViscosity, upperAllowedViscosity, kv1, kv2)
}

function lowerLimit(determinability, finalViscosity, upperAllowedViscosity, kv1, kv2) {

    let lowerAllowedViscosity = finalViscosity - determinability
    let preciseLowerAllowedViscosity = lowerAllowedViscosity.toPrecision(4)

    document.getElementById('lower-limit').innerText = preciseLowerAllowedViscosity
    document.getElementById('determinability-lower-units').style.display = 'inline'

    console.log(`The lower allowed viscosity is ${finalViscosity} - ${determinability} = ${preciseLowerAllowedViscosity}`)

    checker(upperAllowedViscosity, lowerAllowedViscosity, kv1, kv2)
}

function checker(upperAllowedViscosity, lowerAllowedViscosity, kv1, kv2) {

    if(kv1 > lowerAllowedViscosity && kv1 < upperAllowedViscosity && kv2 > lowerAllowedViscosity && kv2 < upperAllowedViscosity) {

        document.getElementById('determinability-output').innerHTML = `
        <i class="fas fa-check icon"></i>
        <span>Your viscosities fall within the defined limits</span>
        `
    }

    else {
        document.getElementById('determinability-output').innerHTML = `
        <i class="fas fa-xmark icon"></i>
        <span>Your viscosities do not fall within the defined limits</span>
        `
    }

}

let resetButton = document.getElementById('reset-determinability')

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

    document.getElementById('determinability-kv-1-units').style.display = 'none'
    document.getElementById('determinability-kv-2-units').style.display = 'none'
    document.getElementById('determinability-final-kv-units').style.display = 'none'
    document.getElementById('determinability-factor-units').style.display = 'none'
    document.getElementById('determinability-upper-units').style.display = 'none'
    document.getElementById('determinability-lower-units').style.display = 'none'
}