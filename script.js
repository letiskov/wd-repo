document.addEventListener("DOMContentLoaded", () => {
  // Only run on dashboard page
  const tableBody = document.getElementById("table-body");
  if (!tableBody) return;

  // Protect route
  if (localStorage.getItem("session") !== "active") {
    window.location.href = "login.html";
    return;
  }

  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }

  const errorMsg = document.getElementById("error-msg");

  fetchData(tableBody, errorMsg);
});

async function fetchData(tableBody, errorMsg) {
  try {
    const resp = await fetch("https://wd-api.vercel.app/wd");
    if (!resp.ok) {
      throw new Error("HTTP " + resp.status);
    }
    const data = await resp.json();

    tableBody.innerHTML = "";

    if (!Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='4'>No data.</td></tr>";
      return;
    }

    data.forEach((row) => {
      const tr = document.createElement("tr");

      const usernameCell = document.createElement("td");
      usernameCell.textContent = row.username ?? "";

      const bankFull = `${row.bank ?? ""} | ${row.rekening ?? ""} | ${row.nama ?? ""}`;
      const bankCell = document.createElement("td");
      bankCell.textContent = bankFull;

      const nominalCell = document.createElement("td");
      nominalCell.textContent = row.nominal ?? "";

      const actionCell = document.createElement("td");
      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      const formatCopy = `${row.username ?? ""} | ${bankFull} | ${row.nominal ?? ""}`;
      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(formatCopy);
        alert("Copied:\n" + formatCopy);
      });
      actionCell.appendChild(btn);

      tr.appendChild(usernameCell);
      tr.appendChild(bankCell);
      tr.appendChild(nominalCell);
      tr.appendChild(actionCell);

      tableBody.appendChild(tr);
    });
  } catch (err) {
    console.error("Fetch error:", err);
    if (errorMsg) errorMsg.textContent = "Failed to load data.";
    tableBody.innerHTML = "<tr><td colspan='4'>Error loading data.</td></tr>";
  }
}
