export class ChartManager {
    constructor(chartId) {
        this.chart = null;
        this.chartId = chartId;
    }

    initChart() {
        const ctx = document.getElementById(this.chartId).getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Inversión Total',
                        borderColor: 'rgb(99, 102, 241)',
                        data: []
                    },
                    {
                        label: 'Valor de la Inversión',
                        borderColor: 'rgb(34, 197, 94)',
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += new Intl.NumberFormat('es-CL', {
                                    style: 'currency',
                                    currency: 'CLP'
                                }).format(context.parsed.y);
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    updateChart(results) {
        const years = results.map(r => `Año ${r.year}`);
        const invested = results.map(r => r.invested);
        const values = results.map(r => r.value);

        this.chart.data.labels = years;
        this.chart.data.datasets[0].data = invested;
        this.chart.data.datasets[1].data = values;
        this.chart.update();
    }
}
