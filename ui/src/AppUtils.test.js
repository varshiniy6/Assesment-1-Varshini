import { getCommissionResults } from "./AppUtils";

describe("getCommissionResults", () => {
  const originalFetch = global.fetch;
  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it("returns commission data on success", async () => {
    const mockData = {
      avalphaTechnologiesCommissionAmount: 100,
      competitorCommissionAmount: 50
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });
    const result = await getCommissionResults(1, 2, 100);
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://localhost:5000/Commision",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          localSalesCount: 1,
          foreignSalesCount: 2,
          averageSaleAmount: 100
        })
      })
    );
  });

  it("returns error message on server error with JSON message", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "Custom error" })
    });
    const result = await getCommissionResults(1, 2, 100);
    expect(result).toEqual({
      error: "Failed to calculate commission results."
    });
  });

  it("returns error message on server error without JSON message", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => {
        throw new Error("Invalid JSON");
      }
    });
    const result = await getCommissionResults(1, 2, 100);
    expect(result).toEqual({
      error: "Failed to calculate commission results."
    });
  });

  it("returns error message on fetch failure", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network error"));
    const result = await getCommissionResults(1, 2, 100);
    expect(result).toEqual({
      error: "Failed to calculate commission results."
    });
  });
});
