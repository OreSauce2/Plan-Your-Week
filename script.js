function addTask(day) {
    const inputBox = document.getElementById(`${day}-input`);
    const taskList = document.getElementById(day);
    
    const taskText = inputBox.value.trim();
    
    if (taskText === '') {
        alert("Please enter a task");
        return;
    }
    
    const li = document.createElement("li");
    li.innerHTML = `${taskText} <button class="delete-button" onclick="deleteTask(this)">Delete</button>`;
    
    taskList.appendChild(li);
    inputBox.value = '';
    
    saveData();
}

function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
    
    saveData();
}

function saveData() {
    const days = document.querySelectorAll(".task-list");
    const tasks = {};

    days.forEach((day) => {
        const dayName = day.id;
        tasks[dayName] = [];

        day.querySelectorAll("li").forEach((task) => {
            tasks[dayName].push(task.textContent);
        });
    });

    localStorage.setItem("weeklyTasks", JSON.stringify(tasks));
}

function showTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("weeklyTasks"));

    if (savedTasks) {
        for (const day in savedTasks) {
            const taskList = document.getElementById(day);
            savedTasks[day].forEach((taskText) => {
                const li = document.createElement("li");
                li.innerHTML = `${taskText} <button class="delete-button" onclick="deleteTask(this)">Delete</button>`;
                taskList.appendChild(li);
            });
        }
    }
}

showTasks();
