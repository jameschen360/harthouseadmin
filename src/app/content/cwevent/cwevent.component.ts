import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrontFetchService } from 'app/service/fetch-service';
import { NotificationService } from 'app/service/notification.service';

import swal from 'sweetalert2';
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
  newCWeventForm: FormGroup;
  responseData;
  cwevents;
  cweventTitleEdit;
  cweventContentEdit;
  cweventID;
  cweventContentNew;
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
  cweventNew = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    cweventTitleNew: <any>null,
    cweventContentNew: <any>null
  };

  constructor(private authService: FrontFetchService, private notification: NotificationService) {
    this.cweventPageInit();
    this.editCWeventForm = new FormGroup({
      'cweventTitleEdit': new FormControl(null, [Validators.required]),
      'cweventContentEdit': new FormControl(null, [Validators.required])
    });
    this.newCWeventForm = new FormGroup({
      'cweventTitleNew': new FormControl(null, [Validators.required]),
      'cweventContentNew': new FormControl(null, [Validators.required])
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

    // summernote.change for cwevent new
    $('#summernoteEventNew').on('summernote.change', (we, contents, $editable) => {
        this.newCWeventForm.patchValue({
          cweventContentNew: $('#summernoteEventNew').summernote('code')
        });
        this.cweventContentNew = $('#summernoteEventNew').summernote('code');
    });
  }

  ngOnDestroy() {
    // $(() => {
    //   $('.clearSummernote').remove();
    // });
    $(() => {
      $('.clearSummernote').detach();
      $('#summernoteEventNew').detach();
    });
  }

  cweventPageInit() {
    $(() => {
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
      $('#summernoteEventNew').summernote({
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

  cweventNewModal() {
    $(() => {
      $('#summernoteEventNew').summernote('reset');
      $('#summernoteEventNew').summernote('destroy');
      $('#summernoteEventNew').summernote({
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

    this.cweventContentNew = '';
    this.newCWeventForm.reset();
    const options = {};
    $('[data-remodal-id=cweventNewModal]').remodal(options).open();
  }

  saveCweventEdit() {
    this.pageLoading = true;
    this.cweventSaveEdit.cweventTitleSaveEdit = this.editCWeventForm.value.cweventTitleEdit;
    this.cweventSaveEdit.cweventContentSaveEdit = this.editCWeventForm.value.cweventContentEdit;
    this.cweventSaveEdit.cweventID = this.cweventID;
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

  deleteCwevent() {
    swal({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Are you sure you want to delete this?',
      text: 'This action cannot be un-done!',
      type: 'question',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: '#ffb606',
      cancelButtonColor: '#e87164',
      confirmButtonText: 'Yes!',
      preConfirm: (email) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      },
    }).then(() => {
      this.pageLoading = true;
      this.authService.postData(this.cweventEdit, 'cweventDelete').then((result) => {
        this.responseData = result;
        this.cwevents = this.responseData.cwevents;
        $('[data-remodal-id=cweventEditModal]').remodal().close();
        this.pageLoading = false;
        this.notification.cweventSaveEditNotification('danger');
      }, (err) => {
        this.pageLoading = false;
      });
    }, (dismiss) => {
    });
  }

  addCwevent() {
    this.pageLoading = true;
    this.cweventNew.cweventTitleNew   = this.newCWeventForm.value.cweventTitleNew;
    this.cweventNew.cweventContentNew = this.newCWeventForm.value.cweventContentNew;
    this.authService.postData(this.cweventNew, 'addCwevent').then((result) => {
      this.responseData = result;
      this.cwevents = this.responseData.cwevents;
      $('[data-remodal-id=cweventNewModal]').remodal().close();
      this.pageLoading = false;
      this.notification.cweventSaveEditNotification('success');
    }, (err) => {
      this.pageLoading = false;
    });
  }
}
