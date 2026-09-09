<!-- Script -->
<script lang="ts">
  import UserIcon from '@lucide/svelte/icons/user';
  
  import Spinner from '@/lib/components/atoms/Spinner.svelte';
  import PageHeader from '@/lib/components/templates/PageHeader.svelte';
  
  import { userStore } from '@/lib/features/user/user.store.svelte';

  const fullName: string = $derived(
    userStore.currentUser
    ? `${userStore.currentUser.first_name} ${userStore.currentUser.last_name}`.trim()
    : '',
  );
</script>

<!-- Component -->
<div>
  <PageHeader title="Profile" description="Your account information" />

  {#if userStore.loading && !userStore.currentUser}
    <div class="flex items-center gap-2 text-sm text-muted">
      <Spinner /> Loading...
    </div>
  {:else if userStore.error}
    <p
      class="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2
             text-sm text-red-600 dark:text-red-400"
    >
      {userStore.error}
    </p>
  {:else if userStore.currentUser}
    {@const user = userStore.currentUser}
    <div class="max-w-xl space-y-6">
      <div class="flex items-center gap-4">
        <span class="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
          <UserIcon class="h-7 w-7"/>
        </span>
        <div>
          <p class="text-lg font-semibold text-foreground">{fullName}</p>
          <p class="text-sm text-muted">ID: {user.id}</p>
        </div>
      </div>

      <dl class="divide-y divide-border overflow-hidden rounded-lg border border-border">
        <div class="flex items-center justify-between gap-4 px-4 py-3">
          <dt class="text-sm text-muted">First Name</dt>
          <dd class="text-sm font-medium text-foreground">{user.first_name}</dd>
        </div>
        <div class="flex items-center justify-between gap-4 px-4 py-3">
          <dt class="text-sm text-muted">Last Name</dt>
          <dd class="text-sm font-medium text-foreground">{user.last_name}</dd>
        </div>
        <div class="flex items-center justify-between gap-4 px-4 py-3">
          <dt class="text-sm text-muted">Email</dt>
          <dd class="text-sm font-medium text-foreground">{user.email}</dd>
        </div>
        <div class="flex items-center justify-between gap-4 px-4 py-3">
          <dt class="text-sm text-muted">Telegram Chat ID</dt>
          <dd class="text-sm font-medium text-foreground">{user.telegram_chat_id}</dd>
        </div>
      </dl>
    </div>
  {/if}
</div>