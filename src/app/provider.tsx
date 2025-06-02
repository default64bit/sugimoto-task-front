"use client";
// import MyThemeProvider from "@/providers/ThemeProvider";
import ProductContextProvider from "@/providers/ProductContextProvider";
import { ThemeProvider } from "next-themes";
import { memo } from "react";

const Provider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    // <MyThemeProvider>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ProductContextProvider>{children}</ProductContextProvider>
    </ThemeProvider>
    // </MyThemeProvider>
  );
};

export default memo(Provider);
