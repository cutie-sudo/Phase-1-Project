const apiUrl = 'https://phase-1-project-2-tjsf.onrender.com/users';

// Load Users on Page Load
document.addEventListener('DOMContentLoaded', fetchUsers);

// Fetch and Display Users
function fetchUsers() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((users) => {
      const usersRow = document.getElementById('users_row');
      usersRow.innerHTML = '';
      users.forEach((user) => {
        const userCard = `
          <div class="col-md-4 user-card">
            <div class="card">
              <img src="${user.imageurl}" class="card-img-top" alt="${user.name}">
              <div class="card-body user-card-body">
                <h5 class="card-title">${user.name} (${user.role})</h5>
                <p class="card-text">Email: ${user.email}</p>
                <p class="card-text">Phone: ${user.phone}</p>
                <p class="card-text">Vehicle: ${user.vehicles.model} (${user.vehicles.year})</p>
                <p class="card-text">Color: ${user.vehicles.color}, Condition: ${user.vehicles.condition}</p>
                <button class="btn btn-primary btn-action" onclick="viewUser(${user.id})">View</button>
                <button class="btn btn-warning btn-action" onclick="editUser(${user.id})">Edit</button>
                <button class="btn btn-danger btn-action" onclick="deleteUser(${user.id})">Delete</button>
                <button class="btn btn-secondary btn-action" onclick="viewOrders(${user.id})">View Orders</button>
                <button class="btn btn-success btn-action" onclick="addOrder(${user.id})">Add Order</button>
              </div>
            </div>
          </div>
        `;
        usersRow.innerHTML += userCard;
      });
    });
}

// View User Details
function viewUser(id) {
  fetch(`${apiUrl}/${id}`)
    .then((res) => res.json())
    .then((user) => {
      let orderDetails = '';
      if (user.orders) {
        user.orders.forEach(order => {
          orderDetails += `<li>Order ID: ${order.order_id} - ${order.item} (${order.status}) on ${order.date}</li>`;
        });
      } else {
        orderDetails = '<li>No orders found</li>';
      }

      document.getElementById('viewUserDetails').innerHTML = `
        <h3>${user.name} (${user.role})</h3>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
        <p>Vehicle: ${user.vehicles.model} (${user.vehicles.year})</p>
        <p>Color: ${user.vehicles.color}, Condition: ${user.vehicles.condition}</p>
        <h5>Orders</h5>
        <ul>${orderDetails}</ul>
        <img src="${user.imageurl}" alt="${user.name}" style="width: 100%;">
      `;
      new bootstrap.Modal(document.getElementById('viewUserModal')).show();
    });
}

// View Orders Modal
function viewOrders(userId) {
  fetch(`${apiUrl}/${userId}`)
    .then(res => res.json())
    .then(user => {
      let orderList = '';
      if (user.orders && user.orders.length > 0) {
        user.orders.forEach(order => {
          orderList += `<li>Order ID: ${order.order_id} - ${order.item} (${order.status}) on ${order.date}</li>`;
        });
      } else {
        orderList = '<li>No orders available for this user</li>';
      }

      document.getElementById('viewUserDetails').innerHTML = `
        <h5>Orders for ${user.name}</h5>
        <ul>${orderList}</ul>
      `;
      new bootstrap.Modal(document.getElementById('viewUserModal')).show();
    });
}

// Add New Order
function addOrder(userId) {
  const orderId = Math.floor(Math.random() * 10000); // Generate random order ID
  const item = prompt('Enter the order item (e.g., Car Maintenance):');
  const status = 'Pending'; // Default status when adding a new order
  const date = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  const newOrder = {
    order_id: orderId,
    item,
    status,
    date
  };

  fetch(`${apiUrl}/${userId}`)
    .then(res => res.json())
    .then(user => {
      user.orders = user.orders ? [...user.orders, newOrder] : [newOrder];
      return fetch(`${apiUrl}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
    })
    .then(() => {
      alert('Order added successfully!');
      fetchUsers();
    });
}

// Add New User
document.getElementById('add_user_form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const vehicles = {
    model: document.getElementById('vehicles').value,
    year: document.getElementById('vehicle_year').value,
    color: document.getElementById('vehicle_color').value,
    condition: document.getElementById('vehicle_condition').value
  };
  const imageurl = document.getElementById('imageurl').value;
  const role = document.getElementById('role').value;
  const phone = document.getElementById('phone').value;

  const newUser = { name, email, vehicles, imageurl, role, phone };

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  })
    .then((res) => res.json())
    .then(() => {
      fetchUsers();
      document.getElementById('add_user_form').reset();
      document.querySelector('#addUserModal .btn-close').click();
    });
});

// Edit User
function editUser(id) {
  fetch(`${apiUrl}/${id}`)
    .then((res) => res.json())
    .then((user) => {
      document.getElementById('edit_user_id').value = user.id;
      document.getElementById('edit_name').value = user.name;
      document.getElementById('edit_email').value = user.email;
      document.getElementById('edit_vehicles').value = user.vehicles.model;
      document.getElementById('edit_vehicle_year').value = user.vehicles.year;
      document.getElementById('edit_vehicle_color').value = user.vehicles.color;
      document.getElementById('edit_vehicle_condition').value = user.vehicles.condition;
      document.getElementById('edit_imageurl').value = user.imageurl;
      document.getElementById('edit_role').value = user.role;
      document.getElementById('edit_phone').value = user.phone;
      new bootstrap.Modal(document.getElementById('editUserModal')).show();
    });
}

document.getElementById('edit_user_form').addEventListener('submit', function (e) {
  e.preventDefault();
  const id = document.getElementById('edit_user_id').value;
  const name = document.getElementById('edit_name').value;
  const email = document.getElementById('edit_email').value;
  const vehicles = {
    model: document.getElementById('edit_vehicles').value,
    year: document.getElementById('edit_vehicle_year').value,
    color: document.getElementById('edit_vehicle_color').value,
    condition: document.getElementById('edit_vehicle_condition').value
  };
  const imageurl = document.getElementById('edit_imageurl').value;
  const role = document.getElementById('edit_role').value;
  const phone = document.getElementById('edit_phone').value;

  const updatedUser = { name, email, vehicles, imageurl, role, phone };

  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUser),
  })
    .then((res) => res.json())
    .then(() => {
      fetchUsers();
      document.querySelector('#editUserModal .btn-close').click();
    });
});

// Delete User
function deleteUser(id) {
  if (confirm('Are you sure you want to delete this user?')) {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => fetchUsers());
  }
}