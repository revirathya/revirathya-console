<!-- Script -->
<script lang="ts">
  import LoaderCircle from '@lucide/svelte/icons/loader-circle';

  type Props = {
    size?: number;
    class?: string;
  }

  let {
    size = 16,
    class: className = ''
  }: Props = $props();
</script>

<!-- Component -->
<LoaderCircle
  {size}
  aria-hidden="true"
  class="animate-spin text-muted {className}"
/>