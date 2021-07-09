import BoundServiceReader from '../../BoundServiceReader';
import EndpointConstructor from '../../../../EndpointConstructor';
import BindServiceIdToClassValidator from './BindServiceIdToClassValidator';
import ServiceId from '../../../../../../application/_config/ServiceId';
import { BindingAction } from '../../BindingAction';

describe('Validate', () =>
{
    it('Prevents the specification of a class as service id', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToClass,
            serviceId: EndpointConstructor,
            targetClass: EndpointConstructor,
        });

        const validator = new BindServiceIdToClassValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .toThrow('Instructed to bind Service id to class, but received class as service id');
    });

    it('Prevents the specification of a constant value factory', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToClass,
            serviceId: ServiceId.EndpointConstructorInterface,
            targetClass: EndpointConstructor,
            constantValueFactory: (): boolean => true,
        });

        const validator = new BindServiceIdToClassValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .toThrow(
                'Binding Interface To Class will not use the provided constant value factory'
            );
    });

    it('Ensures that a target class is provided', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToClass,
            serviceId: ServiceId.EndpointConstructorInterface,
        });

        const validator = new BindServiceIdToClassValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .toThrow(
                'Target class not provided, but is required.'
            );
    });

    it('Permits correct config', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToClass,
            serviceId: ServiceId.EndpointConstructorInterface,
            targetClass: EndpointConstructor,
        });

        const validator = new BindServiceIdToClassValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .not.toThrow();
    });
});
