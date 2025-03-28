// import users array of object and test the functions
import { users, sampleUser } from "./users.js";

// Part 1: Data Transformation
export function processUserData(users) {
  return users
    .filter((user) => user.isActive)
    .map((user) => ({
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
    }))
    .sort((a, b) => a.fullName.localeCompare(b.fullName));
}

// Part 2: Async Data Fetching
export async function fetchUserPosts(userId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();
    return posts.map((post) => post.title);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

// Part 3: Creating a User Component (Simulated)
export function createUserProfileHTML(user) {
  const activeBadge = user.isActive
    ? '<span class="badge active">Active</span>'
    : '';

  return `
    <div class="user-card" id="user-${user.id}">
      <img src="${user.avatar}" alt="${user.firstName} ${user.lastName}" class="avatar" />
      <div class="user-info">
        <h2>${user.firstName} ${user.lastName}</h2>
        <p>Email: ${user.email}</p>
        <p>Role: ${user.role}</p>
        ${activeBadge}
      </div>
    </div>
  `;
}

// Part 4: State Management Helper
export function createStateManager(initialState) {
  let state = { ...initialState };
  const subscribers = [];

  return {
    // The getState() method
    getState: () => ({ ...state }),

    // The setState() method
    setState: (newState) => {
      state = { ...state, ...newState };
      subscribers.forEach((callback) => callback(state));
    },

    // The the subcribe callback function(method)
    subscribe: (callback) => {
      subscribers.push(callback);
      // Return unsubscribe function
      return () => {
        const index = subscribers.indexOf(callback);
        if (index !== -1) {
          subscribers.splice(index, 1);
        }
      };
    },
  };
}

console.log('Processed Users:', processUserData(users));

fetchUserPosts(1)
  .then((titles) => console.log('User Posts:', titles))
  .catch((error) => console.error('Error fetching posts:', error));


console.log('User Profile HTML:', createUserProfileHTML(sampleUser));

const userState = createStateManager({ name: 'John', online: false });
userState.subscribe((state) => console.log('State changed:', state));
console.log('Initial State:', userState.getState());
userState.setState({ online: true });
userState.setState({ lastActive: '2023-05-01' });
