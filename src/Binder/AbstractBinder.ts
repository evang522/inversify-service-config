import { Container } from 'inversify';
import BoundServiceReader from '../BoundServiceReader';
import { BinderInterface } from './BinderInterface';

export default abstract class AbstractBinder implements BinderInterface
{
    public constructor(
        protected serviceConfig: BoundServiceReader,
        protected diContainer: Container,
    )
    {
    }

    abstract bindService(): void;
}
