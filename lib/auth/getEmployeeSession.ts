import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET!;

type EmployeeSession = {
  uuid: string;
  fullname: string;
  dpi: string,
  position: string;
  iat: number;
  exp: number;
};
export async function getEmployeeSession(): Promise<EmployeeSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('employee-token')?.value;

  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as EmployeeSession;
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
}
