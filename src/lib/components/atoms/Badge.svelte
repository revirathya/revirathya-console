<!-- Script -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  
  type Tone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

  type Props = {
    tone?: Tone;
    class?: string;
    children: Snippet;
  }

  let {
    tone = 'neutral',
    class: className = '',
    children
  }: Props = $props();

  const tones: Record<Tone, string> = {
    neutral: 'bg-foreground/10 text-muted',
    primary: 'bg-primary/15 text-primary',
    success: 'bg-green-500/15 text-green-700 dark:text-green-400',
    warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
    danger: 'bg-red-500/15 text-red-600 dark:text-red-400',
  };
</script>

<!-- Component -->
<span
  class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
         {tones[tone]}
         {className}"
>
  {@render children()}
</span>