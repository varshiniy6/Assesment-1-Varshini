import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import * as AppUtils from "./AppUtils";

test("renders main UI elements", () => {
  render(<App />);
  expect(screen.getByText(/Commission Calculator/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Local Sales Count/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Foreign Sales Count/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Average Sale Amount/i)).toBeInTheDocument();
  expect(screen.getByText(/Calculate Commission/i)).toBeInTheDocument();
});

test("shows error if API returns error", async () => {
  // Mock getCommissionResults to simulate error
  jest.spyOn(AppUtils, "getCommissionResults").mockResolvedValueOnce({ error: "Test error" });
  render(<App />);
  fireEvent.change(screen.getByLabelText(/Local Sales Count/i), {
    target: { value: "1" }
  });
  fireEvent.change(screen.getByLabelText(/Foreign Sales Count/i), {
    target: { value: "1" }
  });
  fireEvent.change(screen.getByLabelText(/Average Sale Amount/i), {
    target: { value: "100" }
  });
  fireEvent.click(screen.getByText(/Calculate Commission/i));
  await waitFor(() => {
    expect(
      screen.getByText(/Test error/i)
    ).toBeInTheDocument();
  });
  jest.restoreAllMocks();
});

test("shows correct commission results on success", async () => {
  jest.spyOn(AppUtils, "getCommissionResults").mockResolvedValueOnce({
    avalphaTechnologiesCommissionAmount: 350,
    competitorCommissionAmount: 50
  });
  render(<App />);
  fireEvent.change(screen.getByLabelText(/Local Sales Count/i), {
    target: { value: "5" }
  });
  fireEvent.change(screen.getByLabelText(/Foreign Sales Count/i), {
    target: { value: "5" }
  });
  fireEvent.change(screen.getByLabelText(/Average Sale Amount/i), {
    target: { value: "100" }
  });
  fireEvent.click(screen.getByText(/Calculate Commission/i));
  await waitFor(() => {
    expect(screen.getByText(/£350/)).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText(/£50/)).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText(/Avalpha Technologies advantage:/i)).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText(/£300/)).toBeInTheDocument();
  });
  jest.restoreAllMocks();
});
