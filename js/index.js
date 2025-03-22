const form = document.querySelector('form');
const usersList = document.querySelector('#user-list');
const reposList = document.querySelector('#repos-list');
const REQUEST_OBJ = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/vnd.github.v3 + json',
	},
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	console.log('works');
	const name = form.querySelector('input').value;
	fetch(`https://api.github.com/search/users?q=${name}`, REQUEST_OBJ)
		.then((res) => res.json())
		.then((obj) => {
			const items = obj.items;
			console.log(items);
			items.forEach((item) => {
				const li = document.createElement('li');
				li.innerHTML = `
                <img src="${item.avatar_url}">
                <p>${item.login}</p>
                <a href="${item.html_url}">Profile link</a>
				<hr>
            `;

				li.addEventListener('click', (e) => {
					reposList.replaceChildren();
					fetch(`https://api.github.com/users/${item.login}/repos`, REQUEST_OBJ)
						.then((res) => res.json())
						.then((arr) => {
							arr.forEach((item) => {
								const li = document.createElement('li');
								li.innerHTML = `
                                <p>${item.name}</p>
                                <a href="${item.html_url}">Repo link</a>
								<hr>
                            `;
								reposList.appendChild(li);
							});
						});
				});
				usersList.appendChild(li);
			});
		});
});
