
Something to consider or explain - How did I make the decision whether to use the raw values or the toPrecision values in the calculations?
On one hand - the raw values are more accurate and not subject to incremental rounding errors, so would match what GLIMS calculates
On the other hand, the entire point of the project is to make the calculations visible to the user so that they can trust it
That means using the precise outputs so that they match what the user would generate on a calculator

Ultimately, this shouldn't matter as long as I can justify it per above


# Viscosity Calculator

# Code Institute Portfolio Project 2: User-centric interactive front-end site using HTML, CSS and JS

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Background](#background)
- [Scope](#scope)
- [Audience](#audience) 
- [User Stories](#user-stories)
- [Wireframes](#wireframes)
    - [Initial Wireframes](#initial-wireframes)
    - [Final Wireframes](#final-wireframes)
- [Function](#function)
- [Features](#features)
    - [User feedback](#user-feedback)
- [Design Choices](#design-choices)
- [Accessibility](#accessibility)
- [Code explanations](#code-explanations)
- [Future Work](#future-work)
- [Bugs](#bugs)
- [Technologies](#technologies)
- [Deployment](#deployment)
    - [How this project was deployed](#how-this-project-was-deployed)
    - [How other users can work on this project](#how-other-users-can-work-on-this-project)
        - [Direct access](#direct-access)
        - [Template](#template)
        - [Local clone](#local-clone)
        - [Collaboration](#collaboration)
        - [Development preview browser](#development-preview-browser)
- [Testing](#testing)
    - [Testing User Stories](#testing-user-stories)
    - [Testing Functionality](#testing-functionality)
    - [Testing on different devices](#testing-on-different-devices)
    - [Testing code](#testing-code)
- [Credits](#credits)
    - [Code](#code)
    - [Acknowledgements](#acknowledgements)

# Background

By training and profession, I am a chemist. I have a first-class honours degree in chemistry and have worked in laboratories for all of my career. My current position is with Intertek, testing all manner of petrochemical products - lubricating oils, additives and crude oils. 

My informal specialty within my team is in the analysis of viscosity, and I do the vast majority of viscosity tests that we are contracted to perform. 

Broadly speaking, viscosity is a measurement of how well a fluid material resists flow - a higher viscosity means that the fluid has a greater resistance to flow, and a lower viscosity means that the fluid has a lesser resistance to flow. Honey, for example, is a fluid of relatively high viscosity, whereas water is a fluid of very low viscosity. Invert a jar of honey, and it will take a long time to flow out, whereas if you invert a cup of water, it will pour out immediately. 

Viscosity isn't a loose definition - it can be measured with great accuracy in laboratories by several different means, and at different temperatures. The most common measurement that I do in my professional life is that of kinematic viscosity, which is essentially the resistance to flow under gravity. 

In commercial laboratories, the procedures for the making of measurements (any measurement, not just viscosity) are laid down in industry standard test methods that are written, published and reviewed by standards organisations. In my line of work, two of the best-regarded standards organisations are the American Society for Testing and Materials (ASTM) and the Institute of Petroleum (IP), now the Energy Institute (EI). Both organisations publish standard test methods for the measurement of kinematic viscosity. These are the ASTM D445 and the IP 71 methods, though both are functionally equivalent. 

Both of these methods state that kinematic viscosity is to be measured by a means of a glass instrument called a viscometer, and several different designs are available based on particular requirements, though the most common are the Ubbelohde type and the Zeitfuchs cross-arm type. Images are below. The Ubbelohde type consists of a reservoir that holds the fluid, a bulb with timing marks and a capillary (a thin tube, essentially) through which the fluid flows. By means of a vacuum, the fluid is drawn from the reservoir through the capillary and into the bulb. When the vacuum is released, the fluid begins to drain back down through the capillary. When the fluid front drains past the first timing mark, a stop-watch or timer is started, and when the fluid front drains past the second timing mark, the timer is stopped. 

The Zeitfuchs cross-arm type consists of the same features, except that the reservoir sits above the bulb, and the fluid is drawn forwards by vacuum through the capillary. When the fluid passes the first timing mark, a timer is started and when the fluid passes the second mark, it is stopped. Whereas a fluid in the Ubbelohde type can be tested repeatedly, the Zeitfuchs type is a 'one-shot' viscometer, though this makes it useful for extremely dark fluids such as crude oils that would obscure the timing marks on an Ubbelohde viscometer. 

The time elapsed between when the fluid passes the first timing mark to when it passes the second timing mark is referred to variously - run-time is the most common, but drop-time and determination are also used. The methods specify that only run-times of between 200 and 900 seconds are valid - 200 because less than this means that the fluid is draining too fast for the scientist to start and stop the timer, and 900 seconds because spending more than 15 minutes to acquire a run-time is inefficient, and indicates that a larger viscometer may be safely used. 

This run-time is multiplied by a constant that is unique to each viscometer, and this produces a kinematic viscosity value. Viscometers come in standard sizes - 0C, 1, 1C, 2, 2C, 3, 3C, 4 and 4C, the constants increasing by a factor of 3 at each size - 0C's have the smallest constants, on the order of 0.003, 1's have constants on the order of 
0.01, etc. 4Cs have the largest constants, on the order of 30.00.  

However, one kinematic viscosity isn't sufficient, and both of the above methods specify that two such measurements must be made. These two measurements are then averaged. As with many scientific calculations, kinematic viscosity has a unit, and this is millimeters squared per second - **mm^2/s**. A more common unit is the centi-Stoke, **cSt**, and the two are equivalent - 1 mm^2/s = 1 cSt.

At this point, you may be wondering as to the purpose of this project - multiplication and averaging are simple mathematical operations that don't require an entire website to do, surely? A pocket calculator could be used, as could Excel formulas. 

This is indeed true. However, the methods specify that not just any two kinematic viscosities can be used for the final averaging calculation - they need to be close enough that they are approximately the same, and hence that the final averaged value is a good representation of the actual viscosity of the fluid. For example, say you measured two kinematic viscosities of 100 cSt and 80 cSt. The final averaged value would be 90, which is nowhere near either value, and could hence mislead the client. 

To check whether the two values that have been obtained are close enough, the methods contain a series of calculations for different fluid types that specify a concept called determinability. These calculations effectively define a band within whose limits the two measured kinematic viscosities must fall. Kinematic viscosities that meet this criterion are said to be 'determinable', and hence valid for reporting to the client. 

The methods also specify several other calculations - repeatability, reproducibility, calibration and recalibration. Repeatability and reproducibility are concerned with repeat measurements of viscosity - by the same laboratory and by a different laboratory respectively. These calculations are as involved and time-consuming as the determinability calculations. 

The calibration calculations are concerned with ensuring that viscometers will produce the same result over year after year, since a well-maintained viscometer can stay in service for decades. Typically, viscometers are tested with calibration fluids of known viscosity every year, and the objective is to see if the viscosity calculation produces a result that matches the known viscosity of the calibration fluid to within a certain percentage difference.

The recalibration calculations are concerned with adjusting a viscometer's constant depending on the gravity experienced at the testing laboratory's location (Earth's gravity does vary by as much 0.5% depending on latitude, which is a large margin in scientific terms). 

These calculations aren't particularly complex, but they do add several extra steps when checking and reporting a result, and require the scientist to carry around a calculator and a notepad, to remember or be able to easily reference the different calculations, and to have the time to perform them. This is an extra hassle that I reckon can be done away with using this tool. 

# Scope

The scope of this project is to automate as much as possible all of the calculations involved in the ASTM D445 and IP 71 kinematic viscosity methods - determinability, repeatability, reproducibility, calibration and recalibration. All the user should have to do is input the required data - tun-times, constants, viscosities, etc. The tool will then use a series of functions to perform all of the calculations, display the results of these calculations and then display a final message indicating the output - whether two results are determinable, whether a viscometer passes a calibration check, etc. Since it is common for commercial scientists to use their personal smartphones in their laboratories for their calculator apps, this tool should be fully useable and responsive on a smartphone. 

# Audience

This tool is designed wholly for professional scientists in commercial petrochemical laboratories who perform kinematic viscosity tests. I stress that it is conceived of as a tool rather than an interactive website. As it is designed for work purposes, styling is minimal, with the main positive aspects of the User Experience delivered via the logic and calculations. 

# User stories

First-time users must be able to determine the purpose of the tool as soon as they navigate to it. 

The tool must include a selector to allow the user to select the fluid type that their sample is, and this selection must be referenced in the functions that are executed so that the correct calculations are made

The tool must include a page with some information on how to set the selector to the fluid type that matches their sample 

The above page should either open a new tab, or include an internal link to take the user back to the main page so that they don't have to user their browser butttons. 

The tool must have clear calls to action to input the data required for the calculation that has been selected

The tool must have a clear call to action to submit their inputs and begin the calculations

The tool must display all calculation outputs so that the user is reassured of the tool's accuracy and can follow along performing the calculations manually if they desire

The tool's functions must produce the same calculation outputs as manual calculations would (i.e. no difference between the tool and the user doing the same calculations manually)

The tool must have a function to clear the user's inputs so that other calculations of the same type can be performed

The tool must have a clear final output informing the user of the result of their calculations. 

# Wireframes

## Initial Wireframes

### Desktop

![Index - suspended flow](assets/wireframes/index-suspended-flow.png)
<br>
Since this is more of a tool than a website, I thought that the input form and calculations were best placed directly on the index page, rather than on a dedicated page that required internal navigation 
<br>
<br>
![Index - reverse flow](assets/wireframes/index-reverse-flow.png)
<br>
This is how the tool will appear if the selector is set to a Zeitfuchs cross-arm viscometer test, with two run-time inputs and two constant inputs
<br>
<br>
![Discussion](assets/wireframes/discussion.png)
<br>
This is the discussion page that guides the user on how to set the selector to the correct option based on their sample type
<br>

### Smartphone

![Index - suspended flow](assets/wireframes/index-suspended-flow-mobile.png)
<br>
The index page as it designed to look on a smartphone
<br>
<br>
![Index - reverse flow](assets/wireframes/index-reverse-flow-mobile.png)
<br>
This is how the tool will appear if the selector is set to a Zeitfuchs cross-arm viscometer test, with two run-time inputs and two constant inputs
<br>
<br>
![Discussion](assets/wireframes/discussion-mobile.png)
<br>
This is the discussion page that guides the user on how to set the selector to the correct option based on their sample type
<br>

## Final Wireframes

### Desktop

### Smartphone

# Function

# Features

# Design Choices

# Accessibility

# Code Explanations

## Logic Flows

When coding the Love Maths walkthrough project, I found it useful to note down what I call the 'logic flow', that is - how the functions interact with each other. Since this project is significantly more complex and involves many obscure scientific and technical terms, a similar addition could be useful for readers without such a technical background. 

### Calculation selector logic

Uses an event listener to listen for changes to the option selected in the drop-down menu, then calls a function called selectCalculation

Depending on the selected option element's value attribute, an IF/ELSE IF statement triggers

Each statement uses CSS style rule manipulation to set the display rule of each calculation article. The option corresponding to the article is set to display: block, and the other articles are set to display: none

Since the most common calculation will be that of determinability, this calculation article is visible by default. 

### Determinability logic

Firstly, two event listeners listen for a click on the Ubbelohde and Zeitfuchs buttons. Depending on the user's choice, either the ubbelohdeConstant or zeitfuchsConstant functions are invoked, which insert either one or two number inputs for the viscometer constants, and hide the number inputs inserted by the other function. 

Each of these functions then calls a getValues function, which retrieves the values of the input elements, logs them to the console, and then calls a calculate function, passing in the run-times and constants as arguments. The function will stop the execution if no selection has been made in the drop-down menu. 

The calculate functions calculate the viscosities, round them using the toPrecision method, log these outputs to the console, post them to the index.html page, and call a final function, passing in the unrounded viscosities as arguments.

The final functions average the viscosities, round them using the toPrecision method, log these outputs to the console, post them to the index.html page and call the determinability function, passing in the raw viscosities and averaged viscosity as arguments. 

The determinability function reads the value of option selected in the sample type drop-down menu, then uses a SWITCH statement to provide cases for each selection. In some cases, where different sample types share the same determinability equation, one case statement is used for multiple sample types. 

Each case statement calculates the determinability factor (the output of the determinability equation), rounds it using the toPrecision method and logs the determinability factor and determinability equation being used to the console

The function then posts the determinability equation and the rounded determinability factor to the index.html page, and logs the rounded determinability to the console. The function then calls the upperLimit function, passing in the raw viscosities, averaged viscosity and determinability factor as arguments

The upperLimit function adds the determinability factor to the final viscosity to calculate the upper limit of the allowed viscosity range, rounds the upper limit, logs it to the console and posts it to the index.html page. The function then invokes the lowerLimit function, passing in the raw viscosities, averaged viscosity, determinability and upper limit as arguments. 

The lowerLimit function calculates the lower limit of the allowed viscosity range and does the same operations as above. The function then invokes a checker function, passing in the raw viscosities, averaged viscosity and upper and lower limits as arguments

The checker function checks whether the raw viscosities lie within the band defined by the upper and lower limits. If so, it will post a message to the page telling the user that the viscosities are determinable. If the raw viscosities fall outside the limits, a message will be posted telling the user that their viscosities are not determinable

The user may then click the reset button. This is tied to an event listener that listens for this button being clicked. When clicked, a function is called that sets the text content and values to empty strings and then focuses on the run-time 1 input, effectively readying the tool for further determinability checks

### Repeatability logic

Firstly, the user must enter the two viscosities they wish to compare. When the calculate button is clicked, an event listener calls a function to retrieve the entered viscosities, calculate the average viscosity, round it, log these values to the console, then post the rounded average viscosity to the page. 

The function then invokes a large function that calculates the repeatability factor of the average viscosity based on the selection made in the drop-down menu. This is accomplished through a large SWITCH statement that calculates the repeatability, rounds it, and logs the repeatability equation and unrounded repeatability factor to the console. 

The repeatability function then posts the repeatability equation being used and the rounded repeatability to the page, and logs the rounded repeatability to the console. 

The function then calls the repeatabilityUpperLimit function, passing in the raw viscosities, average viscosity and repeatability factor as arguments. 

The repeatabilityUpperLimit function calculates the upper limit, rounds it, the logs that value and posts it to the page. It then calls the repeatabilityLowerLimit function, passing in the raw viscosities, average viscosity, repeatability factor and upper limit as arguments. 

The repeatabilityLowerLimit function calculates the lower limit, rounds it, the logs that value and posts it to the page. It then calls the repeatability checker function, which checks whether the viscosities fall within the upper and lower limits, then posts a message informing the user of the outcome. 

The user can then click a reset button that is tied to an event listener that calls a function that sets the inputs and outputs to empty strings, and focuses on the viscosity 1 input, readying the tool for further use

### Reproducibility logic

Firstly, the user must enter the two viscosities they wish to compare. When the calculate button is clicked, an event listener calls a function to retrieve the entered viscosities, calculate the average viscosity, round it, log these values to the console, then post the rounded average viscosity to the page. 

The function then invokes a large function that calculates the reproducibility factor of the average viscosity based on the selection made in the drop-down menu. This is accomplished through a large SWITCH statement that calculates the reproducibility, rounds it, and logs the reproducibility equation and unrounded reproducibility factor to the console. 

The reproducibility function then posts the reproducibility equation being used and the rounded reproducibility to the page, and logs the rounded reproducibility to the console. 

The function then calls the reproducibilityUpperLimit function, passing in the raw viscosities, average viscosity and reproducibility factor as arguments. 

The reproducibilityUpperLimit function calculates the upper limit, rounds it, the logs that value and posts it to the page. It then calls the reproducibilityLowerLimit function, passing in the raw viscosities, average viscosity, reproducibility factor and upper limit as arguments. 

The reproducibilityLowerLimit function calculates the lower limit, rounds it, the logs that value and posts it to the page. It then calls the reproducibility checker function, which checks whether the viscosities fall within the upper and lower limits, then posts a message informing the user of the outcome. 

The user can then click a reset button that is tied to an event listener that calls a function that sets the inputs and outputs to empty strings, and focuses on the viscosity 1 input, readying the tool for further use

### Calibration logic

The Calibration functionality requires that the user enter their run-times, viscometer constant and the viscosity of the calibration fluid used in the test. The calculate button is tied to an event listener that listens for a click. It then calls a function called getValuesCalibration, which retrieves the values of the run-time and constant inputs. A function called calculateCalibration is then called, with the retrieved inputs passed as arguments. 

The calculateCalibration function calculates the viscosities, the average run-time and the average viscosity, logs each of these to the console and posts the average run time and average viscosity to the page. A function called toleranceBand is then called

The toleranceBand function uses a SWITCH statement to check the value of the calibration fluid viscosity, which determines the tolerance band. The tolerance band and allowed percentage difference are then posted to the page. The function then calls the percentageDifference function, passing in the average viscosity, calibration fluid viscosity and tolerance band as arguments. 

The percentageDifference function calculates the percentage difference between the viscosity measured by the scientist and the viscosity of the calibration fluid. This function then calls the percentageDifferenceChecker function, passing in the tolerance band and percentage difference as arguments. 

The percentageDifferenceChecker function checks whether the percentage difference is less than or greater than the tolerance band. If the percentage difference is less than or equal to the tolerance band, the calibration check has passed, and a message is posted to that effect. If the percentage difference is greater than the tolerance band, the calibration check has failed and a message is posted to that effect. 

A reset button that is tied to a click event listener empties the input and output fields and resets the tool for further use. 

### Recalibration logic

The viscometer constant recalibration function requires that the user input the constant of the viscometer they wish to recalibrate, the gravity of the testing laboratory and the gravity at the standardisation laboratory. When the calculate button is clicked, an event listener calls the recalibrationPercentageDifference function. 

The recalibrationPercentageDifference function retrieves those values, and calculates the percentage difference between the two supplied gravities. These values are logged to the console, and the rounded percentage difference is posted to the page. This function then calls the recalibrationFunction function. 

The recalibrationFunction function checks whether the percentage difference is greater than 0.1%. If so, the function will then calculate a new constant for the viscometer, which is then rounded to 4 significant figures, as all constants are to 4SF. If not, the no recalibration takes place, since the method specifies that this is not necessary. 

The user can then click a reset button, which is tied to a click event listener, which calls a function to empty the inputs and outputs. 

# Future work

This project has great scope for future work. 

Firstly, a function could be added that exports all of the inputted and calulated data to an Excel spreadsheet so that permanent electronic records can be kept

Secondly, a database of sorts could be added that stores all viscometer serial numbers and constants. Serial numbers are simple and unique, whilst constants can be more difficult to remember. The user could, instead of entering a constant, merely select the serial number of the viscometer they used and the tool would populate the cell with the constant for use in the calculations. This would tie in with the above

The tool could be expanded greatly to handle the calculations involved in other industrial methods, such as ASTM D2896 Total Base Number. 

# Bugs

A large and annoying bug was encountered when trying to change the text displayed in the "determinability-equation" div and when performing the calculation in the "determinability-factor" div. This text and equation output change is governed by the user's selection from the drop-down menu. It was observed through console.log commands that the code was not using the loop's IF/ELSE statements to discriminate based on the drop-down menu selection, but was actually trying to execute all of the options. I was using the onchange event listener in the select element, but it only seemed to be firing once. This was eventually solved with help from Tutor Support, who recommended removing the loop. The reasoning for initially using a loop was that the Love Maths walkthrough project involves the use of loop to respond to the user's mathematical operation selection.

A bug was noticed during routine testing after adding JavaScript and HTML to unhide units when performing the calculations, and then hide the units again when the reset button is pressed. This bug related to the calibration and recalibration calculations, which used a percentage difference calculation operation as part of the function. The function appeared to be concatenating the input values as strings, which produced wildly inaccurate output values. 

This next entry isn't so much a bug, but should serve to illustrate how to the project developed over time. For each of the determinability, repeatability and reproducibility, initially two large IF/ELSE statements in separate functions were used to perform those calculations. The first function displayed the calculation that was to be used to the user. The second function performed the calculations and inserted the results into HTML elements. Further functions to calculate the upper and lower limits would take their input values from the HTML elements, perform the calculations and post the results. I realised that this could lead to calculation errors, since I was rounding with the toPrecision method each time the functions retrieved and posted the numbers. This was caused by the inability of IF/ELSE statements to declare or modify variables outside of the statements. I refactored the code, and replaced the two large IF/ELSE functions with a single large SWITCH statement, which allowed me to declare and modify variables which can then be passed directly into further functions. This prevents calculation rounding errors, and generally simplifies the code. 

# Technologies

Github

Gitpod

Slack

ASTM Compass

Balsamiq

Font Awesome

Lighthouse

# Deployment

# Testing

## Testing User Stories

**First-time users must be able to determine the purpose of the tool as soon as they navigate to it.** 

**The tool must include a selector to allow the user to select the fluid type that their sample is, and this selector must change that functions that are executed so that the correct calculations are made**

**The tool must include a page with some information on how to set the selector to the fluid type that matches their sample**

**The above page should either open a new tab, or include an internal link to take the user back to the main page so that they don't have to user their browser butttons.**

**The tool must have clear calls to action to input the user's run-times and viscometer constant(s)**

The tool contains instructions at the top of the page that guide the user through the process, and the input elements are clearly labelled

**The tool must have a clear call to action to submit their inputs and begin the calculations**

The tool has a prominent submit button that is displayed once the user selects their viscometer type

**The tool must display all calculation outputs so that the user is reassured of the tool's accuracy and can follow along performing the calculations manually if they desire**

The calculations are done step-by-step in small functions, with the outputs displayed in labelled boxes

**The tool's functions must produce the same calculation outputs as manual calculations would (i.e. no difference between the tool and the user doing the same calculations manually)**

(Still needs to be checked once the tool is fully working - JS's base 2 counting system may introduce small errors with floating point numbers)

**The tool must have a function to clear the user's inputs so that other tests of different fluids with different viscometers can be checked**

(still needs implementing)

**The tool must have a clear final output informing the user whether their run-times produce determinable kinematic viscosities**

(A text message displays currently, it is envisioned that a large green tick for success and a large red cross for failure )

## Testing various inputs

Need to test the full range of run-times - 200s to 900s, and the full range of viscometer constants - 0.003 to 30.60

### Determinability calculations

### Repeatability calculations

### Reproducibility calculations

### Calibration calculations

### Recalibration calculations

## Testing Edge Cases

Edge cases are rare events that are just within the scope of the tool. Might be useful to test functionality when run-times fall outside bounds - <200s and >900s with the smallest and largest constants respectively, so that even if run-times are invalid, determinability isn't necessarily invalid. (think hexane at 20C that is too fast in a 0C and super-viscous additives at 40C in a 4C)

### Testing determinability calculations with run-times of less than 200 seconds and the smallest viscometer constant (replicating ultra-low viscosity samples at high temperatures)

### Testing determinability calculations with run-times of greater than 900 seconds and the largest viscometer constant (replicating hyper-viscous samples at low temperatures)

### Testing recalibration calculations with significantly differing gravities

## Unit Tests

# Credits

Ed Bradley from Tutor Support, who provided invaluable guidance on the conditional logic for the displayDeterminabilityFactor and determinabilityFactor functions, and on how to correctly get the value of input elements. This method was used to construct the functions for the repeatability and reproducibility calculations. Ultimately, I moved away from the suggested approach to use SWITCH statements, but the suggested approach provided a working first draft that allowed the project to progress. 

## Resources

Setting a select element to blank by default: https://stackoverflow.com/questions/8605516/default-select-option-as-blank





