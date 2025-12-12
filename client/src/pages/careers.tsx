import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { MapPin, Clock, ArrowRight, Briefcase } from "lucide-react";

const JOBS = [
    { id: 1, title: "Senior Frontend Engineer", dept: "Engineering", location: "Remote", type: "Full-time" },
    { id: 2, title: "AI/ML Engineer", dept: "Engineering", location: "San Francisco, CA", type: "Full-time" },
    { id: 3, title: "Product Designer", dept: "Design", location: "Remote", type: "Full-time" },
    { id: 4, title: "Content Strategist", dept: "Marketing", location: "New York, NY", type: "Full-time" },
    { id: 5, title: "Customer Success Manager", dept: "Operations", location: "Remote", type: "Full-time" },
];

export default function Careers() {
    return (
        <Layout>
            <div className="container px-4 md:px-6 py-16">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Badge className="mb-4">We're Hiring!</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        Join Our Team
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Help us shape the future of education. We're looking for passionate people
                        who want to make a difference in how the world learns.
                    </p>
                </div>

                {/* Perks */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {[
                        { title: "Remote First", desc: "Work from anywhere in the world" },
                        { title: "Competitive Pay", desc: "Top-tier salary and equity packages" },
                        { title: "Learning Budget", desc: "$2,000/year for courses and conferences" },
                    ].map((perk) => (
                        <div key={perk.title} className="p-6 rounded-xl border bg-card text-center">
                            <h3 className="font-semibold text-lg mb-2">{perk.title}</h3>
                            <p className="text-muted-foreground text-sm">{perk.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Job Listings */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
                    <div className="space-y-4">
                        {JOBS.map((job) => (
                            <div
                                key={job.id}
                                className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                            >
                                <div>
                                    <h3 className="font-semibold text-lg">{job.title}</h3>
                                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Briefcase className="h-4 w-4" /> {job.dept}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" /> {job.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" /> {job.type}
                                        </span>
                                    </div>
                                </div>
                                <Button>
                                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* No Match CTA */}
                <div className="text-center bg-muted/50 rounded-2xl p-12">
                    <h2 className="text-xl font-bold mb-4">Don't see a role that fits?</h2>
                    <p className="text-muted-foreground mb-6">We're always looking for talented people. Send us your resume!</p>
                    <Button variant="outline">
                        Send General Application
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
