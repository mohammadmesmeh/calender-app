import { Logo } from "../Logo";
export const  Footer =()=>(
    
    <footer className="w-full mt-4 border-t border-border bg-surface px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-text-secondary text-sm">
      
      {/* Left side */}
      <div className="flex items-center gap-2">
        <Logo />
        <span className="text-muted">•</span>
        <span>Plan your day smarter</span>
      </div>

      {/* Middle */}
      <div className="flex items-center gap-4 text-muted">
        <span className="hover:text-text cursor-pointer transition">
          Privacy
        </span>
        <span className="hover:text-text cursor-pointer transition">
          Terms
        </span>
        <span className="hover:text-text cursor-pointer transition">
          Support
        </span>
      </div>

      {/* Right side */}
      <div className="text-muted">
        © {new Date().getFullYear()} All rights reserved
      </div>

    </footer>
  );

 
