
// JSON Server endpoint
const URL = "http://localhost:3000/students";


// ======================================
// COMMON FUNCTIONS
// ======================================

// Display students in HTML
function displayStudents(students) {

    let output = "";

    students.forEach(student => {

        output += `
            <div class="student">
                <h3>${student.name}</h3>
                <p>ID: ${student.id}</p>
                <p>Department: ${student.department}</p>
                <p>Email: ${student.email || "N/A"}</p>
                <p>Semester: ${student.semester || "N/A"}</p>
                <p>CGPA: ${student.cgpa || "N/A"}</p>
            </div>
        `;

    });

    document.getElementById("result").innerHTML =
        output || "No students found.";

}


// Get data from the form
function getStudentData() {

    return {

        name: document.getElementById("name").value,

        department: document.getElementById("department").value,

        email: document.getElementById("email").value,

        semester: Number(document.getElementById("semester").value),

        cgpa: Number(document.getElementById("cgpa").value)

    };

}


// Display status messages
function showMessage(text) {

    document.getElementById("message").textContent = text;

}


// Clear form after successful POST
function clearForm() {

    document.getElementById("studentForm").reset();

}


// Check HTTP response
async function checkResponse(response) {

    if (!response.ok) {

        throw new Error(`Request failed: ${response.status}`);

    }

    if (response.status === 204) {

        return null;

    }

    const text = await response.text();

    return text ? JSON.parse(text) : null;

}


// Callback wrapper for all three HTTP operations.
// Fetch returns a Promise, which this function converts
// into the callback(error, data) pattern.

function requestCallback(url, options, callback) {

    fetch(url, options)

        .then(response => checkResponse(response))

        .then(data => callback(null, data))

        .catch(error => callback(error, null));

}



// ======================================
// 1. GET: RETRIEVE STUDENTS
// ======================================


// METHOD 1: ASYNC / AWAIT

async function getAsync() {

    try {

        const response = await fetch(URL);

        const students = await checkResponse(response);

        displayStudents(students);

        showMessage("Students retrieved using Async/Await!");

    }

    catch (error) {

        showMessage(error.message);

    }

}



// METHOD 2: PROMISE

function getPromise() {

    fetch(URL)

        .then(response => checkResponse(response))

        .then(students => {

            displayStudents(students);

            showMessage("Students retrieved using Promise!");

        })

        .catch(error => {

            showMessage(error.message);

        });

}



// METHOD 3: CALLBACK

function getCallback() {

    requestCallback(URL, {}, function(error, students) {

        if (error) {

            showMessage(error.message);

            return;

        }

        displayStudents(students);

        showMessage("Students retrieved using Callback!");

    });

}



// ======================================
// 2. POST: ADD STUDENT
// ======================================


// METHOD 1: ASYNC / AWAIT

async function addAsync() {

    try {

        const student = getStudentData();

        if (!student.name || !student.department) {

            throw new Error("Name and department are required.");

        }

        const response = await fetch(URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        });

        await checkResponse(response);

        clearForm();

        showMessage("Student added using Async/Await!");

    }

    catch (error) {

        showMessage(error.message);

    }

}



// METHOD 2: PROMISE

function addPromise() {

    const student = getStudentData();

    if (!student.name || !student.department) {

        showMessage("Name and department are required.");

        return;

    }

    fetch(URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)

    })

    .then(response => checkResponse(response))

    .then(data => {

        clearForm();

        showMessage("Student added using Promise!");

    })

    .catch(error => {

        showMessage(error.message);

    });

}



// METHOD 3: CALLBACK

function addCallback() {

    const student = getStudentData();

    if (!student.name || !student.department) {

        showMessage("Name and department are required.");

        return;

    }

    requestCallback(URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)

    }, function(error, data) {

        if (error) {

            showMessage(error.message);

            return;

        }

        clearForm();

        showMessage("Student added using Callback!");

    });

}



// ======================================
// 3. DELETE: DELETE STUDENT
// ======================================


// Get student ID
function getDeleteURL() {

    const id = document.getElementById("deleteId").value.trim();

    if (!id) {

        throw new Error("Please enter a student ID.");

    }

    return `${URL}/${encodeURIComponent(id)}`;

}



// METHOD 1: ASYNC / AWAIT

async function deleteAsync() {

    try {

        const deleteURL = getDeleteURL();

        const response = await fetch(deleteURL, {

            method: "DELETE"

        });

        await checkResponse(response);

        showMessage("Student deleted using Async/Await!");

    }

    catch (error) {

        showMessage(error.message);

    }

}



// METHOD 2: PROMISE

function deletePromise() {

    let deleteURL;

    try {

        deleteURL = getDeleteURL();

    }

    catch (error) {

        showMessage(error.message);

        return;

    }

    fetch(deleteURL, {

        method: "DELETE"

    })

    .then(response => checkResponse(response))

    .then(data => {

        showMessage("Student deleted using Promise!");

    })

    .catch(error => {

        showMessage(error.message);

    });

}



// METHOD 3: CALLBACK

function deleteCallback() {

    let deleteURL;

    try {

        deleteURL = getDeleteURL();

    }

    catch (error) {

        showMessage(error.message);

        return;

    }

    requestCallback(deleteURL, {

        method: "DELETE"

    }, function(error, data) {

        if (error) {

            showMessage(error.message);

            return;

        }

        showMessage("Student deleted using Callback!");

    });

}
