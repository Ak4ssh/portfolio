import { PillBase } from "@/components/ui/3d-adaptive-navigation-bar";

export function Nav() {
  return (
    <header className="fixed top-6 z-40 w-full flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <PillBase />
      </div>
    </header>
  );
}
