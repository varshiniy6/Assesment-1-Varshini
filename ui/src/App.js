import logo from "./logo.png";
import "./App.css";
import { useState } from "react";
import { getCommissionResults } from "./AppUtils";

function App() {
  const [formData, setFormData] = useState({
    localSalesCount: "",
    foreignSalesCount: "",
    averageSaleAmount: ""
  });

  const [results, setResults] = useState({
    avalphaTechnologiesCommissionAmount: 0,
    competitorCommissionAmount: 0
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // API Call


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const commissionResults = await getCommissionResults(
      parseInt(formData.localSalesCount),
      parseInt(formData.foreignSalesCount),
      parseInt(formData.averageSaleAmount)
    );
    if (commissionResults.error) {
      setError(commissionResults.error);
      setResults({
        avalphaTechnologiesCommissionAmount: 0,
        competitorCommissionAmount: 0
      });
    } else {
      setResults(commissionResults);
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img
            src={logo}
            className="App-logo"
            alt="Avalpha Technologies Logo"
          />
          <h1 className="company-title">Avalpha Technologies</h1>
          <h2 className="app-subtitle">Commission Calculator</h2>
        </div>
      </header>

      <main className="main-content">
        <div className="calculator-container">
          <div className="form-section">
            <h3>Sales Information</h3>
            <form onSubmit={handleSubmit} className="calculator-form">
              <div className="form-group">
                <label htmlFor="localSalesCount">Local Sales Count</label>
                <input
                  type="number"
                  id="localSalesCount"
                  name="localSalesCount"
                  value={formData.localSalesCount}
                  onChange={handleInputChange}
                  placeholder="Enter number of local sales"
                  required
                  inputMode="numeric"
                  pattern="^[0-9][0-9]*$"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="foreignSalesCount">Foreign Sales Count</label>
                <input
                  type="number"
                  id="foreignSalesCount"
                  name="foreignSalesCount"
                  value={formData.foreignSalesCount}
                  onChange={handleInputChange}
                  placeholder="Enter number of foreign sales"
                  required
                  inputMode="numeric"
                  pattern="^[0-9][0-9]*$"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="averageSaleAmount">
                  Average Sale Amount (£)
                </label>
                <input
                  type="number"
                  id="averageSaleAmount"
                  name="averageSaleAmount"
                  value={formData.averageSaleAmount}
                  onChange={handleInputChange}
                  placeholder="Enter average sale amount"
                  required
                  inputMode="numeric"
                  pattern="^[0-9][0-9]*$"
                  min="0"
                />
              </div>

              <button
                type="submit"
                className={`calculate-btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Calculating..." : "Calculate Commission"}
              </button>
            </form>
          </div>

          <div className="results-section">
            <h3>Commission Results</h3>
            {error && (
              <div
                className="error-message"
                style={{ color: "red", marginBottom: "1em" }}
              >
                {error}
              </div>
            )}
            <div className="results-grid">
              <div className="result-card avalpha-card">
                <div className="result-header">
                  <h4>Avalpha Technologies</h4>
                  <span className="commission-rates">
                    Local: 20% | Foreign: 35%
                  </span>
                </div>
                <div className="result-amount">
                  £{results?.avalphaTechnologiesCommissionAmount}
                </div>
              </div>

              <div className="result-card competitor-card">
                <div className="result-header">
                  <h4>Competitor</h4>
                  <span className="commission-rates">
                    Local: 2% | Foreign: 7.55%
                  </span>
                </div>
                <div className="result-amount">
                  £{results?.competitorCommissionAmount}
                </div>
              </div>
            </div>

            {results.avalphaTechnologiesCommissionAmount > 0 && !error && (
              <div className="advantage-indicator">
                <p className="advantage-text">
                  Avalpha Technologies advantage:
                  <strong>
                    {" "}
                    £
                    {(
                      results?.avalphaTechnologiesCommissionAmount -
                      results?.competitorCommissionAmount
                    ).toFixed(2)}
                  </strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 Avalpha Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
