let recalibrationButton = document.getElementById('submit-recalibration')

recalibrationButton.addEventListener('click', recalibrationPercentageDifference)

function recalibrationPercentageDifference() {
    //percentage difference calculation not working
    let testingGravity = parseFloat(document.getElementById('testing-lab-gravity').value)
    let standardisationGravity = parseFloat(document.getElementById('standardisation-lab-gravity').value)
    let constant = parseFloat(document.getElementById('recalibration-constant').value)

    console.log(`the gravity at the testing lab is ${testingGravity}`)
    console.log(`the gravity at the standardisation lab is ${standardisationGravity}`)
    console.log(`the constant of the viscometer is ${constant}`)

    let numerator = testingGravity - standardisationGravity
    numerator = Math.abs(numerator)

    console.log(numerator)

    let denominator = (testingGravity / 2) + (standardisationGravity / 2)

    console.log(denominator)

    let percentageDifference = (numerator / denominator) * 100
    let precisePercentageDifference = percentageDifference.toPrecision(4)

    document.getElementById('recalibration-percentage-difference').textContent = precisePercentageDifference
    document.getElementById('recalibration-percentage-difference-units').style.display = 'inline'
    console.log(`the percentage difference is ${precisePercentageDifference}`)

    recalibrationFunction(percentageDifference, testingGravity, standardisationGravity, constant)
}

function recalibrationFunction(percentageDifference, testingGravity, standardisationGravity, constant) {

    if(percentageDifference > 0.1) {
        let newConstant = (standardisationGravity / testingGravity) * constant
        let preciseNewConstant = newConstant.toPrecision(4)
        console.log(`the new constant of the viscometer is ${preciseNewConstant}`)
        document.getElementById('new-constant').textContent = preciseNewConstant
        document.getElementById('recalibration-new-constant-units').style.display = 'inline'
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

    document.getElementById('recalibration-percentage-difference-units').style.display = 'none'
    document.getElementById('recalibration-new-constant-units').style.display = 'none'
}