document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;

     
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

     
      window.location.href = "index.html";
    });
  }
});