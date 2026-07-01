import { BackgroundGlow } from "@/components/ui/background-gradient-glow";

export default function DemoGlow() {
  return (
    <div className="relative min-h-screen w-full">
      <BackgroundGlow />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800">Aurora Dream Glow</h1>
      </div>
    </div>
  );
}
