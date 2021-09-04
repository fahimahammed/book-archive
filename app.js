const searchBook = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => randerData(data.docs));
}

const randerData = (data) => {
    
    const booksContainer = document.getElementById('books-container');
    const searchText = document.getElementById('search-field').value;
    booksContainer.className = 'row';
    const warning = document.getElementById("result-num");
    warning.innerHTML = `<h6>${data.length} num</h6>`;

    if(data.length === 0){
        warning.innerHTML = `<h6>Your search ${searchText} was not found on any pages.</h6>`
    }

    booksContainer.innerHTML = '';

    data.forEach(element => {

        let publishYear = "";
        let bookPublisher = "";
        const authors = element.author_name;
        
        element.publish_year ? publishYear = element.publish_year[0] : "N/A";
        element.publisher ? bookPublisher = element.publisher[0] : "N/A";
        
        const bookDiv = document.createElement('div');
        const authorDiv = document.createElement('ul');
        bookDiv.className = "col-md-4";

        bookDiv.innerHTML = `
                <img src = "https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg"/>
                <h5>${element.title}</h5>
                <p>Publish Year: ${publishYear}</p>
                <p>Publisher: ${bookPublisher}</p>
        `;

        authors ? authors.forEach(author => {
            authorDiv.innerHTML = `
                <li>${author}</li>
            `
        }) : "";
        bookDiv.appendChild(authorDiv);
        booksContainer.appendChild(bookDiv);
        document.getElementById('search-field').value = "";  
    });
}
