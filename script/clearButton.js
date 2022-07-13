const form = document.getElementById("form")
const btn  = document.querySelector(".button-btn")

btn.addEventListener('click', (e) => {
  e.stopPropagation()
  form.reset();
})