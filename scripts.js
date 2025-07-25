//Global variables
const apiKey = process.env.NEWS_API_KEY; //storing the API key
//This string represents the API endpoint
const url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}` //inserting the API key into the string via template liteal

//Asynchronous function: fetching with async/await
async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); 
        displayNews(data.articles); //articles property in the data
    }
    catch (error) {console.error('There was an error.', error);}
}
//Function call
fetchNews();

//Function to append elements in the news div
function displayNews(articles) {
    const newsDiv = document.querySelector('#news');

    for (const article of articles) {
        //creating an articleDiv inside the news div
        const articleDiv = document.createElement('div');

        //create and append a headline to the articleDiv
        const title = document.createElement('h3');
        title.textContent = article.title;
        articleDiv.appendChild(title);
    
        //create and append an author to the articleDiv
        const author = document.createElement('h6');
        author.textContent = article.author;
        articleDiv.appendChild(author);
        
        //create and append a photo to the articleDiv
        const image = document.createElement('img');
        image.src = article.urlToImage;
        articleDiv.appendChild(image);

        //create and append a description to the articleDiv
        const description = document.createElement('p');
        description.textContent = article.description;
        articleDiv.appendChild(description);

      newsDiv.appendChild(articleDiv);
    }
}

//Search bar
//Event listener on search button using the value of the input
document.getElementById('search-button').addEventListener('click', async () => {
    //Asynchronous anonymous function on click
    document.getElementById('news').innerHTML = ''; //clear page before showing search results

    const query = document.getElementById('search-input').value; //query is the value of the input

    if (!query.trim()) return; //(trim to remove any potential whitespace) if string is empty return cancels the function

    //else, if string not empty: include query in the search url
    const searchUrl = `https://newsapi.org/v2/top-headlines?country=us&category=technology&q=${encodeURIComponent(query)}&apiKey=${apiKey}`;

    //try and catch block in case any error occurs while trying to fetch the search url
    try {
        const response = await fetch(searchUrl);
        const data = await response.json();
        displayNews(data.articles);}   
    catch (error) {console.error('Search failed:', error);}
});