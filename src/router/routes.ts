import ExpensesPage from '@/pages/finance/ExpensesPage.svelte';
import MastersPage from '@/pages/finance/MastersPage.svelte';
import HomePage from '@/pages/HomePage.svelte';
import NotFoundPage from '@/pages/NotFoundPage.svelte';
import ProfilePage from '@/pages/ProfilePage.svelte';
import { createRouter } from 'sv-router';

export const { p, navigate, isActive, route } = createRouter({
    '/': HomePage,
    '/finance': {
        '/expenses': ExpensesPage,
        '/masters': MastersPage
    },
    '/profile': ProfilePage,
    '*': NotFoundPage,
})