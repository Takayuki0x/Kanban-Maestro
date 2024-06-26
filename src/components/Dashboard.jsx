import { useCallback, useContext } from "react";

import TopNavbar from "./TopNavbar"
import CreateNewBoardModal from "./CreateNewBoardModal";
import EditBoardModal from "./EditBoardModal";

import {DeleteIcon} from './Icons/DeleteIcon'
import {EyeIcon} from "./Icons/EyeIcon";

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip} from "@nextui-org/react";
import { Link } from "react-router-dom";

import { KBContext } from "../store/kanban-boards-store";

import fromEpochToLocalDateTimeString from "../utils/fromEpochToLocalDateTimeString";
import truncateText from "../utils/truncateText";
import getLocalStorageSize from "../utils/getLocalStorageSize";

const columns = [
    {name: "NAME", uid: "name"},
    {name: "DESCRIPTION", uid: "description"},
    {name: "CREATION DATE", uid: "creation_date"},
    {name: "ACTIONS", uid: "actions"},
]

/**
 * Dashboard component displays a table of Kanban boards.
 * @returns {JSX.Element} The rendered Dashboard component.
*/

export default function Dashboard(){
    const { boards, handleNewBoardCreation, handleBoardDeletion, handleBoardEdit } = useContext(KBContext);

    /**
     * Renders the content of a table cell based on the column key.
     * @param {Object} board - The board object.
     * @param {string} columnKey - The key of the column.
     * @returns {JSX.Element} The rendered content of the table cell.
    */
    const renderCell = useCallback((board, columnKey) => {
        const cellValue = board[columnKey];

        switch (columnKey) {
          case "name":
            return (
                truncateText(board.name, 25)
            );
          case "description":
            return (
                truncateText(cellValue, 100)
            );
          case "creation_date":
            return (
                <Tooltip content={`${Math.floor((Date.now() - cellValue)/8.64e7)} Days ago`} color="default">
                    <Chip className="capitalize" color="default" size="sm" variant="flat">
                        {fromEpochToLocalDateTimeString(cellValue)}
                    </Chip>
                </Tooltip>
            );
          case "actions":
            return (
              <div className="relative flex items-center gap-2">
                <Tooltip content="View board">
                  <Link to={`/board/${board.id}`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon />
                  </Link>
                </Tooltip>
                <Tooltip content="Edit board">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditBoardModal handleBoardEdit={handleBoardEdit} id={board.id} baseName={board.name} baseDescription={board.description} />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete board">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => {handleBoardDeletion(board.id)}}>
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            );
          default:
            return cellValue;
        }
    }, [handleBoardDeletion, handleBoardEdit]);

    return(
      <div className="container-fluid h-dvh">
          <TopNavbar activePage="Dashboard"/>
          <br/><br/>
          <div className="mx-8">
              <div className="flex">
                  <CreateNewBoardModal handleNewBoardCreation={handleNewBoardCreation} />
                  <p className="ml-6 mt-2 text-gray-600">Used storage: {getLocalStorageSize()}</p>
              </div>
              <br/>
              <Table aria-label="Example table with custom cells">
                  <TableHeader columns={columns}>
                      {(column) => (
                          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                              {column.name}
                          </TableColumn>
                      )}
                  </TableHeader>
                  <TableBody emptyContent={"No Kanban boards to display. Press the \"NEW BOARD\" button to create one."} items={boards}>
                      {(item) => (
                          <TableRow key={item.id}>
                              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                          </TableRow>
                      )}
                  </TableBody>
              </Table>
          </div>
      </div>
    )
}