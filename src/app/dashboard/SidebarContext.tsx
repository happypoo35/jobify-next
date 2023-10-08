"use client";

import { createContext, useContext, useState } from "react";
import { useMediaQuery } from "@/hooks";

type SidebarMobile = {
  active: boolean;
  animate: boolean;
};

type Context = {
  tablet: boolean | null;
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarMobile: SidebarMobile;
  setSidebarMobile: React.Dispatch<React.SetStateAction<SidebarMobile>>;
};

const SidebarContext = createContext<Context | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("Please use SidebarContextProvider in parent component");
  }

  return context;
};

export const SidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const tablet = useMediaQuery("tablet");
  const [sidebar, setSidebar] = useState(true);
  const [sidebarMobile, setSidebarMobile] = useState({
    active: false,
    animate: false,
  });

  return (
    <SidebarContext.Provider
      value={{ tablet, sidebar, setSidebar, sidebarMobile, setSidebarMobile }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
