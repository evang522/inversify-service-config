import { Container } from 'inversify';
import BoundServiceReader from '../../BoundServiceReader';
import ServiceIdToClassBinder from './ServiceIdToClassBinder';
import { BindingAction } from '../../BindingAction';
import FileReader from "../../Example/Class/FileReader";
import {ServiceId} from "../../Example/ServiceId";

describe('Binding', () =>
{
    it('Successfully binds service ID to class in transient scope', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToClass,
            targetClass: FileReader,
            serviceId: ServiceId.FileReaderInterface,
        });

        const binder = new ServiceIdToClassBinder(serviceReader, container);

        binder.bindService();

        const firstRequestedService = container.get(ServiceId.FileReaderInterface);
        const secondRequestedService = container.get(ServiceId.FileReaderInterface);

        expect(firstRequestedService).toBeInstanceOf(FileReader);

        expect(firstRequestedService).not.toBe(secondRequestedService);
    });

    it('Correctly binds named scope', () =>
    {
        const container = new Container();

        const serviceReader = new BoundServiceReader({
            global: true,
            bindingAction: BindingAction.BindServiceIdToClass,
            targetClass: FileReader,
            serviceId: ServiceId.FileReaderInterface,
            whenNamed: 'NamedScope',
        });

        const binder = new ServiceIdToClassBinder(serviceReader, container);

        binder.bindService();

        const instance = container.getNamed(ServiceId.FileReaderInterface, 'NamedScope');
        expect(instance).toBeInstanceOf(FileReader);
    });
});
