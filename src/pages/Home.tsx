import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { noteRepository } from "@/modules/notes/note.repository";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";
import { useNoteStore } from "@/modules/notes/note.state";

export function Home() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { currentUser } = useCurrentUserStore();

  const noteStore = useNoteStore();

  const createNote = async () => {
    const newNote = await noteRepository.create(currentUser!.id, { title });
    noteStore.set([newNote]);
    setTitle("");
    navigate(`/notes/${newNote.id}`);
  };

  return (
    <Card className="border-0 shadow-none w-1/2 m-auto">
      <CardHeader className="px-4 pb-3">
        <CardTitle className="text-lg font-medium">
          新しいノートを作成してみましょう
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <div className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-9 flex-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
            placeholder="ノートのタイトルを入力"
            type="text"
          />
          <button
            onClick={createNote}
            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            <span className="ml-1">ノート作成</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
