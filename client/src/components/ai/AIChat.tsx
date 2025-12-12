import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Bot,
    Send,
    X,
    MessageCircle,
    Loader2,
    Sparkles,
    FileQuestion,
    FileText,
    StickyNote,
    ChevronLeft
} from 'lucide-react';
import { useAIStream, AI_BACKEND_URL } from '@/hooks/useAIStream';
import { useAuth } from '@/lib/auth-context';
import { AIQuizGenerator } from './AIQuizGenerator';
import { AISummarizer } from './AISummarizer';
import { AINotesGenerator } from './AINotesGenerator';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

type AITool = 'tutor' | 'quiz' | 'summarizer' | 'notes';

interface AIChatProps {
    lessonContext?: string;
    lessonTitle?: string;
    courseTitle?: string;
}

const TOOLS = [
    { id: 'tutor' as AITool, name: 'AI Tutor', icon: Bot, description: 'Ask questions and learn interactively' },
    { id: 'quiz' as AITool, name: 'Quiz Generator', icon: FileQuestion, description: 'Generate practice quizzes' },
    { id: 'summarizer' as AITool, name: 'Summarizer', icon: FileText, description: 'Summarize lesson content' },
    { id: 'notes' as AITool, name: 'Notes Generator', icon: StickyNote, description: 'Create study notes' },
];

export function AIChat({ lessonContext, lessonTitle, courseTitle }: AIChatProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTool, setActiveTool] = useState<AITool | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();

    const { content, isStreaming, error, startStream, reset } = useAIStream({
        onDone: (fullContent) => {
            setMessages(prev => [...prev, { role: 'assistant', content: fullContent }]);
        }
    });

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, content]);

    const handleSend = async () => {
        if (!input.trim() || isStreaming || !activeTool) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        reset();

        const headers: Record<string, string> = {};
        if (user?.id) headers['X-User-ID'] = user.id;

        if (activeTool === 'tutor') {
            await startStream(`${AI_BACKEND_URL}/api/ai/tutor/chat`, {
                message: userMessage,
                history: messages,
                context: lessonContext,
                lesson_title: lessonTitle,
                course_title: courseTitle,
            }, headers);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleBack = () => { setActiveTool(null); setMessages([]); reset(); };
    const handleClose = () => { setIsOpen(false); setActiveTool(null); setMessages([]); reset(); };

    const renderToolContent = () => {
        switch (activeTool) {
            case 'tutor':
                return (
                    <>
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {messages.length === 0 && !isStreaming && (
                                    <div className="text-center text-muted-foreground py-8">
                                        <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                        <p className="text-sm">Hi! I'm your AI tutor.</p>
                                        <p className="text-xs mt-1">Ask me anything about your lesson.</p>
                                    </div>
                                )}
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted rounded-bl-md'
                                            }`}>
                                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                        </div>
                                    </div>
                                ))}
                                {isStreaming && content && (
                                    <div className="flex justify-start">
                                        <div className="max-w-[85%] rounded-2xl rounded-bl-md px-4 py-2 bg-muted">
                                            <p className="text-sm whitespace-pre-wrap">{content}</p>
                                        </div>
                                    </div>
                                )}
                                {isStreaming && !content && (
                                    <div className="flex justify-start">
                                        <div className="rounded-2xl rounded-bl-md px-4 py-2 bg-muted">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                    </div>
                                )}
                                {error && <div className="text-center text-destructive text-sm py-2">Error: {error}</div>}
                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>
                        <div className="p-4 border-t">
                            <div className="flex gap-2">
                                <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
                                    placeholder="Ask a question..." disabled={isStreaming} className="flex-1" />
                                <Button onClick={handleSend} disabled={!input.trim() || isStreaming} size="icon">
                                    {isStreaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                    </>
                );
            case 'quiz': return <AIQuizGenerator lessonContent={lessonContext} lessonTitle={lessonTitle} />;
            case 'summarizer': return <AISummarizer lessonContent={lessonContext} />;
            case 'notes': return <AINotesGenerator lessonContent={lessonContext} lessonTitle={lessonTitle} />;
            default: return null;
        }
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                size="icon">
                <Sparkles className="h-6 w-6" />
            </Button>

            {isOpen && (
                <div className="fixed bottom-0 right-0 w-full h-full sm:bottom-24 sm:right-6 sm:w-[400px] sm:h-[600px] bg-background border sm:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
                    <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/10 to-purple-600/10">
                        <div className="flex items-center gap-2">
                            {activeTool && (
                                <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                            )}
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                                <Bot className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">
                                    {activeTool ? TOOLS.find(t => t.id === activeTool)?.name : 'StudEdu AI'}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    {activeTool ? 'Powered by OpenRouter' : 'Choose a tool to get started'}
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {!activeTool ? (
                        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                            <p className="text-sm text-muted-foreground mb-4">Choose an AI tool to help with your learning:</p>
                            {TOOLS.map((tool) => {
                                const Icon = tool.icon;
                                return (
                                    <button key={tool.id} onClick={() => setActiveTool(tool.id)}
                                        className="w-full p-4 rounded-xl border bg-card hover:bg-accent transition-colors text-left group">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                <Icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium">{tool.name}</h4>
                                                <p className="text-xs text-muted-foreground">{tool.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    ) : renderToolContent()}
                </div>
            )}
        </>
    );
}
