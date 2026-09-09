<!-- Script -->
<script lang="ts">
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import Fish from "@lucide/svelte/icons/fish";
  import X from "@lucide/svelte/icons/x";
  import PanelLeftClose from "@lucide/svelte/icons/panel-left-close";
  import PanelLeftOpen from "@lucide/svelte/icons/panel-left-open";

  import { ui } from "@/lib/stores/ui.svelte";
  import { nav, isNavGroup } from "@/router/nav";
  import type { NavLeaf, NavGroup } from "@/router/nav";
  import { route } from "@/router/routes";

  const collapsed: boolean = $derived(ui.sidebarCollapsed);

  function isPathActive(path: string): boolean {
    if (path === '/') return route.pathname === '/';
    return route.pathname === path || route.pathname.startsWith(path + '/');
  }

  function groupActive(group: NavGroup): boolean {
    return group.children.some((c: NavLeaf): boolean => isPathActive(c.path))
  }

  // groups start expanded if they contain the current route
  let openGroups: Record<string, boolean> = $state<Record<string, boolean>>(
    Object.fromEntries(
      nav
        .filter(isNavGroup)
        .map((g: NavGroup): [string, boolean] => [g.label, groupActive(g)]),
    ),
  );

  function toggleGroup(label: string): void {
    openGroups[label] = !openGroups[label];
  }

  const linkBase: string = 'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition';
  function linkClass(active: boolean): string {
    return active
      ? `${linkBase} bg-primary text-primary-foreground`
      : `${linkBase} text-foreground hover:bg-background`
  }

  let toggleGroupOnclick: (label: string) => VoidFunction = (label: string) => () => toggleGroup(label);
  let mobileOnclick: VoidFunction = () => ui.closeMobileSidebar();
  let collapseOnClick: VoidFunction = () => ui.toggleSidebar();
</script>

<!-- Component -->
{#if ui.sidebarMobileOpen}
  <button
    type="button"
    onclick={mobileOnclick}
    aria-label="Close Navigation"
    class="fixed inset-0 z-40 bg-black/40 lg:hidden"
  ></button>
{/if}

<aside
  class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface
         transition-transform duration-200
         lg:static lg:z-auto lg:translate-x-0 lg:transition-[width]
         {ui.sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full'}
         {collapsed ? 'lg:w-16' : 'lg:w-60'}"
>
  <div
    class="flex h-14 shrink-0 items-center gap-2 px-4
           {collapsed ? 'lg:justify-center lg:px-0' : ''}"
  >
    <Fish class="h-6 w-6 shrink-0 text-primary" />
    <span
      class="text-lg font-semibold text-primary
             {collapsed ? 'lg:hidden' : ''}"
    >
      Revirathya
    </span>
    
    <button
      type="button"
      onclick={mobileOnclick}
      aria-label="Close Navigation"
      class="ml-auto rounded-md p-1 text-muted hover:bg-background hover:text-foreground lg:hidden"
    >
      <X class="h-5 w-5" />
    </button>
  </div>

  <nav class="flex-1 overflow-y-auto p-2">
    <ul class="flex flex-col gap-1">
      {#each nav as item (item.label)}
        {#if isNavGroup(item)}
          <li>
            <button
              type="button"
              aria-label={item.label}
              title={collapsed ? item.label : undefined}
              onclick={toggleGroupOnclick(item.label)}
              class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium
                     transition hover:bg-background
                     {collapsed ? 'lg:justify-center lg:px-0' : ''}
                     {groupActive(item) ? 'text-primary' : 'text-foreground'}"
            >
              <item.icon class="h-4 w-4 shrink-0" />
              <span
                class="flex-1 text-left
                       {collapsed ? 'lg:hidden': ''}"
              >
                {item.label}
              </span>
              <ChevronDown
                class="h-4 w-4 shrink-0 transition-transform
                       {openGroups[item.label] ? 'rotate-180' : ''}
                       {collapsed ? 'lg:hidden': ''}"
              />
            </button>

            {#if openGroups[item.label] && !collapsed }
              <ul
                class="mt-1 flex flex-col gap-1
                       {collapsed ? 'lg:pl-0' : 'pl-4'}"
              >
                {#each item.children as child (child.path)}
                  <li>
                    <a
                      href={child.path}
                      aria-label={child.label}
                      aria-current={isPathActive(child.path) ? 'page' : undefined}
                      title={collapsed ? child.label : undefined}
                      onclick={mobileOnclick}
                      class={linkClass(isPathActive(child.path))}
                    >
                      <child.icon class="h-4 w-4 shrink-0" />
                      <span class={collapsed ? 'lg:hidden' : ''}>
                        {child.label}
                      </span>
                    </a>
                  </li>
                {/each}
              </ul>
            {/if}
          </li>
        {:else}
          <li>
            <a
              href={item.path}
              aria-label={item.label}
              aria-current={isPathActive(item.path) ? 'page' : undefined}
              title={collapsed ? item.label : undefined}
              onclick={mobileOnclick}
              class="
                {linkClass(isPathActive(item.path))}
                {collapsed ? 'lg:justify-center lg:px-0' : ''}
              "
            >
              <item.icon class="h-4 w-4 shrink-0" />
              <span class={collapsed ? 'lg:hidden' : ''}>
                {item.label}
              </span>
            </a>
          </li>
        {/if}
      {/each}
    </ul>
  </nav>

  <div
    class="hidden shrink-0 border-t border-border p-2 lg:flex
           {collapsed ? 'lg:justify-center' : 'lg:justify-end'}"
  >
    <button
      type="button"
      onclick={collapseOnClick}
      aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      title={collapsed ? 'Expand' : 'Collapse'}
      class="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition
             hover:bg-background hover:text-foreground
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {#if collapsed}
        <PanelLeftOpen class="h-5 w-5" />
      {:else}
        <PanelLeftClose class="h-5 w-5" />
      {/if}
    </button>
  </div>
</aside>
