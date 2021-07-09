import ValidatorFactory from './ValidatorFactory';
import BoundServiceReader from '../../BoundServiceReader';
import ServiceId from '../../../../../../application/_config/ServiceId';
import EndpointConstructor from '../../../../EndpointConstructor';
import BindClassToSingletonScopeValidator from '../BindClassToSingletonScopeValidator';
import BindMultipleServiceIdsToConstantValueValidator from '../BindMultipleServiceIdsToConstantValueValidator';
import BindServiceIdToConstantValueValidator
    from '../BindServiceIdToConstantValueValidator/BindServiceIdToConstantValueValidator';
import BindServiceIdToClassValidator from '../BindServiceIdToClassValidator';
import GenericValidator from '../GenericValidator';
import { BindingAction } from '../../BindingAction';

describe('Returns correct validator', () =>
{
    it('BindClassToSingletonScope', () =>
    {
        const validatorFactory = new ValidatorFactory();
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindClassToSingletonScope',
            serviceId: ServiceId.EndpointConstructorInterface,
            targetClass: EndpointConstructor,
            constantValueFactory: (): boolean => true,
        });

        const validator = validatorFactory.resolveValidator(serviceReader);

        expect(validator).toBeInstanceOf(BindClassToSingletonScopeValidator);
    });

    it('BindMultipleServiceIdsToConstantValue', () =>
    {
        const validatorFactory = new ValidatorFactory();
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindMultipleServiceIdsToConstantValue',
            serviceId: ServiceId.EndpointConstructorInterface,
            targetClass: EndpointConstructor,
            constantValueFactory: (): boolean => true,
        });

        const validator = validatorFactory.resolveValidator(serviceReader);

        expect(validator).toBeInstanceOf(BindMultipleServiceIdsToConstantValueValidator);
    });

    it('BindServiceIdToConstantValue', () =>
    {
        const validatorFactory = new ValidatorFactory();
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindServiceIdToConstantValue',
            serviceId: ServiceId.EndpointConstructorInterface,
            targetClass: EndpointConstructor,
            constantValueFactory: (): boolean => true,
        });

        const validator = validatorFactory.resolveValidator(serviceReader);

        expect(validator).toBeInstanceOf(BindServiceIdToConstantValueValidator);
    });

    it('BindServiceIdToClass', () =>
    {
        const validatorFactory = new ValidatorFactory();
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToClass,
            serviceId: ServiceId.EndpointConstructorInterface,
            targetClass: EndpointConstructor,
            constantValueFactory: (): boolean => true,
        });

        const validator = validatorFactory.resolveValidator(serviceReader);

        expect(validator).toBeInstanceOf(BindServiceIdToClassValidator);
    });

    it('Returns Generic for all other Actions', () =>
    {
        const validatorFactory = new ValidatorFactory();
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: 'BindServiceIdToClassInSingletonScope',
            serviceId: ServiceId.EndpointConstructorInterface,
            targetClass: EndpointConstructor,
            constantValueFactory: (): boolean => true,
        });

        const validator = validatorFactory.resolveValidator(serviceReader);

        expect(validator).toBeInstanceOf(GenericValidator);
    });
});
