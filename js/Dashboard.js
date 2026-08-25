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

const chart = document.getElementById("salesChart");

new Chart(chart, {
    type: "bar",

    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

        datasets: [{
            label: "Sales",
            data: [120, 190, 150, 250, 220, 300]
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});