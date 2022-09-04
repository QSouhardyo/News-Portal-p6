

const NewsCategory = () => {
    try {
        fetch('https://openapi.programming-hero.com/api/news/categories')
            .then(res => res.json())
            .then(data => displayNewsCatagory(data.data.news_category))
    } catch (err) {
        return 'This Link Not Found'
    }


}

const displayNewsCatagory = (catagories) => {

    const catagoryContainer = document.getElementById('catagory-box')

    catagories.forEach(catagory => {

        const div = document.createElement('div');
        div.classList.add('category');
        div.innerHTML = `
       <button id="${catagory.category_id}" onclick="NewsDetailCategory('${catagory.category_id}', '${catagory.category_name}, ')" class='border border-0 bg-white'>
       <h6>${catagory.category_name}</h6>
       </button>
       `;
        catagoryContainer.appendChild(div)

    })
}

NewsCategory()



const NewsDetailCategory = (id, title) => {

    try {
        fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
            .then(res => res.json())
            .then(data => displayNewsDetailInCategory(data.data, id, title))
    } catch (err) {
        return 'This Link Not Found'
    }

}


const displayNewsDetailInCategory = (everyThings, title) => {

    everyThings.sort((a, b) => {
        return b.total_view - a.total_view
    })

    console.log(everyThings, title);
    if (everyThings?.length) {

        document.getElementById('numberOfNews').innerHTML = `<h5 class='text-center'>${everyThings?.length} items found for category ${title}</h5>`
    } else {
        document.getElementById('numberOfNews').innerHTML = `<h5 class='text-center'>No item found for category ${title}</h5>`
    }



    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = ``

    loadSpin(true)

    if (everyThings?.length) {
        everyThings.forEach(everyThing => {
            console.log(everyThing);

            const makeDiv = document.createElement('div');
            makeDiv.classList.add('col')
            makeDiv.innerHTML =
                `<div class = 'card my-4' id="${everyThing._id}">
          <div class="row">
          <div class="col-md-4">
          <img style="height: 100%;" src="${everyThing.image_url}" class="img-fluid rounded-start" alt="">
          </div>
          <div class="col-md-8">
          <div class="card-body">
          <h5 class="card-title">${everyThing.title}</h5>
          <p class="card-text ">${everyThing.details.slice(0, 150)}</p>
          <p class="card-text text-truncate">${everyThing.details.slice(150, 300)}</p>
          
          
          <div class = 'autor-details'>
          
          <div class='d-flex gap-3 content-width'>
          <img style="height:50px; width:50px;" class="rounded-circle mt-3 " src='${everyThing.author.img}'>
          <div class ='mt-4'> 
          <h6 >${everyThing.author.name}</h6>
          
          </div>
          </div>
          
          
          <div class ='content-width mt-4 '>
          
          <div class='ml-5'>
          <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
          </svg>
          <span>
          
          <span class="text-center ">${everyThing.total_view}</span>
          
          </div>
          
          </div>
          
          
          <div class='content-width mt-4 text-center d-flex justify-content-between  '>
          
          <div class="d-flex gap-3">
          <span '>${everyThing.rating.badge}</span>
          <span>${everyThing.rating.number}</span>
          </div>
          
          </div>
          
          
          <div class='mt-4 text-end'>
          
          <button class='border border-0 bg-white' data-bs-toggle="modal" data-bs-target="#show-details">
          <span class=''><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg></span>
          </button>
          
          
          </div>
          
          </div>
          
          
          
          </div>
          </div>
          </div>
          
          </div>
          
          `;

            newsContainer.appendChild(makeDiv)
            document.getElementById('exampleModalLabel').innerText = `
         ${everyThing.title}
         `;
            document.getElementById('modal-body').innerHTML = `
         <p>${everyThing.details}</p>
 
         <span>${everyThing.author.published_date} </span>
         `

        })
    } else {
        newsContainer.innerHTML = '<img height="300" src="https://community.librenms.org/uploads/default/original/2X/7/759793552edd033b80526884b06a706fdd1a06ba.png">'

    }

    loadSpin(false)

}


const loadSpin = (toggle) => {

    const toggleSpin = document.getElementById('loading');
    if (toggle) {
        toggleSpin.classList.remove('d-none')
    } else {
        toggleSpin.classList.add('d-none')
    }

}

NewsDetailCategory('01', '')



