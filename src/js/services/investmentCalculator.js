export class InvestmentCalculator {
    constructor() {}

    calculateInvestment({
        initialAmount,
        monthlyContribution,
        annualReturn,
        years
    }) {
        const monthlyRate = (annualReturn / 100) / 12;
        const totalMonths = years * 12;
        const results = [];
        
        let currentValue = initialAmount;
        let totalInvested = initialAmount;
        
        for (let year = 0; year <= years; year++) {
            if (year > 0) {
                for (let month = 1; month <= 12; month++) {
                    currentValue = (currentValue + monthlyContribution) * (1 + monthlyRate);
                    totalInvested += monthlyContribution;
                }
            }
            
            results.push({
                year,
                invested: totalInvested,
                value: currentValue,
                earnings: currentValue - totalInvested
            });
        }
        
        return results;
    }
}

