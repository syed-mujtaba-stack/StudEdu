import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Calendar, Clock, User, Search } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { useState } from "react";

export default function Blog() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = Array.from(new Set(BLOG_POSTS.map(post => post.category)));

    const filteredPosts = BLOG_POSTS.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <Layout>
            <div className="container px-4 md:px-6 py-16">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        StudEdu Blog
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Insights, tips, and stories about learning, technology, and career growth.
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-4xl mx-auto">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Badge
                            variant={selectedCategory === null ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setSelectedCategory(null)}
                        >
                            All
                        </Badge>
                        {categories.map(cat => (
                            <Badge
                                key={cat}
                                variant={selectedCategory === cat ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Featured Post */}
                {filteredPosts.length > 0 && !searchQuery && !selectedCategory && (
                    <Link
                        href={`/blog/${filteredPosts[0].slug}`}
                        className="block mb-12"
                    >
                        <article className="grid md:grid-cols-2 gap-8 p-6 rounded-2xl border bg-card hover:shadow-xl transition-shadow group">
                            <div className="aspect-video md:aspect-auto rounded-xl overflow-hidden">
                                <img
                                    src={filteredPosts[0].image}
                                    alt={filteredPosts[0].title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <Badge className="w-fit mb-4">Featured</Badge>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                                    {filteredPosts[0].title}
                                </h2>
                                <p className="text-muted-foreground mb-4 line-clamp-3">
                                    {filteredPosts[0].excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <User className="h-4 w-4" /> {filteredPosts[0].author.name}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" /> {filteredPosts[0].date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" /> {filteredPosts[0].readTime}
                                    </span>
                                </div>
                            </div>
                        </article>
                    </Link>
                )}

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(searchQuery || selectedCategory ? filteredPosts : filteredPosts.slice(1)).map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group"
                        >
                            <article className="h-full rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                                    <h2 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <User className="h-3 w-3" /> {post.author.name}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" /> {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" /> {post.readTime}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* No Results */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        <p className="text-lg">No articles found matching your search.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                            className="text-primary hover:underline mt-2"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
}
