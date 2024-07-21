import { Component } from '@angular/core';
import { UploadService } from '../../services/upload/upload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      console.log(this.selectedFile);

      // this.uploadService.uploadFile(this.selectedFile).subscribe(
      //   (response) => {
      //     console.log('Upload success', response);
      //   },
      //   (error) => {
      //     console.error('Upload failed', error);
      //   }
      // );
    }
  }
}
