import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "./Item";
import { NoteList } from "../NoteList";
import UserItem from "./UserItem";
import { Plus, Search } from "lucide-react";
import { useCurrentUserStore } from "@/modules/auth/current-user.state";
import { useNoteStore } from "@/modules/notes/note.state";
import { noteRepository } from "@/modules/notes/note.repository";

type Props = {
  onSearchButtonClicked: () => void;
};

const SideBar: FC<Props> = ({ onSearchButtonClicked }) => {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUserStore();
  const noteStore = useNoteStore();

  const createNote = async () => {
    const newNote = await noteRepository.create(currentUser!.id, {});
    noteStore.set([newNote]);
    navigate(`notes/${newNote.id}`)
  };

  return (
    <>
      <aside className="group/sidebar h-full bg-neutral-100 overflow-y-auto relative flex flex-col w-60">
        <div>
          <div>
            <UserItem
              user={{
                id: "test",
                aud: "test",
                email: "test@gmail.com",
                user_metadata: { name: "testさん" },
                app_metadata: {},
                created_at: "test",
              }}
              signout={() => {}}
            />
            <Item label="検索" icon={Search} onClick={onSearchButtonClicked} />
          </div>
          <div className="mt-4">
            <NoteList />
            <Item label="ノートを作成" icon={Plus} onClick={createNote} />
          </div>
        </div>
      </aside>
      <div className="absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]"></div>
    </>
  );
};

export default SideBar;
