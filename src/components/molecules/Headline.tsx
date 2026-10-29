import clsx from "clsx";

interface HeadlineProps {
  caption: string;
  subcaption?: string;
  align?: "center" | "start";
  className?: string;
}

/** Page title block. Renders the page's single <h1>. */
export const Headline = ({
  caption,
  subcaption,
  align = "center",
  className,
}: HeadlineProps) => (
  <header
    className={clsx(
      "flex shrink-0 flex-col gap-2",
      align === "center" ? "items-center text-center" : "items-start text-left",
      className
    )}
  >
    <h1 className="text-title font-bold text-balance">{caption}</h1>
    {/* Flavour text; dropped on very short screens to leave room for the photos. */}
    {subcaption && (
      <p className="max-w-2xl text-sm text-pretty sm:text-base [@media(max-height:30rem)]:hidden">
        {subcaption}
      </p>
    )}
  </header>
);
