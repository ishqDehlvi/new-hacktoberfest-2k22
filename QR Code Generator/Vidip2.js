let btn = document.getElementsByClassName("btn")[0];
let code = document.getElementsByClassName("code")[0];
let search = document.getElementsByClassName("search")[0];
console.log(search);
btn.addEventListener("click", () => {
    code.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + search.value;
    if (search == NaN) {
        return;
    }
})