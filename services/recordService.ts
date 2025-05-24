import { DateRange } from 'react-day-picker';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function getRecordService(
  search: string,
  schedule: string,
  location: string,
  photo: string,
  state: string,
  dateRange: DateRange | undefined,
  day: Date | undefined
) {
  const res = await fetch(
    `${BASE_URL}/api/record?search=${search}&fr_horario=${schedule}&fr_ubicación=${location}&fr_foto=${photo}&fr_estado=${state}&from=${dateRange?.from?.toISOString()}&to=${dateRange?.to?.toISOString()}&day=${day?.toISOString()}`
  );
  const data = await res.json();
  return data;
}
