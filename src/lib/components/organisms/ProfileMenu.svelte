<!-- Script -->
<script lang="ts">
  import UserIcon from '@lucide/svelte/icons/user';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import LogOut from '@lucide/svelte/icons/log-out';

  import { navigate } from '@/router/routes';

  import { userStore } from '@/lib/features/user/user.store.svelte';
  import type { User } from '@/lib/features/user/user.model';

  let open: boolean = $state<boolean>(false);

  const user: User | null = $derived(userStore.currentUser);
  const displayName: string = $derived(user ? user.first_name : '...');
  const displayFullName: string = $derived(user ? `${user.first_name} ${user.last_name}`.trim() : '...');
  const displayEmail: string = $derived(user ? user.email : '...');

  function close(): void {
    open = false;
  }

  let profileOnclick: VoidFunction = () => {open = !open};
  let openProfileOnclick: VoidFunction = () => {
    close();
    navigate('/profile');
  }

  $effect(() => {
    if (!open) return;

    const onClick: (e: MouseEvent) => void = (e: MouseEvent) => {
      if (!(e.target as Element)?.closest('[data-profile-menu]')) close();
    };
    
    const onKey: (e: KeyboardEvent) => void = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    }

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  });
</script>

<!-- Component -->
<div class="relative" data-profile-menu>
  <button
    type="button"
    onclick={profileOnclick}
    aria-expanded={open}
    class="flex items-center gap-2 rounded-md py-1 pl-1 pr-2 text-sm transition
           hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  >
    <span class="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
      <UserIcon class="h-4 w-4" />
    </span>
    <span class="hidden text-left sm:block">
      <span class="block font-medium leading-tight text-foreground">{displayName}</span>
    </span>
    <ChevronDown class="hidden h-4 w-4 text-muted sm:block" />
  </button>

  {#if open}
    <div
      class="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg border border-border
             bg-surface shadow-lg"
    >
      <div class="border-b border-border px-3 py-2">
        <p class="text-sm font-medium text-foreground">{displayFullName}</p>
        <p class="truncate text-xs text-muted">{displayEmail}</p>
      </div>
      <button
        type="button"
        onclick={openProfileOnclick}
        class="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground transition hover:bg-background"
      >
        <UserIcon class="h-4 w-4 text-muted" /> Profile
      </button>
    
      <button
        type="button"
        disabled
        class="flex w-full cursor-not-allowed items-center gap-2 px-3 py-2 text-sm text-muted/60"
      >
        <LogOut class="h-4 w-4" /> Sign Out
      </button>
    </div>
  {/if}
</div>