const Message = (obj, className) => {
    let datetime = 
        "from " + 
        new Date().toLocaleDateString() +
        " at " +
        new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"})
    ;

    const container = document.createElement('article');
    const p = document.createElement('p');
    const div = document.createElement('div');
    const time = document.createElement('time');

    container.classList.add(className);

    if (container.className === "toGroup") {
        p.innerHTML = obj.name;        
    }

    div.innerHTML = obj.msg;
    time.innerHTML = datetime;

    container.appendChild(p);
    container.appendChild(div);
    container.appendChild(time);

    container.style.setProperty('--clr-pseudo', obj.color);

    return container;
}

export { Message };