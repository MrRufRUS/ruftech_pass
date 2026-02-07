import type { IBaseProps } from "@/types";
import type { FC } from "react";
import clsx from "clsx";
import Styles from './logo.module.css';

export type LogoProps = IBaseProps & {
  width?: number
  height?: number
};

export const Logo: FC<LogoProps> = ({
  className,
  style,
}) => {
  return (
    <div className={clsx(Styles.container, className)} style={style}></div>
  );
};