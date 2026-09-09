<!-- Script -->
<script lang="ts">
  import Button from "@/lib/components/atoms/Button.svelte";
  import DataTable from "@/lib/components/organisms/DataTable.svelte";
  import type { DataTableColumn } from '@/lib/components/organisms/DataTable.svelte';

  import type { Category } from './category.model';

  type Props = {
    rows: Category[];
    loading?: boolean;
    onedit: (c: Category) => void;
    ondelete: (c: Category) => void;
  }

  let {
    rows,
    loading = false,
    onedit,
    ondelete
  }: Props = $props();

  const columns: DataTableColumn<Category>[] = [
    { key: 'category_name', header: 'Category Name'}
  ]
</script>
<!-- Component -->
<DataTable
  {columns}
  {rows}
  {loading}
  rowKey={(c) => c.id}
  emptyTitle="No categories"
  emptyDescription="Add one with the button above"
>
  {#snippet rowActions(c)}
    <div class="flex justify-end gap-1">
      <Button size="sm" variant="ghost" onclick={() => onedit(c)}>Edit</Button>
      <Button size="sm" variant="danger" onclick={() => ondelete(c)}>Delete</Button>
    </div>
  {/snippet}
</DataTable>