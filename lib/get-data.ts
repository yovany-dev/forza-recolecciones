import { Drivers } from '@/app/dashboard/empleados/pilotos/columns';

export async function getData(): Promise<Drivers[]> {
  return [
    {
      employeeNumber: 438572,
      fullname: 'Steven Fernando Sosa Garcia',
      dpi: 9367431965430,
      position: 'Piloto recolector',
      schedule: '07:30',
    },
    {
      employeeNumber: 364809,
      fullname: 'Jose Fernando Perez',
      dpi: 4575218653847,
      position: 'Piloto recolector',
      schedule: '08:30',
    },
    {
      employeeNumber: 752659,
      fullname: 'Jesus Rusbid Perez Ruiz',
      dpi: 9764657976543,
      position: 'Piloto recolector',
      schedule: '08:30',
    },
    {
      employeeNumber: 846482,
      fullname: 'Darwin Alexander Rodriguez Vasquez',
      dpi: 8956765423128,
      position: 'Piloto recolector',
      schedule: '07:30',
    },
    {
      employeeNumber: 324253,
      fullname: 'Pablo Cesar Gutierrez Sinay',
      dpi: 1283648237563,
      position: 'Piloto recolector',
      schedule: '08:30',
    },
    {
      employeeNumber: 896543,
      fullname: 'Joaquin Geovanny Calderon Orellana',
      dpi: 8964674645328,
      position: 'Piloto recolector',
      schedule: '07:30',
    },
    {
      employeeNumber: 781232,
      fullname: 'Bayron Ajanel Garcia',
      dpi: 3638475610245,
      position: 'Piloto recolector',
      schedule: '07:30',
    },
    {
      employeeNumber: 564532,
      fullname: 'Oscar Rene Tobias Ramirez',
      dpi: 6745321212453,
      position: 'Piloto recolector',
      schedule: '08:30',
    },
    {
      employeeNumber: 127654,
      fullname: 'Herbert David Ortiz Aguilar',
      dpi: 1243767654132,
      position: 'Piloto recolector',
      schedule: '07:30',
    },
  ];
}
