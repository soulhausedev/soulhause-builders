export function FormAlert({ message, variant = "error" }: { message: string; variant?: "error" | "success" }) {
  const styles =
    variant === "success"
      ? "border-teal/30 bg-teal/10 text-teal-deep"
      : "border-orange/30 bg-orange/10 text-orange";

  return (
    <p className={`mb-4 rounded-lg border px-3 py-2 text-sm ${styles}`}>
      {message}
    </p>
  );
}
