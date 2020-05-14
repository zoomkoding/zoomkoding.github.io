export default function TextField(value = '', width = '318px') {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    input.style.width = width;
    input.style.height = '18px';
    input.style.padding = '10px';
    input.style.border = '1px solid #ddd';
    input.style.borderRadius = '6px';
    input.style.fontSize = '18px';
    input.style.color = '#888';
    input.onfocus = () => input.style.color = '#333';
    input.onblur = () => input.style.color = '#888';
    input.onchange = () => {
        console.log('hi');
    }
    input.becomeText = () => {
        console.log('become text');
        input.disabled = 'true';
        input.style.border = 'none';
        input.style.color = '#333';
    
    }
    input.becomeTextField = () => {
        input.disabled = 'false';
        input.style.border = '1px solid #ddd';
        input.style.color = '#888';
    }
    return input;
}