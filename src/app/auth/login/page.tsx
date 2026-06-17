import { signInWithGoogle } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div
          className="mb-6 h-1 w-12 rounded-full"
          style={{ background: "linear-gradient(90deg, #F5C432, #E8703A, #C45525)" }}
        />

        <div className="rounded-xl border border-border bg-surface p-8 shadow-sm">
          <h1
            className="mb-1 text-2xl"
            style={{ fontFamily: "var(--font-retro)", fontWeight: 700 }}
          >
            <span className="text-teal-deep">Sign</span>{" "}
            <span className="text-orange">in</span>
          </h1>
          <p className="mb-6 text-sm text-muted">
            Join Soulhause Builders and start sharing your projects.
          </p>

          <ErrorMessage searchParams={searchParams} />

          <form action={signInWithGoogle}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-cream px-4 py-2.5 text-sm font-medium text-teal-deep shadow-sm transition-all hover:border-teal hover:bg-teal/5"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

async function ErrorMessage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  if (!error) return null;

  return (
    <div className="mb-4 rounded-lg border border-orange/30 bg-orange/10 px-4 py-3 text-sm text-terra">
      {error}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}
