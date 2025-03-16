import { askClaude } from "@/actions/ask-claude";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { addTaskAtom, Task, tasksAtom } from "./tasks";

export type NotesTab = "paste" | "upload";

export const notesAtom = atomWithStorage<string>("notes", "");
export const uploadedFileAtom = atom<File | null>(null);
export const activeTabAtom = atom<NotesTab>("paste");
export const isProcessingAtom = atom<boolean>(false);

export const processNotesAtom = atom(
  (get) => ({
    notes: get(notesAtom),
    isProcessing: get(isProcessingAtom),
    activeTab: get(activeTabAtom),
    uploadedFile: get(uploadedFileAtom),
  }),
  async (get, set) => {
    const notes = get(notesAtom);
    const activeTab = get(activeTabAtom);
    const uploadedFile = get(uploadedFileAtom);

    // Clear existing tasks
    set(tasksAtom, []);

    try {
      set(isProcessingAtom, true);

      let response;
      if (activeTab === "paste") {
        if (!notes.trim()) return;
        response = await askClaude(notes);
      } else {
        if (!uploadedFile) return;
        response = await askClaude(uploadedFile);
      }

      const tasks = response as Task[];
      tasks.forEach((task) => {
        set(addTaskAtom, task);
      });
    } catch (error) {
      console.error("Failed to process notes:", error);
    } finally {
      set(isProcessingAtom, false);

      if (activeTab === "upload") {
        set(uploadedFileAtom, null);
      }
    }
  },
);
