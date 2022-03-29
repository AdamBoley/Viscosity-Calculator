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

        document.getElementById('reproducibility-output').innerText = 'Your viscosities are repeatable'
    }

    else {
        document.getElementById('reproducibility-output').innerText = 'Your viscosities are not repeatable'
    }
}