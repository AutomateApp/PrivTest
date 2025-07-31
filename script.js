// Prosty skrypt do logowania i zarządzania użytkownikami

document.addEventListener('DOMContentLoaded', () => {
  const loginSection = document.getElementById('login-section');
  const appSection = document.getElementById('app-section');
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');

  function getUsers() {
    let users = JSON.parse(localStorage.getItem('users'));
    if (!users) {
      users = [{ username: 'admin', password: 'password' }];
      localStorage.setItem('users', JSON.stringify(users));
    }
    return users;
  }

  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  function login(username, password) {
    return getUsers().some(u => u.username === username && u.password === password);
  }

  function renderUsers() {
    const list = document.getElementById('user-list');
    list.innerHTML = '';
    getUsers().forEach((user, index) => {
      const li = document.createElement('li');
      li.textContent = user.username;
      const btn = document.createElement('button');
      btn.textContent = 'Usuń';
      btn.addEventListener('click', () => {
        const users = getUsers();
        users.splice(index, 1);
        saveUsers(users);
        renderUsers();
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  function showApp() {
    loginSection.classList.add('hidden');
    appSection.classList.remove('hidden');
    renderUsers();
  }

  loginBtn.addEventListener('click', () => {
    const user = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;
    if (login(user, pass)) {
      localStorage.setItem('loggedIn', 'true');
      showApp();
    } else {
      alert('Błędny login lub hasło');
    }
  });

  document.getElementById('add-user-btn').addEventListener('click', () => {
    const user = document.getElementById('new-username').value;
    const pass = document.getElementById('new-password').value;
    if (!user || !pass) return;
    const users = getUsers();
    users.push({ username: user, password: pass });
    saveUsers(users);
    document.getElementById('new-username').value = '';
    document.getElementById('new-password').value = '';
    renderUsers();
  });

  logoutBtn.addEventListener('click', () => {
    localStorage.setItem('loggedIn', 'false');
    appSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
  });

  if (localStorage.getItem('loggedIn') === 'true') {
    showApp();
  }
});
