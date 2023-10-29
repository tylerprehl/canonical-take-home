import './style.scss';


async function getApiData(apiUrl) {
    const response = await fetch (apiUrl, {mode: 'cors'});
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
}

function createArticleCard(topic, title, date, author, authorLink, imageUrl, imageAlt) {
    console.log(`ImageURL: ${imageUrl}`);
    const articleCardTemplate = document.querySelector('.p-card.template');
    const newArticleCard = articleCardTemplate.cloneNode(true);
    newArticleCard.hidden = false;

    newArticleCard.querySelector('.topic').textContent = topic;
    newArticleCard.querySelector('.title').textContent = title;
    newArticleCard.querySelector('.date').textContent = date;
    const authorElement = newArticleCard.querySelector('.author');
    authorElement.textContent = author;
    authorElement.href = authorLink;
    newArticleCard.querySelector('.p-card__image').src = imageUrl;
    newArticleCard.querySelector('.p-card__image').alt = imageAlt;

    const articleCardsContainer = document.querySelector('div.col-5');
    articleCardsContainer.appendChild(newArticleCard);
}

let apiData = await getApiData('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json');

apiData.forEach(async (articleInfo) => {
    const monthOptions = {month: 'long'}
    const monthFormatter = new Intl.DateTimeFormat('en-US', monthOptions);

    const creationDate = new Date(articleInfo.date);
    const day = creationDate.getDate();
    const month = monthFormatter.format(creationDate);
    const year = creationDate.getFullYear();
    const dateFormatted = day + " " + month + " " + year;

    let imageUrl = '';
    let imageAlt = '';
    if (JSON.stringify(articleInfo._embedded).includes('wp:featuredmedia')) {
        imageUrl = JSON.stringify(articleInfo._embedded['wp:featuredmedia'][0].source_url).replace('admin.','');
        imageAlt = articleInfo._embedded['wp:featuredmedia'][0].title.rendered;
    }
    else {
        imageUrl = 'default URL';
        imageAlt = 'default Image Alt'
    }

    let topic = '';
    if (JSON.stringify(articleInfo._embedded['wp:term'][2]).includes('name')) { 
        topic = articleInfo._embedded['wp:term'][2][0].name; 
    }
    else { 
        topic = 'No topic';
    }

    const title = articleInfo.title.rendered;
    const author = articleInfo._embedded.author[0].name;
    const authorLink = articleInfo._embedded.author[0].link;

    console.log(`
    Topic: ${topic} \n
    Title: ${title} \n
    Date: ${dateFormatted} \n
    Author: ${author} \n
    Author Link: ${authorLink} \n
    Image URL: ${imageUrl}
    Image Alt: ${imageAlt}
    `)

    createArticleCard(topic, title, dateFormatted, author, authorLink, imageUrl, imageAlt);
});

/*
Canonical Default Image Reference:
URL: https://www.hackster.io/news/canonical-launches-ubuntu-pro-with-10-years-updates-offers-individuals-five-free-machine-licenses-25348242f20b
*/