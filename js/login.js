document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Page reload hone se rokta hai

      const email = document.getElementById("loginEmail").value;

      // User session save karein
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      // Directly Dashboard open karein
      window.location.href = "index.html";
    });
  }
});