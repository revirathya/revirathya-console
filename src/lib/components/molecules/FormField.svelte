<!-- Script -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  
  import Label from '@/lib/components/atoms/Label.svelte';

  type Props = {
    label: string;
    for?: string;
    required?: boolean;
    hint?: string;
    error?: string;
    children: Snippet;
  }

  let {
    label,
    for: forId,
    required = false,
    hint,
    error,
    children
  }: Props = $props();
</script>

<!-- Component -->
<div class="flex flex-col gap-1.5">
  <Label for={forId} {required}>{label}</Label>
  {@render children()}
  {#if error}
    <p class="text-xs text-red-600">{error}</p>
  {:else if hint}
    <p class="text-xs text-muted">{hint}</p>
  {/if}
</div>