import { ValidatorInterface } from './ValidatorInterface';
import BoundServiceReader from '../BoundServiceReader';
import ServiceBindingException from '../Exception/ServiceBindingException';
import { BindingAction } from '../BindingAction';

export default abstract class AbstractValidator implements ValidatorInterface
{
    public constructor(protected serviceReader: BoundServiceReader) {}

    protected abstract assertActionBindingConfigIsValid(): void;

    public validateServiceConfig(): void
    {
        this.validateEnvironmentConfiguration();
        this.assertGeneralBindingConfigIsConsistent();
        this.assertActionBindingConfigIsValid();
    }

    private validateEnvironmentConfiguration(): void
    {
        const specifiedEnvironments = this.serviceReader.environments();

        if (!this.serviceReader.isGlobal() && !specifiedEnvironments)
        {
            throw ServiceBindingException.forBoundServiceConfig(
                this.serviceReader.configurationData(),
                'If service is not global, bound environments must be specified. ' +
                'Otherwise your service is lost and has nowhere to go.'
            );
        }

        if (this.serviceReader.isGlobal() && specifiedEnvironments)
        {
            throw ServiceBindingException.forBoundServiceConfig(
                this.serviceReader.configurationData(),
                'The service is specified as global, but also has specified environments. ' +
                'This is an invalid configuration.'
            );
        }
    }

    private assertGeneralBindingConfigIsConsistent(): void
    {
        const bindingAction = this.serviceReader.bindingAction();

        if (bindingAction !== BindingAction.BindMultipleServiceIdsToConstantValue)
        {
            if (this.serviceReader.serviceId() instanceof Array)
            {
                throw ServiceBindingException.forBoundServiceConfig(this.serviceReader.configurationData(),
                    'List of serviceIds provided to a binding action which can only bind single services. ' +
                    'Don\'t pass Service ID as an Array here.'

                );
            }
        }
    }
}
