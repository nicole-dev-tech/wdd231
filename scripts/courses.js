const courses = [
    { code: "WDD130", credits: 2, completed: true, type: "WDD" },
    { code: "WDD131", credits: 2, completed: true, type: "WDD" },
    { code: "WDD231", credits: 2, completed: false, type: "WDD" },
    { code: "CSE111", credits: 2, completed: false, type: "CSE" }
];

const container = document.getElementById("courseContainer");
const totalCredits = document.getElementById("totalCredits");

function displayCourses(courseList) {
    container.innerHTML = "";

    courseList.forEach(course => {
        const div = document.createElement("div");
        div.textContent = course.code;

        if (course.completed) {
            div.classList.add("completed");
        }

        container.appendChild(div);
    });

    // total credits
    const total = courseList.reduce((sum, course) => sum + course.credits, 0);
    totalCredits.textContent = total;
}

// buttons
document.getElementById("allBtn").addEventListener("click", () => {
    displayCourses(courses);
});

document.getElementById("wddBtn").addEventListener("click", () => {
    displayCourses(courses.filter(c => c.type === "WDD"));
});

document.getElementById("cseBtn").addEventListener("click", () => {
    displayCourses(courses.filter(c => c.type === "CSE"));
});

// load all first
displayCourses(courses);