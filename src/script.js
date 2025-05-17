const apiKey = "33560a1d"
const url = `https://www.omdbapi.com/?apikey=${apiKey}&`;
const container = document.getElementById('container');
const searchBox = document.getElementById('search-btn');
const inputBox = document.getElementById('input-box');
const modal = document.getElementById('modal')
const modalPanel = document.getElementById('modal-panel');


searchBox.addEventListener('click', async function(){
    let data = '';
    let response = await getData(url+'s='+inputBox.value);
    response = response.Search;
    data +=  response.map(item => movieCard(item));
    updateUI(container, data);

    document.addEventListener('click', async (e)=>{
        if(e.target.classList.contains('detail-button')){
            modal.classList.remove('hidden')
            const modalData = await getData(url+'i='+e.target.dataset.id);
            updateUI(modalPanel, movieModalCard(modalData))
        }
    })
    
})

const modalClose = document.getElementById('close-modal')
.addEventListener('click', ()=>modal.classList.add('hidden'))

function getData(url){
    return fetch(url)
    .then(response=>response.json())
    .then(response => response)
}





function movieCard(item){
    let poster = item.Poster? item.Poster: 'https://via.placeholder.com/150?text=No+Image';
    return `
            <div
                id="card"
                class="flex flex-col p-5 border-2 border-gray-200 rounded-lg w-64 justify-between gap-2"
            >
                <div class="flex flex-col">
                <img
                src="${poster}"
                alt=""
                class="bg-gray-500 w-48 h-48 self-center rounded-lg"
                />
                <h2 class="text-xl font-bold">${item.Title}</h2>
                <h4 class="font-semibold text-gray-500">${item.Year}</h4>
                </div>

                <button data-id="${item.imdbID}" class="detail-button bg-black block w-max px-5 text-white py-2 rounded-md justify-self-end btn-modal" id="detail">
                Detail
                </button>
                </div>
    `
}

function movieModalCard(item){
    let poster = item.Poster? item.Poster : 'https://via.placeholder.com/150?text=No+Image' ;
    return `
              <div class="flex flex-col items-center">
            <img
              id="modal-img"
              src="${poster}"
              alt=""
              class="bg-gray-500 w-48 h-48 self-center rounded-lg"
            />
            <table class="mt-4">
              <tr>
                <th class="w-14 pr-2">Title</th>
                <th class="pr-2">:</th>
                <td id="modal-title">${item.Title}</td>
              </tr>
              <tr>
                <th class="w-14 pr-2">Year</th>
                <th class="pr-2">:</th>
                <td id="modal-year">${item.Year}</td>
              </tr>
              <tr>
                <th class="w-14 pr-2">Director</th>
                <th class="pr-2">:</th>
                <td id="modal-director">${item.Director}</td>
              </tr>
              <tr>
                <th class="w-14 pr-2 align-top">Plot</th>
                <th class="pr-2 align-top">:</th>
                <td id="modal-plot">
                  ${item.Plot}
                </td>
              </tr>
            </table>
          </div>
    `
}

function updateUI(parent, content){
    parent.innerHTML = content
}

