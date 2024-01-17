async function fetchRepositories() {
    const username = document.getElementById('username').value;
    const repositoriesElement = document.getElementById('repositories');
    const loaderElement = document.getElementById('loader');

    repositoriesElement.innerHTML = '';
    loaderElement.style.display = 'inline-block';

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repositories = await response.json();

        repositories.forEach(repo => {
            const listItem = document.createElement('li');
            listItem.className = 'repository';
            listItem.textContent = repo.name;
            repositoriesElement.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching repositories:', error);
        alert('Error fetching repositories. Please check the console for details.');
    } finally {
        loaderElement.style.display = 'none';
    }
}