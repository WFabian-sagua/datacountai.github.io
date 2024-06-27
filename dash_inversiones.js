// scripts.js
$(document).ready(function() {
    var apiUrl = 'https://api.datosabiertos.mef.gob.pe/DatosAbiertos/v1/datastore_search';
    var data = {
        resource_id: 'f9cc4ba0-931a-4b70-86c9-eacbd8c68596',
        limit: 100 // Puedes ajustar el límite según tus necesidades
    };

    function fetchData(callback) {
        console.log('Iniciando llamada a la API...'); // Mensaje de depuración
        $.ajax({
            url: apiUrl,
            data: data,
            dataType: 'jsonp',
            success: function(response) {
                console.log('Respuesta de la API:', response); // Mensaje de depuración
                if(response.result && response.result.records) {
                    callback(response.result.records);
                } else {
                    console.error('Error: No se encontraron datos en la respuesta.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error al obtener los datos:', error);
            }
        });
    }

    function plotEvolucionFinanciera(data) {
        console.log('Datos para Evolución Financiera:', data); // Mensaje de depuración
        var fechas = data.map(row => row['FECHA_REGISTRO']);
        var montoViable = data.map(row => parseFloat(row['MONTO_VIABLE']));
        var costoActualizado = data.map(row => parseFloat(row['COSTO_ACTUALIZADO']));

        var trace1 = {
            x: fechas,
            y: montoViable,
            type: 'scatter',
            mode: 'lines',
            name: 'Monto Viable'
        };
        
        var trace2 = {
            x: fechas,
            y: costoActualizado,
            type: 'scatter',
            mode: 'lines',
            name: 'Costo Actualizado'
        };

        var layout = {
            title: 'Evolución Financiera a lo largo del Tiempo'
        };

        Plotly.newPlot('evolucion-financiera', [trace1, trace2], layout);
    }

    function plotDistribucionInversiones(data) {
        console.log('Datos para Distribución de Inversiones:', data); // Mensaje de depuración
        var trace = {
            type: "treemap",
            labels: data.map(row => row['ENTIDAD']),
            parents: data.map(row => row['SECTOR']),
            values: data.map(row => parseFloat(row['MONTO_VIABLE'])),
            textinfo: "label+value"
        };

        var layout = {
            title: 'Distribución de Inversiones por Sector y Entidad'
        };

        Plotly.newPlot('distribucion-inversiones', [trace], layout);
    }

    function plotAvanceFisico(data) {
        console.log('Datos para Avance Físico:', data); // Mensaje de depuración
        var entidades = data.map(row => row['ENTIDAD']);
        var avanceFisico = data.map(row => parseFloat(row['AVANCE_FISICO']));

        var trace = {
            y: entidades,
            x: avanceFisico,
            type: 'bar',
            orientation: 'h'
        };

        var layout = {
            title: 'Comparación de Avance Físico por Entidad'
        };

        Plotly.newPlot('avance-fisico', [trace], layout);
    }

    function updateDashboard(data) {
        plotEvolucionFinanciera(data);
        plotDistribucionInversiones(data);
        plotAvanceFisico(data);
    }

    fetchData(updateDashboard);

    $('#close-welcome-button').click(function() {
        $('#welcome-message').hide();
    });
});
