using AvalphaTechnologies.CommissionCalculator.Controllers;

namespace AvalphaTechnologies.CommissionCalculator.Services
{
    public interface ICommissionService
    {
        CommissionCalculationResponse CalculateCommission(CommissionCalculationRequest request);
    }

    public class CommissionService : ICommissionService
    {
        private readonly ICommissionCalculator _calculator;
        public CommissionService(ICommissionCalculator calculator)
        {
            _calculator = calculator;
        }

        public CommissionCalculationResponse CalculateCommission(CommissionCalculationRequest request)
        {
            var avalphaCommission = _calculator.CalculateAvalphaCommission(request.LocalSalesCount, request.ForeignSalesCount, request.AverageSaleAmount);
            var competitorCommission = _calculator.CalculateCompetitorCommission(request.LocalSalesCount, request.ForeignSalesCount, request.AverageSaleAmount);
            return new CommissionCalculationResponse
            {
                AvalphaTechnologiesCommissionAmount = avalphaCommission,
                CompetitorCommissionAmount = competitorCommission
            };
        }
    }
}
