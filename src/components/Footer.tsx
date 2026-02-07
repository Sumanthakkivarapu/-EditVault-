import Link from "next/link";
import { Instagram, Youtube, Twitter, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="glass border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold text-gradient mb-4">EditVault</h3>
                        <p className="text-muted-foreground max-w-xs">
                            Premium digital assets for modern creators. Elevate your content with our professionally crafted templates and presets.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-neon-blue">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/store" className="text-muted-foreground hover:text-white transition-colors">Store</Link></li>
                            <li><Link href="/about" className="text-muted-foreground hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-muted-foreground hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-neon-purple">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors"><Youtube className="w-5 h-5" /></a>
                            <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors"><Github className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                    <p>© 2024 EditVault. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/refund" className="hover:text-white">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
