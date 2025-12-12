import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
    return (
        <Layout>
            <div className="container px-4 md:px-6 py-16 max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
                </Link>

                <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
                <p className="text-muted-foreground mb-8">Last updated: December 12, 2025</p>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using StudEdu ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>

                    <h2>2. Use License</h2>
                    <p>
                        Permission is granted to temporarily access the materials (information or software) on StudEdu's platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul>
                        <li>Modify or copy the materials</li>
                        <li>Use the materials for any commercial purpose or public display</li>
                        <li>Attempt to decompile or reverse engineer any software on the platform</li>
                        <li>Remove any copyright or proprietary notations from the materials</li>
                        <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                    </ul>

                    <h2>3. User Accounts</h2>
                    <p>
                        When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                    </p>
                    <p>
                        You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                    </p>

                    <h2>4. Course Content</h2>
                    <p>
                        All course materials, including videos, texts, images, and other content provided through StudEdu, are the intellectual property of StudEdu or its content creators. Users may:
                    </p>
                    <ul>
                        <li>Access purchased courses for personal learning</li>
                        <li>Download materials for offline viewing where permitted</li>
                        <li>Take notes and create personal study materials</li>
                    </ul>
                    <p>Users may NOT:</p>
                    <ul>
                        <li>Share account credentials with others</li>
                        <li>Redistribute, sell, or commercially exploit course content</li>
                        <li>Use content for training AI models or machine learning</li>
                    </ul>

                    <h2>5. Payment and Refunds</h2>
                    <p>
                        Courses are offered at the prices displayed on the platform. Payment must be made in full before access is granted. We offer a 30-day money-back guarantee for most courses, subject to our refund policy.
                    </p>

                    <h2>6. AI-Powered Features</h2>
                    <p>
                        StudEdu uses AI technology to enhance your learning experience. By using our AI features (tutor, quiz generator, summarizer, notes generator), you acknowledge that:
                    </p>
                    <ul>
                        <li>AI responses are generated automatically and may not always be accurate</li>
                        <li>Your interactions may be logged for service improvement</li>
                        <li>You should verify important information independently</li>
                    </ul>

                    <h2>7. Prohibited Uses</h2>
                    <p>You may not use StudEdu to:</p>
                    <ul>
                        <li>Violate any laws or regulations</li>
                        <li>Infringe on intellectual property rights</li>
                        <li>Transmit harmful code or malware</li>
                        <li>Harass, abuse, or harm others</li>
                        <li>Impersonate others or misrepresent your identity</li>
                        <li>Interfere with the proper functioning of the platform</li>
                    </ul>

                    <h2>8. Termination</h2>
                    <p>
                        We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the Service will immediately cease.
                    </p>

                    <h2>9. Limitation of Liability</h2>
                    <p>
                        StudEdu shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
                    </p>

                    <h2>10. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. We will notify users of any changes by posting the new Terms of Service on this page and updating the "Last updated" date.
                    </p>

                    <h2>11. Contact Us</h2>
                    <p>
                        If you have questions about these Terms, please contact us at:
                    </p>
                    <ul>
                        <li>Email: legal@studedu.com</li>
                        <li>Address: 123 Education Street, San Francisco, CA 94102</li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
