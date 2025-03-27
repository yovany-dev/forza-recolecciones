export interface PaginationType {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export type Schedule = '07:30' | '08:30';
export type FilterTime = {
  '07:30': boolean;
  '08:30': boolean;
};
