import { MouseEvent } from "react";

export interface NavigationTypes {
  id: number;
  title: string;
  link: string | ((e: MouseEvent<HTMLElement>) => void);
}
