document.addEventListener("DOMContentLoaded", () => {
  

  const addBtn = document.getElementById("addproductbtn");
  const modal = document.getElementById("userModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const cancelModalBtn = document.getElementById("cancelModalBtn");
  const form = document.getElementById("addUserForm");

  const tableBody = document.getElementById("userTableBody");
  const searchInput = document.getElementById("searchUser");
  const roleFilter = document.getElementById("roleFilter");
  const statusFilter = document.getElementById("statusFilter");

  let editRow = null;


  const defaultUsers = [
    { id: "#001", name: "Ali Raza", email: "ali@gmail.com", phone: "0300-1234567", role: "Admin", status: "Active", date: "20 Aug 2026" },
    { id: "#002", name: "Ahmed Khan", email: "ahmed@gmail.com", phone: "0312-9876543", role: "User", status: "Active", date: "18 Aug 2026" }
  ];

  const getUsersFromStorage = () => {
    const saved = localStorage.getItem("app_users");
    if (!saved) {
      localStorage.setItem("app_users", JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    return JSON.parse(saved);
  };

  const saveUsersToStorage = (users) => {
    localStorage.setItem("app_users", JSON.stringify(users));
  };

  const renderTable = () => {
    const users = getUsersFromStorage();
    tableBody.innerHTML = "";

    users.forEach((user) => {
      const roleBg = user.role === "Admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700";
      
      let statusBg = "bg-green-100 text-green-700";
      if (user.status === "Pending") statusBg = "bg-yellow-100 text-yellow-700";
      if (user.status === "Inactive") statusBg = "bg-red-100 text-red-700";

      const tr = document.createElement("tr");
      tr.className = "border-b border-gray-100 hover:bg-gray-50";
      tr.innerHTML = `
        <td class="px-5 py-4 text-gray-600">${user.id}</td>
        <td class="px-5 py-4 font-medium text-gray-900">${user.name}</td>
        <td class="px-5 py-4 text-gray-500">${user.email}</td>
        <td class="px-5 py-4 text-gray-500">${user.phone}</td>
        <td class="px-5 py-4"><span class="px-3 py-1 text-xs rounded-full ${roleBg}">${user.role}</span></td>
        <td class="px-5 py-4"><span class="px-3 py-1 text-xs rounded-full ${statusBg}">${user.status}</span></td>
        <td class="px-5 py-4 text-gray-500">${user.date}</td>
        <td class="px-5 py-4">
          <div class="flex gap-2">
            <button class="edit-btn px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">Edit</button>
            <button class="delete-btn px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg">Delete</button>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    applyFilters();
  };

  const openModal = () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    editRow = null;
    form.reset();
    document.querySelector("#userModal h3").textContent = "Add New User";
  };

  if (addBtn) addBtn.addEventListener("click", openModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const users = getUsersFromStorage();
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const phone = document.getElementById("userPhone").value.trim();
    const role = document.getElementById("userRole").value;
    const status = document.getElementById("userStatus").value;

    if (editRow) {
 
      const userId = editRow.cells[0].textContent;
      const index = users.findIndex(u => u.id === userId);
      
      if (index !== -1) {
        users[index].name = name;
        users[index].email = email;
        users[index].phone = phone;
        users[index].role = role;
        users[index].status = status;
      }
    } else {
  
      const today = new Date();
      const regDate = `${today.getDate()} ${today.toLocaleString("default", { month: "short" })} ${today.getFullYear()}`;
      const newId = `#${String(users.length + 1).padStart(3, "0")}`;

      users.push({
        id: newId,
        name,
        email,
        phone,
        role,
        status,
        date: regDate
      });
    }

    saveUsersToStorage(users);
    renderTable();
    closeModal();
  });

  tableBody.addEventListener("click", (e) => {
    const target = e.target;
    const row = target.closest("tr");
    if (!row) return;

    const userId = row.cells[0].textContent;

    if (target.classList.contains("delete-btn")) {
      if (confirm(`Are you sure you want to delete user ${userId}?`)) {
        let users = getUsersFromStorage();
        users = users.filter(u => u.id !== userId);
        saveUsersToStorage(users);
        renderTable();
      }
    }

    if (target.classList.contains("edit-btn")) {
      editRow = row;
      document.querySelector("#userModal h3").textContent = "Edit User";

      document.getElementById("userName").value = row.cells[1].textContent;
      document.getElementById("userEmail").value = row.cells[2].textContent;
      document.getElementById("userPhone").value = row.cells[3].textContent;
      document.getElementById("userRole").value = row.cells[4].textContent.trim();
      document.getElementById("userStatus").value = row.cells[5].textContent.trim();

      openModal();
    }
  });


  const applyFilters = () => {
    const searchValue = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedRole = roleFilter ? roleFilter.value : "";
    const selectedStatus = statusFilter ? statusFilter.value : "";

    const rows = tableBody.getElementsByTagName("tr");

    Array.from(rows).forEach((row) => {
      const id = row.cells[0]?.textContent.toLowerCase() || "";
      const name = row.cells[1]?.textContent.toLowerCase() || "";
      const email = row.cells[2]?.textContent.toLowerCase() || "";
      const role = row.cells[4]?.textContent.trim() || "";
      const status = row.cells[5]?.textContent.trim() || "";

      const matchesSearch = name.includes(searchValue) || email.includes(searchValue) || id.includes(searchValue);
      const matchesRole = selectedRole === "" || role === selectedRole;
      const matchesStatus = selectedStatus === "" || status === selectedStatus;

      row.style.display = (matchesSearch && matchesRole && matchesStatus) ? "" : "none";
    });
  };

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (roleFilter) roleFilter.addEventListener("change", applyFilters);
  if (statusFilter) statusFilter.addEventListener("change", applyFilters);

 
  renderTable();
});