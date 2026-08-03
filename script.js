const patientForm =
document.getElementById("patientForm");

const patientTable =
document.getElementById("patientTable");

const searchPatient =
document.getElementById("searchPatient");

const statusFilter =
document.getElementById("statusFilter");

const appointmentForm =
document.getElementById("appointmentForm");

const appointmentRecords =
document.getElementById("appointmentRecords");

let patients =

JSON.parse(

localStorage.getItem("hospitalPatients")

) || [];

let appointments =

JSON.parse(

localStorage.getItem("hospitalAppointments")

) || [];

/* Patient Registration */

patientForm.addEventListener(

"submit",

function(event) {

event.preventDefault();

const patient = {

id:

Date.now(),

name:

document
.getElementById("patientName")
.value
.trim(),

age:

document
.getElementById("patientAge")
.value,

gender:

document
.getElementById("patientGender")
.value,

phone:

document
.getElementById("patientPhone")
.value
.trim(),

disease:

document
.getElementById("patientDisease")
.value
.trim(),

blood:

document
.getElementById("bloodGroup")
.value,

doctor:

document
.getElementById("patientDoctor")
.value,

status:

document
.getElementById("patientStatus")
.value

};

patients.push(patient);

savePatients();

displayPatients();

updateDashboard();

patientForm.reset();

alert(

"Patient registered successfully!"

);

}
);

/* Save Patient Data */

function savePatients() {

localStorage.setItem(

"hospitalPatients",

JSON.stringify(patients)

);

}

/* Display Patients */

function displayPatients() {

const searchText =

searchPatient
.value
.toLowerCase();

const selectedStatus =

statusFilter.value;

const filteredPatients =

patients.filter(

function(patient) {

const nameMatches =

patient.name
.toLowerCase()
.includes(searchText);

const statusMatches =

selectedStatus === "All"

||

patient.status === selectedStatus;

return (

nameMatches

&&

statusMatches

);

}

);

patientTable.innerHTML = "";

if (

filteredPatients.length === 0

) {

patientTable.innerHTML = `

<tr><td
colspan="8"
style="text-align:center"
>No patient records found.

</td></tr>`;

return;

}

filteredPatients.forEach(

function(patient) {

let statusClass =

"status-active";

if (

patient.status === "Admitted"

) {

statusClass =

"status-admitted";

}

if (

patient.status === "Discharged"

) {

statusClass =

"status-discharged";

}

patientTable.innerHTML += `

<tr><td>${patient.id}

</td><td>${patient.name}

</td><td>${patient.age}

</td><td>${patient.gender}

</td><td>${patient.disease}

</td><td>${patient.doctor}

</td><td><span
class="status ${statusClass}"

«»

${patient.status}

</span></td><td><button

class="delete-button"

onclick="deletePatient(
${patient.id}
)"

«»

Delete

</button></td></tr>`;

}

);

}

/* Delete Patient */

function deletePatient(id) {

const answer =

confirm(

"Do you want to delete this patient record?"

);

if (

answer === false

) {

return;

}

patients =

patients.filter(

function(patient) {

return (

patient.id !== id

);

}

);

savePatients();

displayPatients();

updateDashboard();

}

/* Search and Filter */

searchPatient.addEventListener(

"input",

displayPatients

);

statusFilter.addEventListener(

"change",

displayPatients

);

/* Dashboard */

function updateDashboard() {

const total =

patients.length;

const active =

patients.filter(

function(patient) {

return (

patient.status === "Active"

||

patient.status === "Admitted"

);

}

).length;

document
.getElementById("totalPatients")
.textContent = total;

document
.getElementById("activePatients")
.textContent = active;

document
.getElementById("totalAppointments")
.textContent =

appointments.length;

displayRecentPatients();

}

/* Recent Patients */

function displayRecentPatients() {

const recentPatients =

document.getElementById(

"recentPatients"

);

recentPatients.innerHTML = "";

if (

patients.length === 0

) {

recentPatients.innerHTML = `

<p class="no-data">No patients registered yet.

</p>`;

return;

}

const latestPatients =

patients
.slice(-5)
.reverse();

latestPatients.forEach(

function(patient) {

recentPatients.innerHTML += `

<div class="recent-item"><div><strong>${patient.name}

</strong><p>${patient.disease}

</p></div><span>${patient.status}

</span></div>`;

}

);

}

/* Appointment Module */

appointmentForm.addEventListener(

"submit",

function(event) {

event.preventDefault();

const appointment = {

id:

Date.now(),

name:

document
.getElementById("appointmentName")
.value
.trim(),

doctor:

document
.getElementById("appointmentDoctor")
.value,

date:

document
.getElementById("appointmentDate")
.value,

time:

document
.getElementById("appointmentTime")
.value

};

appointments.push(

appointment

);

saveAppointments();

displayAppointments();

updateDashboard();

appointmentForm.reset();

alert(

"Appointment booked successfully!"

);

}

);

/* Save Appointments */

function saveAppointments() {

localStorage.setItem(

"hospitalAppointments",

JSON.stringify(appointments)

);

}

/* Display Appointments */

function displayAppointments() {

appointmentRecords.innerHTML = "";

if (

appointments.length === 0

) {

appointmentRecords.innerHTML = `

<p class="no-data">No appointments booked yet.

</p>`;

return;

}

appointments
.slice()
.reverse()
.forEach(

function(appointment) {

appointmentRecords.innerHTML += `

<div class="appointment-card"><h4>${appointment.name}

</h4><p><strong>Doctor:</strong>

${appointment.doctor}

</p><p><strong>Date:</strong>

${appointment.date}

  |  

<strong>Time:</strong>

${appointment.time}

</p><button

class="cancel-button"

onclick="deleteAppointment(
${appointment.id}
)"

«»

Cancel

</button></div>`;

}

);

}

/* Delete Appointment */

function deleteAppointment(id) {

const answer =

confirm(

"Do you want to cancel this appointment?"

);

if (

answer === false

) {

return;

}

appointments =

appointments.filter(

function(appointment) {

return (

appointment.id !== id

);

}

);

saveAppointments();

displayAppointments();

updateDashboard();

}

/* Set Minimum Appointment Date */

const today =

new Date()

.toISOString()

.split("T")[0];

document
.getElementById("appointmentDate")
.setAttribute(

"min",

today

);

/* Run When Website Opens */

displayPatients();

displayAppointments();

updateDashboard();