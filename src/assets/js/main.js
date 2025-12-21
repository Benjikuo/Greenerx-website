import { calculateTotalLength, calculateMaterial } from "./calculator.js";

// 確保 DOM 載入完成
window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#calc-form");
  const tbody = document.querySelector("#result-body");

  if (!form || !tbody) {
    console.error("❌ HTML 結構錯誤，找不到表單或表格");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const units = Number(document.querySelector("#units").value);
    const floors = Number(document.querySelector("#floors").value);
    const hasBasement = document.querySelector("#basement").checked;

    const length = calculateTotalLength(units, floors, hasBasement);

    const results = [
      calculateMaterial("CAST_IRON", length),
      calculateMaterial("PVC", length),
      calculateMaterial("HDPE", length),
    ];

    tbody.innerHTML = "";

    results.forEach((r) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r.label}</td>
        <td>${r.weight}</td>
        <td>${r.totalCO2}</td>
      `;
      tbody.appendChild(tr);
    });
  });
});
