function getJSON(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () { callback(this.responseText) };
    xhr.open("GET", url, true);
    xhr.send();
}

export function getContenuUtile(url, callback) {
    getJSON(url, data => callback(JSON.parse(data)));
}
