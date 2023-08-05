'use strict'

let addMessage = document.querySelector('.window__input'),
    addButton = document.querySelector('.window__submit'),
    todo = document.querySelector('.todo'),
    counter = document.querySelector('.window__counter');

    
let todoList = [];
let decor = JSON.parse(localStorage.getItem('textDecoration'));
let noneDecor = JSON.parse(localStorage.getItem('textDecorationNone'));


//Если что есть в localStorage по ключу todo то мы это записываем в массив todoList
if (localStorage.getItem('todo')) {  
    todoList = JSON.parse(localStorage.getItem('todo'));
    diplayMessage();
}


localStorage.setItem('textDecoration', JSON.stringify('line-through #FFD700'))
localStorage.setItem('textDecorationNone', JSON.stringify('none'))


//Функция подсчета задач
function counterTask () {
    counter.innerHTML = todoList.length;
};


//Добавление элементов массив с обьектами
addButton.addEventListener('click', (e) => {
    //При каждом клике на кнопку создаем обьект со значением инпута и записываем его в массив
    e.preventDefault();
    let newTodo = {
        todo: addMessage.value,             
        checked: false,
        important: false,
        //Задаем id через текущее время в милисекундах
        id: Date.now()
    };

    todoList.push(newTodo);

    todoList.reverse();

    localStorage.setItem('todo', JSON.stringify(todoList));

    diplayMessage();

    counterTask();
})


//Добавление записей в на страницу
function diplayMessage () {
    //Создаем пустую строку
    let displayMessage = "";
    //Перебирая todoList создаем верстку в каждый элемент и внутрь верстки передаем значения из todoLista
    todoList.forEach(function(item, i) {
        // Используя тернарный оператор проверяем состояние чекбокса если True то ставим класс активности checked если нет то пустую строку
        displayMessage += `
            <li id="${item.id}" style="list-style-type: none; margin-top: 30px;">
                <input class="checkbox" type="checkbox" id="item_${i}" ${item.checked ? 'checked' : ''}>
                <label class="lab" ${item.checked ? `style="text-decoration: line-through #FFD700;"` : 'style="text-decoration: none;"'} for="item_${i}">${item.todo}</label>
                <button class="close" id="item_${i}">X</button>
                <hr class="line"></hr>
            </li>
        `;
        todo.innerHTML = displayMessage;
    });
    //Очищаем инпут
    addMessage.value = '';
    //Ставим фокус снова инпут
    addMessage.focus();
};


//Сохранение записей в localStorage
todo.addEventListener('change', function(event) {
    // Получаем id обьекта на которм кликаем
    let idInput = event.target.getAttribute('id'); 
    //Получаем значение label по id
    let valueLabel = todo.querySelector(`[for=${idInput}]`).textContent;    
    todoList.forEach(item => {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;                               
            localStorage.setItem('todo', JSON.stringify(todoList));
            // Отмечаем выполненый задачи
            todo.addEventListener('change', (e) => {
                if (e.target.checked){
                    e.target.nextElementSibling.style.textDecoration = JSON.parse(localStorage.getItem('textDecoration'));
                } else {
                    e.target.nextElementSibling.style.textDecoration = JSON.parse(localStorage.getItem('textDecorationNone'));
                }
            })
        }
    })
})


//Удаление записи
function deleteTask () {
    todo.addEventListener('click', (e) => {
        const parentNode = e.target.closest('li'); 
        //Если значении класса есть close то удаляем заметку
        if (e.target.classList.value === 'close') {  
            //По кнопке ищем родителя li и удаляем его 
            parentNode.remove();
            //Чтобы удалить элемент из localStorage надо удалить его из массива а потом перезаписать в localStorage
            todoList.forEach((item, i) => {  
                //Перебираем массив с задачами и проверяем есть ли элемент на котором сработала кнопка 
                //Переведем parentNode в числовой тип данных                             
                if (item.id === Number(parentNode.id)){         
                    todoList.splice(i, 1);
                }   
                localStorage.setItem('todo', JSON.stringify(todoList));
            })
        }
        counterTask();
    })
}

deleteTask();
counterTask();







