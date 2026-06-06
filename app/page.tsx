import Board from "./components/Board";
import ParticleAnimator from "./components/ParticleAnimator";

export default function Home() {
  return (
    <div className="relative isolate flex h-screen flex-col overflow-hidden bg-gradient-to-b from-black to-gray-950">
      <ParticleAnimator />
      <div className="relative z-10">
        <Board />
      </div>
    </div>
  );
}
