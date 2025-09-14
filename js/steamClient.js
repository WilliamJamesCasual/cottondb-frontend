// Vercel URL to interface with the steam api
const apiUrl = "https://steam-api-proxy.vercel.app/api/steam";

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    console.log("Steam data:", data);

    const tableBody = document.getElementById("games-table-body");
    tableBody.innerHTML = ""; 

    data.response.games.forEach(game => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${game.name}</td>
        <td>${game.playtime_forever ? formatPlaytime(game.playtime_forever) : "0h"}</td>
        <td>${game.rtime_last_played ? new Date(game.rtime_last_played * 1000).toLocaleDateString() : "Never"}</td>
      `;

      tableBody.appendChild(row);
    });

    const outputDiv = document.getElementById("steam-data");
    outputDiv.innerText = `You own ${data.response.game_count} games.`;
  })
  .catch(err => {
    console.error("Error fetching Steam data:", err);
  });

function formatPlaytime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

