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