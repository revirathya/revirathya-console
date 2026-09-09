<!-- Script -->
<script lang="ts">
  import Menu from '@lucide/svelte/icons/menu';

  import { ui } from '@/lib/stores/ui.svelte';
  import ThemeToggle from '@/lib/components/atoms/ThemeToggle.svelte';
  import ProfileMenu from './ProfileMenu.svelte';

  const iconBtn: string =
    'inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition ' +
    'hover:bg-background hover:text-foreground focus-visible:outline-none ' +
    'focus-visible:ring-2 focus-visible:ring-ring'

  let mobileOnclick: VoidFunction = () => ui.openMobileSidebar()
</script>

<!-- Component -->
<header
  class="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-surface px-3 sm:px-4"
>
  <button
    type="button"
    onclick={mobileOnclick}
    aria-label="Open Navigation"
    class="{iconBtn} lg:hidden"
  >
    <Menu class="h-5 w-5" />
  </button>

  <div class="flex-1"></div>

  <ThemeToggle />
  <ProfileMenu />
</header>