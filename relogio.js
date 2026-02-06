function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("pt-BR");
    const dateString = now.toLocaleDateString("pt-BR", { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    document.getElementById("clock").innerText = timeString;
    document.getElementById("date").innerText = dateString;
}

setInterval(updateTime, 1000);
updateTime(); // Chama imediatamente para não esperar 1s
