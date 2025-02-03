import React from "react";

type SquareProps = {
  size: number;
  margin: number;
  children: React.ReactNode;
};

export function Square({ size, margin, children }: SquareProps) {
  return <div style={{ height: size, width: size, margin }}>{children}</div>;
}

type RectangleProps = {
  height: number;
  width: number;
  margin: number;
};

export function Rectangle({ height, width, margin }: RectangleProps) {
  return <div style={{ height, width, margin }} />;
}
