const {getUserData, calculateAverageStepGoal} = require('../src/images/userData.js')
import userData from './data/users';

const userInfo = document.querySelector('#userInfo')


function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayRandomUser() {
let randomUser = getRandomIndex(userData)
return userInfo.innerHTML = `${randomUser}`
}

userInfo.addEventListener('load', displayRandomUser)



export {
  getRandomIndex, displayRandomUser
}