export function successTemplate(info) {
  return `
    <h3>Pagparehistro Malampuson!</h3>
    <p>Salamat <strong>${info.name}</strong> sa imong pagparehistro.</p>
    <p>Nakarehistro ka og <strong>${info.count}</strong> ka participant(s) ug kinahanglan mobayad og <strong>$${info.total.toFixed(2)}</strong>.</p>
  `;
}
