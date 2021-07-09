import ExtendableError from '../../../../Exception/ExtendableError';
import BoundService from '../BoundServiceStructure';
import { isSymbol } from '../../../isSymbol';

export default class ServiceBindingException extends ExtendableError
{
    public static forBoundServiceConfig(boundService: BoundService, reason: string): ServiceBindingException
    {
        return new this(
            `Container binding for Service ${this.convertServiceIdToString( boundService)} has failed: "${reason}". Please check the service config.`
        );
    }

    private static convertSymbolServiceIdToString(serviceId: symbol): string
    {
        return String(serviceId);
    }

    private static convertServiceIdToString(boundService: BoundService): string
    {
        const serviceId = boundService.serviceId;

        if (isSymbol(serviceId))
        {
            return this.convertSymbolServiceIdToString(serviceId as symbol);
        }

        if (serviceId instanceof Array)
        {
            let str = '[';

            serviceId.forEach((id, index: number) =>
            {
                if (index !== 0)
                {
                    str += ', ';
                }

                if (isSymbol(id))
                {
                    str += this.convertSymbolServiceIdToString(id as symbol);
                }
                else
                {
                    str += (id as Constructor).name;
                }
            });

            return str + ']';
        }

        return (serviceId as Constructor).name;
    }
}
