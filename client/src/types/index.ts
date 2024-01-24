type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  verify: boolean;
  approved: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
};
interface BaseType {
  _id?: string;
  name: string;
  location: {
    longitude: number;
    latitude: number;
  };
  region: string;
  missiles?: string[];
}

interface MissileType {
  _id?: string;
  name: string;
  launchCost: number;
  purchaseCost: number;
  range: number;
  blastRadius: number;
}

interface LaunchType {
  _id?: string;
  missileId: any;
  baseId: any;
  user: any;
  target: {
    longitude: number;
    latitude: number;
  };
  targetName: string;
  totalCost: number;

  createdAt: string;
  updatedAt: string;
}

export type { User, BaseType, MissileType, LaunchType };
