document.addEventListener('DOMContentLoaded', () => {
    const addTodoButton = document.getElementById('add-todo');
    const newTodoInput = document.getElementById('new-todo');
    const todoList = document.getElementById('todo-list');

    addTodoButton.addEventListener('click', () => {
        const todoText = newTodoInput.value.trim();
        if (todoText) {
            const listItem = document.createElement('li');
            listItem.textContent = todoText;
            listItem.addEventListener('click', () => {
                listItem.classList.toggle('completed');
            });
            todoList.appendChild(listItem);
            newTodoInput.value = '';
        }
    });
});
