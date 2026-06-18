/**
 * sections/Footer.jsx
 *
 * Site footer: logo, tagline, navigation links, copyright.
 * Links come from /data so they can be updated in one place.
 */

import { VaneIcon } from "../icons";
import { Container } from "../layout";
import { FOOTER_LINKS } from "../../data";
import { colors, typography } from "../../styles/tokens";
import "../ui/footer.css";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${colors.borderDefault}`,
        padding: "40px 0 32px",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <Container>
        {/* Top row */}
        <div
          // 
          className="footer-top-row"
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <VaneIcon size={22} />
              <span
                style={{
                  fontWeight: typography.weights.extrabold,
                  fontSize: 15,
                }}
              >
                Vane
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: colors.textSecondary,
                lineHeight: 1.55,
              }}
            >
              One feed for everything that matters.
            </p>
          </div>

          {/* Links */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
            aria-label="Footer navigation"
          >
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="footer-link"
                style={{ fontSize: 13, color: colors.textPrimary,  }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: `1px solid ${colors.borderDefault}`,
            paddingTop: 18,
            fontSize: 12,
            color: colors.textTertiary,
          }}
        >
          © 2026 Vane. Built for managers who have enough tabs open.
        </div>
      </Container>
    </footer>
  );
}
