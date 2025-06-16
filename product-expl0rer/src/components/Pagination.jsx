function Pagination({ page, setPage, total }) {
  return (
    <div className="pagination">
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
      {[...Array(total)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={page === i + 1 ? "active" : ""}
        >
          {i + 1}
        </button>
      ))}
      <button onClick={() => setPage(page + 1)} disabled={page === total}>Next</button>
    </div>
  );
}
export default Pagination;