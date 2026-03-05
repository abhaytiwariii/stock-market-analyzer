export default function Home() {
  return (
    <main className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background text-foreground">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 items-center sm:items-start text-center sm:text-left">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Indian Stock Market Analysis Dashboard
        </h1>
        <p className="text-lg opacity-80 max-w-2xl">
          Welcome to the Stock Market Analysis Dashboard. This platform offers
          insightful analytics and trends for the Indian stock market.
        </p>
      </div>
    </main>
  );
}
