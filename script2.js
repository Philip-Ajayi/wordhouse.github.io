document.addEventListener("DOMContentLoaded", () => {
    // Load header
    fetch("https://mivwordhouse.com/whheaderaudiopage.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
        })
        .catch(error => console.error("Error loading header:", error));

    // Load footer
    fetch("https://mivwordhouse.com/whfooteraudiopage.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));
});
