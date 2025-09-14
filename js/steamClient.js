// Vercel URL to interface with the steam api
const apiUrl = "https://steam-api-proxy.vercel.app/api/steam";

// Fetch data from the backend
fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    console.log("Steam data:", data);

    // Show number of games owned 
    const outputDiv = document.getElementById("steam-data");
    outputDiv.innerText = `You own ${data.response.game_count} games.`;

    const tableBody = document.getElementById("games-table-body");

    // Loop through each game and create table rows
    data.response.games.forEach(game => {
      const row = document.createElement("tr");

      const titleCell = document.createElement("td");
      titleCell.textContent = game.name;
      row.appendChild(titleCell);

      const achievementsCell = document.createElement("td");
      achievementsCell.textContent = game.achievements 
        ? game.achievements.total 
        : "N/A";
      row.appendChild(achievementsCell);

      const completionCell = document.createElement("td");
      if (game.achievements) {
        const { unlocked, total } = game.achievements;
        const completionRate = ((unlocked / total) * 100).toFixed(1);
        completionCell.textContent = `${completionRate}%`;
      } else {
        completionCell.textContent = "N/A";
      }
      row.appendChild(completionCell);

      const playtimeCell = document.createElement("td");
      const hours = (game.playtime_forever / 60).toFixed(1);
      playtimeCell.textContent = `${hours} hrs`;
      row.appendChild(playtimeCell);

      const lastPlayedCell = document.createElement("td");
      if (game.rtime_last_played) {
        const date = new Date(game.rtime_last_played * 1000);
        lastPlayedCell.textContent = date.toLocaleDateString();
      } else {
        lastPlayedCell.textContent = "Never";
      }
      row.appendChild(lastPlayedCell);

      // Add row to table
      tableBody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Error fetching Steam data:", err);
  });