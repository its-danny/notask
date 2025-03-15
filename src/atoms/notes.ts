import { askClaude } from "@/actions/ask-claude";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { addTaskAtom, Task } from "./tasks";

export const notesAtom = atomWithStorage<string>("notes", "");

export const isProcessingAtom = atom<boolean>(false);

export const processNotesAtom = atom(
  (get) => ({
    notes: get(notesAtom),
    isProcessing: get(isProcessingAtom),
  }),
  async (get, set) => {
    const notes = get(notesAtom);

    if (!notes.trim()) return;

    try {
      set(isProcessingAtom, true);

      const response = await askClaude(notes);
      const tasks = response as Task[];

      tasks.forEach((task) => {
        set(addTaskAtom, task);
      });
    } catch (error) {
      console.error("Failed to process notes:", error);
    } finally {
      set(isProcessingAtom, false);
    }
  },
);
