
// This javascript file is for testing api requests to steam using the vercel proxy

// Vercel URL to interface with steam api
const apiUrl = "https://steam-api-proxy.vercel.app/api/steam";

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    console.log("Steam data:", data);

    // Test ot display number of games owned inside of a div
    const outputDiv = document.getElementById("steam-data");
    outputDiv.innerText = `You own ${data.response.game_count} games.`;
  })
  .catch(err => {
    console.error("Error fetching Steam data:", err);
  });
