# file state management

``` mermaid
sequenceDiagram
	participant User
	participant ReactContext as React Context
	participant Frontend as Frontend Diff Editor
	participant Backend as Backend (Next.js)
	participant Storage as XML Storage

	User->>ReactContext: Interact with data (CRUD)
	ReactContext->>Frontend: Provide current object
	ReactContext->>Backend: Sync data via next-safe-action
	Backend->>Storage: Save data to XML format
	Storage->>Backend: Retrieve last version XML
	Backend->>Frontend: Send last version for diff
	Frontend->>User: Show diff between buffer and last version
```
