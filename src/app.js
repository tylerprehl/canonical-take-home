import './style.scss';


async function getApiData(apiUrl) {
    const response = await fetch (apiUrl, {mode: 'cors'});
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
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
    

    console.log(`
    Title: ${articleInfo.title.rendered} \n
    Date: ${dateFormatted} \n
    Author: ${articleInfo._embedded.author[0].name}
    `)
});
