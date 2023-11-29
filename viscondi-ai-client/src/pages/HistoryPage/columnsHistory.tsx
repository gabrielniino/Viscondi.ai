// columnsHystory.tsx
import { ColumnDef } from "@tanstack/react-table";

export type HistoryUserVideo = {
    user_Id: string;
    video_Id: string;
    video: {
        name: string;
        path: string;
        transcription: string;
    };
};

export const columns: ColumnDef<HistoryUserVideo>[] = [
    // {
    //     accessorKey: "user_Id",
    //     header: "User ID",
    // },
    // {
    //     accessorKey: "video_Id",
    //     header: "Video ID",
    // },
    {
        accessorKey: "video.name",
        header: "Nome do Video",
    },
    {
        accessorKey: "video.path",
        header: "Caminho do arquivo",
    },
    {
        accessorKey: "video.transcription",
        header: "Trascricão do vídeo",
    },
];
