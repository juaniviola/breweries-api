import UserInteractor from './UserInteractor';
import UserDataSource from '../../dataSources/UserDataSource';
import BreweryInteractor from './BreweryInteractor';
import BreweryDataSource from '../../dataSources/BreweryDataSource';

const userDataSource = new UserDataSource();
const userInteractorInstance = new UserInteractor(userDataSource);

const breweryDataSource = new BreweryDataSource();
const breweryInteractorInstance = new BreweryInteractor(breweryDataSource);

export const userInteractor = userInteractorInstance;
export const breweryInteractor = breweryInteractorInstance;
