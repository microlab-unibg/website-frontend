export class Thesis {
  public id: string;
  public title: string;
  public imgRef: string;
  public imgUrl: string;
  public description: string;
  public type: string;
  public pdfRef: string;

  constructor(id?: string, title?: string, imgRef?: string, imgUrl?: string, description?: string, type?: string, pdfRef?: string) {
    this.id = id ?? '';
    this.title = title ?? '';
    this.imgRef = imgRef ?? '';
    this.imgUrl = imgUrl ?? '';
    this.description = description ?? '';
    this.type = type ?? '';
    this.pdfRef = pdfRef ?? '';
  }

  toPlainObj(): { title?: string, imgRef?: string, description?: string, type?: string, pdfRef?: string } {
    const thesisObj: { id?: string, title?: string, imgRef?: string, imgUrl?: string, description?: string, type?: string, pdfRef?: string } = Object.assign({}, this);
    delete thesisObj.id;
    delete thesisObj.imgUrl;
    return thesisObj;
  }
}