const CHARACTER_LIST = document.getElementById("characters");
const PAGINATION = document.getElementById("pagination");
const NEXT_BUTTON = document.getElementById("next");
const PREVIOUS_BUTTON = document.getElementById("previous");
const API_URL = "https://rickandmortyapi.com/api/character";
const MAX_PAGE = 42;
const MIN_PAGE = 1;

let modalCreate = false;
console.log(modalCreate);

const getCharacters = (page = MIN_PAGE) => {
    CHARACTER_LIST.innerHTML = "";
    fetch(`${API_URL}?page=${page}`)
        .then((res) => res.json())
        .then(({ results }) =>
            results.forEach((data) => {
                createCharacterItem(data);
        })
    );
};
//<li class="page-item">
//<a class="page-link" >
//Previous
//</a></li>

const generatePagination = () => {
    for (let i = MIN_PAGE; i <= MAX_PAGE; i++) {
        let listItem = document.createElement("li");
        listItem.classList.add("page-item");
        let pageLink = document.createElement("a");
        pageLink.classList.add("page-link");
        pageLink.dataset.page = i;
        pageLink.textContent = i;
        pageLink.onclick = () => getCharacters(Number(pageLink.dataset.page));
        listItem.appendChild(pageLink);
        PAGINATION.appendChild(listItem);
    }
};

// fetch("https://rickandmortyap.com/api/characteri")
// .then((response) => response.json())
// .then(({ results }) => 
//     results.forEach((data) =>{
//         createCharacterItem(data);
//     })
//     );

const createCharacterItem = (data) => {
    let characterItem = document.createElement("li");
    characterItem.classList.add("character");

    let imgContainer = document.createElement("div");
    let imgElement = document.createElement("img");
    imgElement.id = "img";
    imgElement.src = data.image;
    imgContainer.appendChild(imgElement);

    let nameElement = document.createElement("h2");
    nameElement.id = "name";
    nameElement.textContent = `${data.id} - ${data.name}`;

    let speciesElement = document.createElement("p");
    speciesElement.id = "species";
    speciesElement.textContent = data.species;

    let locationElement = document.createElement("p");
    locationElement.id = "location";
    locationElement.textContent = data.location;

    let genderElement = document.createElement("p");
    genderElement.id = "gender";
    genderElement.textContent = data.gender;

    let ctaButton = document.createElement("button");
    ctaButton.dataset.id = data.id;
    ctaButton.innerHTML = "Ver Personaje";

    ctaButton.addEventListener("click", (e) => {
        e.preventDefault()
        if (!modalCreate) {
            let button = e.target
            let id = button.dataset.id
            getCurrentCharacter(id);
            modalCreate = true;
            console.log(modalCreate);
        }
    });

    characterItem.appendChild(imgContainer);
    characterItem.appendChild(nameElement);
    characterItem.appendChild(speciesElement);
    characterItem.appendChild(locationElement);
    characterItem.appendChild(genderElement);
    characterItem.appendChild(ctaButton);
    CHARACTER_LIST.appendChild(characterItem);
}

async function getCurrentCharacter(characterId) {
    const API = await fetch(API_URL + characterId);
    const res = await API.json();
    const character = await res;
    createModal(character);
}

function createModal(character) {
    let modalCharacter = document.getElementById("modalCharacter");
    let modalHTML = `<div class="modal fade" data-backdrop="false" id="exampleModal" tabindex="-1" role="dialog" aria-label-ledby="exampleModalLabel" aria-hidde="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                        ${character.name}
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body d-flex flex-column justify-content-center align-items-center">
                        <img class="character-img" src="${character.image}">
                        <br>
                            Status: ${character.status}
                            <br>
                            Specie: ${character.species}
                            <br>
                            Gender: ${character.gender}
                            <br>
                            Location: ${character.location}
                    </div>
                </div>
            </div>
        </div>`;
    modalCharacter.innerHTML = modalHTML;
    $("#characterModal").modal("show");
    modalCreate = false;

    $("#characterModal").on("hide.bs.modal", () => {
        modalCreate = false
        console.log(modalCreate);
    });
}

document.addEventListener("DOMContentLoaded", getCharacters);

NEXT_BUTTON.addEventListener("click", (e) => {
    e.preventDefault();
    let page = e.target.dataset.page;
        NEXT_BUTTON.dataset.page = Number(page) + 1;
        PREVIOUS_BUTTON.dataset.page = Number(page) + 1;
    if (
        NEXT_BUTTON.dataset.page > MAX_PAGE &&
        PREVIOUS_BUTTON.dataset.page > MAX_PAGE
    ) {
        NEXT_BUTTON.dataset.page = MAX_PAGE;
        PREVIOUS_BUTTON.dataset.page = MAX_PAGE;
    }

    getCharacters(Number(page) + 1);
});


PREVIOUS_BUTTON.addEventListener("click", (e) => {
    e.preventDefault();
    let page = e.target.dataset.page;
        NEXT_BUTTON.dataset.page = Number(page) - 1;
        PREVIOUS_BUTTON.dataset.page = Number(page) - 1;
    if (
        NEXT_BUTTON.dataset.page < MIN_PAGE &&
        PREVIOUS_BUTTON.dataset.page < MIN_PAGE
    ) {
        NEXT_BUTTON.dataset.page = MIN_PAGE;
        PREVIOUS_BUTTON.dataset.page = MIN_PAGE;
    }

    getCharacters(Number(page) - 1);
});



