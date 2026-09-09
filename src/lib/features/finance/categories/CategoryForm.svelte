<!-- Script -->
<script lang="ts">
  import { untrack } from 'svelte';
  
  import FormField from '@/lib/components/molecules/FormField.svelte';
  import Input from '@/lib/components/atoms/Input.svelte';
  import Button from '@/lib/components/atoms/Button.svelte';
  
  import { validateCategory } from './category.model';
  import type { Category, CategoryDraft, CategoryErrors } from './category.model';

  type Props = {
    category?: Category | null;
    submitting?: boolean;
    submitError?: string | null;
    onsubmit: (draft: CategoryDraft) => void | Promise<void>;
    oncancel: VoidFunction;
  }

  let {
    category = null,
    submitting = false,
    submitError = null,
    onsubmit,
    oncancel
  }: Props = $props();

  function toDraft(c: Category | null): CategoryDraft {
    return {
      category_name: c?.category_name ?? '',
    }
  }

  let draft: CategoryDraft = $state(untrack(() => toDraft(category)));
  let errors: CategoryErrors = $state({});

  async function handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    errors = validateCategory(draft);
    if (Object.keys(errors).length > 0) return;
    await onsubmit(draft);
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

  <FormField label="Category Name" for="category-name" required error={errors.category_name}>
    <Input
      id="category-name"
      type="text"
      bind:value={draft.category_name}
      invalid={!!errors.category_name}
    />
  </FormField>

  <div class="mt-2 flex justify-end gap-2">
    <Button type="button" variant="ghost" onclick={oncancel} disabled={submitting}>Cancel</Button>
    <Button type="submit" disabled={submitting}>
      {submitting ? "Saving..." : category ? "Save Changes" : "Add Category"}
    </Button>
  </div>
</form>