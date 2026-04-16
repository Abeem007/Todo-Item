const state = {
  title: "Onboarding Flow",
  description:
    "Update new user onboarding screens to align with the latest brand guidelines and significantly improve step-by-step clarity for mobile users. This includes new illustrations, revised copy, and updated progress indicators across all five onboarding steps.",
  priority: "High",
  status: "In Progress",
  dueDate: new Date("2026-04-20T18:00:00Z"),
  expanded: false,
  isDone: false,
};

const COLLAPSE_THRESHOLD = 120;

const card = document.querySelector('[data-testid="test-todo-card"]');
const viewSection = document.getElementById("view-section");
const editForm = document.getElementById("edit-form");
const titleEl = document.getElementById("todo-title");
const descEl = document.getElementById("todo-description");
const collapsible = document.getElementById("collapsible-section");
const expandToggle = document.getElementById("expand-toggle");
const expandLabel = document.getElementById("expand-label");
const expandIcon = document.getElementById("expand-icon");
const priorityBadge = document.querySelector(
  '[data-testid="test-todo-priority"]',
);
const priorityDot = document.querySelector(
  '[data-testid="test-todo-priority-indicator"]',
);
const statusBadge = document.getElementById("status-badge");
const dueDateEl = document.getElementById("due-date-display");
const timeRemainingEl = document.getElementById("time-remaining");
const overdueEl = document.getElementById("overdue-indicator");
const checkbox = document.getElementById("todo-complete");
const statusBtns = document.querySelectorAll(".status-btn");
const editBtn = document.getElementById("edit-btn");

const PRIORITY = {
  Low: { badge: "badge-green", dot: "low", label: "Priority: Low" },
  Medium: { badge: "badge-yellow", dot: "medium", label: "Priority: Medium" },
  High: { badge: "badge-red", dot: "high", label: "Priority: High" },
};

const STATUS = {
  Pending: { badge: "badge-gray", btn: "active-pending", cardClass: "" },
  "In Progress": {
    badge: "badge-blue",
    btn: "active-inprogress",
    cardClass: "",
  },
  Done: { badge: "badge-green", btn: "active-done", cardClass: "is-done" },
};

function applyPriority(p) {
  const cfg = PRIORITY[p];
  priorityBadge.className = `badge ${cfg.badge}`;
  priorityBadge.textContent = p;
  priorityBadge.setAttribute("aria-label", cfg.label);
  priorityDot.className = `priority-dot ${cfg.dot}`;
  priorityDot.setAttribute("aria-label", cfg.label);
  card.classList.remove("priority-low", "priority-medium", "priority-high");
  if (!state.isDone) card.classList.add(`priority-${p.toLowerCase()}`);
}

function applyStatus(s) {
  const cfg = STATUS[s];
  statusBadge.className = `badge ${cfg.badge}`;
  statusBadge.textContent = s;
  statusBadge.setAttribute("aria-label", `Status: ${s}`);
  statusBtns.forEach((b) => {
    b.classList.remove("active-pending", "active-inprogress", "active-done");
    if (b.dataset.status === s) b.classList.add(cfg.btn);
  });

  card.classList.toggle("is-done", s === "Done");
  if (s === "Done")
    card.classList.remove("priority-low", "priority-medium", "priority-high");
  else applyPriority(state.priority);

  titleEl.classList.toggle("completed", s === "Done");

  checkbox.checked = s === "Done";

  updateTimeRemaining();
}

function applyCollapse() {
  const long = state.description.length > COLLAPSE_THRESHOLD;
  expandToggle.style.display = long ? "inline-flex" : "none";
  if (long) {
    collapsible.className = state.expanded ? "expanded" : "collapsed";
    expandToggle.setAttribute(
      "aria-expanded",
      state.expanded ? "true" : "false",
    );
    expandLabel.textContent = state.expanded ? "Show less" : "Show more";
    expandIcon.style.transform = state.expanded ? "rotate(180deg)" : "";
  } else {
    collapsible.className = "expanded";
  }
}

function formatDueDate(d) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

