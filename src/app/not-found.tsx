import { ButtonLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <div className="stagger flex min-h-[60vh] flex-col items-start justify-center">
      <p className="font-serif text-7xl italic text-accent">404</p>
      <h1 className="mt-4 text-3xl font-medium tracking-tight">This page doesn&apos;t exist.</h1>
      <p className="lead mt-3 text-muted">Maybe it was never built — or it&apos;s still in my head.</p>
      <div className="mt-8">
        <ButtonLink href="/">Back home</ButtonLink>
      </div>
    </div>
  );
}
