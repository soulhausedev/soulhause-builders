"use client";

import { useState } from "react";
import { SKILLS } from "@/lib/mock-data";

export function SkillsPicker({ defaultSelected }: { defaultSelected: string[] }) {
  const [selected, setSelected] = useState<string[]>(defaultSelected ?? []);

  function toggle(skill: string) {
    setSelected((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {SKILLS.map((skill) => {
          const on = selected.includes(skill);
          return (
            <button
              key={skill}
              type="button"
              onClick={() => toggle(skill)}
              className={[
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                on
                  ? "border-teal bg-teal text-white"
                  : "border-border bg-cream text-muted hover:border-teal hover:text-teal",
              ].join(" ")}
            >
              {skill}
            </button>
          );
        })}
      </div>
      {/* Hidden inputs so the form picks up selected values */}
      {selected.map((skill) => (
        <input key={skill} type="hidden" name="skills" value={skill} />
      ))}
    </div>
  );
}
