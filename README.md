# Project Name

SeeFit

## Description

A high-intensity interval training (HIIT) app that enables users to create and perform customized, intense workout routines by combining periods of intense exercise with recovery intervals.

## Table of Contents

- [Installation](#installation)
- [Running](#running)
- [Ui](#ui)
- [Features](#features)
- [Usage](#usage)
- [API](#api)
- [Project structure](#project-structure)
- [Database](#database)
- [Improvements since first draft](#improvements)
- [AI](#Ai)
- [References](#references)



## Installation

Upon download of the file, open a new terminal and run the following commands:
1. `npm i` - to install all the dependencies specified in the `package.json` file.
2. `npm start` - to start the server.

## Running

Open a browser page and type in - `localhost:8080` to load the initial page of the app. 

## Ui

1. The app's logo, `SeeFit`, is permanently displayed in the top-left corner, while the `theme icons` remain in the top-right corner, providing quick access to the home page and theme customization options.

2. The current page title e.g `Default Hiits` is displayed just below the page to always remind the user of the page they are at.

3. The navigation bar which contains the `Default`, `Custom`, and `Dashboard` is also always displayed at every point while using the app for quick access to desired page.

4. Each page has its own content which will be displayed according to what you click.

## Features
1. Create custom hit from scratch
2. Start/Perform a hiit
3. Record keeping
4. Audio Cues
5. Deleting a Hiit
6. Editing/deleting a Hiit upon creation
7. Theme - Light mode and dark mode
8. Progress tracking
9. A Progressive web app (Installable as a web app)

## Usage

### Performing a Hiit

-  Click on a Hiit card
    - The hiit cards are similar in appearance, be it a default hiit or a custom hiit. This is to maintain consistency in the app, this way, users know that actions performed on the default hiits can as well be performed on the custom hiits. This approach aligns with Nielsen's 4th usability Heuristic which suggests "consistency and standards" should be maintained throughout the app. However, the only difference is the custom hiits have a delete Icon which the users can click to delete the hiit if they do not desire to have it anymore.
    - The cards contain information about the hiit such ad the `hiit name`, `Number of exercises` in the hiit, and the `total duration` of the hiit (rest duration included).
    - When the user clicks on the hiit card, they are directed to The hiit-info page
    - This page contains the `clicked Hiit's name`, followed by the `number of exercises` and the `total hiit duration` side by side and a brief description of the Hiit. I chose to add this page to minimize the user's memory load so the user doesn't have to remember any information from one part of the interface to the other before mstarting the hiit. This approach supports the Nielsen's 6th usability Heuristic which suggests "Recognition rather than recall". With this feature, theh users won't have to memorise any information as it's always available in any part of the app.
    - The exercises to be performed are displayed in `white` text with the duration of each exercise in `green` text. This is for the users to easily differentiate between the exerxise name and duration. On each exercise card, there is a `drop-down` icon which suggests that the cards can be clicked to view more information which is the `exercise description`. This was implemented to avoid blocks of text and shifting the user's concentration from other relevant parts of the page.

- Click on the `Start Hiit` button
    - At the bottom of the page, there is a `Start Hiit` button which the user can click to start the hiit. The button was fixed at theh bottom of the page so incase a user has added multiple exercises that may take up theh entire length of the page, thet won't have to scroll to the very end of the page to view the button to start a hiit.

- Start hiit
    - When the start hiit button is clicked, the user is taken to the page where they perform the hiit. On this page the hiit name is displayed at the top of the page to remind the user what hiit they are performing at all times. The user also sees the `current exercise name` and the `Next exercise` in the page to enable them know what they are doing and will be doing next at all times.
    - Below the current exercise and next exercise is the `current exercise description` to give the user direction on what they are to do in the current exercise.
    - I chose to implement a `count-down timer` to let the users know how long they have left in an activity.
    - The timer section has a border which is a `progress bar`. This helps the user keep track what they've completed and what they have left in the entire hiit.
    - The `green` area signifies the completed part while the `white` area signifies what's left to be done. This was implemented to keep the user informed of their progress always.
    - There are visibe pause/play and restart buttons under the progress bar which users can click to pause/ continue a hiit, and restart a hiit respectively giving them complete control and freedom while using the app. When any of these buttons is clicked, a text fades in for 3 seconds to as well as the Nielsen's 1st usability Heuristic which suggests "visibility of system status" respectively. 

### Creating a Hiit

- Click on the `add/plus icon` OR navigate to the custom page and click on the card that says `+ create a New Hiit`
    - A form which the user can input information like; `hiit name`, `hiit description`, `exercise name`, `exercise description`, `exercise duration`, and `rest duration` for that particular exercise in seconds. This was implemented to give th user full control of customisation.

- Click on `add exercise` to record the details of the first exercise provided.
    - when the user successfully adds an exercise, an `element` that contains the name of the added exercise and an `x icon` which is popularly known as remove buton (to prevent the user from wondering how they can delete the exercise) will be added at the top of the form. This supports the Nielsen's 1st usability Heuristic which suggests "user consistency and standards".
    - Upon adding a new exercise, a section that says `Exercise added successfully` fades in for 3 seconds to let the user know the exercise has been added. This supports the Nielsen's 1st usability Heuristic which suggests "visibility of system status".
    - the users can choose to add as many exercises as they wish. 
    - Users can `delete` and `edit` added exercises upon creating a hiit so they dont feel stuck while creating a hiit if they have made a mistake. this aligns with the Nielsen's 1st usability Heuristic which suggests "user control and freedom".
    - A hiit can be editted by clicking on the element that the element that bears the name of the exercise they wish to edit then the previously inputed values will be populated back into the input fields for editing. The add exercise button will change to an `Update exercise` button since the exercise is to be editted and when the update exercise button is clicked, the new changes will be implemented.

- Click on `Create Hiit` to create the hiit.
    - If the hiit is successfully created, a section that says `Hiit created successfully` fades in for 3 seconds to let the user know the Hiit has been created.
    - They will be navigated to the custom page where the created hiits will be displayed.

### Deleting a Hiit

- Click on the `delete button` on the custom hiit

- A pop-up that says `Delete this hiit` to confirms if a user wants to delete the hit appears
    - this was implemented to enhance error prevention by providing the user with a confirmation option before they commit the action. This support the Nielsen's 5th usability Heuristic which suggests "error prevention"

- The user can click on the  `Yes, Delete` button to delete the hiit.
    - upon deleting the hiit, the hiit card is removed from the custom page and a section that says `Hiit deleted successfully` fades in for 3 seconds to let the user know that the hiit has been deleted.

- If the users doesn't want to delete the hiit any more, they can click on `cancel`, `close icon`, or `any part of the screen` to close the pop-up


### Viewing Hiit history/record
- Navigate to the dashboard section
    - The dashboard provides the following information:
    - `Total time spent doing hiits` which has a yellow border color.
    - `Number of Hiits completed` which has a purple border color.
    - `Number of Exercises completed` which has a purple border color.
    - A `finished Hiits` section that displays the `name` and `duration` of each completed hiit.
    - The data is store to the local storage so each user cann see their personalised records.

### Installing `SeeFit` as a Progressive Web App
- Open your browser and navigate to the URL where the web app is hosted.

- In the browser `address bar`, you will see a `desktop-like icon`. Click on that icon to access the installation options.

- Select the install option to install the web app.

- if prompted, confirm the stallation by clicking `Install` or `Add`.

- The web app will now be installed and accessible from your device's home screen or app launcher.

- I chose to make the project a progressive web app to provide users ability to install the app on their device, providing a one-tap access just like traditional apps. By implementing this, I have been able to deliver an app-like experience to the users within the browser, offering convinient, efficient, and easy way to access and use the app.  Making this app a Progressive Web App adheres to Jakob Nielsen's "Match Between System and the Real World" heuristic by delivering a native app-like capabilities within the browser environment allows PWAs to speak the users' language and follow real-world conventions, reducing cognitive load and enhancing usability.

### Toggling Theme
- You can toggle between `Light mode` and `dark mode` by clicking on the icon at the top right corner of the app.

### Audio Cues
- I implemented audio cue using a sound I created with my voice on audacity. This can help significantly enhance the user experience of SeeFit by providing pace and cadence for exercises that involve rhythmic movements such as jumping jacks or mountain jacks to keep users engaged through out the activity. With this being implemented, the users do not constantly have to stare at their device to check for time as they know the exercise time has elapsed when the audio cue sound stops. This aligns with the Nielsen's 1st usability Heuristic which suggests "visibility of system status" as the system always keeps users informed about what's going on in the app.
- The user has the ability to mute and unmute the audio cue if they desire.

## Project Structure

## Root Directory

- **client**
    - **media**
        - **audio**
            - **timer.ogg**
        - **image**
            - **192.png**
            - **512.png**    
    - **screens**
        - **createhiit.inc**
        - **custom.inc**
        - **dashboard.inc**
        - **default.inc**
        - **hiit.inc**
        - **performhiit.inc**
    - **scripts**
        - **createhiit.js**
        - **deletehiit.js**
        - **index.js**
        - **populatecards.js**
        - **record.js**
        - **script.js**
        - **timer.js**
    - **index.html**
    - **manifest.json**
    - **style.css**
    - **sw.js**
- **migrations-sqlite**
    - **001-initial.sql**
- **gitignore**
- **database.sqlite**
- **hiitboard.js**
- **package-lock.json**
- **package.json**
- **README.md**
- **server.js**

- I chose to use this folder structure to organise the various componenrs of the application in a logical and modular manner. This approach promotes code maintainability and scalability. I have separated the client-side code and the server-side code into different folders. The `client` folder contains all the front-end assets, including the `media` files(images), `screen` components, and `scripts` for specific functionalities that have to do with the front-end. 
- The `server.js` file is the entry point for the node.js server, handling server-side logic and routing.
- The `sw.js` file is the service worker script which enables caching and backround sync for the Progressive Web App.

## API
The server side of the project contains a file `hiitboard.js` which contains APIs that communicate with the server to perform the following operations:
- `/hiits`
    - GET: Retrieve all the Hiits in the database.
    - POST: Upload Hiits created by users to the database.
- `/hiits/:id`
    - DELETE:  Delete a hiit from the database
- `/exercise` 
    - GET: Retrieve all the Exercises in the database.
    - POST: UPload added exercises added by users to the database.
- `app`
    - GET: Serves the _index.html_ from the client in response to GET requests that start with  _/app_


## Database
This web app was developed using `SQLite` to store Hiit data. This is because SQLite is self-contained which means it requires minimal support from the operating system or external library. SQLite is fast, which can be attributed to the fact that it is a lightweight DBMS with simple operations and minimal design.
- The database is created bt the `init()` function in the `hiitboard.js` when the server is ran. 
- The folder `migrations-sqlite` contains the file `001-initial.sql` which contains the script that create the database entities(tables), fields(columns), and inserts data for the default hiits.


## Improvements

- Removal of menu button; I had a menu section which had pages like `settings`, `favourites`, and `about`.
    - I decided to replace the setiings page with theme icons since the only setting I was going to implement was theme.
    - I replaced the favourites page with a dashboard page because I the users would be more concerned with viewing their records and progress than saving a hiit
- Implementation of One-page app using screens: I initially had just one html file, index.html where I hid and displayed sections when needed. I decided to get rid of this because it was not scalable as the app become more complicated.


## AI

- I utilised Ai to generate appropriate comments for my functions.
- 

## References
- ChatGPT. (n.d.). Openai.com. https://www.openai.com/chatgpt

- Google. (n.d.). Google Fonts. Google Fonts. https://fonts.google.com/icons



‌




