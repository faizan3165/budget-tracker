import { TransactionType } from "@/types";
import { MouseEventHandler, ReactNode } from "react";

export interface NavItemsInterface {
  link: string;
  label: string;
  onClickHandler?: MouseEventHandler<HTMLAnchorElement>;
}

export interface CurrencyInterface {
  value: string;
  label: string;
  locale: string;
}

export interface TransactionProps {
  trigger: ReactNode;
  type: TransactionType;
}
