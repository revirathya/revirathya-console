<!-- Script -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import Search from '@lucide/svelte/icons/search';

  type Props = {
    search?: string;
    searchPlaceholder?: string;
    filters?: Snippet;
    actions?: Snippet;
  };

  let {
    search = $bindable(''),
    searchPlaceholder = 'Search...',
    filters,
    actions,
  }: Props = $props();
</script>

<!-- Component -->
<div class="mb-3 flex flex-wrap items-center gap-2">
  <div class="relative min-w-48 flex-1 sm:max-w-xs">
    <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    <input
      type="search"
      bind:value={search}
      placeholder={searchPlaceholder}
      class="h-9 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm text-foreground
             placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring"
    />
  </div>

  {#if filters}{@render filters()}{/if}
  {#if actions}<div class="ml-auto flex items-center gap-2">{@render actions()}</div>{/if}
</div>