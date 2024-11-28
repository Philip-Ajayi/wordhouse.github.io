import { parseBlob } from "music-metadata-browser";

document.addEventListener("DOMContentLoaded", async function () {
  const library = document.getElementById("library");
  const searchBar = document.getElementById("searchBar");
  const filterSeries = document.getElementById("filterSeries");
  const filterMinister = document.getElementById("filterMinister");
  const themeToggle = document.getElementById("themeToggle");

  const CLOUD_NAME = "dt2afznub"; // Replace with your Cloudinary cloud name
  const AUDIO_FOLDER = "mivwordhouse"; // Replace with your folder name in Cloudinary
  const AUDIO_ENDPOINT = `https://res.cloudinary.com/${CLOUD_NAME}/resources/search?expression=folder:${AUDIO_FOLDER}`;

  let trackData = [];

  // Fetch audio file URLs from Cloudinary
  async function fetchAudioFiles() {
    try {
      const response = await fetch(AUDIO_ENDPOINT, {
        headers: {
          Authorization: `Basic ${btoa("516448329531825:ylhCfRUd7ZlpOQEPaqQRHahxzLI")}`, // Replace with your API key and secret
        },
      });
      const data = await response.json();
      return data.resources.map(file => ({
        url: file.secure_url,
        publicId: file.public_id,
      }));
    } catch (error) {
      console.error("Error fetching audio files:", error);
      return [];
    }
  }

  // Extract metadata from audio file
  async function extractMetadata(audioUrl) {
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const metadata = await parseBlob(blob);

      const common = metadata.common;
      return {
        title: common.title || "Unknown Title",
        minister: common.artist || "Unknown Minister",
        series: common.album || "Unknown Series",
        year: common.year || "Unknown Year",
        genre: common.genre ? common.genre.join(", ") : "Unknown Genre",
        cover: common.picture
          ? URL.createObjectURL(new Blob([common.picture[0].data]))
          : "assets/covers/default.jpg",
        file: audioUrl,
      };
    } catch (error) {
      console.error(`Error extracting metadata from ${audioUrl}:`, error);
      return null;
    }
  }

  // Render tracks
  async function renderTracks(data) {
    library.innerHTML = "";

    for (const track of data) {
      const trackElement = document.createElement("div");
      trackElement.classList.add("track");

      trackElement.innerHTML = `
        <img src="${track.cover}" alt="${track.title} Cover" class="track-cover">
        <h3>${track.title}</h3>
        <p><em>${track.minister}</em></p>
        <p><strong>Series:</strong> ${track.series}</p>
        <p><strong>Year:</strong> ${track.year}</p>
        <audio controls>
          <source src="${track.file}" type="audio/mpeg">
        </audio>
      `;
      library.appendChild(trackElement);
    }
  }

  // Populate dropdown filters
  function populateDropdowns() {
    const ministers = [...new Set(trackData.map(t => t.minister))];
    const series = [...new Set(trackData.map(t => t.series))];

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

  // Filter tracks based on user input
  function filterTracks() {
    const searchTerm = searchBar.value.toLowerCase();
    const selectedSeries = filterSeries.value;
    const selectedMinister = filterMinister.value;

    const filtered = trackData.filter(track => {
      return (
        (track.title.toLowerCase().includes(searchTerm) ||
          track.minister.toLowerCase().includes(searchTerm) ||
          track.series.toLowerCase().includes(searchTerm)) &&
        (!selectedSeries || track.series === selectedSeries) &&
        (!selectedMinister || track.minister === selectedMinister)
      );
    });

    renderTracks(filtered);
  }

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  // Initialize
  const audioFiles = await fetchAudioFiles();
  const metadataPromises = audioFiles.map(file => extractMetadata(file.url));
  trackData = (await Promise.all(metadataPromises)).filter(Boolean);

  renderTracks(trackData);
  populateDropdowns();

  searchBar.addEventListener("input", filterTracks);
  filterSeries.addEventListener("change", filterTracks);
  filterMinister.addEventListener("change", filterTracks);
});
