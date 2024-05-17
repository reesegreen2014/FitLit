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
 userInfo.innerHTML = `Your information: 
<p>ID: ${selectedIndex.id} </p>
<p> Stride Length: ${selectedIndex.strideLength}</p>
<p> Daily Step Goal: ${selectedIndex.dailyStepGoal} Steps</p>
<p> Friends: ${selectedIndex.friends}</p>`
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