import { currencies } from "@/constants";

export const dateToUTCDate = (date: Date) => {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
};

export const GetCurrencyFormatter = (currency: string) => {
  const locale = currencies.find((c) => c.value === currency)?.locale;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
};
