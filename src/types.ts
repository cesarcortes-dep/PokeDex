export interface Pokemon {
  name: string;
  image: string;
  weight: number;
  height: number;
  types: Array<{ type: { name: string } }>;
}
