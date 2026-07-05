export function HeroVideo() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover object-[70%_center]"
      >
        <source src="/hero-eiffel.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-cream/75 via-cream/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-cream/50 via-transparent to-cream/15" />
    </div>
  );
}
