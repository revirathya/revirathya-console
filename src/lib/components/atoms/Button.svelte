<!-- Script -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  type Variants = 'primary' | 'secondary' | 'ghost' | 'danger';
  type Size = 'sm' | 'md';

  type Props = HTMLButtonAttributes & {
    variant?: Variants;
    size?: Size;
    children: Snippet;
  };

  let {
    variant = 'primary',
    size = 'md',
    type = 'button',
    class: className = '',
    children,
    ...rest
  }: Props = $props();

  const base: string =
    'inline-flex items-center justify-center gap-2 rounded-md font-medium transition ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
    'disabled:pointer-events-none disabled:opacity-50';

  const sizes: Record<Size, string> = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-9 px-4 text-sm',
  };

  const variants: Record<Variants, string> = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
    secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
    ghost: 'text-foreground hover:bg-background',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
</script>

<!-- Component -->
<button
  {type}
  class="{base} {sizes[size]} {variants[variant]} {className}"
  {...rest}
>
  {@render children()}
</button>