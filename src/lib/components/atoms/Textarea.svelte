<!-- Script -->
<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';

  type Props = HTMLTextareaAttributes & {
    invalid?: boolean;
  }

  let {
    value = $bindable(''),
    invalid = false,
    rows = 3,
    class: className = '',
    ...rest
  }: Props = $props();

  const base: string =
    'w-full min-h-16 resize-y rounded-md border bg-surface px-3 py-2 text-sm text-foreground transition ' +
    'placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring ' +
    'disabled:cursor-not-allowed disabled:opacity-50';
</script>

<!-- Component -->
<textarea
  bind:value
  {rows}
  aria-invalid={invalid || undefined}
  class="{base} {className} {invalid ? 'border-red-500' : 'border-border'}"
  {...rest}
></textarea>