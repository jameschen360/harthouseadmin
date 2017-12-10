import { Component, OnInit } from '@angular/core';

declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isVideoEnabled = false;
  public toggleStatusText = 'Disabled';
  constructor() {
    $(document).ready(function () {
      $('#summernote').summernote({
        placeholder: 'Please write a reason here...',
        minHeight: 250,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor
        focus: true,
        toolbar: [
          ['headline', ['style']],
          ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
          ['textsize', ['fontsize']],
          ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
        ],
      });
    });
  }

  ngOnInit() {
  }

  homeVideoCheckBox() {
    if (this.isVideoEnabled === true) {
      this.isVideoEnabled = false;
      this.toggleStatusText = 'Disabled';
    } else if (this.isVideoEnabled === false) {
      this.isVideoEnabled = true;
      this.toggleStatusText = 'Enabled';
    }
  }

}
