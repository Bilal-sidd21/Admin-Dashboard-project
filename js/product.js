document.addEventListener("DOMContentLoaded", function () {
  const addProductBtn = document.getElementById("addProductBtn");
  const productModal = document.getElementById("productModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const cancelModalBtn = document.getElementById("cancelModalBtn");
  const productForm = document.getElementById("productForm");
  const productGrid = document.getElementById("productGrid");

  const searchInput = document.querySelector(
    "input[placeholder*='Search products']",
  );
  const categoryFilter = document.querySelector(
    "select:has(option[value*='Category']), select:nth-of-type(1)",
  );
  const priceFilter = document.querySelector(
    "select:has(option[value*='Price']), select:nth-of-type(2)",
  );
  const statusFilter = document.querySelector(
    "select:has(option[value*='Status']), select:nth-of-type(3)",
  );

  let products = JSON.parse(localStorage.getItem("products")) || [];

  addProductBtn?.addEventListener("click", function () {
    productModal?.classList.remove("hidden");
    productModal?.classList.add("flex");
  });

  closeModalBtn?.addEventListener("click", closeModal);
  cancelModalBtn?.addEventListener("click", closeModal);

  function closeModal() {
    productModal?.classList.add("hidden");
    productModal?.classList.remove("flex");
  }

  function createProductCard(product) {
    let status;
    let statusClass;
    let statusIcon;

    if (product.stock == 0) {
      status = "Out of Stock";
      statusClass = "bg-red-50 text-red-500 border-red-100";
      statusIcon = "fa-circle";
    } else if (product.stock <= 5) {
      status = "Low Stock";
      statusClass = "bg-orange-50 text-orange-500 border-orange-100";
      statusIcon = "fa-triangle-exclamation";
    } else {
      status = "In Stock";
      statusClass = "bg-green-50 text-green-600 border-green-100";
      statusIcon = "fa-circle";
    }

    const productCard = document.createElement("div");
    productCard.className =
      "bg-white border  border-gray-200 rounded-lg overflow-hidden w-full ";

    productCard.innerHTML = `
  
    <div class="h-28 sm:h-32 bg-gray-50 flex items-center justify-center relative">
        <img src="${product.image}" class="w-full h-full object-cover" alt="${product.name}">
        <span class="absolute top-2 right-2 text-[9px] ${statusClass} border px-2 py-1 rounded-full flex items-center gap-1">
          <i class="fa-solid ${statusIcon} text-[5px]"></i>
          ${status}
        </span>
      </div>

      <div class="p-4 ">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <p class="text-[9px] uppercase text-gray-400">${product.category}</p>
            <h3 class="text-xs font-medium mt-2">${product.name}</h3>
          </div>
          <strong class="text-sm">$${product.price}</strong>
        </div>

        <div class="mt-4 text-[9px] text-gray-400">
          <i class="fa-solid fa-box"></i>
          ${product.stock} in stock
          <span class="mx-2">•</span>
          SKU: ${product.sku}
        </div>
      </div>

      <div class="border-t border-gray-100 px-3 sm:px-4 py-2 flex items-center justify-between gap-2">
        <button class="deleteProduct text-gray-500 hover:text-red-500">
          <i class="fa-solid fa-trash text-xs"></i>
        </button>
        <button class="viewDetails text-[9px] text-blue-600 border border-gray-200 px-3 py-1.5 rounded hover:bg-blue-50">
          View Details
        </button>
      </div>
    `;

    const deleteBtn = productCard.querySelector(".deleteProduct");
    deleteBtn.addEventListener("click", function () {
      products = products.filter((item) => item.id !== product.id);
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts();
    });

    const viewDetailsBtn = productCard.querySelector(".viewDetails");
    viewDetailsBtn.addEventListener("click", function () {
      alert(  "Product: " +  product.name +  "\nCategory: " +  product.category +  "\nPrice: $" +  product.price +  "\nStock: " +  product.stock +  "\nSKU: " +  product.sku,  );
    });

    return productCard;
  }

  function renderProducts() {
    if (!productGrid) return;
    productGrid.innerHTML = "";

    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const selectedCategory = categoryFilter
      ? categoryFilter.value.toLowerCase()
      : "";
    const selectedPrice = priceFilter ? priceFilter.value : "";
    const selectedStatus = statusFilter ? statusFilter.value.toLowerCase() : "";

    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        !selectedCategory ||
        selectedCategory.includes("all") ||
        product.category.toLowerCase() === selectedCategory;

      let productStatus = "in stock";
      if (product.stock == 0) productStatus = "out of stock";
      else if (product.stock <= 5) productStatus = "low stock";

      const matchesStatus =
        !selectedStatus ||
        selectedStatus.includes("all") ||
        productStatus === selectedStatus;

      let matchesPrice = true;
      const price = parseFloat(product.price);
      if (selectedPrice && !selectedPrice.includes("all")) {
        if (selectedPrice.includes("under-50")) matchesPrice = price < 50;
        else if (selectedPrice.includes("50-200"))
          matchesPrice = price >= 50 && price <= 200;
        else if (selectedPrice.includes("above-200"))
          matchesPrice = price > 200;
      }

      return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
    });

    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div class="col-span-full p-8 text-center text-gray-400 text-xs">
          No products match your search or filter criteria.
        </div>
      `;
      return;
    }

    filtered.forEach((product) => {
      const card = createProductCard(product);
      productGrid.appendChild(card);
    });
  }

  searchInput?.addEventListener("input", renderProducts);
  categoryFilter?.addEventListener("change", renderProducts);
  priceFilter?.addEventListener("change", renderProducts);
  statusFilter?.addEventListener("change", renderProducts);

  productForm?.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value;
    const price = document.getElementById("productPrice").value;
    const stock = Number(document.getElementById("productStock").value);
    const sku = document.getElementById("productSKU").value.trim();
    const image = document.getElementById("productImage").value.trim();

    const newProduct = {
      id: Date.now(),
      name: name,
      category: category,
      price: price,
      stock: stock,
      sku: sku,
      image: image,
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    renderProducts();
    productForm.reset();
    closeModal();
  });

  renderProducts();
});
