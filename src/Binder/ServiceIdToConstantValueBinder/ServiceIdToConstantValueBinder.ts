import AbstractBinder from '../AbstractBinder';
import {ConstructorOf} from "../../Type/Constructor";

export default class ServiceIdToConstantValueBinder extends AbstractBinder
{
    public bindService(): void
    {
        const constantValueFactory = this.serviceConfig.constantValueFactory() as () => any;
        const serviceId = this.serviceConfig.serviceId();
        const bindingContext = this.diContainer.bind(serviceId as symbol | ConstructorOf<any>)
            .toConstantValue(constantValueFactory());

        if (this.serviceConfig.whenNamed())
        {
            bindingContext.whenTargetNamed(this.serviceConfig.whenNamed() as string);
        }
    }
}
