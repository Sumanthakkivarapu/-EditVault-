"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Twitter, Instagram } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl font-bold mb-6"
                    >
                        Get in <span className="text-gradient">Touch</span>
                    </motion.h1>
                    <p className="text-xl text-muted-foreground mb-12">
                        Have questions about a pack or need help with your order? Drop us a message and we'll get back to you within 24 hours.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-neon-purple/20 rounded-xl flex items-center justify-center border border-neon-purple/30">
                                <Mail className="w-6 h-6 text-neon-purple" />
                            </div>
                            <div>
                                <h4 className="font-bold">Email Us</h4>
                                <p className="text-muted-foreground">support@editvault.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-neon-blue/20 rounded-xl flex items-center justify-center border border-neon-blue/30">
                                <MessageSquare className="w-6 h-6 text-neon-blue" />
                            </div>
                            <div>
                                <h4 className="font-bold">Live Support</h4>
                                <p className="text-muted-foreground">Available Mon-Fri, 9am - 6pm</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                        <h4 className="font-bold mb-4 uppercase tracking-widest text-xs text-muted-foreground">Follow Community</h4>
                        <div className="flex gap-4">
                            <a href="#" className="glass p-3 rounded-lg hover:text-neon-purple transition-all border border-white/10"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="glass p-3 rounded-lg hover:text-neon-purple transition-all border border-white/10"><Instagram className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="glass p-10 rounded-3xl border border-white/10">
                    {!submitted ? (
                        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <label className="block space-y-2">
                                    <span className="text-sm font-medium">Name</span>
                                    <input type="text" required placeholder="John Doe" className="w-full px-4 py-3 glass rounded-xl border border-white/10 outline-none focus:border-neon-purple/50" />
                                </label>
                                <label className="block space-y-2">
                                    <span className="text-sm font-medium">Email</span>
                                    <input type="email" required placeholder="john@example.com" className="w-full px-4 py-3 glass rounded-xl border border-white/10 outline-none focus:border-neon-purple/50" />
                                </label>
                            </div>
                            <label className="block space-y-2">
                                <span className="text-sm font-medium">Subject</span>
                                <input type="text" required placeholder="Question about LUTs Pack" className="w-full px-4 py-3 glass rounded-xl border border-white/10 outline-none focus:border-neon-purple/50" />
                            </label>
                            <label className="block space-y-2">
                                <span className="text-sm font-medium">Message</span>
                                <textarea rows={6} required placeholder="How can we help you?" className="w-full px-4 py-3 glass rounded-xl border border-white/10 outline-none focus:border-neon-purple/50 resize-none"></textarea>
                            </label>
                            <button type="submit" className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-neon-blue hover:text-white transition-all shadow-xl">
                                Send Message
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50">
                                <Mail className="w-8 h-8 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                            <p className="text-muted-foreground">Thank you for reaching out. We've received your inquiry and will get back to you shortly.</p>
                            <button onClick={() => setSubmitted(false)} className="mt-8 text-neon-blue hover:underline">Send another message</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
