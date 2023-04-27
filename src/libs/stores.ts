import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

type Note = {
    id: string;
    name: string;
    email: string;
    content: string;
}

export const noteStore: Writable<Note[]> = localStorageStore('notes', []); 