import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe } from "vitest";
import UseForm from "../../components/UseForm";

describe("User Flow Integration", () => {
  test("complete user registration flow", async () => {
    const user = userEvent.setup();
    render(<UseForm />);

    await user.type(screen.getByLabelText(/name/i), "Alice");
    await user.type(screen.getByLabelText(/email/i), "alice@example.com");

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/success/i)).toBeInTheDocument();
  });
});
