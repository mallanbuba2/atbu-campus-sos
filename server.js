const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 4173;
let nextId = 1;
const alerts = [];
function send(res, status, contentType, body) {
res.writeHead(status, { "Content-Type": contentType });
res.end(body);
}
function serveStatic(res, filePath, contentType) {
fs.readFile(filePath, (err, data) => {
if (err) return send(res, 404, "text/plain", "Not found");
send(res, 200, contentType, data);
});
}
const server = http.createServer((req, res) => {
const url = new URL(req.url, `http://localhost:${PORT}`);
const pathname = url.pathname;
if (req.method === "GET" && pathname === "/") {
return serveStatic(res, path.join(__dirname, "public/index.html"), "text/html");
}
if (req.method === "GET" && pathname === "/dashboard") {
return serveStatic(res, path.join(__dirname, "public/dashboard.html"), "text/html");
}
if (req.method === "GET" && pathname === "/style.css") {
return serveStatic(res, path.join(__dirname, "public/style.css"), "text/css");
}
if (req.method === "GET" && pathname === "/script.js") {
return serveStatic(res, path.join(__dirname, "public/script.js"), "application/javascript");
}
if (req.method === "GET" && pathname === "/dashboard.js") {
return serveStatic(res, path.join(__dirname, "public/dashboard.js"), "application/javascript");
}
if (req.method === "GET" && pathname === "/images/atbu-logo.jpg") {
return serveStatic(res, path.join(__dirname, "public/images/atbu-logo.jpg"), "image/jpeg");
}
if (req.method === "POST" && pathname === "/sos") {
let body = "";
req.on("data", (c) => (body += c));
req.on("end", () => {
let data;
try { data = JSON.parse(body); } catch { data = {}; }
const alert = {
id: nextId++,
student_name: data.student_name || "Anonymous",
location: data.location || "Unknown",
emergency_type: data.emergency_type || "Unspecified",
timestamp: new Date().toISOString(),
status: "active",
};
alerts.unshift(alert);
send(res, 200, "application/json", JSON.stringify({ ok: true, alert }));
});
return;
}
if (req.method === "GET" && pathname === "/alerts") {
const active = alerts.filter((a) => a.status === "active");
return send(res, 200, "application/json", JSON.stringify(active));
}
const resolveMatch = pathname.match(/^\/resolve\/(\d+)$/);
if (req.method === "POST" && resolveMatch) {
const id = parseInt(resolveMatch[1], 10);
const alert = alerts.find((a) => a.id === id);
if (alert) alert.status = "resolved";
return send(res, 200, "application/json", JSON.stringify({ ok: true }));
}
send(res, 404, "text/plain", "Not found");
});
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
