import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardShell from "./dashboard-shell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return <DashboardShell>{children}</DashboardShell>;
}
