<!-- Script -->
<script lang="ts">
  import Badge from '@/lib/components/atoms/Badge.svelte';
  import Button from '@/lib/components/atoms/Button.svelte';
  import DataTable from '@/lib/components/organisms/DataTable.svelte';
  import type { DataTableColumn } from '@/lib/components/organisms/DataTable.svelte';
  
  import { formatCurrency, formatDate } from '@/lib/utils/format';
  
  import type { Expense } from './expense.model';

  type Props = {
    rows: Expense[];
    loading?: boolean;
    onedit: (e: Expense) => void;
    ondelete: (e: Expense) => void;
  }

  let {
    rows,
    loading = false,
    onedit,
    ondelete,
  }: Props = $props();

  const columns: DataTableColumn<Expense>[] = [
    { key: 'transaction_dt', header: 'Date', width: '120px', cell: dateCell },
    { key: 'category_name', header: 'Category', cell: categoryCell },
    { key: 'description', header: 'Description' },
    { key: 'amount', header: 'Amount', align: 'right', width: '150px', cell: amountCell }
  ]
</script>

<!-- Component -->
{#snippet dateCell(e: Expense)}
  { formatDate(e.transaction_dt) }
{/snippet}

{#snippet categoryCell(e: Expense) }
  <Badge tone="primary">{e.category_name}</Badge>
{/snippet}

{#snippet amountCell(e: Expense) }
  <span class="font-medium tabular-nums">{formatCurrency(e.amount)}</span>
{/snippet}

<DataTable
  {columns}
  {rows}
  {loading}
  rowKey={(e) => e.id}
  emptyTitle="No expenses yet"
  emptyDescription="Add one with the button above, or wait for a service to record one."
>
  {#snippet rowActions(e)}
    <div class="flex justify-end gap-1">
      <Button size="sm" variant="ghost" onclick={() => onedit(e)}>Edit</Button>
      <Button size="sm" variant="danger" onclick={() => ondelete(e)}>Delete</Button>
    </div>
  {/snippet}
</DataTable>
