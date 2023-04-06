export const SKIN = {
    COW: 'cow',
    CHICKEN: 'chicken',
    WHEAT: 'wheat',
} as const;
export interface DataCell {
    value_name: string;
    value_sum: number;
    speed: number;
    need_source?: string;
    time_source?: number;
    need?: number;
    price?: number;
}
