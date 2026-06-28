export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      <div 
        className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full opacity-[0.02] blur-[100px]"
        style={{
          background: "radial-gradient(circle, #b58b66, transparent)",
          animation: "float 10s ease-in-out infinite alternate"
        }}
      />
      <div 
        className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.02] blur-[120px]"
        style={{
          background: "radial-gradient(circle, #fde8e9, transparent)",
          animation: "float 14s ease-in-out infinite alternate-reverse"
        }}
      />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(30px) scale(1.1);
          }
        }
      `}} />
    </div>
  );
}
