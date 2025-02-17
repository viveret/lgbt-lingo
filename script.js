// URL to the JSON file containing the word list
const WORDS_URL = 'words.json';

// Fetch the word list and display it
fetch(WORDS_URL)
  .then(response => response.json())
  .then(data => {
    const wordList = document.getElementById('wordList');
    const searchBox = document.getElementById('searchBox');

    // Function to display words
    const displayWords = (words) => {
      wordList.innerHTML = ''; // Clear the list
      words.forEach(word => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${word.word}</strong>: ${word.description}`;
        li.addEventListener('click', () => {
          window.location.href = `word.html?word=${encodeURIComponent(word.word)}`;
        });
        wordList.appendChild(li);
      });
    };

    // Display all words initially
    displayWords(data);

    // Add search functionality
    searchBox.addEventListener('input', () => {
      const searchTerm = searchBox.value.toLowerCase();
      const filteredWords = data.filter(word => 
        word.word.toLowerCase().includes(searchTerm) || 
        word.description.toLowerCase().includes(searchTerm)
      );
      displayWords(filteredWords);
    });
  })
  .catch(error => console.error('Error fetching word list:', error));