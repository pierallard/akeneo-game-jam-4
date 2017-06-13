function getJSON(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () { callback((<XMLHttpRequest> this).responseText) };
    xhr.open('GET', url, true);
    xhr.send();
}

export function getContent(url, callback) {
    getJSON(url, data => callback(JSON.parse(data)));
}
