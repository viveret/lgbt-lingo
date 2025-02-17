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
        li.innerHTML = `<strong>${word.name}</strong>: ${word.desc_short}`;
        li.addEventListener('click', () => {
          window.location.href = `word.html?word=${encodeURIComponent(word.name)}`;
        });
        wordList.appendChild(li);
      });
    };

    // Sort the word list by word name
    const sortedWords = data.sort((a, b) => a.word.localeCompare(b.word));

    // Display all words initially
    displayWords(sortedWords);

    // Add search functionality
    searchBox.addEventListener('input', () => {
      const searchTerm = searchBox.value.toLowerCase();
      const filteredWords = sortedWords.filter(word => 
        word.name.toLowerCase().includes(searchTerm) || 
        word.desc_short.toLowerCase().includes(searchTerm)
      );
      displayWords(filteredWords);
    });
  })
  .catch(error => console.error('Error fetching word list:', error));