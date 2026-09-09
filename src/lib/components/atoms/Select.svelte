<!-- Script -->
<script module lang="ts">

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
}
</script>

<script lang="ts">
  import type { HTMLSelectAttributes } from "svelte/elements";

  type Props = Omit<HTMLSelectAttributes, 'value'> & {
    options: SelectOption[];
    value?: string;
    placeholder?: string;
    invalid?: boolean;
  }

  let {
    options,
    value = $bindable(''),
    placeholder,
    invalid = false,
    class: className = '',
    ...rest
  }: Props = $props();

  const base: string =
    'h-9 w-full rounded-md border bg-surface px-3 text-sm text-foreground transition ' +
    'focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50';
</script>

<!-- Component -->
<select
  bind:value
  aria-invalid={invalid || undefined}
  class="{base} {className} {invalid ? 'border-red-500' : 'border-border'}"
  {...rest}
>
  {#if placeholder}
    <option value="" disabled>{placeholder}</option>
  {/if}
  {#each options as opt (opt.value)}
    <option value={opt.value} disabled={opt.disabled}>{opt.label}</option>
  {/each}
</select>