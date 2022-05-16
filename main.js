//cuando se hace una peticion con fetch ahi que comvertir la respuesta en json
//y cunado se hace una peticion con axios se hace accede . data y ya viene comvertida en json


const API_URL_RANDOMS = 'https://api.thecatapi.com/v1/images/search?limit=3'
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key='
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload?api_key='
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=`

const spanError = document.getElementById('error')

//consumiendo API con fetch y promesas
// fetch(API)
//     .then(res => res.json())
//     .then(data => {
//         const doc = document.querySelector('img')
//         doc.src=data[0].url
//     })

//consumiendo api con async await y fetch
async function getCatRandom() {
    const res = await fetch(API_URL_RANDOMS)
    const data1 = await res.json()

    if(res.status !== 200) {
        spanError.innerHTML = "hubo un error" + res.status
    }else {
        const img1 = document.getElementById('img1')
        const img2 = document.getElementById('img2')
        const img3 = document.getElementById('img3')
        const btn1 = document.getElementById('btn1')
        const btn2 = document.getElementById('btn2')
        const btn3 = document.getElementById('btn3')

        img1.src=data1[0].url
        img2.src=data1[1].url
        img3.src=data1[2].url

        btn1.onclick = () => saveFavorites(data1[0].id)
        btn2.onclick = () => saveFavorites(data1[1].id)
        btn3.onclick = () => saveFavorites(data1[2].id)

    }
}

async function favoritesCats() {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': '207246b5-a7b1-4b0a-84c3-6ff263ae307d'
        }
    })
    const data2 = await res.json()
    if(res.status !== 200) {
        spanError.innerHTML = "hubo un error " + res.status
    }else {
        const section = document.getElementById('catsFavorites')
        section.innerHTML = ""
        const h2 = document.createElement('h2')
        const h2Text = document.createTextNode('gaticos favoritos')
        h2.appendChild(h2Text)
        section.appendChild(h2)
        data2.forEach(e => {

            const article = document.createElement('article')
            const img = document.createElement('img')
            const btn = document.createElement('button')
            const btnText = document.createTextNode('sacar cat de favorito')

            btn.appendChild(btnText)
            img.src = e.image.url
            article.appendChild(img)
            article.appendChild(btn)
            section.appendChild(article)

            btn.onclick = () => deleteFavorite(e.id)

        })
    }
}

async function saveFavorites(id) {
    console.log(id)
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': '207246b5-a7b1-4b0a-84c3-6ff263ae307d'
        },
        body: JSON.stringify({
            image_id: id
        })
    })
    const data3 = await res.json()
    if(res.status !== 200) {
        spanError.innerHTML = "hubo un error " + res.status + res.message
    }else {
        console.log("gato guardado en favoritos")
        favoritesCats()
    }
    console.log('save')
    console.log(data3)
}

async function deleteFavorite(id) {
    const res1 = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': '207246b5-a7b1-4b0a-84c3-6ff263ae307d'
        }

    })
    const data4 = await res1.json()
    if(res1.status !== 200) {
        spanError.innerHTML = "hubo un error " + res1.status + data4.message
    }else  {
        console.log('gato eliminado')
        favoritesCats()

    }
    console.log('save')
    console.log(data4)
}

async function uploadGato() {
    const form = document.getElementById('form')
    const formData = new FormData(form)
    console.log(formData.get('file'))

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'X-API-KEY': '207246b5-a7b1-4b0a-84c3-6ff263ae307d'
        },
        body: formData
    })

    const data = await res.json()
    console.log(data)
    if(res.status !== 201) {
        spanError.innerHTML = "hubo un error " + res.status + data.message
    }else  {
        console.log('fot de gato subida')
        favoritesCats()

    }
}
getCatRandom()
favoritesCats()


// function handleSubmit(e) {
//     e.preventDefault()
//     fetch(API)
//     .then(res => res.json())
//     .then(data => {
//         const img1 = document.getElementById('img1')
//         const img2 = document.getElementById('img2')
//         const img3 = document.getElementById('img3')
//         img1.src=data[0].url
//         img2.src=data[1].url
//         img3.src=data[2].url
//     })
// }

// const boton = document.getElementById('btn-cargar')
// boton.onclick = (e) => handleSubmit(e)

