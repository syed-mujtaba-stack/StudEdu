import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    StickyNote,
    Loader2,
    Copy,
    Check,
    Download,
    Sparkles
} from 'lucide-react';
import { useAIStream, useAIRequest, AI_BACKEND_URL } from '@/hooks/useAIStream';
import { useAuth } from '@/lib/auth-context';

interface NotesResponse {
    notes: string;
    detail_level: string;
    model: string;
    lesson_title: string | null;
}

interface AINotesGeneratorProps {
    lessonContent?: string;
    lessonTitle?: string;
}

type DetailLevel = 'brief' | 'standard' | 'comprehensive';

const DETAIL_OPTIONS = [
    { value: 'brief', label: 'Brief', description: 'Essential points only' },
    { value: 'standard', label: 'Standard', description: 'Balanced coverage' },
    { value: 'comprehensive', label: 'Detailed', description: 'In-depth notes' },
];

export function AINotesGenerator({ lessonContent, lessonTitle: initialTitle }: AINotesGeneratorProps) {
    const [content, setContent] = useState(lessonContent || '');
    const [lessonTitle, setLessonTitle] = useState(initialTitle || '');
    const [detailLevel, setDetailLevel] = useState<DetailLevel>('standard');
    const [includeExamples, setIncludeExamples] = useState(true);
    const [includeSummary, setIncludeSummary] = useState(true);
    const [useStreaming, setUseStreaming] = useState(true);
    const [copied, setCopied] = useState(false);

    const { user } = useAuth();

    // Streaming hook
    const stream = useAIStream();

    // Non-streaming hook
    const request = useAIRequest<NotesResponse>();

    const isLoading = stream.isStreaming || request.isLoading;
    const notes = useStreaming ? stream.content : (request.data?.notes || '');
    const error = stream.error || request.error;

    const generateNotes = async () => {
        if (!content.trim()) return;

        const headers: Record<string, string> = {};
        if (user?.id) {
            headers['X-User-ID'] = user.id;
        }

        const body = {
            content,
            detail_level: detailLevel,
            include_examples: includeExamples,
            include_summary: includeSummary,
            lesson_title: lessonTitle || null,
            stream: useStreaming,
        };

        if (useStreaming) {
            stream.reset();
            await stream.startStream(`${AI_BACKEND_URL}/api/ai/notes/generate`, body, headers);
        } else {
            request.reset();
            await request.execute(`${AI_BACKEND_URL}/api/ai/notes/generate`, body, headers);
        }
    };

    const copyToClipboard = async () => {
        if (!notes) return;
        await navigator.clipboard.writeText(notes);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadAsMarkdown = () => {
        if (!notes) return;

        const filename = lessonTitle
            ? `${lessonTitle.toLowerCase().replace(/\s+/g, '-')}-notes.md`
            : 'study-notes.md';

        const blob = new Blob([notes], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleReset = () => {
        stream.reset();
        request.reset();
    };

    return (
        <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-4">
                {!notes ? (
                    // Input View
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label>Lesson Title (optional)</Label>
                            <Input
                                value={lessonTitle}
                                onChange={(e) => setLessonTitle(e.target.value)}
                                placeholder="e.g., Introduction to React Hooks"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Lesson Content</Label>
                            <Textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Paste your lesson content here..."
                                className="min-h-[140px] resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Detail Level</Label>
                            <RadioGroup value={detailLevel} onValueChange={(v) => setDetailLevel(v as DetailLevel)}>
                                <div className="grid grid-cols-3 gap-2">
                                    {DETAIL_OPTIONS.map((option) => (
                                        <label
                                            key={option.value}
                                            className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-colors text-center ${detailLevel === option.value ? 'border-primary bg-primary/5' : 'hover:bg-muted'
                                                }`}
                                        >
                                            <RadioGroupItem value={option.value} className="sr-only" />
                                            <div className="font-medium text-sm">{option.label}</div>
                                            <div className="text-xs text-muted-foreground">{option.description}</div>
                                        </label>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="examples" className="cursor-pointer">Include Examples</Label>
                                <Switch
                                    id="examples"
                                    checked={includeExamples}
                                    onCheckedChange={setIncludeExamples}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <Label htmlFor="summary" className="cursor-pointer">Include Summary</Label>
                                <Switch
                                    id="summary"
                                    checked={includeSummary}
                                    onCheckedChange={setIncludeSummary}
                                />
                            </div>
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
                                <span>Study Notes</span>
                            </div>
                            <div className="flex gap-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={copyToClipboard}
                                    className="h-8"
                                >
                                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={downloadAsMarkdown}
                                    className="h-8"
                                >
                                    <Download className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>

                        <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-muted/50 rounded-xl">
                            <div className="whitespace-pre-wrap">{notes}</div>
                        </div>

                        {stream.isStreaming && (
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Generating notes...</span>
                            </div>
                        )}
                    </div>
                )}
            </ScrollArea>

            {/* Actions */}
            <div className="p-4 border-t flex gap-2">
                {!notes ? (
                    <Button
                        onClick={generateNotes}
                        disabled={!content.trim() || isLoading}
                        className="flex-1"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <StickyNote className="mr-2 h-4 w-4" />
                                Generate Notes
                            </>
                        )}
                    </Button>
                ) : (
                    <Button
                        onClick={handleReset}
                        variant="outline"
                        className="flex-1"
                    >
                        Generate New Notes
                    </Button>
                )}
            </div>
        </div>
    );
}
