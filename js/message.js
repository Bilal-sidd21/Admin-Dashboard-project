document.addEventListener("DOMContentLoaded", () => {
  const messagesList = document.getElementById("messagesList");
  const searchInbox = document.getElementById("searchInbox");

  const statTotal = document.getElementById("statTotal");
  const statPending = document.getElementById("statPending");
  const statResolved = document.getElementById("statResolved");

  const btnFilterAll = document.getElementById("btnFilterAll");
  const btnFilterPending = document.getElementById("btnFilterPending");
  const btnFilterResolved = document.getElementById("btnFilterResolved");

  const drawerOverlay = document.getElementById("drawerOverlay");
  const drawerContent = document.getElementById("drawerContent");

  let currentTab = "All";

  const defaultData = [
    {
      id: 1,
      sender: "Ali Raza",
      email: "ali@gmail.com",
      topic: "Account Activation Issue",
      details: "Mera account register karne ke baad email verification token expired bol raha hai. Control panel se verify kar dein.",
      date: "26 Aug 2026, 05:12 PM",
      status: "Unread"
    },
    {
      id: 2,
      sender: "Ahmed Khan",
      email: "ahmed@gmail.com",
      topic: "Order Cancellation Refund",
      details: "Order #9042 cancel ho gaya tha lekin bank account me refund show nahi ho raha.",
      date: "25 Aug 2026, 01:20 PM",
      status: "Resolved"
    },
    {
      id: 3,
      sender: "Usman Ghani",
      email: "usman@gmail.com",
      topic: "Bulk Purchase Discount",
      details: "Humari agency ko 15 custom licenses chahiye, kya bulk discount mil sakta hai?",
      date: "24 Aug 2026, 11:00 AM",
      status: "Unread"
    }
  ];

  const getStore = () => JSON.parse(localStorage.getItem("pro_desk_messages")) || defaultData;
  const saveStore = (data) => localStorage.setItem("pro_desk_messages", JSON.stringify(data));

  
  }

  const updateStats = (data) => {
    statTotal.textContent = data.length;
    statPending.textContent = data.filter((m) => m.status === "Unread").length;
    statResolved.textContent = data.filter((m) => m.status === "Resolved").length;
  };


  const renderList = () => {
    const data = getStore();
    updateStats(data);

    const filterVal = searchInbox ? searchInbox.value.toLowerCase() : "";
    messagesList.innerHTML = "";

    const filtered = data.filter((item) => {
      const matchesSearch =
        item.sender.toLowerCase().includes(filterVal) ||
        item.email.toLowerCase().includes(filterVal) ||
        item.topic.toLowerCase().includes(filterVal);

      if (currentTab === "All") return matchesSearch;
      return matchesSearch && item.status === currentTab;
    });

    if (filtered.length === 0) {
      messagesList.innerHTML = `<div class="p-8 text-center text-gray-400 text-sm">No messages available in this view.</div>`;
      return;
    }

    filtered.forEach((msg) => {
      const isUnread = msg.status === "Unread";
      const row = document.createElement("div");
      row.className = `p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50 transition cursor-pointer ${
        isUnread ? "bg-blue-50/40 font-medium" : ""
      }`;

      row.onclick = () => openDrawer(msg.id);

      row.innerHTML = `
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-10 h-10 rounded-full ${isUnread ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} font-bold text-xs flex items-center justify-center shrink-0">
            ${msg.sender.charAt(0)}
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <h4 class="text-sm font-semibold text-gray-800 truncate">${msg.sender}</h4>
              <span class="text-xs text-gray-400">(${msg.email})</span>
            </div>
            <p class="text-xs font-medium text-gray-700 truncate mt-0.5">${msg.topic}</p>
            <p class="text-xs text-gray-500 truncate">${msg.details}</p>
          </div>
        </div>

        <div class="flex items-center gap-3 shrink-0 self-end md:self-center">
          <span class="text-xs text-gray-400">${msg.date.split(",")[0]}</span>
          <span class="px-2.5 py-1 text-[11px] font-bold rounded-full ${
            isUnread ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
          }">
            ${msg.status}
          </span>
          <button data-id="${msg.id}" class="delete-icon-btn text-gray-400 hover:text-red-500 p-1">
            <i class="fa-solid fa-trash-can text-sm"></i>
          </button>
        </div>
      `;
      messagesList.appendChild(row);
    });
  };

 
  const openDrawer = (id) => {
    const data = getStore();
    const msg = data.find((m) => m.id === id);
    if (!msg) return;

    drawerContent.innerHTML = `
      <div>
        <div class="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
          <span class="px-2.5 py-1 text-xs font-bold rounded-full ${
            msg.status === "Unread" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
          }">${msg.status}</span>
          <button id="closeDrawerBtn" class="text-gray-400 hover:text-gray-600 text-lg">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <h3 class="text-lg font-bold text-gray-900">${msg.topic}</h3>
        <div class="mt-2 text-xs text-gray-500 flex justify-between">
          <span>From: <strong class="text-gray-800">${msg.sender}</strong> (${msg.email})</span>
        </div>
        <p class="text-[11px] text-gray-400 mt-1">${msg.date}</p>

        <div class="my-6 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700 leading-relaxed">
          ${msg.details}
        </div>

        <div class="mt-4">
          <label class="block text-xs font-semibold text-gray-600 mb-2">Send Direct Reply</label>
          <textarea id="drawerReply" rows="4" placeholder="Write reply message..." class="w-full p-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
      </div>

      <div class="flex gap-2 pt-4 border-t border-gray-100 mt-4">
        <button id="btnSendReply" class="flex-1 bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-sm hover:bg-blue-700 transition">
          Reply & Resolve
        </button>
        <button id="btnToggleStatus" class="px-4 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50">
          Mark ${msg.status === "Unread" ? "Resolved" : "Unread"}
        </button>
      </div>
    `;

    drawerOverlay.classList.remove("hidden");
    drawerOverlay.classList.add("flex");

    setTimeout(() => {
      drawerContent.classList.remove("translate-x-full");
    }, 10);

  
    document.getElementById("closeDrawerBtn").onclick = closeDrawer;

    document.getElementById("btnSendReply").onclick = () => {
      const val = document.getElementById("drawerReply").value.trim();
      if (!val) return;
      alert(`Reply dispatched to ${msg.email}`);
      msg.status = "Resolved";
      saveStore(data);
      closeDrawer();
      renderList();
    };

    document.getElementById("btnToggleStatus").onclick = () => {
      msg.status = msg.status === "Unread" ? "Resolved" : "Unread";
      saveStore(data);
      closeDrawer();
      renderList();
    };
  };

  const closeDrawer = () => {
    drawerContent.classList.add("translate-x-full");
    setTimeout(() => {
      drawerOverlay.classList.add("hidden");
      drawerOverlay.classList.remove("flex");
    }, 300);
  };

  drawerOverlay.addEventListener("click", (e) => {
    if (e.target === drawerOverlay) closeDrawer();
  });


  messagesList.addEventListener("click", (e) => {
    const delBtn = e.target.closest(".delete-icon-btn");
    if (delBtn) {
      e.stopPropagation();
      const id = Number(delBtn.getAttribute("data-id"));
      if (confirm("Permanently delete message?")) {
        const updated = getStore().filter((m) => m.id !== id);
        saveStore(updated);
        renderList();
      }
    }
  });


  const setTab = (activeBtn, statusStr) => {
    [btnFilterAll, btnFilterPending, btnFilterResolved].forEach((b) => {
      b.className = "px-3.5 py-1.5 text-xs font-semibold bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-lg";
    });
    activeBtn.className = "px-3.5 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg shadow-sm";
    currentTab = statusStr;
    renderList();
  };

  btnFilterAll.onclick = () => setTab(btnFilterAll, "All");
  btnFilterPending.onclick = () => setTab(btnFilterPending, "Unread");
  btnFilterResolved.onclick = () => setTab(btnFilterResolved, "Resolved");

  if (searchInbox) searchInbox.addEventListener("input", renderList);


  if (!localStorage.getItem("pro_desk_messages")) {
    saveStore(defaultData);
  }
  renderList();
});