import Link from "next/link";
import { MapPin } from "lucide-react";
import { type Builder } from "@/lib/mock-data";
import { SunMark } from "@/components/ui/sun-mark";

export function PeopleCard({ builder }: { builder: Builder }) {
  return (
    <Link href={`/p/${builder.username}`} className="group block">
      <div className="relative h-full overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 group-hover:border-teal group-hover:shadow-md">
        <SunMark size={110} opacity={0.06} color="#E8703A" className="absolute -bottom-4 -right-4" />
        {/* Header */}
        <div className="mb-4 flex items-start gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: builder.avatarColor }}
          >
            {builder.initials}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-teal-deep group-hover:text-teal">
              {builder.name}
            </p>
            <p className="text-xs font-medium text-orange">{builder.role}</p>
            {builder.location && (
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                <MapPin size={10} />
                {builder.location}
              </p>
            )}
          </div>

          {builder.available && (
            <span className="shrink-0 rounded-full border border-teal/30 bg-teal/10 px-2 py-0.5 text-[10px] font-medium text-teal">
              Available
            </span>
          )}
        </div>

        {/* Bio */}
        <p className="mb-4 line-clamp-2 text-sm text-muted">{builder.bio}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {builder.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-cream px-2.5 py-0.5 text-xs font-medium text-muted"
            >
              {skill}
            </span>
          ))}
          {builder.skills.length > 4 && (
            <span className="rounded-full border border-border bg-cream px-2.5 py-0.5 text-xs font-medium text-muted">
              +{builder.skills.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
