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










// function syncAdminProfile() {
//   const savedName = localStorage.getItem("admin_name");
//   const savedImage = localStorage.getItem("admin_photo");

//   const nameElem = document.getElementById("globalSidebarName");
//   const avatarImg = document.getElementById("globalSidebarImg");
//   const avatarIcon = document.getElementById("globalSidebarIcon");


  
//   if (savedName && nameElem) {
//     nameElem.textContent = savedName;
//   }

 
//   if (savedImage && avatarImg && avatarIcon) {
//     avatarImg.src = savedImage;
//     avatarImg.classList.remove("hidden");
//     avatarIcon.classList.add("hidden");
//   }
// }

// // Page load hotay hi run hoga
// document.addEventListener("DOMContentLoaded", syncAdminProfile);
