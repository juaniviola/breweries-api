import BreweryInterface from '../entities/Brewery';

export default interface BreweryRepository {
  getAll(): Promise<BreweryInterface[]>;
  getByQuery(query: string): Promise<BreweryInterface[]>;
};
