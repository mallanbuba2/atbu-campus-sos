document.getElementById("sosBtn").addEventListener("click", async () => {
const student_name = document.getElementById("name").value || "Anonymous";
const location = document.getElementById("location").value;
const emergency_type = document.getElementById("emergencyType").value;
await fetch("/sos", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ student_name, location, emergency_type }),
});
const conf = document.getElementById("confirmation");
conf.classList.add("show");
});
