import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { ArrowLeft, Cookie, Settings, Eye, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Cookies() {
    return (
        <Layout>
            <div className="container px-4 md:px-6 py-16 max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
                </Link>

                <h1 className="text-4xl font-bold tracking-tight mb-4">Cookie Policy</h1>
                <p className="text-muted-foreground mb-8">Last updated: December 12, 2025</p>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="lead">
                        This Cookie Policy explains how StudEdu uses cookies and similar tracking technologies on our platform.
                    </p>

                    <h2>What Are Cookies?</h2>
                    <p>
                        Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how you use the site.
                    </p>

                    <h2>Types of Cookies We Use</h2>

                    <div className="not-prose space-y-4 my-8">
                        <div className="p-6 rounded-xl border bg-card">
                            <div className="flex items-center gap-3 mb-3">
                                <Shield className="h-6 w-6 text-primary" />
                                <h3 className="font-bold text-lg">Essential Cookies</h3>
                                <Badge>Required</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                                These cookies are necessary for the platform to function. They enable core features like authentication and security.
                            </p>
                            <ul className="text-sm space-y-1">
                                <li>• Session management</li>
                                <li>• Authentication tokens</li>
                                <li>• Security and fraud prevention</li>
                                <li>• Load balancing</li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-xl border bg-card">
                            <div className="flex items-center gap-3 mb-3">
                                <Eye className="h-6 w-6 text-primary" />
                                <h3 className="font-bold text-lg">Analytics Cookies</h3>
                                <Badge variant="secondary">Optional</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                                Help us understand how visitors use our platform so we can improve the user experience.
                            </p>
                            <ul className="text-sm space-y-1">
                                <li>• Page views and navigation patterns</li>
                                <li>• Feature usage statistics</li>
                                <li>• Performance metrics</li>
                                <li>• Error tracking</li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-xl border bg-card">
                            <div className="flex items-center gap-3 mb-3">
                                <Settings className="h-6 w-6 text-primary" />
                                <h3 className="font-bold text-lg">Functional Cookies</h3>
                                <Badge variant="secondary">Optional</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                                Enable enhanced functionality and personalization based on your preferences.
                            </p>
                            <ul className="text-sm space-y-1">
                                <li>• Language preferences</li>
                                <li>• Theme selection (dark/light mode)</li>
                                <li>• Course progress tracking</li>
                                <li>• AI chat history</li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-xl border bg-card">
                            <div className="flex items-center gap-3 mb-3">
                                <Cookie className="h-6 w-6 text-primary" />
                                <h3 className="font-bold text-lg">Targeting Cookies</h3>
                                <Badge variant="secondary">Optional</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                                Used to deliver relevant course recommendations and content.
                            </p>
                            <ul className="text-sm space-y-1">
                                <li>• Course recommendations</li>
                                <li>• Personalized content</li>
                                <li>• Learning path suggestions</li>
                            </ul>
                        </div>
                    </div>

                    <h2>Third-Party Cookies</h2>
                    <p>We use services from trusted third parties that may set their own cookies:</p>
                    <ul>
                        <li><strong>Groq AI:</strong> Powers our AI features (tutor, quiz generator, etc.)</li>
                        <li><strong>Payment Processors:</strong> Secure payment handling</li>
                        <li><strong>Analytics Services:</strong> Platform usage insights</li>
                        <li><strong>Content Delivery Networks (CDN):</strong> Fast content delivery</li>
                    </ul>

                    <h2>How Long Do Cookies Last?</h2>
                    <p>Cookies have different lifespans:</p>
                    <ul>
                        <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                        <li><strong>Persistent Cookies:</strong> Remain for a set period (typically 30 days to 1 year)</li>
                        <li><strong>Authentication Cookies:</strong> Usually 30 days or until you log out</li>
                    </ul>

                    <h2>Managing Cookie Preferences</h2>
                    <p>You have several options to control cookies:</p>

                    <h3>Browser Settings</h3>
                    <p>Most browsers allow you to:</p>
                    <ul>
                        <li>View and delete cookies</li>
                        <li>Block all cookies</li>
                        <li>Block third-party cookies only</li>
                        <li>Clear cookies when closing the browser</li>
                    </ul>
                    <p>Note: Blocking essential cookies will prevent you from using core platform features.</p>

                    <h3>Platform Settings</h3>
                    <p>
                        You can manage your cookie preferences in your account settings under Privacy & Security.
                    </p>

                    <h2>Do Not Track (DNT)</h2>
                    <p>
                        We respect Do Not Track signals from your browser. When DNT is enabled, we limit the use of analytics and targeting cookies.
                    </p>

                    <h2>Cookie Table</h2>
                    <div className="not-prose overflow-x-auto my-6">
                        <table className="w-full text-sm border">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-3 text-left font-semibold">Cookie Name</th>
                                    <th className="p-3 text-left font-semibold">Type</th>
                                    <th className="p-3 text-left font-semibold">Purpose</th>
                                    <th className="p-3 text-left font-semibold">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td className="p-3 font-mono">studedu_session</td>
                                    <td className="p-3">Essential</td>
                                    <td className="p-3">Maintains your login session</td>
                                    <td className="p-3">30 days</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-3 font-mono">studedu_user</td>
                                    <td className="p-3">Essential</td>
                                    <td className="p-3">Stores user preferences</td>
                                    <td className="p-3">1 year</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-3 font-mono">theme</td>
                                    <td className="p-3">Functional</td>
                                    <td className="p-3">Remembers theme choice</td>
                                    <td className="p-3">1 year</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-3 font-mono">analytics_id</td>
                                    <td className="p-3">Analytics</td>
                                    <td className="p-3">Tracks anonymous usage</td>
                                    <td className="p-3">2 years</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>Updates to This Policy</h2>
                    <p>
                        We may update this Cookie Policy to reflect changes in technology or legal requirements. Check this page periodically for updates.
                    </p>

                    <h2>Contact Us</h2>
                    <p>Questions about our use of cookies?</p>
                    <ul>
                        <li>Email: privacy@studedu.com</li>
                        <li>See also: <Link href="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
