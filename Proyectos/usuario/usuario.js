const result = document.getElementById("result");
const filter = document.getElementById("filter");
const select = document.getElementById("select");

const listItems = [];

getData();
filter.addEventListener("input", (e) => {
  filterData(e.target.value);
});

async function getData() {
  let value = select.options[select.selectedIndex].value;
  const respuesta = await fetch(`https://randomuser.me/api?results=${value}`);
  const { results } = await respuesta.json();

  result.innerHTML = "";
  results.forEach((user) => {
    const li = document.createElement("li");

    listItems.push(li);
    let { picture, name, location, dob } = user;
    let { large } = picture;
    let { first, last } = name;
    let { country, city } = location;
    li.innerHTML = `
            <img src="${large}" alt="${first}">
            <div class="user-info">
              <h4>${first} ${last}</h4>
              <h4>${dob.age}</h4>
              <p>${city}, ${country}</p>
            </div>
            `;
    result.appendChild(li);
  });
}

function filterData(inputValue) {
  listItems.forEach((item) => {
    let html = item.innerHTML.toLowerCase();
    let value = inputValue.toLowerCase();
    if (html.includes(value)) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

select.addEventListener("change", getData);
