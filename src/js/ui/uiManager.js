import { formatCurrency, formatPercentage } from '../utils/formatters.js';

export class UIManager {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.elements = {
            sliders: {
                initialAmount: document.getElementById('initialAmount'),
                monthlyContribution: document.getElementById('monthlyContribution'),
                annualReturn: document.getElementById('annualReturn'),
                investmentPeriod: document.getElementById('investmentPeriod')
            },
            inputs: {
                initialAmount: document.getElementById('initialAmountInput'),
                monthlyContribution: document.getElementById('monthlyContributionInput'),
                annualReturn: document.getElementById('annualReturnInput'),
                investmentPeriod: document.getElementById('investmentPeriodInput')
            },
            summary: {
                totalInvested: document.getElementById('totalInvested'),
                finalValue: document.getElementById('finalValue'),
                totalEarnings: document.getElementById('totalEarnings')
            }
        };
    }

    setupEventListeners() {
        Object.keys(this.elements.sliders).forEach(key => {
            this.setupSliderInputSync(key);
        });
    }

    setupSliderInputSync(key) {
        const slider = this.elements.sliders[key];
        const input = this.elements.inputs[key];

        slider.addEventListener('input', () => {
            input.value = slider.value;
        });

        input.addEventListener('input', () => {
            slider.value = input.value;
        });
    }

    getValues() {
        return {
            initialAmount: Number(this.elements.inputs.initialAmount.value),
            monthlyContribution: Number(this.elements.inputs.monthlyContribution.value),
            annualReturn: Number(this.elements.inputs.annualReturn.value),
            years: Number(this.elements.inputs.investmentPeriod.value)
        };
    }

    updateSummary(results) {
        const lastResult = results[results.length - 1];
        this.elements.summary.totalInvested.textContent = formatCurrency(lastResult.invested);
        this.elements.summary.finalValue.textContent = formatCurrency(lastResult.value);
        this.elements.summary.totalEarnings.textContent = formatCurrency(lastResult.earnings);
    }
}

