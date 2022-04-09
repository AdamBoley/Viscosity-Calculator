let recalibrationButton = document.getElementById('submit-recalibration')
recalibrationButton.addEventListener('click', recalibrationPercentageDifference)

function recalibrationPercentageDifference() {

    let viscometerConstant = document.getElementById('recalibration-constant')
    let gravity1 = document.getElementById('testing-lab-gravity')
    let gravity2 = document.getElementById('standardisation-lab-gravity')

    if(viscometerConstant.value === '') {
        alert('Please enter a viscometer constant')
    }
    else if(gravity1.value === '') {
        alert('Please enter the gravity at the testing laboratory')
    }
    else if(gravity2.value === '') {
        alert('Please enter the gravity at the standardisation laboratory')
    }
    else {
        let testingGravity = parseFloat(document.getElementById('testing-lab-gravity').value)
        let standardisationGravity = parseFloat(document.getElementById('standardisation-lab-gravity').value)
        let constant = parseFloat(document.getElementById('recalibration-constant').value)

        let numerator = testingGravity - standardisationGravity
        numerator = Math.abs(numerator)

        let denominator = (testingGravity / 2) + (standardisationGravity / 2)

        let percentageDifference = (numerator / denominator) * 100
        let precisePercentageDifference = percentageDifference.toPrecision(4)

        document.getElementById('recalibration-percentage-difference-label').style.display = 'block'
        document.getElementById('recalibration-percentage-difference').textContent = precisePercentageDifference
        document.getElementById('recalibration-percentage-difference-units').style.display = 'inline'

        recalibrationFunction(percentageDifference, testingGravity, standardisationGravity, constant)
    }
}

function recalibrationFunction(percentageDifference, testingGravity, standardisationGravity, constant) {

    if(percentageDifference > 0.1) {
        let newConstant = (standardisationGravity / testingGravity) * constant
        let preciseNewConstant = newConstant.toPrecision(4)
        document.getElementById('recalibration-new-constant-label').style.display = 'block'
        document.getElementById('recalibration-new-constant').textContent = preciseNewConstant
        document.getElementById('recalibration-new-constant-units').style.display = 'inline'
    }
    else {
        document.getElementById('recalibration-new-constant-label').style.display = 'block'
        document.getElementById('recalibration-new-constant').textContent = 'the difference between the two gravities does not warrant recalibration of the viscometer'
    }
}

let recalibrationResetButton = document.getElementById('recalibration-reset')
recalibrationResetButton.addEventListener('click', recalibrationReset)

function recalibrationReset() {
    document.getElementById('recalibration-constant').value = ''
    document.getElementById('testing-lab-gravity').value = ''
    document.getElementById('standardisation-lab-gravity').value = ''
    
    document.getElementById('recalibration-percentage-difference-label').style.display = 'none'
    document.getElementById('recalibration-percentage-difference').textContent = ''
    document.getElementById('recalibration-new-constant-label').style.display = 'none'
    document.getElementById('recalibration-new-constant').textContent = ''

    document.getElementById('recalibration-percentage-difference-units').style.display = 'none'
    document.getElementById('recalibration-new-constant-units').style.display = 'none'
}