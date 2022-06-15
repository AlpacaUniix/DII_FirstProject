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

function onLoad() {
    hideAll()
}

function addAnimeList(animeList) {
    let counter = 1
    const tableBody = document.getElementById('tableBodyHome')
    tableBody.innerHTML = ''
    for (anime of animeList) {
        showAnimeOnTable(counter++, anime)
    }
}

function showAnimeOnTable(index, anime) {
    const tableBody = document.getElementById('tableBodyHome')
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
            alert(`${anime.title} ได้เพิ่มเข้าไปในรายการที่ชื่นชอบแล้ว`)
            addAnimeToDBFav(anime)
        }
    })
    cell.appendChild(button)
    row.appendChild(cell)
    tableBody.appendChild(row)
}

document.getElementById('favoriteAnime').addEventListener('click', () => {
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/642110330`)
        .then(response => {
            return response.json()
        }).then(results => {
            addAnimeListToFav(results)
        })
})

function addAnimeListToFav(animeList) {
    let counter = 1
    const tableBody = document.getElementById('tableBodyFav')
    tableBody.innerHTML = ''
    for (movie of animeList) {
        showFavAnime(counter++, movie)
    }
}

function showFavAnime(index, movie) {
    const tableBodyFav = document.getElementById('tableBodyFav')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.innerHTML = index
    cell = document.createElement('td')
    let img = document.createElement('img')
    img.setAttribute('src', movie.image_url)

    img.height = 300
    cell.appendChild(img)
    row.appendChild(cell)
    tableBodyFav.appendChild(row)
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = movie.title
    row.appendChild(cell)
    cell = document.createElement('td')
    const buttonDetails = document.createElement('button')
    buttonDetails.classList.add('btn')
    buttonDetails.classList.add('btn-primary')
    buttonDetails.setAttribute('type', 'button')
    buttonDetails.innerHTML = 'Details'

    buttonDetails.addEventListener('click', function() {
        var modal = document.getElementById('Details')
        modal.style.display = "block";


    })
    cell.appendChild(buttonDetails)
    row.appendChild(cell)
    tableBodyFav.appendChild(row)
    row.appendChild(cell)
    cell = document.createElement('td')
    const buttonDelete = document.createElement('button')
    buttonDelete.classList.add('btn')
    buttonDelete.classList.add('btn-danger')
    buttonDelete.setAttribute('type', 'button')
    buttonDelete.innerHTML = 'Delete'
    buttonDelete.addEventListener('click', function() {
        let cf = confirm(`Do you want to delete ${movie.title} ?`)
        if (cf) {
            deleteFavAnime(movie.id)
        }
    })
    cell.appendChild(buttonDelete)
    row.appendChild(cell)
    tableBodyFav.appendChild(row)
}

function deleteFavAnime(id) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=642110330&&movieId=${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(results => {
        alert(`Anime name ${movie.title} is now deleted`)
        fetch(`https://se104-project-backend.du.r.appspot.com/movies/642110330`)
            .then(response => {
                return response.json()
            }).then(results => {
                addAnimeListToFav(results)
            })
    }).catch(error => {
        alert('Your anime id is not in the database.')
    })
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
        id: 642110330,
        movie: movie
    }
    fetch(`https://se104-project-backend.du.r.appspot.com/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    }).then(response => {
        return response.json()
    }).catch(error => {
        throw Error(error)
    })

}


var listAnimeResult = document.getElementById('outputListSearch')
var favoriteAnime = document.getElementById('outputListFav')


function hideAll() {
    listAnimeResult.style.display = 'none'
    favoriteAnime.style.display = 'none'

}
document.getElementById('favoriteAnime').addEventListener('click', () => {
    hideAll()
    favoriteAnime.style.display = 'block'
})

document.getElementById('defaultPage').addEventListener('click', () => {
    hideAll()
    listAnimeResult.style.display = 'block'
})