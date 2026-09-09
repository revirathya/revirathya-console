<!-- Script -->
<script lang="ts">
  import { untrack } from 'svelte';

  import type { SelectOption } from '@/lib/components/atoms/Select.svelte';
  import FormField from '@/lib/components/molecules/FormField.svelte';
  import Input from '@/lib/components/atoms/Input.svelte';
  import Select from '@/lib/components/atoms/Select.svelte';
  import Textarea from '@/lib/components/atoms/Textarea.svelte';
  import Button from '@/lib/components/atoms/Button.svelte';
  
  import { validateExpense } from './expense.model';
  import type { Expense, ExpenseDraft, ExpenseErrors } from './expense.model';

  type Props = {
    expense?: Expense | null;
    categoryOptions: SelectOption[];
    submitting?: boolean;
    submitError?: string | null;
    onsubmit: (draft: ExpenseDraft) => void | Promise<void>;
    oncancel: VoidFunction;
  }

  let {
    expense = null,
    categoryOptions,
    submitting = false,
    submitError = null,
    onsubmit,
    oncancel
  }: Props = $props();

  function toDraft(e: Expense | null): ExpenseDraft {
    return {
      category_id: e?.category_id ?? '',
      transaction_dt: e?.transaction_dt ?? new Date().toISOString().slice(0, 10),
      description: e?.description ?? '',
      amount: e?.amount ?? 0,
    };
  }

  let draft: ExpenseDraft = $state(untrack(() => toDraft(expense)));
  let errors: ExpenseErrors = $state({});
  
  async function handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    errors = validateExpense(draft);
    if (Object.keys(errors).length > 0) return;

    await onsubmit({ ...draft, amount: Number(draft.amount)});
  }
</script>

<!-- Component -->
<form onsubmit={handleSubmit} class="flex flex-col gap-4">
  {#if submitError}
    <p
      class="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2
             text-sm text-red-600 dark:text-red-400"
    >
      {submitError}
    </p>
  {/if}

  <FormField label="Date" for="expense-date" required error={errors.transaction_dt}>
    <Input
      id="expense-date"
      type="date"
      bind:value={draft.transaction_dt}
      invalid={!!errors.transaction_dt}
    />
  </FormField>

  <FormField label="Category" for="expense-category" required error={errors.category_id}>
    <Select
      id="expense-category"
      bind:value={draft.category_id}
      invalid={!!errors.category_id}
      placeholder="Select a category..."
      options={categoryOptions}
    />
  </FormField>

  <FormField label="Description" for="expense-desc">
    <Textarea
      id="expense-desc"
      bind:value={draft.description}
      rows={2}
      placeholder="Optional note..."
    ></Textarea>
  </FormField>

  <FormField label="Amount" for="expense-amount" required error={errors.amount}>
    <Input
      id="expense-amount"
      type="number"
      bind:value={draft.amount}
      invalid={!!errors.amount}
      min="0"
      step="any"
      inputmode="decimal"
    />
  </FormField>

  <div class="mt-2 flex justify-end gap-2">
    <Button type="button" variant="ghost" onclick={oncancel} disabled={submitting}>Cancel</Button>
    <Button type="submit" disabled={submitting}>
      {submitting ? "Saving..." : expense ? "Save Changes" : "Add Expense"}
    </Button>
  </div>
</form>