import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
    Building2, Users, BarChart3, Shield, Headphones,
    CheckCircle2, ArrowRight, Zap
} from "lucide-react";

export default function Business() {
    return (
        <Layout>
            <div className="container px-4 md:px-6 py-16">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Badge className="mb-4">Enterprise Solutions</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        StudEdu for <span className="text-primary">Business</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        Empower your team with world-class learning. Scale skills across your organization
                        with our enterprise learning platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg">
                            Request Demo <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline">
                            Contact Sales
                        </Button>
                    </div>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {[
                        { icon: Users, title: "Team Management", desc: "Easily manage learners, assign courses, and track progress across your organization" },
                        { icon: BarChart3, title: "Analytics Dashboard", desc: "Detailed insights into learning engagement, completion rates, and skill development" },
                        { icon: Shield, title: "Enterprise Security", desc: "SSO integration, SOC 2 compliance, and advanced data protection" },
                        { icon: Building2, title: "Custom Branding", desc: "White-label solution with your company branding and custom domain" },
                        { icon: Headphones, title: "Dedicated Support", desc: "Priority support with dedicated customer success manager" },
                        { icon: Zap, title: "API Access", desc: "Integrate with your existing HR and LMS systems seamlessly" },
                    ].map((feature) => (
                        <div key={feature.title} className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-colors">
                            <feature.icon className="h-10 w-10 text-primary mb-4" />
                            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Pricing Tiers */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-4">Simple, transparent pricing</h2>
                    <p className="text-muted-foreground text-center mb-12">Choose the plan that fits your team</p>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { name: "Team", price: "$15", period: "per user/month", users: "5-50 users", features: ["All courses", "Basic analytics", "Email support"] },
                            { name: "Business", price: "$25", period: "per user/month", users: "50-500 users", features: ["All courses", "Advanced analytics", "SSO", "Priority support", "Custom learning paths"], popular: true },
                            { name: "Enterprise", price: "Custom", period: "contact us", users: "500+ users", features: ["Everything in Business", "Dedicated CSM", "API access", "Custom branding", "SLA guarantee"] },
                        ].map((plan) => (
                            <div
                                key={plan.name}
                                className={`p-8 rounded-2xl border ${plan.popular ? 'border-primary bg-primary/5 ring-2 ring-primary' : 'bg-card'}`}
                            >
                                {plan.popular && <Badge className="mb-4">Most Popular</Badge>}
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{plan.users}</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground"> {plan.period}</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                                    Get Started
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl p-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to upskill your team?</h2>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        Join 500+ companies already using StudEdu to develop their workforce
                    </p>
                    <Button size="lg">
                        Talk to Sales <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
