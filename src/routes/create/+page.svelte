<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    import { superForm } from 'sveltekit-superforms/client';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
    import { noteStore } from '../../libs/stores';
    import { goto } from '$app/navigation';

    export let data: PageData;

    // Client API:
    const {
        form,
        errors,
        enhance,
        delayed,
        message,
        reset,
        empty,
        constraints
    } = superForm(data.form, {
        onUpdated({form}) {
        // Need to do this because messages can't be preserved on redirect.
        // sveltekit-flash-message fixes this issue: 
        // https://github.com/ciscoheat/sveltekit-flash-message
        if (form.valid && data.form.empty) {
            reset({keepMessage: true});
        }
        }
  });

</script>

<SuperDebug data={$form} />

{#if $message}
    <h3 class:invalid={$page.status >= 400}>{$message}</h3>
{/if}

<form method="POST" use:enhance>
    <input type="hidden" name="id" bind:value={$form.id} />

    <label for="name">Name
        <input class="input" type="text" name="name" bind:value={$form.name} data-invalid={$errors.name} {...$constraints.name}/>
        {#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
    </label>
    
    <label for="email">E-mail
        <input class="input" type="email" name="email" bind:value={$form.email} data-invalid={$errors.email} {...$constraints.email}/>
        {#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
    </label>
    
    <label for="email">Content
        <textarea class="textarea" rows="4" name="content" bind:value={$form.content} data-invalid={$errors.content} {...$constraints.content}/>
        {#if $errors.content}<span class="invalid">{$errors.content}</span>{/if}
    </label>
    

    <div><button >Create Note</button></div>
    {#if $delayed}Working...{/if}
    
    {#if !$empty}
        <button
            name="delete"
            value="delete"
            on:click={(e) => !confirm('Are you sure?') && e.preventDefault()}
            class="danger">Delete Note</button><br><br>
        {/if}
</form>

<h3>Notes</h3>
<div>
  {#each data.notes as note}
    <a href="?id={note.id}">{note.id}<br>{note.name} <br>{note.email}<br>{note.content}<br><br></a>
  {/each}
</div>

<style>
    .invalid {
      color: red;
    }
  </style>