import { z } from 'zod';

// Name has a default value just to display something in the form.
const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  content: z.string()
});