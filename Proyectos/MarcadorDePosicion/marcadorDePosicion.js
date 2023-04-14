let usersUL = document.getElementById("users");
let blogUL = document.getElementById("blog");
let comments = document.getElementById("comments");

let cards;

document.addEventListener("DOMContentLoaded", async () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => {
        let UserItem = document.createElement("li");
        UserItem.classList.add("item");
        UserItem.id = user.id;

        //   let userImage = fetchUserImage();

        let { city, street } = user.address;

        let cardHTML = ` <div id=${user.id} class="card">
                            <div class="card-body">
                                <h5 class="card-title">${user.username} </h5>
                                <p class="card-text">
                                    ${street}, ${city} 
                                </p>
                                <p class="card-text">
                                    ${user.website} 
                                </p>
                                <a id=${user.id} class='btn btn-primary'> Ver Posts 
                                </a>
                            </div>
                        </div>`;

        usersUL.innerHTML += cardHTML;
        cards = document.querySelectorAll(".card");
      });

      function fetchAllPosts(id) {
        fetch("https://jsonplaceholder.typicode.com/posts")
          .then((response) => response.json())
          .then((json) => {
            let jsonFiltrado = json.filter((post) => {
              return post.userId == id;
            });
            jsonFiltrado.forEach((post) => {
              let postHTML = ` <div id=${post.id} class="card">
                            <div class="card-body">
                                <h5 class="card-title">${post.userId} - ${post.title}</h5>
                                <p class="card-text">
                                    ${post.body}
                                </p>
                                <a id=${blog.id} class='btn btn-primary'> Ver Comment 
                                </a>
                            </div>
                        </div>`;

              blogUL.innerHTML += postHTML;
            });
          });
      }
      console.log(cards);
      Array.from(cards).forEach((card) => {
        card.addEventListener("click", (evento) => {
          console.log(evento.target.id);
          blogUL.innerHTML = "";
          fetchAllPosts(evento.target.id);
        });
      });
    });

    function fetchAllComments(id) {
      fetch(`https://jsonplaceholder.typicode.com/comments`)
        .then((response) => response.json())
        .then((json) => {
          let jsonFiltrado = json.filter((comments) => {
            return comments.userId == id;
          });
          jsonFiltrado.forEach((comments) => {
            let commentsHTML = ` <div id=${comments.id} class="card">
                          <div class="card-body">
                              <h5 class="card-title">${comments.name}</h5>
                          </div>
                      </div>`;

            postUL.innerHTML += commentsHTML;
          });
        });
    }

    console.log(cards);
    Array.from(cards).forEach((card) => {
      card.addEventListener("click", (evento) => {
        console.log(evento.target.id);
        comments.name.innerHTML = "";
        fetchAllComments(evento.target.id);
      });
    });
  });
