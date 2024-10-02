import { useMutation, useQuery } from "@tanstack/react-query";
import { UserSettings } from "@prisma/client";
import { toast } from "sonner";

import { UpdateUserSettings } from "@/actions/UserSettings";
import { currencies } from "@/constants";

export const fetchUserSettings = () => {
  return useQuery<UserSettings>({
    queryKey: ["userSettings"],
    queryFn: () => fetch("/api/UserSettings").then((res) => res.json()),
  });
};

export const updateUserSettings = (setSelectedCurrency: any) => {
  return useMutation({
    mutationFn: UpdateUserSettings,

    onSuccess: (data: UserSettings) => (
      toast.success("Currency Updated Successfully 🎉", {
        id: "update-currency",
      }),
      setSelectedCurrency(
        currencies.find((c) => c.value === data?.currency) || null
      )
    ),

    onError: (e) => {
      toast.error("Failed to update currency. Please try again later.", {
        id: "update-currency",
      });
    },
  });
};
