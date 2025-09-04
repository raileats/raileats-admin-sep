"use client";
import React from "react";

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body style={{background:"#f3f4f6", margin:0}}>
        {children}
      </body>
    </html>
  );
}
