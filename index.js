
// Inject current year
    document.getElementById("year").textContent = new Date().getFullYear();

    // Add user
    function addUser(event) {
      event.preventDefault();
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const language = document.getElementById("language").value;

      const table = document.getElementById("userTable").querySelector("tbody");
      const row = table.insertRow();
      row.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${language}</td>
        <td>
          <span class="icons text-primary" onclick="editUser(this)">✏️</span>
          <span class="icons text-danger" onclick="deleteUser(this)">🗑️</span>
        </td>
      `;

      document.getElementById("userForm").reset();
      return false;
    }

    // Delete user
    function deleteUser(el) {
      const row = el.closest("tr");
      row.remove();
    }

    // Edit user
    function editUser(el) {
      const row = el.closest("tr");
      const cells = row.getElementsByTagName("td");
      document.getElementById("firstName").value = cells[0].textContent;
      document.getElementById("lastName").value = cells[1].textContent;
      document.getElementById("email").value = cells[2].textContent;
      document.getElementById("phone").value = cells[3].textContent;
      document.getElementById("language").value = cells[4].textContent;
      row.remove();
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
