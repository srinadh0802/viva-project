const AVATAR_TINTS = [
  "bg-violet-100 text-violet-700", "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700", "bg-cyan-100 text-cyan-700",
];

export default function Avatar({ name, idx = 0, size = "h-9 w-9 text-xs" }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return <span className={`grid ${size} shrink-0 place-items-center rounded-full font-semibold ${AVATAR_TINTS[idx % AVATAR_TINTS.length]}`}>{initials}</span>;
}
