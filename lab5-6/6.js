function tabulateToHTML(func, start, end, step, functionName = "f(x)") {
    let html = `
        <table border="1">
        <tr><th>x</th><th>${functionName}</th></tr>
    `;
    
    for (let x = start; x <= end; x += step) {
        const y = func(x);
        html += `<tr><td>${x.toFixed(2)}</td><td>${y.toFixed(4)}</td></tr>`;
    }
    
    html += "</table>";
    return html;
}

const tableHTML = tabulateToHTML(
    x => Math.sin(x) + Math.cos(x), 
    0, 
    2 * Math.PI, 
    Math.PI/6,
    "sin(x) + cos(x)"
);

document.body.innerHTML = tableHTML;