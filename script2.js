document.addEventListener("DOMContentLoaded", () => {
    // Load header
    fetch("https://github.com/Philip-Ajayi/wordhouse.github.io/blob/main/whheaderaudiopage.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
        })
        .catch(error => console.error("Error loading header:", error));

    // Load footer
    fetch("https://github.com/Philip-Ajayi/wordhouse.github.io/blob/main/whfooteraudiopage.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));
});
