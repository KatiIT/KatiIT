import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-mono text-sm text-neon-orange">404</p>
      <h1 className="mt-3 text-3xl font-semibold">Seite nicht gefunden · Page not found</h1>
      <div className="mt-8 flex justify-center gap-4 text-sm">
        <Link href="/de" className="underline underline-offset-4">Startseite (DE)</Link>
        <Link href="/en" className="underline underline-offset-4">Home (EN)</Link>
      </div>
    </div>
  );
}
