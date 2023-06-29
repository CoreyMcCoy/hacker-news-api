//* API Practice with the Hacker News API
const input = document.querySelector('#search');
const button = document.querySelector('#submit');
const ul1 = document.querySelector('.first-ul');
const ul2 = document.querySelector('.second-ul');

// Get data from Hacker News API
const getData = async () => {
  // Set the search parameter from the input value
  const searchTerm = input.value;
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/user/${searchTerm}.json?print=pretty`
  );
  let data = await response.json();
  const { about, id, karma, submitted } = data;

  console.log(data);

  // Display the data in the DOM
  ul1.innerHTML = `
    <li><strong>Username:</strong> ${id}</li>
    <li><strong>Karma:</strong> ${karma}</li>
    <li><strong>About:</strong> ${about}</li>
  `;

  // Loop over the submit array and display them in the DOM
  submitted.forEach((item) => {
    // Make the API call for each item in the array and get the title and make it a link
    const getTitles = async () => {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
      );
      let data = await response.json();
      console.log(data);
      let { title, text, id, kids } = data;

      if (text === undefined) {
        text = 'No text available';
      }

      if (kids === undefined) {
        kids = 'No kids available';
      }

      ul2.innerHTML += `
        <li><strong>ID:</strong> ${id}</li>
        <li>Title: <a href="https://news.ycombinator.com/item?id=${item}">${title}</a></li>
        <li><strong>Text:</strong> ${text}</li>
      `;
    };
    getTitles();
  });

  // Clear the input value and reset the form
  input.value = '';
  input.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload();
  });
};

button.addEventListener('click', (e) => {
  e.preventDefault();
  if (input.value === '') {
    alert('Please enter a search term');
  } else {
    // Call the hn function
    getData();
  }
});
