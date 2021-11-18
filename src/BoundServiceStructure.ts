import { BindingAction } from './BindingAction';
import { ConstructorOf } from './Type/Constructor';

export default interface BoundServiceStructure<TEnvironment extends string = string>
{
    targetClass?: ConstructorOf<any>;
    serviceId: (symbol | ConstructorOf<any>) | Array<symbol | ConstructorOf<any>> ;
    constantValueFactory?: () => any;
    whenNamed?: string;
    environments?: TEnvironment[];
    global: boolean;
    bindingAction: BindingAction;
}
