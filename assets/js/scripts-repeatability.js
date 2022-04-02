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
        document.getElementById('repeatability-average-kv-units').style.display = 'inline'

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
    document.getElementById('repeatability-factor-units').style.display = 'inline'

    repeatabilityUpperLimit(viscosity1, viscosity2, averageViscosity, repeatability)
}

function repeatabilityUpperLimit(viscosity1, viscosity2, averageViscosity, repeatability) {

    let repeatabilityUpper = averageViscosity + repeatability
    let preciseRepeatabilityUpper = repeatabilityUpper.toPrecision(4)
    document.getElementById('repeatability-upper-limit').textContent = preciseRepeatabilityUpper
    document.getElementById('repeatability-upper-units').style.display = 'inline'

    repeatabilityLowerLimit(viscosity1, viscosity2, averageViscosity, repeatability, repeatabilityUpper) 
}

function repeatabilityLowerLimit(viscosity1, viscosity2, averageViscosity, repeatability, repeatabilityUpper) {

    let repeatabilityLower = averageViscosity - repeatability
    let preciseRepeatabilityLower = repeatabilityLower.toPrecision(4)

    document.getElementById('repeatability-lower-limit').textContent = preciseRepeatabilityLower
    document.getElementById('repeatability-lower-units').style.display = 'inline'

    repeatabilityChecker(viscosity1, viscosity2, repeatabilityUpper, repeatabilityLower)
}

function repeatabilityChecker(viscosity1, viscosity2, repeatabilityUpper, repeatabilityLower) {

    if(viscosity1 > repeatabilityLower && viscosity1 < repeatabilityUpper && viscosity2 > repeatabilityLower && viscosity2 < repeatabilityUpper) {

        document.getElementById('repeatability-output').innerHTML = `
        <i class="fas fa-check icon"></i>
        <span>Your viscosities are repeatable</span>
        `
    }

    else {
        document.getElementById('repeatability-output').innerHTML = `
        <i class="fas fa-xmark icon"></i>
        <span>Your viscosities are not repeatable</span>
        `
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

    document.getElementById('repeatability-kv-1-units').style.display = 'none'
    document.getElementById('repeatability-kv-2-units').style.display = 'none'
    document.getElementById('repeatability-average-kv-units').style.display = 'none'
    document.getElementById('repeatability-factor-units').style.display = 'none'
    document.getElementById('repeatability-upper-units').style.display = 'none'
    document.getElementById('repeatability-lower-units').style.display = 'none'
}