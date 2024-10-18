// Initialize Local Storage
const initializeLocalStorage = () => {
    if (!localStorage.getItem('jobs')) {
        localStorage.setItem('jobs', JSON.stringify([]));
    }
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
};

// Create a new job and save to Local Storage
const createJob = () => {
    const jobTitle = document.getElementById('jobTitle').value;
    const jobDescription = document.getElementById('jobDescription').value;
    const jobLocation = document.getElementById('jobLocation').value;
    const jobCategory = document.getElementById('jobCategory').value;
    const jobType = document.getElementById('jobType').value;

    const newJob = {
        title: jobTitle,
        description: jobDescription,
        location: jobLocation,
        category: jobCategory,
        type: jobType,
        applicants: [], // To hold applicants
        filled: false,
        shortlistedCount: 0,
        rejectedCount: 0,
    };

    const jobs = JSON.parse(localStorage.getItem('jobs'));
    jobs.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(jobs));

    alert('Job created successfully!');
};

// Load job analytics for the admin dashboard
const loadAnalytics = () => {
    const jobs = JSON.parse(localStorage.getItem('jobs'));
    const totalJobs = jobs.length;
    const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants.length, 0);
    const filledJobs = jobs.filter(job => job.filled).length;

    document.getElementById('totalJobs').innerText = totalJobs;
    document.getElementById('totalApplicants').innerText = totalApplicants;
    document.getElementById('filledJobs').innerText = filledJobs;
};

// Load users into the user management table
const loadUsers = () => {
    const users = JSON.parse(localStorage.getItem('users'));
    const userTableBody = document.querySelector('#userTable tbody');
    userTableBody.innerHTML = ''; // Clear previous data

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.status || 'Active'}</td>
            <td>
                <button onclick="deactivateUser(${index})">Deactivate</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
};


initializeLocalStorage();
loadAnalytics();
loadUsers();
