import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { AccommodationService } from '../services/accommodation/accommodation.service';
import { CreateAccommodationDTO } from '../shared/dto/CreateAccommodationDTO';
import {
  Benefits,
  PriceType,
  RequestApproval,
} from '../shared/models/accommodation.model';
import { Address } from '../shared/models/address.model';

interface SelectedFile {
  file: File;
  preview: string;
}

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css'],
})
export class CreateAccommodationComponent implements OnInit {
  accommodationForm!: FormGroup;
  benefits = Object.values(Benefits);
  priceTypes = Object.values(PriceType);
  requestApprovals = Object.values(RequestApproval);
  selectedFiles: SelectedFile[] = [];
  uploadedFilePaths: string[] = [];

  constructor(
    private fb: FormBuilder,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit(): void {
    this.accommodationForm = this.fb.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      benefits: [[]],
      minGuests: [1, [Validators.required, Validators.min(1)]],
      maxGuests: [2, [Validators.required, Validators.min(1)]],
      priceType: ['', Validators.required],
      requestApproval: ['', Validators.required],
      hostId: [1, Validators.required],
    });
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = []; // Reset previous selections
    this.uploadedFilePaths = []; // Reset paths

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedFiles.push({
          file: file,
          preview: e.target.result, // Base64 preview for UI
        });

        // Store only the relative path with the preset folder
        this.uploadedFilePaths.push(`../../assets/images/${file.name}`);
      };

      reader.readAsDataURL(file);
    }
  }

  // Remove a selected file
  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  // uploadFiles() {
  //   this.uploadedFilePaths = this.selectedFiles.map(
  //     (fileObj) => `assets/images/${fileObj.file.name}`
  //   );
  //   alert('Files processed successfully!'); // Replace with actual upload logic later
  // }

  createAccommodation() {
    if (this.accommodationForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const formValues = this.accommodationForm.value;
    const accommodationData: CreateAccommodationDTO = {
      name: formValues.name,
      address: {
        id: 0,
        street: formValues.street,
        number: formValues.number,
        city: formValues.city,
        country: formValues.country,
      } as Address,
      benefits: formValues.benefits,
      photos: this.uploadedFilePaths, // Ensure paths are correctly assigned
      minGuests: formValues.minGuests,
      maxGuests: formValues.maxGuests,
      priceType: formValues.priceType,
      requestApproval: formValues.requestApproval,
      hostId: formValues.hostId,
    };

    this.accommodationService.createAccommodation(accommodationData).subscribe(
      (response) => {
        if (response.data) {
          console.log('Accommodation created successfully:', response.data);
          alert('Accommodation created successfully!');
          this.accommodationForm.reset();
          this.uploadedFilePaths = [];
        } else {
          console.error('Error:', response.message);
          alert('Failed to create accommodation.');
        }
      },
      (error) => {
        console.error('Request failed:', error);
        alert('Error occurred while creating accommodation.');
      }
    );
  }
}
