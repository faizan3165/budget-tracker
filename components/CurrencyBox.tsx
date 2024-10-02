"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import SkeletonWrapper from "@/components/SkeletonWrapper";
import CurrencyList from "@/components/CurrencyList";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useMediaQuery } from "@/hooks/useMedaiQuery";
import { fetchUserSettings, updateUserSettings } from "@/hooks/useUserSettings";
import { CurrencyInterface } from "@/types";
import { currencies } from "@/constants";

const CurrencyBox = () => {
  const [open, setOpen] = useState(false);

  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyInterface | null>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data: userSettings, isFetching } = fetchUserSettings();
  const { mutate, isPending: pendingMutation } = updateUserSettings(setSelectedCurrency);

  const changeUserCurrencyHandler = useCallback(
    (currency: CurrencyInterface | null) => {
      if (!currency) {
        toast.error("Please select a currency");
        return;
      }

      toast.loading("Updating currency...", {
        id: "update-currency",
      });

      mutate(currency.value);
    },
    [mutate]
  );

  useEffect(() => {
    if (!userSettings) return;

    const userCurrency = currencies.find(
      (c) => c.value === userSettings.currency
    );

    if (userCurrency) setSelectedCurrency(userCurrency);
  }, [userSettings]);

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={isFetching}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start"
              disabled={pendingMutation}
            >
              {selectedCurrency ? (
                <>{selectedCurrency.label}</>
              ) : (
                <>+ Set currency</>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[200px] p-0" align="start">
            <CurrencyList
              setOpen={setOpen}
              setSelectedCurrency={changeUserCurrencyHandler}
            />
          </PopoverContent>
        </Popover>
      </SkeletonWrapper>
    );
  }

  return (
    <SkeletonWrapper isLoading={isFetching}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start"
            disabled={pendingMutation}
          >
            {selectedCurrency ? (
              <>{selectedCurrency.label}</>
            ) : (
              <>+ Set currency</>
            )}
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="mt-4 border-t">
            <CurrencyList
              setOpen={setOpen}
              setSelectedCurrency={changeUserCurrencyHandler}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </SkeletonWrapper>
  );
};

export default CurrencyBox;
