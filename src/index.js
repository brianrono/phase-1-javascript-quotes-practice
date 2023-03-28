// Get a reference to the quote list element
const quoteList = document.querySelector('#quote-list');

// Fetch the quotes from the API
fetch('http://localhost:3000/quotes?_embed=likes')
  .then(response => response.json())
  .then(quotes => {
    // Loop through each quote and create a list item for it
    quotes.forEach(quote => {
      const li = document.createElement('li');
      li.className = 'quote-card';
      li.innerHTML = `
        <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
          <button class='btn-danger'>Delete</button>
        </blockquote>
      `;
      quoteList.appendChild(li);
    });
  });


  //  Add quote functionality section
  // Get a reference to the new quote form
const newQuoteForm = document.querySelector('#new-quote-form');

// Add an event listener to the form submit event
newQuoteForm.addEventListener('submit', event => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form data
  const formData = new FormData(event.target);

  // Make a POST request to the API with the form data
  fetch('http://localhost:3000/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      quote: formData.get('quote'),
      author: formData.get('author')
    })
  })
    .then(response => response.json())
    .then(quote => {
      // Create a list item for the new quote and append it to the quote list
      const li = document.createElement('li');
      li.className = 'quote-card';
      li.innerHTML = `
        <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button class='btn-success'>Likes: <span>0</span></button>
          <button class='btn-danger'>Delete</button>
        </blockquote>
      `;
      quoteList.appendChild(li);
    })
    .catch(error => console.error(error));
});


//Delete quote functionality
// Get a reference to the quotes list element
const quotesList = document.querySelector('#quotes-list')

// Attach an event listener to the quotes list element
quotesList.addEventListener('click', event => {
  // Check if the clicked element is a delete button
  if (event.target.classList.contains('btn-danger')) {
    // Get the ID of the quote to delete
    const quoteId = event.target.parentElement.parentElement.dataset.id

    // Make a DELETE request to the API
    fetch(`http://localhost:3000/quotes/${quoteId}`, {
      method: 'DELETE'
    })
    .then(() => {
      // Remove the quote element from the page
      event.target.parentElement.parentElement.remove()
    })
  }
})
