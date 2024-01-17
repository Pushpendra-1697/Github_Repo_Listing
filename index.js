const repositoriesElement = document.getElementById('repositories');
const loaderElement = document.getElementById('loader');
const userDetails = document.querySelector('.user-details');
const github = document.querySelector('.github');

async function fetchUserInfo() {
    const username = document.getElementById('username').value;
    userDetails.innerHTML = null;
    github.innerHTML = null;
    loaderElement.innerHTML = null;

    try {
        loaderElement.style.display = 'block';
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userInfo = await response.json();

        console.log(userInfo);

        loaderElement.style.display = 'none';
        if (userInfo.message === 'Not Found') {
            return alert(`Invalid username ${username}`);
        };
        let avatarContainer = document.createElement('div');
        let profileImage = document.createElement('img');
        profileImage.src = userInfo?.avatar_url ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2paNURw1DBfUC5w4I3m3EoIo7vHLpWxtXCg&usqp=CAU';
        profileImage.setAttribute('alt', userInfo?.name);
        avatarContainer.appendChild(profileImage);

        const detailsContainer = document.createElement('div');
        const person = document.createElement('h1');
        person.innerText = userInfo?.name;
        person.style.fontSize = '21px';
        let bio = document.createElement('p');
        bio.innerText = userInfo?.bio;

        let locationContainer = document.createElement('div');
        locationContainer.setAttribute('class', 'location');
        const locationIcon = document.createElement('i');
        locationIcon.setAttribute('class', 'fa-solid fa-location-dot');
        locationIcon.style.fontSize = '21px';
        const location = document.createElement('p');
        location.innerText = userInfo?.location;
        locationContainer.append(locationIcon, location);

        const twitter = document.createElement('p');
        twitter.innerText = `Twitter: https://twitter.com/${userInfo?.twitter_username}`;

        detailsContainer.append(person, bio, locationContainer, twitter);

        userDetails.append(avatarContainer, detailsContainer);

        const githubLinkIcon = document.createElement('i');
        githubLinkIcon.style.fontSize = '19px';
        githubLinkIcon.setAttribute('class', 'fa-solid fa-paperclip');
        const githubState = document.createElement('p');
        githubState.innerText = `https://github.com/${userInfo?.login}`;

        github.append(githubLinkIcon, githubState);

        fetchRepos(userInfo.repos_url);
    } catch (error) {
        console.error('Error fetching User Details:', error);
        alert('Error fetching User Details. Please check the console for details.');
    } finally {
        loaderElement.style.display = 'none';
    }
};
async function fetchRepos(repos_url) {
    try {
        let repos = await fetch(`${repos_url}?per_page=10`);
        repos = await repos.json();
        renderRepos(repos);
    } catch (error) {
        console.error('Error fetching repositories:', error);
        alert('Error fetching repositories. Please check the console for details.');
    }
};

const renderRepos = (repos) => {
    repositoriesElement.innerHTML = '';
    repos && repos.map(({ topics, name, description }) => {
        let repoContainer = document.createElement('div');
        let nameOfRepo = document.createElement('h2');
        nameOfRepo.innerText = name;
        nameOfRepo.style.color = 'rgb(104, 104, 234)'
        let descOfRepo = document.createElement('p');
        descOfRepo.innerText = description ?? 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis debitis adipisci voluptates recusandae expedita rem, tenetur tempore eveniet illum molestiae cupiditate, saepe odio et.';
        let topicsContainer = document.createElement('div');
        topicsContainer.setAttribute('class', 'topics');
        topics?.forEach((topic, index) => {
            const topicPara = document.createElement('span');
            if (index > 3) return;
            if (index === 3) {
                topicPara.innerText = `${topic} ${topics.length - 4}+`;
            } else {
                topicPara.innerText = topic;
            }
            topicsContainer.appendChild(topicPara);
        });

        repoContainer.append(nameOfRepo, descOfRepo, topicsContainer);
        repositoriesElement.append(repoContainer);
    });
};