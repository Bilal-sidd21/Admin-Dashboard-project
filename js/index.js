





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
