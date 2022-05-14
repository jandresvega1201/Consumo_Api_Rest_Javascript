//cuando se hace una peticion con fetch ahi que comvertir la respuesta en json
//y cunado se hace una peticion con axios se hace accede . data y ya viene comvertida en json


const API = 'https://api.thecatapi.com/v1/images/search'

//consumiendo API con fetch y promesas
// fetch(API)
//     .then(res => res.json())
//     .then(data => {
//         const doc = document.querySelector('img')
//         doc.src=data[0].url
//     })

//consumiendo api con async await y fetch
async function getDog() {
    const res = await fetch(API)
    const data = await res.json()
    console.log(res)
}

function handleSubmit(e) {
    e.preventDefault()
    fetch(API)
    .then(res => res.json())
    .then(data => {
        const doc = document.querySelector('img')
        doc.src=data[0].url
    })
}

const boton = document.querySelector('button')
boton.onclick = (e) => handleSubmit(e)

