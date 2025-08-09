export type FileTypeCategory = 'pdf' | 'image' | 'unsupported';

export interface FileTypeInfo {
  category: FileTypeCategory;
  mimeType?: string;
  extension?: string;
}

export class FileTypeDetector {
  static detectFileType(storagePath?: string, fileType?: string): FileTypeInfo {
    if (!storagePath && !fileType) {
      return { category: 'unsupported' };
    }

    // Check by fileType first (more reliable)
    if (fileType) {
      if (fileType === 'pdf' || fileType.includes('pdf')) {
        return { category: 'pdf', mimeType: 'application/pdf', extension: 'pdf' };
      }

      if (this.isImageType(fileType)) {
        return { category: 'image', mimeType: `image/${fileType}`, extension: fileType };
      }
    }

    // Fall back to URL-based detection
    if (storagePath) {
      const url = storagePath.toLowerCase();

      if (url.includes('.pdf')) {
        return { category: 'pdf', mimeType: 'application/pdf', extension: 'pdf' };
      }

      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
      for (const ext of imageExtensions) {
        if (url.includes(`.${ext}`)) {
          return { category: 'image', mimeType: `image/${ext}`, extension: ext };
        }
      }
    }

    return { category: 'unsupported' };
  }

  static isImageType(fileType: string): boolean {
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
    return imageTypes.includes(fileType.toLowerCase()) || fileType.startsWith('image/');
  }

  static isPDFType(fileType?: string, storagePath?: string): boolean {
    if (fileType === 'pdf' || fileType?.includes('pdf')) return true;
    if (storagePath?.toLowerCase().includes('.pdf')) return true;
    return false;
  }

  static getFileExtension(fileName?: string): string | null {
    if (!fileName) return null;
    const parts = fileName.split('.');
    return parts.length > 1 ? parts.pop()?.toLowerCase() || null : null;
  }

  static getMimeTypeFromExtension(extension: string): string {
    const mimeMap: Record<string, string> = {
      pdf: 'application/pdf',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      bmp: 'image/bmp',
      svg: 'image/svg+xml',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      txt: 'text/plain',
      json: 'application/json',
      xml: 'application/xml',
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      ts: 'application/typescript',
    };

    return mimeMap[extension.toLowerCase()] || 'application/octet-stream';
  }
}
