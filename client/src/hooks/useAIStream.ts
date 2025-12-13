import { useState, useCallback, useRef } from 'react';

interface StreamState {
    content: string;
    isStreaming: boolean;
    error: string | null;
    done: boolean;
}

interface UseAIStreamOptions {
    onChunk?: (chunk: string) => void;
    onDone?: (fullContent: string) => void;
    onError?: (error: string) => void;
}

/**
 * Custom hook for handling streaming AI responses.
 * Works with Server-Sent Events from the FastAPI backend.
 */
export function useAIStream(options: UseAIStreamOptions = {}) {
    const [state, setState] = useState<StreamState>({
        content: '',
        isStreaming: false,
        error: null,
        done: false,
    });

    const abortControllerRef = useRef<AbortController | null>(null);

    const startStream = useCallback(async (
        url: string,
        body: Record<string, unknown>,
        headers: Record<string, string> = {}
    ) => {
        // Abort any existing stream
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        setState({
            content: '',
            isStreaming: true,
            error: null,
            done: false,
        });

        console.log("Starting AI stream to:", url); // Debug URL

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: JSON.stringify(body),
                signal: abortControllerRef.current.signal,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}`);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) {
                throw new Error('No response body');
            }

            let fullContent = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                const text = decoder.decode(value, { stream: true });
                const lines = text.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));

                            if (data.error) {
                                throw new Error(data.error);
                            }

                            if (data.content) {
                                fullContent += data.content;
                                setState(prev => ({
                                    ...prev,
                                    content: fullContent,
                                }));
                                options.onChunk?.(data.content);
                            }

                            if (data.done) {
                                setState(prev => ({
                                    ...prev,
                                    isStreaming: false,
                                    done: true,
                                }));
                                options.onDone?.(fullContent);
                            }
                        } catch (e) {
                            if (e instanceof SyntaxError) continue;
                            throw e;
                        }
                    }
                }
            }
        } catch (error) {
            if ((error as Error).name === 'AbortError') {
                setState(prev => ({ ...prev, isStreaming: false }));
                return;
            }

            const errorMessage = (error as Error).message || 'Stream failed';
            setState(prev => ({
                ...prev,
                isStreaming: false,
                error: errorMessage,
            }));
            options.onError?.(errorMessage);
        }
    }, [options]);

    const stopStream = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        setState(prev => ({ ...prev, isStreaming: false }));
    }, []);

    const reset = useCallback(() => {
        stopStream();
        setState({
            content: '',
            isStreaming: false,
            error: null,
            done: false,
        });
    }, [stopStream]);

    return {
        ...state,
        startStream,
        stopStream,
        reset,
    };
}

/**
 * Hook for non-streaming AI requests.
 */
export function useAIRequest<T>() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    const execute = useCallback(async (
        url: string,
        body: Record<string, unknown>,
        headers: Record<string, string> = {}
    ): Promise<T | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}`);
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            const message = (err as Error).message || 'Request failed';
            setError(message);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setIsLoading(false);
        setError(null);
        setData(null);
    }, []);

    return {
        isLoading,
        error,
        data,
        execute,
        reset,
    };
}

// AI Backend base URL
// In production, always use the live backend URL to avoid local config leaks
export const AI_BACKEND_URL = (import.meta.env.PROD
    ? 'https://stud-edu.vercel.app'
    : (import.meta.env.VITE_AI_BACKEND_URL || 'http://localhost:8000')).replace(/\/$/, '');
