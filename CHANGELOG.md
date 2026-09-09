# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1] - 2026-09-09

Initial pre-release.

### Added

- Svelte 5 + Vite 8 + TypeScript project scaffold with Tailwind CSS v4.
- Client-side routing via `sv-router` with routes for Home, Finance/Expenses,
  Finance/Masters, Profile, and a not-found page.
- Console shell: sidebar navigation, topbar, profile menu, page header, and
  responsive layout.
- **Expenses** feature — list with date filtering, create/edit form, delete
  with confirmation; model/mapper/repository/store layering over GraphQL.
- **Categories (Masters)** feature — list, create, edit, delete.
- **User/Profile** feature — loads the current user (`VITE_DEFAULT_USER_ID`)
  and displays account details including Telegram chat ID.
- GraphQL layer: `graphql-request` client, endpoint resolution from
  `VITE_GRAPHQL_ENDPOINT`, and GraphQL Code Generator setup producing typed
  documents in `src/lib/graphql/generated/`.
- Component library: atoms (Button, Input, Select, Textarea, Label, Badge,
  Spinner, Toast, ThemeToggle), molecules (Modal, FormField, ConfirmDialog,
  EmptyState, Toaster), organisms (DataTable, DataToolbar, AppSidebar,
  AppTopbar, ProfileMenu), templates (ConsoleLayout, PageHeader).
- Theme store with light/dark toggle, `localStorage` persistence, and a
  pre-paint inline script to avoid theme flash.
- Toast and UI stores.
- Docker multi-stage build with nginx serving the SPA and proxying `/graphql`
  to `API_UPSTREAM`.

[Unreleased]: https://github.com/revirathya-console/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/revirathya-console/releases/tag/v0.0.1
