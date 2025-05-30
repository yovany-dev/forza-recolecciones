export type CoordinatesType = {
  latitude: number;
  longitude: number;
};

export type GetLocationType = {
  status: boolean;
  message: string;
  data?: CoordinatesType;
  error?: GeolocationPositionError;
};
