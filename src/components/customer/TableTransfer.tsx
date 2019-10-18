/*
 * @Description: 表格穿梭框
 * @Author: xiaoya
 * @Date: 2019-10-17 10:17:45
 * @Last Modified by: xiaoya
 * @Last Modified time: 2019-10-17 10:18:10
 */

import React from 'react';
import { Transfer, Table } from 'antd';
import difference from 'lodash/difference';
/**
 * 表格穿梭框
 */
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: (item: any) => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected: boolean, selectedRows: []) {
          const treeSelectedKeys = selectedRows
            .filter((item: any) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
        onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected: boolean) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowKey={(row) => { return row.key }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

export default TableTransfer;
