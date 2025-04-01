"use client";

import React, { JSX } from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="relative p-[3px] rounded-xl bg-gradient-to-r from-blue-300 to-blue-500 shadow-md shadow-blue-300">
      <div className="bg-slate-700 rounded-xl p-6 border-2 border-transparent bg-clip-border">
        <h1 className="text-xl border-b pb-2 text-white font-mono">{title}</h1>
        <div className="text-white">{children}</div>
      </div>
    </div>
  );
}
