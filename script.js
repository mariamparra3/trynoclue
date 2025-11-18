document.getElementById("simplifyBtn").addEventListener("click", async () => {
  const text = document.getElementById("inputText").value.trim();
  const output = document.getElementById("output");

  if (!text) {
    output.innerHTML = "Please enter text first.";
    output.classList.remove("hidden");
    return;
  }

  output.innerHTML = "Simplifying... please wait.";
  output.classList.remove("hidden");

  try const response = await fetch("/.netlify/functions/simplify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
});
    const data = await response.json();
    output.innerHTML = data.message || "Done.";
  } catch (err) {
    output.innerHTML = "Error: Unable to contact server.";
  }
});
