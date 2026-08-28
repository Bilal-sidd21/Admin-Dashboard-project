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


  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Profile Details Updated Successfully!");
    });
  }

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

  const logoutBtn = document.querySelector('a[href="#"]'); // Ya direct ID se target karein


  const logoutElement = document.getElementById("logoutBtn") || logoutBtn;

  if (logoutElement) {
    logoutElement.addEventListener("click", (e) => {
      e.preventDefault();

  
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");

   
      window.location.href = "login.html";
    });
  }
});






let themeToggleBtn = document.getElementById("themeToggleBtn");
let themeIcon = document.getElementById("themeIcon");


let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");

    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
}


themeToggleBtn.addEventListener("click", function () {

    document.documentElement.classList.toggle("dark");

 
    if (document.documentElement.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    } 
  
    else {

        localStorage.setItem("theme", "light");

        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }

});

