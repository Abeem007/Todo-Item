function updateTimeRemaining() {
  const el = document.getElementById("time-remaining");
  const dueDate = new Date("2026-04-20T18:00:00Z");
  const now = new Date();

  const diffMs = dueDate - now;
  const minutes = Math.floor(Math.abs(diffMs) / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let text = "";

  if (diffMs > 0) {
    if (days > 1) {
      text = `Due in ${days} days`;
    } else if (days === 1) {
      text = "Due tomorrow";
    } else if (hours >= 1) {
      text = `Due in ${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 1) {
      text = `Due in ${minutes} minutes`;
    } else {
      text = "Due now!";
    }
  }
  el.textContent = text;
}
updateTimeRemaining();
setInterval(updateTimeRemaining, 60000);

function handleToggle(cb) {
  const title = document.getElementById("todo-title");
  const status = document.getElementById("status-badge");
  if (cb.checked) {
    title.classList.add("completed");
    status.textContent = "Done";
    status.setAttribute("aria-label", "Status: Done");
    status.className = "badge badge-green";
  } else {
    title.classList.remove("completed");
    status.textContent = "In Progress";
    status.setAttribute("aria-label", "Status: In Progress");
    status.className = "badge badge-blue";
  }
}
