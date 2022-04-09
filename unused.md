Firsly the user must make a selection from the sample-type drop-down menu.

Secondly, the user must enter the two final calculated viscosities they wish to compare. When the calculate button is clicked, an event listener invokes the averageViscosityReproducibility function. This function checks if the user has made a selection from the drop-down menu and if the viscosity inputs have values in them. If the inputs are empty or if a valid selection has not been made, the user is alerted. 

If the inputs are valid, the function retrieves the entered viscosities and averages them to calculate the average viscosity. The average viscosity is then rounded using the toPrecision method, and then inserted into a span element. This span element has a paragraph element and a span element as siblings, which contain the label and the units respectively. These are initially hidden, and are revealed when the average viscosity is inserted. The unrounded average viscosity is also inserted into a hidden calculation details element. 

The averageViscosityReproducibility function then invokes the reproducibility function, passing in the retrieved viscosities and unrounded average viscosity as arguments.

The reproducibility function reads the value of the selection made in the drop down menu and then uses a SWITCH statement to provide cases for each selection. Each case statement applies a reproducibility equation to the average viscosity to calculate the reproducibility factor, which is then rounded using the toPrecision method. The function then inserts the reproducibility equation that was used and the rounded reproducibility factor into span elements. As above, labels and units contained in sibling spans and paragraphs are unhidden when the values are inserted. The unrounded reproducibility factor is added to the hidden calculation details element. 

The reproducibility function then calls the reproducibilityUpperLimit function, passing in the final calculated viscosities, unrounded average viscosity and unrounded reproducibility factor as arguments. 

The reproducibilityUpperLimit function adds the reproducibility factor to the average viscosity to calculate the upper limit of the allowed viscosity range. The upper limit is rounded using the toPrecision method and then inserted into a span element. At the same time, the sibling elements containing the label and units are unhidden. The unrounded upper limit is added to the hidden calculation details element. 

The reproducibilityUpperLimit function then invokes the reproducibilityLowerLimit function, passing in the final calculated viscosities, average viscosity, reproducibility factor and upper limit as arguments. 

The lowerLimit function calculates the lower limit of the allowed viscosity range by subtracting the reproducibility from the average viscosity. The lower limit is rounded using the toPrecision method and then inserted into a span element. At the same time, the sibling elements containing the label and units are unhidden. The unrounded lower limit is added to the hidden calculation details element. 

The reproducibilityLowerLimit function then invokes the reproducibilityChecker function, passing in the final calculated viscosities, unrounded average viscosity and unrounded upper and lower limits as arguments.

The reproducibilityChecker function checks whether both of the final calculated viscosities are both greater than the lower limit and less than the upper limit. If so, it will post a message to the page telling the user that the viscosities are reproducible, along with a tick icon. If the viscosities fail this test, a message will be posted telling the user that their viscosities are not reproducible, along with a cross icon. No matter the output, the reproducibilityChecker function will reveal the calculation details button. 

This button is tied to an event listener. When clicked, the reproducibilityDetails function is invoked, which unhides the calculation details element and displays all of the unrounded values that have been inserted into the element. 

The user may then click the reset button, which is tied to an event listener. When clicked, the reset function is invoked, which sets the text content of all output elements to empty strings and hides the elements containing the units and labels. The values of all input elements are also set to empty strings, and the user is focused on the viscosity 1 input, effectively readying the tool for further reproducibility checks. 