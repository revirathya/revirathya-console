<!-- Script -->
<script lang="ts">
  import type { LucideIcon } from '@lucide/svelte';
  import CircleCheck from '@lucide/svelte/icons/circle-check';
  import CircleAlert from '@lucide/svelte/icons/circle-alert';
  import Info from '@lucide/svelte/icons/info';
  import X from '@lucide/svelte/icons/x';

  import type { ToastKind } from '@/lib/stores/toast.svelte';

  type Props = {
    kind?: ToastKind;
    message: string;
    ondismiss: VoidFunction,
  }

  let {
    kind = 'info',
    message,
    ondismiss
  }: Props = $props();

  const icons: Record<ToastKind, LucideIcon> = {
    success: CircleCheck,
    error: CircleAlert,
    info: Info,
  }

  const accents: Record<ToastKind, string> = {
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-primary',
  };

  const Icon: LucideIcon = $derived(icons[kind]);
  const accentStyle: string = $derived(accents[kind]);
</script>

<!-- Component -->
<div
  role="status"
  class="flex items-start gap-3 rounded-lg border border-border bg-surface px-4 py-3 shadow-lg"
>
  <Icon class="mt-0.5 h-4 w-4 shrink-0 {accentStyle}"/>
  <p class="flex-1 text-sm text-foreground">
    {message}
  </p>
  <button
    type="button"
    aria-label="Dismiss"
    onclick={ondismiss}
    class="-mr-1 rounded p-0.5 text-muted
           transition hover:bg-background hover:text-foreground"
  >
    <X class="h-4 w-4" />
  </button>
</div>