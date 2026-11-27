const list = document.querySelector("#starred");
const status = document.querySelector("#status");

status.textContent = "Loading starred repositories…";

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  })
  .then((events) => {
    if (!Array.isArray(events)) {
      throw new Error("Repository data must be an array");
    }

    events.forEach((event) => {
      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred}`;
      list.appendChild(item);
    });
    status.textContent = events.length === 0
      ? "No starred repositories found."
      : `Loaded ${events.length} starred repositories.`;
  })
  .catch((error) => {
    console.error("Failed to load starred repositories:", error);
    status.textContent = "Could not load starred repositories. Please try again later.";
  });
