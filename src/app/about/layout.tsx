import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - EditVault",
    description: "Learn about the mission and the team behind EditVault's premium assets.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
