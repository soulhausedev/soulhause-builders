import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { type DbProject } from "@/lib/types";
import { SunMark } from "@/components/ui/sun-mark";

const AVATAR_COLORS = ["#4F9080","#E8703A","#F5C432","#C45525","#6BAF9E","#3D7264","#F0A020","#2D5A50"];

function colorForUsername(username: string) {
  let hash = 0;
  for (let i = 0; i < username.length; i++) hash = username.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function ProjectCard({ project }: { project: DbProject }) {
  const author = project.profiles;
  const authorName = author?.full_name || author?.username || "Builder";
  const authorUsername = author?.username ?? "";
  const initials = authorName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const avatarColor = colorForUsername(authorUsername);

  const categoryTags = (project.tags ?? []).filter(
    (t) => !["Free", "Open Source"].includes(t)
  );

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:border-teal hover:shadow-md">
      <SunMark size={120} opacity={0.06} color="#4F9080" className="absolute -bottom-6 -right-6" />

      {/* Cover image */}
      <div className="relative h-44 w-full overflow-hidden bg-cream">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-teal-pale/30">
            <SunMark size={80} opacity={0.15} color="#4F9080" />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Type badges */}
        {(project.project_type?.length > 0) && (
          <div className="mb-2 flex gap-1.5">
            {project.project_type.includes("Free") && (
              <span className="rounded-full bg-gold/20 border border-gold/40 px-2 py-0.5 text-xs font-medium text-teal-deep">🆓 Free</span>
            )}
            {project.project_type.includes("Open Source") && (
              <span className="rounded-full bg-teal/10 border border-teal/30 px-2 py-0.5 text-xs font-medium text-teal-deep">🔓 Open Source</span>
            )}
          </div>
        )}

        <h3 className="mb-1.5 font-semibold text-teal-deep">{project.title}</h3>
        <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted">{project.description}</p>

        {/* Category tags */}
        {categoryTags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {categoryTags.map((tag) => (
              <span key={tag} className="rounded-full border border-teal/20 bg-teal/10 px-2.5 py-0.5 text-xs font-medium text-teal">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <Link href={`/p/${authorUsername}`} className="flex items-center gap-2 text-sm text-muted hover:text-teal">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: avatarColor }}
            >
              {initials}
            </div>
            {authorName}
          </Link>
          {project.link_url && (
            <a
              href={project.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-orange hover:text-terra"
            >
              {project.link_label || "View"}
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
