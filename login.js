
function openLoginModal() {
    const modal = document.getElementById("loginModal");
    if (modal) {
        modal.style.display = "flex";
    }
}
function closeLoginModal() {
    const modal = document.getElementById("loginModal");
    if (modal) {
        modal.style.display = "none";
    }
}
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username && password) {
        localStorage.setItem('loggedInUser', username);
        localStorage.setItem('loginStatus', '1');
        closeLoginModal();
        enableNavigation();
        updateLoginState();
    } else {
        alert("Please enter valid credentials.");
    }
}
function browseAsGuest(event) {
    event.preventDefault();
    localStorage.setItem('loggedInUser', 'Guest');
    localStorage.setItem('loginStatus', '1');
    closeLoginModal();
    enableNavigation();
    updateLoginState();
}

function disableNavigation() {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', blockNavigation, true);
    });
}
function blockNavigation(event) {
    const loginStatus = localStorage.getItem('loginStatus');
    if (loginStatus !== '1') {
        event.preventDefault();
        openLoginModal();
    }
}

function enableNavigation() {
    document.querySelectorAll('a').forEach(link => {
        link.removeEventListener('click', blockNavigation, true);
    });
}
function updateLoginState() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginLink = document.getElementById('login-link');
    const loginText = document.getElementById('login-text'); 

    if (loggedInUser) {
        loginText.textContent = loggedInUser; 
        loginLink.onclick = handleLogout; 
    } else {
        loginText.textContent = 'Login'; 
        loginLink.onclick = openLoginModal; 
    }
}

function handleLogout() {
    localStorage.removeItem('loggedInUser'); 
    updateLoginState(); 
}

updateLoginState();
document.addEventListener('DOMContentLoaded', () => {
    const hasLoggedIn = localStorage.getItem('loginStatus');
    if (!hasLoggedIn || hasLoggedIn !== '1') {
        disableNavigation();
        openLoginModal();
    } else {
        enableNavigation();
        updateLoginState();
    }
});
