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