export default function Button(text, onclick, overColor = '#333') {
    const input = document.createElement('input');
    input.type = 'button';
    input.value = text;

    input.style.background = 'none';
    input.style.border = 'none';
    input.style.color = '#888';
    input.style.fontSize = '15px';
    input.style.width = '60px';
    input.style.margin = '10px 0 0';

    input.onmouseover = () => input.style.color = overColor;
    input.onmouseleave = () => input.style.color = '#888';
    input.onclick = onclick;
    
    return input;
}