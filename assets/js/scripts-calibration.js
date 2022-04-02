//Calibration calculations

let calibrationCalculateButton = document.getElementById('submit-calibration')

calibrationCalculateButton.addEventListener('click', getValuesCalibration)

function getValuesCalibration() {

    let calibrationRunTime1 = parseFloat(document.getElementById('calibration-run-time-1').value)
    let calibrationRunTime2 = parseFloat(document.getElementById('calibration-run-time-2').value)
    let calibrationConstant = parseFloat(document.getElementById('calibration-constant').value)

    let runTime1 = document.getElementById('calibration-run-time-1')
    let runTime2 = document.getElementById('calibration-run-time-2')
    let constant = document.getElementById('calibration-constant')
    let calibrationFluidViscosity = document.getElementById('calibration-fluid-viscosity')

    if(runTime1.value === '' || runTime2.value === '') {
        alert('Please enter two run-times')
    }
    else if (constant.value === '') {
        alert('Please enter a constant')
    }
    else if (calibrationFluidViscosity.value === '') {
        alert('Please enter a calibration fluid viscosity')
    }
    else {
        console.log(`run time 1 is ${calibrationRunTime1}`)
        console.log(`run time 2 is ${calibrationRunTime2}`)
        console.log(`the viscometer constant is ${calibrationConstant}`)

        calculateCalibration(calibrationRunTime1, calibrationRunTime2, calibrationConstant)
    }

    

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
    document.getElementById('calibration-average-run-time-units').style.display = 'inline'
    document.getElementById('calibration-average-viscosity').textContent = averageViscosity
    document.getElementById('calibration-average-viscosity-units').style.display = 'inline'

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

    document.getElementById('calibration-viscosity-range-units').style.display = 'inline'
    
    percentageDifference(calibrationFluidViscosity, averageViscosity, toleranceBand)
}

function percentageDifference(calibrationFluidViscosity, averageViscosity, toleranceBand) {
    //percentage difference calculation not working 
    console.log(`the calibration fluid viscosity is ${calibrationFluidViscosity}`)
    console.log(`the average viscosity is ${averageViscosity}`)
    
    let numerator = calibrationFluidViscosity - averageViscosity
    numerator = Math.abs(numerator)

    console.log(`the numerator is ${numerator}`)

    let denominator = ((calibrationFluidViscosity / 2) + (averageViscosity / 2))
    
    denominator = Math.abs(denominator)
    console.log(`the denominator is ${denominator}`)

    let percentageDifference = (numerator / denominator) * 100
    
    console.log(`the percentage difference is ${percentageDifference}`)

    document.getElementById('calibration-percentage-difference').textContent = percentageDifference
    document.getElementById('calibration-percentage-difference-units').style.display = 'inline'

    percentageDifferenceChecker(percentageDifference, toleranceBand)
}

function percentageDifferenceChecker(percentageDifference, toleranceBand) {

    if(percentageDifference <= toleranceBand) {
        document.getElementById('calibration-output').innerHTML = `
        <i class="fas fa-check icon"></i>
        <span>The percentage difference is less than or equal to the tolerance band. The viscometer passes the calibration check</span>
        `
    }
    else if(percentageDifference > toleranceBand) {
        document.getElementById('calibration-output').innerHTML = `
        <i class="fas fa-xmark icon"></i>
        <span>The percentage difference is greater than the tolerance band. The viscometer fails the calibration check</span>
        `
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

    document.getElementById('calibration-average-run-time-units').style.display = 'none'
    document.getElementById('calibration-average-viscosity-units').style.display = 'none'
    document.getElementById('calibration-viscosity-range-units').style.display = 'none'
    document.getElementById('calibration-percentage-difference-units').style.display = 'none'
}