# Canonical Take Home Test
This repository houses my code for the Canonical Take Home Test part of the application process. The webpage produced can either be viewed (the easy way) by using the GitHub pages URL (https://tylerprehl.github.io/canonical-take-home/) or (the hard way) by following the "To Build Project" steps below to serve the project locally.

### Site Functionality
1) Uses and API call to get data about various articles
2) Loads information about those articles into "cards"
3) Displays the cards for the user to view/select as their leisure

### To Build Project
1) Install yarn ```npm install --global yarn```
2) Install webpack ```yarn add webpack webpack-cli```
3) Run ```yarn build``` to build the project
4) Run ```yarn start``` to serve the project on localhost:8080 (note - this may take a while)

### Takeaways
<ul>
<li>Setting up the Vanilla Framework is not as easy as following the <a href="https://vanillaframework.io/docs/building-vanilla">Building with Vanilla instructions</a></li>
<li>Using a framework like Vanilla is pretty astounding for quick design production. Once I got Webpack, JavaScript, and SASS finally started working together properly, it was astoundingly easy to use the various pieces of the framework (such as the card pattern). With that said, it starts to become difficult to make look nice and even when things are not standardized (such as image sizes).
<li>JSON.Stringefy encloses the string in quotation marks, so trying to use said string as an absolute src path results in JavaScript thinking it's a relative path
</ul>

### Dependencies
<ul>
<li>css-loader - ^6.8.1
<li>node-sass - ^9.0.0
<li>sass - ^1.69.4
<li>sass-loader - ^13.3.2
<li>style-loader - ^3.3.3
<li>vanilla-framework - ^4.5.0
<li>webpack - ^5.89.0
<li>webpack-cli - ^5.1.4
<li>webpack-dev-server - ^4.15.1
</ul>
