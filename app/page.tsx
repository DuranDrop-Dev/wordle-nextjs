import Board from "./components/Board";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-black to-gray-950">
      <Board />
    </div>
  );
}
