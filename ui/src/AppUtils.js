export const getCommissionResults = async (
  localSalesCount,
  foreignSalesCount,
  avgSaleAmount
) => {
  const requestBody = {
    localSalesCount: localSalesCount,
    foreignSalesCount: foreignSalesCount,
    averageSaleAmount: avgSaleAmount
  };

  try {
    const response = await fetch("https://localhost:5000/Commision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
      let errorMsg = `Server error: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMsg = errorData.message || errorMsg;
      } catch {}
      throw new Error(errorMsg);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Return error message for UI to display
    return { error: "Failed to calculate commission results." };
  }
};
