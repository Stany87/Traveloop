"use client";

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth: "1320px",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "clamp(24px, 5vw, 80px)",
        paddingRight: "clamp(24px, 5vw, 80px)",
      }}
    >
      {children}
    </div>
  );
}
