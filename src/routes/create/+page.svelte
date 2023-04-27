<script lang="ts">
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';


    export let data: PageData;

    // Client API:
    const { form, errors, constraints } = superForm(data.form);
</script>

<SuperDebug data={$form} />

<form method="POST">
    <label for="name">Name
        <input class="input" type="text" name="name" bind:value={$form.name} data-invalid={$errors.name} {...$constraints.name}/>
        {#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
    </label>
    
    <label for="email">E-mail
        <input class="input" type="email" name="email" bind:value={$form.email} data-invalid={$errors.email} {...$constraints.email}/>
        {#if $errors.name}<span class="invalid">{$errors.email}</span>{/if}
    </label>
    
    <label for="email">Content
        <textarea class="textarea" rows="4" name="content" bind:value={$form.content} data-invalid={$errors.content} {...$constraints.content}/>
        {#if $errors.name}<span class="invalid">{$errors.content}</span>{/if}
    </label>
    

    <div><button>Submit</button></div>
</form>

<style>
    .invalid {
      color: red;
    }
  </style>