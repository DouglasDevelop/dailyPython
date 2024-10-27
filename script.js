const tasks = {
  beginner: [
    {
      question: "What does the following code return:\n\n```python\nlen('Hello')\n```",
      options: ["3", "4", "5"],
      answer: 2
    },
    // Other tasks here...
  ],
  intermediate: [
    {
      question: "What does `def foo(): pass` do?",
      options: ["Defines a function", "Executes a function", "Shows an error"],
      answer: 0
    },
    // Other tasks here...
  ],
  advanced: [
    {
      question: "Which data structure is `set([1, 2, 3])`?",
      options: ["List", "Dictionary", "Set"],
      answer: 2
    },
    // Other tasks here...
  ]
};

let points = parseInt(localStorage.getItem("points")) || 0;
document.getElementById("points").textContent = points;
let currentTask = null;

// Check saved theme
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "light") {
    document.body.classList.remove("dark-mode");
    document.getElementById("themeToggle").checked = false;
  } else {
    document.body.classList.add("dark-mode");
    document.getElementById("themeToggle").checked = true;
  }
});

function toggleTheme() {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  const theme = isDarkMode ? "dark" : "light";
  localStorage.setItem("theme", theme);
}


function selectTask(level) {
  currentTask = getDailyTask(level);
  displayTaskModal(level, currentTask);
}

function getDailyTask(level) {
  const taskIndex = new Date().getDate() % tasks[level].length;
  return tasks[level][taskIndex];
}

function displayTaskModal(level, task) {
  const modal = document.getElementById("taskModal");
  document.getElementById("modalTaskTitle").textContent = `${capitalizeFirst(level)} Task`;
  document.getElementById("modalTaskDescription").textContent = task.question;
  document.getElementById("option0").textContent = task.options[0];
  document.getElementById("option1").textContent = task.options[1];
  document.getElementById("option2").textContent = task.options[2];
  modal.style.display = "block";
}

function checkAnswer() {
  const answerForm = document.getElementById("answerForm");
  const selectedOption = answerForm.answer.value;
  if (selectedOption === "") {
    showToast("Please select an answer.");
    return;
  }

  if (parseInt(selectedOption) === currentTask.answer) {
    points++;
    localStorage.setItem("points", points);
    document.getElementById("points").textContent = points;
    showToast("Correct! You've earned a point.", true);
  } else {
    showToast("Incorrect! Try again tomorrow.");
  }
  closeModal();
}

function closeModal() {
  document.getElementById("taskModal").style.display = "none";
}

function showToast(message, success = false) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.backgroundColor = success ? "#4CAF50" : "#f44336";
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
