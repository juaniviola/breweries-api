import axios from 'axios';
import BreweryInterface from '../core/entities/Brewery';
import BreweryRepository from '../core/repositories/BreweryRepository';
import config from '../config';

const breweryUrls = config.business.brewery;

export default class BreweryDataSource implements BreweryRepository {
  public async getAll(): Promise<BreweryInterface[]> {
    try {
      const breweries = await axios(breweryUrls.url);
      return breweries.data;
    } catch (error) {
      throw error;
    }
  }

  public async getByQuery(query: string): Promise<BreweryInterface[]> {
    try {
      const breweries = await axios(`${breweryUrls.url}${breweryUrls.search}?query=${query}`);
      return breweries.data;
    } catch (error) {
      throw error;
    }
  }
};
