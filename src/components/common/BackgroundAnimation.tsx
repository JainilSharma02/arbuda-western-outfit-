export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#FCF9F6]">
      {/* Animated gradient orbs for a premium luxury mesh effect */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] opacity-[0.85] mix-blend-multiply filter blur-[100px] animate-pulse-slow"
        style={{
          background: "radial-gradient(circle, #EADDCD 0%, rgba(234,221,205,0) 70%)",
          animation: "orb-float-1 25s infinite alternate ease-in-out"
        }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] opacity-[0.65] mix-blend-multiply filter blur-[100px]"
        style={{
          background: "radial-gradient(circle, #e6c8c1 0%, rgba(230,200,193,0) 70%)",
          animation: "orb-float-2 30s infinite alternate-reverse ease-in-out"
        }}
      />
      <div 
        className="absolute top-[20%] right-[10%] w-[50%] h-[50%] opacity-[0.7] mix-blend-multiply filter blur-[90px]"
        style={{
          background: "radial-gradient(circle, #F7E7CE 0%, rgba(247,231,206,0) 70%)",
          animation: "orb-float-3 22s infinite alternate ease-in-out"
        }}
      />
      
      {/* Noise texture overlay for a premium grainy look */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes orb-float-1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(12%, 10%) scale(1.1); }
        }
        @keyframes orb-float-2 {
          0% { transform: translate(0, 0) scale(1.1); }
          100% { transform: translate(-10%, -15%) scale(1); }
        }
        @keyframes orb-float-3 {
          0% { transform: translate(0, 0) scale(0.9); }
          100% { transform: translate(-15%, 15%) scale(1.15); }
        }
      `}} />
    </div>
  );
}
