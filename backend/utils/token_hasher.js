import crypto from "crypto";

export function hash_token(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
