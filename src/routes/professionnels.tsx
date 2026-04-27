import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/professionnels")({
  beforeLoad: () => {
    throw redirect({ to: "/contact" });
  },
});
