export default function AddButton({ itemName, onAdd }) {
  return (
    <button onClick={() => onAdd(itemName)}>
      Add to Order
    </button>
  );
}