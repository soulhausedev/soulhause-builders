"use client";

import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { type ChangeEvent, useRef, useState } from "react";

interface AvatarUploadProps {
  userId: string;
  currentUrl?: string | null;
  initials: string;
}

export function AvatarUpload({ userId, currentUrl, initials }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [avatarUrl, setAvatarUrl] = useState(currentUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Only JPEG and PNG images are accepted.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2 MB.");
      return;
    }

    setError(null);
    setUploading(true);

    const supabase = createClient();
    const ext = file.type === "image/png" ? "png" : "jpg";
    const path = `${userId}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    // Cache-bust so the browser shows the new image immediately
    const fresh = `${data.publicUrl}?t=${Date.now()}`;
    setPreview(fresh);
    setAvatarUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        aria-label="Change avatar"
        className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-full"
      >
        <div className="h-20 w-20 rounded-full overflow-hidden flex items-center justify-center bg-teal text-white text-2xl font-bold shrink-0">
          {preview ? (
            <Image
              src={preview}
              alt="Avatar"
              width={80}
              height={80}
              className="h-full w-full object-cover"
              unoptimized={preview.includes("?t=")}
            />
          ) : (
            initials
          )}
        </div>

        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
          {uploading ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          )}
        </div>
      </button>

      <p className="text-xs text-muted">JPEG or PNG · max 2 MB</p>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

      {/* Hidden field carries the URL into the server action via FormData */}
      <input type="hidden" name="avatar_url" value={avatarUrl} readOnly />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
