import Checkbox from '../Atoms/CheckBox.js';
import Button from '../Atoms/Button.js';
import TextField from '../Atoms/TextField.js';

export default function Task(isCreated = false, name = '') {
    function onCheckboxClick(isChecked) {
        if(isChecked) {
            textField.style.textDecorationLine = 'line-through';
            textField.style.color = '#888';
            document.getElementById('complete').appendChild(div);
        }
        else{
            textField.style.textDecorationLine = 'none';
            textField.style.color = '#333';
            document.getElementById('todo').appendChild(div);
        } 
    }
    function onDeleteButtonClick() {
        console.log('delete');
        div.remove();
    }
    
    function onAddButtonClick() {
        document.getElementById('todo').appendChild(Task(true, textField.value));
        textField.value = '';
    }

    function onEditButtonClick() {
        if(isLabel) textField.becomeTextField();
        else textField.becomeText();
        isLabel = !isLabel;
    }
    let isLabel = true;
    const div = document.createElement('div');
    const textField = isCreated ? TextField(name, '226px') : TextField();
    
    if(isCreated){
        textField.becomeText();
        const checkbox = Checkbox(onCheckboxClick);
        const editButton = Button('Edit', onEditButtonClick);
        const deleteButton = Button('Delete', onDeleteButtonClick, '#CF2323');
        div.appendChild(checkbox);
        div.appendChild(textField);
        div.appendChild(editButton);
        div.appendChild(deleteButton);
        div.style.borderBottom = '1px solid #eee';
    }
    else {
        const addButton = Button('Add', onAddButtonClick);
        div.appendChild(textField);
        div.appendChild(addButton);

    }
    
    div.style.height = '41px';
    div.style.width = '400px';
    div.style.padding = '20px 0';

    return div;
}