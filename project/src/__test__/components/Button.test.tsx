import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import Button from "../../components/Button";

describe("Button Component", () => {
  test("renders with label", () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: "Click me" });
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies variant class", () => {
    render(<Button label="Click me" onClick={() => {}} variant="secondary" />);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toHaveClass("btn-secondary");
  });

  test("is disabled when disabled prop is true", () => {
    render(<Button label="Click me" onClick={() => {}} disabled />);
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeDisabled();
  });
});
