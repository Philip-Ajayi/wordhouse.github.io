document.addEventListener("DOMContentLoaded", function () {
    const loadMoreButton = document.getElementById("loadMore");
    const otherGrid = document.querySelector("header:last-child .grid");

    loadMoreButton.addEventListener("click", function () {
        // Replace this with your logic to load more Instagram items
        const newInstagramItems = generateInstagramItems(30);
        otherGrid.innerHTML += newInstagramItems;
    });
});

// Function to generate Instagram items (placeholders in this example)
function generateInstagramItems(count) {
    let items = "";
    for (let i = 0; i < count; i++) {
        items += `
            <blockquote>
                <!-- Instagram embed code goes here -->
            </blockquote>
        `;
    }
    return items;
}