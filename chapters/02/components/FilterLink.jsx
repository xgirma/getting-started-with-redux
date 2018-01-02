const FilterLink = ({ isActive, name, onClick }) => {
  if (isActive) {
    return <span>{name}</span>;
  }

  return (
    <a href='#' onClick={e => { e.preventDefault(); onClick(); }}>
      {name}
    </a>
  );
};