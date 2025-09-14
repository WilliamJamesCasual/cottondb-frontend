// Vercel URL to interface with the steam api
const apiUrl = "https://steam-api-proxy.vercel.app/api/steam";

// Send a get request to the backend
fetch(apiUrl)
  // Convert the HTTP response body into JSON data and log it to console
  .then(res => res.json())
  .then(data => {
    console.log("Steam data:", data);
    
    // Get a reference to the div with ID steam-data and swaps out the text with the number of games retrieved (just to test)
    const outputDiv = document.getElementById("steam-data");
    outputDiv.innerText = `You own ${data.response.game_count} games.`;
  })

  // Console log errors that show up as a result of the fetch call chain
  .catch(err => {
    console.error("Error fetching Steam data:", err);
  });
