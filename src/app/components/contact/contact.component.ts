import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-contact',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  sendMessage(form: any) {
    if (form.valid) {
      console.log("Form Submitted", this.formData);
      form.resetForm();
      alert("Message sent successfully!");
    } else {
      alert("Please fill all fields correctly.");
    }
  }
}
