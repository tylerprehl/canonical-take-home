import './style.scss';




function formatDate(dateProvided) {
    const monthOptions = {month: 'long'}
    const monthFormatter = new Intl.DateTimeFormat('en-US', monthOptions);

    const day = dateProvided.getDate();
    const month = monthFormatter.format(dateProvided);
    const year = dateProvided.getFullYear();
    return day + " " + month + " " + year;
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

    const articleCardsContainer = document.querySelector('div.row');
    articleCardsContainer.appendChild(newArticleCard);
}

function getImageInformation(articleInfo) {
    let imageUrl = '';
    let imageAlt = '';
    if (JSON.stringify(articleInfo._embedded).includes('wp:featuredmedia')) {
        imageUrl = articleInfo._embedded['wp:featuredmedia'][0].source_url.replace('admin.','');
        imageAlt = articleInfo._embedded['wp:featuredmedia'][0].title.rendered;   
    }
    else {
        imageUrl = '../images/canonical-default-image-1.webp';
        imageAlt = 'Canonical Ubuntu';
    }
    return [imageUrl, imageAlt];
}

function getTopic(articleInfo) {
    let topic = '';
    if (JSON.stringify(articleInfo._embedded['wp:term'][2]).includes('name')) { 
        topic = articleInfo._embedded['wp:term'][2][0].name; 
    }
    else { 
        topic = 'Hot Off the Press';
    }
    return topic;
}
/* 
async function downloadImage(imageSrc) {
    console.log(imageSrc);
} */

async function getApiData(apiUrl) {
    const response = await fetch (apiUrl, {mode: 'cors'});
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
}

let apiData = await getApiData('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json');

apiData.forEach(async (articleInfo) => {
    const dateFormatted = formatDate(new Date(articleInfo.date));

    const topic = getTopic(articleInfo);
    const title = articleInfo.title.rendered;
    const author = articleInfo._embedded.author[0].name;
    const authorLink = articleInfo._embedded.author[0].link;

    const imageInfo = getImageInformation(articleInfo);
    const imageUrl = imageInfo[0];
    const imageAlt = imageInfo[1];

    console.log(`
    Topic: ${topic} \n
    Title: ${title} \n
    Date: ${dateFormatted} \n
    Author: ${author} \n
    Author Link: ${authorLink} \n
    Image URL: ${imageUrl} \n
    Image Alt: ${imageAlt}
    `)

    createArticleCard(topic, title, dateFormatted, author, authorLink, imageUrl, imageAlt);
});

/*
"Canonical Ubuntu" Default Image Reference:
URL: https://www.hackster.io/news/canonical-launches-ubuntu-pro-with-10-years-updates-offers-individuals-five-free-machine-licenses-25348242f20b
*/