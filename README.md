# FitLit

## Overview

FitLit is an activity tracker that helps you monitor various aspects of your daily health and fitness. It tracks data such as your daily step goal, your step goal compared to all other users, your water consumption, your sleep data, and your sleep quality.

## Goals

- Provide users with comprehensive activity tracking.
- Implement Fetch API to pull user data in and display that on the DOM.
- Implement POST API to allow users to log data and store that on the API.
- Incorporate charts.js to display user data in a user-friendly fashion.
- Ensure data accuracy through robust testing.

## Technologies Used

- **JavaScript**: Core logic and functionality, including DOM manipulation.
- **HTML & CSS**: Structure and styling of the application, featuring sleek animations.
- **Fetch API**: Fetches data from external sources.
- **POST API**: Sends data to external sources and keeps a log of it, while also updated the DOM in real-time.
- **Mocha & Chai**: Testing framework to ensure code reliability and correctness.

## Installation

**Install Backend API**
1. Follow the instructions in this README to get the API running. 
[API Setup](https://github.com/turingschool-examples/fitlit-api)

**Install and launch application**
1. Clone repository onto your local machine using command git clone 
2. cd into the repository
3. Install dependencies using npm install
4. Run the program using npm start

## Challenges

- **Fetch API**: Implementing fetch API to retrieve data was new for us. We faced issues with asynchronous data fetching and handling errors effectively.
- **Team Collaboration**: Adapting our working styles to meet benchmarks required constant communication and coordination.
- **Testing**: Ensuring comprehensive test coverage following both happy and sad paths.

## Wins

- Successfully integrated the Fetch API for real-time data fetching.
- Successfully implemented charts.js to display data in a dynmaic user-friendly chart
- Successfully integrated POST API to allow users to log their own data to external source
- Developed a robust test suite that ensured code reliability.
- Improved team collaboration and project management skills.
- Developing an accessibility-first application

## Screenshots/GIFs

![GIF of application](./src/images/Application.gif)

## Contributors

**Reese Green reesegreen2014@me.com [Github](https://github.com/reesegreen2014 )**

**Kyle Boomer kylemboomer@gmail.com [Github](https://github.com/KyleMBoomer)**

**Kevin Nelson kmnelson23@gmail.com [Github](https://github.com/kevinm23nelson)**

## Future Enhancements 
- Enhance the user interface with customizable themes and layouts.
- Expand data tracking capabilities to include additional metrics such as nutrition, heart rate, and stress levels.