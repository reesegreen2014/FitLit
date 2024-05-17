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
  let { id, strideLength, dailyStepGoal, friends, name } = getUserData(users.users, randomIndex)
  userInfo.innerHTML = `Your information: 
<p>ID: ${id}, </p>
<p> Stride Length ${strideLength}, </p>
<p> Daily Step Goal ${dailyStepGoal}, </p>
<p> Friends: ${getFriendsNames(friends, users.users)}</p>`
  userName.innerText = `${name}`
  displayStepGoal()
}

function getFriendsNames(friendsIds, users) {
  const friends = users.filter((user) => friendsIds.includes(user.id))
  return friends.map((friend) => friend.name).join(', ')
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