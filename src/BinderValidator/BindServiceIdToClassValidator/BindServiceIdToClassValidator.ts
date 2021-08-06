import AbstractValidator from '../AbstractValidator';
import ServiceBindingException from '../../Exception/ServiceBindingException';
import {isSymbol} from "../../Util/isSymbol";

export default class BindServiceIdToClassValidator extends AbstractValidator
{
    protected assertActionBindingConfigIsValid(): void
    {
        const serviceId = this.serviceReader.serviceId();

        if (!isSymbol(serviceId))
        {
            throw ServiceBindingException.forBoundServiceConfig(
                this.serviceReader.configurationData(),
                'Instructed to bind Service id to class, but received class as service id. ' +
                'All Classes with @injectable decorator are already bound to themselves in a transient scope'
            );
        }

        if (this.serviceReader.constantValueFactory())
        {
            throw ServiceBindingException.forBoundServiceConfig(
                this.serviceReader.configurationData(),
                'Binding Interface To Class will not use the provided constant value factory'
            );
        }

        if (!this.serviceReader.targetClass())
        {
            throw ServiceBindingException.forBoundServiceConfig(
                this.serviceReader.configurationData(),
                'Target class not provided, but is required.'
            );
        }
    }
}
