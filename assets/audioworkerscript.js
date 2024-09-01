document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.menu-button');
    const sidebar = document.querySelector('.sidebar');
    const cancelButton = document.getElementById('cancel-button');

    menuButton.addEventListener('click', function () {
        document.body.classList.toggle('menu-open');
        if (document.body.classList.contains('menu-open')) {
            sidebar.style.left = '0';
        } else {
            sidebar.style.left = '-250px'; // Close the sidebar
        }
    });

    cancelButton.addEventListener('click', function () {
        document.body.classList.remove('menu-open');
        sidebar.style.left = '-250px'; // Close the sidebar
    });

    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchSuggestions = document.getElementById('search-suggestions');
    const contentDivs = document.querySelectorAll('.content-item');

    // Define an array of possible search suggestions
    const suggestionsArray = ["The spirit flow magnitude by Pst. Ope Rowland", "The spirit flow direction by Pst. Ope Rowland", "How the spirit is shared by Pst. Ope Rowland", "Shared abilities by Pst. Ope Rowland", "Shared inheritance by Pst. Ope Rowland", "Shared suffering by Pst. Ope Rowland", "Shared responsibilities by Pst. Ope Rowland"];

    // Handle search functionality
    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.toLowerCase();
        searchSuggestions.style.display = 'none'; // Hide suggestions
        contentDivs.forEach(function (div) {
            const divSearchValue = div.getAttribute('data-search').toLowerCase();
            if (divSearchValue.includes(searchTerm)) {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });
    });

    // Handle search suggestions
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        searchSuggestions.innerHTML = '';
        const matchingSuggestions = suggestionsArray.filter(suggestion => suggestion.toLowerCase().includes(searchTerm));
        const maxSuggestions = Math.min(10, matchingSuggestions.length); // Limit to 10 suggestions
        for (let i = 0; i < maxSuggestions; i++) {
            const suggestionElement = document.createElement('div');
            suggestionElement.textContent = matchingSuggestions[i];
            suggestionElement.addEventListener('click', function () {
                searchInput.value = matchingSuggestions[i];
                searchButton.click();
                searchSuggestions.style.display = 'none';
            });
            searchSuggestions.appendChild(suggestionElement);
        }
        if (maxSuggestions > 0) {
            searchSuggestions.style.display = 'block';
        } else {
            searchSuggestions.style.display = 'none';
        }
    });
});
