<!-- Script -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  
  import AppSidebar from '@/lib/components/organisms/AppSidebar.svelte';
  import AppTopbar from '@/lib/components/organisms/AppTopbar.svelte';
  import Toaster from '@/lib/components/molecules/Toaster.svelte';

  import { userStore } from '@/lib/features/user/user.store.svelte';

  let { children }: { children: Snippet } = $props();

  onMount(() => {
    userStore.load();
  })
</script>

<!-- Component -->
<div class="flex h-screen overflow-hidden bg-background text-foreground">
  <AppSidebar />

  <div class="flex min-w-0 flex-1 flex-col">
    <AppTopbar />
    <main class="flex-1 overflow-y-auto p-4 sm:p-6">
      {@render children()}
    </main>
  </div>

  <Toaster />
</div>