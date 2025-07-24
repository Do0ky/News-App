//Global variables
const apiKey = process.env.NEWS_API_KEY; //storing the API key
//This string represents the API endpoint
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}` //inserting the API key into the string via template liteal

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