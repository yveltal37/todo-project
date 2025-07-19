let taskList = document.getElementById("task-list");

window.onload = function () {
    const saved = localStorage.getItem("taskListHTML");
    if (saved) {
        taskList.innerHTML = saved;
        restoreEventListeners();
    }
};

function addTask() {
    const taskInput = document.getElementById("new-task"); 
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const listItem = document.createElement("li");

    //סימון משימה כהושלמה
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.onclick = function () {
        listItem.classList.toggle("completed");
    }
    
    //מחיקת משימה
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
        deleteButton.onclick = function () {
        const delConfirmed = confirm("Are you sure you want to delete this task?");
        if (delConfirmed) {
            taskList.removeChild(listItem);
            updateLocalStorage();
        }
    };

    //עריכת משימה
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.onclick = function () {
        const newText = prompt("Edit your task:", taskSpan.textContent);
        if (newText !== null && newText.trim() !== "") {
            taskSpan.textContent = newText;
            updateLocalStorage();
        }
    };

    //יצירת תיבת קלט למשימה משנית
    const subTaskInput = document.createElement("input");
    subTaskInput.placeholder = "Add Sub-Task...";
    subTaskInput.style.display = "none";
    subTaskInput.className = "subtask-input";

    //יצירת רשימת משימות משניות
    const subTaskList = document.createElement("ul");
    subTaskList.className = "subtask-list";

    //כפתור הוספת משימה משנית
    const addSubTaskButton = document.createElement("button");
    addSubTaskButton.textContent = "+";
    addSubTaskButton.className = "add-subtask-btn";
    addSubTaskButton.onclick = function () {
        if (subTaskInput.style.display === "none") {
            subTaskInput.style.display = "inline";
            subTaskInput.focus();
        }
        else {
            subTaskInput.style.display = "none";
            const subTaskText = subTaskInput.value.trim();
            if (subTaskText !== "") {
                //יצירת שורת משימה משנית חדשה
                const subTaskItem = document.createElement("li");

                //אותן שלוש פעולות של סימון כהושלמה, מחיקה ועריכה שיש למשימה רגילה
                const subTaskSpan = document.createElement("span");
                subTaskSpan.textContent = subTaskText;
                subTaskSpan.onclick = function(){
                    subTaskItem.classList.toggle("completed");
                };

                const editSubTaskBtn = document.createElement("button");
                editSubTaskBtn.textContent = "Edit";
                editSubTaskBtn.className = "edit-btn";
                editSubTaskBtn.onclick = function () {
                const newText = prompt("Edit subtask:", subTaskSpan.textContent);
                    if (newText !== null && newText.trim() !== "") {
                        subTaskSpan.textContent = newText;
                        updateLocalStorage();
                    }
                };
                
                const deleteSubTaskBtn = document.createElement("button");
                deleteSubTaskBtn.textContent = "Delete";
                deleteSubTaskBtn.className = "delete-btn";
                deleteSubTaskBtn.onclick = function () {
                    const confirmed = confirm("Delete this subtask?");
                    if (confirmed) {
                        subTaskList.removeChild(subTaskItem);
                        updateLocalStorage();
                    }
                };

                //הוספה של הטקסט והכפתורים למשימה המשנית
                subTaskItem.appendChild(subTaskSpan);
                subTaskItem.appendChild(editSubTaskBtn);
                subTaskItem.appendChild(deleteSubTaskBtn);

                //הוספת המשימה המשנית לרשימה המשנית
                subTaskList.appendChild(subTaskItem);
                subTaskInput.value = "";
                updateLocalStorage();
            }
        }
    };

    //שימת המשימות הוספה של טקסט, הכפתורים, תיבת הטקסט למשימות משניות ואת רשימת המשימות המשניות הריקה לשורה
    listItem.appendChild(taskSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(addSubTaskButton);
    listItem.appendChild(subTaskInput);
    listItem.appendChild(subTaskList);

    //local storage-הוספת השורה לרשמה, ניקה תיבת הטקסט, ועידכון ה
    taskList.appendChild(listItem);
    taskInput.value = "";
    updateLocalStorage(); 
}

function updateLocalStorage() {
    localStorage.setItem("taskListHTML", taskList.innerHTML);
}

function restoreEventListeners() {
    document.querySelectorAll("#task-list > li").forEach(listItem => {
        const taskSpan = listItem.querySelector("span");
        const editButton = listItem.querySelector(".edit-btn");
        const deleteButton = listItem.querySelector(".delete-btn");
        const addSubTaskButton = listItem.querySelector(".add-subtask-btn");
        const subTaskInput = listItem.querySelector(".subtask-input");
        const subTaskList = listItem.querySelector(".subtask-list");

        // סימון
        taskSpan.onclick = function () {
            listItem.classList.toggle("completed");
            updateLocalStorage();
        };

        // עריכה
        editButton.onclick = function () {
            const newText = prompt("Edit your task:", taskSpan.textContent);
            if (newText !== null && newText.trim() !== "") {
                taskSpan.textContent = newText;
                updateLocalStorage();
            }
        };

        // מחיקה
        deleteButton.onclick = function () {
            const confirmed = confirm("Are you sure you want to delete this task?");
            if (confirmed) {
                taskList.removeChild(listItem);
                updateLocalStorage();
            }
        };

        // לחיצה על כפתור + של תת משימה
        addSubTaskButton.onclick = function () {
            if (subTaskInput.style.display === "none") {
                subTaskInput.style.display = "inline";
                subTaskInput.focus();
            } else {
                subTaskInput.style.display = "none";
                const subTaskText = subTaskInput.value.trim();
                if (subTaskText !== "") {
                    const subTaskItem = document.createElement("li");

                    const subTaskSpan = document.createElement("span");
                    subTaskSpan.textContent = subTaskText;
                    subTaskSpan.onclick = function () {
                        subTaskItem.classList.toggle("completed");
                        updateLocalStorage();
                    };

                    const editSubTaskBtn = document.createElement("button");
                    editSubTaskBtn.textContent = "Edit";
                    editSubTaskBtn.className = "edit-btn";
                    editSubTaskBtn.onclick = function () {
                        const newText = prompt("Edit subtask:", subTaskSpan.textContent);
                        if (newText !== null && newText.trim() !== "") {
                            subTaskSpan.textContent = newText;
                            updateLocalStorage();
                        }
                    };

                    const deleteSubTaskBtn = document.createElement("button");
                    deleteSubTaskBtn.textContent = "Delete";
                    deleteSubTaskBtn.className = "delete-btn";
                    deleteSubTaskBtn.onclick = function () {
                        const confirmed = confirm("Delete this subtask?");
                        if (confirmed) {
                            subTaskList.removeChild(subTaskItem);
                            updateLocalStorage();
                        }
                    };

                    subTaskItem.appendChild(subTaskSpan);
                    subTaskItem.appendChild(editSubTaskBtn);
                    subTaskItem.appendChild(deleteSubTaskBtn);
                    subTaskList.appendChild(subTaskItem);

                    subTaskInput.value = "";
                    updateLocalStorage();
                }
            }
        };

        // מחייה של כפתורים בתוך תתי משימות שכבר קיימות
        subTaskList?.querySelectorAll("li").forEach(subItem => {
            const subSpan = subItem.querySelector("span");
            const subEdit = subItem.querySelector(".edit-btn");
            const subDelete = subItem.querySelector(".delete-btn");

            subSpan.onclick = () => {
                subItem.classList.toggle("completed");
                updateLocalStorage();
            };

            subEdit.onclick = () => {
                const newText = prompt("Edit subtask:", subSpan.textContent);
                if (newText !== null && newText.trim() !== "") {
                    subSpan.textContent = newText;
                    updateLocalStorage();
                }
            };

            subDelete.onclick = () => {
                const confirmed = confirm("Delete subtask?");
                if (confirmed) {
                    subItem.remove();
                    updateLocalStorage();
                }
            };
        });
    });
}
