import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/sahbi/AppShell";

export const Route = createFileRoute("/app")({
  ssr: false,
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem("sahbi.profile.v1");
        const done = raw ? JSON.parse(raw).onboardingCompleted : false;
        if (!done) throw redirect({ to: "/onboarding" });
      } catch (e) {
        if ((e as any)?.isRedirect) throw e;
      }
    }
  },
  component: AppShell,
});