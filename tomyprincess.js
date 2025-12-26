document.addEventListener("DOMContentLoaded", function() {
    // Contador
    const inicio = new Date(2024, 11, 26, 0, 0, 0, 0); // Diciembre es 11 (0-index)

    function actualizarContador() {
        const ahora = new Date();
        inicio.setMilliseconds(0);
        ahora.setMilliseconds(0);

        const diferencia = ahora - inicio;

        const msPorDia = 1000 * 60 * 60 * 24;
        const msPorHora = 1000 * 60 * 60;
        const msPorMinuto = 1000 * 60;
        const msPorSegundo = 1000;

        const Dias = Math.floor(diferencia / msPorDia);
        const Horas = Math.floor((diferencia % msPorDia) / msPorHora);
        const Minutos = Math.floor((diferencia % msPorHora) / msPorMinuto);
        const Segundos = Math.floor((diferencia % msPorMinuto) / msPorSegundo);

        document.getElementById("Dias").innerText = Dias;
        document.getElementById("Horas").innerText = Horas < 10 ? "0" + Horas : Horas; 
        document.getElementById("Minutos").innerText = Minutos < 10 ? "0" + Minutos : Minutos; 
        document.getElementById("Segundos").innerText = Segundos < 10 ? "0" + Segundos : Segundos; 
    }

    // Sistema para mostrar/ocultar secciones
    let seccionActiva = null;

    // Función global para alternar secciones
    window.toggleSeccion = function(id) {
        const seccion = document.getElementById(id);
        const categoria = document.querySelector(`.categoria[onclick="toggleSeccion('${id}')"]`);
        
        // Si hacemos clic en la misma sección
        if (seccionActiva === id) {
            // Ocultar la sección
            seccion.classList.remove('visible');
            // Quitar efecto activo de la categoría
            if (categoria) categoria.style.opacity = "1";
            seccionActiva = null;
            return;
        }
        
        // Si hay otra sección activa, cerrarla primero
        if (seccionActiva) {
            const seccionAnterior = document.getElementById(seccionActiva);
            const categoriaAnterior = document.querySelector(`.categoria[onclick="toggleSeccion('${seccionActiva}')"]`);
            
            seccionAnterior.classList.remove('visible');
            if (categoriaAnterior) categoriaAnterior.style.opacity = "1";
        }
        
        // Mostrar la nueva sección
        seccion.classList.add('visible');
        
        // Efecto visual en la categoría seleccionada
        if (categoria) categoria.style.opacity = "0.8";
        
        // Actualizar sección activa
        seccionActiva = id;
        
        // Desplazarse suavemente a la sección
        setTimeout(() => {
            seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }

    // Inicializar contador
    actualizarContador();
    setInterval(actualizarContador, 1000);

    // Asegurar que todas las secciones empiecen ocultas
    document.querySelectorAll('.seccion').forEach(seccion => {
        seccion.classList.remove('visible');
    });

    // Actualizar la frase del tiempo juntas
    function actualizarFrase() {
        const ahora = new Date();
        const inicio = new Date(2024, 10, 26, 0, 0, 0, 0);
        const diferencia = ahora - inicio;
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        
        const frases = [
            "Llevamos juntas creando nuestra historia...",
            "Cada día a tu lado es un regalo...",
            "Nuestro tiempo juntas es invaluable...",
            "Cada momento contigo cuenta...",
            "Construyendo recuerdos día a día..."
        ];
        
        // Cambiar frase cada 30 días aproximadamente
        const indice = Math.min(Math.floor(dias / 30), frases.length - 1);
        document.querySelector('.frase').textContent = frases[indice];
    }
    
    actualizarFrase();
});
