import AbstractBinder from '../AbstractBinder';
import {ConstructorOf} from "../../Type/Constructor";

export default class MultipleServiceIdsToConstantValueBinder extends AbstractBinder
{
    public bindService(): void
    {
        const constantValueFactory = this.serviceConfig.constantValueFactory() as () => any;
        const serviceIds = this.serviceConfig.serviceId() as Array<ConstructorOf<any> | symbol>;

        const constantValue = constantValueFactory();

        serviceIds.forEach((serviceId: ConstructorOf<any> | symbol) =>
        {
            const bindingContext = this.diContainer.bind(serviceId)
                .toConstantValue(constantValue);

            if (this.serviceConfig.whenNamed())
            {
                bindingContext.whenTargetNamed(this.serviceConfig.whenNamed() as string);
            }
        });
    }
}
