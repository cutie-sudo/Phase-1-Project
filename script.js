// Fetch all users
fetch('https://phase-1-project-lt1k.onrender.com')
  .then((res) => res.json())
  .then((data) => {
    const users_row = document.getElementById("users_row");
    users_row.innerHTML = "";  // Clear the user list

    data.forEach(user => {
      users_row.innerHTML += `
        <div class="col-md-3 mb-2">
          <div class="bg-light p-1 border">
            <img src="${user.imageurl}" class="img-fluid" />
            <h6 class="fw-bold">${user.name}</h6>
            <div class="row">
              <p class="col">${user.email}</p>
            </div>
            <button onclick="deleteUser('${user.id}')" class="btn btn-danger btn-sm">Delete</button>
            <button onclick="editUser('${user.id}')" class="btn btn-success ms-4 btn-sm">Update</button>
            <button onclick="viewUser('${user.id}')" class="btn btn-primary ms-4 btn-sm">View User</button>
          </div>
        </div>
      `;
    });
  });

// Add User
const add_user_form = document.getElementById("add_user_form");

add_user_form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const imageurl = document.getElementById("imageurl").value;

    fetch('https://phase-1-project-lt1k.onrender.com', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            imageurl: imageurl,
            vehicles: []
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((res) => {
        const message = document.getElementById("message");
        message.innerText = "User created successfully";
        location.reload();  // Reload to update the list
    });
});

// Delete User
function deleteUser(id) {
    fetch(`https://phase-1-project-lt1k.onrender.com/${id}`, {
        method: 'DELETE',
    })
    .then((res) => res.json())
    .then(() => {
        const message = document.getElementById("delete_message");
        message.innerText = "User deleted successfully";
        location.reload();  // Reload to update the list
    });
}

// Edit User
function editUser(id) {
    fetch(`https://phase-1-project-lt1k.onrender.com/${id}`)
    .then((res) => res.json())
    .then((data) => {
        const edit_container = document.getElementById("edit_container");

        edit_container.innerHTML = `
            <h5>Edit User</h5>
            <div id="update_message" class="text-success"></div>
            <form id="update_user_form">
              <div class="mb-3">
                <input type="text" class="form-control" id="edit_name" value="${data.name}" required>
              </div>
              <div class="mb-3">
                <input type="email" class="form-control" id="edit_email" value="${data.email}" required>
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" id="edit_imageurl" value="${data.imageurl}" required>
              </div>
              <button type="submit" class="btn btn-primary">Update</button>
            </form>
        `;

        const edit_form = document.getElementById("update_user_form");

        edit_form.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("edit_name").value;
            const email = document.getElementById("edit_email").value;
            const imageurl = document.getElementById("edit_imageurl").value;

            fetch(`https://phase-1-project-lt1k.onrender.com/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    imageurl: imageurl
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then(() => {
                const update_message = document.getElementById("update_message");
                update_message.innerText = "User updated successfully";
                location.reload();  // Reload to update the list
            });
        });
    });
}

// View User
function viewUser(id) {
    fetch(`https://phase-1-project-lt1k.onrender.com/${id}`)
    .then((res) => res.json())
    .then((data) => {
        const single_user = document.getElementById("single_user");

        single_user.innerHTML = `
          <div class="mb-2">
            <div class="bg-light p-1 border">
              <img src="${data.imageurl}" class="img-fluid" />
              <h6 class="fw-bold">${data.name}</h6>
              <div class="row">
                <p class="col">${data.email}</p>
              </div>
              <button onclick="deleteUser('${data.id}')" class="btn btn-danger btn-sm">Delete</button>
              <button onclick="editUser('${data.id}')" class="btn btn-success ms-4 btn-sm">Update</button>
            </div>
          </div>
        `;
    });
}
