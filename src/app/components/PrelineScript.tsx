"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    const loadPreline = async () => {
      await import("preline/preline");
      await import("@preline/overlay");
      await import("@preline/combobox");
      await import("@preline/tooltip");
      await import("@floating-ui/dom");

    //   await import("@popperjs/core");
      window.HSStaticMethods.autoInit();
    };

    loadPreline();
  }, [path]);

  return null;
}