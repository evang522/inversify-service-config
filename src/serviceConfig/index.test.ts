import { serviceConfig } from '../../../../../application/_config/index.serviceConfig';
import BoundServiceStructure from '../BoundServiceStructure';
import {isSymbol} from "../Util/isSymbol";
import {ConstructorOf} from "../Type/Constructor";

describe('Ensure that all service Ids have a bound instance in each environment', () =>
{
    it('All Symbol (Interface) service IDs have bindings in all environments', () =>
    {
        // If the need arises we can also create an array of exceptions to this check.
        const servicesMap = new Map();

        serviceConfig.forEach((serviceEntry: BoundServiceStructure) =>
        {
            if (serviceEntry.serviceId instanceof Array)
            {
                serviceEntry.serviceId.forEach((serviceId: ConstructorOf<any> | symbol) =>
                {
                    if (servicesMap.get(serviceId))
                    {
                        servicesMap.set(serviceId, [
                            ...servicesMap.get(serviceId),
                            ...serviceEntry.environments!,
                        ]);
                    }
                    else
                    {
                        servicesMap.set(serviceId, serviceEntry.environments);
                    }
                });
            }
            else
            if (servicesMap.get(serviceEntry.serviceId))
            {
                servicesMap.set(serviceEntry.serviceId, [
                    ...servicesMap.get(serviceEntry.serviceId),
                    ...serviceEntry.environments!,
                ]);
            }
            else
            {
                servicesMap.set(serviceEntry.serviceId, serviceEntry.environments);
            }
        });

        servicesMap.forEach((environments, serviceId) =>
        {
            /* If it is a service which is not global, and which is also not a concrete class,
               which would be available globally anyways.
             */
            if (environments instanceof Array && isSymbol(serviceId))
            {
                const hasAllEnvironmentRegistrations = environments.includes('production') &&
                environments.includes('development') &&
                environments.includes('staging') &&
                environments.includes('test');

                if (!hasAllEnvironmentRegistrations)
                {
                    throw new Error(
                        'Service ID ' + serviceId.toString() + ' is missing a necessary registration in an ' +
                        'environment: Registered environments are "' + environments.toString() + '". ' +
                        'But registrations in all environments are required.'
                    );
                }

                if (environments.length > 5)
                {
                    throw new Error('Service ID ' + serviceId.toString() + ' is double registered in one or ' +
                        'more environments. Please check the following list to see what is duplicated: ' +
                        '"' + environments.toString() + '".'
                    );
                }
            }
        });
    });
});
