// Path containment shared by scripts that read learner files on someone else's behalf.
import { realpathSync } from "node:fs";
import { resolve, sep } from "node:path";

// Resolves `rel` inside `base`, following symlinks on both sides (macOS: /var -> /private/var).
// Returns { path } for an existing file or folder inside base, { error: "refused" } for "..",
// a dotfile segment or anything that resolves outside base, and { error: "missing" } when
// the target doesn't exist, so callers can answer 404 and 403 differently.
export function safeInside(base, rel) {
  const parts = String(rel ?? "").split(/[\\/]+/).filter(Boolean);
  if (!parts.length || parts.some((p) => p === ".." || p.startsWith("."))) return { error: "refused" };
  let realBase, real;
  try {
    realBase = realpathSync(base);
    real = realpathSync(resolve(realBase, ...parts));
  } catch {
    return { error: "missing" };
  }
  if (!real.startsWith(realBase + sep)) return { error: "refused" };
  return { path: real };
}
