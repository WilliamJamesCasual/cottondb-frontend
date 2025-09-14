// URL of Vercel backend that interfaces with Steam
const apiUrl = "https://steam-api-proxy.vercel.app/api/steam";

// Function to fetch games and populate the table
function populateSteamTable() {
  const tableBody = document.getElementById("games-table-body");
  const outputDiv = document.getElementById("steam-data");

  // Clear existing rows
  tableBody.innerHTML = "";
  outputDiv.innerText = "Loading games...";

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      console.log("Steam data:", data);

      if (!data.response || !data.response.games || data.response.games.length === 0) {
        outputDiv.innerText = "No games found.";
        return;
      }

      outputDiv.innerText = `You own ${data.response.game_count} games.`;

      data.response.games.forEach(game => {
        const row = document.createElement("tr");

        // Title
        const titleCell = document.createElement("td");
        titleCell.textContent = game.name;
        row.appendChild(titleCell);

        // Achievements
        const achievementsCell = document.createElement("td");
        achievementsCell.textContent = game.achievements
          ? game.achievements.total
          : "N/A";
        row.appendChild(achievementsCell);

        // Completion %
        const completionCell = document.createElement("td");
        if (game.achievements) {
          const { unlocked, total } = game.achievements;
          const completionRate = ((unlocked / total) * 100).toFixed(1);
          completionCell.textContent = `${completionRate}%`;
        } else {
          completionCell.textContent = "N/A";
        }
        row.appendChild(completionCell);

        // Playtime
        const playtimeCell = document.createElement("td");
        const hours = (game.playtime_forever / 60).toFixed(1);
        playtimeCell.textContent = `${hours} hrs`;
        row.appendChild(playtimeCell);

        // Last Played
        const lastPlayedCell = document.createElement("td");
        if (game.rtime_last_played) {
          const date = new Date(game.rtime_last_played * 1000);
          lastPlayedCell.textContent = date.toLocaleDateString();
        } else {
          lastPlayedCell.textContent = "Never";
        }
        row.appendChild(lastPlayedCell);

        // Append row to table
        tableBody.appendChild(row);
      });
    })
    .catch(err => {
      console.error("Error fetching Steam data:", err);
      outputDiv.innerText = "Error loading games.";
    });
}

document.addEventListener("DOMContentLoaded", populateSteamTable);
