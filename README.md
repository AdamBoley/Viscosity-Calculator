
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
    - [Testing site functionality](#testing-site-functionality)
    - [Testing Calculation functions](#testing-calculation-functions)
        - [Determinability](#determinability-calculations)
        - [Repeatability](#recalibration-calculations)
        - [Reproducibility](#reproducibility-calculations)
        - [Calibration](#calibration-calculations)
        - [Recalibration](#recalibration-calculations)
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

More specifically, the tool is designed for use by myself and my colleagues at Intertek. 

# User stories

First-time users must be able to determine the purpose of the tool as soon as they navigate to it

The tool must include a selector to allow the user to choose the calculation they want to conduct

The tool must include a selector to allow the user to select the fluid type that their sample is, and this selector must change that functions that are executed so that the correct calculations are made

The tool must include a page with some information on how to set the selector to the fluid type that matches their sample

The above page should either open a new tab, or include an internal link to take the user back to the main page so that they don't have to user their browser butttons

The tool must have clear calls to action to input the user's data (run-times, constants, gravities, etc)

The tool must have a clear call to action to submit their inputs and begin the calculations

The tool must display all calculation outputs so that the user is reassured of the tool's accuracy and can follow along performing the calculations manually if they desire

The tool's functions must produce the same calculation outputs as manual calculations would (i.e. no difference between the tool and the user doing the same calculations manually)

The tool must have a function to clear the user's inputs so that other tests can be checked

The tool must have a clear final output informing the user of the result of the calculation

# Wireframes

## Initial Wireframes

### Desktop

![Index - suspended flow](assets/images/wireframes/index-suspended-flow.png)
<br>
Since this is more of a tool than a website, I thought that the input form and calculations were best placed directly on the index page, rather than on a dedicated page that required internal navigation 
<br>
<br>
![Index - reverse flow](assets/images/wireframes/index-reverse-flow.png)
<br>
This is how the tool will appear if the selector is set to a Zeitfuchs cross-arm viscometer test, with two run-time inputs and two constant inputs
<br>
<br>
![Discussion](assets/images/wireframes/discussion.png)
<br>
This is the discussion page that guides the user on how to set the selector to the correct option based on their sample type
<br>

### Smartphone

![Index - suspended flow](assets/images/wireframes/index-suspended-flow-mobile.png)
<br>
The index page as it designed to look on a smartphone
<br>
<br>
![Index - reverse flow](assets/images/wireframes/index-reverse-flow-mobile.png)
<br>
This is how the tool will appear if the selector is set to a Zeitfuchs cross-arm viscometer test, with two run-time inputs and two constant inputs
<br>
<br>
![Discussion](assets/images/wireframes/discussion-mobile.png)
<br>
This is the discussion page that guides the user on how to set the selector to the correct option based on their sample type
<br>

## Final Wireframes

### Desktop

### Smartphone

# Features

Generally state each aspect of the site - 

## Header and selector

The first feature of the Viscosity Calculator is the header, which contains some introductory text and a drop-down menu. The introductory text indicates the purpose of the tool to a user, and also contains a link to the discussion page. The scripts-calculation-selector.js file contains an event listener that listens for a change in the drop-down menu. Depending on the user's selection, the JavaScript in that file will display the associated calculation article. 

## Calculation articles

The Calculation articles (so named because they are contained within HTML article elements) are the main feature of the Viscosity Calculator. Each is similar, featuring a list containing the instructions for use, number input elements for the user to input their data, and calculation output elements. The calculation outputs are initially hidden, only appearing when the user enters all of the required data and the tool calculates the outputs.

The user-input section contains the input elements where the user enters their data. The user-input section also contains a button labelled Calculate. These Calculate buttons are tied to event listeners. When clicked, the functions invoked by the event listeners take the inputs, do the required calculations and display the results along with result labels.

The calculation outputs contain all of the results of each step of the calculations, so that the user can follow along manually. The final output is a simple message to the user that tells them whether their inputs are valid according to the criteria in ASTM D445. These outputs are rounded using the JavaScript toPrecision method. The tool also contains a button to display the raw, unrounded values to the user, so that the user can be assured that there are no incremental rounding errors. 

Each calculation article also features a reset button that clears the user's inputs and the calculated outputs. This readies that calculation article for further calculations. 

## Determinability Calculation article

The Determinability Calculation article is used for calculating the determinability of viscosity results - that is, checking if they are close enough to be considered valid for reporting. 

The first feature is a drop-down menu. The user selects an option that corresponds to the sample they have tested and want to check results for. If the user is unsure, they can click the link in the instructions list to see the discussion page and use the information to make an informed decision. 

The second feature is a pair of buttons labelled 'Ubbelohde viscometer' and 'Zeitfuchs viscometers', referencing the two types of viscometers used in a typical manual viscosity test. The Ubbelohde button displays two run-time imnputs and a single input for the viscometer constant. The Zeitfuchs button displays two inputs, one for the constant of each of the pair of viscometers used in a Zeitfuchs viscometer test. 

The third feature is the calculation button, with an event listener in the scripts-determinability.js file listening for a click on the button. The Calculations are then executed and the results displays per above.

## Repeatability Calculation article

The Repeatability and Reproducibility Calculation articles are similar, only differing in the calculations that performed. They are used for calculating the repeatability and reproducibility of separate viscosity results - that is, checking if they are close enough to be considered valid replications of each other. Repeatability should apply for results taken in the same laboratory by the same operator, whilst reproducibility applies for results taken by different laboratories. 

The first feature of both is a drop-down menu. The user selects an option that corresponds to the sample they have tested. As above, the instructions for both contain a link to the discussion page so that the user can make an informed decision. 

The second feature is a pair of inputs for the user's viscosities. The third feature is a calculation button and a reset button, which work per above. 

## Calibration Calculation article

The Calibration Calculation article is used for checking the results of calibration tests, which are typically yearly tests on viscometers to make sure that they are still capable of giving the same results. 

This article features two run-time inputs, the constant of the viscometer, and the viscosity of the calibration fluid used in the test, as well as a button to initiate the calculation and another button to reset the inputs and outputs. 

## Recalibration Calculation article

The Recalibration Calculation article is used for adjusting the constant of a viscometer to account for discrepancies between the gravity of the testing laboratory and the gravity of the standardisation laboratory. 

This article features an input for the constant of the viscometer, and two inputs, one for the gravity of the testing lab and another for the gravity of the standardisation lab, as well as a button to initiate the calculation, and another button to reset the inputs and outputs. 

# Function

This section provides a more in-depth explanation of how the Calculation articles described in the Features section work. This is included because when I was coding the Love Maths walkthrough project, I found it useful to note down what I call the 'logic flow', that is - how the functions interact with each other. Since this project is significantly more complex and involves many obscure scientific and technical terms, I felt that a similar addition could be useful for readers without such a technical background. Each sub-section deals with the JavaScript in one of the 6 JS files, and all except the sub-section that explains the scripts-calculation-selector.js file have a flow-chart that provides an easy visual reference. The JavaScript in the scripts-calculation-selector.js file is simple enough that it requires neither much explanation not a flow chart. 

## Calculation selector logic

Uses an event listener to listen for changes to the option selected in the drop-down menu, then calls a function called selectCalculation

Depending on the selected option element's value attribute, an IF/ELSE IF statement triggers

Each statement uses CSS style rule manipulation to set the display rule of each calculation article. The option corresponding to the article is set to display: block, and the other articles are set to display: none

In my experience, the most common calculation is that of determinability, so the determinability calculation article is visible by default. 

## Determinability logic

Firsly the user must make a selection from the sample-type drop-down menu. 

Secondly, two event listeners listen for a click on the Ubbelohde and Zeitfuchs buttons. Depending on the user's choice, either the ubbelohdeConstant or zeitfuchsConstant functions are invoked, which unhide the two run-time inputs, and either one or two number inputs for the viscometer constants, and hide the viscometer constant inputs inserted by the other function. Two buttons are also unhidden - one to initiate the calculation and another to reset the calculation. 

The user must then enter their run-times and constant(s), and then click the calculate button. The calculate button is tied to an event listener, which invokes either the  getValuesUbbelohde or getValuesZeitfuchs function, which retrieves the values of the input elements. If any of the inputs don't have a value or if no selection has been made using the drop-down menu, the functions will alert the user. If all inputs are valid and a valid selection has been made using the drop-down menu, then either the calculateUbbelohde or calculateZeitfuchs function will be invoked, passing in the run-times and constant(s) as arguments.

These functions calculate the kinematic viscosities and then round them using the toPrecision method. The rounded kinematic viscosities are inserted into a span element. These span elements have a paragraph element and another span element as siblings. The sibling span contains the units and the sibling paragraph contains the label. These sibling elements are unhidden when the viscosity value is inserted. 

The unrounded kinematic viscosities are inserted into to a hidden calculation details element. These functions then invoke either the calculateFinalUbbelohde or calculateFinalZeitfuchs functions, passing in the unrounded kinematic viscosities as arguments.

Both the calculateFinalUbbelohde and calculateFinalZeitfuchs average the viscosities and round them using the toPrecision method. The rounded value is inserted into a span elements, which, similar to the above, has a label and units contained in a sibling paragraph and span element respectively. These sibling elements are unhidden when the final calculated viscosity is inserted. The unrounded value is added to the hidden calculation details element

Both the calculateFinalUbbelohde and calculateFinalZeitfuchs functions then invoke the determinability function, passing in the unrounded viscosities and final calculated viscosity as arguments. 

The determinability function reads the value of option selected in the sample type drop-down menu, then uses a SWITCH statement to provide cases for each selection. In some cases, where different sample types share the same determinability equation, one case statement is used for multiple sample types. 

Each case statement applies a determinability equation to the final calculated viscosity to calculate the determinability factor, which is then rounded using the toPrecision method.The function then inserts the determinability equation that was used and the rounded determinability factor into span elements. As above, labels and units contained in sibling spans and paragraphs are unhidden when the values are inserted. The unrounded determinability factor is added to the hidden calculation details element.

The determinability function then invokes the upperLimit function, passing in the unrounded kinematic viscosities, unrounded final calculated viscosity and the unrounded determinability factor as arguments.

The upperLimit function adds the determinability factor to the final calculated viscosity to calculate the upper limit of the allowed viscosity range. The upper limit is rounded using the toPrecision method and then inserted into a span element. At the same time, the sibling elements containing the label and units are unhidden. The unrounded upper limit is added to the hidden calculation details element. 

The upperLimit function then invokes the lowerLimit function, passing in the unrounded viscosities, unrounded final calculated viscosity, unrounded determinability and unrounded upper limit as arguments. 

The lowerLimit function calculates the lower limit of the allowed viscosity range by subtracting the determinability from the final calculated viscosity. The lower limit is rounded using the toPrecision method and then inserted into a span element. At the same time, the sibling elements containing the label and units are unhidden. The unrounded lower limit is added to the hidden calculation details element. 

The lowerLimit function then invokes the checker function, passing in the unrounded viscosities, unrounded final calculated viscosity and unrounded upper and lower limits as arguments.

The checker function checks whether both of the unrounded viscosities are both greater than the lower limit and less than the upper limit. If so, it will post a message to the page telling the user that the viscosities are determinable, along with a tick icon. If the unrounded viscosities fail this test, a message will be posted telling the user that their viscosities are not determinable, along with a cross icon. No matter the output, the checker function will unhide a calculation details button. 

This button is tied to an event listener. When clicked, the determinabilityDetails function is invoked, which unhides the calculation details element and displays all of the unrounded values that have been inserted into the element. 

The user may then click the reset button, which is tied to an event listener. When clicked, the reset function is invoked, which sets the text content of all output elements to empty strings and hides the elements containing the units and labels. The values of all input elements are also set to empty strings, and the user is focused on the run-time 1 input, effectively readying the tool for further determinability checks. 

### Determinabilty logic flow chart

![determinability logic flow chart](assets/images/flow-charts/determinability-flow-chart.drawio.png)

## Repeatability logic

Firsly the user must make a selection from the sample-type drop-down menu.

Secondly, the user must enter the two final calculated viscosities they wish to compare. When the calculate button is clicked, an event listener invokes the averageViscosityRepeatability function. This function checks if the user has made a selection from the drop-down menu and if the viscosity inputs have values in them. If the inputs are empty or if a valid selection has not been made, the user is alerted. 

If the inputs are valid, the function retrieves the entered viscosities and averages them to calculate the average viscosity. The average viscosity is then rounded using the toPrecision method, and then inserted into a span element. This span element has a paragraph element and a span element as siblings, which contain the label and the units respectively. These are initially hidden, and are revealed when the average viscosity is inserted. The unrounded average viscosity is also inserted into a hidden calculation details element. 

The averageViscosityRepeatability function then invokes the repeatability function, passing in the retrieved viscosities and unrounded average viscosity as arguments.

The repeatability function reads the value of the selection made in the drop down menu and then uses a SWITCH statement to provide cases for each selection. Each case statement applies a repeatability equation to the average viscosity to calculate the repeatability factor, which is then rounded using the toPrecision method. The function then inserts the repeatability equation that was used and the rounded repetability factor into span elements. As above, labels and units contained in sibling spans and paragraphs are unhidden when the values are inserted. The unrounded repeatability factor is added to the hidden calculation details element. 

The repeatability function then calls the repeatabilityUpperLimit function, passing in the final calculated viscosities, unrounded average viscosity and unrounded repeatability factor as arguments. 

The repeatabilityUpperLimit function adds the repeatability factor to the average viscosity to calculate the upper limit of the allowed viscosity range. The upper limit is rounded using the toPrecision method and then inserted into a span element. At the same time, the sibling elements containing the label and units are unhidden. The unrounded upper limit is added to the hidden calculation details element. 

The repeatabilityUpperLimit function then invokes the repeatabilityLowerLimit function, passing in the final calculated viscosities, average viscosity, repeatability factor and upper limit as arguments. 

The lowerLimit function calculates the lower limit of the allowed viscosity range by subtracting the repeatability from the average viscosity. The lower limit is rounded using the toPrecision method and then inserted into a span element. At the same time, the sibling elements containing the label and units are unhidden. The unrounded lower limit is added to the hidden calculation details element. 

The repeatabilityLowerLimit function then invokes the repeatabilityChecker function, passing in the final calculated viscosities, unrounded average viscosity and unrounded upper and lower limits as arguments.

The repeatabilityChecker function checks whether both of the final calculated viscosities are both greater than the lower limit and less than the upper limit. If so, it will post a message to the page telling the user that the viscosities are repeatable, along with a tick icon. If the viscosities fail this test, a message will be posted telling the user that their viscosities are not repeatable, along with a cross icon. No matter the output, the repeatabilityChecker function will reveal the calculation details button. 

This button is tied to an event listener. When clicked, the repeatabilityDetails function is invoked, which unhides the calculation details element and displays all of the unrounded values that have been inserted into the element. 

The user may then click the reset button, which is tied to an event listener. When clicked, the reset function is invoked, which sets the text content of all output elements to empty strings and hides the elements containing the units and labels. The values of all input elements are also set to empty strings, and the user is focused on the viscosity 1 input, effectively readying the tool for further repeatability checks. 

### Repeatability logic flow chart

![Repeatability logic flow chart](assets/images/flow-charts/repeatability-flow-chart.drawio.png)

## Reproducibility logic

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

### Reproducibility logic flow chart

![Reproducibility logic flow chart](assets/images/flow-charts/reproducibility-flow-chart.drawio.png)

## Calibration logic

The Calibration functionality requires that the user enter their run-times, viscometer constant and the viscosity of the calibration fluid used in the calinration test. 

The calculate button is tied to an event listener that listens for a click. When clicked, a function called getValuesCalibration is invoked, which retrieves the values of the run-time inputs and the constant input. If any of the inputs (run-times, constant, calibration fluid viscosity) are empty, the user is alerted and the function stops executing. 

A function called calculateCalibration is then invoked, with the retrieved inputs passed as arguments. 

The calculateCalibration function calculates the viscosities by multiplying the run-times by the constant. The average run-time and the average viscosity are also calculated by averaging the run-times and viscosities respectively. The average viscosity is rounded using the toPrecision method. The average run-time and rounded average viscosity are inserted into spans. At the same time, spans and paragraphs containing the units and labels are unhidden. The unrounded average viscosity and average run-time are inserted into the hidden calculation details element. 

A function called toleranceBand is then invoked, with the average viscosity passed in as an argument. 

The toleranceBand function uses a SWITCH statement to read the value of the calibration fluid viscosity. Depending on the value of the calibration fluid viscosity, a case will assign the toleranceBand variable a value, and also insert the calibration fluid viscosity range and associated tolerance band into spans. At the same time, the elements containing the tolerance band units and calibration fluid viscosity label and units are unhidden. 

The toleranceBand function then calls the percentageDifference function, passing in the average viscosity, calibration fluid viscosity and tolerance band as arguments. 

The percentageDifference function calculates the percentage difference between the average viscosity and the viscosity of the calibration fluid. The percentage difference is then rounded to 2 decimal places using the toFixed method. The rounded percentage difference is then inserted into a span, with the associate elements containing the label and units being unhidden as well. The unrounded percentage difference is added to the hidden calculation details element. 

The percentageDifference function then invokes the percentageDifferenceChecker function, passing in the tolerance band and percentage difference as arguments. 

The percentageDifferenceChecker function checks whether the percentage difference is less than or greater than the tolerance band. If the percentage difference is less than or equal to the tolerance band, the calibration check has passed, and a message is posted to that effect, along with a tick icon. If the percentage difference is greater than the tolerance band, the calibration check has failed and a message is posted to that effect, along with a cross icon. 

No matter the output, the percentageDifferenceChecker function will also unhide the calibration details button. When clicked, this button invokes the calibrationDetails function, which reveals the hidden calculation details element. 

The reset button is tied to a click event listener that invokes the calibrationReset function, which empties the input and output fields and resets the tool for further use. 

### Calibration logic flow chart

![Calibration logic flow chart](assets/images/flow-charts/calibration-flow-chart.drawio.png)

## Recalibration logic

The viscometer constant recalibration function requires that the user input the constant of the viscometer they wish to recalibrate, the gravity of the testing laboratory and the gravity at the standardisation laboratory. When the calculate button is clicked, an event listener invokes the recalibrationPercentageDifference function. 

The recalibrationPercentageDifference function checks if any of the inputs are empty. If there are any empty inputs, the function stops executing the user is alerted. If the inputs have values in them, the function retrieves those values, and calculates the percentage difference between the two supplied gravities. The percentage difference is rounded to 4 significant figures using the toPrecision method. This function then invokes the function called recalibrationFunction, passing in the two gravities, the viscometer constant and the unrounded percentage difference as arguments. 

The recalibrationFunction function checks whether the percentage difference is greater than 0.1%. If so, the function then calculates a new constant for the viscometer by dividing the standardisation laboratory gravity by the testing laboratory gravity and the multiplying by the viscometer constant. The new constant is then rounded to 4 significant figures, as all constants are to 4SF. The new viscometer constant is inserted into the span, and the associated elements containing the label and units are unhidden. 

If the percentage difference is less than 0.1%, no recalibration takes place, since the method specifies that this is not necessary. A message is inserted into the output span informing the user of this. 

The user can then click a reset button, which is tied to a click event listener. This invokes the recalibrationReset function to empty the inputs and outputs, resetting the tool for further use. 

### Recalibration logic flow chart 

![Recalibration logic flow chart](assets/images/flow-charts/recalibration-flow-chart.drawio.png)

# Design Choices

## Colour scheme, font, favicon

Simple design - few/no images, Work Sans font, blue background, labels, icons, favicon

## JS functions

Justify use of smaller, simpler functions, though a single larger function could suffice for the main calculations. Justify use of toPrecion method(here?). Justify passing raw values through the functions

# Development process 

Explain move from IF/ELSE to SWITCH

Note that determinability proved easier to implement than expected, leading to automation of other calculations

Note calculation details section and replacing of console.logs

This next entry isn't so much a bug, but should serve to illustrate how to the project developed over time. For each of the determinability, repeatability and reproducibility, initially two large IF/ELSE statements in separate functions were used to perform those calculations. The first function displayed the calculation that was to be used to the user. The second function performed the calculations and inserted the results into HTML elements. Further functions to calculate the upper and lower limits would take their input values from the HTML elements, perform the calculations and post the results. I realised that this could lead to calculation errors, since I was rounding with the toPrecision method each time the functions retrieved and posted the numbers. This was caused by the inability of IF/ELSE statements to declare or modify variables outside of the statements. I refactored the code, and replaced the two large IF/ELSE functions with a single large SWITCH statement, which allowed me to declare and modify variables which can then be passed directly into further functions. This prevents calculation rounding errors, and generally simplifies the code.

# Accessibility

Much less - contrast, large buttons, large font size
For mobiles - larger buttons
Increase font-size for smaller devices using ems and rems





# Future work

This project has great scope for future work. 

Firstly, a function could be added that exports all of the inputted and calulated data to an Excel spreadsheet so that permanent electronic records can be kept

Secondly, a database of sorts could be added that stores all viscometer serial numbers and constants. Serial numbers are simple and unique, whilst constants can be more difficult to remember. The user could, instead of entering a constant, merely select the serial number of the viscometer they used and the tool would populate the cell with the constant for use in the calculations. This would tie in with the above

The tool could be expanded greatly to handle the calculations involved in other industrial methods, such as ASTM D2896 Total Base Number. 

# Bugs

A large and annoying bug was encountered when trying to change the text displayed in the "determinability-equation" div and when performing the calculation in the "determinability-factor" div. This text and equation output change is governed by the user's selection from the drop-down menu. It was observed through console.log commands that the code was not using the loop's IF/ELSE statements to discriminate based on the drop-down menu selection, but was actually trying to execute all of the options. I was using the onchange event listener in the select element, but it only seemed to be firing once. This was eventually solved with help from Tutor Support, who recommended removing the loop. The reasoning for initially using a loop was that the Love Maths walkthrough project involves the use of loop to respond to the user's mathematical operation selection.

A bug was noticed during routine testing after adding JavaScript and HTML to unhide units when performing the calculations, and then hide the units again when the reset button is pressed. This bug related to the calibration and recalibration calculations, which used a percentage difference calculation operation as part of the function. The function appeared to be concatenating the input values as strings, which produced wildly inaccurate output values. This was solved by tweaking the variables used to calculate the denominator in the percentage difference calculation. Instead of adding the two values and then dividing by 2, as in (value 1 + value 2) / 2

The JavaScript now instead divides each value individually by 2 and then adds them, which is the same operation, mathematically speaking, as in: ((value 1 / 2) + (value 2 / 2))
Dividing each value individually appears to prevent string concatenation, forcing the percentage difference calculations to calculate the correct value.  

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

**First-time users must be able to determine the purpose of the tool as soon as they navigate to it** 

The use of the term 'viscosity' in the index page's title, and the introductory text that mentions ASTM D445 clearly indicates the purpose of the site. 

**The tool must include a selector to allow the user to choose the calculation they want to conduct**

Directly below the introductory text is a drop-down menu with options for each of the calculations. Depending on the option that is selected by the user, a different calculation will be displayed. 

**The tool must include a selector to allow the user to select the fluid type that their sample is, and this selector must change that functions that are executed so that the correct calculations are made**

Within each of the determinability, repeatability and reproducibility calculation articles there is a drop-down menu where the user can change the sample type. The selection influences the determinability, repeatability or reproducibility calculation that is performed when the limits are checked. The drop-down selector influences a SWITCH statement. 

**The tool must include a page with some information on how to set the selector to the fluid type that matches their sample**

The introductory text contains a prominent link with a clear call to action to visit the discussion page. Within each of the determinability, repeatability and reproducibility there is another link to the discussion page that focuses on the section specifically dealing with selecting the correct sample type. 

**The above page should either open a new tab, or include an internal link to take the user back to the main page so that they don't have to user their browser butttons**

Clicking on either of the 4 links to the discussion page opens a new tab, so that the user is not directed away from the index page. 

**The tool must have clear calls to action to input the user's data (run-times, constants, gravities, etc)**

Each calculation section has an In'structions for use' ordered list that walks the user through the process. Each input has a label, and the input element's white colouration stands out against the blue background of the Viscosity Calculator. Further prompting is provided by the alerts that flash up if the user presses the calculation button when not all of the inputs have been filled. 

**The tool must have a clear call to action to submit their inputs and begin the calculations**

Each calculation article has a calculate button that is prominent. In the case of the determinability calculation article, the user must first select a viscometer type to display a calculate button. 

**The tool must display all calculation outputs so that the user is reassured of the tool's accuracy and can follow along performing the calculations manually if they desire**

The calculations are done step-by-step in small functions, with rounded outputs appearing under labels. In addition, the user can click a calculation details button that displays the unrounded values used in the calculations. Per testing below, the calculated outputs match the results of the manual calculations to a high degree of accuracy. The unrounded calculation outpust match almost exactly. 

**The tool's functions must produce the same calculation outputs as manual calculations would (i.e. no difference between the tool and the user doing the same calculations manually)**

Per the testing conducted below, the Viscosity Calculator's functions produce the same results as manual calculations to a high degree of accuracy. 

**The tool must have a function to clear the user's inputs so that other tests can be checked**

Each calculation article has a reset button that clears the user inputs and calculation outputs. This effectively resets the tool for further use. 

**The tool must have a clear final output informing the user of the result of the calculation**

Each calculation article displays a final output that informs the user as follows:

For the determinability calculations, the output informs the user if their run-times (and associated viscosities) are determinable according to the user's drop-down menu selection, per the criteria laid down in ASTM D445.

For the repeatability calculations, the output informs the user if their viscosities are repeatable, per the criteria laid down in ASTM D445.

For the reproducibility calculations, the output informs the user if their viscosities are reproducible, per the criteria laid down in ASTM D445. 

For the calibration calculations, the output informs the user if the viscometer passes its calibration check, per the criteria laid down in ASTM D445.

For the recalibration calculation, the output informs the user of the new constant for the viscometer being recalibrated. 

## Testing site functionality

Test link to discussion page, test discussion page internal navigation, test ASTM D445 download link, test calculation selector

| Action                                                    | Expected result                                                  | Actual result
| --------------------------------------------------------- |:-----------------------------------------------------------------| :---------------------------------------------------------------|
| Click link to discussion page in introductory text        | Opens new tab to discussion page                                 | Opens new tab to discussion page                                |
| Click link to discussion page in determinability article  | Opens new tab to discussion page, focus on sample type guidance  | Opens new tab to discussion page, focus on sample type guidance |
| Click link to discussion page in repeatability article    | Opens new tab to discussion page, focus on sample type guidance  | Opens new tab to discussion page, focus on sample type guidance |
| Click link to discussion page in reproducibility article  | Opens new tab to discussion page, focus on sample type guidance  | Opens new tab to discussion page, focus on sample type guidance |
| Select determinability option from drop-down menu         | Display determinability calculation article                      | Display determinability calculation article                     | 
| Select repeatability option from drop-down menu           | Display repeatability calculation article                        | Display repeatability calculation article                       | 
| Select reproducibility option from drop-down menu         | Display reproducibility calculation article                      | Display reproducibility calculation article                     | 
| Select calibration option from drop-down menu             | Display calibration calculation article                          | Display calibration calculation article                         | 
| Select recalibration option from drop-down menu           | Display recalibration calculation article                        | Display recalibration calculation article                       |
| Click ASTM D445 download link in discussion page          | Download a copy of ASTM D445                                     | Download a copy of ASTM D445 

## Testing calculation functions

This section documents the testing of the calculation functions. In all cases, the testing was conducted using the development server, not the deployed project, so that errors detected in the testing process could be identified and corrected easily. 

### Determinability calculations

Below are the results of testing the determinability calculation functions. Given the range of run-times and viscometer constants, exhaustive testing covering every single use-case (i.e. the full range of run-times from 200s to 900s across every viscometer size for each sample type) is impractical. Instead, I thought it best to test each sample type once using what I have found to be typical run-times and typical viscometer constants for each sample type. My justification for this decision is that the tool's utility lies in the range of determinability calculations it can apply with a few clicks. Testing a multitude of differing run-times and constants would merely test the tool's ability to do simple calculations, which, being a computer, is essentially perfect. This testing will compare the results calculated via manual means with those calculated by the Viscosity Calculator, manual in this case meaning calculated with a scientific calculator and a notepad, the current practice in my laboratory. Current practice in my laboratory is to incrementally round at each stage of the calculations, for ease of use. However, in this testing process, I considered that using the unrounded values would be the better approach, since the Viscosity Calculator also uses unrounded values, and carries them through the functions for maximum accuracy, and only displays the rounded values for the user's sake. Whilst the unrounded values may impair readability, I consider this approach to be the best way to compare the manual approach with the Viscosity Calculator. In several cases, both the manual approach and the Viscosity Calculator generated values with '999999' or '0000001' (or similar) at the end. Since rounding these numbers has no real effect of the accuracy of the tool, the numbers were rounded when entered into the table. 

REWORD THIS - basicall, I am trying to prove that the VC is just as good as the manula method, but does the calculations far quicker, and, since it avoids incremental rounding errors, actually offers superior accuract. Remember that the long floating point values are usually incrementally rounded in real-world operation. It is good when the manual calculation results match the VC results. 

Since the determinability calculation offers a choice between Ubbelohde and Zeitfuchs viscometers, it is prudent to test the functionality of both, since different (though similar) functions are used. However, Zeitfuchs viscometers are, as noted above, typically only used in cases where the sample being tested is very dark. The preference among analysts is to use Ubbelohde viscometers if at all possible, since the sample can be retested several times if need be. In my personal (and extensive) experience, Zeitfuchs viscometers are used only for tests on residual fuel oils, crude oils and residues, with a handful of fringe cases of additives that are extremely viscous. Hence, the Zeitfuchs calculation function will be tested only with those sample types.

The results of this testing are presented in table format. To prevent overly-long table column headings, abbreviations were used. For the avoidance of doubt, these are:
kv1 / kv2 - kinematic viscosity 1 and kinematic viscosity 2
Average - The final calculated viscosity
d-factor - determinability factor
UL - determinability upper limit
LL - determinability lower limit
VC - Viscosity Calculator, for the tool's results

| Action                                                    | Expected result                                                          | Actual result
| --------------------------------------------------------- |:-------------------------------------------------------------------------| :-----------------------------------------------------------------------|
| Click Ubbelohde button                                    | Display 2 run-time inputs and 1 constant input                           | Display 2 run-time inputs and 1 constant input                          |
| Click Zeitfuchs button                                    | Display 2 run-time inputs and 2 constant inputs                          | Display 2 run-time inputs and 2 constant inputs                         |
| Click reset button                                        | Empty all calculation outputs and user inputs, focus on run-time 1 input | Empty all calculation outputs and user inputs, focus on run-time 1 input|
| Click calculate button                                    | Fill outputs with labels, results as numbers, and units x                | Fill outputs with labels, results as numbers and units                  |
| Click calculate button with an empty run-time input       | An alert appears telling the user they need to enter 2 run-times         | An alert appears telling the user they need to enter 2 run-times        |
| Click calculate button with an empty constant input       | An alert appears telling the user they need to enter a constant          | An alert appears telling the user they need to enter a constant         |
| Click Calculation details button                          | Displays unrounded values of the calculations                            | Displays unrounded values of the calculations                           |

x NB - the output results must merely be numbers, not text or NaN. The 'correctness' (for want of a better term) of the outputs is tested below 

**Ubbelohde option testing**

Sample type: Base oil, 40C <br>
Run time 1: 221.14s <br>
Run time 2: 221.20s <br>
Viscometer: L2_93163 <br>
Viscometer constant: 0.09014 <br>
Determinability factor: 0.37% <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor   | VC UL              | VC LL          |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:--------------|:-------------------|:---------------|
| 19.9335596  | 19.938968   | 19.9362638     | 0.07376417606   | 20.01002798 | 19.86249962 | 19.9335596  | 19.938968   | 19.9362638  | 0.07376417606 | 20.010027976059998 | 19.86249962394 |

Sample type: Base oil, 100C <br>
Run time 1: 410.51 <br>
Run time 2: 410.63 <br>
Viscometer: L1_89556 <br>
Viscometer constant: 0.01032 <br>
Determinability factor: 0.36% <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor  | VC UL         | VC LL          |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:-------------|:--------------|:---------------|
| 4.2364632   | 4.2377016   | 4.2370824      | 0.01525349664   | 4.252335897 | 4.221828903 | 4.2364632   | 4.2377016   | 4.2370824   | 0.1525349664 | 4.25233589664 | 4.22182890336  |

Sample type: Formulated oil, 40C <br>
Run time 1: 324.96 <br>
Run time 2: 325.00 <br>
Viscometer: L2_91818 <br>
Viscometer constant: 0.09507 <br>
Determinability factor: 0.37% <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor | VC UL        | VC LL          |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:------------|:-------------|:---------------|
| 30.8939472  | 30.89775    | 30.8958486     | 0.1143146398    | 31.0101     | 30.78153396 | 30.8939472  | 30.8939472  | 30.89775    | 30.8958486  | 31.010163298 | 30.78153396018 |

Sample type: Formulated oil, 100C <br>
Run time 1: 240.78 <br>
Run time 2: 240.98 <br>
Viscometer: L1C_86008 <br>
Viscometer constant: 0.02978 <br>
Determinability factor: 0.36% <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor   | VC UL         | VC LL         |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:--------------|:--------------|:--------------|
| 7.1704284   | 7.1763844   | 7.1734064      | 0.02582426304   | 7.199230663 | 7.147582137 | 7.1704284   | 7.1763844   | 7.1734064   | 0.02582426304 | 7.19923066304 | 7.14758213696 |

Sample type: Formulated oil, 150C <br>
Run time 1: 261.08 <br>
Run time 2: 261.26 <br>
Viscometer: L1_84422 <br>
Viscometer constant: 0.01150 <br>
Determinability factor: 1.5% <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor | VC UL        | VC LL       |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:------------|:-------------|:------------|
| 3.00242     | 3.00449     | 3.003455       | 0.045051825     | 3.04506825  | 2.958403175 | 3.00242     | 3.00449     | 3.003455    | 0.045051825 | 3.0485068425 | 2.958403175 |

Sample type: Kerosene, diesel, biodiesel, 40C <br>
Run time 1: 450.77 <br>
Run time 2: 450.39 <br>
Viscometer: L0B_L381 <br>
Viscometer constant: 0.004925 <br>
Determinability factor: 0.37% <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor   | VC UL         | VC LL         |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:--------------|:--------------|:--------------|
| 2.2204225   | 2.21817075  | 2.2191065      | 0.00821069405   | 2.227317194 | 2.210995806 | 2.22004225  | 2.21817075  | 2.2191065   | 0.00821069405 | 2.22731719405 | 2.21089580595 |

Sample type: Petroleum wax, 100C <br>
Run time 1: 396.89 <br>
Run time 2: 396.63 <br>
Viscometer: L1_89553 <br>
Viscometer constant: 0.01008 <br>
Determinability factor: 0.80% <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor   | VC UL        | VC LL        |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:--------------|:-------------|:-------------|
| 4.0006512   | 3.9980304   | 3.9993408      | 0.0319947264    | 4.031335526 | 3.967346074 | 4.0006512   | 3.9980304   | 3.9993408   | 0.0319947264  | 4.0313355264 | 3.9673460736 |

Sample type: Residual Fuel Oil, 50C <br>
Run time 1: 500.53 <br>
Run time 2: 500.69 <br>
Viscometer: L2C_91219 <br>
Viscometer constant: 0.2867 <br>
Determinability factor: 2.44% <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor  | VC UL          | VC LL          |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:-------------|:---------------|:---------------|
| 143.501951  | 143.547823  | 143.524887     | 3.502007243     | 147.0268942 | 140.0228798 | 143.501951  | 143.547823  | 143.524887  | 3.5020072428 | 147.0268942428 | 140.0228797572 |

Sample type: Residual Fuel Oil, 100C <br>
Run time 1: 273.75 <br>
Run time 2: 274.29 <br>
Viscometer: L2_91925 <br>
Viscometer constant: 0.09762 <br>
Determinability factor: 3% <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor | VC UL        | VC LL        |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:------------|:-------------|:-------------|
| 26.723475   | 26.7761898  | 26.7498324     | 0.802494972     | 27.55232737 | 25.94733743 | 26.723475   | 26.7761898  | 26.7498324  | 0.802494972 | 27.552327372 | 25.947337428 |

Sample type: Additive, 100C <br>
Run time 1: 550.49 <br>
Run time 2: 549.95 <br>
Viscometer: L2C_93064 <br>
Viscometer constant: 0.2866 <br>
Determinability factor: (Average ^ 1.1) x 0.00106 <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor     | Manual UL          | Manual LL         | VC kv1      | VC kv2      | VC average  | VC d-factor         | VC UL              | VC LL             |
| ------------|:------------|:---------------|:--------------------|:-------------------|:------------------|:------------|:------------|:------------|:--------------------|:-------------------|:------------------|
| 157.770434  | 157.61567   | 157.693052     | 0.2772679553        | 157.97032          | 157.415784        | 157.770434  | 157.61567   | 157.693052  | 0.27726795529672504 | 157.97031995529676 | 157.4157840447033 |

Sample type: Gas Oil, 40C <br>
Run time 1: 432.76 <br>
Run time 2: 433.02 <br>
Viscometer: L2_93172 <br>
Viscometer constant: 0.09346 <br>
Determinability factor: 0.0013 x (average + 1) <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor   | VC UL          | VC LL          |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:--------------|:---------------|:---------------|
| 40.4457496  | 40.4700492  | 40.4578994     | 0.05389526922   | 40.51179467 | 40.40400413 | 40.4457496  | 40.4719184  | 40.4578994  | 0.05389526922 | 40.51179466922 | 40.40400413078 |

Sample type: Jet Fuel, -20C <br>
Run time 1: 288.96 <br>
Run time 2: 289.24 <br>
Viscometer: L0C_C511 <br>
Viscometer constant: 0.002879 <br>
Determinability factor: 0.7608% <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL    | Manual LL    | VC kv1      | VC kv2      | VC average  | VC d-factor     | VC UL           | VC LL           |
| ------------|:------------|:---------------|:----------------|:-------------|:-------------|:------------|:------------|:------------|:----------------|:----------------|:----------------|
| 0.83191584  | 0.83272196  | 0.8323189      | 0.006332282191  | 0.8386511822 | 0.8259866178 | 0.83191584  | 0.83272196  | 0.8323189   | 0.0063322821912 | 0.8386511821912 | 0.8259866178088 |

Sample type: Crude Oil, 40C <br>
Run time 1: 560.87 <br>
Run time 2: 561.92 <br>
Viscometer: L1_92050 <br>
Viscometer constant: 0.01017 <br>
Determinability factor: 3% <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor  | VC UL        | VC LL        |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:-------------|:-------------|:-------------|
| 5.7040479   | 5.7147264   | 5.70938715     | 0.1712816145    | 5.880668765 | 5.538105536 | 5.7040479   | 5.7147264   | 5.70938715  | 0.1712816145 | 5.8806687645 | 5.5381055355 |


**Zeitfuchs option testing**

Sample type: Residual Fuel Oil, 50C <br>
Run time 1: 311.21 <br>
Viscometer: L5_93272 <br>
Viscometer constant 1: 0.3247 <br>
Run time 2: 334.05 <br>
Viscometer: L5_92276 <br>
Viscometer constant 2: 0.3012 <br>
Determinability factor: 2.44% <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor  | VC UL          | VC LL         |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:-------------|:---------------|:--------------|
| 101.049887  | 100.61586   | 100.8328735    | 2.460322113     | 103.2931956 | 98.37255139 | 101.049887  | 100.61586   | 100.8328735 | 2.4603221134 | 103.2931956134 | 98.3725513866 |

Sample type: Residual Fuel Oil, 100C <br>
Run time 1: 455.34 <br>
Viscometer: L4_92545  <br>
Viscometer constant 1: 0.1015 <br>
Run time 2: 437.98 <br>
Viscometer: L4_9495 <br>
Viscometer constant 2: 0.1054 <br>
Determinability factor: 3% <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor | VC UL       | VC LL       |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|
| 46.21701    | 46.163092   | 46.190051      | 1.38570153      | 47.57575253 | 44.80434947 | 46.21701    | 46.163092   | 46.190051   | 1.38570153  | 47.57575253 | 44.80434947 |

Sample type: Additive, 100C <br>
Run time 1: 702.62 <br>
Viscometer: L8_80401 <br>
Viscometer constant 1: 9.114 <br>
Run time 2: 696.24 <br>
Viscometer: L8_80405 <br>
Viscometer constant 2: 9.206 <br>
Determinability factor: (average ^ 1.1) 0.00106 <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor        | VC UL             | VC LL             |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:-------------------|:------------------|:------------------|
| 6403.67868  | 6409.58544  | 6406.63206     | 16.31543383     | 6422.947494 | 6390.316626 | 6403.67868  | 6409.58544  | 6406.63206  | 16.315433829626443 | 6422.947493829626 | 6390.316626170374 |

Sample type: Residue, 100C <br>
Run time 1: 420.36 <br>
Viscometer: L5_93272 <br>
Viscometer constant 1: 0.3247 <br>
Run time 2: 454.04 <br>
Viscometer: L5_93276 <br>
Viscometer constant 2: 0.3012 <br>
Determinability factor: 3% <br>

|  Manual kv1 | Manual kv2  | Manual average | Manual d-factor | Manual UL   | Manual LL   | VC kv1      | VC kv2      | VC average  | VC d-factor | VC UL        | VC LL         |
| ------------|:------------|:---------------|:----------------|:------------|:------------|:------------|:------------|:------------|:------------|:-------------|:--------------|
| 136.490892  | 136.756848  | 136.62387      | 4.0987161       | 140.7225861 | 132.5251539 | 136.490892  | 136.756848  | 136.62387   | 4.0987161   | 140.7225861  | 132.5251539   |

### Repeatability calculations

A similar approach to that of testing the determinability calculation functions will be taken with testing the repeatability functions. Each sample type will be tested once, using viscosities that might typically be expected of that sample type at that temperature. 


Sample type: Base oil, 40C <br>
Viscosity 1: 30.73 <br>
Viscosity 2: 31.26 <br>
Repeatability factor: 1.01% <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 30.995             | 0.3130495           | 30.3080495       | 30.6819505      | 30.995            | 0.3130495        | 31.3080495       | 30.6816505       |

Sample type: Base oil, 100C <br>
Viscosity 1: 7.195 <br>
Viscosity 2: 7.306 <br>
Repeatability factor: 0.85% <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 7.2505             | 0.06162925          | 7.31212925       | 7.18887075      | 7.2505            | 0.06162925       | 7.31212925       | 7.18887075       |


Sample type: Formulated oil, 40C <br>
Viscosity 1: 41.96 <br>
Viscosity 2: 43.53 <br>
Repeatability factor: 0.74% <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 42.745             | 0.316313            | 43.061313        | 42.428687       | 42.745            | 0.316313         | 43.061313        | 42.428687        |


Sample type: Formulated oil, 100C <br>
Viscosity 1: 9.189  <br>
Viscosity 2: 9.273 <br>
Repeatability factor: 0.84%  <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 9.231              | 0.0775404           | 9.3085404        | 9.1534596       | 9.231             | 0.0775404        | 9.3085404        | 9.1534596        | 

Sample type: Formulated oil, 150C <br>
Viscosity 1: 5.792 <br>
Viscosity 2: 5.886 <br>
Repeatability factor: 0.56  <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 5.839              | 0.0326984           | 5.871684         | 5.8063016       | 5.839             | 0.0326984        | 5.8716984        | 5.8063016

Sample type: Petroleum wax, 100C <br>
Viscosity 1: 3.563 <br>
Viscosity 2: 3.609 <br>
Repeatability factor: (average ^ 1.2) 0.0141 <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL             | VC LL              |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:------------------|:-------------------|
| 3.586              | 0.06527568755       | 3.651275688      | 3.520723125     | 3.586             | 0.065275687546   | 3.651275687546401 | 3.5207243124535994 |

Sample type: Residual fuel oil, 50C <br>
Viscosity 1: 120.6 <br>
Viscosity 2: 116.8 <br>
Repeatability factor: 7.88% <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 118.7              | 9.359495            | 128059495        | 109.340505      | 118.7             | 9.359495         | 128.059595       | 109.340505       | 

Sample type: Residual fuel oil, 100C <br>
Viscosity 1: 60.18 <br>
Viscosity 2: 60.59 <br>
Repeatability factor: 0.08088  <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 60.385             | 4.8839388           | 65.2689388       | 55.5010612      | 60.385            | 4.8839388        | 65.2689388       | 55.5010612       |

Sample type: Additive, 100C <br>
Viscosity 1: 200.6 <br>
Viscosity 2: 199.4 <br>
Repeatability factor: (average ^ 1.1) x 0.00192 <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor        | VC UL              | VC LL              |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-------------------|:-------------------|:-------------------|
| 200.0              | 0.6522802424        | 200.6522802424   | 199.3477198     | 200.0             | 0.6522802424195513 | 200.65228024241955 | 199.34771975758045 |

Sample type: Gas Oil, 40C <br>
Viscosity 1: 34.75 <br>
Viscosity 2: 35.39 <br>
Repeatability factor: (average + 1) x 0.0043 <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 35.07              | 0.155101            | 35.225101        | 34.914899       | 35.07             | 0.155101         | 35.225101        | 34.914899        | 

Sample type: Jet Fuel, -20C <br>
Viscosity 1: 0.9306 <br>
Viscosity 2: 0.9394 <br>
Repeatability factor: (average ^ 1.4) x 0.001368 <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor           | VC UL              | VC LL              |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:----------------------|:-------------------|:-------------------|
| 0.9350             | 0.001245151949      | 0.9362451519     | 0.9337548481    | 0.9350            | 0.0012451519487142082 | 0.9362451519487143 | 0.9337548480512858 | 

Sample type: Kerosene, diesel, biodisel, 40C <br>
Viscosity 1: 1.789 <br>
Viscosity 2: 1.818 <br>
Repeatability factor: 0.56% <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 1.8035             | 0.0100996           | 1.8135996        | 1.7934004       | 1.8035            | 0.0100996        | 1.8135996        | 1.7934004        | 

Sample type: Used motor oil, 40C <br>
Viscosity 1: 58.95 <br>
Viscosity 2: 59.58 <br>
Repeatability factor: (average ^ 1.722) x 0.000233 <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor        | VC UL             | VC LL             |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-------------------|:------------------|:------------------|
| 59.265             | 0.2630961993        | 59.5280962       | 58.0019038      | 59.265            | 0.2630961992629933 | 59.52809619926288 | 59.00190380073712 | 

Sample type: Used motor oil, 100C <br>
Viscosity 1: 10.11 <br>
Viscosity 2: 10.29 <br>
Repeatability factor: (average ^ 1.4633) x 0.001005 <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor          | VC UL              | VC LL              |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:---------------------|:-------------------|:-------------------|
| 10.20              | 0.03006427208       | 10.23006427      | 10.16993573     | 10.20             | 0.030064272078645836 | 10.230064272078645 | 10.169935727921354 | 

Sample type: Residue <br>
Viscosity 1: 2089 <br>
Viscosity 2: 2122 <br>
Repeatability factor: 3% <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 2105.5             | 63.165              | 2168.665         | 2042.335        | 2105.5            | 63.165           | 2168.665         | 2042.335         | 


### Reproducibility calculations

Reproducibility is essentially identical to repeatability, except with looser limits, so the same approach to testing will be utilised

Sample type: Base oil, 40C <br>
Viscosity 1: 22.13 <br>
Viscosity 2: 22.79 <br>
Reproducibility factor: 1.36% <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 22.46              | 0.305456            | 22.765456        | 22.154544       | 22.46             | 0.305456         | 22.765456        | 22.154544        | 

Sample type: Base oil, 100C <br>
Viscosity 1: 8.954 <br>
Viscosity 2: 8.988 <br>
Reproducibility factor: 1.90% <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 8.971              | 0.170449            | 9.141449         | 8.800551        | 8.971             | 0.170449         | 9.141449         | 8.800551         | 


Sample type: Formulated oil, 40C <br>
Viscosity 1: 38.91 <br>
Viscosity 2: 39.15 <br>
Reproducibility factor: 1.22 <br>%

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 39.03              | 0.476166            | 39.506166        | 38.553834       | 39.03             | 0.476166         | 39.506166        | 38.553834        |


Sample type: Formulated oil, 100C <br>
Viscosity 1: 9.506 <br>
Viscosity 2: 9.571 <br>
Reproducibility factor: 1.38% <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 9.5385             | 0.1316313           | 9.6701313        | 9.4068687       | 9.5385            | 0.1316313        | 9.6701313        | 9.4068687        | 

Sample type: Formulated oil, 150C <br>
Viscosity 1: 5.465 <br>
Viscosity 2: 5.413 <br>
Reproducibility factor: 1.80% <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 5.439              | 0.097902            | 5.536902         | 5.341098        | 5.439             | 0.097902         | 5.536902         | 5.341098         | 

Sample type: Petroleum wax, 100C <br>
Viscosity 1: 3.309 <br>
Viscosity 2: 3.356 <br>
Reproducibility factor: (average ^ 1.2) 0.0336  <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor         | VC UL              | VC LL              |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:--------------------|:-------------------|:-------------------|
| 3.3325             | 0.1551691121        | 3.487669112      | 3.177330888     | 3.3325            | 0.15516911211930368 | 3.4876691121193035 | 3.1773308878806965 |

Sample type: Residual fuel oil, 50C <br>
Viscosity 1: 70.26 <br>
Viscosity 2: 70.53 <br>
Reproducibility factor: 8.46% <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 70.395             | 5.95612095          | 76.35112095      | 64.43887905     | 70.395            | 5.95612095       | 76.35112095      | 64.43887905      | 

Sample type: Residual fuel oil, 100C <br>
Viscosity 1: 21.33 <br>
Viscosity 2: 22.75 <br>
Reproducibility factor: 12.06%  <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 22.04              | 2.658024            | 24.698024        | 19.381976       | 22.04             | 2.658024         | 24.698024        | 19.381976        |

Sample type: Additive, 100C <br>
Viscosity 1: 450.6 <br>
Viscosity 2: 451.9 <br>
Reproducibility factor: (average ^ 1.1) x 0.00862 <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL             | VC LL             |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:------------------|:------------------|
| 451.25             | 7.167475254         | 458.41747525      | 444.0825247     | 451.25            | 7.16747525446311 | 458.4174752544631 | 444.0825247455369 | 

Sample type: Gas Oil, 40C <br>
Viscosity 1: 12.11 <br>
Viscosity 2: 12.42 <br>
Reproducibility factor: (average + 1) x 0.0082 <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 12.265             | 0.108773            | 12.373773        | 12.156227       | 12.265            | 0.108773         | 12.373773        | 12.156227        | 

Sample type: Jet Fuel, -20C <br>
Viscosity 1: 1.019 <br>
Viscosity 2: 1.023 <br>
Reproducibility factor: (average ^ 1.4) x 0.002899 <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor          | VC UL             | VC LL              |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:---------------------|:------------------|:-------------------|
| 1.021              | 0.002984587078      | 1.018015413      | 1.023984587     | 1.021             | 0.002984587077545149 | 1.023984587077545 | 1.0180154129224548 | 

Sample type: Kerosene, diesel, biodisel, 40C <br>
Viscosity 1: 0.7882 <br>
Viscosity 2: 0.7906 <br>
Reproducibility factor: 2.24% <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 0.7894             | 0.01768256          | 0.80708256       | 0.77171744      | 0.7894            | 0.01768256       | 0.80708256       | 0.77171744       | 

Sample type: Used motor oil, 40C <br>
Viscosity 1: 45.96 <br>
Viscosity 2: 46.17 <br>
Reproducibility factor: (average ^ 1.722) x 0.000594 <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 46.065             | 0.4346217308        | 46.49962173      | 45.63097827     | 

Sample type: Used motor oil, 100C <br>
Viscosity 1: 6.071 <br>
Viscosity 2: 6.088 <br>
Reproducibility factor: (average ^ 1.4633) x 0.003361 <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor          | VC UL             | VC LL             |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:---------------------|:------------------|:------------------|
| 6.0795             | 0.04715224294       | 6.126652229      | 6.032347771     | 6.0795            | 0.047152242939656905 | 6.126652242939656 | 6.032347757060343 | 

Sample type: Residue, 100C <br>
Viscosity 1: 667.5 <br>
Viscosity 2: 669.3 <br>
Reproducibility factor: 3% <br>

| Manual average     | Manual r-factor     | Manual UL        | Manual LL       | VC average        | VC r-factor      | VC UL            | VC LL            |
| -------------------|:--------------------|:-----------------|:----------------|:------------------|:-----------------|:-----------------|:-----------------|
| 668.4              | 20.052              | 688.452          | 648.348         | 668.4             | 20.052           | 688.452          | 647.348          | 

### Calibration Calculations

The calibration calculations don't rely on selecting a sample type. Instead, the particular calculation to be used is selected based on the viscosity of the calibration fluid. There are 6 tolerance bands, so 6 tests will be conducted

Calibration fluid viscosity: 9.053 <br>
Tolerance band: 0.30% <br>
Run time 1: 293.60 <br>
Run time 2: 293.72 <br>
Constant: 0.03083 <br>

| Manual average time | Manual avergae viscosity | Manual percentage diff.   | VC average time | VC average viscosity | VC percentage diff.   |
| --------------------|:-------------------------|:--------------------------|:----------------|:---------------------|:----------------------|
| 293.66              | 9.0535378                | 0.005940395739%           | 293.66          | 9.0535378            | 0.005940395739267533% | 

Calibration fluid viscosity: 72.36 <br>
Tolerance band: 0.32% <br>
Run time 1: 242.78 <br>
Run time 2: 242.66 <br>
Constant: 0.2978 <br>

| Manual average time | Manual avergae viscosity | Manual percentage diff.   | VC average time | VC avergae viscosity | VC percentage diff.  |
| --------------------|:-------------------------|:--------------------------|:----------------|:---------------------|:---------------------|
| 242.72s             | 72.282016                | 0.1078303555%             | 242.72s         | 72.282016            | 0.10783035546186069% |

Calibration fluid viscosity: 716.8 <br>
Tolerance band: 0.36% <br>
Run time 1: 269.83 <br>
Run time 2: 269.55 <br>
Constant: 2.661 <br>

| Manual average time | Manual avergae viscosity | Manual percentage diff.   | VC average time | VC avergae viscosity | VC percentage diff. |
| --------------------|:-------------------------|:--------------------------|:----------------|:---------------------|:--------------------|
| 269.69              | 717.64509                | 0.1178281422%             | 269.69s         | 717.64509            | 0.1178281421702977% |

Calibration fluid viscosity: 3062 <br>
Tolerance band: 0.42% <br>
Run time 1: 349.06 <br>
Run time 2: 348.91 <br>
Constant: 8.788 <br>

| Manual average time | Manual avergae viscosity | Manual percentage diff.   | VC average time | VC avergae viscosity | VC percentage diff.  |
| --------------------|:-------------------------|:--------------------------|:----------------|:---------------------|:---------------------|
| 348.985s            | 3066.88018               | 0.1592519304%             | 348.985         | 3066.88018           | 0.15925193042361318% |

Calibration fluid viscosity: 12012 <br>
Tolerance band: 0.54% <br>
Run time 1: 393.13 <br>
Run time 2: 393.36 <br>
Constant: 30.60 <br>

| Manual average time | Manual avergae viscosity | Manual percentage diff.   | VC average time | VC avergae viscosity | VC percentage diff.  |
| --------------------|:-------------------------|:--------------------------|:----------------|:---------------------|:---------------------|
| 393.245             | 12033.297                | 0.17714066915%            | 393.245         | 12033.297            | 0.17714066912960552% |

Calibration fluid viscosity: 130469 <br>
Tolerance band: 0.73% <br>
Run time 1: 432.88 <br>
Run time 2: 433.02 <br>
Constant: 301.7 <br>

| Manual average time | Manual avergae viscosity | Manual percentage diff.   | VC average time | VC avergae viscosity | VC percentage diff.  |
| --------------------|:-------------------------|:--------------------------|:----------------|:---------------------|:---------------------|
| 432.95              | 130621.015               | 0.1164464294%             | 432.95          | 130621.015           | 0.11644642940480499% |

### Recalibration Calculations

In contrast to the other calculations, the recalibration calculations test cases are more limited, since Earth's gravity doesn't vary much, though it obviously varies enough to be taken into consideration. 4 cases will be tested - 2 for a large difference between gravities, and two for a smaller difference between gravities. Within each pair, one case will be with the testing lab gravity set to higher than the standardisation lab gravity, and the other case for the reverse. A fifth case will consider the extremely unlikely scenario that a viscometer needs to be used on Mars.  

Testing lab gravity: 9.78 m/s2 <br>
Standardisation lab gravity: 9.83 m/s2  <br>
Constant: 0.2936  <br>

| Manual percentage difference | Manual new constant      | VC percentage difference  | VC new constant | 
| -----------------------------|:-------------------------|:--------------------------|:----------------|
| 0.5099%                      | 0.2951                   | 0.5099%                   | 0.2951          |

Testing lab gravity: 9.83 m/s2 <br>
Standardisation lab gravity: 9.78 m/s2  <br>
Constant: 0.2936 <br>

| Manual percentage difference | Manual new constant      | VC percentage difference  | VC new constant | 
| -----------------------------|:-------------------------|:--------------------------|:----------------|
| 0.5099%                      | 0.2921                   | 0.5099                    | 0.2921          |

Testing lab gravity: 9.78 m/s2 <br>
Standardisation lab gravity: 9.80 m/s2  <br>
Constant: 0.2936 <br>

| Manual percentage difference | Manual new constant      | VC percentage difference  | VC new constant | 
| -----------------------------|:-------------------------|:--------------------------|:----------------|
| 0.2043%                      | 0.2942                   | 0.2043%                   | 0.2942          |

Testing lab gravity: 9.80m/s2 <br>
Standardisation lab gravity: 9.78 m/s2  <br>
Constant: 0.2936 <br>

| Manual percentage difference | Manual new constant      | VC percentage difference  | VC new constant | 
| -----------------------------|:-------------------------|:--------------------------|:----------------|
| 0.2043%                      | 0.2930                   | 0.2043%                   | 0.2930          |

Testing lab gravity: 3.72 m/s2 <br>
Standardisation lab gravity: 9.81 m/s2  <br>
Constant: 0.2936 <br>

| Manual percentage difference | Manual new constant      | VC percentage difference  | VC new constant | 
| -----------------------------|:-------------------------|:--------------------------|:----------------|
| 90.0222%                     | 0.7743                   | 90.02%                    | 0.7743          |

### Overall verdict 

Overall, the Viscosity Calculator appears to match the results of the manual calculations in all particulars. When the project was started, I was concerned that the base 2 mathematical system used by JavaScript to perform calculations would not cope well with calculations involving several floating-point values. This appears to have some grounding, as the Viscosity Calculator will generate values ending in 0000001 or 9999999, though this isn't universal and depends on the inputs. This is probably similar to the unexpected result given when using a browser console to add 0.1 and 0.2, which gives 0.30000000000000004, rather than 0.3. However, these values are only visible in the calculation details section, and hence use of the toPrecision method in the regular outputs stops this happening. 

In addition, the tool functioned exceptionally quickly, displaying the results instantly once the calculate button was clicked. Therefore, commercial scientists should have no objections to using this tool in their work. 

## Testing on different devices

PC, phone, laptop, tablets

## Testing code

HTML validator, CSS validator, JS validator, Lighthouse

# Credits

Ed Bradley from Tutor Support, who provided invaluable guidance on the conditional logic for the displayDeterminabilityFactor and determinabilityFactor functions, and on how to correctly get the value of input elements. This method was used to construct the functions for the repeatability and reproducibility calculations. Ultimately, I moved away from the suggested approach to use SWITCH statements, but the suggested approach provided a working first draft that allowed the project to progress. 

## Resources

Setting a select element to blank by default: https://stackoverflow.com/questions/8605516/default-select-option-as-blank

Industry standard test method D445, obtained using Intertek's subscription to the ASTM Compass. A copy is stored in the repository and may also be downloaded from the project's discussion page. 

Removing number input arrows: https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp





