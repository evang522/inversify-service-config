import { BindingAction } from './BindingAction';
import { ConstructorOf } from './Type/Constructor';

export default interface BoundServiceStructure
{
    targetClass?: ConstructorOf<any>;
    serviceId: (symbol | ConstructorOf<any>) | Array<symbol | ConstructorOf<any>> ;
    constantValueFactory?: () => any;
    whenNamed?: string;
    environments?: string[];
    global: boolean;
    bindingAction: BindingAction;
}
