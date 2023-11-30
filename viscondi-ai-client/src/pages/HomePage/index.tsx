import { Wand2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCompletion } from 'ai/react';
import { Label } from '@radix-ui/react-label';
import { Separator } from '@radix-ui/react-separator';
import { PromptSelect } from './prompt-select';
import { VideoInputForm } from './video-input-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/ui/Header';
import { useAuth } from '@/hooks/useAuth';

interface VideoType {
    id: string;
    name: string;
    path: string;
    transcription: string;
}

export function HomePage({ selectedVideo }: { selectedVideo?: VideoType }) {
    const { user } = useAuth();
    const [temperature] = useState(0.5);
    const [videoId, setVideoId] = useState<string>('');
    const [transcription, setTranscription] = useState<string>('');
    const [input, setInput] = useState<string>('');
    const [completion, setCompletion] = useState<string>('');
    const { handleInputChange, handleSubmit, isLoading } = useCompletion({
        api: 'http://localhost:3333/ai/complete',
        body: {
            videoId: selectedVideo?.id || '', // Use selectedVideo?.id or an empty string
            temperature,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const onVideoUploaded = (uploadedVideoId: string, uploadedTranscription: string) => {
        setVideoId(uploadedVideoId);
        setTranscription(uploadedTranscription);
    };

    useEffect(() => {
        if (selectedVideo) {
            setVideoId(selectedVideo.id);
            setTranscription(selectedVideo.transcription);
        } else {
            setVideoId('');
            setTranscription('');
        }
    }, [selectedVideo]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 p-6 flex gap-6">
                <div className="flex flex-col flex-1 gap-4">
                    <div className="grid grid-rows-3 gap-4 flex-1">
                        <Textarea
                            className="resize-none p-4 leading-relaxed min-h-[160px]"
                            placeholder="Resultado da transcrição..."
                            readOnly
                            value={transcription}
                        />
                        <Textarea
                            className="resize-none p-4 leading-relaxed"
                            placeholder="Inclua o prompt para a IA..."
                            value={input}
                            onChange={handleInputChange}
                        />
                        <Textarea
                            className="resize-none p-4 leading-relaxed min-h-[160px]"
                            placeholder="Resultado gerado pela IA..."
                            readOnly
                            value={completion}
                        />
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Lembre-se: você pode utilizar a variável{' '}
                        <code className="text-yellow-400">{`{transcription}`}</code> no seu prompt para adicionar o conteúdo da
                        transcrição do vídeo selecionado.
                    </p>
                </div>

                <aside className="w-80 space-y-6">
                    <VideoInputForm user={user} onVideoUploaded={onVideoUploaded} />
                    <Separator />
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label>Prompt</Label>
                            <PromptSelect onPromptSelected={setInput} />
                        </div>
                        <div className="space-y-2">
                            <Label>Modelo</Label>
                            <Select disabled defaultValue="gpt3.5">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="block text-sm text-muted-foreground italic">
                                Você poderá customizar essa opção em breve...
                            </span>
                        </div>
                        <Separator />
                        <Separator />
                        <Button disabled={isLoading} type="submit" className="w-full">
                            Executar <Wand2 className="w-4 h-4 ml-2" />
                        </Button>
                    </form>
                </aside>
            </main>
        </div>
    );
}
