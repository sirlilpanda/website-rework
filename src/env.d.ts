// src/env.d.ts

/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {}
}

interface Window {
  theme: {
    setTheme: (theme: "auto" | "dark" | "light") => void;
    getTheme: () => "auto" | "dark" | "light";
    getSystemTheme: () => "light" | "dark";
    getDefaultTheme: () => "auto" | "dark" | "light";
  };
}