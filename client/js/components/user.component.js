const User = (obj) => {
    const container = document.createElement('div');
    const p = document.createElement('div');
    const colorDiv = document.createElement('div');

    const color = obj.color;
    container.setAttribute('class', 'user');
    p.setAttribute('class', 'paragraph');
    colorDiv.setAttribute('class', 'colorBox');

    p.innerHTML = obj.name;
    colorDiv.style.background = color;

    container.appendChild(p);
    container.appendChild(colorDiv);

    return container;
}

export { User };