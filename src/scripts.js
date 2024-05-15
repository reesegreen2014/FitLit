


// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

// An example of how you tell webpack to use a JS file
import userData from './data/users';
// console.log("User Data:", userData);

// Example of one way to import functions from the domUpdates file.  You will delete these examples.
import { getRandomIndex, displayRandomUser } from './domUpdates';

displayRandomUser()


export { getUserData, calculateAverageStepGoal };