import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Building2, Users, Target, Award, ArrowRight } from "lucide-react";

export default function About() {
    return (
        <Layout>
            <div className="container px-4 md:px-6 py-16">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        About <span className="text-primary">StudEdu</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We're on a mission to make quality education accessible to everyone, everywhere.
                        StudEdu combines AI-powered learning with expert-led courses to help you achieve your goals.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {[
                        { value: "50K+", label: "Students" },
                        { value: "200+", label: "Courses" },
                        { value: "95%", label: "Satisfaction" },
                        { value: "50+", label: "Countries" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center p-6 rounded-xl bg-muted/50">
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                            <div className="text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Values */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Target, title: "Mission-Driven", desc: "Every decision we make centers around student success" },
                            { icon: Users, title: "Community First", desc: "Learning is better together - we foster connection" },
                            { icon: Award, title: "Excellence", desc: "We partner with industry leaders for top-tier content" },
                            { icon: Building2, title: "Innovation", desc: "AI-powered tools that adapt to your learning style" },
                        ].map((value) => (
                            <div key={value.title} className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
                                <value.icon className="h-10 w-10 text-primary mb-4" />
                                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                                <p className="text-muted-foreground text-sm">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl p-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start learning?</h2>
                    <p className="text-muted-foreground mb-6">Join thousands of students already learning on StudEdu</p>
                    <Button size="lg" asChild>
                        <Link href="/signup">
                            Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
