<!-- Script -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLLabelAttributes } from 'svelte/elements';

  type Props = HTMLLabelAttributes & {
    required?: boolean;
    children: Snippet;
  };

  let {
    required = false,
    class: className = '',
    children,
    ...rest
  }: Props = $props();
</script>

<!-- Component -->
<label
  class="block text-sm font-medium text-foreground {className}"
  {...rest}
>
  {@render children()}
  {#if required}<span class="ml-0.5 text-red-600">*</span>{/if}
</label>