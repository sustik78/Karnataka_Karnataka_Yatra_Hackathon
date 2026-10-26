export function MeshBackground() {
  return (
    <div className="mesh-background pointer-events-none fixed inset-0 z-[-2] overflow-hidden" aria-hidden="true">
      <div
        className="mesh-blob left-[-12%] top-[-14%] h-[38rem] w-[38rem] animate-drift-one bg-[#8B1E3F] opacity-50"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="mesh-blob right-[-16%] top-[4%] h-[34rem] w-[34rem] animate-drift-two bg-[#F5B301] opacity-40"
        style={{ animationDelay: "-11s" }}
      />
      <div
        className="mesh-blob bottom-[-18%] left-[8%] h-[36rem] w-[36rem] animate-drift-three bg-[#10B981] opacity-40"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="mesh-blob bottom-[6%] right-[4%] h-[32rem] w-[32rem] animate-drift-one bg-[#0EA5E9] opacity-40"
        style={{ animationDelay: "-16s" }}
      />
      <div
        className="mesh-blob left-[38%] top-[34%] h-[35rem] w-[35rem] animate-drift-two bg-[#7C5CFF] opacity-40"
        style={{ animationDelay: "-20s" }}
      />
      <div className="star-layer absolute inset-0" />
      <div className="noise-layer absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_0%,rgba(11,11,26,0.22)_42%,rgba(11,11,26,0.72)_100%)]" />
    </div>
  );
}
