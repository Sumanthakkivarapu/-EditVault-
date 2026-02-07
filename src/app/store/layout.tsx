import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Asset Store - EditVault",
    description: "Explore our collection of premium editing assets, LUTs, and templates.",
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
