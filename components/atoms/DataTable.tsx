import React, { useState } from 'react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import Pagination from '@/components/atoms/Pagination';
import Button, { IProps as IButtonProps } from '@/components/atoms/Button';

export interface IProps {
  alert: IAlertProps;
  itemsPerPage?: number;
  headers: string[];
  datas: object[];
  dataKey: string;
  dataMappings: { [key: string]: string };
  dataConditionalValue?: { [key: string]: (data: any) => string };
  dataConditionalClassName?: { [key: string]: (data: any) => string };
  actions?: (Omit<IButtonProps, 'onClick'> & { onClick: (data: any) => void })[];
}

export default function App({
  alert,
  itemsPerPage,
  headers,
  datas,
  dataKey,
  dataMappings,
  dataConditionalValue,
  dataConditionalClassName,
  actions,
}: IProps): JSX.Element {
  const [startItemOffset, setStartItemOffset] = useState(0);

  const displayedItemsPerPage = itemsPerPage || 5;
  const endItemOffset = startItemOffset + displayedItemsPerPage;
  const displayedDatas = datas.slice(startItemOffset, endItemOffset);
  const paginationPageCount = Math.ceil(datas.length / displayedItemsPerPage);

  const paginationOnPageChange = (event: any) => {
    const newStartItemOffset = (event.selected * displayedItemsPerPage) % datas.length;
    setStartItemOffset(newStartItemOffset);
  };

  const getColumnValue = (dataSource: any, columnKey: string): any => {
    const propertyPath = dataMappings[columnKey];
    return propertyPath.split('.').reduce((obj: any, key: string) => obj?.[key], dataSource) ?? '-';
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
          <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-zinc-700 dark:text-zinc-300">
            <tr>
              {headers.map((header) => (
                <th scope="col" className="px-4 py-3" key={header}>
                  {header}
                </th>
              ))}
              {actions && <th scope="col" className="px-4 py-3 text-center">Action</th>}
            </tr>
          </thead>
          <tbody>
            {displayedDatas.map((data: any) => (
              <tr className="border-b dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700" key={data[dataKey]}>
                {Object.keys(dataMappings).map((columnKey, columnIndex) => (
                  <td
                    className={`px-4 py-3 ${columnIndex === 0 ? 'font-medium text-zinc-900 whitespace-nowrap dark:text-white' : ''}`}
                    key={columnKey}
                  >
                    <div className={dataConditionalClassName?.[columnKey] ? dataConditionalClassName[columnKey](getColumnValue(data, columnKey)) : ''}>
                      {
                        dataConditionalValue?.[columnKey]
                          ? dataConditionalValue[columnKey](getColumnValue(data, columnKey))
                          : getColumnValue(data, columnKey)
                      }
                    </div>
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 whitespace-nowrap text-center font-medium">
                    {actions.map((action, index) => (
                      <Button
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        size={action.size}
                        variant={action.variant}
                        disabled={action.disabled}
                        onClick={() => action.onClick(data)}
                        className={action.className}
                      >
                        {action.children}
                      </Button>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 p-2" aria-label="Table navigation">
        <Alert type="none" message={alert.message} isLoading={alert.isLoading} className="text-sm font-normal text-gray-500 dark:text-gray-400" />
        <Pagination
          onPageChange={paginationOnPageChange}
          pageCount={paginationPageCount}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}
