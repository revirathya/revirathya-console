<script lang="ts">
  import Compass from '@lucide/svelte/icons/compass';
  
  import Button from '@/lib/components/atoms/Button.svelte';

  import { navigate } from '@/router/routes';
</script>

<!-- Component -->
<div class="flex min-h-[60-vh] flex-col items-center justify-center gap-4 text-center">
  <span class="grid h-14 w-14 place-items-center rounder-full bg-background text-muted">
    <Compass class="h-7 w-7" />
  </span>
  
  <div class="space-y-1">
    <p class="text-3xl font-bold text-foreground">404</p>
    <p class="text-sm text-muted">This page doesn't exist or has moved.</p>
  </div>
  <Button type="button" onclick={() => navigate('/')}>
    Back to Home
  </Button>
</div>