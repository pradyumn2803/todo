document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.querySelector('.enter-todo input');
    const sendButton = document.querySelector('.enter-todo button.send');
    const todosContainer = document.querySelector('.todos-entry');
    const clearButton = document.querySelector('.heading-todo button.clear');
  
    sendButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        addTodo();
      }
    });
  
    todosContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-icon')) {
        const todoElement = event.target.closest('.mytodos');
        removeTodoFromLocalStorage(todoElement);
        todoElement.remove();
      }
    });
  
    clearButton.addEventListener('click', function() {
      todosContainer.innerHTML = '';
      clearLocalStorage();
    });
  
    function addTodo() {
      const todoText = todoInput.value;
      if (todoText.trim() !== '') {
        const addedDate = new Date().toLocaleString();
        saveTodoToLocalStorage(todoText, addedDate);
        const todoElement = createTodoElement(todoText, addedDate);
        todosContainer.appendChild(todoElement);
        todoInput.value = '';
      }
    }
  
    function saveTodoToLocalStorage(todoText, addedDate) {
      let todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.push({ text: todoText, date: addedDate });
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    function removeTodoFromLocalStorage(todoElement) {
      const todoIndex = todoElement.dataset.index;
      let todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.splice(todoIndex, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    function clearLocalStorage() {
      localStorage.removeItem('todos');
    }
  
    function createTodoElement(todoText, addedDate) {
      const todoWrapper = document.createElement('div');
      todoWrapper.className = 'mytodos';
  
      const todoTextElement = document.createElement('div');
      todoTextElement.className = 'text';
  
      const todoContent = document.createElement('p');
      todoContent.textContent = todoText;
  
      const todoAuthor = document.createElement('p');
      todoAuthor.textContent = 'author: Pradyumn';
  
      const todoAdded = document.createElement('p');
      todoAdded.textContent = `Added on ${addedDate}`;
  
      todoTextElement.appendChild(todoContent);
      todoTextElement.appendChild(todoAuthor);
      todoTextElement.appendChild(todoAdded);
  
      const deleteElement = document.createElement('div');
      deleteElement.className = 'delete';
  
      const deleteIcon = document.createElement('img');
      deleteIcon.className = 'delete-icon';
      deleteIcon.src = 'delete.png';
      deleteIcon.alt = '';
  
      deleteElement.appendChild(deleteIcon);
  
      todoWrapper.appendChild(todoTextElement);
      todoWrapper.appendChild(deleteElement);
  
      return todoWrapper;
    }
  
    // Render existing todos from localStorage on page load
    function renderTodosFromLocalStorage() {
      let todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.forEach(function(todo, index) {
        const { text, date } = todo;
        const todoElement = createTodoElement(text, date);
        todoElement.dataset.index = index;
        todosContainer.appendChild(todoElement);
      });
    }
  
    renderTodosFromLocalStorage();
  });
  