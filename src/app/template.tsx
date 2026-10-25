// Remounts on every navigation, so each page replays its entrance.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page">{children}</div>;
}
