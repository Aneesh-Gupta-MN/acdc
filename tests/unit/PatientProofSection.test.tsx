// Patient-proof tests ensure the unavailable reviews section has no placeholder output.
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { PatientProofSection } from "@/components/sections/PatientProofSection";

describe("PatientProofSection", () => {
  it("renders no patient proof when reviews are unavailable", () => {
    render(<PatientProofSection reviews={[]} enabled={false} />);
    expect(screen.queryByText(/patient proof/i)).not.toBeInTheDocument();
  });
});
