// alertLogic.js --- alert-handling functions extracted from server.js for isolated unit testing
let nextId = 1;
function createAlert({ student_name, location, emergency_type }, store) {
const alert = {
id: nextId++,
student_name: student_name || "Anonymous",
location: location || "Unknown",
emergency_type: emergency_type || "Unspecified",
timestamp: new Date().toISOString(),
status: "active",
};
if (store) store.push(alert);
return alert;
}
function getActiveAlerts(store) {
return store.filter((a) => a.status === "active");
}
function resolveAlert(id, store) {
const alert = store.find((a) => a.id === id);
if (alert) alert.status = "resolved";
return alert;
}
module.exports = { createAlert, getActiveAlerts, resolveAlert };
