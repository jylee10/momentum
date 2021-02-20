const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".js-toDoPendList"),
  finishedList = document.querySelector(".js-toDoFinishList");

  const PENDTASKS_LS = "PENDING";
  const FINTASKS_LS = "FINISHED";

  let pendTasks = [];
  let finTasks = [];
  let taskId = 1;

  function backToPendTask(event) {
    event.preventDefault();
    const btn = event.target;
    const li = btn.parentNode;
    const pendTask = li.firstChild.innerText;
    finishedList.removeChild(li);
  
    const cleanFinTask = finTasks.filter(function (task) {
      return task.id !== parseInt(li.id);
    });
    finTasks = cleanFinTask;
    paintPendTasks(pendTask);
  }
  
  function paintFinTasks(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", delFinTask);
  
    const backBtn = document.createElement("button");
    backBtn.innerText = "⏪";
    backBtn.addEventListener("click", backToPendTask);
  
    const span = document.createElement("span");
    const finId = taskId;
    
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(backBtn);
    li.id = finId;
    finishedList.appendChild(li);
    taskId += 1;
  
    const tasks = {
      id: finId,
      text: text
    };
    finTasks.push(tasks);
    saveTasks();
  }

  function moveToFinTask(event) {
    event.preventDefault();
    const btn = event.target;
    const li = btn.parentNode;
    const finTask = li.firstChild.innerText;
    pendingList.removeChild(li);
  
    const cleanPendTask = pendTasks.filter(function (task) {
      return task.id !== parseInt(li.id);
    });
    pendTasks = cleanPendTask;
    paintFinTasks(finTask);
  }

  function delFinTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
  
    const cleanTasks = finTasks.filter(function (task) {
      return task.id !== parseInt(li.id);
    });
    finTasks = cleanTasks;
    saveTasks();
  }
  
  function delPendTask(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingList.removeChild(li);
  
    const cleanTasks = pendTasks.filter(function (task) {
      return task.id !== parseInt(li.id);
    });
    pendTasks = cleanTasks;
    saveTasks();
  }

  function saveTasks() {
    localStorage.setItem(PENDTASKS_LS, JSON.stringify(pendTasks));
    localStorage.setItem(FINTASKS_LS, JSON.stringify(finTasks));
  }

  function paintPendTasks(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", delPendTask);

    const checkBtn = document.createElement("button");
    checkBtn.innerText = "✅";
    checkBtn.addEventListener("click", moveToFinTask);

    const span = document.createElement("span");
    const pendId = taskId;

    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = pendId;
    pendingList.appendChild(li);
    taskId += 1;

    const tasks = {
      id: pendId,
      text: text
    };
    pendTasks.push(tasks);
    saveTasks();
  }

  function submitHandler(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintPendTasks(currentValue);
    toDoInput.value = "";
  }

  function loadToDos() {
    const loadedPendTasks = localStorage.getItem(PENDTASKS_LS);
    const loadedFinTasks = localStorage.getItem(FINTASKS_LS);

    if (loadedPendTasks !== null || loadedFinTasks !== null) {
      const parsedPendTasks = JSON.parse(loadedPendTasks);
      const parsedFinTasks = JSON.parse(loadedFinTasks);
      parsedPendTasks.forEach(function (task) {
        paintPendTasks(task.text);
      });
      parsedFinTasks.forEach(function (task) {
        paintFinTasks(task.text);
      });
    }
  }

  function init() {
    loadToDos();
    toDoForm.addEventListener("submit", submitHandler);
  }

  init();