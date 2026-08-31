import { Palette } from 'lucide-react';

function NavSet({ settingsList, currentTheme, onThemeChange }) {
  const presetThemes = [
    { id: "green", label: "Green", bgClass: "bg-emerald-100 dark:bg-emerald-950/40", iconColor: "text-emerald-600 dark:text-emerald-500" },
    { id: "blue", label: "Blue", bgClass: "bg-blue-100 dark:bg-blue-950/40", iconColor: "text-blue-600 dark:text-blue-500" },
    { id: "purple", label: "Purple", bgClass: "bg-purple-100 dark:bg-purple-950/40", iconColor: "text-purple-600 dark:text-purple-500" },
    { id: "skyblue", label: "Sky Blue", bgClass: "bg-sky-100 dark:bg-sky-950/40", iconColor: "text-sky-600 dark:text-sky-500" },
    { id: "amber", label: "Amber", bgClass: "bg-amber-100 dark:bg-amber-950/40", iconColor: "text-amber-600 dark:text-amber-500" },
    { id: "red", label: "Red", bgClass: "bg-rose-100 dark:bg-rose-950/40", iconColor: "text-rose-600 dark:text-rose-500" },
  ];

  return (
    <div className="nav flex flex-col gap-6 z-50">

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium opacity-80">Preferences</p>
        
        <div className="grid grid-cols-2 gap-3">
          {settingsList.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = item.state;

            return (
              <div 
                key={index}
                onClick={item.onToggle}
                style={{ 
                  backgroundColor: "var(--card-bg)", 
                  borderColor: "var(--card-border)",
                  color: "var(--text-color)" 
                }}
                className="border p-3.5 rounded-2xl h-28 flex flex-col justify-between cursor-pointer group transition-all shadow-sm hover:border-white"
              >
                <div className="flex items-start justify-between">
                  {IconComponent && <IconComponent className="w-6 h-6 opacity-75 transition-colors" />}

                  <div className={`w-11 h-6 relative flex items-center rounded-full p-1 transition-colors duration-300 ease-in-out ${
                    isActive ? "bg-white" : "bg-zinc-700"
                  }`}>
                    <div className={`w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ease-in-out ${
                      isActive ? "translate-x-5 bg-zinc-900" : "translate-x-0 bg-white"
                    }`} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs tracking-wide">{item.label}</span>
                  {item.hasInfo && <span className="text-xs opacity-50">ⓘ</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

  
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium opacity-80">Presets</p>
        <div className="grid grid-cols-3 gap-3">
          {presetThemes.map((preset) => {
            const isSelected = currentTheme === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => onThemeChange(preset.id)}
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: isSelected ? "var(--text-color)" : "var(--card-border)",
                  color: "var(--text-color)"
                }}
                className={`h-20 rounded-2xl border p-3 flex flex-col justify-between cursor-pointer transition-all ${preset.bgClass} ${
                  isSelected ? "ring-2 ring-white/20" : "hover:border-zinc-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Palette className={`w-5 h-5 ${preset.iconColor}`} />
                </div>
                <span className="text-xs font-medium tracking-wide opacity-90">
                  {preset.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NavSet;