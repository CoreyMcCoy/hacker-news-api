//* API Practice with the Hacker News API
const input = document.querySelector('#search');
const button = document.querySelector('#submit');
const ul1 = document.querySelector('.first-ul');
const ul2 = document.querySelector('.second-ul');

// Get data from Hacker News API
const getData = async () => {
  // Set the search parameter from the input value
  const searchTerm = input.value;
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${searchTerm}.json?print=pretty`);
  let data = await response.json();
  const { by, id, kids, text, title, type } = data;

  // Create a new list item and add it to the first list
  const li = document.createElement('li');
  const result = document.querySelector('#result');
  if (title !== undefined) {
    result.innerHTML = `<a href=' https://hacker-news.firebaseio.com/v0/user/${by}.json?print=pretty'>${by}</a> wrote -- ${title}`;
  } else {
    result.innerHTML = `<a href=' https://hacker-news.firebaseio.com/v0/user/${by}.json?print=pretty'>${by}</a> wrote`;
  }
  if (text !== undefined) {
    li.classList.add('originalText');
    li.innerHTML += `<p>${text}</p>`;
  }
  ul1.appendChild(li);

  // Display comments and append them to the second list
  if (kids === undefined) {
    const comments = document.querySelector('#comments');
    comments.innerHTML = 'No comments on this post yet';
  } else {
    const kiddos = kids.forEach(async (kid) => {
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`);
      const data = await response.json();
      const { text } = data;
      const lis = document.createElement('li');
      lis.classList.add('comment-group');
      lis.innerHTML += `<p><span>🔺</span> ${text}</p>`;
      ul2.appendChild(lis);
    });
  }
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
