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
    const suggestionsArray = ["The faith walk by Pst. Ope Rowland", "Standing in faith by Pst. Ope Rowland", "The faith life by Pst. Ope Rowland", "Fruitful relationship by Dcns. Atinuke Rowland", "How to be fruitful by Pst. Ope Rowland", "10 times better by Pst. Ope Rowland", "Obtaining better things by Pst. Ope Rowland", "Positioning better things by Pst. Ope Rowland", "Becoming better by Pst. Ope Rowland", "Becoming better by Pst. Ope Rowland", "The vehicle of purpose by Pst. Ope Rowland", "Purposeful living by Pst. Ope Rowland", "The purpose driven life by Pst. Ope Rowland", "Abstinence adiction and abuse by Pst. Ope Rowland", "Parents in-laws and siblings by Dcns. Atinuke Rowland", "Lust crush infatuation love by Pst. Ope Rowland", "Friendship courtship and situationship by Pst. Ope Rowland", "Anger game by Pst. Ope Rowland", "Wisdom and Anger by Pst. Ope Rowland", "Overcoming anger by Pst. Ope Rowland", "Thanksgiving my weapon against anger by Pst. Zephaniah Adediran", "The life preferred by God by Pst. Ope Rowland", "Gratitude my preferred lifestyle", "The journey to me by Pst. Ope Rowland", "The pursuit processes by Pst. Ope Rowland"];

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
