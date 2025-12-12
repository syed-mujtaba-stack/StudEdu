import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link, useParams, Redirect } from "wouter";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, User } from "lucide-react";
import { getBlogPost, getRelatedPosts } from "@/lib/blog-data";

export default function BlogPost() {
    const params = useParams<{ slug: string }>();
    const post = getBlogPost(params.slug || "");
    const relatedPosts = getRelatedPosts(params.slug || "", 3);

    if (!post) {
        return <Redirect to="/blog" />;
    }

    // Convert markdown-like content to HTML-safe rendering
    const renderContent = (content: string) => {
        return content
            .split('\n')
            .map((line, i) => {
                // Headers
                if (line.startsWith('### ')) {
                    return <h3 key={i} className="text-xl font-bold mt-8 mb-4">{line.slice(4)}</h3>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={i} className="text-2xl font-bold mt-10 mb-4">{line.slice(3)}</h2>;
                }
                // Blockquotes
                if (line.startsWith('> ')) {
                    return (
                        <blockquote key={i} className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                            {line.slice(2)}
                        </blockquote>
                    );
                }
                // List items
                if (line.startsWith('- **')) {
                    const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
                    if (match) {
                        return (
                            <li key={i} className="ml-4 my-2">
                                <strong>{match[1]}</strong>: {match[2]}
                            </li>
                        );
                    }
                }
                if (line.startsWith('- ')) {
                    return <li key={i} className="ml-4 my-1">{line.slice(2)}</li>;
                }
                // Numbered list
                const numberMatch = line.match(/^(\d+)\.\s*\*\*(.+?)\*\*/);
                if (numberMatch) {
                    return (
                        <li key={i} className="ml-4 my-2 list-decimal">
                            <strong>{numberMatch[2]}</strong>
                        </li>
                    );
                }
                if (line.match(/^\d+\.\s/)) {
                    return <li key={i} className="ml-4 my-1 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
                }
                // Bold text in paragraphs
                if (line.includes('**')) {
                    const parts = line.split(/\*\*(.+?)\*\*/g);
                    return (
                        <p key={i} className="my-3 leading-relaxed">
                            {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
                        </p>
                    );
                }
                // Regular paragraphs
                if (line.trim() && !line.startsWith('#')) {
                    return <p key={i} className="my-3 leading-relaxed">{line}</p>;
                }
                return null;
            })
            .filter(Boolean);
    };

    return (
        <Layout>
            <article className="container px-4 md:px-6 py-8 max-w-4xl mx-auto">
                {/* Back Button */}
                <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-8">
                    <Badge className="mb-4">{post.category}</Badge>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                        {post.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-foreground font-medium text-sm">{post.author.name}</p>
                                <p className="text-xs">{post.author.role}</p>
                            </div>
                        </div>
                        <span className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                            <Clock className="h-4 w-4" /> {post.readTime}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-2" /> Share
                        </Button>
                        <Button variant="outline" size="sm">
                            <Bookmark className="h-4 w-4 mr-2" /> Save
                        </Button>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="aspect-video rounded-2xl overflow-hidden mb-10">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                    {renderContent(post.content)}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b">
                    {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedPosts.map(related => (
                                <Link
                                    key={related.id}
                                    href={`/blog/${related.slug}`}
                                    className="group"
                                >
                                    <article className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="aspect-video overflow-hidden">
                                            <img
                                                src={related.image}
                                                alt={related.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <Badge variant="secondary" className="mb-2 text-xs">{related.category}</Badge>
                                            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                                                {related.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground mt-2">{related.readTime}</p>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </Layout>
    );
}
