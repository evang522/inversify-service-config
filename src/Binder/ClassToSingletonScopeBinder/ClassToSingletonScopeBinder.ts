import AbstractBinder from '../AbstractBinder';
import {ConstructorOf} from "../../Type/Constructor";

export default class ClassToSingletonScopeBinder extends AbstractBinder
{
    public bindService(): void
    {
        const originalClass = this.serviceConfig.serviceId() as ConstructorOf<any>;
        const bindingContext = this.diContainer.bind(originalClass).toSelf().inSingletonScope();

        if (this.serviceConfig.whenNamed())
        {
            bindingContext.whenTargetNamed(this.serviceConfig.whenNamed() as string);
        }
    }
}
