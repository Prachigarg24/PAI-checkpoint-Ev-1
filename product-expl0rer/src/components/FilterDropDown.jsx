function FilterDropdown({ category, setCategory }) {
  const categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];
  return (
    <select value={category} onChange={(e) => setCategory(e.target.value)}>
      {categories.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}
export default FilterDropdown;