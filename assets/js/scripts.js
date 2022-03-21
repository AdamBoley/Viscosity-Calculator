/**document.addEventListener("DOMContentLoaded", function() {

    let options = document.getElementsByTagName('option')

    for(let option of options) {

        option.addEventListener('change', function(){

            if(this.getAttribute('data-type') === "suspended") {

                alert("you clicked suspended")

                document.getElementById('constants').innerHTML = `
                    <div id="constant-1-div">

                        <p id="constant-1">Constant:</p>
                        <input type="number" id="constant-1-input">

                    </div>`
            }
            else if(this.getAttribute('data-type') === "cross-arm") {

                alert("you clicked cross-arm")

                document.getElementById('constants').innerHTML = `
                    <div id="constant-1-div">

                        <p id="constant-1">Constant 1:</p>
                        <input type="number" id="constant-1-input">
                
                    </div>
                
                    <div id="constant-2-div">
                    
                        <p id="constant-2">Constant 2:</p>
                        <input type="number" id="constant-2-input">
                    
                    </div>`
            }
        
        })

    }
})*/
//Currently not working


function suspendedConstant() {
    let constant = document.getElementById("constants")

    constant.innerHTML = `
        <div id="constant-1-div">

            <p id="constant-1">Constant:</p>
            <input type="number" id="constant-1-input">

        </div>
        `
}

function crossArmConstant() {

    let constants = document.getElementById("constants")

    constants.innerHTML = `
        <div id="constant-1-div">

            <p id="constant-1">Constant 1:</p>
            <input type="number" id="constant-1-input">
    
        </div>
    
        <div id="constant-2-div">
        
            <p id="constant-2">Constant 2:</p>
            <input type="number" id="constant-2-input">
        
        </div>
        `
}