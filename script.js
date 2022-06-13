let keyword = undefined
let anime = undefined
document.getElementById('searchButton').addEventListener('click', () => {
    let id = document.getElementById('inputText').value
    console.log(id)
    fetch(`https://api.jikan.moe/v3/search/anime?q=` + id)
        .then(response => {
            return response.json()
        }).then(results => {
            console.log(results.results)
            keyword = results.results
            addAnimeList(keyword)
        })
})

function addAnimeList(animeList) {
    let counter = 1
    const tableBody = document.getElementById('tableBody')
    tableBody.innerHTML = ''
    for (keyword of animeList) {
        showAnimeOnTable(counter++, keyword)
    }
}

function showAnimeOnTable(index, keyword) {
    const tableBody = document.getElementById('tableBody')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.innerHTML = index
    cell = document.createElement('td')
    let img = document.createElement('img')
    img.setAttribute('src', keyword.image_url)
    img.height = 300
    cell.appendChild(img)
    row.appendChild(cell)
    tableBody.appendChild(row)
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = keyword.title
    row.appendChild(cell)
    cell = document.createElement('td')
    const button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-primary')
    button.setAttribute('type', 'button')
    button.innerHTML = 'Like'
    button.addEventListener('click', function() {
        let cf = confirm(`ท่านต้องการเพิ่ม ${keyword.title} หรือไม่`)
        if (cf) {
            console.log(keyword.title)
            addAnimeToFav(keyword.title)


        }
    })
    cell.appendChild(button)
    row.appendChild(cell)
    row.appendChild(cell)
    tableBody.appendChild(row)

}

function addAnimeToFav(anime) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(anime)
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        console.log('Success', data)
        showFavAnime()
    }).catch(error => {
        return null
    })

}

function showFavAnime() {

}