"use client";
import SwitchThemeButton from "./SwitchThemeButton";

const Header = () => {
  return (
    <div>
      <span>Header</span>
      <span></span>
      <div className="flex items-center gap-2 mt-auto mb-4" dir="ltr">
        <SwitchThemeButton />
      </div>
    </div>
  );
};

export default Header;
