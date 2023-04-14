const numero1 = document.getElementById("numero1");
const numero2 = document.getElementById("numero2");
const operation = document.getElementById("operation");
const form = document.getElementById("form");
const operar = document.getElementById("operar");
const resultado = document.getElementById("resultado");
const limpiar = document.getElementById("limpiar");

function operarNumeros() {
  if (numero1.value === "" && numero2.value === "") {
    alert("los campos se enuentran");
    return;
  }
  let valor1 = Number(numero1.value);
  let valor2 = Number(numero2.value);
  let operationValue = operation.options[operation.selectedIndex].value;

  switch (operationValue) {
    case "multiplicar":
      resultado.textContent = valor1 * valor2;
      break;
    case "sumar":
      resultado.textContent = valor1 + valor2;
      break;
    case "restar":
      resultado.textContent = valor1 - valor2;
      break;
    case "dividir":
      if (valor2 !== 0) {
        resultado.textContent = valor1 / valor2;
      } else {
        alert("No se puede dividir por cero");
      }
      break;
  }
}

function limpiarForm() {
  
  numero1.value = "";
  numero2.value = "";
  resultado.textContent = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  operarNumeros();
});

limpiar.addEventListener("click", (e) => limpiarForm());
