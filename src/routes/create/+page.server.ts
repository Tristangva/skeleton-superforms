import { z } from 'zod';
import { message, superValidate } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';
import { noteSchema, notes } from '../../libs/types/note.js';

const schema = noteSchema.extend({
  id: noteSchema.shape.id.optional()
})

export const load = (async ({ url }) => {
  // READ user
  // For simplicity, use the id query parameter instead of a route.
  const id = url.searchParams.get('id');
  const note = id ? notes.find((n) => n.id == id) : null;

  if (id && !note) throw error(404, 'User not found.');

  const form = await superValidate(note, schema);
  return { form, notes };
})

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    console.log(data)
    const form = await superValidate(data, schema);
    console.log('POST', form);

    // Convenient validation check:
    if (!form.valid) {
      // Again, always return { form } and things will just work.
      console.log("error")
      return fail(400, { form });
    }

    if (!form.data.id) {
      // CREATE user
      const note = { ...form.data, id: crypto.randomUUID() };
      console.log("note: ", note)
      notes.push(note)

      return message(form, 'User created!');
    } else {
      const note = notes.find((n) => n.id === form.data.id)
      if(!note) throw error(404, 'Note not found.');

      //const index = notes.indexOf(note);

      if (data.has('delete')) {
        // DELETE user
        notes.splice(notes.indexOf(note), 1);
        throw redirect(303, '');
      } else {

        notes[notes.indexOf(note)] = { ...form.data, id: note.id}

        return message(form, 'Note updated!');
      }
    }

  }
}