document.addEventListener("DOMContentLoaded", function () {

 

  const reportsTableBody = document.getElementById("reportsTableBody");
  const searchInput = document.getElementById("searchReportInput");
  const dateRangeFilter = document.getElementById("reportDateRange");
  const typeFilter = document.getElementById("reportTypeFilter");

  const exportCsvBtn = document.getElementById("exportCsvBtn");
  const exportPdfBtn = document.getElementById("exportPdfBtn");

  
  // --- Sample Reports Data ---
  let reportsData = [
    { id: "#REP-101", source: "Electronics Sales", date: "2026-08-25", orders: 142, amount: 12450.00, type: "SALES", status: "Completed" },
    { id: "#REP-102", source: "Audio & Wearables", date: "2026-08-24", orders: 89, amount: 4320.00, type: "SALES", status: "Completed" },
    { id: "#REP-103", source: "Accessories", date: "2026-08-20", orders: 210, amount: 6890.00, type: "SALES", status: "Completed" },
    { id: "#REP-104", source: "User Registrations", date: "2026-08-15", orders: 45, amount: 0.00, type: "USERS", status: "Pending" },
    { id: "#REP-105", source: "Smart Home Devices", date: "2026-07-28", orders: 67, amount: 5240.00, type: "SALES", status: "Completed" },
    { id: "#REP-106", source: "Active User Logins", date: "2026-06-10", orders: 320, amount: 0.00, type: "USERS", status: "Completed" }
  ];

  // --- Filter Logic ---
  function getFilteredData() {
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const selectedType = typeFilter ? typeFilter.value : "ALL";
    const selectedDateRange = dateRangeFilter ? dateRangeFilter.value : "30days";

    const now = new Date();

    return reportsData.filter((item) => {
      // 1. Search Filter (Search by ID or Category Name)
      const matchesSearch = 
        item.id.toLowerCase().includes(searchQuery) ||
        item.source.toLowerCase().includes(searchQuery);

      // 2. Report Type Filter
      const matchesType = selectedType === "ALL" || item.type === selectedType;

      // 3. Date Range Filter
      const itemDate = new Date(item.date);
      const diffTime = Math.abs(now - itemDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let matchesDate = true;
      if (selectedDateRange === "7days") {
        matchesDate = diffDays <= 7;
      } else if (selectedDateRange === "30days") {
        matchesDate = diffDays <= 30;
      } else if (selectedDateRange === "thisYear") {
        matchesDate = itemDate.getFullYear() === now.getFullYear();
      }

      return matchesSearch && matchesType && matchesDate;
    });
  }

  // --- Render Table Function ---
  function renderReports() {
    if (!reportsTableBody) return;
    reportsTableBody.innerHTML = "";

    const filteredData = getFilteredData();

    if (filteredData.length === 0) {
      reportsTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="p-6 text-center text-gray-400 text-xs">
            No report records match your selected filters.
          </td>
        </tr>
      `;
      return;
    }

    filteredData.forEach((item) => {
      const tr = document.createElement("tr");
      tr.className = "hover:bg-gray-50 transition-colors";

      const badgeClass = item.status === "Completed" 
        ? "bg-green-50 text-green-600 border-green-100" 
        : "bg-amber-50 text-amber-600 border-amber-100";

      tr.innerHTML = `
        <td class="p-3 font-semibold text-gray-800">${item.id}</td>
        <td class="p-3 text-gray-700 font-medium">${item.source}</td>
        <td class="p-3 text-gray-500">${item.date}</td>
        <td class="p-3 text-gray-600">${item.orders}</td>
        <td class="p-3 font-semibold text-gray-800">$${item.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
        <td class="p-3">
          <span class="text-[10px] px-2 py-0.5 rounded-full border ${badgeClass} font-medium">${item.status}</span>
        </td>
      `;

      reportsTableBody.appendChild(tr);
    });
  }

  // --- Export CSV Functionality ---
  exportCsvBtn?.addEventListener("click", () => {
    const dataToExport = getFilteredData();

    if (dataToExport.length === 0) {
      alert("No data available to export.");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,ID,Source/Category,Date,Total Orders,Amount,Type,Status\n";

    dataToExport.forEach(row => {
      csvContent += `${row.id},"${row.source}",${row.date},${row.orders},${row.amount},${row.type},${row.status}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reports_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // --- Export PDF / Print Functionality ---
  exportPdfBtn?.addEventListener("click", () => {
    window.print();
  });

  // --- Event Listeners for Filters & Search ---
  searchInput?.addEventListener("input", renderReports);
  dateRangeFilter?.addEventListener("change", renderReports);
  typeFilter?.addEventListener("change", renderReports);

  // Initial Load
  renderReports();
});