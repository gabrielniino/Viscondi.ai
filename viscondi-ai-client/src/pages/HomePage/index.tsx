import { Wand2 } from 'lucide-react';
import { useState } from "react";
import { useCompletion } from 'ai/react';
import { Label } from '@radix-ui/react-label';
import { Separator } from '@radix-ui/react-separator';
import { PromptSelect } from './prompt-select';
import { VideoInputForm } from './video-input-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenuDemo } from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';


export function HomePage() {
    const [temperature] = useState(0.5);
    const [videoId, setVideoId] = useState<string | null>(null);
    const [transcription, setTranscription] = useState<string>("");

    const {
        input, setInput, handleInputChange, handleSubmit, completion, isLoading,
    } = useCompletion({
        api: 'http://localhost:3333/ai/complete',
        body: {
            videoId,
            temperature,
        },
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const onVideoUploaded = (videoId: string, transcription: string) => {
        setVideoId(videoId);
        setTranscription(transcription);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="px-6 py-3 flex items-center justify-between border-b">
                <h1 className="text-xl font-bold">Viscondi.ai</h1>
                <DropdownMenuDemo />
            </div>

            <main className="flex-1 p-6 flex gap-6">
                <div className="flex flex-col flex-1 gap-4">
                    <div className="grid grid-rows-3 gap-4 flex-1">
                        <Textarea
                            className="resize-none p-4 leading-relaxed min-h-[160px]"
                            placeholder="Resultado da transcrição..."
                            readOnly
                            value={transcription} />
                        {/* {
                transcription && transcription?.length > 0 && (
                    <Textarea
                    className="resize-none p-4 leading-relaxed"
                    placeholder="Transcrição"
                    value={transcription || ""}
                    />
                )
                } */}
                        <Textarea
                            className="resize-none p-4 leading-relaxed"
                            placeholder="Inclua o prompt para a IA..."
                            value={input}
                            onChange={handleInputChange} />
                        <Textarea
                            className="resize-none p-4 leading-relaxed min-h-[160px]"
                            placeholder="Resultado gerado pela IA..."
                            readOnly
                            value={completion} />
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Lembre-se: você pode utilizar a variável <code className="text-yellow-400">{`{transcription}`}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
                    </p>
                </div>

                <aside className="w-80 space-y-6">
                    <VideoInputForm onVideoUploaded={onVideoUploaded} />

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

                        {/* <div className="space-y-4">
                    <Label>Temperatura</Label>
                    <Slider
                        min={0}
                        max={1}
                        step={0.1}
                        value={[temperature]}
                        onValueChange={value => setTemperature(value[0])}
                    />
                    <span className="block text-sm text-muted-foreground italic leading-relaxed">
                        Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.
                    </span>
                </div> */}

                        <Separator />

                        <Button disabled={isLoading} type="submit" className="w-full">
                            Executar
                            <Wand2 className="w-4 h-4 ml-2" />
                        </Button>
                    </form>
                </aside>
            </main>
            {/* <div className="px-6 py-3 flex items-center justify-between border-b-top">
                <h1 className="text-xl font-bold">Viscondi.ai</h1>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                        Desenvolvido por Nino
                    </span>

                    <Separator orientation="vertical" className="h-6" />

                    <Button variant="outline">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                    </Button>

                </div>
            </div> */}
        </div>
    );
}