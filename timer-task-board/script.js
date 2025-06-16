const form = document.getElementById("task-form");
const taskLog = document.getElementById("task-log");
const cancelBtn = document.getElementById("cancel-all");

let intervalIds = []; // To store active interval IDs

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("task-name").value;
  const delay = parseInt(document.getElementById("task-delay").value);
  const repeat = document.getElementById("repeat").checked;

  // Function to log the task
  const logTask = () => {
    const time = new Date().toLocaleTimeString();
    const li = document.createElement("li");
    li.textContent = ` Task "${name}" executed at ${time}`;
    taskLog.appendChild(li);
  };

  if (repeat) {
    const id = setInterval(logTask, delay);
    intervalIds.push(id);
    cancelBtn.style.display = "inline-block";
  } else {
    setTimeout(logTask, delay);
  }

  form.reset();
});

// Handle cancel all repeating tasks
cancelBtn.addEventListener("click", () => {
  intervalIds.forEach(clearInterval);
  intervalIds = [];
  cancelBtn.style.display = "none";
});