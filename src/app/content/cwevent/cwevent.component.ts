import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrontFetchService } from 'app/service/fetch-service';
import { NotificationService } from 'app/service/notification.service';

declare var $;

@Component({
  selector: 'app-cwevent',
  templateUrl: './cwevent.component.html',
  styleUrls: ['./cwevent.component.css']
})
export class CweventComponent implements OnInit, OnDestroy {
  pageLoading = true;
  isEditButtonPressed = false;
  editCWeventForm: FormGroup;
  responseData;
  cwevents;
  cweventTitleEdit;
  cweventContentEdit;
  cweventID;
  userCredentials = {
    id: sessionStorage.user_id,
    token: sessionStorage.token
  };
  cweventEdit = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    cweventID: ''
  };
  cweventSaveEdit = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    cweventID: '',
    cweventTitleSaveEdit: <any>null,
    cweventContentSaveEdit: <any>null
  };

  constructor(private authService: FrontFetchService, private notification: NotificationService) {
    this.cweventPageInit();
    this.editCWeventForm = new FormGroup({
      'cweventTitleEdit': new FormControl(null, [Validators.required]),
      'cweventContentEdit': new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    // summernote.change for cwevent edit
    $('.clearSummernote').on('summernote.change', (we, contents, $editable) => {
      if (this.isEditButtonPressed) {
        this.editCWeventForm.patchValue({
          cweventContentEdit: $('.clearSummernote').summernote('code')
        });
        this.cweventContentEdit = $('.clearSummernote').summernote('code');
      }
    });
  }

  ngOnDestroy() {
    $('.clearSummernote').remove();
  }

  cweventPageInit() {
    $('.clearSummernote').summernote({
      placeholder: 'Please write here...',
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
    this.authService.postData(this.userCredentials, 'cweventPageInitialize').then((result) => {
      this.responseData = result;
      this.cwevents = this.responseData.cwevents;
      this.pageLoading = false;
    }, (err) => {
      this.pageLoading = false;
    });
  }

  cweventEditModal(cweventIDDOM) {
    this.isEditButtonPressed = true;
    console.log(this.isEditButtonPressed)
    this.cweventID = cweventIDDOM.id.split('_')[1];
    this.pageLoading = true;
    $(() => {
      $('.clearSummernote').summernote('reset');
      $('.clearSummernote').summernote('destroy');
    });
    this.cweventContentEdit = '';
    this.editCWeventForm.reset();
    this.cweventEdit.cweventID = this.cweventID;
    this.authService.postData(this.cweventEdit, 'cweventEdit').then((result) => {
      this.responseData = result;
      this.cweventTitleEdit = this.responseData.cweventEditData.title;
      this.cweventContentEdit = this.responseData.cweventEditData.content;
      this.editCWeventForm.setValue({
        cweventTitleEdit: this.cweventTitleEdit,
        cweventContentEdit: this.cweventContentEdit
      });
      console.log(this.cweventContentEdit);
      // Initializes summernote for cwevent edit option
      $(() => {
        const options = {};
        $('[data-remodal-id=cweventEditModal]').remodal(options).open();

        $('.clearSummernote').summernote({
          placeholder: 'Please write here...',
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
      const d = document.getElementById('cweventTitleEdit');
      d.className += 'is-focused';
      this.pageLoading = false;
    }, (err) => {
      this.pageLoading = false;
    });
  }

  saveCweventEdit() {
    this.pageLoading = true;
    this.cweventSaveEdit.cweventTitleSaveEdit = this.editCWeventForm.value.cweventTitleEdit;
    this.cweventSaveEdit.cweventContentSaveEdit = this.editCWeventForm.value.cweventContentEdit;
    this.cweventSaveEdit.cweventID = this.cweventID;
    console.log(this.cweventSaveEdit);
    this.authService.postData(this.cweventSaveEdit, 'cweventSaveEdit').then((result) => {
      this.responseData = result;
      this.isEditButtonPressed = false;
      this.cwevents = this.responseData.cwevents;
      $('[data-remodal-id=cweventEditModal]').remodal().close();
      this.pageLoading = false;
      this.notification.cweventSaveEditNotification('success');
    }, (err) => {
      this.pageLoading = false;
    });
  }

}
