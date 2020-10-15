import React from 'react';

const TableHeader = props => {
  const { columns, onSort } = props;

  const raiseSort = path => {
    const sortColumn = { ...props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    onSort(sortColumn);
  };

  const renderSortIcon = column => {
    const { sortColumn } = props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc')
      return <i className='fa fa-sort-asc ml-1'></i>;
    return <i className='fa fa-sort-desc ml-1'></i>;
  };

  return (
    <thead className='thead-light'>
      <tr>
        {columns.map(column => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
            className='clickable'
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
