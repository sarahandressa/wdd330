

document.querySelector('#searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.querySelector('#searchInput').value.trim();
    if (!query) return;

    document.querySelector('#loading').classList.remove('hidden');

    try {
        const res = await fetch (`/api/books?q=${encodeURIComponent(query)}`);
        const books = await res.json();

        const results = document.querySelector('#results');
        results.innerHTML = books.map(book => `
          <div class="book-card">
            <img src="${book.volumeInfo.imageLinks?.thumbnail || ''}" alt="${book.volumeInfo.title}" />
            <h3>${book.volumeInfo.title}</h3>
            <p>${book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
          </div>  
        `).join('');
    } catch (error) {
        console.error('Error fetching books:', error);  
    } finally {
        document.querySelector('#loading').classList.add('hidden');
    }

});
