import React from "react"; // Add this line
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Studio from "../pages/Studio";
test("shows Prompt label", () => {
  render(<Studio />);
  expect(screen.getByText(/Prompt/i)).toBeInTheDocument();
});
