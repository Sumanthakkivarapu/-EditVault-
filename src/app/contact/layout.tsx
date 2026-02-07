import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - EditVault",
    description: "Have questions? Get in touch with the EditVault team for support and inquiries.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
