const html = document.querySelector('html')
const checkbox = document.querySelector('#switch')

checkbox.addEventListener('change', function(e){
    e.stopPropagation()
    html.classList.toggle('dark-mode')
})


