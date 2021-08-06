import BoundServiceReader from '../../BoundServiceReader';
import BindMultipleServiceIdsToConstantValueValidator from './BindMultipleServiceIdsToConstantValueValidator';
import {BindingAction} from "../../BindingAction";
import {ServiceId} from "../../Example/ServiceId";
import FileReader from "../../Example/Class/FileReader";

describe('Validate', () =>
{
    it('Enforces that config contains multiple services', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindMultipleServiceIdsToConstantValue,
            serviceId: Symbol.for('test symbol'),
        });

        const validator = new BindMultipleServiceIdsToConstantValueValidator(serviceReader);

        expect(() => validator.validateServiceConfig()).toThrow('Only a single service ID passed');
    });

    it('Prevents the specification of a target class', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindMultipleServiceIdsToConstantValue,
            serviceId: [
                FileReader,
                ServiceId.FileReaderInterface,
            ],
            targetClass: FileReader,
        });

        const validator = new BindMultipleServiceIdsToConstantValueValidator(serviceReader);

        expect(() => validator.validateServiceConfig()).toThrow('Specifying a target class is not valid');
    });

    it('Permits correct config', () =>
    {
        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindMultipleServiceIdsToConstantValue,
            serviceId: [
                FileReader,
                ServiceId.FileReaderInterface,
            ],
        });

        const validator = new BindMultipleServiceIdsToConstantValueValidator(serviceReader);

        expect(() => validator.validateServiceConfig())
            .not.toThrow();
    });
});
