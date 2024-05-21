// apiCalls.js

// apiCalls.js

function fetchUsers() {
    return fetch('https://fitlit-api.herokuapp.com/api/v1/users')
      .then(response => response.json())
      .then(data => {
        if (!data.users) {
          throw new Error('Users key not found in response');
        }
        return data.users;
      })
      .catch(error => console.error('Error fetching users:', error));
  }
  
  function fetchActivityData() {
    return fetch('https://fitlit-api.herokuapp.com/api/v1/activity')
      .then(response => response.json())
      .then(data => {
        if (!data.activityData || !Array.isArray(data.activityData)) {
          throw new Error('No activity data found or data format incorrect');
        }
        return data.activityData;
      })
      .catch(error => console.error('Error fetching activity data:', error));
  }
  
  function fetchHydrationData() {
    return fetch('https://fitlit-api.herokuapp.com/api/v1/hydration')
      .then(response => response.json())
      .then(data => {
        if (!data.hydrationData || !Array.isArray(data.hydrationData)) {
          throw new Error('No hydration data found or data format incorrect');
        }
        return data;
      })
      .catch(error => console.error('Error fetching hydration data:', error));
  }
  
  function fetchSleepData() {
    return fetch('https://fitlit-api.herokuapp.com/api/v1/sleep')
      .then(response => response.json())
      .then(data => {
        if (!data.sleepData || !Array.isArray(data.sleepData)) {
          throw new Error('No sleep data found or data format incorrect');
        }
        return data;
      })
      .catch(error => console.error('Error fetching sleep data:', error));
  }
  
  export { fetchActivityData, fetchUsers, fetchHydrationData, fetchSleepData };
  
  
  
//console.log('I will be a fetch request!')

