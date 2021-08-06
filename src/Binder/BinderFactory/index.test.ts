import {BindingAction} from '../../BindingAction';
import BinderFactory from './BinderFactory';
import BoundServiceReader from '../../BoundServiceReader';
import ServiceIdToClassBinder from '../ServiceIdToClassBinder/ServiceIdToClassBinder';
import ClassToSingletonScopeBinder from '../ClassToSingletonScopeBinder/ClassToSingletonScopeBinder';
import ServiceIdToClassInSingletonScopeBinder
    from '../ServiceIdToClassInSingletonScopeBinder/ServiceIdToClassInSingletonScopeBinder';
import ServiceIdToConstantValueBinder from '../ServiceIdToConstantValueBinder/ServiceIdToConstantValueBinder';
import MultipleServiceIdsToConstantValueBinder
    from '../MultipleServiceIdsToConstantValueBinder/MultipleServiceIdsToConstantValueBinder';
import {Container} from "inversify";
import HttpClient from "../../Example/Class/HttpClient";

describe('Returns Correct Binder', () =>
{
    const HttpClientInterface = Symbol.for('services.http.HttpClientInterface');
    it('Bind Class to Singleton Scope', () =>
    {

        const container = new Container();
        const boundServiceConfig = {
            serviceId: HttpClientInterface,
            bindingAction: BindingAction.BindClassToSingletonScope,
            targetClass: HttpClient,
            global: true,
        };

        const factory = new BinderFactory();

        const binder = factory.resolveBinder(
            new BoundServiceReader(boundServiceConfig),
            container
        );

        expect(binder).toBeInstanceOf(ClassToSingletonScopeBinder);
    });

    it('Bind Service Id To Class', () =>
    {
        const boundServiceConfig = {
            serviceId: HttpClientInterface,
            bindingAction: BindingAction.BindServiceIdToClass,
            targetClass: HttpClient,
            global: true,
        };

        const factory = new BinderFactory();

        const container = new Container();
        const binder = factory.resolveBinder(
            new BoundServiceReader(boundServiceConfig),
            container
        );

        expect(binder).toBeInstanceOf(ServiceIdToClassBinder);
    });

    it('Bind Service Id To Class in Singleton Scope', () =>
    {
        const boundServiceConfig = {
            serviceId: HttpClientInterface,
            bindingAction: BindingAction.BindServiceIdToClassInSingletonScope,
            targetClass: HttpClient,
            global: true,
        };

        const factory = new BinderFactory();
        const container = new Container();

        const binder = factory.resolveBinder(
            new BoundServiceReader(boundServiceConfig),
            container
        );

        expect(binder).toBeInstanceOf(ServiceIdToClassInSingletonScopeBinder);
    });

    it('Bind Service Id To Constant Value', () =>
    {
        const boundServiceConfig = {
            serviceId: HttpClientInterface,
            bindingAction: BindingAction.BindServiceIdToConstantValue,
            targetClass: HttpClient,
            global: true,
        };

        const factory = new BinderFactory();
        const container = new Container();

        const binder = factory.resolveBinder(
            new BoundServiceReader(boundServiceConfig),
            container
        );

        expect(binder).toBeInstanceOf(ServiceIdToConstantValueBinder);
    });

    it('Bind Multiple Service IDs To Constant Value', () =>
    {
        const boundServiceConfig = {
            serviceId: HttpClientInterface,
            bindingAction: BindingAction.BindMultipleServiceIdsToConstantValue,
            targetClass: HttpClient,
            global: true,
        };

        const factory = new BinderFactory();
        const container = new Container();

        const binder = factory.resolveBinder(
            new BoundServiceReader(boundServiceConfig),
            container
        );

        expect(binder).toBeInstanceOf(MultipleServiceIdsToConstantValueBinder);
    });

    it('Throws Exception when no binder exists for action', () =>
    {
        const boundServiceConfig = {
            serviceId: HttpClientInterface,
            bindingAction: 'Invalid',
            targetClass: HttpClient,
            global: true,
        };

        const factory = new BinderFactory();
        const container = new Container();

        expect(() =>
        {
            factory.resolveBinder(
                // @ts-ignore
                new BoundServiceReader(boundServiceConfig),
                container
            );
        }).toThrow('Container binding for Service Symbol(services.http.HttpClientInterface) has failed');
    });
});
