import {
  processUserData,
  fetchUserPosts,
  createUserProfileHTML,
  createStateManager,
} from './userProfile.js';
import { users, sampleUser } from './users.js';

// Display processed users
const processedUsers = processUserData(users);
const processedUsersTable = document.getElementById('processed-users');
processedUsers.forEach((user) => {
  const row = document.createElement('tr');
  row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.fullName}</td>
                <td>${user.email}</td>
            `;
  processedUsersTable.appendChild(row);
});

// Display user posts
const userPostsList = document.getElementById('user-posts');
fetchUserPosts(1).then((titles) => {
  titles.forEach((title) => {
    const li = document.createElement('li');
    li.textContent = title;
    userPostsList.appendChild(li);
  });
});

// Display user profile
document.getElementById('user-profile').innerHTML =
  createUserProfileHTML(sampleUser);

// State management processes
const initialStateElement = document.getElementById('initial-state');
const currentStateElement = document.getElementById('current-state');

const userState = createStateManager({ name: 'John', online: false });
initialStateElement.textContent = JSON.stringify(userState.getState(), null, 2);
currentStateElement.textContent = JSON.stringify(userState.getState(), null, 2);

userState.subscribe((state) => {
  currentStateElement.textContent = JSON.stringify(state, null, 2);
});

// Simulate state changes
setTimeout(() => userState.setState({ online: true }), 1000);
setTimeout(() => userState.setState({ lastActive: '2023-05-01' }), 2000);

// Console output
const consoleOutput = document.getElementById('console-output');
function logToScreen(message) {
  consoleOutput.textContent += message + '\n';
}

logToScreen('Processed Users: ' + JSON.stringify(processedUsers, null, 2));
fetchUserPosts(1)
  .then((titles) => logToScreen('User Posts: ' + JSON.stringify(titles)))
  .catch((error) => logToScreen('Error fetching posts: ' + error));
logToScreen('User Profile HTML: ' + createUserProfileHTML(sampleUser));
logToScreen('Initial State: ' + JSON.stringify(userState.getState(), null, 2));
userState.subscribe((state) => {
  logToScreen('State changed: ' + JSON.stringify(state, null, 2));
});
