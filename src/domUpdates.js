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
let s{id, strideLength, dailyStepGoal, friends, name} = getUserData(users.users, randomIndex)
 userInfo.innerHTML = `Your information: 
<p>ID: ${id}, </p>
<p> Stride Length ${strideLength}, </p>
<p> Daily Step Goal ${dailyStepGoal}, </p>
<p> Friends: ${friends}</p>`
 userName.innerText = `${selectedIndex.name}`
 displayStepGoal()
}

displayRandomUser()
function displayStepGoal() {
  let stepGoalComparison = calculateAverageStepGoal(users.users)
  stepGoal.innerText = `Your step goal compared with all other users: ${stepGoalComparison}`
  
}
addEventListener('load', displayRandomUser)

export {
  getRandomIndex, displayRandomUser
}