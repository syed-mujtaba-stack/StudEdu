import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    FileQuestion,
    Loader2,
    CheckCircle2,
    XCircle,
    RefreshCw,
    Copy,
    Check
} from 'lucide-react';
import { useAIRequest, AI_BACKEND_URL } from '@/hooks/useAIStream';
import { useAuth } from '@/lib/auth-context';

interface QuizQuestion {
    question: string;
    options: string[];
    correct_answer: number;
    explanation: string;
}

interface QuizResponse {
    questions: QuizQuestion[];
    topic: string | null;
    difficulty: string;
    model: string;
}

interface AIQuizGeneratorProps {
    lessonContent?: string;
    lessonTitle?: string;
}

export function AIQuizGenerator({ lessonContent, lessonTitle }: AIQuizGeneratorProps) {
    const [content, setContent] = useState(lessonContent || '');
    const [questionCount, setQuestionCount] = useState(5);
    const [difficulty, setDifficulty] = useState('medium');
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
    const [showResults, setShowResults] = useState(false);
    const [copied, setCopied] = useState(false);

    const { user } = useAuth();
    const { isLoading, error, data, execute, reset } = useAIRequest<QuizResponse>();

    const generateQuiz = async () => {
        if (!content.trim()) return;

        setSelectedAnswers({});
        setShowResults(false);

        const headers: Record<string, string> = {};
        if (user?.id) {
            headers['X-User-ID'] = user.id;
        }

        await execute(`${AI_BACKEND_URL}/api/ai/quiz/generate`, {
            content,
            count: questionCount,
            difficulty,
            topic: lessonTitle,
        }, headers);
    };

    const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
        if (showResults) return;
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: optionIndex,
        }));
    };

    const checkAnswers = () => {
        setShowResults(true);
    };

    const getScore = () => {
        if (!data?.questions) return { correct: 0, total: 0 };

        let correct = 0;
        data.questions.forEach((q, i) => {
            if (selectedAnswers[i] === q.correct_answer) {
                correct++;
            }
        });

        return { correct, total: data.questions.length };
    };

    const copyQuiz = async () => {
        if (!data?.questions) return;

        const quizText = data.questions.map((q, i) =>
            `${i + 1}. ${q.question}\n${q.options.map((o, j) => `   ${String.fromCharCode(65 + j)}) ${o}`).join('\n')}\n   Answer: ${String.fromCharCode(65 + q.correct_answer)}\n   ${q.explanation}`
        ).join('\n\n');

        await navigator.clipboard.writeText(quizText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const score = getScore();

    return (
        <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-4">
                {!data?.questions ? (
                    // Configuration View
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Content to generate quiz from</Label>
                            <Textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Paste your lesson content here..."
                                className="min-h-[150px] resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Number of Questions: {questionCount}</Label>
                            <Slider
                                value={[questionCount]}
                                onValueChange={(v) => setQuestionCount(v[0])}
                                min={3}
                                max={15}
                                step={1}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Difficulty</Label>
                            <RadioGroup value={difficulty} onValueChange={setDifficulty}>
                                <div className="flex gap-4">
                                    {['easy', 'medium', 'hard'].map((level) => (
                                        <div key={level} className="flex items-center space-x-2">
                                            <RadioGroupItem value={level} id={level} />
                                            <Label htmlFor={level} className="capitalize cursor-pointer">
                                                {level}
                                            </Label>
                                        </div>
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
                    // Quiz View
                    <div className="space-y-6">
                        {/* Score Display */}
                        {showResults && (
                            <div className={`p-4 rounded-xl text-center ${score.correct === score.total
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                    : score.correct >= score.total / 2
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                }`}>
                                <div className="text-2xl font-bold">{score.correct} / {score.total}</div>
                                <div className="text-sm">
                                    {score.correct === score.total ? '🎉 Perfect!' :
                                        score.correct >= score.total / 2 ? '👍 Good job!' : '📚 Keep studying!'}
                                </div>
                            </div>
                        )}

                        {/* Questions */}
                        {data.questions.map((question, qIndex) => (
                            <div key={qIndex} className="p-4 border rounded-xl space-y-3">
                                <div className="font-medium">
                                    {qIndex + 1}. {question.question}
                                </div>

                                <div className="space-y-2">
                                    {question.options.map((option, oIndex) => {
                                        const isSelected = selectedAnswers[qIndex] === oIndex;
                                        const isCorrect = question.correct_answer === oIndex;
                                        const showCorrectness = showResults;

                                        return (
                                            <button
                                                key={oIndex}
                                                onClick={() => handleAnswerSelect(qIndex, oIndex)}
                                                disabled={showResults}
                                                className={`w-full text-left p-3 rounded-lg border transition-all ${showCorrectness && isCorrect
                                                        ? 'bg-green-100 border-green-500 dark:bg-green-900/30'
                                                        : showCorrectness && isSelected && !isCorrect
                                                            ? 'bg-red-100 border-red-500 dark:bg-red-900/30'
                                                            : isSelected
                                                                ? 'bg-primary/10 border-primary'
                                                                : 'hover:bg-muted'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium w-6">
                                                        {String.fromCharCode(65 + oIndex)}.
                                                    </span>
                                                    <span className="flex-1">{option}</span>
                                                    {showCorrectness && isCorrect && (
                                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                                    )}
                                                    {showCorrectness && isSelected && !isCorrect && (
                                                        <XCircle className="h-5 w-5 text-red-600" />
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {showResults && (
                                    <div className="text-sm text-muted-foreground p-2 bg-muted rounded-lg">
                                        💡 {question.explanation}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </ScrollArea>

            {/* Actions */}
            <div className="p-4 border-t flex gap-2">
                {!data?.questions ? (
                    <Button
                        onClick={generateQuiz}
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
                                <FileQuestion className="mr-2 h-4 w-4" />
                                Generate Quiz
                            </>
                        )}
                    </Button>
                ) : (
                    <>
                        {!showResults ? (
                            <Button
                                onClick={checkAnswers}
                                disabled={Object.keys(selectedAnswers).length < data.questions.length}
                                className="flex-1"
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Check Answers
                            </Button>
                        ) : (
                            <>
                                <Button onClick={() => { reset(); setShowResults(false); }} variant="outline" className="flex-1">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    New Quiz
                                </Button>
                                <Button onClick={copyQuiz} variant="outline" size="icon">
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
