interface HeadlineProps {
  caption: string;
  subcaption?: string;
}

/** Page title block. Renders the page's single <h1>. */
export const Headline = ({ caption, subcaption }: HeadlineProps) => (
  <header className="flex flex-col items-center justify-evenly gap-4 text-center">
    <h1 className="text-xl font-bold">{caption}</h1>
    {subcaption && <p className="w-2/3 text-base">{subcaption}</p>}
  </header>
);
