document.addEventListener("DOMContentLoaded", async function () {
    const library = document.getElementById("library");
    const searchBar = document.getElementById("searchBar");
    const filterSeries = document.getElementById("filterSeries");
    const filterMinister = document.getElementById("filterMinister");
    const themeToggle = document.getElementById("themeToggle");

    let trackData = [];

    // Fetch and parse mp3tag.html
    async function fetchTrackData() {
        try {
            const response = await fetch("mp3tag.html");
            const htmlText = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, "text/html");

            const rows = Array.from(doc.querySelectorAll("table tr")).slice(1); // Skip header row
            const parsedData = rows.map(row => {
                const cells = row.querySelectorAll("td");
                return {
                    title: cells[0]?.textContent.trim(),
                    minister: cells[1]?.textContent.trim(),
                    series: cells[2]?.textContent.trim(),
                    track: cells[3]?.textContent.trim(),
                    year: cells[4]?.textContent.trim(),
                    genre: cells[5]?.textContent.trim(),
                    file: cells[6]?.textContent.trim(),
                };
            });
            console.log("Fetched Track Data:", parsedData); // Debugging fetched data
            return parsedData;
        } catch (error) {
            console.error("Error fetching or parsing mp3tag.html:", error);
            return [];
        }
    }

    function getCoverImagePath(title) {
        const imagePath = `assets/covers/${title}.jpg`;
        return imagePath;
    }

    async function doesImageExist(path) {
        try {
            const response = await fetch(path, { method: "HEAD" });
            return response.ok;
        } catch {
            return false;
        }
    }

    async function renderTracks(data) {
        library.innerHTML = "";
        console.log("Rendering Tracks:", data); // Debugging rendered data

        for (const track of data) {
            const trackElement = document.createElement("div");
            trackElement.classList.add("track");

            // Determine cover image
            const imagePath = getCoverImagePath(track.title);
            const imageExists = await doesImageExist(imagePath);
            const coverImage = imageExists ? imagePath : "assets/covers/default.jpg";

            trackElement.innerHTML = `
                <img src="${coverImage}" loading="lazy" alt="${track.title} Cover" class="track-cover">
                <h3>${track.title}</h3>
                <p><em>${track.minister}</em></p>
                <p><strong>Series:</strong> ${track.series}</p>
                <p><strong>Year:</strong> ${track.year}</p>
                <audio controls>
                    <source src="assets/audio/${track.file}" type="audio/mpeg">
                </audio>
            `;
            library.appendChild(trackElement);
        }
    }

    function populateDropdowns() {
        const ministers = [...new Set(trackData.map(t => t.minister))];
        const series = [...new Set(trackData.map(t => t.series))];

        console.log("Ministers for Dropdown:", ministers); // Debug ministers
        console.log("Series for Dropdown:", series); // Debug series

        ministers.forEach(minister => {
            const option = document.createElement("option");
            option.value = minister;
            option.textContent = minister;
            filterMinister.appendChild(option);
        });

        series.forEach(series => {
            const option = document.createElement("option");
            option.value = series;
            option.textContent = series;
            filterSeries.appendChild(option);
        });
    }

    function filterTracks() {
        const searchTerm = searchBar.value.toLowerCase().trim();
        const selectedSeries = filterSeries.value.trim();
        const selectedMinister = filterMinister.value.trim();

        console.log("Filters - Search Term:", searchTerm, "| Series:", selectedSeries, "| Minister:", selectedMinister); // Debug filters

        const filtered = trackData.filter(track => {
            return (
                (track.title.toLowerCase().includes(searchTerm) ||
                    track.minister.toLowerCase().includes(searchTerm) ||
                    track.series.toLowerCase().includes(searchTerm)) &&
                (!selectedSeries || track.series === selectedSeries) &&
                (!selectedMinister || track.minister === selectedMinister)
            );
        });

        console.log("Filtered Data:", filtered); // Debug filtered data
        renderTracks(filtered);
    }

    // Theme toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });

    // Initialize
    trackData = await fetchTrackData();
    renderTracks(trackData);
    populateDropdowns();

    searchBar.addEventListener("input", filterTracks);
    filterSeries.addEventListener("change", () => {
        console.log("Series filter changed:", filterSeries.value); // Debug series dropdown change
        filterTracks();
    });
    filterMinister.addEventListener("change", () => {
        console.log("Minister filter changed:", filterMinister.value); // Debug minister dropdown change
        filterTracks();
    });
});
