document.getElementById("start").addEventListener("click", () => {
    const container = document.getElementById("main-container");
    container.classList.add("fade-out");
    setTimeout(() => {
        window.location.href = "pages/jogo.html";
    }, 600);
});