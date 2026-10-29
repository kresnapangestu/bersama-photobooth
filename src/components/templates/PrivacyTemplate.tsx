import { PRIVACY_INTRO, PRIVACY_SECTIONS } from "@/constants/privacyPolicy";

export default function PrivacyTemplate() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-flow py-flow font-medium">
      <h1 className="text-center text-display font-semibold">Privacy Policy</h1>
      <div className="flex flex-col gap-8 pb-10 text-base sm:text-lg sm:text-justify lg:text-xl">
        <p>{PRIVACY_INTRO}</p>
        {PRIVACY_SECTIONS.map(({ title, body, items }) => (
          <section key={title} className="flex flex-col gap-4">
            <h2 className="text-left text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-tight font-semibold">
              {title}
            </h2>
            {body && <p>{body}</p>}
            {items && (
              <ul className="list-disc pl-6">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
