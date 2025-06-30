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
  isDrawerOpen: boolean;
  onToggleInfo: (() => void) | null;
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
  isDrawerOpen,
  onToggleInfo
}: NavbarProps) {
  return (
    <div className="navbar bg-base-200 py-1 px-2 min-h-12">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl py-1 px-2">MPEG SDL Editor</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-0 gap-1 items-center [&_button]:btn [&_button]:btn-ghost [&_button]:px-2 [&_button]:py-2">
          <li>
            <label className="flex cursor-pointer gap-1 px-2 py-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                value="synthwave"
                className="toggle toggle-sm theme-controller"
                onChange={onToggleTheme}
                checked={theme === "dark"}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z">
                </path>
              </svg>
            </label>
          </li>
          <li>
            <button
              type="button"
              onClick={onPrettify}
            >
              Prettify
            </button>
          </li>
          <li>
            <button type="button" onClick={onCopy}>
              Copy
            </button>
          </li>
          <li>
            <button type="button" onClick={onSave}>
              Save
            </button>
          </li>
          <li>
            <button type="button" onClick={onLoad}>
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
          <li>
            <button
              type="button"
              onClick={onToggleInfo}
              title={isDrawerOpen ? "Close info panel" : "Open info panel"}
              className="[&_svg]:w-4 [&_svg]:h-4"
            >
              {isDrawerOpen
                ? (
                  // Close icon - panel with filled right section
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="15"
                      y1="3"
                      x2="15"
                      y2="21"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                    <rect
                      x="15"
                      y="3"
                      width="6"
                      height="18"
                      fill="currentColor"
                      opacity="0.3"
                    />
                  </svg>
                )
                : (
                  // Open icon - panel with divider
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="15"
                      y1="3"
                      x2="15"
                      y2="21"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
