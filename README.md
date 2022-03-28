﻿# A decision making app based on the basic methods of decision making and analysing
 Use this application to read CVS files and determine which alternative is the most optimal in both situations based on different methods of decision making. 
 You can also utilise the Huwritz method via the graph or the table to see which method is the most optimal if the chances of any of the two given situations are known.
 The basic methods used are: 
 - Pesimist
 - Optimist
 - Laplace
 - Savage
  ## Instalation
  All the necessary libraries are in the repo or are used via CDN. Only needed step is to open the html file
  ## Usage
  Open a valid CSV file and analyse the alternatives available ( There is example of a such in the repo: **osnovne_metode1.csv** )
 # Libraries used
 1. jQuery
    - jQuery is mostly used to manipulate the DOM of the page as it is easier. It is also in this project to enable the next script
 2. jQuery-csv
    - This script library is used to parse the csv file uploaded into an array that is easier to manipulate and use in the application. Furthermore can be found in the comments and the start of the script "*jquery-csv.js*"
 3. JSCharting
    - This library is used to generate the graph that is shown for the Hurwitz method, more can be found [here](https://jscharting.com/)
