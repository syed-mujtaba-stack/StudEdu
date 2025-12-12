import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, MessageCircle, Clock } from "lucide-react";

export default function Contact() {
    return (
        <Layout>
            <div className="container px-4 md:px-6 py-16">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Have a question or feedback? We'd love to hear from you.
                        Our team is here to help.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Form */}
                    <div className="bg-card border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                        <form className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="How can we help?" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell us more about your question or feedback..."
                                    className="min-h-[150px]"
                                />
                            </div>
                            <Button className="w-full" size="lg">
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Other ways to reach us</h2>
                            <div className="space-y-6">
                                {[
                                    { icon: Mail, title: "Email", value: "support@studedu.com", desc: "We'll respond within 24 hours" },
                                    { icon: MessageCircle, title: "Live Chat", value: "Available on platform", desc: "Mon-Fri, 9am-6pm EST" },
                                    { icon: Phone, title: "Phone", value: "+1 (555) 123-4567", desc: "Mon-Fri, 9am-6pm EST" },
                                ].map((item) => (
                                    <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-muted/50">
                                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{item.title}</h3>
                                            <p className="text-primary">{item.value}</p>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-purple-600/10">
                            <div className="flex items-center gap-3 mb-3">
                                <Clock className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Response Time</h3>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                We typically respond to all inquiries within 24 hours during business days.
                                For urgent matters, please use our live chat feature.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border">
                            <div className="flex items-center gap-3 mb-3">
                                <MapPin className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Office Location</h3>
                            </div>
                            <p className="text-muted-foreground text-sm">
                                123 Education Street<br />
                                San Francisco, CA 94102<br />
                                United States
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
