import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    FileText,
    Loader2,
    Copy,
    Check,
    Sparkles
} from 'lucide-react';
import { useAIStream, useAIRequest, AI_BACKEND_URL } from '@/hooks/useAIStream';
import { useAuth } from '@/lib/auth-context';

interface SummarizeResponse {
    summary: string;
    format: string;
    model: string;
    word_count: number;
}

interface AISummarizerProps {
    lessonContent?: string;
}

type SummaryFormat = 'bullets' | 'paragraph' | 'concepts';

const FORMAT_OPTIONS = [
    { value: 'bullets', label: 'Bullet Points', description: 'Concise bullet points' },
    { value: 'paragraph', label: 'Paragraph', description: 'Flowing paragraphs' },
    { value: 'concepts', label: 'Key Concepts', description: 'Concepts & definitions' },
];

export function AISummarizer({ lessonContent }: AISummarizerProps) {
    const [content, setContent] = useState(lessonContent || '');
    const [format, setFormat] = useState<SummaryFormat>('bullets');
    const [useStreaming, setUseStreaming] = useState(true);
    const [copied, setCopied] = useState(false);

    const { user } = useAuth();

    // Streaming hook
    const stream = useAIStream();

    // Non-streaming hook
    const request = useAIRequest<SummarizeResponse>();

    const isLoading = stream.isStreaming || request.isLoading;
    const summary = useStreaming ? stream.content : (request.data?.summary || '');
    const error = stream.error || request.error;

    const summarize = async () => {
        if (!content.trim()) return;

        const headers: Record<string, string> = {};
        if (user?.id) {
            headers['X-User-ID'] = user.id;
        }

        if (useStreaming) {
            stream.reset();
            await stream.startStream(`${AI_BACKEND_URL}/api/ai/summarize`, {
                content,
                format,
                stream: true,
            }, headers);
        } else {
            request.reset();
            await request.execute(`${AI_BACKEND_URL}/api/ai/summarize`, {
                content,
                format,
                stream: false,
            }, headers);
        }
    };

    const copyToClipboard = async () => {
        if (!summary) return;
        await navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        stream.reset();
        request.reset();
    };

    return (
        <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-4">
                {!summary ? (
                    // Input View
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Content to summarize</Label>
                            <Textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Paste the text you want to summarize..."
                                className="min-h-[180px] resize-none"
                            />
                            <p className="text-xs text-muted-foreground">
                                {content.split(/\s+/).filter(Boolean).length} words
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label>Summary Format</Label>
                            <RadioGroup value={format} onValueChange={(v) => setFormat(v as SummaryFormat)}>
                                <div className="grid gap-2">
                                    {FORMAT_OPTIONS.map((option) => (
                                        <label
                                            key={option.value}
                                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${format === option.value ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                                                }`}
                                        >
                                            <RadioGroupItem value={option.value} className="mr-3" />
                                            <div>
                                                <div className="font-medium text-sm">{option.label}</div>
                                                <div className="text-xs text-muted-foreground">{option.description}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>

                        {error && (
                            <div className="text-destructive text-sm p-3 bg-destructive/10 rounded-lg">
                                {error}
                            </div>
                        )}
                    </div>
                ) : (
                    // Result View
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Sparkles className="h-4 w-4" />
                                <span>AI Summary ({format})</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={copyToClipboard}
                                className="h-8"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-3 w-3 mr-1" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3 w-3 mr-1" />
                                        Copy
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-muted/50 rounded-xl">
                            <div className="whitespace-pre-wrap">{summary}</div>
                        </div>

                        {request.data?.word_count && (
                            <p className="text-xs text-muted-foreground text-center">
                                Summary: {request.data.word_count} words
                            </p>
                        )}

                        {stream.isStreaming && (
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Generating...</span>
                            </div>
                        )}
                    </div>
                )}
            </ScrollArea>

            {/* Actions */}
            <div className="p-4 border-t flex gap-2">
                {!summary ? (
                    <Button
                        onClick={summarize}
                        disabled={!content.trim() || isLoading}
                        className="flex-1"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Summarizing...
                            </>
                        ) : (
                            <>
                                <FileText className="mr-2 h-4 w-4" />
                                Summarize
                            </>
                        )}
                    </Button>
                ) : (
                    <Button
                        onClick={handleReset}
                        variant="outline"
                        className="flex-1"
                    >
                        Summarize New Content
                    </Button>
                )}
            </div>
        </div>
    );
}
