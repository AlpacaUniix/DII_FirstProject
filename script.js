document.getElementById('searchButton').addEventListener('click', () => {
    let id = document.getElementById('inputText').value
    console.log(id)
    fetch(`https://api.jikan.moe/v3/search/anime?q=` + id)
        .then(response => {
            console.log(response)
            return response.json()
        }).then(results => {
            console.log(results.results)
        })

})

function showResults() {
    fetch(`https://api.jikan.moe/v3/search/anime?q=` + id)
        .then(response => {
            console.log(response)
            return response.json()
        }).then(results => {
            return results.title
        })
}