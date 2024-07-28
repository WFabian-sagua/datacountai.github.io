// bio.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    // Cargar datos de usuario y enlaces desde el archivo JSON
    let userData = {};
    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            userData = data;
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Verificar credenciales
        if (userData[username] && userData[username].password === password) {
            // Limpiar campos de texto
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';

            // Redirigir al enlace de Power BI
            window.location.href = userData[username].dashboardLink;
        } else {
            // Mostrar mensaje de error
            loginMessage.textContent = 'Usuario o contraseña incorrectos.';
        }
    });
});
