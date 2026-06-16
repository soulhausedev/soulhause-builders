import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { type Project } from "@/lib/mock-data";
import { SunMark } from "@/components/ui/sun-mark";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-200 hover:border-teal hover:shadow-md">
      {/* Sun watermark */}
      <SunMark size={120} opacity={0.06} color="#4F9080" className="absolute -bottom-6 -right-6" />
      {/* Cover image */}
      <div className="relative h-44 w-full overflow-hidden bg-cream">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1.5 font-semibold text-teal-deep">{project.title}</h3>
        <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-teal/20 bg-teal/10 px-2.5 py-0.5 text-xs font-medium text-teal"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          {/* Author */}
          <Link
            href={`/p/${project.authorUsername}`}
            className="flex items-center gap-2 text-sm text-muted hover:text-teal"
          >
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: project.authorColor }}
            >
              {project.authorInitials}
            </div>
            {project.authorName}
          </Link>

          {/* CTA link */}
          <a
            href={project.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-orange hover:text-terra"
          >
            {project.link.label}
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
