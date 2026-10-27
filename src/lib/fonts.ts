import localFont from "next/font/local";

export const funnelDisplay = localFont({
  src: [
    { path: "../../public/fonts/FunnelDisplay-Light.ttf", weight: "300" },
    { path: "../../public/fonts/FunnelDisplay-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/FunnelDisplay-Medium.ttf", weight: "500" },
    { path: "../../public/fonts/FunnelDisplay-SemiBold.ttf", weight: "600" },
    { path: "../../public/fonts/FunnelDisplay-Bold.ttf", weight: "700" },
    { path: "../../public/fonts/FunnelDisplay-ExtraBold.ttf", weight: "800" },
  ],
  display: "swap",
  variable: "--font-funnel-display",
});
