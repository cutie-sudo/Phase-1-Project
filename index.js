// Smooth scroll to the top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation toggle functionality
const navToggler = document.querySelectorAll('[data-nav-toggler]');
const navbar = document.querySelector('[data-navbar]');
const overlay = document.querySelector('[data-overlay]');

navToggler.forEach(toggler => {
    toggler.addEventListener('click', () => {
        navbar.classList.toggle('active');
        overlay.classList.toggle('active');
    });
});

// Close navigation when clicking outside
overlay.addEventListener('click', () => {
    navbar.classList.remove('active');
    overlay.classList.remove('active');
});

// Form submission handler for newsletter subscription
document.querySelector('.newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh
    const emailInput = this.querySelector('.email-field').value;
    
    // Here you could send the email to your server
    console.log(`Email submitted: ${emailInput}`);
    
    // Clear input field after submission
    this.reset();
    alert('Thank you for subscribing!');
});

// Back to Top button functionality
const backTopBtn = document.querySelector('[data-back-top-btn]');
backTopBtn.addEventListener('click', scrollToTop);

// Show/hide the Back to Top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backTopBtn.classList.add('active');
    } else {
        backTopBtn.classList.remove('active');
    }
});

fetch('db.json')
  .then(response => {
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // Parse the JSON from the response
  })
  .then(data => {
    console.log(data); // Handle the JSON data
    // For example, access vehicles: data.vehicles
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
  fetch('db.json')
  .then(response => response.json())
  .then(data => {
    console.log(data.vehicles); // Access the vehicles array
    // You can now work with the vehicles array
  });
  fetch('path/to/db.json')
  .then(response => response.json())
  .then(data => {
    console.log(data.users);
    // Process the user data as needed
  })
  .catch(error => console.error('Error fetching data:', error));









  // Fetch all users
fetch('http://localhost:3000/users')
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

  fetch('http://localhost:3000/users', {
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
  fetch(`http://localhost:3000/users/${id}`, {
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
  fetch(`http://localhost:3000/users/${id}`)
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

          fetch(`http://localhost:3000/users/${id}`, {
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
  fetch(`http://localhost:3000/users/${id}`)
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

  