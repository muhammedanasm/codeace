import { redirect } from "next/navigation";

export default function Home() {
  console.log("App: Root access detected, moving to dashboard.");

  redirect("/dashboard");

  return null;
}
