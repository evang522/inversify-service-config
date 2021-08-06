import BoundServiceReader from '../../BoundServiceReader';
import BindServiceIdToConstantValueValidator from './BindServiceIdToConstantValueValidator';
import {BindingAction} from "../../BindingAction";
import {ServiceId} from "../../Example/ServiceId";
import FileReader from "../../Example/Class/FileReader";

describe('Validate', () =>
{
    it('Prevents Specification of Target class', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToConstantValue,
            serviceId: FileReader,
            targetClass: FileReader,
            constantValueFactory: (): boolean => true,
        });

        const validator = new BindServiceIdToConstantValueValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .toThrow('Binding a constant value will not use the provided targetClass');
    });

    it('Enforces the provision of a constant value factory', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToConstantValue,
            serviceId: FileReader,
            targetClass: FileReader,
        });

        const validator = new BindServiceIdToConstantValueValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .toThrow('A constant value factory must be provided to bind to constant value');
    });

    it('Permits correct config', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToConstantValue,
            serviceId: ServiceId.FileReaderInterface,
            constantValueFactory: (): boolean => true,
        });

        const validator = new BindServiceIdToConstantValueValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .not.toThrow();
    });
});
