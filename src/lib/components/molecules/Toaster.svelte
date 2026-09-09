<!-- Script -->
<script lang="ts">
  import { fly } from 'svelte/transition';
  
  import Toast from '@/lib/components/atoms/Toast.svelte';
  
  import { toast } from '@/lib/stores/toast.svelte';
  
</script>

<!-- Component -->
<div
  class="pointer-events-none fixed inset-x-4 bottom-4 z-100 flex flex-col items-end gap-2
         sm:iset-x-auto sm:right-4"
>
  {#each toast.items as item (item.id)}
    <div
      class="pointer-events-auto w-full
             transition:fly={{ x: 24, duration: 150 }}
             sm:w-80"
    >
      <Toast kind={item.kind} message={item.message} ondismiss={() => toast.dismiss(item.id)} />
    </div>
  {/each}
</div>