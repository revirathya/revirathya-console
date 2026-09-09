<!-- Script -->
<script lang="ts">
  import Button from '@/lib/components/atoms/Button.svelte';
  import ConfirmDialog from '@/lib/components/molecules/ConfirmDialog.svelte';
  
  let show: boolean = $state(false);
</script>

<!-- Component -->
<div>
  <Button onclick={() => (show = true)}>Test Dialog</Button>
  <ConfirmDialog
    bind:open={show}
    tone="danger"
    title="Delete thing?"
    message="Are you sure?"
    confirmLabel="Delete"
    onconfirm={() => console.log("confirmed")}
  />
</div>