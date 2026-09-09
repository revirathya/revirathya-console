<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  
  import Button from '@/lib/components/atoms/Button.svelte';
  import ConfirmDialog from '@/lib/components/molecules/ConfirmDialog.svelte';
  import Modal from '@/lib/components/molecules/Modal.svelte';
  import DataToolbar from '@/lib/components/organisms/DataToolbar.svelte';
  import PageHeader from '@/lib/components/templates/PageHeader.svelte';

  import { toast } from '@/lib/stores/toast.svelte';

  import { categoryStore } from "@/lib/features/finance/categories/category.store.svelte";
  import type { Category, CategoryDraft } from "@/lib/features/finance/categories/category.model";
  import CategoryTable from "@/lib/features/finance/categories/CategoryTable.svelte";
  import CategoryForm from "@/lib/features/finance/categories/CategoryForm.svelte";

  type MasterTab = 'categories' | 'budgets' | 'budget-periods';
  const tabs: { id: MasterTab, label: string }[] = [
    { id: 'categories', label: 'Categories'},
    { id: 'budgets', label: 'Budgets'},
    { id: 'budget-periods', label: 'Budget Periods'}
  ];
  
  let activeTab: MasterTab = $state('categories');

  let search: string = $state('');
  let editing: Category | null = $state(null);
  let formOpen: boolean = $state(false);
  let formError: string | null = $state(null);
  let submitting: boolean = $state(false);
  let deleteTarget: Category | null = $state(null);
  let deleteOpen: boolean = $state(false);

  const filtered: Category[] = $derived.by(() => {
    const q = search.trim().toLowerCase();
    if (!q) return categoryStore.items;

    return categoryStore.items.filter((c) => c.category_name.toLowerCase().includes(q))
  });

  function openCreate(): void {
    editing = null;
    formOpen = true;
    formError = null;
  }

  function openEdit(category: Category): void {
    editing = category;
    formOpen = true;
    formError = null;
  }

  async function handleSubmit(draft: CategoryDraft): Promise<void> {
    submitting = true;
    formError = null;
    try {
      if (editing) {
        await categoryStore.update(editing.id, draft);
        toast.success('Category updated');
      } else {
        await categoryStore.create(draft);
        toast.success('Category created');
      }

      formOpen = false;
    } catch(e) {
      formError = e instanceof Error ? e.message : 'Could not save category';
    } finally {
      submitting = false;
    }
  }

  function cancelEdit(): void {
    editing = null;
    formOpen = false;
  }

  function askDelete(category: Category): void {
    deleteTarget = category;
    deleteOpen = true;
  }

  async function confirmDelete(): Promise<void> {
    if (!deleteTarget) return;
    try {
      await categoryStore.remove(deleteTarget.id);
      toast.success('Category deleted');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not delete category');
    } finally {
      deleteTarget = null;
    }
  }

  onMount(() => {
    categoryStore.load();
  })
</script>

<div>
  <PageHeader title="Masters" description="Reference data for the finance module" />
  
  <div class="mb-4 flex gap-1 border-b border-border">
    {#each tabs as tab (tab.id)}
      <button
        type="button"
        aria-current={activeTab === tab.id ? 'true' : undefined}
        onclick={() => (activeTab = tab.id)}
        class="border-b-2 px-4 py-2 text-sm font-medium transition
               {activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:text-foreground'}"
      >
        {tab.label}
      </button>
    {/each}
  </div>
  
  {#if activeTab === 'categories'}

    <!-- Categories -->
    {#if categoryStore.error}
      <p
        class="mb-3 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2
              text-sm text-red-600 dark:text-red-400"
      >
        {categoryStore.error}
      </p>
    {/if}

    <DataToolbar bind:search searchPlaceholder="Search name...">
      {#snippet actions()}
        <Button onclick={openCreate}>New Category</Button>
      {/snippet}
    </DataToolbar>

    <CategoryTable
      rows={filtered}
      loading={categoryStore.loading}
      onedit={openEdit}
      ondelete={askDelete}
    />

    <Modal bind:open={formOpen} title={editing ? 'Edit Category' : 'New Category'}>
      <CategoryForm
        category={editing}
        {submitting}
        submitError={formError}
        onsubmit={handleSubmit}
        oncancel={cancelEdit}
      />
    </Modal>

    <ConfirmDialog
      bind:open={deleteOpen}
      title="Delete Category"
      tone="danger"
      message="This category will be permanently removed."
      confirmLabel="Delete"
      onconfirm={confirmDelete}
    />

  {/if}
</div>