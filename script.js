const users = {
    admin: { username: "admin", password: "adminpassword" },
    student: { username: "student", password: "studentpassword" }
};

let students = JSON.parse(localStorage.getItem("students")) || [];

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let errorMsg = document.getElementById("login-error");

    if (username === users.admin.username && password === users.admin.password) {
        document.getElementById("login").classList.add("hidden");
        document.getElementById("admin-panel").classList.remove("hidden");
    } else if (username === users.student.username && password === users.student.password) {
        document.getElementById("login").classList.add("hidden");
        document.getElementById("student-panel").classList.remove("hidden");
    } else {
        errorMsg.textContent = "Invalid Credentials!";
    }
}

function logout() {
    document.getElementById("login").classList.remove("hidden");
    document.getElementById("admin-panel").classList.add("hidden");
    document.getElementById("student-panel").classList.add("hidden");
}

function showAddStudent() {
    document.getElementById("student-form").classList.toggle("hidden");
}

function addStudent() {
    let id = document.getElementById("studentId").value;
    let name = document.getElementById("studentName").value;
    let course = document.getElementById("studentCourse").value;

    if (id && name && course) {
        students.push({ id, name, course });
        localStorage.setItem("students", JSON.stringify(students));
        alert("Student Added!");
    } else {
        alert("Please fill all fields.");
    }
}

function viewStudents() {
    let tableBody = document.querySelector("#studentsTable tbody");
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
        let row = `<tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
    document.getElementById("student-list").classList.remove("hidden");
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    viewStudents();
}

function backupData() {
    localStorage.setItem("backup", JSON.stringify(students));
    alert("Backup Successful!");
}

function restoreData() {
    let backup = JSON.parse(localStorage.getItem("backup"));
    if (backup) {
        students = backup;
        localStorage.setItem("students", JSON.stringify(students));
        alert("Restore Successful!");
        viewStudents();
    } else {
        alert("No Backup Found!");
    }
}

function viewMyInfo() {
    let studentInfoDiv = document.getElementById("student-info");
    studentInfoDiv.innerHTML = "<h3>Student Details:</h3>";
    students.forEach(student => {
        studentInfoDiv.innerHTML += `<p>ID: ${student.id}, Name: ${student.name}, Course: ${student.course}</p>`;
    });
    studentInfoDiv.classList.remove("hidden");
}
