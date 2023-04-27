<script lang="ts">
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';


    export let data: PageData;

    // Client API:
    const { form } = superForm(data.form);
</script>

<SuperDebug data={$form} />

<form method="POST">
    <label for="name">Name
        <input class="input" type="text" name="name" bind:value={$form.name} />
    </label>
    
    <label for="email">E-mail
        <input class="input" type="email" name="email" bind:value={$form.email} />
    </label>
    
    <label for="email">Content
        <input class="textarea" type="text" name="content" bind:value={$form.content} />
    </label>
    

    <div><button>Submit</button></div>
</form>