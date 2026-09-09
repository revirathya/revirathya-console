<!-- Script -->
<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  type Props = HTMLInputAttributes & {
    invalid?: boolean;
  }

  let {
    value = $bindable(),
    invalid = false,
    class: className = '',
    ...rest
  }: Props = $props();

  const base: string =
    'h-9 w-full rounded-md border bg-surface px-3 py-2 text-sm text-foreground transition ' +
    'placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring ' +
    'disabled:cursor-not-allowed disabled:opacity-50';
</script>

<!-- Component -->
<input
  bind:value
  aria-invalid={invalid || undefined}
  class="{base} {className} {invalid ? 'border-red-500' : 'border-border'}"
  {...rest}
/>