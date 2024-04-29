const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

//Mostrar items almacenados
function displayItems(){
    let items =JSON.parse(localStorage.getItem('items'));

    if(items !== null) {
        items.forEach((item)=>{
            //añadir producto al DOM
            addItemDOM(item);
        })
    }
    checkUI();
}


//AÑADIR NUEVOS ELEMENTOS
//recoger le valor del campo input
function onAddItemSubmit(e){
    //evitar el valor de submit por defecto
    e.preventDefault();

    //almacenamos el valor del campo
    const newItem = itemInput.value;

    //impedir que almacene valores vacios
    if(newItem === ''){
        alert('Introduce un producto');
        return;
    }
    //añadir producto al DOM
    addItemDOM(newItem);
    //añadir producto a localStorage
    addItemToStorage(newItem);

    //comprobar el estado del tamaño de la lista
    checkUI();

   //reseteamos el campo input
   itemInput.value = '';
  
}

//Añadir items al DOM
function addItemDOM(newItem){
    //crear elemento li para agregar a la lista
   const li = document.createElement('li');
   li.appendChild(document.createTextNode(newItem));

   //creamos el botón y lo añadimos al <li>
   const button = createButton('remove-item btn-link text-red');
   li.appendChild(button);

    //añadir el elemento li nuevo al ul
   itemList.appendChild(li);
}

//leer la información que existe en localStorage(crear una función): (obtener el inventario)
function getItemsFromStorage(){
    let itemsFromStorage;

    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

//añadir item al localStorage
function addItemToStorage(item){
    let itemsFromStorage =getItemsFromStorage();
    //añado el item del formulario al array
    itemsFromStorage.push(item);
    //escribir en localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
//removeItemFromStorage(al que DoyXDeLosProductos);
function removeItemFromStorage(item){ 
    //llamar a la función para leer localStorage
    let itemsFromStorage = getItemsFromStorage();
    //"guardar" una copia filtrando el dato a eliminar
    itemsFromStorage = itemsFromStorage.filter((i)=> i!==item);
    //volver a escribir en locaStorage "el inventario" actualizado
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
    

//crea el botón para appendChild al elemento <li>
function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;

    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);

    return button;
}


//crea el icono para appendChild al elemento <button>
function createIcon(classes){

    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

//ELIMINAR ELEMENTOS DE LA LISTA
//elimina todos los elementos de la lista
function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    //eliminar el contenido de local Store
    localStorage.clear();

    //comprobar el estado del tamaño de la lista
    checkUI();
}

//elimina solo el elemento puslado
function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
       e.target.parentElement.parentElement.remove();
    }
    //eliminar de localStorage
    removeItemFromStorage(e.target.parentElement.parentElement.textContent);


    //comprobar el estado del tamaño de la lista
    checkUI();  
}

//función que evalua se existen elementos en la lista
//para determinar si muestra o no el campo de filtro y botón de limpiar

//función de filtrado de productos
function filterItems(e){
    //(e) = (evento)
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) =>{
        const itenName = item.firstChild.textContent.toLocaleLowerCase();
        if(itenName.indexOf(text)!=-1){
            item.style.display = 'flex';
        }else{item.style.display = 'none';
        }
    }
    );

}



function checkUI(){
    //obtener los <li> que hay en le DOM dentro del <ul id="item-List">

    const items = itemList.querySelectorAll("i");
    if(items.length === 0){
        clearButton.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearButton.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}


//listener de captura evento submit
itemForm.addEventListener('submit', onAddItemSubmit);
//listener de eliminar
clearButton.addEventListener('click', clearItems);
itemList.addEventListener('click', removeItem);
itemFilter.addEventListener('input', filterItems);

//carga la información de los items
document.addEventListener('DOMContentLoaded', displayItems);


//llamamos a la función
checkUI();