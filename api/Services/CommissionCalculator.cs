namespace AvalphaTechnologies.CommissionCalculator.Services
{
    public interface ICommissionCalculator
    {
        decimal CalculateAvalphaCommission(int localSalesCount, int foreignSalesCount, decimal averageSaleAmount);
        decimal CalculateCompetitorCommission(int localSalesCount, int foreignSalesCount, decimal averageSaleAmount);
    }

    public class CommissionCalculator : ICommissionCalculator
    {
        public decimal CalculateAvalphaCommission(int localSalesCount, int foreignSalesCount, decimal averageSaleAmount)
        {
            var localCommission = 0.2m * localSalesCount * averageSaleAmount;
            var foreignCommission = 0.35m * foreignSalesCount * averageSaleAmount;
            return localCommission + foreignCommission;
        }

        public decimal CalculateCompetitorCommission(int localSalesCount, int foreignSalesCount, decimal averageSaleAmount)
        {
            var localCommission = 0.02m * localSalesCount * averageSaleAmount;
            var foreignCommission = 0.0755m * foreignSalesCount * averageSaleAmount;
            return localCommission + foreignCommission;
        }
    }
}
