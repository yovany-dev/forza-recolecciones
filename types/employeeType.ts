export type EmployeeType = 'driver' | 'copilot';

export interface PaginationType {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
