let colorInput;
let toDoLists;
let divRow;
let divCol;
let itemName;
let downBtn;
let upBtn;
let deleteBtn;
let elements=[];


if (localStorage.length > 0) {
   elements= localStorage.getItem('toDoList').split(',');
   let eventElements =[];
   if(elements.indexOf('')){
    elements.splice(elements.indexOf(''),1);
   }
   for (let i=0 ;i<elements.length;i++) {
        let element = elements[i].split('|');
    colorInput = document.createElement('input');
    itemName = document.createElement('p');
    colorInput.setAttribute('type', 'color');
    colorInput.value = element[1];
    itemName.innerHTML = element[0];
createElements();

    eventElements.push(divCol);
    
}
    
    localStorageElementActions(eventElements);
} 
$('input[type="text"]').keypress(function (event) {

    if (event.keyCode == '13') {
        event.preventDefault();
        checkInputValidation();
    }

});
$('#add-btn').on('click', function () {
    if ($('form')[0].checkValidity()) {
        checkInputValidation();
    }
});

function checkInputValidation(){
    let check =true;

    let regex = /^[A-Za-z0-9 ]+$/;
    let regexSingleNum=/^\d+$/;

    if(regex.test($('input[type="text"]').val())&& !regexSingleNum.test($('input[type="text"]').val())){
let paragExist = $('#list-item div div p').length == 0 ? false : true;
if (paragExist > 0 ) {
    //////////////////////wa2ef hna
    
    $('#list-item div div p').each(function (index,element) {
        if($(this).text() == $('input[type="text"]').val().trim()){
            alert('This Name Is Already Exist');
            check = false;
            
        } 
    });
    if(check == true){
        createdElementActions(createRow());
    }

}
 else {
    
    createdElementActions(createRow());
}
}
else{
alert('The Name Shouldn\'t Has Spacial Charachter or Numbers Only!!!');
}
}


function createRow() {
    colorInput = document.createElement('input');
    itemName = document.createElement('p');
    colorInput.setAttribute('type', 'color');
    colorInput.value = '#8196a9';
    itemName.innerHTML = $('#itemName').val().trim();

        createElements();
            if(localStorage.length==0){
                localStorage.setItem('toDoList',"");
            }
    localStorage.setItem('toDoList',`${localStorage.getItem('toDoList')}${itemName.innerHTML}|${colorInput.value},`);
    return divCol; 
}


function createElements(){
    divRow = document.createElement('div');
    divCol = document.createElement('div');
    itemName.classList.add('text-white');
    itemName.classList.add('d-inline-block');
    downBtn = document.createElement('input');
    upBtn = document.createElement('input');
    deleteBtn = document.createElement('input');
    downBtn.setAttribute('type', 'button');
    upBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('type','button');
    deleteBtn.classList.add('btn');
    deleteBtn.classList.add('ml-1');
    deleteBtn.classList.add('btn-primary');
    deleteBtn.classList.add('float-right');
    deleteBtn.classList.add('mb-4');
    deleteBtn.classList.add('mt-4');
    deleteBtn.classList.add('buttonP');
    itemName.classList.add('float-left');
    itemName.classList.add('paragra');
    itemName.classList.add('colorIn');
    colorInput.classList.add('float-left');
    upBtn.classList.add('btn');
    upBtn.classList.add('buttonP');
    upBtn.classList.add('ml-1');
    upBtn.classList.add('float-right');
    upBtn.classList.add('btn-primary');
    upBtn.classList.add('mb-4');
    upBtn.classList.add('mt-4');
    downBtn.classList.add('btn');
    downBtn.classList.add('buttonP');
    downBtn.classList.add('btn-primary');
    downBtn.classList.add('float-right');
    downBtn.classList.add('mt-4');
    downBtn.classList.add('mb-4');
    divCol.classList.add('py-3');
    colorInput.classList.add('colorIn');
    colorInput.classList.add('ml-3');
    divRow.classList.add('my-3');
    downBtn.value = 'down';
    upBtn.value = 'up';
    deleteBtn.value = 'delete';
    divRow.classList.add('row');
    divCol.classList.add('col-12');
    divRow.appendChild(divCol);
    divCol.appendChild(itemName);
    divCol.appendChild(colorInput);
    divCol.appendChild(downBtn);
    divCol.appendChild(upBtn);
    divCol.appendChild(deleteBtn);
    divCol.style.backgroundColor = colorInput.value;
    document.querySelector('#list-item').appendChild(divRow);
}

function localStorageElementActions(parents) {
    for (let i = 0; i < parents.length; i++) {
        createdElementActions(parents[i]);
      }     
}

function createdElementActions(parent){
        let colorElement =  parent.querySelector('input[type="color"]');
             let oldColorValue = colorElement.value;
             colorElement.addEventListener('input',function(){
                 elements = localStorage.getItem('toDoList').split(',');
                 elements.splice(elements.indexOf(''),1);
                 for (let i = 0; i < elements.length; i++) {
                     if(elements[i].includes(this.previousSibling.innerHTML)){
                         elements[i].indexOf(oldColorValue);
                        elements[i]= elements[i].replace(oldColorValue,this.value);
                        this.parentElement.style.backgroundColor = this.value;
                         let toDoListInLocal = elements.join(',');
                         localStorage.setItem('toDoList',`${toDoListInLocal},`);
                         oldColorValue=this.value;
                     }   
                 }
             });
             let buttons = parent.querySelectorAll('input[type="button"]');
             buttons.forEach(function(button){
                 button.addEventListener('click',function(){
                    if(button.value == 'up'){
                        let grandParent = parent.parentElement;
                        if (grandParent.previousElementSibling) {
                         grandParent.parentElement.insertBefore(grandParent, grandParent.previousElementSibling);
                     }
                     }else if (button.value == 'down'){
                        let grandParent = parent.parentElement;
                        if (grandParent.nextElementSibling) {
                     grandParent.parentElement.insertBefore(grandParent.nextElementSibling, grandParent);
                           }
                     }else if(button.value == 'delete'){
                        let text = parent.querySelector('p').innerHTML;
                        let color = parent.querySelector('input[type="color"]').value;
                          let toDO =localStorage.getItem('toDoList') ;
                             toDO = toDO.slice(0,toDO.length-1);
                             if(toDO.length == (text.length+color.length+1)){
                                localStorage.removeItem('toDoList');
                             }else{
                                 if(localStorage.getItem('toDoList').indexOf(text) == (localStorage.getItem('toDoList').length - (color.length + text.length+2))){
                                    toDO=  toDO.replace(`${text}|${color}`,'');
                                    localStorage.setItem('toDoList',`${toDO}`);
                                 }else {
                                    toDO=  toDO.replace(`${text}|${color},`,'');
                                    localStorage.setItem('toDoList',`${toDO},`);
                                 }
                             }
                             parent.parentElement.remove();
                     }})})}