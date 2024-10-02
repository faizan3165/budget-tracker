import Link from "next/link";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import Logo from "@/components/Logo";
import CurrencyBox from "@/components/CurrencyBox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Wizard = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-up");

  return (
    <div className="container flex max-w-2xl flex-col items-center justify-between gap-4">
      <div>
        <h1 className="text-center text-3xl">
          Welcome,{" "}
          <span className="ml-2 font-bold">{user?.firstName}! &#128075;</span>
        </h1>

        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Let&apos;s get started by setting up your currency
        </h2>

        <h3 className="mt-2 text-center text-sm text-muted-foreground">
          You can change these settings at any time
        </h3>
      </div>

      <Separator />

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Currency</CardTitle>

          <CardDescription>
            Set Your Default Currency For Transactions
          </CardDescription>
        </CardHeader>

        <CardContent>
          <CurrencyBox />
        </CardContent>
      </Card>

      <Separator />

      <Button className="w-full" asChild>
        <Link href={"/"}>I&apos;m Done! Take Me To The Dashboard</Link>
      </Button>

      <div className="mt-8">
        <Logo />
      </div>
    </div>
  );
};

export default Wizard;
