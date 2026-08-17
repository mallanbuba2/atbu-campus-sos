async function loadAlerts() {
const res = await fetch("/alerts");
const alerts = await res.json();
const container = document.getElementById("alertsContainer");
if (alerts.length === 0) {
container.innerHTML = `<div class="empty-state">No active alerts. All clear.</div>`;
return;
}
const typeIcons = {
"Medical": "🏥",
"Fire": "🔥",
"Security Threat": "🚨",
"Accident": "⚠️",
"Other": "❓",
"Unspecified": "❓",
};
const rows = alerts
.map((a) => {
const time = new Date(a.timestamp).toLocaleTimeString();
const icon = typeIcons[a.emergency_type] || "❓";
return `<tr>
<td>#${a.id}</td>
<td>${a.student_name}</td>
<td>${a.location}</td>
<td>${icon} ${a.emergency_type || "Unspecified"}</td>
<td>${time}</td>
<td><span class="badge-active">ACTIVE</span></td>
<td><button class="resolve-btn" onclick="resolveAlert(${a.id})">Mark Resolved</button></td>
</tr>`;
})
.join("");
container.innerHTML = `<table>
<thead><tr><th>ID</th><th>Name</th><th>Location</th><th>Type</th><th>Time</th><th>Status</th><th>Action</th></tr></thead>
<tbody>${rows}</tbody>
</table>`;
}
async function resolveAlert(id) {
await fetch(`/resolve/${id}`, { method: "POST" });
loadAlerts();
}
loadAlerts();
setInterval(loadAlerts, 5000);
