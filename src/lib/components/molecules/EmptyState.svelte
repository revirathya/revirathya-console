<!-- Script -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LucideIcon } from '@lucide/svelte';
  import Inbox from '@lucide/svelte/icons/inbox';

  type Props = {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: Snippet;
  }

  let {
    icon: Icon = Inbox,
    title,
    description,
    action
  }: Props = $props();
</script>

<!-- Component -->
<div
  class="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed
         border-border px-6 py-12 text-center"
>
  <Icon class="h-8 w-8 text-muted" />
  <div class="space-y-1">
    <p class="text-sm font-medium text-foreground">{title}</p>
    {#if description}<p class="text-sm text-muted">{description}</p>{/if}
  </div>
  {#if action}<div class="mt-1">{@render action()}</div>{/if}
</div>