<!-- Script -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import X from '@lucide/svelte/icons/x';

  type Size = 'sm' | 'md' | 'lg';

  type Props = {
    open: boolean;
    title: string;
    size?: Size;
    children: Snippet;
    footer?: Snippet;
    onclose?: VoidFunction;
  }

  let {
    open = $bindable(false),
    title,
    size = 'md',
    children,
    footer,
    onclose,
  }: Props = $props();

  let dialog: HTMLDialogElement | undefined = $state();

  const sizes: Record<Size, string> = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  }

  $effect(() => {
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  });

  function handleClose(): void {
    if (!open) return;
    open = false;
    onclose?.();
  }

  function onclick(event: MouseEvent): void {
    if (event.target === dialog) handleClose();
  }
</script>

<!-- Component -->
<dialog
  bind:this={dialog}
  onclose={handleClose}
  {onclick}
  aria-label={title}
  class="fixed inset-0 m-0 h-full max-h-none w-full max-w-none items-center justify-center
         bg-transparent p-4 backdrop:bg-black/40 open:flex"
>
  {#if open}
    <div
      class="flex max-h-[85vh] w-full {sizes[size]} flex-col overflow-hidden rounded-xl
             border border-border bg-surface text-foreground shadow-xl"
    >
      <header class="flex items-center justify-between border-b border-border px-5 py-3">
        <h2 class="text-base font-semibold">{title}</h2>
        <button
          type="button"
          onclick={handleClose}
          aria-label="Close dialog"
          class="rounded-md p-1 text-muted transition hover:bg-background hover:text-foreground"
        >
          <X class="h-4 w-4" />
        </button>
      </header>

      <div class="overflow-y-auto px-5 py-4">
        {@render children()}
      </div>

      {#if footer}
        <footer class="flex justify-end gap-2 border-t border-border px-5 py-3">
          {@render footer()}
        </footer>
      {/if}
    </div>
  {/if}
</dialog>
