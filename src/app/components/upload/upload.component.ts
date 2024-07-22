import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload/upload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent implements OnInit {
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  images: any[] = [];

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
    this.getImages();
  }

  getImages() {
    this.images = [];
    this.uploadService.getImages().subscribe({
      next: (res: any) => {
        if (res) {
          this.images = res;
        }
      },
    });
  }

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
      this.uploadService.uploadFile(this.selectedFile).subscribe({
        next: (response) => {
          this.selectedFile = null;
          this.getImages();
        },
        error: (error) => {
          console.error('Upload failed', error);
        },
      });
    }
  }
}
