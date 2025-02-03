export function Component1() {
  return (
    <div style={{ border: "1px solid red" }}>
      Component1
      <h2>some file tree</h2>
      <img src="https://via.placeholder.com/150" alt="placeholder" />
      <img src="tree.png" alt="placeholder" />
    </div>
  );
}

export function Component2() {
  return (
    <div style={{ backgroundColor: "beige", border: "4px dotted blue" }}>
      Component2
      <h2 style={{ color: "black" }}> some text</h2>
      <img src="https://via.placeholder.com/150" alt="placeholder" />
    </div>
  );
}

export function Component3() {
  return (
    <div>
      Component3
      <h2 style={{ color: "black", border: "double" }}> some visualization</h2>
      <h4> Canvas</h4>
      <canvas height={500} width={300} style={{ border: "1px solid red" }} />
      <img src="https://via.placeholder.com/150" alt="placeholder" />
    </div>
  );
}
