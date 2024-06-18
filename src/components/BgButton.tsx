import { FC, MouseEventHandler, ReactNode } from "react";
import { SpinIcon } from "./svgIcons";

interface ButtonProps {
  loading: boolean;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  title: string;
  icon?: ReactNode;
  className?: string;
  loadingTitle?: string;
}

const BgButton: FC<ButtonProps> = ({
  loading,
  handleClick,
  icon,
  title,
  loadingTitle = "Sending...",
  className = "rounded-lg h-14 text-center grid place-content-center relative w-full mt-4 group uppercase text-sm md:text-md font-bold text-white disabled:opacity-80 disabled:pointer-events-none",
}) => {
  return (
    <button className={className} disabled={loading} onClick={handleClick}>
      {loading ? (
        <div className="relative z-10 flex items-center justify-center gap-2">
          <SpinIcon
            className="w-6 h-6 relative z-30 animate-spin"
            fill="white"
          />
          {loadingTitle}
        </div>
      ) : (
        <div className="relative w-full h-full z-[3] flex items-center justify-center gap-2 duration-200">
          {icon && icon}
          {title}
        </div>
      )}
      <div className="absolute w-[calc(100%-8px)] h-[calc(100%-8px)] z-[2] bg-gradient-btn m-1 rounded-[9px] group-hover:opacity-80 duration-300" />
      <div className="absolute w-full h-full z-[1] bg-gradient-border rounded-xl" />
    </button>
  );
};

export default BgButton;
