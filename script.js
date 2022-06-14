let anime = undefined
document.getElementById('searchButton').addEventListener('click', () => {
    let id = document.getElementById('inputText').value
    console.log(id)
    fetch(`https://api.jikan.moe/v3/search/anime?q=` + id)
        .then(response => {
            return response.json()
        }).then(results => {
            console.log(results.results)
            anime = results.results
            addAnimeList(anime)
        })
})

function addAnimeList(animeList) {
    let counter = 1
    const tableBody = document.getElementById('tableBody')
    tableBody.innerHTML = ''
    for (anime of animeList) {
        showAnimeOnTable(counter++, anime)
    }
}

function showAnimeOnTable(index, anime) {
    const tableBody = document.getElementById('tableBody')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.innerHTML = index
    cell = document.createElement('td')
    let img = document.createElement('img')
    img.setAttribute('src', anime.image_url)
    img.height = 300
    cell.appendChild(img)
    row.appendChild(cell)
    tableBody.appendChild(row)
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = anime.title
    row.appendChild(cell)
    cell = document.createElement('td')
    const button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-primary')
    button.setAttribute('type', 'button')
    button.innerHTML = 'Like'
    button.addEventListener('dblclick', function() {
        let cf = confirm(`ท่านต้องการเพิ่ม ${anime.title} เข้าในรายการชื่นชอบหรือไม่`)
        if (cf) {
            console.log(anime)
            addAnimeToDBFav(anime)
        }
    })
    cell.appendChild(button)
    row.appendChild(cell)
    tableBody.appendChild(row)
}



function addAnimeToDBFav(anime) {
    let movie = {
        url: anime.url,
        image_url: anime.image_url,
        title: anime.title,
        synopsis: anime.synopsis,
        type: anime.type,
        episodes: anime.episodes,
        score: anime.score,
        rated: anime.rated,
    }

    let request = {
        id: anime.mal_id,
        movie: movie
    }
    fetch(`https://se104-project-backend.du.r.appspot.com/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    }).then(response => {
        console.log(response)
            // if (response.status === 200) {
            //     return response.json()
            //     console.log(anime)
            // } else {
            //     throw Error(response.statusText)
            // }
    }).catch(error => {
        throw Error(error)
    })

}

// var listAnimeResult = document.getElementById('output')
// var addAnimeToFavs = document.getElementById('')

// function hideAll() {
//     listAnimeResult.style.display = 'none'
//     addAnimeToFavs.style.display = 'none'

// }
// document.getElementById('favoriteAnime').addEventListener('click', () => {
//     hideAll()
//     addAnimeToFavs.style.display = 'block'

// })

// function showFavAnime() {

// }