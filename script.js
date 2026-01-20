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
  fusoDe.appendChild(new Option(fuso.nome, fuso.offset));
  fusoPara.appendChild(new Option(fuso.nome, fuso.offset));
});

function formatarDataBR(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

btnConverter.addEventListener("click", () => {
  const dataInput = document.getElementById("data").value;
  const horaInput = document.getElementById("hora").value;

  if (!dataInput || !horaInput) {
    alert("Por favor, selecione a data e o horário.");
    return;
  }

  const offsetDe = parseFloat(fusoDe.value);
  const offsetPara = parseFloat(fusoPara.value);

  let dataHora = new Date(`${dataInput}T${horaInput}:00`);
  const diferencaMs = (offsetPara - offsetDe) * 60 * 60 * 1000;
  dataHora.setTime(dataHora.getTime() + diferencaMs);

  const dataConvertidaISO = dataHora.toISOString().split("T")[0];

  const dataOrigemBR = formatarDataBR(dataInput);
  const dataConvertidaBR = formatarDataBR(dataConvertidaISO);

  const horaConvertida = String(dataHora.getHours()).padStart(2, "0");
  const minutoConvertido = String(dataHora.getMinutes()).padStart(2, "0");

  const resultadoTexto =
    `${dataOrigemBR} ${horaInput} (${fusoDe.selectedOptions[0].text}) → ` +
    `${dataConvertidaBR} ${horaConvertida}:${minutoConvertido} (${fusoPara.selectedOptions[0].text})`;

  resultado.textContent = resultadoTexto;

  const li = document.createElement("li");
  li.textContent = resultadoTexto;
  historico.prepend(li);
});

btnLimpar.addEventListener("click", () => {
  historico.innerHTML = "";
  resultado.textContent = "";
});
btnLimpar.addEventListener("click", () => {
  historico.innerHTML = "";
  resultado.textContent = "";
});
