export default function Loading_screen() {
  return (
    <main className="min-h-screen w-full bg-canvas flex flex-col items-center justify-center gap-4">
      <div className="spinner-vintage" role="status" aria-label="loading" />
      <span className="text-caption-md text-dim">loading</span>
    </main>
  );
}
