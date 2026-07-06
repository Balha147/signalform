import { Service } from '@angular/core';

@Service()
export class PdfLoaderService {
    async load() {
        const pdfMakeModule = await import('pdfmake/build/pdfmake');
        const fontsModule = await import('pdfmake/build/vfs_fonts');
        const pdfMake = pdfMakeModule.default;
        pdfMake.addVirtualFileSystem(fontsModule.default);
        return pdfMake;
    }
}