<!-- Script -->
<script lang="ts">
  import { onMount } from 'svelte';

  import type { SelectOption } from '@/lib/components/atoms/Select.svelte';
  import Button from '@/lib/components/atoms/Button.svelte';
  import ConfirmDialog from '@/lib/components/molecules/ConfirmDialog.svelte';
  import Modal from '@/lib/components/molecules/Modal.svelte';
  import DataToolbar from '@/lib/components/organisms/DataToolbar.svelte';
  import PageHeader from '@/lib/components/templates/PageHeader.svelte';
  
  import { toast } from '@/lib/stores/toast.svelte';

  import { expenseStore } from '@/lib/features/finance/expenses/expense.store.svelte';
  import type { Expense, ExpenseDraft } from '@/lib/features/finance/expenses/expense.model';
  import ExpenseForm from '@/lib/features/finance/expenses/ExpenseForm.svelte';
  import ExpenseTable from '@/lib/features/finance/expenses/ExpenseTable.svelte';

  import { categoryStore } from '@/lib/features/finance/categories/category.store.svelte';

  const categoryOptions: SelectOption[] = $derived(categoryStore.items.map(
    (c) => ({ value: c.id, label: c.category_name })
  ));

  let search: string = $state('');
  let editing: Expense | null = $state(null);
  let formOpen: boolean = $state(false);
  let formError: string | null = $state(null);
  let submitting: boolean = $state(false);
  let deleteTarget: Expense | null = $state(null);
  let deleteOpen: boolean = $state(false);

  const filtered: Expense[] = $derived.by(() => {
    const q = search.trim().toLowerCase();
    if (!q) return expenseStore.items;

    return expenseStore.items.filter((e) => 
      `${e.description} ${e.category_name}`.toLowerCase().includes(q),
    );
  });

  function openCreate(): void {
    editing = null;
    formOpen = true;
    formError = null;
  }

  function openEdit(expense: Expense): void {
    editing = expense;
    formOpen = true;
    formError = null;
  }

  async function handleSubmit(draft: ExpenseDraft): Promise<void> {
    submitting = true;
    formError = null;
    try {
      if (editing) {
        await expenseStore.update(editing.id, draft);
        toast.success('Expense updated');
      } else {
        await expenseStore.create(draft);
        toast.success('Expense created');
      }

      formOpen = false;
    } catch(e) {
      formError = e instanceof Error ? e.message : 'Could not save expense';
    } finally {
      submitting = false;
    }
  }

  function cancelEdit(): void {
    editing = null;
    formOpen = false;
  }

  function askDelete(expense: Expense): void {
    deleteTarget = expense;
    deleteOpen = true;
  }

  async function confirmDelete(): Promise<void> {
    if (!deleteTarget) return;
    try {
      await expenseStore.remove(deleteTarget.id);
      toast.success('Expense deleted');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not delete expense');
    } finally {
      deleteTarget = null;
    }
  }

  onMount(() => {
    expenseStore.load();
    categoryStore.load();
  });
</script>

<!-- Component -->
<div>
  <PageHeader title="Expenses" description="Recorded across connected services">
    {#snippet actions()}
      <Button onclick={openCreate}>New Expense</Button>
    {/snippet}
  </PageHeader>

  {#if expenseStore.error}
    <p
      class="mb-3 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2
            text-sm text-red-600 dark:text-red-400"
    >
      {expenseStore.error}
    </p>
  {/if}

  <DataToolbar bind:search searchPlaceholder="Search description or category..." />

  <ExpenseTable
    rows={filtered}
    loading={expenseStore.loading}
    onedit={openEdit}
    ondelete={askDelete}
  />

  <Modal bind:open={formOpen} title={editing ? 'Edit Expense' : 'New Expense'}>
    <ExpenseForm
      expense={editing}
      {categoryOptions}
      {submitting}
      submitError={formError}
      onsubmit={handleSubmit}
      oncancel={cancelEdit}
    />
  </Modal>

  <ConfirmDialog
    bind:open={deleteOpen}
    title="Delete Expense"
    tone="danger"
    message="This expense will be permanently removed."
    confirmLabel="Delete"
    onconfirm={confirmDelete}
  />
</div>
