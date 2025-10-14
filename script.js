const fusos = [
  { nome: "UTC -12", offset: -12 },
  { nome: "UTC -11", offset: -11 },
  { nome: "UTC -10", offset: -10 },
  { nome: "UTC -9", offset: -9 },
  { nome: "UTC -8", offset: -8 },
  { nome: "UTC -7", offset: -7 },
  { nome: "UTC -6", offset: -6 },
  { nome: "UTC -5", offset: -5 },
  { nome: "UTC -4", offset: -4 },
  { nome: "UTC -3 (Brasil)", offset: -3 },
  { nome: "UTC -2", offset: -2 },
  { nome: "UTC -1", offset: -1 },
  { nome: "UTC 0 (Londres)", offset: 0 },
  { nome: "UTC +1", offset: 1 },
  { nome: "UTC +2", offset: 2 },
  { nome: "UTC +3", offset: 3 },
  { nome: "UTC +4", offset: 4 },
  { nome: "UTC +5", offset: 5 },
  { nome: "UTC +6", offset: 6 },
  { nome: "UTC +7", offset: 7 },
  { nome: "UTC +8", offset: 8 },
  { nome: "UTC +9", offset: 9 },
  { nome: "UTC +10", offset: 10 },
  { nome: "UTC +11", offset: 11 },
  { nome: "UTC +12", offset: 12 }
];

const fusoDe = document.getElementById("fusoDe");
const fusoPara = document.getElementById("fusoPara");
const btnConverter = document.getElementById("btnConverter");
const btnLimpar = document.getElementById("btnLimpar");
const resultado = document.getElementById("resultado");
const historico = document.getElementById("historico");

fusos.forEach(fuso => {
  const opt1 = new Option(fuso.nome, fuso.offset);
  const opt2 = new Option(fuso.nome, fuso.offset);
  fusoDe.appendChild(opt1);
  fusoPara.appendChild(opt2);
});

btnConverter.addEventListener("click", () => {
  const horaInput = document.getElementById("hora").value;
  const offsetDe = parseFloat(fusoDe.value);
  const offsetPara = parseFloat(fusoPara.value);

  if (!horaInput) {
    alert("Por favor, insira um horário.");
    return;
  }

  let [hora, minuto] = horaInput.split(":").map(Number);
  let totalMinutos = hora * 60 + minuto;
  let diferenca = (offsetPara - offsetDe) * 60;

  totalMinutos += diferenca;

  if (totalMinutos < 0) totalMinutos += 24 * 60;
  if (totalMinutos >= 24 * 60) totalMinutos -= 24 * 60;

  const horaConvertida = String(Math.floor(totalMinutos / 60)).padStart(2, "0");
  const minutoConvertido = String(totalMinutos % 60).padStart(2, "0");

  const resultadoTexto = `${horaInput} (${fusoDe.selectedOptions[0].text}) = ${horaConvertida}:${minutoConvertido} (${fusoPara.selectedOptions[0].text})`;

  resultado.textContent = resultadoTexto;

  const li = document.createElement("li");
  li.textContent = resultadoTexto;
  historico.prepend(li);
});

btnLimpar.addEventListener("click", () => {
  historico.innerHTML = "";
  resultado.textContent = "";
});
