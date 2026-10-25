import { profile } from "@/content/profile";

export function AvailabilityBadge() {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium">
      <span
        className={`pulse-dot size-2 rounded-full ${
          profile.available ? "bg-success text-success" : "bg-subtle text-subtle"
        }`}
      />
      {profile.available ? profile.availabilityText : "Currently booked"}
    </span>
  );
}
