const Footer = ({ filter, onFilterChange }) => (
  <p>
    Show:
    {' '}
    <FilterLink
      name='All'
      isActive={filter === Filters.SHOW_ALL}
      onClick={() => onFilterChange(Filters.SHOW_ALL)} />
    {', '}
    <FilterLink
      name='Completed'
      isActive={filter === Filters.SHOW_COMPLETED}
      onClick={() => onFilterChange(Filters.SHOW_COMPLETED)} />
    {', '}
    <FilterLink
      name='Active'
      isActive={filter === Filters.SHOW_ACTIVE}
      onClick={() => onFilterChange(Filters.SHOW_ACTIVE)} />
  </p>
);