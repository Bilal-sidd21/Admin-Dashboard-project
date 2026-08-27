document.addEventListener("DOMContentLoaded", () => {
  const defaultOrders = [
    {
      id: "ORD-9082",
      customer: "Elena Rodriguez",
      items: 3,
      amount: 349.99,
      status: "PROCESSING",
      time: "Today, 10:24 AM",
    },
    {
      id: "ORD-9081",
      customer: "Marcus Chen",
      items: 1,
      amount: 1299.0,
      status: "SHIPPED",
      time: "Yesterday, 4:15 PM",
    },
    {
      id: "ORD-9080",
      customer: "Sarah Jenkins",
      items: 5,
      amount: 89.5,
      status: "DELIVERED",
      time: "Oct 24, 11:30 AM",
    },
    {
      id: "ORD-9079",
      customer: "David Kim",
      items: 2,
      amount: 215.0,
      status: "PROCESSING",
      time: "Oct 24, 09:12 AM",
    },
  ];

  let orders =
    JSON.parse(localStorage.getItem("my_orders_data")) || defaultOrders;

  const saveOrdersToLocalStorage = () => {
    localStorage.setItem("my_orders_data", JSON.stringify(orders));
  };

  let currentFilter = "ALL";
  let searchQuery = "";

  const addOrderBtn = document.querySelector("#addOrderBtn");
  const orderModal = document.querySelector("#orderModal");
  const closeModal = document.querySelector("#closeModal");
  const cancelModal = document.querySelector("#cancelModal");
  const addOrderForm = document.querySelector("#addOrderForm");

  const ordersList = document.querySelector("#ordersList");
  const searchInput = document.querySelector("#searchInput");
  const filterBtns = document.querySelectorAll(".filter-btn");

  const pendingCountEl = document.querySelector("#pendingCount");
  const totalRevenueEl = document.querySelector("#totalRevenue");

  const exportBtn = Array.from(document.querySelectorAll("header button")).find(
    (btn) => btn.textContent.includes("Export"),
  );

  const exportOrdersToCSV = () => {
    const filteredOrders = orders.filter((order) => {
      const matchesFilter =
        currentFilter === "ALL" || order.status === currentFilter;
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    if (filteredOrders.length === 0) {
      alert("No orders available to export!");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent +=
      "Order ID,Customer Name,Items Count,Amount ($),Status,Date/Time\n";

    filteredOrders.forEach((order) => {
      const row = `"${order.id}","${order.customer}",${order.items},${order.amount},"${order.status}","${order.time}"`;
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Orders_Export_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  exportBtn?.addEventListener("click", exportOrdersToCSV);

  const getStatusBadge = (status) => {
    switch (status) {
      case "PROCESSING":
        return `<span class="rounded bg-gray-200 px-1.5 py-0.5 text-[10px] font-bold text-gray-700 tracking-wider">PROCESSING</span>`;
      case "SHIPPED":
        return `<span class="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 tracking-wider">SHIPPED</span>`;
      case "DELIVERED":
        return `<span class="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700 tracking-wider">DELIVERED</span>`;
      default:
        return "";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PROCESSING":
        return `<i class="fa-solid fa-box-archive"></i>`;
      case "SHIPPED":
        return `<i class="fa-solid fa-truck-fast"></i>`;
      case "DELIVERED":
        return `<i class="fa-solid fa-circle-check"></i>`;
      default:
        return `<i class="fa-solid fa-box"></i>`;
    }
  };

  const updateSummaryCards = () => {
    const pendingCount = orders.filter((o) => o.status === "PROCESSING").length;
    const totalRev = orders.reduce((sum, o) => sum + o.amount, 0);

    if (pendingCountEl) pendingCountEl.textContent = pendingCount;
    if (totalRevenueEl)
      totalRevenueEl.textContent = `$${totalRev.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
  };

  const renderOrders = () => {
    const filtered = orders.filter((order) => {
      const matchesFilter =
        currentFilter === "ALL" || order.status === currentFilter;
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      ordersList.innerHTML = `
        <div class="p-8 text-center text-gray-500 text-sm">
          No orders found matching your search criteria.
        </div>
      `;
      return;
    }

    ordersList.innerHTML = filtered
      .map(
        (order) => `
        <div class="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              ${getStatusIcon(order.status)}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-sm text-gray-900">#${order.id}</span>
                ${getStatusBadge(order.status)}
              </div>
              <p class="text-xs text-gray-500 mt-0.5">
                ${order.customer} • ${order.items} ${order.items > 1 ? "items" : "item"}
              </p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold text-sm text-gray-900">$${Number(order.amount).toFixed(2)}</p>
            <p class="text-xs text-gray-400">${order.time}</p>
          </div>
        </div>
      `,
      )
      .join("");

    updateSummaryCards();
  };
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.className =
          "filter-btn rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50";
      });

      btn.className =
        "filter-btn active-filter rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700";

      currentFilter = btn.getAttribute("data-filter");
      renderOrders();
    });
  });

  searchInput?.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderOrders();
  });
  const toggleModal = (show) => {
    if (show) {
      orderModal?.classList.remove("hidden");
    } else {
      orderModal?.classList.add("hidden");
      addOrderForm?.reset();
    }
  };

  addOrderBtn?.addEventListener("click", () => toggleModal(true));
  closeModal?.addEventListener("click", () => toggleModal(false));
  cancelModal?.addEventListener("click", () => toggleModal(false));

  orderModal?.addEventListener("click", (e) => {
    if (e.target === orderModal) toggleModal(false);
  });
  addOrderForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const customer = document.querySelector("#custName").value;
    const items = parseInt(document.querySelector("#itemCount").value) || 1;
    const amount = parseFloat(document.querySelector("#orderPrice").value) || 0;
    const status = document.querySelector("#orderStatus").value;

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer,
      items,
      amount,
      status,
      time: "Just now",
    };

    orders.unshift(newOrder);

    saveOrdersToLocalStorage();

    renderOrders();
    toggleModal(false);
  });

  renderOrders();
});
