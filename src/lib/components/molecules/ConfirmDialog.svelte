<!-- Script -->
<script lang="ts">
  import Button from '@/lib/components/atoms/Button.svelte';
  import Modal from './Modal.svelte';

  type Tone = 'default' | 'danger';

  type Props = {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    tone?: Tone,
    onconfirm: VoidFunction;
    oncancel?: VoidFunction;
  }

  let {
    open = $bindable(false),
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    tone = 'default',
    onconfirm,
    oncancel,
  }: Props = $props()

  function cancel(): void {
    open = false;
    oncancel?.();
  }

  function confirm(): void {
    open = false;
    onconfirm();
  }
</script>

<!-- Component -->
<Modal bind:open {title} onclose={cancel} size="sm">
  <p class="text-sm text-muted">{message}</p>
  
  {#snippet footer()}
    <Button variant="ghost" onclick={cancel}>
      {cancelLabel}
    </Button>
    
    <Button variant={tone === 'danger' ? 'danger' : 'primary'} onclick={confirm}>
      {confirmLabel}
    </Button>
  {/snippet}
</Modal>