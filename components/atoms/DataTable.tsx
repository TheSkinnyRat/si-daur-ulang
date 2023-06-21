import React, { useState } from 'react';
import Alert, { IProps as IAlertProps } from '@/components/atoms/Alert';
import Pagination from '@/components/atoms/Pagination';
import Button from '@/components/atoms/Button';

export interface IProps {
  datas: object[];
  dataMappings: { [key: string]: string };
  dataKey: string;
  alert: IAlertProps;
  itemsPerPage?: number;
  action?: { [key: string]: (data: any) => void };
}

export default function App({
  datas,
  dataMappings,
  dataKey,
  alert,
  itemsPerPage,
  action,
}: IProps): JSX.Element {
  const [startItemOffset, setStartItemOffset] = useState(0);

  const displayedItemsPerPage = itemsPerPage || 5;
  const endItemOffset = startItemOffset + displayedItemsPerPage;
  const displayedPlaylists = datas.slice(startItemOffset, endItemOffset);
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
              <th scope="col" className="px-4 py-3">ID</th>
              <th scope="col" className="px-4 py-3">KTP</th>
              <th scope="col" className="px-4 py-3">Email</th>
              <th scope="col" className="px-4 py-3">Phone</th>
              <th scope="col" className="px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3">Address</th>
              <th scope="col" className="px-4 py-3">Role</th>
              {action && <th scope="col" className="px-4 py-3 text-center">Action</th>}
            </tr>
          </thead>
          <tbody>
            {displayedPlaylists.map((data: any) => (
              <tr className="border-b dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700" key={data[dataKey]}>
                {Object.keys(dataMappings).map((columnKey, columnIndex) => (
                  <td
                    className={`px-4 py-3 ${columnIndex === 0 ? 'font-medium text-zinc-900 whitespace-nowrap dark:text-white' : ''}`}
                    key={columnKey}
                  >
                    {getColumnValue(data, columnKey)}
                  </td>
                ))}
                {action && (
                  <td className="px-4 py-3 whitespace-nowrap text-center font-medium">
                    {Object.keys(action).map((actionKey) => (
                      <Button
                        variant={actionKey === 'delete' ? 'danger' : 'secondary'}
                        size="sm"
                        key={actionKey}
                        onClick={() => action[actionKey](data)}
                        className={`rounded-md px-1 ${Object.keys(action).length > 1 ? 'mr-1' : ''}`}
                      >
                        {actionKey === 'edit' && (
                          <i className="fa-fw fa-solid fa-pen-to-square" />
                        )}
                        {actionKey === 'delete' && (
                          <i className="fa-fw fa-solid fa-trash" />
                        )}
                        {/* {actionKey} */}
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
