import { BinderInterface } from '../BinderInterface';
import { BindingAction } from '../../BindingAction';
import ServiceBindingException from '../../Exception/ServiceBindingException';
import ClassToSingletonScopeBinder from '../ClassToSingletonScopeBinder/ClassToSingletonScopeBinder';
import BoundServiceReader from '../../BoundServiceReader';
import ServiceIdToClassBinder from '../ServiceIdToClassBinder/ServiceIdToClassBinder';
import ServiceIdToClassInSingletonScopeBinder from '../ServiceIdToClassInSingletonScopeBinder/ServiceIdToClassInSingletonScopeBinder';
import ServiceIdToConstantValueBinder from '../ServiceIdToConstantValueBinder/ServiceIdToConstantValueBinder';
import MultipleServiceIdsToConstantValueBinder from '../MultipleServiceIdsToConstantValueBinder/MultipleServiceIdsToConstantValueBinder';
import {Container} from "inversify";

export default class BinderFactory
{
    public resolveBinder(boundServiceReader: BoundServiceReader, container: Container): BinderInterface
    {
        switch (boundServiceReader.bindingAction())
        {
            case BindingAction.BindClassToSingletonScope:
                return new ClassToSingletonScopeBinder(boundServiceReader, container);

            case BindingAction.BindServiceIdToClass:
                return new ServiceIdToClassBinder(boundServiceReader, container);

            case BindingAction.BindServiceIdToClassInSingletonScope:
                return new ServiceIdToClassInSingletonScopeBinder(boundServiceReader, container);

            case BindingAction.BindServiceIdToConstantValue:
                return new ServiceIdToConstantValueBinder(boundServiceReader, container);

            case BindingAction.BindMultipleServiceIdsToConstantValue:
                return new MultipleServiceIdsToConstantValueBinder(boundServiceReader, container);

            default:
                throw ServiceBindingException.forBoundServiceConfig(
                    boundServiceReader.configurationData(),
                    `There is no Binder for Provided Action "${boundServiceReader.bindingAction()}".`
                );
        }
    }
}
