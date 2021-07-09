import AbstractBinder from '../AbstractBinder';
import {ConstructorOf} from "../../Type/Constructor";

export default class ServiceIdToClassBinder extends AbstractBinder
{
    public bindService(): void
    {
        const targetClass = this.serviceConfig.targetClass() as ConstructorOf<any>;
        const serviceId = this.serviceConfig.serviceId() as symbol;

        const bindingContext = this.diContainer.bind(serviceId).to(targetClass);

        if (this.serviceConfig.whenNamed())
        {
            bindingContext.whenTargetNamed(this.serviceConfig.whenNamed() as string);
        }
    }
}