let timerInterval = null;

function updateTimeRemaining() {
  if (state.isDone || state.status === "Done") {
    timeRemainingEl.textContent = "Completed";
    timeRemainingEl.className = "done-time";
    overdueEl.classList.remove("visible");
    return;
  }

  const diffMs = state.dueDate - new Date();
  const absMs = Math.abs(diffMs);
  const mins = Math.floor(absMs / 60_000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  let text,
    cls,
    overdue = false;

  if (diffMs <= 0) {
    overdue = true;
    if (mins < 1) {
      text = "Due now!";
    } else if (mins < 60) {
      text = `Overdue by ${mins} minute${mins > 1 ? "s" : ""}`;
    } else if (hours < 24) {
      text = `Overdue by ${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      text = `Overdue by ${days} day${days > 1 ? "s" : ""}`;
    }
    cls = "overdue-time";
  } else {
    if (mins < 1) {
      text = "Due now!";
      cls = "overdue-time";
      overdue = true;
    } else if (mins < 60) {
      text = `Due in ${mins} minute${mins > 1 ? "s" : ""}`;
      cls = "";
    } else if (hours < 24) {
      text = `Due in ${hours} hour${hours > 1 ? "s" : ""}`;
      cls = "";
    } else if (days === 1) {
      text = "Due tomorrow";
      cls = "soon-time";
    } else {
      text = `Due in ${days} days`;
      cls = "soon-time";
    }
  }

  timeRemainingEl.textContent = text;
  timeRemainingEl.className = cls;
  overdueEl.classList.toggle("visible", overdue);
}

function startTimer() {
  clearInterval(timerInterval);
  updateTimeRemaining();
  timerInterval = setInterval(updateTimeRemaining, 30_000);
}

function handleCheckbox(cb) {
  const newStatus = cb.checked ? "Done" : "Pending";
  state.status = newStatus;
  state.isDone = cb.checked;
  applyStatus(newStatus);
}

function handleStatusBtn(btn) {
  const s = btn.dataset.status;
  state.status = s;
  state.isDone = s === "Done";
  applyStatus(s);
}

function handleExpand(btn) {
  state.expanded = !state.expanded;
  applyCollapse();
}

function openEditMode() {
  document.getElementById("edit-title").value = state.title;
  document.getElementById("edit-description").value = state.description;
  document.getElementById("edit-priority").value = state.priority;

  const pad = (n) => String(n).padStart(2, "0");
  const d = state.dueDate;
  const local = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  document.getElementById("edit-due-date").value = local;

  viewSection.classList.add("hidden");
  editForm.classList.add("active");

  document.getElementById("edit-title").focus();
}

function saveEdit(e) {
  e.preventDefault();
  const newTitle = document.getElementById("edit-title").value.trim();
  const newDesc = document.getElementById("edit-description").value.trim();
  const newPriority = document.getElementById("edit-priority").value;
  const newDueRaw = document.getElementById("edit-due-date").value;

  if (!newTitle) {
    document.getElementById("edit-title").focus();
    return;
  }

  state.title = newTitle;
  state.description = newDesc || state.description;
  state.priority = newPriority;
  if (newDueRaw) {
    state.dueDate = new Date(newDueRaw);
    dueDateEl.textContent = "";
    const label = document.createElement("span");
    label.className = "due-label";
    label.textContent = "Due";
    dueDateEl.appendChild(label);
    dueDateEl.appendChild(
      document.createTextNode(" " + formatDueDate(state.dueDate)),
    );
    dueDateEl.setAttribute("datetime", state.dueDate.toISOString());
  }

  titleEl.textContent = state.title;
  descEl.textContent = state.description;
  applyPriority(state.priority);
  applyCollapse();
  startTimer();

  closeEditMode();
}

function cancelEdit() {
  closeEditMode();
}

function closeEditMode() {
  editForm.classList.remove("active");
  viewSection.classList.remove("hidden");
  editBtn.focus();
}

applyPriority(state.priority);
applyStatus(state.status);
applyCollapse();
startTimer();
