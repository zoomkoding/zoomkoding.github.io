import H3 from '../Atoms/H3.js';

export default function Title(title) {
    const div = document.createElement('div');
    div.style.width = '400px';
    div.style.color = '#333333';
    div.style.fontSize = '15px';
    div.style.fontStyle = 'bold';
    div.style.borderBottom = 'solid';
    const h3 = H3(title);
    div.appendChild(h3);
    return div;
}