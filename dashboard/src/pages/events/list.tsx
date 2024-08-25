import { useList, useMany } from "@refinedev/core";
import { EditButton, List, useDataGrid } from "@refinedev/mui";
import React from "react";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import type { ICategory, IEvent, IPost, IUser } from "../../interfaces";


export const EventsList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPost>();

  const { data, isLoading } = useList<IEvent>({
    resource: "users"
  });

  const columns = React.useMemo<GridColDef<IEvent>[]>(
    () => [
      {
        field: "_id",
        headerName: "ID",
        type: "string",

      },
      {
        field: "userId",
        headerName: "User  Id",
        type: "string",
 
      },

      {
        field: "event_type",
        headerName: "Event Type",
        type: "string",
        width: 100

      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return <EditButton hideText recordItemId={row._id} />;
        },
        align: "right",
        headerAlign: "right",
        minWidth: 80,
      },
    ],
    [data, isLoading],
  );

  return (
    <List>
      <DataGrid 
      getRowId={(row) => row._id}
      {...dataGridProps} 
      columns={columns} 
      autoHeight />
    </List>
  );
};
