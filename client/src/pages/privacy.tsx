import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Bell } from "lucide-react";

export default function Privacy() {
    return (
        <Layout>
            <div className="container px-4 md:px-6 py-16 max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
                </Link>

                <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
                <p className="text-muted-foreground mb-8">Last updated: December 12, 2025</p>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="lead">
                        At StudEdu, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our learning platform.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                        {[
                            { icon: Shield, title: "Data Protection", desc: "Your data is encrypted and secure" },
                            { icon: Eye, title: "Transparency", desc: "Clear about what we collect" },
                            { icon: Lock, title: "Your Control", desc: "You own your data" },
                            { icon: Database, title: "Minimal Collection", desc: "Only essential information" },
                        ].map((item) => (
                            <div key={item.title} className="p-4 rounded-lg border bg-card">
                                <item.icon className="h-8 w-8 text-primary mb-2" />
                                <h3 className="font-semibold mb-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <h2>1. Information We Collect</h2>

                    <h3>Personal Information</h3>
                    <p>When you register for an account, we collect:</p>
                    <ul>
                        <li>Name and email address</li>
                        <li>Profile photo (optional)</li>
                        <li>Payment information (processed securely by third parties)</li>
                        <li>Learning preferences and interests</li>
                    </ul>

                    <h3>Usage Data</h3>
                    <p>We automatically collect information about how you use StudEdu:</p>
                    <ul>
                        <li>Course enrollment and progress</li>
                        <li>Quiz scores and assessment results</li>
                        <li>AI tool usage (tutor conversations, generated quizzes, notes)</li>
                        <li>Device information and IP address</li>
                        <li>Browser type and operating system</li>
                        <li>Pages visited and time spent on platform</li>
                    </ul>

                    <h3>AI Interaction Data</h3>
                    <p>When you use our AI-powered features:</p>
                    <ul>
                        <li>Your questions and prompts to the AI tutor</li>
                        <li>Topics you request summaries or notes about</li>
                        <li>Quiz parameters and preferences</li>
                        <li>This data helps improve our AI models and personalize your experience</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use the collected information to:</p>
                    <ul>
                        <li><strong>Provide Services:</strong> Deliver courses, AI features, and platform functionality</li>
                        <li><strong>Personalization:</strong> Recommend relevant courses and tailor your learning experience</li>
                        <li><strong>Communication:</strong> Send course updates, announcements, and support messages</li>
                        <li><strong>Improvement:</strong> Analyze usage patterns to enhance our platform</li>
                        <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security incidents</li>
                        <li><strong>Legal Compliance:</strong> Meet legal obligations and enforce our Terms</li>
                    </ul>

                    <h2>3. Information Sharing</h2>
                    <p>We do NOT sell your personal information. We may share data with:</p>
                    <ul>
                        <li><strong>Service Providers:</strong> Payment processors, hosting services, analytics tools</li>
                        <li><strong>Course Instructors:</strong> Aggregated analytics about course performance (not individual identities)</li>
                        <li><strong>AI Providers:</strong> Groq API for AI features (covered by their privacy policy)</li>
                        <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
                    </ul>

                    <h2>4. Data Security</h2>
                    <p>We implement industry-standard security measures:</p>
                    <ul>
                        <li>Encryption of data in transit (HTTPS/TLS)</li>
                        <li>Secure password hashing</li>
                        <li>Regular security audits</li>
                        <li>Access controls and authentication</li>
                        <li>Backup and disaster recovery procedures</li>
                    </ul>
                    <p>
                        However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
                    </p>

                    <h2>5. Your Rights and Choices</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li><strong>Access:</strong> Request a copy of your personal data</li>
                        <li><strong>Correction:</strong> Update inaccurate information</li>
                        <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                        <li><strong>Portability:</strong> Export your data in a common format</li>
                        <li><strong>Opt-out:</strong> Unsubscribe from marketing emails</li>
                        <li><strong>Limit Use:</strong> Restrict certain data processing</li>
                    </ul>
                    <p>To exercise these rights, contact us at privacy@studedu.com</p>

                    <h2>6. Cookies and Tracking</h2>
                    <p>
                        We use cookies and similar technologies to enhance your experience. See our <Link href="/cookies">Cookie Policy</Link> for details.
                    </p>

                    <h2>7. Children's Privacy</h2>
                    <p>
                        StudEdu is not intended for children under 13. We do not knowingly collect information from children. If you believe we have collected data from a child, please contact us immediately.
                    </p>

                    <h2>8. International Data Transfers</h2>
                    <p>
                        Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers.
                    </p>

                    <h2>9. Data Retention</h2>
                    <p>
                        We retain your information for as long as your account is active or as needed to provide services. After account deletion, we may retain certain data for legal and business purposes.
                    </p>

                    <h2>10. Third-Party Links</h2>
                    <p>
                        Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these sites. Please review their privacy policies.
                    </p>

                    <h2>11. Changes to Privacy Policy</h2>
                    <p>
                        We may update this policy periodically. We will notify you of significant changes via email or platform notification. Continued use after changes constitutes acceptance.
                    </p>

                    <h2>12. Contact Us</h2>
                    <p>For privacy-related questions or concerns:</p>
                    <ul>
                        <li>Email: privacy@studedu.com</li>
                        <li>Data Protection Officer: dpo@studedu.com</li>
                        <li>Address: 123 Education Street, San Francisco, CA 94102</li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
