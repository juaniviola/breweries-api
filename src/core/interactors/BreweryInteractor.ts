import BreweryInterface from '../entities/Brewery';
import BreweryRepository from '../repositories/BreweryRepository';
import { HTTP_STATUS } from '../const/http';
import { IResponse } from './IResponse';

export default class BreweryInteractor {
  breweryRepository: BreweryRepository;

  constructor(breweryRepository: BreweryRepository) {
    this.breweryRepository = breweryRepository;
  }

  async getAll(): Promise<IResponse<BreweryInterface[]>> {
    const breweries = await this.breweryRepository.getAll();

    if (breweries) {
      return {
        status: HTTP_STATUS.OK,
        data: breweries,
        error: null,
      };
    }

    return {
      status: HTTP_STATUS.NOT_FOUND,
      data: null,
      error: 'Breweries not found',
    };
  }

  async getByQuery(query: string): Promise<IResponse<BreweryInterface[]>> {
    const breweries = await this.breweryRepository.getByQuery(query);

    if (breweries) {
      return {
        status: HTTP_STATUS.OK,
        data: breweries,
        error: null,
      };
    }

    return {
      status: HTTP_STATUS.NOT_FOUND,
      data: null,
      error: 'Breweries not found',
    };
  }
}
