import fs from 'fs';
import {FileReaderInterface} from "../Interface/FileReaderInterface";
import {injectable} from "inversify";

@injectable()
export default class FileReader implements FileReaderInterface
{
    public readFile(fileName: string): string | Buffer
    {
        return fs.readFileSync(fileName);
    }
}
