"use client";

import Logic from "@/models/logic";
import { initSudoku, SudokuType } from "@/types/sudoku";
import { useEffect, useState } from "react";

export default function Board() {
    const [sudoku, setSudoku] = useState<SudokuType>(initSudoku);
    const numPad: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // initialize fixed cells
    useEffect(() => {
        const updateSudoku = { ...sudoku };
        if (updateSudoku.cells.length === 0) {
            Logic.setCells(updateSudoku);
            setSudoku(updateSudoku);
        }
    }, [sudoku]);

    //check errors and game state
    useEffect(() => {
        const updateSudoku = { ...sudoku };
        if (updateSudoku.has_updated) {
            updateSudoku.error_cells = [];
            Logic.checkError.checkRow(updateSudoku);
            Logic.checkError.checkCol(updateSudoku);
            Logic.checkError.checkGrid(updateSudoku);
            Logic.completeGrid(updateSudoku);
            Logic.isComplete(updateSudoku);
            updateSudoku.has_updated = false;
            setSudoku(updateSudoku);
        }
    }, [sudoku]);

    function isFixedCell(row: number, col: number) {
        const isFixed = sudoku.fixed_cells.some(
            (cell) => cell.position.toString() === [row, col].toString()
        );
        if (isFixed) {
            return "text-blue-500";
        }
        return "text-black/60";
    }

    function handleClick(row: number, col: number) {
        const updateSudoku = { ...sudoku };
        if (!updateSudoku.game_over) {
            Logic.updateCursorLog(updateSudoku, [row, col]);
            Logic.selectedEmptyCell(updateSudoku);
            Logic.similarCells(updateSudoku);
            Logic.relatedCells(updateSudoku);
        }
        setSudoku(updateSudoku);
    }

    // highlight cells with same values
    function highlightSimilarCells(row: number, col: number) {
        const isSimilar = sudoku.similar_num.some(
            (pos) => pos.toString() === [row, col].toString()
        );
        if (isSimilar) {
            return "bg-blue-400/[0.10]";
        }
        return "";
    }

    // higlight adjancent cells position to the selected cells
    function highlightAdjacentCells(row: number, col: number) {
        const isAdjacent = sudoku.related_cells.some(
            (pos) => pos.toString() === [row, col].toString()
        );
        if (isAdjacent) {
            return "bg-black/[0.01]";
        }
        return "";
    }

    // show error cells
    function highlightError(row: number, col: number) {
        const isError = sudoku.error_cells.some(
            (pos) => pos.toString() === [row, col].toString()
        );
        if (isError) {
            return "text-red-500";
        }
        return "";
    }

    const clickInput = (num: number) => {
        const updateSudoku = { ...sudoku };

        if (updateSudoku.selected_cell.length !== 0) {
            Logic.enterNum(num, updateSudoku);
            Logic.similarCells(updateSudoku);
            Logic.relatedCells(updateSudoku);
        }

        setSudoku(updateSudoku);
    };

    const deleteValue = (num: number) => {
        const updateSudoku = { ...sudoku };

        if (!updateSudoku.game_over) {
            if (updateSudoku.selected_cell.length !== 0) {
                Logic.enterNum(num, updateSudoku);
                updateSudoku.cursor_log.length = 0;
                updateSudoku.similar_num.length = 0;
            }
        }

        setSudoku(updateSudoku);
    };

    return (
        <div className="flex flex-col items-center gap-y-7">
            <div>
                {sudoku.grid.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className={`flex items-center ${
                            (rowIndex + 1) % 3 === 0
                                ? "border-b-2 border-b-black"
                                : "border-b border-b-black/5"
                        } ${rowIndex === 0 && "border-t-2 border-t-black"}`}
                    >
                        {row.map((col, colIndex) => (
                            <div
                                key={colIndex}
                                onClick={() => handleClick(rowIndex, colIndex)}
                                className={`w-[45px] cursor-default bg-clip-content h-[45px] ${
                                    sudoku.selected_cell.toString() ===
                                        [rowIndex, colIndex].toString() &&
                                    "bg-blue-400/[0.10]"
                                } ${isFixedCell(rowIndex, colIndex)} ${
                                    (colIndex + 1) % 3 === 0
                                        ? "border-r-2 border-r-black"
                                        : "border-r border-r-black/5"
                                } ${highlightSimilarCells(
                                    rowIndex,
                                    colIndex
                                )} ${highlightAdjacentCells(
                                    rowIndex,
                                    colIndex
                                )} ${highlightError(rowIndex, colIndex)} ${
                                    colIndex === 0 &&
                                    "border-l-2 border-l-black"
                                }  flex items-center justify-center`}
                            >
                                {col !== 0 ? col : ""}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-x-3 justify-center">
                {numPad.map((value) => (
                    <button
                        type="button"
                        key={value}
                        onClick={() => clickInput(value)}
                        className="w-10 h-10 text-sm bg-white shadow flex items-center justify-center"
                    >
                        {value}
                    </button>
                ))}
            </div>
            <button
                type="button"
                onClick={() => deleteValue(0)}
                className="px-5 py-2 bg-red-500 text-white text-sm"
            >
                Delete
            </button>
        </div>
    );
}
