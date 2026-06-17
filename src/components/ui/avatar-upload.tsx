"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface AvatarUploadProps {
  userId: string;
  currentUrl: string | null;
  initials: string;
}

export function AvatarUpload({ userId, currentUrl, initials }: AvatarUploadProps) {
  const [preview, setPreview]   = useState<string | null>(currentUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [savedUrl, setSavedUrl] = useState<string | null>(currentUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please pick an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }

    setError(null);
    setUploading(true);

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    const supabase = createClient();
    const ext      = file.name.split(".").pop() ?? "jpg";
    const path     = `${userId}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      setError("Upload failed. " + uploadError.message);
      setPreview(currentUrl);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    // Bust cache with timestamp
    const publicUrl = data.publicUrl + `?t=${Date.now()}`;
    setSavedUrl(publicUrl);
    setPreview(publicUrl);
    setUploading(false);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="flex items-center gap-5">
      {/* Hidden input carries the URL into the form */}
      <input type="hidden" name="avatar_url" value={savedUrl ?? ""} />

      {/* Avatar circle — click or drop to change */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload avatar"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-cream transition-colors hover:border-teal group"
      >
        {preview ? (
          <Image
            src={preview}
            alt="Avatar"
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <span className="text-2xl font-bold text-teal-deep">{initials}</span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-teal-deep/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
          {uploading ? (
            <span className="text-white text-xs animate-pulse">Uploading…</span>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <span className="text-white text-[10px] mt-1 font-medium">Change</span>
            </>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onInputChange}
      />

      {/* Info text */}
      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-sm font-medium text-teal hover:text-teal-dark transition-colors"
        >
          {preview ? "Change photo" : "Upload photo"}
        </button>
        <p className="text-xs text-muted mt-0.5">JPG, PNG or WebP · Max 5 MB</p>
        {error && <p className="text-xs text-orange mt-1">{error}</p>}
        {uploading && <p className="text-xs text-teal mt-1 animate-pulse">Uploading…</p>}
      </div>
    </div>
  );
}
