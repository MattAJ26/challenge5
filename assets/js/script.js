// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    return $('<div class="card"></div>')
        .attr('data-id', task.id)
        .append('<h3>' + task.name + '</h3>')
        .append('<p>' + task.description + '</p>')
        .append('<p>Due: ' + task.dueDate + '</p>')
        .append('<button class="deleteTask btn btn-danger btn-sm">Delete</button>')
        .draggable();
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $('#todo-cards, #in-progress-cards, #done-cards').empty();

    if (!taskList) {
        console.error("taskList is null or undefined.");
        return;
    }

    for (var i = 0; i < taskList.length; i++) {
        var task = taskList[i];
        var taskCard = createTaskCard(task);
        $('#' + task.status + '-cards').append(taskCard);
    }

    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", JSON.stringify(nextId));
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const taskNameInput = $('#Task\\ Title'); 
    const taskDescriptionInput = $('#Task\\ Description');
    const dueDateInput = $('#Task\\ Due\\ Date');
    const taskName = taskNameInput.val();
    const taskDescription = taskDescriptionInput.val();
    const dueDate = dueDateInput.val();
    if (taskName) {
        const newTask = {   
            id: generateTaskId(),    
            name: taskName,
            description: taskDescription,
            dueDate: dueDate,
            status: 'todo'
        };
        taskList.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        taskNameInput.val('');
        taskDescriptionInput.val('');
        dueDateInput.val('');
        renderTaskList();
        $('#formModal').modal('hide');
    }
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $('#formModal').on('show.bs.modal', function () {
        $('#Task\\ Title').val('');
        $('#Task\\ Description').val('');
        $('#Task\\ Due\\ Date').val('');
    });

    $('#submitTask').click(handleAddTask);

    $(document).on('click', '.deleteTask', handleDeleteTask);

    $('.lane').droppable({
        accept: '.card',
        drop: handleDrop
    });

    $('#Task\\ Due\\ Date').datepicker();

    $('#formModal').modal('hide');
});
