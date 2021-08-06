import BoundServiceReader from '../../BoundServiceReader';
import BindServiceIdToClassValidator from './BindServiceIdToClassValidator';
import {BindingAction} from '../../BindingAction';
import {ServiceId} from "../../Example/ServiceId";
import FileReader from "../../Example/Class/FileReader";

describe('Validate', () =>
{
    it('Prevents the specification of a class as service id', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToClass,
            serviceId: FileReader,
            targetClass: FileReader,
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
            serviceId: ServiceId.FileReaderInterface,
            targetClass: FileReader,
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
            serviceId: ServiceId.FileReaderInterface,
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
            serviceId: ServiceId.FileReaderInterface,
            targetClass: FileReader,
        });

        const validator = new BindServiceIdToClassValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .not.toThrow();
    });
});
