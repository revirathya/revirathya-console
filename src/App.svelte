<script lang="ts">
  import { Router } from 'sv-router';
  import '@/router/routes';
  import ConsoleLayout from '@/lib/components/templates/ConsoleLayout.svelte';
</script>

<ConsoleLayout>
  <Router />
</ConsoleLayout>