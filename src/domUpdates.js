import { getUserData, calculateAverageStepGoal} from './userData.js'
import users from './data/users.js'

const userInfo = document.querySelector('#userInfo')
const userName = document.querySelector('.userFirstName')
const stepGoal = document.querySelector('#stepGoalComparison')


function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayRandomUser() {
let randomIndex = getRandomIndex(users.users)
let selectedIndex = getUserData(users.users, randomIndex)
 userInfo.innerText = `Your data as of yet: ID: ${selectedIndex.id}, Stride Length ${selectedIndex.strideLength}, Daily Step Goal ${selectedIndex.dailyStepGoal}, Friends: ${selectedIndex.friends} `
 userName.innerText = `${selectedIndex.name}`
 displayStepGoal()
}

addEventListener('load', displayRandomUser)

displayRandomUser()
function displayStepGoal() {
let stepGoalComparison = calculateAverageStepGoal(users.users)
stepGoal.innerText = `Your step goal compared with all other users: ${stepGoalComparison}`

}

export {
  getRandomIndex, displayRandomUser
}