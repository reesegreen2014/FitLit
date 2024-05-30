function fetchData(url, key) {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!data[key] || !Array.isArray(data[key])) {
        throw new Error(`No ${key} data found or data format incorrect`);
      }
      return data[key];
    })
    .catch(error => console.error(`Error fetching ${key} data:`, error));
}

export function fetchUsers() {
  return fetchData('https://fitlit-api.herokuapp.com/api/v1/users', 'users');
}

export function fetchActivityData() {
  return fetchData('https://fitlit-api.herokuapp.com/api/v1/activity', 'activityData');
}

export function fetchHydrationData() {
  return fetchData('https://fitlit-api.herokuapp.com/api/v1/hydration', 'hydrationData');
}

export function fetchSleepData() {
  return fetchData('https://fitlit-api.herokuapp.com/api/v1/sleep', 'sleepData');
}

//POSTS
export function postHydrationData(userID, date, numOunces) {
  return fetch('http://localhost:3001/api/v1/hydration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userID, date, numOunces })
  })
  .then(response => response.json())
  .catch(err => console.error('Error posting hydration data:', err));
}