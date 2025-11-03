export class Thesis {
  public id: string;
  public title: string;
  public description: string;
  public bachelor: boolean;
  public master: boolean;
  public status: string;
  public author: string;
  public email: string;
  public date: string;
  public imgRef: string;
  public imgUrl: string;
  public pdfRef: string;

  constructor(id?: string, title?: string, description?: string, bachelor?: boolean, master?: boolean, status?: string, author?: string, email?: string, date?: string, imgRef?: string, imgUrl?: string, pdfRef?: string) {
    this.id = id ?? '';
    this.title = title ?? '';
    this.description = description ?? '';
    this.bachelor = bachelor ?? false;
    this.master = master ?? false;
    this.status = status ?? '';
    this.author = author ?? '';
    this.email = email ?? '';
    this.date = date ?? '';
    this.imgRef = imgRef ?? '';
    this.imgUrl = imgUrl ?? '';
    this.pdfRef = pdfRef ?? '';
  }

  toPlainObj(): { title?: string, description?: string, type?: string, status?: string, author?: string, email?: string, date?: string, imgRef?: string, pdfRef?: string } {
    const thesisObj: { id?: string, title?: string, description?: string, type?: string, status?: string, author?: string, email?: string, date?: string, imgRef?: string, imgUrl?: string, pdfRef?: string } = Object.assign({}, this);
    delete thesisObj.id;
    delete thesisObj.imgUrl;
    return thesisObj;
  }
}