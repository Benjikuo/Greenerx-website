export function renderTable(results) {
  const tbody = document.querySelector("#result-body");
  tbody.innerHTML = "";

  results.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.label}</td>
      <td>${Math.round(r.weight)} kg</td>
      <td>${Math.round(r.totalCO2)} kg CO₂e</td>
    `;
    tbody.appendChild(tr);
  });
}
