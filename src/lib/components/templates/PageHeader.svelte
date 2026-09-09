<!-- Script -->
<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    title: string;
    description?: string;
    actions?: Snippet;
  };

  let {
    title,
    description,
    actions
  }: Props = $props();
</script>

<!-- Component -->
<div class="mb-6 flex flex-wrap items-start justify-between gap-4">
  <div class="space-y-1">
    <h1 class="text-xl font-semibold text-foreground">{title}</h1>
    {#if description}<p class="text-sm text-muted">{description}</p>{/if}
  </div>
  {#if actions}<div class="flex items-center gap-2">{@render actions()}</div>{/if}
</div>