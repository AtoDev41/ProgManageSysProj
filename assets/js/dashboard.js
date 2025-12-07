document.addEventListener("DOMContentLoaded", () => {
    // Load username
    const username = localStorage.getItem("loggedUser");
    if (!username) {
        window.location.href = "login.html";
        return;
    }
    document.getElementById("username").textContent = username;

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "login.html";
    });

    // Sidebar button highlight
    const sideButtons = document.querySelectorAll(".side-item");
    sideButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            sideButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // Sample people data
    let people = [
        { id: 1, name: "Ali Demir", role: "Öğretim Görevlisi", status: "Aktif" },
        { id: 2, name: "Mehmet Kaya", role: "Araştırma Görevlisi", status: "Pasif" },
    ];

    function renderTable() {
        const tbody = document.querySelector("#peopleTable tbody");
        if (!tbody) return;
        tbody.innerHTML = "";
        people.forEach(person => {
            tbody.innerHTML += `
                <tr>
                    <td>${person.id}</td>
                    <td>${person.name}</td>
                    <td>${person.role}</td>
                    <td>
                        <span class="badge ${person.status === 'Aktif' ? 'badge-active' : 'badge-passive'}">
                            ${person.status}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="openEdit(${person.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deletePerson(${person.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    renderTable();

    function addPerson() {
        const name = document.getElementById("addName").value;
        const role = document.getElementById("addRole").value;
        const status = document.getElementById("addStatus").value;

        people.push({
            id: people.length ? people[people.length - 1].id + 1 : 1,
            name,
            role,
            status
        });

        renderTable();
        document.getElementById("addName").value = "";
        document.getElementById("addRole").value = "";
        document.getElementById("addStatus").value = "Aktif";

        bootstrap.Modal.getInstance(document.getElementById('addModal')).hide();
    }

    function openEdit(id) {
        const person = people.find(p => p.id === id);
        document.getElementById("editId").value = person.id;
        document.getElementById("editName").value = person.name;
        document.getElementById("editRole").value = person.role;
        document.getElementById("editStatus").value = person.status;

        new bootstrap.Modal(document.getElementById('editModal')).show();
    }

    function saveEdit() {
        const id = document.getElementById("editId").value;
        const name = document.getElementById("editName").value;
        const role = document.getElementById("editRole").value;
        const status = document.getElementById("editStatus").value;

        const person = people.find(p => p.id == id);
        person.name = name;
        person.role = role;
        person.status = status;

        renderTable();
        bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    }

    function deletePerson(id) {
        if (!confirm("Bu kişiyi silmek istiyor musun?")) return;
        people = people.filter(p => p.id !== id);
        renderTable();
    }

    // ------------------- EXPORT FUNCTIONS -------------------

    function downloadCSV() {
        const table = document.getElementById("myTable");
        let csv = [];
        for (let row of table.rows) {
            let cols = [...row.cells].map(cell => `"${cell.innerText.trim()}"`);
            csv.push(cols.join(","));
        }
        const blob = new Blob([csv.join("\n")], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "table.csv";
        a.click();
        URL.revokeObjectURL(url);
    }

    function downloadExcel() {
        const table = document.getElementById("myTable").outerHTML;
        const blob = new Blob([table], { type: "application/vnd.ms-excel" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "table.xls";
        a.click();
        URL.revokeObjectURL(url);
    }

    function downloadPDF() {
        const tableHTML = document.getElementById("myTable").outerHTML;

        const win = window.open("", "_blank");
        win.document.write(`
            <html>
            <head>
              <title>Table PDF</title>
              <style>
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #000; padding: 6px; font-size: 14px; }
              </style>
            </head>
            <body>
              ${tableHTML}
            </body>
            </html>
        `);
        win.document.close();
        win.print();
    }

    // ------------------- CONNECT BUTTONS -------------------
    document.getElementById("exportCsvBtn").addEventListener("click", downloadCSV);
    document.getElementById("exportExcelBtn").addEventListener("click", downloadExcel);
    document.getElementById("exportPdfBtn").addEventListener("click", downloadPDF);

});
