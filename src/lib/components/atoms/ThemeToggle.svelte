<!-- Script -->
<script lang="ts">
  import Sun from '@lucide/svelte/icons/sun';
  import Moon from '@lucide/svelte/icons/moon';
  import { theme } from '@/lib/stores/theme.svelte';

  let onclick: VoidFunction = () => theme.toggle();
  let title: string = $derived(theme.isDark ? 'Switch to light mode': 'Switch to dark mode')
</script>

<!-- Element -->
<button
  type="button"
  {onclick}
  {title}
  aria-label="Toggle Theme"
  class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border
         text-muted transition hover:bg-background hover:text-foreground
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
>
  {#if theme.isDark}
    <Sun class="h-4 w-4" />
  {:else}
    <Moon class="h-4 w-4" />
  {/if}
</button>