import { describe, expect, test } from "bun:test";
import { render } from "@testing-library/react";
import { Editor } from "../src/components/Editor";

describe("Editor component", () => {
  test("renders with initial value", () => {
    const { getAllByRole } = render(
      <Editor value="int a;" onChange={() => {}} theme="light" />,
    );
    const textboxes = getAllByRole("textbox");

    // Check that at least one textbox contains the expected content
    const found = textboxes.some(
      (el) => el.textContent && el.textContent.includes("int a;"),
    );
    expect(found).toBe(true);
  });
});
