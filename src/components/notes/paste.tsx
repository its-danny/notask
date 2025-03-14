import { notesAtom } from "@/atoms/notes";
import { TextArea } from "@radix-ui/themes";
import { useAtom } from "jotai";

export default function Paste() {
  const [notes, setNotes] = useAtom(notesAtom);

  return (
    <TextArea
      rows={10}
      autoFocus
      placeholder="We need to do the thing; today!"
      value={notes}
      onChange={(ev) => setNotes(ev.target.value)}
    />
  );
}
