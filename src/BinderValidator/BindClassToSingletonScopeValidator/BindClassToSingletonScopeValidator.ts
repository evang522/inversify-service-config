import AbstractValidator from '../AbstractValidator';
import ServiceBindingException from '../../Exception/ServiceBindingException';
import {isSymbol} from "../../Util/isSymbol";

export default class BindClassToSingletonScopeValidator extends AbstractValidator
{
    protected assertActionBindingConfigIsValid(): void
    {
        const serviceId = this.serviceReader.serviceId();

        if (isSymbol(serviceId) )
        {
            throw ServiceBindingException.forBoundServiceConfig(
                this.serviceReader.configurationData(),
                'Class to Singleton Binder Cannot bind symbol Service ID to a singleton scope.'
            );
        }

        if (this.serviceReader.constantValueFactory())
        {
            throw ServiceBindingException.forBoundServiceConfig(
                this.serviceReader.configurationData(),
                'Binding Class to Singleton Scope will not use the provided constant value factory'
            );
        }

        if (this.serviceReader.targetClass())
        {
            throw ServiceBindingException.forBoundServiceConfig(
                this.serviceReader.configurationData(),
                'Binding Class to Singleton will not use provided target class -- it will use the service id as Class.'
            );
        }
    }
}
