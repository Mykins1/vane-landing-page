/**
 * sections/Waitlist.jsx
 *
 * Email capture form with a simple success state.
 *
 * Currently validates client-side only (`email.includes("@")`).
 * When you wire up a real backend, replace the `submit` function
 * with an API call — everything else stays the same.
 */

import { useState } from "react";
import { Section, SectionH2 } from "../layout";
import { Button, TextInput, Checkbox } from "../ui";
import { colors, radii } from "../../styles/tokens";

function SuccessCard() {
  return (
    <div
      style={{
        background: colors.bgWhite,
        border: `1px solid ${colors.successBg}`,
        borderRadius: radii.xl,
        padding: "21px",
        maxWidth: 360,
        margin: "0 auto",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 20, color: colors.success, marginBottom: 8 }}>
        ✓
      </div>
      <div
        style={{
          fontWeight: 700,
          fontSize: 16,
          color: colors.textPrimary,
          marginBottom: 6,
        }}
      >
        You're on the list.
      </div>
      <div style={{ fontSize: 14, color: colors.textSecondary }}>
        We'll be in touch when your spot opens up.
      </div>
    </div>
  );
}

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [isFounder, setIsFounder] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the page from reloading on form submit
    setError("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address (e.g., name@domain.com).");
      return;
    }

    try {
    // 1. Send the email and user data to your backend route or service
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), isFounder }),
    });

    if (!response.ok) {
      throw new Error("Failed to join waitlist");
    }

    // 2. Only show success card if the network request succeeded
    setSubmitted(true);
  }catch  {
    setError("Something went wrong on our end. Please try again.");
  }
  };

  return (
    <Section id="waitlist" bg={colors.bgMuted}>
      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          textAlign: "center",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <SectionH2 mb={14}>Get early access.</SectionH2>
        <p
          style={{
            fontSize: 16,
            color: colors.textSecondary,
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          Vane is rolling out in small batches. Leave your email and we'll reach
          out when your spot is ready.
        </p>

        {submitted ? (
          <SuccessCard />
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                alignItems: "stretch",
                maxWidth: 480,
                margin: "0 auto",
                boxSizing: "border-box",
              }}
            >
              <div style={{ width: "100%", textAlign: "left" }}>
                <TextInput
                  type="email"
                  placeholder="you@yourcompany.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(""); // Clears error message as they type
                  }}
                />
                {error && (
                  <p
                    style={{
                      color: colors.urgent,
                      fontSize: 12,
                      marginTop: 6,
                      marginLeft: 4,
                      // Removed position: "absolute"
                    }}
                  >
                    {error}
                  </p>
                )}
              </div>

              {/* Button type="submit" automatically reacts to Enter keys inside the form */}
              <Button type="submit" variant="primary" width="100%">
                Join the Waitlist
              </Button>
            </form>

            <div
              style={{
                maxWidth: 480,
                margin: "16px auto 0",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Checkbox
                checked={isFounder}
                onChange={() => setIsFounder((p) => !p)}
                label="I am a solo founder or agency owner (Prioritize my access)"
              />
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
