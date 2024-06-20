// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const tasks = [];

function openModal() {
    $('#exampleModal').modal('show');
}

$(document).ready(function() {
    $('#exampleModalTrigger').on('click', function() {
        openModal();
    });
});

// Todo: create a function to generate a unique task id
function generateTaskId() {
    Math.floor(Math.random() * 100);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const $taskCard = $('<div class="task-card">' +
    '<div class="task-content">' + task.description + '</div>' +
    '<button class="delete-task">Delete</button>' +
    '</div>');
    $taskCard.data('taskId', task.id);

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const $taskList = $('#modal-body');

    $('formModal').empty();

    tasks.forEach(function(task) {
        var $taskCard = createTaskCard(task);
        $taskList.append($taskCard);
    });

    $taskList.sortable();
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const $taskInput = $('#task-input'); 
    const taskDescription = $taskInput.val();
    if (taskDescription) {
        var newTask = {
            id: Date.now(),    
            description: taskDescription
        }
    $taskInput.val('');
    renderTaskList(tasks);
}}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const $taskCard = $(event.target).closest('.task-card');
    const taskId = $taskCard.data('taskId');
    $taskCard.remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const $droppable = $(this);
    const $draggable = ui.draggable; 
    $draggable.appendTo($droppable);
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    const tasks = [];
    renderTaskList(tasks);

    $('#add-task-form').on('submit', handleAddTask);
    $('#task-list').on('click', '.delete-task', handleDeleteTask);

    $('.status-lane').droppable({
        drop: handleDrop
    });

    $('#Task Due Date').datepicker();
});
