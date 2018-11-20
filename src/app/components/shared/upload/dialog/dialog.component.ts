import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UploadService } from '../../../../services/upload.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { CommonValues } from 'src/app/common/commonValues';
import { ImageService } from 'src/app/services/image.service';

const URL = CommonValues.devApi + '/upload';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class imageUploadDialogComponent implements OnInit {
  @ViewChild('imageInput') imageInput: ElementRef;
  @Input()uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  public fileName: string;
  public imagePath: string;
  public hideSpinner: boolean;

  constructor(public dialogRef: MatDialogRef<imageUploadDialogComponent>, private imgService: ImageService) { }

  openImageInput() {
    this.imageInput.nativeElement.click();
  }

  exit() {
    this.dialogRef.close();
  }

  onImageChange(e: string) {
    
    console.log(e);
    let arr = e.split("\\");
    let filename = arr[arr.length - 1];
    this.fileName = filename;
    console.log(filename);
  }

  upload() {
    this.hideSpinner = false;
    this.uploader.uploadAll()
  }

   
  ngOnInit() {
    this.hideSpinner = true;
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false;};

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
      debugger;
      let tmpPath: string = JSON.parse(response).imgPath
      let tmpArr: string[] = tmpPath.split("/")
      tmpArr.splice(0,2);
      this.imagePath = tmpArr.join("/");
      this.imgService.sendId(this.imagePath);
      this.hideSpinner = true;
  };
}

  

}
