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
        // cell.setAttribute('')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = keyword.title
    row.appendChild(cell)
    cell = document.createElement('td')
    let img = document.createElement('img')
    img.setAttribute('src', keyword.image_url)
    img.height = 300
    cell.appendChild(img)
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = keyword.synopsis
    row.appendChild(cell)
    tableBody.appendChild(row)
}

function handleShowDropdownSearchBy() {
    const searchString = document.getElementById('searchBy')
    if (searchString.className == 'dropdown-menu') {
        searchString.className = 'dropdown-menu show'
    } else {
        searchString.className = 'dropdown-menu'
    }
}