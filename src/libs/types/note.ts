import { z } from 'zod';

// Name has a default value just to display something in the form.
export const noteSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  content: z.string()
});

type NoteDB = z.infer<typeof noteSchema>[]

const g = globalThis as unknown as { users: NoteDB };

// export const userId = () =>  String(crypto.randomUUID())

export const notes: NoteDB = (g.notes = g.notes || [
  {
    id: crypto.randomUUID(),
    name: "Tristan White",
    email: "email@email.com",
    content: "qwertyuiop"
  }
])