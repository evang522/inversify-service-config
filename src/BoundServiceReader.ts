/* eslint-disable max-len */
import BoundServiceStructure from './BoundServiceStructure';
import { BindingAction } from './BindingAction';
import { ConstructorOf } from './Type/Constructor';

class BoundServiceReader
{
    public constructor(
        private serviceConfig: BoundServiceStructure,
    ) {}

    public bindingAction(): BindingAction
    {
        return this.serviceConfig.bindingAction;
    }

    public environments(): string[] | void
    {
        return this.serviceConfig.environments;
    }

    public whenNamed(): string | void
    {
        return this.serviceConfig.whenNamed;
    }

    public serviceId(): (ConstructorOf<any> | symbol) | Array<symbol | ConstructorOf<any>>
    {
        return this.serviceConfig.serviceId;
    }

    public targetClass(): ConstructorOf<any> | void
    {
        return this.serviceConfig.targetClass;
    }

    public constantValueFactory(): (() => any) | void
    {
        return this.serviceConfig.constantValueFactory;
    }

    public isGlobal(): boolean
    {
        return this.serviceConfig.global;
    }

    public configurationData(): BoundServiceStructure
    {
        return this.serviceConfig;
    }
}

export default BoundServiceReader;

