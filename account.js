const apiUrl = 'https://mokesell-3ddd.restdb.io/rest/userss'; 
const apiKey = '67a60e04f59921a39048b97f';

fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
    });

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username') || localStorage.getItem('username');

if (!username) {
    alert('Username not found. Redirecting to login page...');
    window.location.href = 'login.html';
} else {
    fetch(`${apiUrl}?q={"username":"${decodeURIComponent(username)}"}`, {
        method: 'GET',
        headers: {
            'x-apikey': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Fetched Data:', data);

        if (data.length > 0) {
            const user = data[0]; 
            console.log('User Data:', user);

            document.getElementById('user-name').textContent = user.name || 'Not provided';
            document.getElementById('user-username').textContent = user.username || 'Not provided';
            document.getElementById('user-email').textContent = user.email || 'Not provided';

            const profilePic = user.pfp || '';
            const profilePicElement = document.getElementById('profile-pic');
            if (profilePic) {
                profilePicElement.innerHTML = `<img src="${profilePic}" alt="Profile Picture" style="width: 100%; height: 100%; border-radius: 50%;">`;
            }
        } else {
            alert('User not found');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error fetching user details');
    });
}