import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;
const { Geolocation } = Plugins;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validationsForm: FormGroup;
  validationMessages = {
    rollNo: [
      { type: 'required', message: 'Roll No is required.' }
    ],
    name: [
      { type: 'required', message: 'Name is required.' }
    ],
    address: [
      { type: 'required', message: 'Address is required.' }
    ],
    location: [
      { type: 'required', message: 'Location is required.' }
    ],
    mobile: [
      { type: 'required', message: 'Mobile number is required.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    photo: [
      { type: 'required', message: 'Photo is required.' }
    ]
  };
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      rollNo: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      photo: new FormControl('', Validators.required)
    });
  }

  onSubmit(values){
    console.log(values);
  }

  async uploadPhoto() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64
    });
    const base64Image = 'data:image/jpeg;base64,' + image.base64String;
    this.validationsForm.controls.photo.setValue(base64Image);

  }

  location() {
    Geolocation.getCurrentPosition({
      enableHighAccuracy: false,
      maximumAge : 0,
      timeout : 10000
    }).then(data => {
      this.validationsForm.controls.location.setValue(data.coords.latitude + ', ' + data.coords.longitude);
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });
  }

}
