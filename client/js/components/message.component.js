const Message = (msg) => {
    let datetime = 
        "from " + 
        new Date().toLocaleDateString() +
        " at " +
        new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"})
    ;

    const container = document.createElement('article');
    const p = document.createElement('p');
    const time = document.createElement('time');

    p.innerHTML = msg;
    time.innerHTML = datetime;

    container.appendChild(p);
    container.appendChild(time);

    return container;
}

export { Message };