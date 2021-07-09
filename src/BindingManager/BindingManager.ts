import BoundService from '../BoundServiceStructure';
import BoundServiceReader from '../BoundServiceReader';
import BoundServiceStructure from '../BoundServiceStructure';
import BinderFactory from '../Binder/BinderFactory/BinderFactory';
import ValidatorFactory from '../Validator/ValidatorFactory/ValidatorFactory';
import Environment from "../Environment/Environment";
import {Container} from "inversify";

class BindingManager
{
    public constructor(
        private servicesConfig: BoundService[],
        private environment: Environment,
        private container: Container,
        private binderFactory: BinderFactory = new BinderFactory(),
        private validatorFactory: ValidatorFactory = new ValidatorFactory(),
    ) {}

    public processServicesConfig(): void
    {
        this.servicesConfig.forEach((service: BoundServiceStructure) =>
        {
            const reader = new BoundServiceReader(service);
            this.processServiceConfig(reader);
        });
    }

    private processServiceConfig(boundServiceReader: BoundServiceReader): void
    {
        // Validate the configuration based on the provided Binding action
        const configValidator = this.validatorFactory.resolveValidator(boundServiceReader);

        configValidator.validateServiceConfig();

        const specifiedEnvironments = boundServiceReader.environments();

        if (!boundServiceReader.isGlobal() && !this.environment.inAnyEnvironment(specifiedEnvironments as string[]))
        {
            // Not intended to be bound in this environment, we can simply return
            return;
        }

        const actionBinder = this.binderFactory.resolveBinder(boundServiceReader, this.container);
        actionBinder.bindService();
    }
}

export default BindingManager;
