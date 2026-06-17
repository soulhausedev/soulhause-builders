/**
 * Validates a user-submitted URL.
 * Returns null on success, or a human-readable error string on failure.
 *
 * Rules enforced:
 *  - Must parse as a valid URL
 *  - Protocol must be https (blocks javascript:, data:, ftp:, http:, etc.)
 *  - Hostname must not be localhost, a loopback address, or a private-network IP
 *  - Hostname must contain at least one dot (rules out bare labels like "intranet")
 *  - Hostname TLD must be 2–13 alpha characters
 */

const PRIVATE_IP_RE = /^(127\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|169\.254\.|::1$|fc[0-9a-f]{2}:|fd[0-9a-f]{2}:)/i;

export function validateUrl(
  raw: string | null | undefined,
  { required = true }: { required?: boolean } = {}
): string | null {
  if (!raw || !raw.trim()) {
    return required ? "A URL is required." : null;
  }

  let parsed: URL;
  try {
    parsed = new URL(raw.trim());
  } catch {
    return "Please enter a valid URL (e.g. https://example.com).";
  }

  if (parsed.protocol !== "https:") {
    return "Only https:// URLs are accepted.";
  }

  const host = parsed.hostname.toLowerCase();

  if (host === "localhost" || host === "0.0.0.0") {
    return "This URL is not publicly accessible.";
  }

  if (PRIVATE_IP_RE.test(host)) {
    return "Private or local network addresses are not allowed.";
  }

  if (!host.includes(".")) {
    return "Please enter a valid public URL.";
  }

  const tld = host.split(".").pop() ?? "";
  if (!/^[a-z]{2,13}$/.test(tld)) {
    return "Please enter a valid public URL.";
  }

  return null;
}
