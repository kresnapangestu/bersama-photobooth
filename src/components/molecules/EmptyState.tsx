import { ButtonLink } from "../atoms/Button";

interface EmptyStateProps {
  title: string;
  description: string;
  action: { label: string; href: string };
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center gap-4 py-16 text-center">
    <h1 className="text-xl font-bold">{title}</h1>
    <p className="max-w-sm">{description}</p>
    <ButtonLink href={action.href}>{action.label}</ButtonLink>
  </div>
);
