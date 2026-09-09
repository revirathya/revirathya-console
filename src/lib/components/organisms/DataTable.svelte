<!-- Script -->
<script module lang="ts">
  import type { Snippet } from 'svelte';
  
  export type DataTableAlign = 'left' | 'center' | 'right';

  export type DataTableColumn<Row> = {
    key: string;
    header: string;
    align?: DataTableAlign;
    width?: string;
    cell?: Snippet<[Row]>;
  };
</script>

<script lang="ts" generics="T">
  import Spinner from '@/lib/components/atoms/Spinner.svelte';
  import EmptyState from '@/lib/components/molecules/EmptyState.svelte';

  type Props = {
    columns: DataTableColumn<T>[];
    rows: T[];
    rowKey: (row: T) => string | number;
    loading?: boolean;
    emptyTitle?: string;
    emptyDescription?: string;
    rowActions?: Snippet<[T]>;
  }

  let {
    columns,
    rows,
    rowKey,
    loading = false,
    emptyTitle = 'Nothing here yet',
    emptyDescription,
    rowActions,
  }: Props = $props();

  const alignClass: Record<DataTableAlign, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const colSpan: number = $derived(columns.length + (rowActions ? 1 : 0));

  function cellText(row: T, key: string): string {
    const v: unknown = (row as Record<string, unknown>)[key];
    return v == null ? '' : String(v);
  }
</script>

<!-- Component -->
<div class="overflow-hidden rounded-lg border border-border">
  <div class="overflow-x-auto">
    <table class="w-full min-w-xl text-sm">
      <thead>
        <tr class="border-b border-border bg-background/50 text-xs uppercase tracking-wide text-muted">
          {#each columns as col (col.key)}
            <th
              scope="col"
              class="px-4 py-2.5 font-medium {alignClass[col.align ?? 'left']}"
              style={col.width ? `width:${col.width}` : undefined}  
            >
              {col.header}
            </th>
          {/each}
          {#if rowActions}
            <th scope="col" class="px-4 py-2.5 text-right font-medium">
              <span class="sr-only">Actions</span>
            </th>
          {/if}
        </tr>
      </thead>

      <tbody>
        {#if loading}
          <tr>
            <td colspan={colSpan} class="px-4 py-10 text-center text-muted">
              <span class="inline-flex items-center gap-2">
                <Spinner /> Loading...
              </span>
            </td>
          </tr>
        {:else if rows.length === 0}
          <tr>
            <td colspan={colSpan} class="p-4">
              <EmptyState title={emptyTitle} description={emptyDescription} />
            </td>
          </tr>
        {:else}
          {#each rows as row (rowKey(row))}
            <tr class="border-b border-border transition last:border-0 hover:bg-background/50">
              {#each columns as col (col.key)}
                <td class="px-4 py-2.5 text-foreground {alignClass[col.align ?? 'left']}">
                  {#if col.cell}
                    {@render col.cell(row)}
                  {:else}
                    {cellText(row, col.key)}
                  {/if}
                </td>
              {/each}
              {#if rowActions}
                <td class="px-4 py-2.5 text-right">{@render rowActions(row)}</td>
              {/if}
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</div>