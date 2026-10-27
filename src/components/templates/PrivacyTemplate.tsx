import { PRIVACY_INTRO, PRIVACY_SECTIONS } from "@/constants/privacyPolicy";

export default function PrivacyTemplate() {
  return (
    <article className="flex h-fit flex-col items-center gap-6 p-6 font-medium">
      <h1 className="mt-20 text-[50px] font-semibold">Privacy Policy</h1>
      <div className="flex w-[50vw] flex-col gap-10 pb-32 text-justify text-[20px]">
        <p>{PRIVACY_INTRO}</p>
        {PRIVACY_SECTIONS.map(({ title, body, items }) => (
          <section key={title} className="flex flex-col gap-6">
            <h2 className="text-left text-[40px]">{title}</h2>
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
