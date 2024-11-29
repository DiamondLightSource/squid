Periodic Table of Elements

## Install

```sh
  npm install @diamondlightsource/periodic-table
```

## Usage

```tsx
import PeriodicTable, { OnClick } from "@diamondlightsource/periodic-table";

function App() {
  const handleClick: OnClick = (e, element) => {
    console.log(element);
  };

  return <PeriodicTable onClick={handleClick} squareSize={55} margin={2} />;
}
```
