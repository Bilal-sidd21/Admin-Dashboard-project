document.addEventListener("DOMContentLoaded", function () {
  const sidebr = document.querySelector("#sidebr");
  const menubtn = document.querySelector("#menubtn");
  const closeSidebar = document.querySelector("#closeSidebar");

  const addCategoryBtn = document.getElementById("addCategoryBtn");
  const categoryModal = document.getElementById("categoryModal");
  const closeCategoryModal = document.getElementById("closeCategoryModal");
  const cancelCategoryModal = document.getElementById("cancelCategoryModal");
  const categoryForm = document.getElementById("categoryForm");
  const categoryGrid = document.getElementById("categoryGrid");

  const searchInput = document.getElementById("searchCategoryInput");
  const statusFilter = document.getElementById("statusCategoryFilter");

  // Sidebar events
  menubtn?.addEventListener("click", () => sidebr?.classList.remove("hidden"));
  closeSidebar?.addEventListener("click", () => sidebr?.classList.add("hidden"));

  // Initial Default Data
  const defaultCategories = [
    { id: 1, name: "Electronics", count: 24, status: "ACTIVE" },
    { id: 2, name: "Audio & Wearables", count: 12, status: "ACTIVE" },
    { id: 3, name: "Accessories", count: 45, status: "ACTIVE" }
  ];

  let categories = [];
  try {
    categories = JSON.parse(localStorage.getItem("admin_categories")) || defaultCategories;
  } catch (e) {
    categories = defaultCategories;
  }

  const saveCategories = () => {
    localStorage.setItem("admin_categories", JSON.stringify(categories));
  };

  const toggleModal = (show) => {
    if (!categoryModal) return;
    if (show) {
      categoryModal.classList.remove("hidden");
      categoryModal.classList.add("flex");
    } else {
      categoryModal.classList.add("hidden");
      categoryModal.classList.remove("flex");
      categoryForm?.reset();
    }
  };

  addCategoryBtn?.addEventListener("click", () => toggleModal(true));
  closeCategoryModal?.addEventListener("click", () => toggleModal(false));
  cancelCategoryModal?.addEventListener("click", () => toggleModal(false));

  function renderCategories() {
    if (!categoryGrid) return;
    categoryGrid.innerHTML = "";

    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const selectedStatus = statusFilter ? statusFilter.value : "ALL";

    const filtered = categories.filter((cat) => {
      const matchesSearch = cat.name.toLowerCase().includes(query);
      const matchesStatus = selectedStatus === "ALL" || cat.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });

    if (filtered.length === 0) {
      categoryGrid.innerHTML = `
        <div class="col-span-full p-8 text-center text-gray-400 text-xs bg-white rounded-lg border border-gray-200">
          No categories found.
        </div>
      `;
      return;
    }

    filtered.forEach((cat) => {
      const card = document.createElement("div");
      card.className = "bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between space-y-3 shadow-sm";
      
      const badgeClass = cat.status === "ACTIVE" 
        ? "bg-green-50 text-green-600 border-green-100" 
        : "bg-gray-100 text-gray-500 border-gray-200";

      card.innerHTML = `
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              <i class="fa-solid fa-folder"></i>
            </div>
            <div>
              <h4 class="text-xs font-semibold text-gray-900">${cat.name}</h4>
              <p class="text-[10px] text-gray-400">${cat.count || 0} Products</p>
            </div>
          </div>
          <span class="text-[9px] px-2 py-0.5 rounded-full border ${badgeClass} font-medium">${cat.status}</span>
        </div>
        
        <div class="flex items-center justify-end gap-2 border-t border-gray-100 pt-2">
          <button class="deleteCat text-gray-400 hover:text-red-500 text-xs transition-colors">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;

      card.querySelector(".deleteCat")?.addEventListener("click", () => {
        categories = categories.filter((c) => c.id !== cat.id);
        saveCategories();
        renderCategories();
      });

      categoryGrid.appendChild(card);
    });
  }

  // Handle Category Form Submit
  categoryForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameVal = document.getElementById("catName")?.value.trim();
    const countVal = document.getElementById("catCount")?.value;
    const statusVal = document.getElementById("catStatus")?.value;

    if (!nameVal) return;

    const newCategory = {
      id: Date.now(),
      name: nameVal,
      count: parseInt(countVal) || 0,
      status: statusVal || "ACTIVE"
    };

    categories.unshift(newCategory);
    saveCategories();
    renderCategories();
    toggleModal(false);
  });

  searchInput?.addEventListener("input", renderCategories);
  statusFilter?.addEventListener("change", renderCategories);

  renderCategories();
});