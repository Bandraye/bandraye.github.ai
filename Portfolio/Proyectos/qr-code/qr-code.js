let form = document.getElementById("form");
let inputURL = document.getElementById("url");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputURL.value === "") {
    return;
  }
  document.getElementById("test").innerHTML = "";
  
  let options = {
    text: inputURL.value,
    width: 256,
    height: 256,
    colorDark: "#031a36",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  };

  let qrcode = new QRCode("test", options);
});
