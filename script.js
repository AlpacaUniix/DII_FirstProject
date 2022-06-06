const icon = document.querySelector('icon')
const search = document.querySelector('search')
icon.addEventListener('onclick', function() {
    search.classList.toggle('active')
})