import AbstractBinder from '../AbstractBinder';
import {ConstructorOf} from "../../Type/Constructor";

export default class ServiceIdToClassInSingletonScopeBinder extends AbstractBinder
{
    public bindService(): void
    {
        const interfaceServiceId = this.serviceConfig.serviceId() as symbol;
        const targetClass = this.serviceConfig.targetClass() as ConstructorOf<any>;

        const bindingContext = this.diContainer.bind(interfaceServiceId).to(targetClass).inSingletonScope();

        if (this.serviceConfig.whenNamed())
        {
            bindingContext.whenTargetNamed(this.serviceConfig.whenNamed() as string);
        }
    }
}
