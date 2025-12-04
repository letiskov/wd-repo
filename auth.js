function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "aldhi" && pass === "kontolkecap") {
    localStorage.setItem("session", "active");
    window.location.href = "dashboard.html";
  } else {
    const err = document.getElementById("login-error");
    if (err) err.innerText = "Incorrect username or password.";
  }
}

function logout() {
  localStorage.removeItem("session");
  window.location.href = "login.html";
}
