import { ValidatorInterface } from '../ValidatorInterface';
import BoundServiceReader from '../../BoundServiceReader';
import GenericValidator from '../GenericValidator/GenericValidator';
import BindClassToSingletonScopeValidator from '../BindClassToSingletonScopeValidator/BindClassToSingletonScopeValidator';
import BindMultipleServiceIdsToConstantValueValidator from '../BindMultipleServiceIdsToConstantValueValidator/BindMultipleServiceIdsToConstantValueValidator';
import BindServiceIdToConstantValueValidator from '../BindServiceIdToConstantValueValidator/BindServiceIdToConstantValueValidator';
import { BindingAction } from '../../BindingAction';
import BindServiceIdToClassValidator from '../BindServiceIdToClassValidator';

export default class ValidatorFactory
{
    public resolveValidator(serviceConfigReader: BoundServiceReader): ValidatorInterface
    {
        switch (serviceConfigReader.bindingAction())
        {
            case BindingAction.BindClassToSingletonScope:
                return new BindClassToSingletonScopeValidator(serviceConfigReader);

            case BindingAction.BindMultipleServiceIdsToConstantValue:
                return new BindMultipleServiceIdsToConstantValueValidator(serviceConfigReader);

            case BindingAction.BindServiceIdToConstantValue:
                return new BindServiceIdToConstantValueValidator(serviceConfigReader);

            case BindingAction.BindServiceIdToClass:
                return new BindServiceIdToClassValidator(serviceConfigReader);

            default:
                return new GenericValidator(serviceConfigReader);
        }
    }
}
