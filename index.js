
  // Inject current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Load users from localStorage if available, otherwise empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let editIndex = -1; // Track which user is being edited

  // Render the table from users[]
  function renderTable() {
    const tbody = document.querySelector("#userTable tbody");
    tbody.innerHTML = "";
    users.forEach((user, index) => {
      const row = tbody.insertRow();
      row.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.language}</td>
        <td>
          <span class="icons text-primary" onclick="editUser(${index})">✏️</span>
          <span class="icons text-danger" onclick="deleteUser(${index})">🗑️</span>
        </td>
      `;
    });
  }

  // Add or Update user
  function addUser(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const language = document.getElementById("language").value;

    if (editIndex >= 0) {
      // Update existing user
      users[editIndex] = { firstName, lastName, email, phone, language };
      editIndex = -1; // reset after update
    } else {
      // Add new user
      users.push({ firstName, lastName, email, phone, language });
    }

    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Update table
    renderTable();

    // Reset form
    document.getElementById("userForm").reset();
  }

  // Delete user
  function deleteUser(index) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderTable();
  }

  // Edit user
  function editUser(index) {
    const user = users[index];
    editIndex = index; // remember which user is being edited

    // Prefill form with existing user data
    document.getElementById("firstName").value = user.firstName;
    document.getElementById("lastName").value = user.lastName;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    document.getElementById("language").value = user.language;
  }

  // Search filter
  document.getElementById("search").addEventListener("keyup", function() {
    const filter = this.value.toLowerCase();
    const rows = document.querySelector("#userTable tbody").rows;
    for (let row of rows) {
      const name = (row.cells[0].textContent + " " + row.cells[1].textContent).toLowerCase();
      row.style.display = name.includes(filter) ? "" : "none";
    }
  });

  // 🔑 Render users immediately on page load
  window.onload = renderTable;

