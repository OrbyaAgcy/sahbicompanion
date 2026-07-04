import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/sahbi/AppShell";

export const Route = createFileRoute("/app")({
  ssr: false,
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      let done = false;
      try {
        const raw = window.localStorage.getItem("sahbi.profile.v1");
        done = raw ? Boolean(JSON.parse(raw).onboardingCompleted) : false;
      } catch {
        done = false;
      }
      if (!done) throw redirect({ to: "/onboarding" });
    }
  },
  component: AppShell,
});