"use client";
import Link from "next/link";
import SwitchThemeButton from "./SwitchThemeButton";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full mt-4 p-2.5 dark:shadow-xl shadow-md/5 border dark:border-neutral-900 rounded-full">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center bg-neutral-400/70 rounded-full p-2">
          <svg viewBox="-3 11 20 20" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"></path>
          </svg>
        </div>
        <Link className="md:text-lg font-bold" href={`/`}>
          Apple Store
        </Link>
      </div>
      <span></span>
      <SwitchThemeButton />
    </div>
  );
};

export default Header;
