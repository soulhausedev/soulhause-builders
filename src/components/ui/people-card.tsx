import Link from "next/link";
import { MapPin } from "lucide-react";
import { type DbBuilder } from "@/lib/types";
import { SunMark } from "@/components/ui/sun-mark";

const AVATAR_COLORS = ["#4F9080","#E8703A","#F5C432","#C45525","#6BAF9E","#3D7264","#F0A020","#2D5A50"];

function colorForUsername(username: string) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) hash = username.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function PeopleCard({ builder }: { builder: DbBuilder }) {
  const displayName = builder.full_name || builder.username;
  const initials = displayName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const avatarColor = colorForUsername(builder.username);

  return (
    <Link href={`/${builder.username}`} className="group block">
      <div className="relative h-full overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 group-hover:border-teal group-hover:shadow-md">
        <SunMark size={110} opacity={0.06} color="#E8703A" className="absolute -bottom-4 -right-4" />

        <div className="mb-4 flex items-start gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: avatarColor }}
          >
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-teal-deep group-hover:text-teal">
              {displayName}
            </p>
            {builder.role && (
              <p className="text-xs font-medium text-orange">{builder.role}</p>
            )}
            {builder.location && (
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                <MapPin size={10} />
                {builder.location}
              </p>
            )}
          </div>
        </div>

        {builder.bio && (
          <p className="mb-4 line-clamp-2 text-sm text-muted">{builder.bio}</p>
        )}

        {builder.skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {builder.skills.slice(0, 4).map((skill) => (
              <span key={skill} className="rounded-full border border-border bg-cream px-2.5 py-0.5 text-xs font-medium text-muted">
                {skill}
              </span>
            ))}
            {builder.skills.length > 4 && (
              <span className="rounded-full border border-border bg-cream px-2.5 py-0.5 text-xs font-medium text-muted">
                +{builder.skills.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
