import AbstractValidator from '../AbstractValidator';
import ServiceBindingException from '../../Exception/ServiceBindingException';

export default class BindServiceIdToConstantValueValidator extends AbstractValidator
{
    protected assertActionBindingConfigIsValid(): void
    {
        if (!this.serviceReader.constantValueFactory())
        {
            throw ServiceBindingException.forBoundServiceConfig(
                this.serviceReader.configurationData(),
                'A constant value factory must be provided to bind to constant value'
            );
        }

        if (this.serviceReader.targetClass())
        {
            throw ServiceBindingException.forBoundServiceConfig(
                this.serviceReader.configurationData(),
                'Binding a constant value will not use the provided targetClass'
            );
        }
    }
}
