import { Film } from "lucide-react";

function Loader({ label, fullscreen = false }) {
  return (
    <div
      className={`center-col gap-4 ${
        fullscreen ? "fixed inset-0 z-50" : "w-full py-24"
      }`}
      style={{ backgroundColor: fullscreen ? "var(--bg-color)" : "transparent" }}
      role="status"
      aria-live="polite"
    >
      <div className="relative w-14 h-14">
        <div
          className="absolute inset-0 rounded-full border-2 opacity-20"
          style={{ borderColor: "var(--text-color)" }}
        />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
          style={{
            borderTopColor: "var(--primary-color)",
            borderRightColor: "var(--primary-color)",
          }}
        />
        <Film
          className="absolute inset-0 m-auto w-5 h-5 opacity-80"
          style={{ color: "var(--text-color)" }}
        />
      </div>

      {label && (
        <p
          className="text-sm font-medium opacity-70"
          style={{ color: "var(--text-color)" }}
        >
          {label}
        </p>
      )}
    </div>
  );
}

export default Loader;