import React from "react";
import type { Theme } from "../hooks/useTheme";

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  onPrettify: () => void;
  onCopy: () => void;
  onSave: () => void;
  onLoad: () => void;
  loadFileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Navbar({
  theme,
  onToggleTheme,
  onPrettify,
  onCopy,
  onSave,
  onLoad,
  loadFileInputRef,
  onFileChange,
}: NavbarProps) {
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">MPEG SDL Editor</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <label className="swap swap-rotate btn btn-ghost">
              <input
                type="checkbox"
                onChange={onToggleTheme}
                checked={theme === "dark"}
              />
              <svg
                className="swap-on fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29l.71-.71a1,1,0,0,0,-1.41-1.41l-.71.71A1,1,0,0,0,5.64,7.05ZM12,15a5,5,0,1,0,5-5A5,5,0,0,0,12,15Zm12.71,1.29a1,1,0,0,0-.71.29l-.71.71a1,1,0,1,0,1.41,1.41l.71-.71a1,1,0,0,0,0-1.41ZM20,12a1,1,0,0,0-1-1H18a1,1,0,0,0,0,2h1A1,1,0,0,0,20,12ZM18.36,17A1,1,0,0,0,17.64,18.71l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,21a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V22A1,1,0,0,0,12,21Z" />
              </svg>
              <svg
                className="swap-off fill-current w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </li>
          <li>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onPrettify}
            >
              Prettify
            </button>
          </li>
          <li>
            <button type="button" className="btn btn-ghost" onClick={onCopy}>
              Copy
            </button>
          </li>
          <li>
            <button type="button" className="btn btn-ghost" onClick={onSave}>
              Save
            </button>
          </li>
          <li>
            <button type="button" className="btn btn-ghost" onClick={onLoad}>
              Load
            </button>
            <input
              type="file"
              ref={loadFileInputRef}
              onChange={onFileChange}
              accept=".sdl,text/plain"
              style={{ display: "none" }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
