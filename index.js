const repositoriesElement = document.getElementById('repositories');
const loaderElement = document.getElementById('loader');

async function fetchUserInfo() {
    const username = document.getElementById('username').value;
    try {
        loaderElement.style.display = 'block';
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userInfo = await response.json();
        loaderElement.style.display = 'none';
        if (userInfo.message === 'Not Found') {
            return alert(`Invalid username ${username}`);
        }
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
        let descOfRepo = document.createElement('p');
        descOfRepo.innerText = description;
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
        repositoriesElement.append(repoContainer)
    });
};