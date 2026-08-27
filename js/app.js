let sidebr = document.querySelector("#sidebr");
let menubtn = document.querySelector("#menubtn");
let closeSidebar = document.querySelector("#closeSidebar");
menubtn.addEventListener("click", function () {
  sidebr.classList.remove("hidden");
  menubtn.classList.add("hidden");
});


closeSidebar.addEventListener("click", function () {
  sidebr.classList.add("hidden");
  menubtn.classList.remove("hidden");
});








document.addEventListener("DOMContentLoaded", () => {
  // 1. Avatar Instant Preview
  const avatarInput = document.getElementById("avatarInput");
  const previewAvatar = document.getElementById("previewAvatar");
  const sidebarAvatar = document.getElementById("sidebarAvatar");

  if (avatarInput) {
    avatarInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageURL = URL.createObjectURL(file);
        previewAvatar.src = imageURL;
        sidebarAvatar.src = imageURL;
      }
    });
  }

  // 2. Personal Profile Form Handling
  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Profile Details Updated Successfully!");
    });
  }

  // 3. Password Reset Validation
  const passwordForm = document.getElementById("passwordForm");
  if (passwordForm) {
    passwordForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newPass = document.getElementById("newPass").value;

      if (newPass.length < 6) {
        alert("New password must be at least 6 characters long.");
        return;
      }

      alert("Password Updated Successfully!");
      passwordForm.reset();
    });
  }

  // 4. Save Options in LocalStorage
  const emailNotif = document.getElementById("emailNotif");
  const langSelect = document.getElementById("langSelect");

  if (emailNotif) {
    emailNotif.checked = localStorage.getItem("emailNotif") !== "false";
    emailNotif.addEventListener("change", (e) => {
      localStorage.setItem("emailNotif", e.target.checked);
    });
  }

  if (langSelect) {
    langSelect.value = localStorage.getItem("appLang") || "en";
    langSelect.addEventListener("change", (e) => {
      localStorage.setItem("appLang", e.target.value);
    });
  }
});





document.addEventListener("DOMContentLoaded", () => {
  // Logout link selector
  const logoutBtn = document.querySelector('a[href="#"]'); // Ya direct ID se target karein

  // Alternate: Logout element par ID lagayein <a id="logoutBtn" href="#">
  const logoutElement = document.getElementById("logoutBtn") || logoutBtn;

  if (logoutElement) {
    logoutElement.addEventListener("click", (e) => {
      e.preventDefault();

      // Session data remove karein
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");

      // Login page par bhej dein
      window.location.href = "login.html";
    });
  }
});




document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");

  // Check saved theme or system setting
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    applyDarkMode();
  } else {
    applyLightMode();
  }

  // Toggle Theme on Moon/Sun Icon Click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      if (isDarkMode) {
        applyLightMode();
      } else {
        applyDarkMode();
      }
    });
  }

  function applyDarkMode() {
    document.documentElement.classList.add("dark");
    if (themeIcon) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
    localStorage.setItem("theme", "dark");
  }

  function applyLightMode() {
    document.documentElement.classList.remove("dark");
    if (themeIcon) {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
    localStorage.setItem("theme", "light");
  }
});









