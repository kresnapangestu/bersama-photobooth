import { SITE } from "./site";

export interface PolicySection {
  title: string;
  body?: string;
  items?: string[];
}

export const PRIVACY_INTRO = `At Bersama, we believe in making every moment magical, and your privacy is a part of that magic. This Privacy Policy explains how we collect, use, and protect your personal information when you visit, use our services, or make a purchase from ${new URL(SITE.url).host} (the "Site"). By using our services, you're agreeing to the collection and use of your information as outlined in this policy. So, let's dive into how we keep your data as safe as your most treasured memories!`;

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    title: "Changes to This Privacy Policy",
    body: "We may update this policy as we continue to make the experience at Bersama even more magical. If we make any changes, we'll let you know by updating the “Last Updated” date here. We might also make tweaks to our practices to reflect the latest trends or legal requirements, so keep an eye out for updates!",
  },
  {
    title: "How We Collect and Use Your Information",
    body: "We gather personal information from you in fun and safe ways, whether you're booking a photoshoot, browsing our galleries, or chatting with us about your perfect moments. Here's how we collect and use your info:",
  },
  {
    title: "What Information We Collect",
    body: "When you visit our site or interact with our services, we might ask for:",
    items: [
      "Contact Details: Your name, email, phone number, and address, so we can stay in touch and deliver your magical memories.",
      "Order Information: What you pay, downloadable content, payment confirmation—everything to ensure your order gets to you just right!",
      "Support Info: Any details you share with us when you reach out for help or to make your experience better.",
    ],
  },
  {
    title: "How We Use Your Personal Information",
    body: "We use your personal information to give you the best experience with Bersama, such as:",
    items: [
      "Creating Magical Memories: We process your orders and photoshoots and keep you updated on your bookings and purchases.",
      "Marketing with Joy: We may send you lovely updates about new offers, photoshoots, or special promotions we think you'll adore.",
      "Security: We ensure your data stays protected from prying eyes, so you can enjoy a worry-free experience with us.",
      "Customer Support: Whether it's a question or feedback, we're here to make sure everything runs smoothly for you!",
    ],
  },
  {
    title: "Cookies and Tracking Technologies",
    body: "We use cookies (the little helpers of the internet!) to improve your browsing experience and help us learn how you interact with our services. These cookies might gather your IP address, browser details, and how you use our site. You can control cookie settings via your browser if you wish!",
  },
  {
    title: "How We Share Your Information",
    body: "We respect your privacy and only share your information when it's necessary to make your experience with Bersama as delightful as possible. This could include:",
    items: [
      "Our Trusted Partners: Like our payment processors or delivery partners, who help fulfill your order and ensure your photoshoot memories reach you safely.",
      "Marketing Partners: To bring the magic to the right people through ads or promotions—always with a sprinkle of fun!",
      "Business Transactions: In the event of a merger or acquisition, your data might be transferred to ensure you continue to receive our services.",
    ],
  },
  {
    title: "User-Generated Content",
    body: "If you choose to share your photos or feedback with us, please remember that these will be public for others to see. Always share what makes you happiest!",
  },
  {
    title: "Third-Party Links",
    body: "Our site may include links to other magical spaces on the internet! If you click on them, we're not responsible for their privacy practices, so be sure to check them out before you share any info.",
  },
  {
    title: "Your Rights and Choices",
    body: "Depending on where you're from, you may have the right to access, update, or delete your personal information. If you'd like to make any changes to your personal details or exercise your rights, just let us know!",
  },
  {
    title: "Security and Retention",
    body: "While we take the utmost care to protect your personal information, remember that no system is completely foolproof. We recommend you use secure channels when sharing sensitive info with us.",
  },
  {
    title: "Contact Us",
    body: `Got questions or want to chat about your privacy with us? Feel free to reach out! You can contact us via email at ${SITE.email}.`,
  },
];
