import { InvestmentCalculator } from '../services/investmentCalculator.js';
import { UIManager } from '../ui/uiManager.js';
import { ChartManager } from '../ui/chart.js';
import { formatCurrency } from '../utils/formatters.js';

export class SimulatorController {
    constructor() {
        this.calculator = new InvestmentCalculator();
        this.uiManager = new UIManager();
        this.chartManager = new ChartManager('investmentChart');
        
        this.initialize();
    }

    initialize() {
        this.chartManager.initChart();
        this.setupEventListeners();
        this.simulate(); // Simulación inicial
    }

    setupEventListeners() {
        document.getElementById('simulateBtn').addEventListener('click', () => this.simulate());
        document.getElementById('toggleTableBtn').addEventListener('click', () => this.toggleTable());
    }

    simulate() {
        const values = this.uiManager.getValues();
        const results = this.calculator.calculateInvestment(values);
        
        this.uiManager.updateSummary(results);
        this.chartManager.updateChart(results);
        this.updateTable(results);
        
        document.getElementById('resultsSummary').style.display = 'grid';
    }

    updateTable(results) {
        const tableBody = document.getElementById('resultsTable');
        tableBody.innerHTML = results.map(result => `
            <tr>
                <td class="px-4 py-2">${result.year}</td>
                <td class="px-4 py-2">${formatCurrency(result.invested)}</td>
                <td class="px-4 py-2">${formatCurrency(result.value)}</td>
                <td class="px-4 py-2">${formatCurrency(result.earnings)}</td>
            </tr>
        `).join('');
    }

    toggleTable() {
        const tableContainer = document.getElementById('tableContainer');
        tableContainer.style.display = tableContainer.style.display === 'none' ? 'block' : 'none';
    }
}

