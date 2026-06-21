export default function DonutChart({ segments, size = 160, thickness = 18 }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={thickness} />
      {segments.map((seg, i) => {
        const frac = seg.value / total;
        const dash = frac * circumference;
        const el = (
          <circle key={i} cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={seg.color} strokeWidth={thickness}
            strokeDasharray={`${dash} ${circumference - dash}`} strokeDashoffset={-offset} />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
}
