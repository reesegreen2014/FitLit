function getUserData(users, id) {
    const computerUser = users.find((user) => user.id === id)
    if (!computerUser) {
        return 'Invalid ID'
    }
    if (typeof id !== 'number') {
        return 'Invalid ID'
    }
    return computerUser;
}

function calculateAverageStepGoal(users){
    const totalSteps = users.reduce((acc, user) => {
        acc += user.dailyStepGoal;
        return acc;
    }, 0)
    if (!totalSteps) {
        return 'No User Information Provided'
    }
    return totalSteps/users.length;
}

export { getUserData, calculateAverageStepGoal };