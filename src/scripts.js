// const { users } = require('../src/data/users.js');

function getUserData(users, id) {
    const computerUser = users.find((user) => user.id === id)
    if (!computerUser) {
         return 'Invalid ID'
    } 
    if(typeof id !== 'number') {
        return 'Invalid ID'
    }
    return computerUser;
}

function calculateAverageStepGoal(users){
    const totalSteps = users.reduce((acc, user) => {
        acc += user.dailyStepGoal;
        return acc;
    }, 0)
    return totalSteps/users.length;
}


//Do we want .find for User ID function? 
// USer ID < 1 a&& < 50
// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

// An example of how you tell webpack to use a JS file
import userData from './data/users';
// console.log("User Data:", userData);

// Example of one way to import functions from the domUpdates file.  You will delete these examples.
// import { exampleFunction1, exampleFunction2 } from './domUpdates';

// exampleFunction1('Travis');
// exampleFunction2('Travis')

export { getUserData, calculateAverageStepGoal };