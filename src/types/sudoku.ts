import { Cell } from "./cell";

export const initSudoku: SudokuType = {
    grid: [
        [5, 3, 1, 7, 6, 0, 0, 0, 9],
        [6, 4, 0, 3, 0, 1, 0, 0, 0],
        [0, 2, 0, 4, 0, 0, 1, 3, 6],

        [0, 6, 0, 1, 4, 0, 7, 0, 0],
        [0, 0, 5, 0, 7, 0, 0, 9, 4],
        [0, 0, 0, 2, 9, 0, 0, 0, 5],

        [0, 0, 8, 0, 3, 6, 0, 0, 0],
        [0, 0, 6, 5, 0, 7, 0, 0, 0],
        [0, 0, 0, 0, 2, 4, 0, 0, 1],
    ],
    cells: [],

    fixed_cells: [],
    error_cells: [],

    cursor_log: [],
    selected_cell: [],

    similar_num: [],
    related_cells: [],

    has_updated: true,
    completed_nums: [],

    game_over: false,
};

export type SudokuType = {
    grid: number[][];
    cells: Cell[];

    fixed_cells: Cell[]; // cells that cannot be changed
    error_cells: number[][]; // cells containing wrong/repeated values

    cursor_log: number[][];
    selected_cell: number[]

    similar_num: number[][]; // cells with similar numbers for highlighting
    related_cells: number[][]; // adjacent cells in either rows, cols, or grid of the active selected cell

    has_updated: boolean;
    completed_nums: number[]; // numbers that have already been completed in grid

    game_over: boolean;
};
