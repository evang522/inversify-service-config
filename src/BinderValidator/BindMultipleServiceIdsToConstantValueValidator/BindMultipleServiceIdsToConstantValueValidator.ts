import AbstractValidator from '../AbstractValidator';
import ServiceBindingException from '../../Exception/ServiceBindingException';

export default class BindMultipleServiceIdsToConstantValueValidator extends AbstractValidator
{
    protected assertActionBindingConfigIsValid(): void
    {
        if (!(this.serviceReader.serviceId() instanceof Array))
        {
            throw ServiceBindingException.forBoundServiceConfig(
                this.serviceReader.configurationData(),
                'Only a single service ID passed with "BindMultipleServiceIds" Binding Action'
            );
        }

        if (this.serviceReader.targetClass())
        {
            throw ServiceBindingException.forBoundServiceConfig(
                this.serviceReader.configurationData(),
                'Specifying a target class is not valid for binding to a constant value'
            );
        }
    }
}
