document.addEventListener('DOMContentLoaded', function () {
    const yearRange = document.getElementById('year-range');
    const yearRangeOutput = document.getElementById('year-range-output');
    const sectorDropdown = $('#sector-dropdown');
    const departamentoDropdown = $('#departamento-dropdown');
    let data = [];

    // Initialize Select2
    sectorDropdown.select2({
        placeholder: 'Seleccionar Sector',
        allowClear: true
    });

    departamentoDropdown.select2({
        placeholder: 'Seleccionar Departamento',
        allowClear: true
    });

    loadData();

    yearRange.addEventListener('input', function () {
        yearRangeOutput.textContent = yearRange.value;
        updateGraphs();
    });

    sectorDropdown.on('change', updateGraphs);
    departamentoDropdown.on('change', updateGraphs);

    async function loadData() {
        try {
            const response = await fetch('data/inversiones.csv');
            if (!response.ok) throw new Error('Network response was not ok');

            const csvData = await response.text();
            const parsedData = Papa.parse(csvData, { header: true, dynamicTyping: true });

            handleData(parsedData.data);
        } catch (error) {
            console.error('Error al obtener los datos CSV:', error);
        }
    }

    function handleData(csvData) {
        data = csvData;
        const sectores = [...new Set(data.map(item => item.SECTOR && item.SECTOR.toUpperCase()).filter(Boolean))];
        const departamentos = [...new Set(data.map(item => item.DEPARTAMENTO && item.DEPARTAMENTO.toUpperCase()).filter(Boolean))];

        sectorDropdown.empty().select2({ data: sectores.map(sector => ({ id: sector, text: sector })) });
        departamentoDropdown.empty().select2({ data: departamentos.map(departamento => ({ id: departamento, text: departamento })) });

        // Establecer valores predeterminados si no están en el HTML
        if (!sectorDropdown.val().length) {
            sectorDropdown.val(['GOBIERNOS LOCALES']).trigger('change');
        }
        if (!departamentoDropdown.val().length) {
            departamentoDropdown.val(['TACNA']).trigger('change');
        }

        updateGraphs();
    }

    function updateGraphs() {
        if (!yearRange) return; // Verificar si yearRange está definido
        const selectedYear = yearRange.value;
        const selectedSectors = sectorDropdown.val();
        const selectedDepartments = departamentoDropdown.val();

        const filteredData = data.filter(item =>
            (!selectedSectors.length || selectedSectors.includes(item.SECTOR && item.SECTOR.toUpperCase())) &&
            (!selectedDepartments.length || selectedDepartments.includes(item.DEPARTAMENTO && item.DEPARTAMENTO.toUpperCase())) &&
            new Date(item.FECHA_REGISTRO).getFullYear() === parseInt(selectedYear)
        );

        if (!filteredData.length) {
            console.log('No hay datos para los filtros seleccionados');
            return;
        }

        const entities = [...new Set(filteredData.map(item => item.ENTIDAD).filter(Boolean))];
        const colors = Plotly.d3.scale.category10().range();

        const traces = entities.map((entity, index) => ({
            x: filteredData.filter(item => item.ENTIDAD === entity).map(item => item.FECHA_REGISTRO),
            y: filteredData.filter(item => item.ENTIDAD === entity).map(item => item.MONTO_VIABLE),
            mode: 'lines+markers',
            name: entity,
            line: { color: colors[index % colors.length] }
        }));

        const layout = {
            title: 'Evolución Financiera a lo largo del Tiempo',
            xaxis: { title: 'Fecha' },
            yaxis: { title: 'Monto Viable' },
            annotations: []
        };

        // Añadir anotaciones en picos y valles
        traces.forEach(trace => {
            const maxIndex = trace.y.indexOf(Math.max(...trace.y));
            const minIndex = trace.y.indexOf(Math.min(...trace.y));
            if (maxIndex !== -1) {
                layout.annotations.push({
                    x: trace.x[maxIndex],
                    y: trace.y[maxIndex],
                    xref: 'x',
                    yref: 'y',
                    text: 'Pico',
                    showarrow: true,
                    arrowhead: 2,
                    ax: 0,
                    ay: -40
                });
            }
            if (minIndex !== -1) {
                layout.annotations.push({
                    x: trace.x[minIndex],
                    y: trace.y[minIndex],
                    xref: 'x',
                    yref: 'y',
                    text: 'Valle',
                    showarrow: true,
                    arrowhead: 2,
                    ax: 0,
                    ay: 40
                });
            }
        });

        Plotly.newPlot('evolucion-financiera', traces, layout);
		// Ajustar el tamaño del gráfico al contenedor al cambiar el tamaño de la ventana
		window.addEventListener('resize', function() {
			Plotly.relayout('evolucion-financiera', {
				width: '100%',
				height: 'auto'
			});
        });
    }
});
